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
| `lumtera_post_scanned` | action | `int $post_id`, `Report $report`, `array\|null $previous` | After a post is checked and its results stored: on save, after an Elementor save, after a dismissal, in **Check all content**, the REST scan route, `wp lumtera scan`, the `check-post` ability and Pro's re-checks after an ignore rule changes. `$previous` is the previous summary, or `null` on the first check. |
| `lumtera_bulk_batch_done` | action | `bool $done` | After each batch of **Check all content**, and once at the end of `wp lumtera scan`. `$done` is true when the whole run has finished. |
| `lumtera_pre_render_content` | filter | `string\|null $html`, `string $content`, `int $post_id` | Return HTML to check instead of rendering the post content. Only runs for saved posts. Lumtera's own page builder integrations (Elementor, Divi, Beaver Builder, Bricks, Oxygen, WPBakery) use it. The HTML you return is used as-is. |
| `lumtera_rendered_content` | filter | `string $html`, `int $post_id` | Change the rendered HTML before it's checked. `$post_id` is 0 for unsaved content. Lumtera's Advanced Custom Fields and WooCommerce integrations use it to add field values and the product short description. |
| `lumtera_max_check_bytes` | filter | `int $bytes` (default 524288) | The largest content accepted for a live check. At least 1024. |
| `lumtera_check_rate_limit` | filter | `int $limit` (default 120) | Live checks per user per minute. 0 turns the limit off. |
| `lumtera_readability_language` | filter | `string $lang`, `int $post_id` | Two-letter language code used to pick the reading-level formula. Default: the post's language in Polylang or WPML, otherwise the site language. `$post_id` is 0 when unknown. |
| `lumtera_readability_supported` | filter | `bool $supported`, `string $lang` | Whether to measure a reading level. Default: true for `en`, `es`, `fr`, `de`, `it` and `nl`. Forcing it on for another language uses the English formula. |
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

Advanced Custom Fields values are added already. You only need this for other fields.

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

## Dismissing and ignoring

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_issue_dismissed` | action | `int $post_id`, `string $fingerprint`, `string $rule_id`, `string $note` | After an issue is dismissed on a post |
| `lumtera_issue_restored` | action | `int $post_id`, `string $fingerprint`, `string $rule_id` | After a dismissed issue is restored |
| `lumtera_ignored_issue` | filter | `array\|null $record`, `Issue $issue`, `int $post_id` | Hide a finding wherever it appears, not just on one post. Return `null` to leave it open, or a record to report it as dismissed. `$post_id` is 0 for a whole page. |

A record returned from `lumtera_ignored_issue` can have these keys:

| Key | Type | Meaning |
| --- | --- | --- |
| `reason` | string | Why it's ignored. Shown as the dismissal note. |
| `user` | int | Who ignored it |
| `time` | int | When, as a Unix time |
| `source` | string | Where the record comes from. Default `global`. |
| `severity` | string | Optional. The most severe finding it may hide: a record with `warning` never hides an error. |
| `can_restore` | bool | Optional. Whether the current user may undo it. |
| `restore_path` | string | Optional. A REST path that undoes it with DELETE. |
| `expires` | int | Optional. When it stops applying, 0 for never. |

Ignored findings aren't stored as open issues, so they don't count in scores or reports. Lumtera Pro's [ignore rules](/pro/ignore) use this filter, and leave a record another plugin already returned unchanged.

```php
// Hide the vague "Read more" links a theme prints on every archive card.
add_filter( 'lumtera_ignored_issue', function ( $record, \Lumtera\Issue $issue ) {
	if ( null === $record && 'link-ambiguous-text' === $issue->rule_id
		&& str_contains( $issue->context, 'class="card__more"' ) ) {
		return [ 'reason' => 'The card heading gives the link context.', 'severity' => 'warning' ];
	}
	return $record;
}, 10, 2 );
```

## Manual checks

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_manual_test_saved` | action | `int $post_id`, `string $test`, `array\|null $record` | After a [manual check](/manual-checks) result is recorded or cleared. `$test` is an ID such as `keyboard`. `$record` is `null` when cleared, otherwise `{ result, note, failed, user, time }`. |

## Permissions

