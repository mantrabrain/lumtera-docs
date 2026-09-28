---
title: Activity log & webhooks
description: See who changed what in Lumtera Pro, keep evidence for as long as you need, export the activity log, and send events to Slack, Microsoft Teams, Zapier, Make or your own code with signed webhooks.
---

# Activity log & webhooks

<p><span class="pro-pill">Pro</span> Every plan</p>

## Activity log

<span class="screen-path">Lumtera → Reports → Activity</span> (administrators only) shows who changed what, and when: fixes, issues sent to trackers, alerts, reports and share-link views, the license, settings, dismissed and ignored issues, visitor feedback, and every [evidence](/pro/evidence) entry.

Filter by:

- **Show**: **All activity**, **Fix tracking**, **Alerts**, **Reports**, **License**, **Settings**, **Dismissed and ignored issues**, **Accessibility feedback**, **Scans**, **Manual tests**, **Accessibility statement**, **Applied fixes**, **Disproportionate burden**, **Exception tags** or **Evidence ledger**.
- **By**: **Anyone**, a person, or **Automatic (Lumtera, scheduled tasks, WP-CLI)**.
- **From** and **To** dates.

Click **Apply**. The table shows **What happened**, its **Type**, **By** and **When**, newest first, 50 to a page.

**Export CSV** downloads the filtered log with these columns: Time (UTC), User ID, User, Event, Object type, Object ID, Summary.

### Evidence ledger {#evidence-ledger}

