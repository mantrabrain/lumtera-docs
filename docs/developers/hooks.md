---
title: Hooks & filters
description: Every public action and filter in Lumtera and Lumtera Pro, in PHP and JavaScript, with parameters, defaults and examples.
---

# Hooks & filters

This page lists every public action and filter in Lumtera 1.0.0.3 and Lumtera Pro 1.0.0, grouped by area. Parameters are listed in the order the hook passes them. When you use more than one, pass the count to `add_filter()` or `add_action()`.

## Checks and scanning {#checks-and-scanning}

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_rule_classes` | filter | `string[] $classes` | Fully qualified class names of the checks to load. Add or remove checks. See [Custom checks](/developers/custom-checks). |
| `lumtera_register_rules` | action | `RuleRegistry $rules` | Fires after the built-in checks are registered. Register check instances with `$rules->register()`. The same ID replaces a check. |
| `lumtera_measured_rule_classes` | filter | `string[] $classes` | `MeasuredRule` classes: checks whose findings come from the browser engine in review mode and Pro page checks. Add-ons with their own [engine measures](#javascript) add their classes here. Lumtera Pro's page measures and form tests use it. |
| `lumtera_post_scanned` | action | `int $post_id`, `Report $report`, `array\|null $previous` | After a post is checked and its results stored: on save, after an Elementor save, after a dismissal, in **Check all content**, the REST scan route, `wp lumtera scan`, the `check-post` ability, after a fix is applied, and Pro's re-checks after an ignore rule changes. `$previous` is the previous summary, or `null` on the first check. |
| `lumtera_bulk_batch_done` | action | `bool $done` | After each batch of **Check all content**, and once at the end of `wp lumtera scan`. `$done` is true when the whole run has finished. |
| `lumtera_bulk_scan_done` | action | `array $totals` | When a **Check all content** run has finished: the last batch of the Overview's bulk check, or `wp lumtera scan --all`. `$totals` are the site-wide totals after the run. |
| `lumtera_pre_render_content` | filter | `string\|null $html`, `string $content`, `int $post_id` | Return HTML to check instead of rendering the post content. Only runs for saved posts. Lumtera's own page builder integrations (Elementor, Divi, Beaver Builder, Bricks, Oxygen, WPBakery) use it. The HTML you return is used as it is. |
| `lumtera_rendered_content` | filter | `string $html`, `int $post_id` | Change the rendered HTML before it's checked. `$post_id` is 0 for unsaved content. Lumtera's Advanced Custom Fields and WooCommerce integrations use it to add field values and the product short description. |
| `lumtera_the_content_meta_keys` | filter | `string[] $keys`, `int $post_id` | Post meta keys that mark a post as built by a page builder that adds its layout through `the_content` |
| `lumtera_render_with_the_content` | filter | `bool $built`, `int $post_id` | Whether Lumtera renders a post through `the_content`, for builders without their own integration. Default: true when one of the meta keys above is set. Posts with empty or placeholder content are rendered this way anyway. |
| `lumtera_managed_by_builder` | filter | `string\|null $name`, `int $post_id` | The page builder that manages a post, for builders Lumtera doesn't know. Return its name, and Lumtera won't change the post's content directly. Default `null`. |
| `lumtera_review_html` | filter | `string $content`, `int $post_id` | The content HTML as it reaches the browser, used to map issues to elements in review mode. For plugins that wrap the content in markers they remove later (TranslatePress, for example). |
| `lumtera_max_check_bytes` | filter | `int $bytes` (default 524288) | The largest content accepted for a live check. At least 1024. |
| `lumtera_check_rate_limit` | filter | `int $limit` (default 120) | Live checks per user per minute. 0 turns the limit off. |
| `lumtera_readability_language` | filter | `string $lang`, `int $post_id` | Two-letter language code used to pick the reading-level formula. Default: the post's language in Polylang or WPML, otherwise the site language. `$post_id` is 0 when unknown. |
| `lumtera_readability_supported` | filter | `bool $supported`, `string $lang` | Whether to measure a reading level. Default: true for `en`, `es`, `fr`, `de`, `it` and `nl`. Forcing it on for another language uses the English formula. |
| `lumtera_link_to_document_message` | filter | `string $message`, `string $href`, `string $ext` | Message for the [link-to-document](/checks#link-to-document) check |
| `lumtera_new_window_phrases` | filter | `string[] $phrases` | Lowercase phrases that count as warning that a link opens a new tab, for the [link-new-window](/checks#link-new-window) check |
| `lumtera_vague_link_phrases` | filter | `string[] $phrases`, `string $lang` | Link texts that say nothing on their own ("click here"), per two-letter language code, for the [link-ambiguous-text](/checks#link-ambiguous-text) check. Adding texts for a language without a built-in list makes its matches "Needs review" instead of tips. |
| `lumtera_sensory_phrases` | filter | `string[] $phrases`, `string $lang` | Complete PCRE patterns (with delimiters and flags) the [sensory-language](/checks#sensory-language) check looks for, per language prefix. Empty for every language except English by default. |

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

### Example: accept phrases in another language

```php
add_filter( 'lumtera_new_window_phrases', function ( array $phrases ): array {
	$phrases[] = 'nueva pestaña';
	return $phrases;
} );