| Hook | Type | Default | Controls |
| --- | --- | --- | --- |
| `lumtera_capability` | filter | `lumtera_view_reports` | Overview, Content, Free vs Pro, the Dashboard widget, **Check all content**, `/site-summary`, the `site-summary` ability, and Pro's report screens and routes (page checks, documents, reports, the conformance report, creating tracker issues) |
| `lumtera_dismiss_errors_capability` | filter | `lumtera_dismiss_errors` | Dismissing and restoring errors, and (Pro) closing an error task as Won't fix |
| `lumtera_review_capability` | filter | `lumtera_review_mode` | [Review mode](/review-mode) on the front end, on top of `edit_post` for the post |
| `lumtera_images_capability` | filter | `upload_files` | Opening the alt text manager. Editing an image still needs `edit_post` on it. |

The three `lumtera_*` capabilities are given to roles under <span class="screen-path">Settings → Permissions</span>. By default, roles that can edit others' posts get `lumtera_view_reports` and `lumtera_dismiss_errors`, and roles that can edit posts get `lumtera_review_mode`. Administrators always have all three. A filter wins over the settings. See [Roles & permissions](/permissions).

Changing settings, including check severities, always needs `manage_options`.

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
| `lumtera_settings_sections` | filter | `array $sections` (slug => label) | Settings sections. Built in: `general`, `checks`, `ai`, `permissions` and `email-summary`. |
| `lumtera_settings_section_{$slug}` | action | | Renders your own settings section |
| `lumtera_overview_after_stats` | action | `array $totals` | Output below the Overview summary cards |
| `lumtera_content_actions` | action | `array $filters` | Buttons in the Content report header |
| `lumtera_selectable_post_types` | filter | `WP_Post_Type[] $types` | Content types offered under Settings → Content to check |
| `lumtera_pricing_url` | filter | `string $url` | Where "Buy Pro" links go |
| `lumtera_show_upgrade` | filter | `bool $show` | Whether "Upgrade to Pro" buttons show |
| `lumtera_elementor_preview_assets` | action | | Runs when Elementor's preview loads its styles |

## Media Library

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_import_embedded_alt` | filter | `bool $import` | Whether Lumtera copies alt text embedded in an uploaded image's metadata (IPTC) into the Media Library, when the image has none. Default: true only before WordPress 7.0, which does this itself. |

## Email summary

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_email_summary_active` | filter | `bool $active` | Whether the weekly [email summary](/email-summary) is scheduled and sent. Default: the setting, and always off while Lumtera Pro is active (Pro has its own weekly summary). |

