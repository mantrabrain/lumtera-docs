---
title: Data & uninstall
description: What Lumtera and Lumtera Pro store (tables, options, meta and scheduled jobs), what's sent outside your site, personal data tools, and what uninstalling removes.
---

# Data & uninstall

## Nothing leaves your site by default

- Lumtera runs entirely inside your WordPress. No account, no API key, no MantraBrain servers.
- Nothing runs for visitors, except [site fixes](/site-fixes) you switch on.
- Nothing is sent to an outside service unless you switch on [AI suggestions](/ai). Then data is sent only to the AI provider you connected, and only when someone clicks **Suggest**.
- While content is rendered for a live check, outgoing HTTP requests are blocked, so blocks like RSS feeds and embeds don't fetch anything.

Lumtera Pro contacts `store.mantrabrain.com` to check your license and updates (it sends your site address and environment type). It sends data elsewhere only where you set it up: Slack and webhook addresses you add, and client sites you connect to the portfolio.

## Free plugin

**Table:** `{prefix}lumtera_issues`, one row per open finding, with the post ID, check ID, severity, fingerprint, message and markup snippet. A post's rows are replaced each time it's checked, and removed when it's deleted.

**Options:**

| Option | Contents |
| --- | --- |
| `lumtera_settings` | Content types, check on save, before-publishing mode, outlines, per-check severities, AI switch |
| `lumtera_site_fixes` | Site fix switches and options |
| `lumtera_statement` | Your statement form answers |
| `lumtera_db_version`, `lumtera_roles_version` | Version markers |

**Post meta:**

| Key | Contents |
| --- | --- |
| `_lumtera_summary` | Counts, score, reading grade and when it was checked |
| `_lumtera_score` | Score, for sorting list tables |
| `_lumtera_dismissed` | Dismissed issues, with who, when, why and the severity |
| `_lumtera_image`, `_lumtera_image_noalt`, `_lumtera_image_noalt_manual` | Which images a post shows, and which copies lack alt text (for the alt text manager) |
| `_lumtera_alt_ai` | On images: who accepted an AI alt text suggestion, and when |
| `_lumtera_statement_hash` | On the statement page, to tell whether it's been edited |

**User meta:** `lumtera_welcome_dismissed`. **Transients:** cached site totals (up to a day), alt text review results (an hour), AI readiness (10 minutes) and per-user rate limits.

**Role:** `lumtera_reporter` with `read` and `lumtera_view_summary`. Administrators also get `lumtera_view_summary`.

The free plugin has **no scheduled jobs** and no custom post types.

## Lumtera Pro <span class="pro-pill">Pro</span>

**Tables:**

| Table | Contents |
| --- | --- |
| `{prefix}lumtera_pro_tasks` | Fix tracking tasks |
| `{prefix}lumtera_pro_task_log` | Task history |
| `{prefix}lumtera_pro_pages` | Page check results, one row per URL |
| `{prefix}lumtera_pro_audit` | Activity log |

**Options:** `lumtera_pro_license`, `lumtera_pro_alerts`, `lumtera_pro_branding`, `lumtera_pro_history` (daily score snapshots, 400 days), `lumtera_pro_sites` and `lumtera_pro_site_*` (portfolio), `lumtera_pro_scheduled*` (scheduled checks), `lumtera_pro_webhooks`, `lumtera_pro_webhook_status`, `lumtera_pro_audit` (activity retention) and `lumtera_pro_db_version`.

Portfolio passwords and webhook secrets are encrypted with libsodium, using a key derived from your site's secret keys, or `LUMTERA_PRO_ENCRYPTION_KEY` if defined.

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

**Tools → Site Health** includes a **Lumtera Pro background tasks** test that warns when jobs are more than an hour late. See [Troubleshooting](/troubleshooting#scheduled-tasks-run-late-or-not-at-all).

Deactivating Pro cancels all its jobs.

## Privacy

Lumtera collects nothing about visitors.

Both plugins add a section to WordPress's privacy tools. See <span class="screen-path">Tools → Export Personal Data</span> and **Erase Personal Data**:

| Plugin | Exports | Erasing |
| --- | --- | --- |
| Lumtera | Issues the person dismissed (with notes), and AI alt text suggestions they accepted | Removes the person's name and notes. The dismissals and the "suggested by AI" record stay. |
| Lumtera Pro | Activity log entries by the person | Replaces their name with "A removed user". The entries stay. |

Lumtera also adds suggested text to <span class="screen-path">Settings → Privacy → Policy Guide</span>.

## Uninstall

**Deactivating** either plugin removes nothing.

**Deleting the free plugin** removes, on every site of a network:

- the `lumtera_issues` table
- all Lumtera options, post meta, user meta and transients listed above
- the Lumtera Reporter role and capability

It **keeps**:

- your accessibility statement page (it's your content)
- alt text Lumtera added to images and posts

**Deleting Lumtera Pro** removes its options, post meta, transients and scheduled jobs. By default it **keeps**:

- your **license**, because an expired key can't be activated again. Define `LUMTERA_PRO_DELETE_LICENSE` as `true` to remove it.
- your **reports, fix history, page results and activity log**. Define `LUMTERA_PRO_DELETE_REPORTS` as `true` to remove them.

```php
// wp-config.php: remove everything when Lumtera Pro is deleted.
define( 'LUMTERA_PRO_DELETE_REPORTS', true );
define( 'LUMTERA_PRO_DELETE_LICENSE', true );
```

On multisite, deleting a site drops its `lumtera_issues` table.
