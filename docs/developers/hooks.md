---
title: Hooks & filters
description: Every action and filter in Lumtera and Lumtera Pro, in PHP and JavaScript, with parameters and examples.
---

# Hooks & filters

## Checks and scanning

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_rule_classes` | filter | `string[] $classes` | Class names of the checks to load. Add or remove checks. See [Custom checks](/developers/custom-checks). |
| `lumtera_register_rules` | action | `RuleRegistry $rules` | Register check instances with `$rules->register()`. The same ID replaces a check. |
| `lumtera_post_scanned` | action | `int $post_id`, `Report $report`, `array\|null $previous` | After a post is scanned and its results stored: on save, bulk checks, the REST scan route, WP-CLI and the `check-post` ability. `$previous` is the previous summary, or `null` on the first scan. |
| `lumtera_bulk_batch_done` | action | `bool $done` | After each batch of **Check all content**, and at the end of `wp lumtera scan`. `$done` is true when the whole run has finished. |
| `lumtera_pre_render_content` | filter | `string\|null $html`, `string $content`, `int $post_id` | Return HTML to check instead of rendering the post content. Used for page builders. The HTML you return is used as-is. |
| `lumtera_rendered_content` | filter | `string $html`, `int $post_id` | Change the rendered HTML before it's checked. `$post_id` is 0 for unsaved content. |
| `lumtera_max_check_bytes` | filter | `int $bytes` (default 524288) | The largest content accepted for a live check |
| `lumtera_check_rate_limit` | filter | `int $limit` (default 120) | Live checks per user per minute. 0 turns the limit off. |
| `lumtera_readability_supported` | filter | `bool $supported` | Whether to show a reading level. Default: true for English locales. |
| `lumtera_link_to_document_message` | filter | `string $message`, `string $href`, `string $ext` | Message for the [link-to-document](/checks#link-to-document) check |
| `lumtera_new_window_phrases` | filter | `string[] $phrases` | Lowercase phrases that count as warning that a link opens a new tab, for the [link-new-window](/checks#link-new-window) check |

### Example: check a custom field

Add a custom field's HTML to what Lumtera checks:

```php
add_filter( 'lumtera_rendered_content', function ( string $html, int $post_id ): string {
	if ( $post_id && 'event' === get_post_type( $post_id ) ) {
		$html .= wp_kses_post( get_post_meta( $post_id, 'event_details', true ) );
	}
	return $html;
}, 10, 2 );
```

### Example: accept a phrase in another language

```php
add_filter( 'lumtera_new_window_phrases', function ( array $phrases ): array {
	$phrases[] = 'nueva pestaña';
	return $phrases;
} );
```

### Example: react to new errors

```php
add_action( 'lumtera_post_scanned', function ( int $post_id, $report, ?array $previous ) {
	$errors = $report->to_array()['counts']['error'];
	if ( $errors > ( $previous['errors'] ?? 0 ) ) {
		// Errors went up on this save.
	}
}, 10, 3 );
```

## Dismissals

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_issue_dismissed` | action | `int $post_id`, `string $fingerprint`, `string $rule_id`, `string $note` | After an issue is dismissed |
| `lumtera_issue_restored` | action | `int $post_id`, `string $fingerprint`, `string $rule_id` | After a dismissed issue is restored |

## Permissions

| Hook | Type | Default | Controls |
| --- | --- | --- | --- |
| `lumtera_capability` | filter | `edit_others_posts` | Overview, Content, Dashboard widget, bulk checks, `/site-summary`, the `site-summary` ability, and Pro's report screens and routes |
| `lumtera_images_capability` | filter | `upload_files` | Opening the alt text manager. Editing an image still needs `edit_post` on it. |
| `lumtera_dismiss_errors_capability` | filter | `edit_others_posts` | Dismissing and restoring errors, and (Pro) closing an error task as Won't fix |

```php
// Let site managers with a custom capability see the reports.
add_filter( 'lumtera_capability', fn() => 'manage_accessibility' );
```

## Admin screens

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_edit_url` | filter | `string $url`, `int $post_id` | The "edit" link Lumtera uses everywhere. Point it at your page builder. |
| `lumtera_screen_order` | filter | `string[] $order` | Order of Lumtera's screens (page slugs), for tabs and the submenu |
| `lumtera_admin_tabs` | filter | `array $tabs` (slug => label) | Tabs in the Lumtera header. Add your own screen. |
| `lumtera_admin_tab_badges` | filter | `array $badges` (slug => tag) | Short badges shown after tab labels |
| `lumtera_settings_sections` | filter | `array $sections` (slug => label) | Settings sections |
| `lumtera_settings_section_{$slug}` | action | | Renders your own settings section |
| `lumtera_overview_after_stats` | action | `array $totals` | Output below the Overview summary cards |
| `lumtera_content_actions` | action | `array $filters` | Buttons in the Content report header |
| `lumtera_selectable_post_types` | filter | `WP_Post_Type[] $types` | Content types offered under Settings → Content to check |
| `lumtera_pricing_url` | filter | `string $url` | Where "Buy Pro" links go |
| `lumtera_show_upgrade` | filter | `bool $show` | Whether "Upgrade to Pro" buttons show |
| `lumtera_elementor_preview_assets` | action | | Runs when Elementor's preview loads its styles |

## AI

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_ai_alt_text_pre` | filter | `array\|WP_Error\|null $pre`, `int $image_id`, `array $context` | Return suggestions to skip the WordPress AI Client, for example to use another service. Return `null` to carry on. |