add_filter( 'lumtera_vague_link_phrases', function ( array $phrases, string $lang ): array {
	if ( 'de' === $lang ) {
		$phrases[] = 'hier klicken';
	}
	return $phrases;
}, 10, 2 );
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

## Site parts {#site-parts}

[Site parts](/site-parts) are the template parts, synced patterns, navigation menus and widget areas every page shares. Lumtera checks them on their own, so an issue in the header is reported once.

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_scan_site_parts` | filter | `array $parts` | The site parts Lumtera checks. Add a part a plugin prints, or leave one out. Each part is `{ type, key, label, blocks }` plus either `markup` (block markup when `blocks` is true, otherwise HTML) or `render` (a callable that returns HTML). `type` must be one of Lumtera's source types, such as `template_part`, `menu` or `widget`. Up to 200 parts are checked. |
| `lumtera_parts_scan_done` | action | `array $result` | After every site part was checked and the findings stored, from the Overview or `wp lumtera scan --parts`. `$result` is `{ checked, issues, failed, skipped }`. `failed` maps each part to the reason it couldn't be checked. |

## Whole-page results and audit mode {#whole-page}

Review mode's whole-page checks and Lumtera Pro's page checks run in a browser, on a page loaded in audit mode (`?lumtera-audit=<nonce>`). See [Accessibility checks in CI: Audit mode](/developers/ci#audit-mode).

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_audit_scripts` | action | `string $core` | When audit mode adds the engine to a page. Enqueue your own measures here: scripts that depend on `$core` (`lumtera-audit-core`) and call `lumteraAudit.register()`. Lumtera Pro's page measures and form tests use it. |
| `lumtera_signed_check_request` | filter | `bool $signed` (default false), `string $context` | Whether this request is a check an add-on verified itself (with a signed, one-time pass), so it gets audit mode (`$context` `audit`) or source markers (`markers`) without a signed-in editor. Return true only for a request you verified. Lumtera Pro's signed-in checks use it. |
| `lumtera_max_page_bytes` | filter | `int $bytes` (default 3 MB) | The largest page snapshot the whole-page checks may send to the server |
| `lumtera_page_results_max_rows` | filter | `int $rows` (default 500) | Most whole-page results kept: one per address, screen width and role. Older rows are removed first. |
| `lumtera_page_result_sources` | filter | `array $rows` (default empty), `array $filters` | Whole-page results from other sources, merged with review mode's. Each row: `url`, `issues`, `source`, `origin`, `viewport`, `role`, `post_id`, `checked_at`. `$filters` holds what was asked for (`url`, `post_id`, `limit`). Lumtera Pro's page checks use it. |
| `lumtera_page_features` | filter | `array\|null $found`, `int $post_id` | What a post's page contains (forms, video, search…), used to suggest checklist items that don't apply. Return `[ 'features' => array<string, bool>, 'time' => int ]` to replace an older record. Lumtera Pro's page checks use it. |
| `lumtera_help_lexicon` | filter | `array $lexicon` | Words that mark a link as a way to get help (WCAG 3.2.6), by kind: `contact`, `help`, `support` and `faq`. Lowercase, matched as whole words in the link's name or as a segment of its path. |

## WP-CLI {#wp-cli}

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_cli_stored_page_results` | filter | `array $results` (default empty), `string $url` | Stored browser results for a page, added by [`wp lumtera check --page --stored`](/developers/wp-cli#adding-browser-results). Each item: `rule` (check ID), `severity`, `message`, `context` (markup) and optionally `fingerprint`. Items without a known rule ID or severity are left out. Lumtera adds the results saved from review mode here. |

`wp lumtera scan` also fires `lumtera_bulk_batch_done`, `lumtera_bulk_scan_done` and, with `--parts`, `lumtera_parts_scan_done`.

## Dismissing and ignoring {#dismissing}

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_issue_dismissed` | action | `int $post_id`, `string $fingerprint`, `string $rule_id`, `string $note` | After an issue is dismissed on a post |
| `lumtera_issue_restored` | action | `int $post_id`, `string $fingerprint`, `string $rule_id` | After a dismissed issue is restored |
| `lumtera_ignored_issue` | filter | `array\|null $record`, `Issue $issue`, `int $post_id` | Hide a finding wherever it appears, not just on one post. Return `null` to leave it open, or a record to report it as dismissed. `$post_id` is 0 for a whole page. |
| `lumtera_false_positive_url` | filter | `string $url` | Where **Report a false positive** links go. Default: Lumtera's support forum on WordPress.org. A GitHub new-issue URL (`…/issues/new`) is prefilled with a title and the text. Any other URL opens as it is, with the text shown to copy. |

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