## AI

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_ai_alt_text_pre` | filter | `array\|WP_Error\|null $pre`, `int $image_id`, `array $context` | Return alt text suggestions to skip the WordPress AI Client, for example to use another service. Return `null` to carry on. |
| `lumtera_ai_link_text_pre` | filter | `array\|WP_Error\|null $pre`, `array $context`, `int $post_id` | The same, for link text suggestions |
| `lumtera_ai_headings_pre` | filter | `array\|WP_Error\|null $pre`, `array $context`, `int $post_id` | The same, for heading suggestions |
| `lumtera_ai_summary_pre` | filter | `array\|WP_Error\|null $pre`, `array $context`, `int $post_id` | The same, for plain-language summaries |
| `lumtera_ai_rate_limit` | filter | `int $limit` (default 30) | AI requests one user may make in 10 minutes, across all AI features. 0 turns the limit off. |

For alt text, `$context` has `post_title`, `caption`, `heading`, `nearby`, `linked` and `link_text`. Return the same shape the AI Client call produces:

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

The writing filters get what would be sent to the provider, and your answer is tidied the same way as the provider's:

| Filter | `$context` keys | Return |
| --- | --- | --- |
| `lumtera_ai_link_text_pre` | `link_text`, `destination`, `destination_title`, `sentence`, `paragraph`, `post_title`, `rule` | `{ suggestions: string[], note }` |
| `lumtera_ai_headings_pre` | `mode` (`bold` or `outline`), `post_title`; for `bold`: `text`, `next`, `previous`; for `outline`: `paragraphs` | `bold`: `{ suggestions: string[], note }`. `outline`: `{ headings: [ { before, text } ], note }`, where `before` is the 1-based paragraph number. |
| `lumtera_ai_summary_pre` | `post_title`, `text`, `words`, `target` | `{ summary, note }` |

Return a `WP_Error` to fail the request with your own message.

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
| `lumtera.issueActions` | filter | `( actions, issue, { postId, recheck } ) => actions` | Extra buttons on each issue card. Return an array of elements. `recheck()` runs the check again, for example after your action changed what's reported. Lumtera's AI writing suggestions and Pro's **Track fix** and **Ignore everywhere…** buttons use it. |
| `lumtera.readingActions` | filter | `( actions, readability, { postId, builder } ) => actions` | Extra elements under the reading level. `readability` is the report's `readability` object. `builder` is true when a page builder renders the post. Lumtera's AI summary uses it. |

```js
wp.hooks.addFilter( 'lumtera.issueActions', 'acme/report', ( actions, issue ) => [
	...actions,
	wp.element.createElement( wp.components.Button, {
		variant: 'link',
		onClick: () => window.open( 'https://example.com/ask?rule=' + issue.rule ),
	}, 'Ask the team' ),
] );
```

The block editor data store `lumtera/checks` exposes the current results. Selectors: `getReport()`, `getCounts()`, `getStatus()`, `getError()`, `getCheckedAt()`, `isHighlighting()` and `getBlockSeverity( clientId )`.

```js
const counts = wp.data.select( 'lumtera/checks' ).getCounts();
```

## Lumtera Pro <span class="pro-pill">Pro</span> {#lumtera-pro}
| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_pro_can` | filter | `bool $allowed`, `string $feature`, `int $plan` | Plan gating for `white_label`, `acr` and `portfolio`. Only reached when the license is active. |
| `lumtera_pro_license_is_active` | filter | `bool $active`, `string $status` | Master switch for Pro features. On a network, a license below the Agency plan is already `false` here for sites other than the main site. |
| `lumtera_pro_network_license` | filter | `bool $network` | Whether the license is stored network-wide |
| `lumtera_pro_use_action_scheduler` | filter | `bool $use` (default true) | Use Action Scheduler when it's loaded (for example with WooCommerce), instead of WP-Cron |
| `lumtera_pro_send_alert` | filter | `bool $send`, `int $post_id`, `Issue[] $new` | Stop an alert about new errors on a post. `$new` is keyed by fingerprint. |
| `lumtera_pro_send_page_alert` | filter | `bool $send`, `string $url`, `string[] $new` | Stop an alert from a scheduled page check. `$new` holds the new errors' fingerprints. |
| `lumtera_pro_importing` | filter | `bool $importing` | Treat this request as an import: record the starting point without alerting. Pro turns it on while it re-checks posts after an ignore rule changes. |
| `lumtera_pro_scheduled_templates` | filter | `array $templates` (each `{url, title}`) | Templates that scheduled checks find automatically |
| `lumtera_pro_scheduled_urls` | filter | `array $urls` (each `{url, title}`) | The final list of pages for scheduled checks (same-site only, up to 25) |
| `lumtera_pro_portfolio_safe_http` | filter | `bool $safe` (default true) | Use WordPress's safe HTTP client for portfolio connections. Turn off only for local development. |
| `lumtera_pro_event` | action | `string $event`, `array $payload` | Fires for every Pro event. See [the event list](/pro/activity-webhooks#events). |
| `lumtera_pro_event_payload` | filter | `array $payload` | Change an event payload before it's logged and sent |
| `lumtera_pro_reports_sections` | action | | Output below the report list on the Reports screen. Pro's conformance report card uses it. |

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

### Constants <span class="pro-pill">Pro</span> {#constants}
Set these in `wp-config.php`:

| Constant | Effect |
| --- | --- |
| `LUMTERA_PRO_ENCRYPTION_KEY` | Key used to encrypt portfolio passwords, webhook secrets and issue tracker tokens. Set it if your salts change, for example when a host rotates them. |
| `LUMTERA_PRO_DELETE_REPORTS` | `true` deletes reports, fix history, page results and the activity log on uninstall |
| `LUMTERA_PRO_DELETE_LICENSE` | `true` deletes the license on uninstall |
