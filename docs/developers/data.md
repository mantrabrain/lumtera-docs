---
title: Data & uninstall
description: What Lumtera and Lumtera Pro store (tables, options, post meta, user meta, post types, capabilities and scheduled jobs), what is sent outside your site, the personal data tools, and what deleting each plugin removes.
---

# Data & uninstall

This page lists everything Lumtera 1.0 and Lumtera Pro 1.0 store in your database. `{prefix}` is your table prefix, usually `wp_`.

## Nothing leaves your site by default {#nothing-leaves-your-site-by-default}

- Lumtera runs entirely inside your WordPress. No account, no API key, no MantraBrain servers.
- Nothing runs for visitors, except the site fixes you switch on, and the statement link and [feedback form](/feedback) where you place them.
- Nothing is sent to an outside service unless you switch on AI suggestions under [Settings](/settings). Then data is sent only to the AI provider connected to WordPress, and only when someone clicks a button for a suggestion. For alt text, that's the image and the text around it. For link text, headings and summaries, it's the text involved and the post title.
- The feedback form sends a message to Akismet only if you turn on its spam check. Then the message and the sender's IP address go to Akismet.
- The weekly [email summary](/email-summary) is off by default. When it's on, WordPress emails site totals to the addresses you enter.
- While content is rendered for a check, outgoing HTTP requests are blocked, so blocks like RSS feeds and embeds don't fetch anything.

Lumtera Pro contacts `store.mantrabrain.com` to check your license and updates. It sends the license key, your site address and the environment type. It sends data elsewhere only where you set it up:

- Slack and webhook addresses you add (see [Activity and webhooks](/pro/activity-webhooks))
- client sites you connect to the [client portfolio](/pro/portfolio), and the client update emails you turn on
- the issue tracker you connect (GitHub, GitLab, Jira or Linear). An issue holds the finding, its markup snippet, how to fix it, the page title, its view and edit links, a link to the task on the **Fix tracking** screen, and the site name. When a fix is applied or undone, Pro adds a comment to the linked issue.

## Free plugin {#free-plugin}

### Tables {#tables}

The database version is `5`. It's stored in the `lumtera_db_version` option. When the number in the code is higher, Lumtera upgrades the tables once, on the first request that gets a database lock.

| Table | What it holds | Key columns |
| --- | --- | --- |
| `{prefix}lumtera_issues` | One row per open finding in saved content. A post's rows are replaced each time it's checked, and removed when it's deleted. Dismissed findings, and findings ignored site-wide in Pro, have no rows. | `post_id`, `rule_id`, `severity`, `fingerprint`, `occurrence`, `message`, `context` (the markup snippet), `created_at`, `source_type` and `source_id` (the [site part](/site-parts) the finding comes from, or `content`), `confidence` |
| `{prefix}lumtera_parts` | Findings in [site parts](/site-parts): template parts, synced patterns, navigation menus, classic menus and widget areas. Each part is checked on its own. | `part_type`, `part_key`, `rule_id`, `severity`, `confidence`, `fingerprint`, `occurrence`, `message`, `context`, `created_at` |
| `{prefix}lumtera_page_results` | Whole-page results saved from [review mode](/review-mode), one row per address, viewport and role. Only saved when the person ticked **Save results to reports**. Up to 500 rows; the oldest go first. | `url_hash`, `url`, `post_id`, `viewport`, `width`, `role`, `source`, `engine`, `errors`, `warnings`, `notices`, `issues`, `snapshot`, `checked_at`, `checked_by` |
| `{prefix}lumtera_changes` | Change sets: fixes proposed for content, who approved and applied them, and what undoing one restores. See [Fixing issues](/fixing-issues). | `post_id`, `part_key`, `rule_id`, `fingerprint`, `origin`, `before`, `after`, `patch`, `status`, `proposed_by`, `approved_by`, `applied_by`, `revision_before`, `revision_after`, `verify`, `verify_detail`, `created_at`, `updated_at` |

Lumtera checks that its tables exist and offers a repair button when one is missing. Add-ons add their tables to that check with the `lumtera_tables` filter, and recreate them on the `lumtera_repair_tables` action. See [Hooks](/developers/hooks).