`$context` has `post_title`, `caption`, `heading`, `nearby`, `linked` and `link_text`. Return the same shape the AI Client call produces:

```php
add_filter( 'lumtera_ai_alt_text_pre', function ( $pre, int $image_id, array $context ) {
	$suggestion = my_captioning_service( wp_get_attachment_url( $image_id ), $context );

	return [
		'suggestions' => [ $suggestion ],
		'decorative'  => false,
		'note'        => '',
	];
}, 10, 3 );
```

## Site fixes

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_site_fixes_skip_link_target` | filter | `string $target` | Skip-link target ID (without `#`) when none is saved |
| `lumtera_site_fixes_theme_has_skip_link` | filter | `bool $has` | Whether the theme already prints a skip link, so Lumtera adds none |
| `lumtera_site_fixes_viewport` | filter | `string $content` | The viewport tag content printed by the zoom fix. Default: `width=device-width, initial-scale=1`. |
| `lumtera_site_fixes_filter_content` | filter | `bool $run` | Whether the link fixes run on this request |

```php
// My theme prints its skip link in a way Lumtera can't detect.
add_filter( 'lumtera_site_fixes_theme_has_skip_link', '__return_true' );
```

## JavaScript hooks

These use `wp.hooks` in the block editor. Load your script with `lumtera-editor` as a dependency.

| Hook | Type | Signature | Purpose |
| --- | --- | --- | --- |
| `lumtera.quickFixers` | filter | `( fixers ) => fixers` | Quick fixes, keyed by check ID. Each is `( block, issue ) => { label, done, apply } \| null`. See [Add a quick fix](/developers/custom-checks#add-a-quick-fix-in-the-block-editor). |
| `lumtera.issueActions` | filter | `( actions, issue, { postId } ) => actions` | Extra buttons on each issue card. Pro adds **Track fix** here. |

```js
wp.hooks.addFilter( 'lumtera.issueActions', 'acme/report', ( actions, issue ) => [
	...actions,
	wp.element.createElement( wp.components.Button, {
		variant: 'link',
		onClick: () => window.open( 'https://example.com/ask?rule=' + issue.rule ),
	}, 'Ask the team' ),
] );
```

The block editor data store `lumtera/checks` exposes the current results: `getReport()`, `getCounts()`, `getStatus()` and `getBlockSeverity( clientId )`.

```js
const counts = wp.data.select( 'lumtera/checks' ).getCounts();
```

## Lumtera Pro <span class="pro-pill">Pro</span>

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_pro_can` | filter | `bool $allowed`, `string $feature`, `int $plan` | Plan gating for `white_label` and `portfolio`. Only reached when the license is active. |
| `lumtera_pro_license_is_active` | filter | `bool $active`, `string $status` | Master switch for Pro features |
| `lumtera_pro_network_license` | filter | `bool $network` | Whether the license is stored network-wide |
| `lumtera_pro_use_action_scheduler` | filter | `bool $use` (default true) | Use Action Scheduler when it's loaded (for example with WooCommerce), instead of WP-Cron |
| `lumtera_pro_send_alert` | filter | `bool $send`, `int $post_id`, `Issue[] $new` | Stop an alert about new errors on a post |
| `lumtera_pro_send_page_alert` | filter | `bool $send`, `string $url`, `string[] $new` | Stop an alert from a scheduled page check |
| `lumtera_pro_importing` | filter | `bool $importing` | Treat this request as an import: record the starting point without alerting |
| `lumtera_pro_scheduled_templates` | filter | `array $templates` (each `{url, title}`) | Templates that scheduled checks find automatically |
| `lumtera_pro_scheduled_urls` | filter | `array $urls` (each `{url, title}`) | The final list of pages for scheduled checks (same-site only, up to 25) |
| `lumtera_pro_portfolio_safe_http` | filter | `bool $safe` (default true) | Use WordPress's safe HTTP client for portfolio connections. Turn off only for local development. |
| `lumtera_pro_event` | action | `string $event`, `array $payload` | Fires for every Pro event. See [the event list](/pro/activity-webhooks#events). |
| `lumtera_pro_event_payload` | filter | `array $payload` | Change an event payload before it's logged and sent |

```php
// Don't alert about posts in the "Archive" category.
add_filter( 'lumtera_pro_send_alert', function ( bool $send, int $post_id ) {
	return $send && ! has_category( 'archive', $post_id );
}, 10, 2 );

// Always check the pricing page on schedule.
add_filter( 'lumtera_pro_scheduled_urls', function ( array $urls ) {
	array_unshift( $urls, [ 'url' => home_url( '/pricing/' ), 'title' => 'Pricing' ] );
	return $urls;
} );

// Forward every Pro event to your own logger.
add_action( 'lumtera_pro_event', function ( string $event, array $payload ) {
	error_log( $event . ' ' . wp_json_encode( $payload['object'] ) );
}, 10, 2 );
```

### Constants <span class="pro-pill">Pro</span>

Set these in `wp-config.php`:

| Constant | Effect |
| --- | --- |
| `LUMTERA_PRO_ENCRYPTION_KEY` | Key used to encrypt portfolio passwords and webhook secrets. Set it if your salts change, for example when a host rotates them. |
| `LUMTERA_PRO_DELETE_REPORTS` | `true` deletes reports, fix history, page results and the activity log on uninstall |
| `LUMTERA_PRO_DELETE_LICENSE` | `true` deletes the license on uninstall |