## Fixes {#fixes}

Fixes are proposed, reviewed and applied as changes. See [Fixing issues](/fixing-issues).

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_change_allowed` | filter | `bool\|WP_Error $allowed` (default true), `string $action`, `array $change`, `int $user_id` | Whether a person may `approve`, `reject`, `apply` or `revert` a change. Return a `WP_Error` to refuse with your own message. Lumtera Pro's fix approvals use it. |
| `lumtera_change_applied` | action | `array $change` | After a change is written to a post and the post checked again. `$change['status']` is `applied`. |
| `lumtera_change_reverted` | action | `array $change` | After an applied change is undone. `$change['status']` is `reverted`. |

```php
// Only editors may apply fixes to pages.
add_filter( 'lumtera_change_allowed', function ( $allowed, string $action, array $change, int $user_id ) {
	if ( true === $allowed && 'apply' === $action && 'page' === get_post_type( (int) $change['post_id'] )
		&& ! user_can( $user_id, 'edit_others_pages' ) ) {
		return new WP_Error( 'acme_pages', 'Ask an editor to apply fixes to pages.' );
	}
	return $allowed;
}, 10, 4 );
```

## Guided checklists {#manual-checks}

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_manual_test_saved` | action | `int $post_id`, `string $test`, `string $result`, `array\|null $record` | After a checklist result is recorded or cleared on a post, once it's stored. One call per checklist item. `$test` is a WCAG criterion number, such as `2.1.4`. `$result` is `pass`, `fail` or `na`, and empty when cleared. `$record` is `{ result, note, failed, user, time }`, or `null` when cleared. |

## Statement and exceptions {#statement}

See [Accessibility statement](/statement).

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_statement_saved` | action | `int $page_id`, `array $data` | After the statement is written to a page, once the page and the answers are saved. `$data` holds the sanitized answers. |
| `lumtera_statement_aside` | action | `array $answers` | In the statement screen's side column. Lumtera Pro's burden records use it. |
| `lumtera_statement_burden_items` | filter | `string[] $items` (default empty), `array $answers` | Public summaries of disproportionate burden assessments, one plain-text line each, for the statement's burden section. Lumtera Pro's [burden records](/pro/burden) use it. |
| `lumtera_statement_method_items` | filter | `string[] $items` (default empty), `array $answers` | More ways the site was evaluated, one plain-text line each, for the statement's "how we evaluated" list |
| `lumtera_statement_has_feedback_link` | filter | `bool $linked`, `array $saved` | Whether the statement links to a way to give feedback. Default: whether a feedback form link is set. |
| `lumtera_exception_tagged` | action | `int $post_id`, `array\|null $tag`, `string $previous` | After an exception tag is set, changed or removed on a post or attachment. `$tag` is `{ type, note, tagged_by, date }`, or `null` when removed. `$previous` is the type it had before, empty when it had none. |

## Feedback {#feedback}

See [Accessibility feedback](/feedback).

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_feedback_received` | action | `int $id`, `array $data` | After a visitor's feedback is stored. `$data` holds `reference`, `type`, `page_url`, `post_id` and `reply_format`, never the name, email address or message. |
| `lumtera_feedback_updated` | action | `int $id`, `string $status`, `string $old` | After a feedback record changes status: `new`, `in_progress`, `answered` or `closed` |
| `lumtera_feedback_is_spam` | filter | `bool $spam`, `array $data` | Whether a message is spam. Spam isn't stored, and the sender sees the usual thank-you. `$data` holds the cleaned fields. |
| `lumtera_feedback_rate_limit` | filter | `int $limit` (default 5) | Messages one IP address may send per hour. 0 turns the limit off. |
| `lumtera_feedback_client_ip` | filter | `string $ip` | The visitor IP address the limit counts. Default: `REMOTE_ADDR`. Behind a proxy that sets a trusted header, return that address. |
| `lumtera_feedback_capability` | filter | `string $capability` | Capability needed to read and answer feedback. Default `lumtera_manage_feedback` (editors and administrators). |
| `lumtera_feedback_query_args` | filter | `array $args`, `array $filters` | The inbox's `WP_Query` arguments, for example to show only overdue items |
| `lumtera_feedback_views` | filter | `array $views` (default empty) | Extra inbox views, as slug => label. Lumtera Pro adds **Overdue**. |
| `lumtera_feedback_badges` | filter | `array $badges` (default empty), `array $item` | Tags shown next to a record's status. Each is `{ text, tone }`, where `tone` is `crit`, `warn`, `good` or empty. |
| `lumtera_feedback_notices` | filter | `array $ok` | Confirmations the inbox can show after an action, as code => text. Add yours when you add an action. |
| `lumtera_feedback_errors` | filter | `array $errors` | Error messages the inbox can show after an action, as code => text |
| `lumtera_feedback_item_details` | action | `array $item` | Under a feedback record's details, for example for an assignee |
| `lumtera_feedback_item_actions` | action | `array $item` | In a feedback record's status card, for more actions |

