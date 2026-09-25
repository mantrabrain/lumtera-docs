---
title: Data & uninstall
description: What Lumtera and Lumtera Pro store (tables, options, meta, capabilities and scheduled jobs), what's sent outside your site, personal data tools, and what uninstalling removes.
---

# Data & uninstall

## Nothing leaves your site by default

- Lumtera runs entirely inside your WordPress. No account, no API key, no MantraBrain servers.
- Nothing runs for visitors, except [site fixes](/site-fixes) you switch on.
- Nothing is sent to an outside service unless you switch on [AI suggestions](/ai). Then data is sent only to the AI provider connected to WordPress, and only when someone clicks a button for a suggestion. For alt text, that's the image and the text around it. For link text, headings and summaries, it's the text involved and the post title.
- The weekly [email summary](/email-summary) is off by default. When it's on, WordPress emails site totals to the addresses you enter.
- While content is rendered for a check, outgoing HTTP requests are blocked, so blocks like RSS feeds and embeds don't fetch anything.

Lumtera Pro contacts `store.mantrabrain.com` to check your license and updates (it sends your site address and environment type). It sends data elsewhere only where you set it up:

- Slack and webhook addresses you add
- client sites you connect to the portfolio
- the [issue tracker](/pro/fix-tracking#issue-trackers) you connect (GitHub, GitLab, Jira or Linear). An issue holds the finding, its markup snippet, how to fix it, the page title, its view and edit links, a link to the task on the Fixes screen, and the site name.

## Free plugin

### Table

`{prefix}lumtera_issues` holds one row per open finding: `id`, `post_id`, `rule_id`, `severity`, `fingerprint`, `occurrence`, `message`, `context` (the markup snippet) and `created_at`. A post's rows are replaced each time it's checked, and removed when it's deleted. Dismissed findings, and findings ignored site-wide in Pro, have no rows.

### Options

| Option | Contents |
| --- | --- |
| `lumtera_settings` | Content types, check on save, before-publishing mode, outlines, per-check severities, and the AI switches (`alt_text`, `link_text`, `headings`, `summary`) |
| `lumtera_permissions` | The roles ticked under <span class="screen-path">Settings → Permissions</span>, as a record of the last save. The roles hold the live state (see [Roles and capabilities](#roles-and-capabilities)). |
| `lumtera_email_summary` | Email summary switch, recipients and weekday |
| `lumtera_email_summary_state` | Totals at the last summary sent, and posts whose score dropped since (up to 100) |
| `lumtera_site_fixes` | Site fix switches and options |
| `lumtera_statement` | Your statement form answers |
| `lumtera_db_version`, `lumtera_roles_version`, `lumtera_permissions_version` | Version markers |

### Post meta

| Key | Contents |
| --- | --- |
| `_lumtera_summary` | Counts, score, reading grade and when it was checked |
| `_lumtera_score` | Score, for sorting list tables |
| `_lumtera_dismissed` | Dismissed issues, with who, when, why and the severity |
| `_lumtera_manual` | [Manual check](/manual-checks) results: for each test, the result, note, failed criteria, who recorded it and when |
| `_lumtera_image`, `_lumtera_image_noalt`, `_lumtera_image_noalt_manual` | Which images a post shows, and which copies lack alt text (for the alt text manager) |
| `_lumtera_alt_ai` | On images: who accepted an AI alt text suggestion, and when |
| `_lumtera_statement_hash` | On the statement page, to tell whether it's been edited |

Lumtera also writes WordPress's own `_wp_attachment_image_alt` when you save alt text in the alt text manager. Before WordPress 7.0, it also copies alt text embedded in an uploaded image into it, when the image has none.

### User meta and transients

**User meta:** `lumtera_welcome_dismissed`.

**Transients:**

| Transient | Kept for |
| --- | --- |
| `lumtera_totals`, `lumtera_by_rule`, `lumtera_by_rule_published`, `lumtera_worst`, `lumtera_groups` | Up to a day. Cleared whenever a result or setting changes. |
| `lumtera_image_review` | An hour |
| `lumtera_ai_ready`, `lumtera_ai_text_ready` | 10 minutes |
| `lumtera_rate_{user ID}` | A minute: live-check rate limit. Stored in the object cache instead when the site has a persistent one. |
| `lumtera_rate_ai_{user ID}` | 10 minutes: AI rate limit |

### Roles and capabilities

| Name | Given to | Grants |
| --- | --- | --- |
| `lumtera_reporter` (role) | Users you choose | `read` and `lumtera_view_summary` only. See [Lumtera Reporter](/permissions#lumtera-reporter). |
| `lumtera_view_summary` | The Lumtera Reporter role and administrators | Reading `/site-summary` |
| `lumtera_view_reports` | Roles ticked under **See reports and check the site**. Default: roles that can edit others' posts. | Lumtera's report screens and site-wide checks |
| `lumtera_dismiss_errors` | Roles ticked under **Dismiss errors**. Default: roles that can edit others' posts. | Dismissing and restoring errors |
| `lumtera_review_mode` | Roles ticked under **Review pages on the site**. Default: roles that can edit posts. | Review mode on posts the user can edit |

Administrators always keep the last three. The defaults are granted once per site, when Lumtera first runs with this feature. The capabilities live on the roles, so a role editor plugin can show them and give them to single users. From WP-CLI, change them with `wp cap add` and `wp cap remove`, for example `wp cap add author lumtera_dismiss_errors`.

### Scheduled job

| Hook | When |
| --- | --- |
| `lumtera_email_summary` | Weekly at 09:00 site time, on the chosen weekday (default Monday). Scheduled only while the email summary is on and Lumtera Pro isn't active. |

The free plugin has no other scheduled jobs and no custom post types.

## Lumtera Pro <span class="pro-pill">Pro</span> {#lumtera-pro}
### Tables

| Table | Contents |
| --- | --- |
| `{prefix}lumtera_pro_tasks` | Fix tracking tasks |
| `{prefix}lumtera_pro_task_log` | Task history, including issues created in a tracker |
| `{prefix}lumtera_pro_pages` | Page check results, one row per URL and viewport (desktop or phone) |
| `{prefix}lumtera_pro_audit` | Activity log |

### Options

| Option | Contents |
| --- | --- |
| `lumtera_pro_license` | The license. Stored network-wide (site option) when Pro is network-activated. |
| `lumtera_pro_alerts` | Alert settings |
| `lumtera_pro_branding` | Report branding |
| `lumtera_pro_history` | Daily score snapshots, 400 days |
| `lumtera_pro_acr` | Your [conformance report](/pro/acr) details and per-criterion overrides |
| `lumtera_pro_ignore_rules`, `lumtera_pro_ignore_log` | [Ignore rules](/pro/ignore), with who added each and why, and the last 100 changes |
| `lumtera_pro_ignore_rescan` | Posts waiting to be checked again after an ignore rule changed |
| `lumtera_pro_trackers`, `lumtera_pro_tracker_status` | Issue tracker settings (the token encrypted), and the result of the last test and automatic issue |
| `lumtera_pro_sites`, `lumtera_pro_site_*` | Portfolio sites and their results |
| `lumtera_pro_scheduled`, `lumtera_pro_scheduled_run`, `lumtera_pro_scheduled_lock` | Scheduled page checks |
| `lumtera_pro_webhooks`, `lumtera_pro_webhook_status` | Webhooks and their last delivery |
| `lumtera_pro_audit` | Activity log retention |
| `lumtera_pro_db_version` | Version marker |

Portfolio passwords, webhook secrets and issue tracker tokens are encrypted with libsodium, using a key derived from your site's secret keys, or `LUMTERA_PRO_ENCRYPTION_KEY` if defined.

Short-lived transients hold queued webhook deliveries (`lumtera_pro_wh_*`), alert de-duplication, tracker rate-limit waits and update details (`lumtera_pro_update_info`).

### Post meta and post type

**Post meta:** `_lumtera_pro_errors` (alert baseline), `_lumtera_pro_pdf` and `_lumtera_pro_pdf_attempt` (PDF results), `_lumtera_report` (report snapshots).

**Post type:** `lumtera_report`, private, with no admin UI of its own.

### Scheduled jobs

Pro uses Action Scheduler (group `lumtera-pro`) when it's loaded, for example with WooCommerce. Otherwise it uses WP-Cron.

| Hook | When |
| --- | --- |
| `lumtera_pro_license_check` | Daily |
| `lumtera_pro_daily` | Daily at 02:00: score snapshot and activity cleanup |
| `lumtera_pro_weekly` | Mondays at 09:00: weekly summary |
| `lumtera_pro_scheduled_checks`, `lumtera_pro_scheduled_batch` | 03:00, daily or weekly: scheduled page checks |
| `lumtera_pro_documents_scan` | Daily, and after uploads: PDF checks |
| `lumtera_pro_portfolio_sync`, `lumtera_pro_portfolio_sync_site` | Twice a day: portfolio |
| `lumtera_pro_deliver_alert`, `lumtera_pro_deliver_alerts` | Straight after a save: alerts |
| `lumtera_pro_webhook_send` | Straight away, with retries: webhooks |
| `lumtera_pro_ignore_rescan` | Straight after an ignore rule is added or removed, 20 posts per run: re-checks the affected posts |
| `lumtera_pro_tracker_issue` | A few seconds apart, when **auto-create** is on: creates tracker issues for new tasks, retrying up to 5 times when the tracker asks to wait |

**Tools → Site Health** includes a **Lumtera Pro background tasks** test that warns when jobs are more than an hour late. See [Troubleshooting](/troubleshooting#scheduled-tasks-run-late-or-not-at-all).

## Privacy

Lumtera collects nothing about visitors.

Both plugins add sections to WordPress's privacy tools. See <span class="screen-path">Tools → Export Personal Data</span> and **Erase Personal Data**:

| Tool | Exports | Erasing |
| --- | --- | --- |
| Lumtera accessibility dismissals and AI alt text | Issues the person dismissed (with notes), and AI alt text suggestions they accepted | Removes the person's name and notes. The dismissals and the "suggested by AI" record stay. |
| Lumtera manual accessibility checks | Manual check results the person recorded, with notes | Removes the person and the note. The result stays. |
| Lumtera Pro activity log | Activity log entries by the person | Replaces their name with "A removed user". The entries stay. |

Pro's fix tracking tasks and ignore rules also store user IDs (assignees, and who added a rule), and ignore rules store the reason typed. These aren't part of the export and erase tools.

Lumtera also adds suggested text to <span class="screen-path">Settings → Privacy → Policy Guide</span>, including a section on manual checks.

## Uninstall

**Deactivating** the free plugin unschedules the email summary. **Deactivating** Pro cancels all its scheduled jobs. Neither deletes any data.

**Deleting the free plugin** removes, on every site of a network:

- the `lumtera_issues` table
- the options listed above
- the post meta `_lumtera_summary`, `_lumtera_score`, `_lumtera_dismissed`, `_lumtera_image`, `_lumtera_image_noalt`, `_lumtera_image_noalt_manual`, `_lumtera_alt_ai` and `_lumtera_statement_hash`
- the user meta and transients listed above
- the email summary job
- the Lumtera Reporter role, and the `lumtera_view_summary`, `lumtera_view_reports`, `lumtera_dismiss_errors` and `lumtera_review_mode` capabilities from every role

It **keeps**:

- your accessibility statement page (it's your content)
- alt text Lumtera added to images and posts
- manual check results (`_lumtera_manual` post meta)

**Deleting Lumtera Pro** removes, on every site of a network:

- the options `lumtera_pro_branding`, `lumtera_pro_alerts`, `lumtera_pro_history`, `lumtera_pro_sites` and `lumtera_pro_site_*`, `lumtera_pro_scheduled`, `lumtera_pro_scheduled_run`, `lumtera_pro_scheduled_lock`, `lumtera_pro_webhooks`, `lumtera_pro_webhook_status`, `lumtera_pro_audit`, `lumtera_pro_ignore_rules`, `lumtera_pro_ignore_log`, `lumtera_pro_ignore_rescan` and `lumtera_pro_db_version`
- the post meta `_lumtera_pro_errors`, `_lumtera_pro_pdf` and `_lumtera_pro_pdf_attempt`
- queued webhook deliveries and the cached update details
- all its scheduled jobs

By default it **keeps**:

- your **license**, because an expired key can't be activated again. Define `LUMTERA_PRO_DELETE_LICENSE` as `true` to remove it.
- your **reports, fix history, page results and activity log**. Define `LUMTERA_PRO_DELETE_REPORTS` as `true` to remove them (the `lumtera_report` posts and the four tables).
- the conformance report details (`lumtera_pro_acr`) and issue tracker settings (`lumtera_pro_trackers`, `lumtera_pro_tracker_status`). Delete these options yourself if you no longer need them, for example with `wp option delete lumtera_pro_trackers`.

```php
// wp-config.php: remove everything when Lumtera Pro is deleted.
define( 'LUMTERA_PRO_DELETE_REPORTS', true );
define( 'LUMTERA_PRO_DELETE_LICENSE', true );
```

On multisite, deleting a site drops its `lumtera_issues` table.