### Options {#options}

"Autoloaded" options are read on every request, so WordPress loads them together with its own.

| Option | Contents | Autoloaded |
| --- | --- | --- |
| `lumtera_settings` | Content types, check on save, before-publishing mode, outlines, per-check severities and the AI switches | Yes |
| `lumtera_site_fixes` | Site fix switches and options | Yes |
| `lumtera_statement` | Your statement form answers, and the statement page and draft IDs | No |
| `lumtera_statement_footer` | Whether classic themes print the statement link in the footer | Yes |
| `lumtera_last_full_scan` | When the last **Check all content** run finished (Unix time), for the statement date | No |
| `lumtera_feedback` | Feedback settings: who is notified, the Akismet spam check, and how many months personal data is kept (default 24) | Yes |
| `lumtera_feedback_counter` | The last feedback reference number, per year | No |
| `lumtera_feedback_counts` | Messages per status, for the menu badge. Rebuilt whenever a status changes. | Yes |
| `lumtera_email_summary` | Email summary switch, recipients, weekday and whether to include the note about Lumtera Pro | No |
| `lumtera_email_summary_state` | Totals at the last summary sent, and posts whose score dropped since (up to 100) | No |
| `lumtera_email_summary_delivery` | The last attempt to send a summary: when, whether it was a test, whether WordPress accepted it, and the error if it didn't | No |
| `lumtera_page_dismissals` | Dismissed whole-page findings: for the whole site or one address, with the check, severity, note, who and when | No |
| `lumtera_parts_state` | When site parts were last checked, which parts were found, which couldn't be checked, and how many were left over | No |
| `lumtera_part_rescan_{change ID}` | Progress of re-checking the pages a fix touched, one option per change | No |
| `lumtera_onboarding` | The Overview checklist: when each step was done, and when the card was put away | No |
| `lumtera_progress` | When Lumtera was first activated, how many issues were fixed in edited content (in total and per day, for 60 days), and the errors of the first full check. Used for **Fixed this week** and the review request. | No |
| `lumtera_home_watch` | Whether the [weekly home page check](/settings#weekly-home-page-check) is on | No |
| `lumtera_home_watch_state` | The last 12 home page checks: when, errors and items to review, how many findings were new or gone since the check before, the most common issues, and any error | No |
| `lumtera_failed_scans` | Posts whose check stopped PHP (out of time or memory), so the next site-wide check skips them (up to 100) | No |
| `lumtera_manual_version` | Marks that old manual check records were converted | Yes |
| `lumtera_permissions_roles` | Roles already given their default permissions, so a role added later gets its defaults once | Yes |
| `lumtera_db_version`, `lumtera_roles_version`, `lumtera_permissions_version` | Version markers | Yes |

`lumtera_permissions` is used only by the [Permissions](/permissions) form. The choices are written to the roles, and the option itself is never saved.

### Post meta {#post-meta}

| Key | Stored on | Contents |
| --- | --- | --- |
| `_lumtera_summary` | Checked posts | Counts, score, reading grade and when it was checked |
| `_lumtera_score` | Checked posts | Score, for sorting list tables |
| `_lumtera_reopened` | Checked posts | Why findings you dismissed on the post show again (for example, a more severe finding came back), by fingerprint. Removed when nothing is reopened. |
| `_lumtera_dismissed` | Posts | Dismissed issues, with who, when, why and the severity |
| `_lumtera_manual` | Posts | Manual check results: for each test, the result, note, failed criteria, who recorded it and when |
| `_lumtera_exception` | Posts and media | An ADA Title II exception tag: the type, the note, who tagged it and when. Tagged items stay in every count. See [Statement](/statement). |
| `_lumtera_exception_type` | Posts and media | The exception type alone, so lists can filter on it |
| `_lumtera_image`, `_lumtera_image_noalt`, `_lumtera_image_noalt_manual` | Posts and images | Which images a post shows, and which copies lack alt text (for the alt text manager) |
| `_lumtera_alt_ai` | Images | Who accepted an AI alt text suggestion, and when |
| `_lumtera_statement_hash` | Statement page | A hash of what Lumtera last wrote, so a page you've edited is never overwritten |
| `_lumtera_statement_version` | Statement page | The statement format that wrote the page (currently `2`) |
| `_lumtera_fb_*` | Feedback records | See below |

`_lumtera_summary`, `_lumtera_score` and `_lumtera_reopened` belong to one site only. Lumtera leaves them out of WordPress exports and drops them from imports. Add-ons add their own keys with the `lumtera_derived_post_meta` filter. See [Hooks](/developers/hooks).

Lumtera also writes WordPress's own `_wp_attachment_image_alt` when you save alt text in the alt text manager. Before WordPress 7.0, it also copies alt text embedded in an uploaded image into it, when the image has none.

### Feedback records {#feedback-records}

Each message sent through the [feedback form](/feedback) is a private `lumtera_feedback` post. It has no admin screen of its own and isn't in WordPress exports. The message is the post content. The rest is post meta:

| Key | Contents |
| --- | --- |
| `_lumtera_fb_reference` | The reference number shown to the visitor |
| `_lumtera_fb_status` | `new`, `in_progress`, `answered` or `closed` |
| `_lumtera_fb_type` | `barrier`, `alternative` or `other` |
| `_lumtera_fb_page_url`, `_lumtera_fb_post_id` | The page the message is about |
| `_lumtera_fb_reply_format` | The reply format the visitor asked for |
| `_lumtera_fb_name`, `_lumtera_fb_email`, `_lumtera_fb_consent` | Name and email address, only if the visitor gave them and agreed |
| `_lumtera_fb_notes` | Internal notes, with who wrote them |
| `_lumtera_fb_replies` | Email replies sent, with who sent them |
| `_lumtera_fb_history` | Status changes, with who made them |
| `_lumtera_fb_anonymised` | When personal data was removed |

Lumtera never stores the sender's IP address. A scrambled form of it is kept in a transient for up to an hour to limit how many messages one connection can send.

A daily job removes personal data from records older than the retention period (24 months by default). It deletes the name, email address and consent, empties the message and the reply texts, and keeps the reference, request type, page and status.

### User meta {#user-meta}

| Key | Contents |
| --- | --- |
| `lumtera_view` | The person's chosen view of the Content report. Until they choose, the view follows what they can do. |
| `lumtera_save_page_results` | `1` once the person ticked **Save results to reports** in review mode |
| `lumtera_welcome_dismissed` | The person closed the welcome notice |
| `lumtera_review_ask` | The person's answer to the [review request](/site-report#review-request): snoozed until a date, or never ask again |
| `lumtera_hints_dismissed` | The [Pro tips](/site-report#pro-tips) the person hid, with when |

Lumtera also keeps the editor's highlighting preference in WordPress's own preferences store (the `lumtera` scope of the `persisted_preferences` user meta).

### Transients {#transients}

| Transient | Kept for |
| --- | --- |
| `lumtera_totals`, `lumtera_by_rule`, `lumtera_by_rule_published`, `lumtera_worst`, `lumtera_worst_published`, `lumtera_groups`, `lumtera_coverage` | Up to a day. Cleared whenever a result or setting changes. |
| `lumtera_rate_bulk_run_{user ID}` | A day: where the person's **Check all content** run stopped, so the Overview can offer to continue it. Deleted when the run finishes. |
| `lumtera_save_error` | A day: the last failure to store a post's results, shown to administrators with a repair button |
| `lumtera_feedback_form_page` | A day: the published page that holds the feedback form |
| `lumtera_image_review` | An hour |
| `lumtera_page_run_{user ID}_{hash}` | An hour: whole-page findings from review mode, so they can be dismissed |
| `lumtera_rate_fb_{hash}` | An hour: the feedback form's limit per connection |
| `lumtera_fb_{key}` | 10 minutes: the result of a feedback form sent without JavaScript, encrypted |
| `lumtera_ai_ready`, `lumtera_ai_text_ready` | 10 minutes |
| `lumtera_rate_{user ID}` | A minute: live-check rate limit. Stored in the object cache instead when the site has a persistent one. |
| `lumtera_rate_ai_{user ID}` | 10 minutes: AI rate limit |

### Roles and capabilities {#roles-and-capabilities}

| Name | Given to | Grants |
| --- | --- | --- |
| `lumtera_reporter` (role) | Users you choose | `read` and `lumtera_view_summary` only. See [Roles & permissions](/permissions). |
| `lumtera_view_summary` | The Lumtera Reporter role and administrators | Reading the site summary |
| `lumtera_view_reports` | Roles ticked under **See reports and check the site**. Default: roles that can edit others' posts. | Lumtera's report screens and site-wide checks |
| `lumtera_dismiss_errors` | Roles ticked under **Dismiss errors**. Default: roles that can edit others' posts. | Dismissing and restoring errors |
| `lumtera_review_mode` | Roles ticked under **Review pages on the site**. Default: roles that can edit posts. | Review mode on posts the user can edit |
| `lumtera_manage_feedback` | Roles ticked under **Handle accessibility feedback**. Default: roles that can edit others' posts. | Reading and answering feedback |

Administrators always keep the last four. The defaults are granted once per site. The capabilities live on the roles, so a role editor plugin can show them and give them to single users. From WP-CLI, change them with `wp cap add` and `wp cap remove`, for example `wp cap add author lumtera_dismiss_errors`.

### Custom post type {#free-post-type}

`lumtera_feedback`: private, with no admin UI of its own and no REST route. See [Feedback records](#feedback-records).

### Scheduled jobs {#free-scheduled-jobs}

The free plugin uses WP-Cron.

| Hook | When |
| --- | --- |
| `lumtera_email_summary` | Weekly at 09:00 site time, on the chosen weekday (default Monday). Scheduled only while the email summary is on and Lumtera Pro isn't active (Pro sends its own weekly digest). |
| `lumtera_home_watch` | Weekly, while the weekly home page check is on, and once straight away when it's turned on: loads the home page from this site and checks it. **Check now** runs the same check in the request. |
| `lumtera_feedback_retention` | Daily: removes personal data from feedback older than the retention period |
| `lumtera_site_parts_check` | Once, straight away, after a theme switch, a menu or widget change, or when **Check all content** finishes: checks every site part |
| `lumtera_part_rescan` | Once, a minute after a fix is applied or undone, with the change ID: finishes re-checking the pages it touched if the screen was closed |

## Lumtera Pro {#lumtera-pro}

<p><span class="pro-pill">Pro</span> Every plan</p>

### Tables {#pro-tables}

The Pro schema version is `6`. It's stored in the `lumtera_pro_db_version` option and upgraded the same way as the free tables.

| Table | What it holds | Key columns |
| --- | --- | --- |
| `{prefix}lumtera_pro_tasks` | Fix tracking tasks | `post_id`, `fingerprint`, `rule_id`, `severity`, `status`, `assignee`, `created_by`, `resolved_at`, `verified` (1 when a re-check confirmed the fix), `change_id` (the fix from the [Fixes queue](/pro/fixes-queue)) |
| `{prefix}lumtera_pro_task_log` | Task history, including issues created in a tracker | `task_id`, `user_id`, `action`, `detail`, `created_at` |
| `{prefix}lumtera_pro_pages` | Page check results, one row per address and role (`''` for logged-out checks) | `url_hash`, `url`, `title`, `errors`, `warnings`, `notices`, `score`, `issues`, `checked_at`, `source`, `browser_at`, `baseline`, `role` |
| `{prefix}lumtera_pro_audit` | The activity log and the [evidence](/pro/evidence) ledger | `created_at`, `user_id`, `event`, `object_type`, `object_id`, `summary`, `data`, `prev_hash` and `row_hash` (the tamper-evident hash chain over evidence entries; empty on entries from before schema 6) |
| `{prefix}lumtera_pro_runs` | One row per finished scan: a full content check, a site-parts check or a scheduled page check. Pro keeps the 12 newest of each kind and up to 24 months. | `kind`, `run_trigger`, `lumtera_version`, `started_at`, `finished_at`, `totals`, `items` |
| `{prefix}lumtera_pro_run_items` | A snapshot of every finding in a run, used to compare scans | `run_id`, `object_type`, `object_key`, `rule_id`, `fingerprint`, `severity`, `source` |
| `{prefix}lumtera_pro_portfolio_history` | One row per client site per day, for the [client portfolio](/pro/portfolio) | `site_id`, `day`, `score`, `errors`, `warnings`, `scanned`, `coverage`, `feedback_open`, `feedback_overdue`, `lumtera_version` |

Pro adds these tables to the free plugin's missing-table check with the `lumtera_tables` filter, and recreates them on `lumtera_repair_tables`.

### Options {#pro-options}

| Option | Contents |
| --- | --- |
| `lumtera_pro_license` | The license. Stored network-wide (site option) when Pro is network-activated. |
| `lumtera_pro_alerts` | Alert and weekly digest settings |
| `lumtera_pro_branding` | Report branding |
| `lumtera_pro_history` | Daily score snapshots, 400 days |
| `lumtera_pro_acr` | Your conformance report details and per-criterion overrides |
| `lumtera_pro_ignore_rules`, `lumtera_pro_ignore_log` | Ignore rules, with who added each and why, and the last 100 changes |
| `lumtera_pro_ignore_rescan` | Posts waiting to be checked again after an ignore rule changed |
| `lumtera_pro_ignore_lapsed` | Checks whose ignore rule ran out recently, so their findings aren't alerted as new before the re-check |
| `lumtera_pro_trackers`, `lumtera_pro_tracker_status` | Issue tracker settings (the token encrypted), and the result of the last test and automatic issue |
| `lumtera_pro_tracker_lock_{task ID}` | Short lock while an issue is created for a task |
| `lumtera_pro_sites`, `lumtera_pro_site_{ID}` | Portfolio sites (the application password encrypted), and each site's latest results |
| `lumtera_pro_sitemail_{ID}` | Each portfolio site's client update email state |
| `lumtera_pro_siterescan_{ID}` | Progress of a **Check all content** run started from the portfolio |
| `lumtera_pro_scheduled`, `lumtera_pro_scheduled_run`, `lumtera_pro_scheduled_lock` | Scheduled page check settings, the current run and its lock |
| `lumtera_pro_scheduled_rebaseline` | Pages whose next scheduled check updates the baseline for some checks without alerting |
| `lumtera_pro_pages_home` | The site address page results belong to (so a site move is noticed) |
| `lumtera_pro_engine_rebaselined` | Marks that older page results were converted to the current check engine |
| `lumtera_pro_role_scans` | Signed-in check settings per role |
| `lumtera_pro_form_flows` | Forms found on checked pages and their latest form test results (up to 100 forms) |
| `lumtera_pro_consistency` | Consistency findings across pages (Growth plan and up) |
| `lumtera_pro_page_data` | Menus, help links, search and site map links found on each checked page (up to 150 pages), for the consistency checks. Kept on every plan. |
| `lumtera_pro_feedback_targets` | Response targets per feedback request type |
| `lumtera_pro_remediation` | **Fix approvals** settings: the approval policy and whether agents may approve rule fixes |
| `lumtera_pro_remediation_caps` | Version marker for the default fix capabilities |
| `lumtera_pro_remediation_run`, `lumtera_pro_remediation_lock`, `lumtera_pro_remediation_stop` | The current Fixes queue run, its lock, and a request to stop it |
| `lumtera_pro_agent_approvals` | Changes an AI agent approved (the newest 2,000) |
| `lumtera_pro_webhooks`, `lumtera_pro_webhook_status` | Webhooks (secrets encrypted) and their last delivery |
| `lumtera_pro_audit` | Activity log and evidence retention settings |
| `lumtera_pro_ledger_head` | The newest entry in the evidence ledger (ID and hash), so a cut-off end of the chain is noticed |
| `lumtera_pro_client_role_version` | Version marker for the Accessibility client role |
| `lumtera_pro_db_version` | Schema version |

Pro options are not autoloaded, except `lumtera_pro_db_version`, `lumtera_pro_pages_home`, `lumtera_pro_client_role_version` and `lumtera_pro_remediation_caps`, which are read on every request, and settings saved through the WordPress settings screens (such as `lumtera_pro_branding`).

Portfolio passwords, webhook secrets and issue tracker tokens are encrypted with libsodium, using a key derived from your site's secret keys, or `LUMTERA_PRO_ENCRYPTION_KEY` if defined.

Short-lived transients hold queued webhook deliveries (`lumtera_pro_wh_*`), alert de-duplication, tracker rate-limit waits, one-time passes for signed-in checks, form test tokens, sitemap and document link caches, and update details (`lumtera_pro_update_info`, a site transient).

### Post meta {#pro-post-meta}

| Key | Stored on | Contents |
| --- | --- | --- |
| `_lumtera_pro_errors` | Checked posts | Alert baseline: the errors found last time |
| `_lumtera_pro_pdf`, `_lumtera_pro_pdf_attempt` | PDF attachments | PDF check results, and the last attempt |
| `_lumtera_pro_assignee`, `_lumtera_pro_overdue_alerted`, `_lumtera_pro_task` | Feedback records | Who the request is assigned to, when the overdue alert went out, and the fix task made from it |
| `_lumtera_report` | Reports | The frozen report data |
| `_lumtera_pro_share_links`, `_lumtera_pro_share_hash`, `_lumtera_pro_share_views` | Reports | Share links, their lookup hash, and views |
| `_lumtera_pro_burden` | Burden records | The assessment: scope, criteria, cost, benefit, usage, the alternative offered, who assessed it (as typed), when, the next review date and the public summary |
| `_lumtera_session_url`, `_lumtera_session_key` | Test sessions | The page template's address, and a key to find the session by it |
| `_lumtera_session_items` | Test sessions | Per criterion: result, note, tester, time, browser and assistive technology, and screenshot IDs |
| `_lumtera_session_env` | Test sessions | The browser and assistive technology last used |
| `_lumtera_session_signoff` | Test sessions | Who signed the session off, and when |
| `_lumtera_session_log` | Test sessions | Sign-offs and reopenings, with who, when and the reason |
| `_lumtera_session_screenshot` | Attachments | Which test session a screenshot was uploaded for |

### User meta and test users {#pro-user-meta}

| Key | Contents |
| --- | --- |
| `lumtera_pro_sandbox` | On the test users Pro makes for signed-in checks (login names start with `lumtera-audit-`, no email address, can't sign in): the role the user was made for |
| `lumtera_pro_fft_active` | A hash of the person's current form test token, while a test runs |
| `lumtera_pro_dismissed` | What the person dismissed in Pro: the [first-run checklist](/pro/license#first-run-checklist) (per plan), [limit tips](/pro/license#when-you-reach-a-limit) (per plan and limit) and [renewal reminders](/pro/license#renewal-reminders) (per stage and expiry date). Up to 50 entries. |

### Custom post types {#pro-post-types}

All are private, with no admin UI of their own and no REST route.

| Post type | Holds |
| --- | --- |
| `lumtera_report` | [Client reports](/pro/reports): a frozen copy of what the client was sent |
| `lumtera_burden` | [Disproportionate burden records](/pro/burden) |
| `lumtera_test_session` | [Manual test sessions](/pro/test-sessions), one per page template, with revisions |

### Roles and capabilities {#pro-roles-and-capabilities}

| Name | Given to | Grants |
| --- | --- | --- |
| `lumtera_client` (role, "Accessibility client") | Users you choose | `read` and `lumtera_view_reports`, limited to the Overview and Reports. Every Lumtera change is refused. |
| `lumtera_propose_changes` | Roles ticked under **Propose fixes**. Default: administrators and roles that can edit others' posts. | Drafting fixes in the Fixes queue |
| `lumtera_approve_changes` | Roles ticked under **Approve and apply fixes**. Same default. | Approving, applying and undoing fixes |

### Scheduled jobs {#scheduled-jobs}

Pro uses Action Scheduler (group `lumtera-pro`) when it's loaded, for example with WooCommerce. Otherwise it uses WP-Cron. The license check always uses WP-Cron.

| Hook | When |
| --- | --- |
| `lumtera_pro_license_check` | Daily |
| `lumtera_pro_daily` | Daily at 02:00: score snapshot, and cleanup of the activity log and old scan snapshots |
| `lumtera_pro_weekly` | Mondays at 09:00: weekly digest, with overdue feedback |
| `lumtera_pro_scheduled_checks`, `lumtera_pro_scheduled_batch` | 03:00, daily or weekly: scheduled page checks, in batches |
| `lumtera_pro_documents_scan` | Daily, and after uploads: PDF checks |
| `lumtera_pro_snapshot_content` | Straight after **Check all content** finishes in the browser: saves the run for scan comparison |
| `lumtera_pro_portfolio_sync`, `lumtera_pro_portfolio_sync_site` | Twice a day while you have portfolio sites |
| `lumtera_pro_portfolio_rescan` | When you start **Check all content** on a client site from the portfolio: runs it in batches |
| `lumtera_pro_client_emails` | Daily while any client update email is on. Emails go out on the first day of the month or quarter. |
| `lumtera_pro_feedback_overdue` | Hourly, with an active license: finds feedback past its response target |
| `lumtera_pro_deliver_alert`, `lumtera_pro_deliver_alerts` | Straight after a save: alerts |
| `lumtera_pro_webhook_send` | Straight away, with retries: webhooks |
| `lumtera_pro_ignore_rescan` | Straight after an ignore rule is added or removed, 20 posts per run: re-checks the affected posts |
| `lumtera_pro_ignore_expiry` | A minute after an ignore rule runs out, and daily while rules exist: brings its findings back |
| `lumtera_pro_tracker_issue` | A few seconds apart, when **auto-create** is on: creates tracker issues for new tasks, retrying up to 5 times when the tracker asks to wait |
| `lumtera_pro_tracker_comment` | A few seconds apart: comments on a linked issue when a fix is applied or undone |
| `lumtera_pro_remediation_run` | While a Fixes queue run is going: five items per tick |

**Tools → Site Health** includes a **Lumtera Pro background tasks** test that warns when jobs are more than an hour late.

## Privacy {#privacy}

Lumtera collects nothing about visitors, except what they send through the feedback form.

Both plugins add sections to WordPress's privacy tools. See <span class="screen-path">Tools → Export Personal Data</span> and **Erase Personal Data**. Registered users are found by their account's email address. Feedback senders are found by the email address they left.

| Tool (ID) | Exports | Erasing |
| --- | --- | --- |
| **Lumtera accessibility dismissals and AI alt text** (`lumtera`) | Issues the person dismissed, in posts and on whole pages, with notes. AI alt text suggestions they accepted. | Removes the person and their notes from dismissals, and the person from AI alt text records and saved page results. The dismissals and the "suggested by AI" record stay. |
| **Lumtera accessibility feedback** (`lumtera-feedback`) | Feedback the person sent, found by their email address | Removes the name, email address, message and reply texts. The reference, request type, page and status stay. |
| **Lumtera manual accessibility checks** (`lumtera-manual`) | Manual check results the person recorded, with notes | Removes the person and the note. The result stays. |
| **Lumtera accessibility fixes** (`lumtera-changes`) | Fixes the person proposed, approved, applied or undid | Replaces the person with 0 in each change. The changes and page revisions stay. |
| **Lumtera Pro activity log** (`lumtera-pro-activity`) | Activity log entries by the person | Removes the person from entries they made or are named in. The entries stay. Evidence entries keep their hashes, and a new ledger entry records the change, so the chain still verifies. |
| **Lumtera Pro manual test sessions** (`lumtera-pro-sessions`) | Test results, sign-offs and reopenings by the person | Removes the person, their notes and reasons. Results stay. Screenshots stay in the media library; delete them there if they show personal data. |
| **Lumtera Pro client update emails** (`lumtera-pro-client-emails`) | Portfolio sites that send client update emails to the address | Takes the address off each site's recipients. A site left with none stops sending. |
| **Lumtera Pro fix tracking** (`lumtera-pro-fix-tracking`) | Fix tracking tasks assigned to or tracked by the person, and their history entries and notes | Unassigns the person, replaces them with a removed user in each task and its history, and replaces their notes with *"(Note removed at its author's request.)"*. The tasks stay, as a record of the work done. |
| **Lumtera Pro disproportionate burden records** (`lumtera-pro-burden`) | [Burden records](/pro/burden) the person wrote, or that name them under **Assessed by** (by email address, display name, full name or username) | Removes them as the record's author and replaces **Assessed by** with *"Name removed at the person's request"*. The records stay, as evidence. |

Some records name people but aren't part of these tools:

- Pro's ignore rules (who added a rule, and the reason typed) and feedback assignees store user IDs.
- Feedback notes, replies and status changes store the staff member's user ID.
- ADA Title II exception tags store who added the tag.
- Saved page results store who checked the page. Erasing removes it, but it isn't exported.

Lumtera also adds suggested text to <span class="screen-path">Settings → Privacy → Policy Guide</span>, including text on the feedback form and manual checks.

## Uninstall {#uninstall}

**Deactivating** the free plugin unschedules the email summary, the weekly home page check and the feedback clean-up. **Deactivating** Pro cancels all its scheduled jobs, on every site when it's network-deactivated. Neither deletes any data.

### Deleting the free plugin {#deleting-the-free-plugin}

On every site of a network, it removes:

- the four tables `lumtera_issues`, `lumtera_parts`, `lumtera_page_results` and `lumtera_changes`
- every feedback record (`lumtera_feedback` posts and their meta)
- the options listed above, including the `lumtera_part_rescan_*` options
- the post meta listed above, including manual check results (`_lumtera_manual`), exception tags and the statement page's `_lumtera_statement_hash` and `_lumtera_statement_version`
- the user meta and transients listed above, and Lumtera's editor preferences
- its scheduled jobs
- the Lumtera Reporter role, and the `lumtera_view_summary`, `lumtera_view_reports`, `lumtera_dismiss_errors`, `lumtera_review_mode` and `lumtera_manage_feedback` capabilities from every role

It **keeps**:

- your accessibility statement page (it's your content)
- alt text Lumtera added to images and posts
- fixes applied to your content, and the page revisions saved before each one

### Deleting Lumtera Pro {#deleting-lumtera-pro}

On every site of a network, it removes:

- every `lumtera_pro_*` option and transient, including the conformance report details, issue tracker settings, portfolio sites and webhooks. The license and the ledger head are exceptions, see below.
- the post meta `_lumtera_pro_errors`, `_lumtera_pro_pdf`, `_lumtera_pro_pdf_attempt`, `_lumtera_pro_assignee`, `_lumtera_pro_overdue_alerted`, `_lumtera_pro_task`, `_lumtera_session_screenshot` and the share link meta
- the test users made for signed-in checks, and the `lumtera_pro_fft_active` user meta. (The `lumtera_pro_dismissed` user meta is currently left behind.)
- the `lumtera_propose_changes` and `lumtera_approve_changes` capabilities from every role
- the Accessibility client role. Users who had it keep their accounts, without a role.
- all its scheduled jobs, in WP-Cron and Action Scheduler
- the cached update details

By default it **keeps**:

- your **license**, because an expired key can't be activated again. Define `LUMTERA_PRO_DELETE_LICENSE` as `true` to remove it. On a network, this also removes the network-wide license.
- your **records**: reports, burden records, test sessions, fix tracking history, page results, the activity log with its evidence ledger (and `lumtera_pro_ledger_head`), and scan snapshots. Define `LUMTERA_PRO_DELETE_REPORTS` as `true` to remove them: the `lumtera_report`, `lumtera_burden` and `lumtera_test_session` posts and all seven Pro tables.
- test session screenshots, which stay in the media library like any other upload

```php
// wp-config.php: remove everything when Lumtera Pro is deleted.
define( 'LUMTERA_PRO_DELETE_REPORTS', true );
define( 'LUMTERA_PRO_DELETE_LICENSE', true );
```

There is no setting for this. Only the two constants change what is deleted.

On multisite, deleting a site drops its Lumtera and Lumtera Pro tables.