```php
// Send new feedback to a help desk. The message itself stays in WordPress.
add_action( 'lumtera_feedback_received', function ( int $id, array $data ) {
	wp_remote_post( 'https://helpdesk.example.com/hooks/a11y', [
		'body' => [ 'reference' => $data['reference'], 'page' => $data['page_url'] ],
	] );
}, 10, 2 );
```

## Permissions {#permissions}

| Hook | Type | Default | Controls |
| --- | --- | --- | --- |
| `lumtera_capability` | filter | `lumtera_view_reports` | The Overview, Content report, Free vs Pro, the Dashboard widget, `/site-summary`, the `site-summary` ability, and Pro's report screens and routes (page checks, documents, reports, the conformance report, creating tracker issues) |
| `lumtera_can_check_all` | filter | `true` | Whether the current user may run **Check all content** (the Overview's buttons and the `/lumtera/v1/bulk` route). Only asked for people who pass `lumtera_capability`. Lumtera Pro's read-only client role turns it off. |
| `lumtera_dismiss_errors_capability` | filter | `lumtera_dismiss_errors` | Dismissing and restoring errors, and (Pro) closing an error task as Won't fix |
| `lumtera_review_capability` | filter | `lumtera_review_mode` | [Review mode](/review-mode) on the front end, on top of `edit_post` for the post, and audit mode |
| `lumtera_images_capability` | filter | `upload_files` | Opening the alt text screen. Editing an image still needs `edit_post` on it. |
| `lumtera_feedback_capability` | filter | `lumtera_manage_feedback` | Reading and answering [feedback](/feedback) |
| `lumtera_permission_defaults` | filter | capability => role names | The default grants: the roles each capability goes to before anyone changes the setting. An add-on that makes its own role adds it here. Lumtera Pro adds its "Accessibility client" role. |

The `lumtera_*` capabilities are given to roles under <span class="screen-path">Lumtera → Settings → Permissions</span>. By default, roles that can edit others' posts get `lumtera_view_reports`, `lumtera_dismiss_errors` and `lumtera_manage_feedback`, and roles that can edit posts get `lumtera_review_mode`. Administrators always have all of them. A filter wins over the settings. See [Roles & permissions](/permissions).

Changing settings, including check severities, always needs `manage_options`.

```php
// Let site managers with a custom capability see the reports.
add_filter( 'lumtera_capability', fn() => 'manage_accessibility' );
```

## Admin screens {#admin-screens}

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_edit_url` | filter | `string $url`, `int $post_id` | The "edit" link Lumtera uses everywhere. Point it at your page builder. |
| `lumtera_admin_groups` | filter | `array $groups` | The **Lumtera** menu's groups, as key => `{ label, screens, tabs? }`. `screens` lists page slugs in order. Built in: `overview`, `check`, `fix`, `report`, `engage`, `agency`, `settings` and `upgrade` (menu only, `tabs` false). Put your screen in a group here. A screen no group lists gets its own menu item and tab. |
| `lumtera_screen_order` | filter | `string[] $order` | Order of Lumtera's screens (page slugs), for the tabs and the menu |
| `lumtera_admin_tabs` | filter | `array $tabs` (slug => label) | Screens shown as tabs in the Lumtera header. Add your own screen here, and put it in a group with `lumtera_admin_groups`. |
| `lumtera_admin_tab_badges` | filter | `array $badges` (slug => text) | Short tags shown after a tab's label, such as "Pro" on screens that need a license |
| `lumtera_settings_sections` | filter | `array $sections` (slug => label) | Settings sections. See [the list below](#settings-sections). |
| `lumtera_settings_groups` | filter | `array $groups` | How the Settings index groups its sections, as key => `{ label, sections }`. Built in: `checking`, `fixing`, `people`, `notifications`, `feedback`, `reports` and `pro`. |
| `lumtera_settings_meta` | filter | `array $meta` | Each section's icon and one-line description on the Settings index, as slug => `{ icon, description }`. An unknown icon shows as a dot. |
| `lumtera_settings_keywords` | filter | `array $keywords` (slug => words) | Extra words, separated by commas, that **Find a setting** matches for each section |
| `lumtera_settings_section_{$slug}` | action | | Renders your own settings section |
| `lumtera_overview_after_stats` | action | `array $totals` | Output below the Overview summary cards |
| `lumtera_show_getting_started` | filter | `bool $show` | Whether the Overview shows the free [getting-started checklist](/quick-start#the-getting-started-checklist). Default `true` (for people who manage the site, until they dismiss it). Lumtera Pro returns `false` while its own [first-run checklist](/pro/license#first-run-checklist) shows, so there are never two. |
| `lumtera_ask_for_review` | filter | `bool $ask` | Whether the Overview may show the [review request](/site-report#review-request). Default `true`; it still waits a week and for real progress. Return `false` to never ask, for example on client sites. |
| `lumtera_content_actions` | action | `array $filters` | Buttons in the Content report header |
| `lumtera_selectable_post_types` | filter | `WP_Post_Type[] $types` | Content types offered under <span class="screen-path">Lumtera → Settings → General</span> |
| `lumtera_pricing_url` | filter | `string $url` | The pricing page that "Upgrade to Pro", plan links and [Pro tips](/site-report#pro-tips) open. Lumtera adds its own tracking tags and plan anchor to it. |
| `lumtera_show_upgrade` | filter | `bool $show` | Whether "Upgrade to Pro" buttons, [Pro tips](/site-report#pro-tips) and the weekly email's note about Pro show. The Pro preview screens follow whether Lumtera Pro is active, not this filter. Default: true unless Lumtera Pro is active. |
| `lumtera_docs_base` | filter | `string $base` | The documentation address the **Docs** buttons use, ending in a slash, for example for a mirror. Default `https://lumtera.mantrabrain.com/docs/`. |
| `lumtera_docs_path` | filter | `string $path`, `string $slug`, `string $section` | Which documentation page an admin screen's **Docs** button opens. `$slug` is the screen's page slug and `$section` the settings section, if any. An empty path opens the docs home. Lumtera Pro uses it to point its own screens (Test sessions, Fixes queue, Evidence, Compare scans, the conformance report and **Fix approvals**) at their pages. |
| `lumtera_elementor_preview_assets` | action | | Runs when Elementor's preview loads |

### Built-in settings sections {#settings-sections}

| Slug | Label | Plugin |
| --- | --- | --- |
| `general` | General | Lumtera |
| `checks` | Checks | Lumtera |
| `site-fixes` | Site fixes | Lumtera |
| `ai` | AI suggestions | Lumtera |
| `permissions` | Permissions | Lumtera |
| `feedback` | Feedback | Lumtera |
| `email-summary` | Email summary | Lumtera |
| `ignore` | Ignore rules | Lumtera Pro |
| `fix-approvals` | Fix approvals | Lumtera Pro |
| `alerts` | Alerts | Lumtera Pro |
| `feedback-targets` | Response targets | Lumtera Pro |
| `branding` | Branding | Lumtera Pro |
| `integrations` | Integrations | Lumtera Pro |
| `issue-trackers` | Issue trackers | Lumtera Pro |
| `license` | License | Lumtera Pro |

```php
// Add your own section to the "Reports and integrations" group.
add_filter( 'lumtera_settings_sections', fn( $sections ) => $sections + [ 'acme' => 'Acme export' ] );
add_filter( 'lumtera_settings_groups', function ( $groups ) {
	$groups['reports']['sections'][] = 'acme';
	return $groups;
} );
add_action( 'lumtera_settings_section_acme', function () {
	echo '<p>Acme export settings…</p>';
} );
```

## Media Library

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_import_embedded_alt` | filter | `bool $import` | Whether Lumtera copies alt text embedded in an uploaded image's metadata (IPTC) into the Media Library, when the image has none. Default: true only before WordPress 7.0, which does this itself. |

## Email summary {#email-summary}

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_email_summary_active` | filter | `bool $active` | Whether the weekly [email summary](/email-summary) is scheduled and sent. Default: the setting, and off while Lumtera Pro sends its own weekly digest (see the next filter). |
| `lumtera_home_watch_url` | filter | `string $url` | The page the [weekly home page check](/settings#weekly-home-page-check) loads. Default `home_url( '/' )`. It must be on this site: other addresses are refused. |
| `lumtera_pro_sends_digest` | filter | `bool $sends` | Whether Lumtera Pro's weekly digest replaces the free summary. Default: whether Lumtera Pro is active. Lumtera Pro returns whether its license is active, so with Pro installed but unlicensed, the free summary is still sent. |

## Agency hub {#agency-hub}

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_site_summary` | filter | `array $data` | The summary an agency hub reads from `/lumtera/v1/site-summary` and the `site-summary` ability. Add fields. Don't remove or retype existing ones: older hubs rely on them. |

## AI {#ai}

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_ai_alt_text_pre` | filter | `array\|WP_Error\|null $pre`, `int $image_id`, `array $context` | Return alt text suggestions to skip the WordPress AI Client, for example to use another service. Return `null` to carry on. |
| `lumtera_ai_link_text_pre` | filter | `array\|WP_Error\|null $pre`, `array $context`, `int $post_id` | The same, for link text suggestions |
| `lumtera_ai_headings_pre` | filter | `array\|WP_Error\|null $pre`, `array $context`, `int $post_id` | The same, for heading suggestions |
| `lumtera_ai_summary_pre` | filter | `array\|WP_Error\|null $pre`, `array $context`, `int $post_id` | The same, for plain-language summaries |
| `lumtera_ai_rate_limit` | filter | `int $limit` (default 30) | AI requests one user may make in 10 minutes, across all AI features. 0 turns the limit off. Lumtera Pro's fixes queue reads the same allowance. |

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

Return a `WP_Error` to fail the request with your own message. When one of these filters is in use, Lumtera also offers the matching AI fix without the WordPress AI Client. See [AI features](/ai).

## Site fixes {#site-fixes}

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_site_fixes_skip_link_target` | filter | `string $target` | Skip-link target ID (without `#`) when none is saved |
| `lumtera_site_fixes_theme_has_skip_link` | filter | `bool $has` | Whether the theme already prints a skip link, so Lumtera adds none |
| `lumtera_site_fixes_viewport` | filter | `string $content` | The viewport tag content printed by the zoom fix. Default: `width=device-width, initial-scale=1`. |
| `lumtera_site_fixes_filter_content` | filter | `bool $run` | Whether the link fixes run on this request |
| `lumtera_purge_page_cache` | action | | After Lumtera asked the page caches it knows to empty, because something every page shows changed. Hook in to empty a cache it doesn't know, such as a host's or a CDN's. |

```php
// My theme prints its skip link in a way Lumtera can't detect.
add_filter( 'lumtera_site_fixes_theme_has_skip_link', '__return_true' );
```

## Storage {#storage}

See [Stored data](/developers/data).

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_tables` | filter | `string[] $tables` | Full names of the database tables Lumtera and add-ons need on each site. When one is missing, Lumtera's screens tell administrators and offer a button that recreates the tables. |
| `lumtera_repair_tables` | action | | When an administrator repairs Lumtera's tables. Add-ons recreate theirs. |
| `lumtera_derived_post_meta` | filter | `string[] $keys` | Post meta keys that hold results for this site only (the summary, the score and the reopened marker), so they're left out of WordPress exports and imports |

## JavaScript {#javascript}

### wp.hooks filters

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

### Globals

These are loaded only for signed-in users who may use review mode, never for visitors.

| Global | Where | What it is |
| --- | --- | --- |
| `window.lumteraAudit` | Pages in audit mode and review mode | The browser engine behind the whole-page checks. `register( measure )` adds a measure (`name`, `collect( ctx )`, `decide( data )`, and optionally `phase`, `order`, `budget`, `onDemand` and `rules`). `run( options )` runs the measures and resolves to `{ version, findings, partial, failed, errors, ms, viewport, measures }`. `measures()` and `rules()` list what is registered. A `lumtera-audit-ready` event fires on `window` once it has loaded. |
| `window.lumteraFixModal` | The Content report and the block editor | The **Fix without opening** dialog, which shows a fix as before and after, applies it and undoes it. `open()` opens it; `supports()` says whether a fix can be shown this way. |
| `window.lumteraReviewKeyboard` | Review mode | Builds the **Keyboard** tab. `create( api )` returns its tab and panel. |
| `window.lumteraReviewSrPreview` | Review mode | Builds the **Screen reader** tab, an approximation of what screen readers announce. `create( api )` returns its tab and panel. |
| `window.lumteraReviewManual` | Review mode | Builds the **Manual checks** tab from the post's guided checklist. `create( api )` returns its tab and panel. |

Only `lumteraAudit.register()` and `lumteraAudit.run()` are meant for add-ons. The review-mode globals are how Lumtera's own review mode puts its tabs together.

```js
// A measure an add-on enqueues on the lumtera_audit_scripts action.
window.lumteraAudit.register( {
	name: 'acme-marquee',
	rules: { 'acme-marquee': { criteria: [ '2.2.2' ], severity: 'warning', confidence: 'likely' } },
	collect: () => ( { count: document.querySelectorAll( 'marquee' ).length } ),
	decide: ( data ) => ( data.count ? [ { rule: 'acme-marquee', data } ] : [] ),
} );
```

Findings from a measure need a matching `MeasuredRule` class on the server, added with `lumtera_measured_rule_classes`, for their wording.

## Lumtera Pro {#lumtera-pro}

<div class="pro-callout">These hooks exist only while Lumtera Pro is active. Most Pro features also need an active license.</div>

### Plans and license

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_pro_can` | filter | `bool $allowed`, `string $feature`, `int $plan` | Whether the plan includes a feature. Only asked while the license is active. Features on every plan: `acr`, `carousel_motion`, `evidence`, `form_flows`, `role_scans`, `state_contrast`. Freelancer and up: `white_label`, `client_emails`, `share_links`, `portfolio`, `consistency`. Agency and up: `approval_policy`, `network`. An unknown feature is refused. `$plan` is the store's price ID (see `lumtera_pro_price_plan_map`; 0 when unknown). |
| `lumtera_pro_limit` | filter | `int $limit`, `string $feature`, `int $plan` | A plan's allowance for a counted feature: `scheduled_pages` (pages per scheduled run), `batch_size` (fixes per queue run), `portfolio_sites` (client sites) or `role_scans` (roles for [signed-in checks](/pro/signed-in-checks)). 0 means no set number, and -1 that the plan doesn't include it. A feature that isn't listed gets -1. Defaults below. |
| `lumtera_pro_price_plan_map` | filter | `array $map` (price ID => plan) | Maps the store's price IDs to plans (1 Business, 2 Freelancer, 3 Agency, 4 Unlimited). Default: 1–4 are the yearly prices and 5–8 the [lifetime](/pro/license#yearly-and-lifetime-licenses) prices of the same plans. Entries that aren't a positive price ID mapped to a known plan are ignored, and an ID missing from the map counts as Business. |
| `lumtera_pro_license_activated` | action | `int $plan` | After a key is activated on this site (or network). Pro uses it to put every scheduled job back in place. |
| `lumtera_pro_license_checked` | action | `string $status` | After each daily license check with the store, with the stored status, such as `valid` or `expired`. |
| `lumtera_pro_onboarding_steps` | filter | `array $steps`, `int $plan` | The steps of the [first-run checklist](/pro/license#first-run-checklist). Each step is `{ id, title, text, url, action, done }`; `done` ticks it off. |
| `lumtera_pro_scheduled_page_limit` | filter | `int $limit`, `int $plan` | Pages one scheduled check run may fetch, after `lumtera_pro_limit`. A run always has a cap: 0 from `lumtera_pro_limit` becomes the top plan's 500. At least 1. |
| `lumtera_pro_license_is_active` | filter | `bool $active`, `string $status` | Master switch for Pro features. On a network, a license below the Agency plan is already `false` here for sites other than the main site. |
| `lumtera_pro_network_license` | filter | `bool $network` | Whether the license is stored and activated once for the network. Default: whether Pro is network-activated. |

Default limits for `lumtera_pro_limit`:

| Feature | Business | Freelancer | Agency | Unlimited |
| --- | --- | --- | --- | --- |
| `scheduled_pages` | 25 | 100 | 250 | 500 |
| `batch_size` | 25 | 100 | 250 | 500 |
| `portfolio_sites` | -1 (none) | 5 | 25 | 0 (no set number) |
| `role_scans` | 1 | 1 | 0 (no set number) | 0 (no set number) |

```php
// Let a staging site check more pages per scheduled run.
add_filter( 'lumtera_pro_limit', function ( int $limit, string $feature ) {
	return 'scheduled_pages' === $feature && 'staging' === wp_get_environment_type() ? 1000 : $limit;
}, 10, 2 );
```

### Scheduled and browser page checks

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_pro_scheduled_templates` | filter | `array $templates` (each `{url, title}`) | Key templates scheduled checks include automatically |
| `lumtera_pro_scheduled_urls` | filter | `array $urls` (each `{url, title}`) | The final list of pages for scheduled checks, in order. Only this site's pages are ever requested. The list is capped at the plan's page limit. |
| `lumtera_pro_sitemap_urls` | filter | `string[] $list` | Sitemap addresses scheduled checks try, in order. Only this site's addresses are requested. |
| `lumtera_pro_scheduled_page_checked` | action | `string $url`, `string $html`, `array $row` | After a scheduled check stored a page. `$html` is the markup as fetched. |
| `lumtera_pro_browser_page_checked` | action | `string $url`, `string $html`, `string $viewport` | After a browser check stored a page. `$viewport` is `desktop` or `phone`. |
| `lumtera_pro_page_checks_side` | action | | In the Page checks screen's side column, after the scheduled checks card. Signed-in checks use it. |
| `lumtera_pro_page_checks_after_results` | action | | After the results card on the Page checks screen. Form tests use it. |
| `lumtera_pro_send_page_alert` | filter | `bool $send`, `string $url`, `string[] $new` | Stop an alert from a scheduled page check. `$new` holds the new errors' fingerprints. |

### Form tests, consistency and signed-in checks

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_pro_form_tested` | action | `array $form` | After a [form test](/pro/form-tests)'s outcome is stored. `$form` includes its last result. |
| `lumtera_pro_consistency_checked` | action | `array $result` | After [cross-page consistency](/pro/consistency) was checked. `$result` is `{ checked_at, pages, items }`. |
| `lumtera_pro_role_scan_shop_pages` | filter | `array $pages` | WooCommerce pages [signed-in checks](/pro/signed-in-checks) can include, as key => `{ label, url }`. Only this site's addresses are kept. |
| `lumtera_pro_role_scan_sample_product` | filter | `int $product_id` | The product signed-in checks put in the test user's cart. 0 for none. |
| `lumtera_pro_pass_blocked_query_keys` | filter | `string[] $keys` | Query arguments that make a page do something when opened (`add-to-cart`, `action`, `_wpnonce` and more), so a signed-in check never opens an address carrying one |

### Alerts and monitoring

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_pro_send_alert` | filter | `bool $send`, `int $post_id`, `Issue[] $new` | Stop an alert about new errors on a post. `$new` is keyed by fingerprint. |
| `lumtera_pro_importing` | filter | `bool $importing` | Treat this request as an import: record the starting point without alerting. Default: whether `WP_IMPORTING` is on. Pro turns it on while it re-checks posts after an ignore rule changes. |
| `lumtera_pro_use_action_scheduler` | filter | `bool $use` (default true) | Use Action Scheduler when it's loaded (for example with WooCommerce), instead of WP-Cron |

### Fixes queue and evidence

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_pro_remediation_ai_allowed` | filter | `bool $allowed` | Whether a [fixes queue](/pro/fixes-queue) run may ask for another AI draft now. Default: whether the user still has AI requests left under `lumtera_ai_rate_limit`. |
| `lumtera_pro_ledger_lock_wait` | filter | `int $seconds` (default 2) | Seconds a new [evidence](/pro/evidence) entry waits for the ledger lock before it's stored outside the chain |

### Events, reports and clients

| Hook | Type | Parameters | Purpose |
| --- | --- | --- | --- |
| `lumtera_pro_event` | action | `string $event`, `array $payload` | Fires for every Pro event. See [the event list](/pro/activity-webhooks#events). |
| `lumtera_pro_event_payload` | filter | `array $payload` | Change an event payload before it's logged and sent |
| `lumtera_pro_reports_sections` | action | | Output below the report list on the Reports screen. Pro's conformance report card uses it. |
| `lumtera_pro_report_row_actions` | action | `int $report_id`, `string $name` | Among a report's actions in the reports list (for example **Share**). `$name` is the title and client, for screen reader labels. |
| `lumtera_pro_burden_saved` | action | `int $id`, `array $record`, `array\|null $old` | After a [burden record](/pro/burden) is saved. `$old` is `null` for a new record. |
| `lumtera_pro_client_rest_allowed` | filter | `string[] $allowed` (default empty) | REST routes the read-only client role may still write to, for an add-on's read-style POST route, for example `/my-addon/v1/preview` |
| `lumtera_pro_portfolio_safe_http` | filter | `bool $safe` (default true) | Use WordPress's safe HTTP client for portfolio connections. Turn off only for local development. |

Lumtera Pro also uses the free plugin's hooks: `lumtera_ignored_issue` (ignore rules, and on whole pages), `lumtera_page_result_sources`, `lumtera_page_features`, `lumtera_measured_rule_classes`, `lumtera_audit_scripts`, `lumtera_signed_check_request`, `lumtera_statement_burden_items`, `lumtera_feedback_views`, `lumtera_feedback_badges`, `lumtera_can_check_all`, `lumtera_permission_defaults`, `lumtera_pro_sends_digest` and `lumtera_settings_sections`.

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

### Constants {#constants}

<p><span class="pro-pill">Pro</span> Every plan</p>

Set these in `wp-config.php`:

| Constant | Effect |
| --- | --- |
| `LUMTERA_PRO_ENCRYPTION_KEY` | Key used to encrypt portfolio passwords, webhook secrets and issue tracker tokens. Set it if your salts change, for example when a host rotates them. |
| `LUMTERA_PRO_DELETE_REPORTS` | `true` deletes reports, fix history, page results and the activity log on uninstall |
| `LUMTERA_PRO_DELETE_LICENSE` | `true` deletes the license on uninstall |