Evidence entries (scans, manual tests, the statement, fixes, feedback, burden records and exception tags) are **tamper-evident**: each is sealed with a hash that includes the entry before it, so changes to past entries can be detected. The **Evidence ledger** card on the Activity screen shows the latest entry and its hash. Click **Verify ledger** to check the whole chain. See [Evidence log](/pro/evidence#verify-ledger).

### How long entries are kept {#retention}

Under **How long to keep activity**:

- **Keep entries for** a number of days. The default is **365**, and 0 keeps everything. Older entries are removed once a day.
- **Keep evidence for** a number of days, for the evidence entries. The default is **0**, which keeps them all: a record of your accessibility work needs its history. When set, the oldest are removed first and the ledger records it.

Click **Save**.

### Privacy

The log records what changed, never secret values. Settings changes record only *which* settings changed, not their values. License changes record the status and plan, never the key. Feedback entries record the request's reference, never what the visitor wrote, their name or email address. Share-link views record which link was used, never who opened it.

The activity log is included in WordPress's personal data tools (<span class="screen-path">Tools → Export Personal Data</span> and **Erase Personal Data**). Erasing replaces the person's name with "A removed user" and keeps the entry, so the record of what happened stays intact. For evidence entries, the ledger records the change, so it still verifies.

## Webhooks

Send events to Slack, Microsoft Teams or your own tools as they happen. Set them up under <span class="screen-path">Lumtera → Settings → Integrations</span>.

<ol class="step-list">
  <li>Enter the <strong>Address (https)</strong>. It must use <code>https://</code> and a public host. Local and private network addresses are refused: <em>"Webhook addresses must start with https:// and point to a public server."</em></li>
  <li>Choose a <strong>Format</strong>: <strong>JSON</strong> (signed, for your own code or Zapier/Make), <strong>Slack incoming webhook</strong> or <strong>Microsoft Teams (Workflows webhook)</strong>.</li>
  <li>Tick the event groups to send under <strong>Send these events</strong>. All are ticked for a new webhook.</li>
  <li>Save. For JSON webhooks, copy the <strong>Signing secret</strong> now: <em>"Copy it now: it is shown only this once."</em></li>
  <li>Click <strong>Send test</strong> to check delivery.</li>
</ol>

You can add up to 10 webhooks. Turn off **Enabled** to pause one without losing its settings. Tick **Remove on save** to delete one. Each webhook shows its last delivery and HTTP status, for example *"Last delivery … delivered (HTTP 200)."*

For Microsoft Teams, create the address with the Teams Workflows template "Post to a channel when a webhook request is received".

### Events

| Group | Events |
| --- | --- |
| Fix tracking | `task.created`, `task.assigned`, `task.status_changed`, `task.note_added`, `task.verified`, `task.reopened`, `task.dismissed`, `task.issue_created` |
| Alerts | `alert.new_errors`, `page.new_errors` |
| Reports | `report.created`, `report.deleted`, `report.viewed` |
| License | `license.changed` |
| Settings | `settings.changed` |
| Dismissed and ignored issues | `issue.dismissed`, `issue.restored`, `issue.ignored_globally`, `issue.unignored_globally` |
| Accessibility feedback | `feedback.received`, `feedback.status_changed`, `feedback.assigned`, `feedback.overdue` |
| Scans | `scan.site_completed`, `scan.parts_completed`, `pages.run_completed`, `pages.form_tested` |
| Manual tests | `manual.recorded`, `session.signed_off`, `session.reopened` |
| Accessibility statement | `statement.published`, `statement.reviewed` |
| Applied fixes | `change.applied`, `change.reverted`, `change.verified` |
| Disproportionate burden | `burden.recorded`, `burden.reviewed` |
| Exception tags | `exception.tagged` |
| Evidence ledger | `ledger.anonymised`, `ledger.pruned` |

The groups from **Accessibility feedback** to **Evidence ledger**, plus `task.verified`, are evidence: they're kept in the [evidence ledger](/pro/evidence).

**Send test** sends a `webhook.test` event straight away.

Some events worth knowing:

- `task.issue_created` fires when a fix is sent to an [issue tracker](/pro/fix-tracking#issue-trackers). Its data includes the tracker, the issue key and the issue address.
- `issue.ignored_globally` and `issue.unignored_globally` fire when a [site-wide ignore rule](/pro/ignore) is added or removed. Their data includes the check, the markup or pattern, the reason and any expiry.
- `report.viewed` fires when someone opens a report through a [share link](/pro/reports#share-links), at most once an hour per link. It names the link, never the visitor.
- `feedback.overdue` fires once when a request goes past your [response target](/pro/feedback-targets).
- `scan.site_completed` fires after each full scan of your content, with how many findings are new, fixed and still there since the previous one.
- `exception.tagged` fires when content is tagged with an exception, and with an empty type when a tag is removed.
- `settings.changed` covers Lumtera's settings, alerts, branding, scheduled checks, webhooks and activity retention. It names the settings that changed, never their values.

Evidence events never carry personal data beyond the actor: no feedback text, testers' notes, screenshots or changed text.

### JSON payload

```json
{
  "event": "alert.new_errors",
  "time": "2026-09-25T09:30:00Z",
  "site": { "name": "Crumb & Co. Bakery", "url": "https://example.com/" },
  "actor": { "type": "user", "id": 3, "name": "Maya" },
  "object": { "type": "post", "id": 42 },
  "data": {
    "post_id": 42,
    "post_title": "Order bread online",
    "count": 2,
    "errors": [
      { "title": "Link has no text", "message": "The link to /cart has no text…" }
    ],
    "edit_url": "https://example.com/wp-admin/post.php?post=42&action=edit"
  }
}
```

`actor.type` is `user` or `system`. For system events, `actor.name` is "WP-CLI", "Scheduled task" or "Lumtera". Payloads never contain license keys, webhook addresses, secrets, tracker tokens or setting values.

### Headers and signature

Every delivery sends:

| Header | Value |
| --- | --- |
| `X-Lumtera-Event` | The event name |
| `X-Lumtera-Delivery` | A unique ID for this delivery |
| `X-Lumtera-Signature` | `sha256=` followed by the HMAC-SHA256 of the raw body, using the signing secret (JSON format only) |
| `Content-Type` | `application/json; charset=utf-8` |

Verify the signature before trusting a request. For example, in PHP:

```php
$body     = file_get_contents( 'php://input' );
$expected = 'sha256=' . hash_hmac( 'sha256', $body, LUMTERA_WEBHOOK_SECRET );

if ( ! hash_equals( $expected, $_SERVER['HTTP_X_LUMTERA_SIGNATURE'] ?? '' ) ) {
	http_response_code( 401 );
	exit;
}
```

Lost the secret, or think it leaked? Click **Regenerate secret**. The old one stops working straight away.

### Delivery

Webhooks are sent in the background, so they never slow down saving. A delivery that fails with a network error, a 5xx or a 429 response is retried after 1, 5 and 30 minutes. Redirects aren't followed. Nothing is sent without an active license.

## For developers

In PHP, the `lumtera_pro_event` action fires for every event, and `lumtera_pro_event_payload` filters the payload. See [Hooks & filters](/developers/hooks).
