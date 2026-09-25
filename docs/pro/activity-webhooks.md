---
title: Activity log & webhooks
description: See who changed what in Lumtera Pro, export the activity log, and send events to Slack, Microsoft Teams, Zapier, Make or your own code with signed webhooks.
---

# Activity log & webhooks <span class="pro-pill">Pro</span>

## Activity log

<span class="screen-path">Accessibility → Activity</span> (administrators only) shows who changed what, and when: fixes, issues sent to trackers, alerts, reports, the license, settings, and dismissed and ignored issues.

Filter by:

- **Show**: **All activity**, **Fix tracking**, **Alerts**, **Reports**, **License**, **Settings** or **Dismissed and ignored issues**.
- **By**: **Anyone**, a person, or **Automatic (Lumtera, scheduled tasks, WP-CLI)**.
- **From** and **To** dates.

Click **Apply**. The table shows **What happened**, its **Type**, **By** and **When**, newest first, 50 to a page.

**Export CSV** downloads the filtered log with these columns: Time (UTC), User ID, User, Event, Object type, Object ID, Summary.

### How long entries are kept

Under **How long to keep activity**, set **Keep entries for** a number of days and click **Save**. The default is **365**, and 0 keeps everything. Older entries are removed once a day.

### Privacy

The log records what changed, never secret values. Settings changes record only *which* settings changed, not their values. License changes record the status and plan, never the key.

The activity log is included in WordPress's personal data tools (<span class="screen-path">Tools → Export Personal Data</span> and **Erase Personal Data**). Erasing replaces the person's name with "A removed user" and keeps the entry, so the record of what happened stays intact.

## Webhooks

Send events to Slack, Microsoft Teams or your own tools as they happen. Set them up under <span class="screen-path">Accessibility → Settings → Integrations</span>.

<ol class="step-list">
  <li>Enter the <strong>Address (https)</strong>. It must use <code>https://</code> and a public host.</li>
  <li>Choose a <strong>Format</strong>: <strong>JSON</strong> (signed, for your own code or Zapier/Make), <strong>Slack incoming webhook</strong> or <strong>Microsoft Teams (Workflows webhook)</strong>.</li>
  <li>Tick the event groups to send under <strong>Send these events</strong>. All are ticked by default.</li>
  <li>Save. For JSON webhooks, copy the <strong>Signing secret</strong> now. It's shown only once.</li>
  <li>Click <strong>Send test</strong> to check delivery.</li>
</ol>

You can add up to 10 webhooks. Turn off **Enabled** to pause one without losing its settings. Tick **Remove on save** to delete one. Each webhook shows its last delivery and HTTP status, for example *"Last delivery … delivered (HTTP 200)."*

For Microsoft Teams, create the address with the Teams Workflows template "Post to a channel when a webhook request is received".

### Events

| Group | Events |
| --- | --- |
| Fix tracking | `task.created`, `task.assigned`, `task.status_changed`, `task.note_added`, `task.verified`, `task.reopened`, `task.dismissed`, `task.issue_created` |
| Alerts | `alert.new_errors`, `page.new_errors` |
| Reports | `report.created`, `report.deleted` |
| License | `license.changed` |
| Settings | `settings.changed` |
| Dismissed and ignored issues | `issue.dismissed`, `issue.restored`, `issue.ignored_globally`, `issue.unignored_globally` |

**Send test** sends a `webhook.test` event straight away.

Some events worth knowing:

- `task.issue_created` fires when a fix is sent to an [issue tracker](/pro/fix-tracking#issue-trackers). Its data includes the tracker, the issue key and the issue address.
- `issue.ignored_globally` and `issue.unignored_globally` fire when a [site-wide ignore rule](/pro/ignore) is added or removed. Their data includes the check, the markup or pattern, the reason and any expiry.
- `settings.changed` covers Lumtera's settings, alerts, branding, scheduled checks, webhooks and activity retention. It names the settings that changed, never their values.

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

### For developers

In PHP, the `lumtera_pro_event` action fires for every event, and `lumtera_pro_event_payload` filters the payload. See [Hooks & filters](/developers/hooks).
