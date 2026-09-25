---
title: REST API
description: Lumtera's REST routes under lumtera/v1 and Lumtera Pro's under lumtera-pro/v1, with methods, arguments, permissions and responses.
---

# REST API

Lumtera's admin screens and editor panels are built on these routes, so everything the UI can do is available to your own code. Authenticate as you would with any WordPress REST route, using a cookie and nonce in wp-admin, or an Application Password from outside.

::: tip Permalinks
If your site uses plain permalinks, use the `?rest_route=` form, for example `https://example.com/?rest_route=/lumtera/v1/site-summary`. It works under every permalink setting.
:::

## Free: `lumtera/v1`

### POST /check

Checks content **without storing anything**. This is what the editor sidebar calls as you type.

| Argument | Type | Default | Notes |
| --- | --- | --- | --- |
| `post_id` | int | 0 | The post being edited. Used for permissions and context. |
| `content` | string | `''` | Block markup or HTML, up to 512 KB (`lumtera_max_check_bytes`) |
| `block_ids` | string[] | `[]` | Editor block client IDs, in order, so issues can be mapped to blocks. Up to 5,000. |
| `elementor` | string | `''` | Unsaved Elementor data (JSON) |

**Permission:** `edit_post` on `post_id` if given, otherwise `edit_posts`.

**Rate limit:** 120 checks per user per minute (`lumtera_check_rate_limit`). Over the limit returns HTTP 429 `lumtera_rate_limited`.

**Response:**

```json
{
  "issues": [ { "rule": "link-no-name", "title": "Link has no text", "category": "links",
                "wcag": "2.4.4", "wcag_name": "Link Purpose (In Context)", "wcag_url": "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
                "level": "A", "how_to_fix": "…", "id": "<fingerprint>", "severity": "error",
                "message": "…", "context": "<a …>", "block": "<client id>", "element": "" } ],
  "dismissed": [],
  "counts": { "error": 1, "warning": 0, "notice": 0 },
  "score": 85,
  "rules_run": 64,
  "readability": { "grade": 7.2, "words": 412, "sentences": 31, "target": 9, "label": "Easy to read" },
  "can_dismiss_errors": true
}
```

`id` is the issue's **fingerprint**: an MD5 of the check and the normalized markup. Dismissals and Pro tasks are keyed on it. `readability` is `null` when it isn't measured. Elementor pages also get `builder: { name, edit_url }`.

### GET /posts/{id}/issues

The stored issues for a post, from its last scan. **Permission:** `edit_post`.

Response: `{ "issues": [ … ], "summary": { "errors", "warnings", "notices", "dismissed", "score", "grade", "scanned_at", "version" } }`. `summary` is `null` if the post hasn't been checked.

### POST /posts/{id}/scan

Scans the saved post and **stores** the result. Returns the same shape as `/check`. **Permission:** `edit_post`.

Errors: 404 `lumtera_not_found`, 400 `lumtera_not_scanned` (the content type isn't checked).

### POST /posts/{id}/dismiss

Dismisses an issue, or restores it.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `fingerprint` | string | Yes | 32 hex characters |
| `rule` | string | Yes | The check ID |
| `severity` | `error`, `warning` or `notice` | Yes | |
| `note` | string | | Up to 1,000 characters |
| `content` | string | | Unsaved editor content, to find issues not saved yet |
| `elementor` | string | | Unsaved Elementor data |
| `restore` | bool | | `true` to restore instead of dismiss |

**Permission:** `edit_post`. Dismissing or restoring an **error** also needs `lumtera_dismiss_errors_capability` (default `edit_others_posts`). The server looks the issue up itself and uses its real severity, whatever the request says.

Returns `{ "ok": true }`, then re-scans and stores the post. Errors: 404 `lumtera_not_dismissed`, 400 `lumtera_unknown_issue`, 403 `lumtera_forbidden`.

### GET /site-summary

A summary of the site, for the Pro [agency portfolio](/pro/portfolio). **Permission:** the `lumtera_view_summary` capability (the [Lumtera Reporter](/permissions#lumtera-reporter) role and administrators) or Lumtera's report capability.

```json
{
  "name": "Crumb & Co. Bakery",
  "url": "https://example.com",
  "admin_url": "https://example.com/wp-admin/admin.php?page=lumtera",
  "version": "1.0.0",
  "totals": { "content": 12, "scanned": 12, "average": 88, "errors": 8, "warnings": 12,
              "notices": 5, "failing": 4, "unscanned": 0, "passing": 8 },
  "rules": [ { "title": "Form field has no label", "wcag": "4.1.2", "severity": "error", "issues": 3, "posts": 1 } ],
  "worst": [ { "title": "Order bread online", "errors": 3, "url": "https://example.com/wp-admin/post.php?post=42&action=edit" } ],
  "time": 1790000000
}
```

`rules` lists the five most common checks. `worst` lists up to five published items. No page content is included.

### POST /bulk

Checks the next batch of content, for **Check all content**. Each call checks up to 50 posts within about 2 seconds.

| Argument | Type | Default |
| --- | --- | --- |
| `after` | int | 0. The cursor from the previous response. |
| `only_unscanned` | bool | false |

**Permission:** Lumtera's report capability. Response: `{ "scanned", "after", "remaining", "done", "totals" }`. Call again with the returned `after` until `done` is true.

### POST /images/{id}

Saves an image's alt text in the Media Library. **Permission:** `edit_post` on the image.

| Argument | Type | Notes |
| --- | --- | --- |
| `alt` | string | Required |
| `source` | `''` or `ai` | `ai` records that the text began as an AI suggestion |

Response: `{ "id", "alt", "status": "missing|review|ok", "judged", "used", "empty": [ { "id", "title", "editable" } ], "manual": [ … ] }`. `empty` lists posts showing the image without alt text.

### POST /images/{id}/apply

Adds the image's alt text to posts that show it without any. Existing alt text is never replaced. **Permission:** `edit_post` on the image.

Response: `{ "updated": [ … ], "skipped": 0, "skipped_reasons": { "permission": 0, "filtered": 0 } }` plus the image state. Error 400 `lumtera_no_alt` if the image has no alt text yet.

### POST /images/{id}/suggest

Asks the connected AI provider for alt text suggestions. Needs [AI suggestions](/ai) switched on. **Permission:** `edit_post` on the image.

| Argument | Type | Notes |
| --- | --- | --- |
| `post_id` | int | Optional. The post to take context from. |

Response: `{ "suggestions": [ "…" ], "decorative": false, "note": "…" }` with up to three suggestions. Errors: 501 `lumtera_ai_unavailable` or `lumtera_ai_no_model`, 502 `lumtera_ai_failed` or `lumtera_ai_bad_answer`.

## Pro: `lumtera-pro/v1` <span class="pro-pill">Pro</span>

Every Pro route also needs an active license. Otherwise it returns 403.

### Fix tracking

| Route | Method | Arguments | Permission |
| --- | --- | --- | --- |
| `/tasks` | GET | `post_id` (required) | `edit_post` |
| `/tasks` | POST | `post_id`, `fingerprint` (required); `assignee` (default 0); `note` | `edit_post`. Assigning someone else needs `edit_others_posts`. |
| `/tasks/{id}` | POST | `status` (`open`, `in_progress`, `fixed`, `wont_fix`), `assignee`, `note` | `edit_post` on the task's post. `wont_fix` on an error needs the dismiss-errors capability. |
| `/tasks/{id}/history` | GET | | `edit_post` on the task's post |
| `/assignees` | GET | | `edit_posts` |

`GET /tasks` returns an object keyed by fingerprint. A task looks like:

```json
{
  "id": 7, "post_id": 42, "fingerprint": "…", "rule": "link-no-name", "title": "Link has no text",
  "wcag": "2.4.4", "severity": "error", "message": "…", "context": "…",
  "status": "in_progress", "verified": false, "status_label": "In progress",
  "assignee": 3, "assignee_name": "Maya", "updated": "…",
  "post_title": "Order bread online", "edit_url": "…"
}
```

History entries are `{ "action", "detail", "user", "time" }`.

### Page checks

| Route | Method | Notes |
| --- | --- | --- |
| `/page-checks` | POST | Stores a browser check: `html` (up to 6 MB), `url` (this site only), `title`, `contrast` (up to 200 measurements) |
| `/page-checks/{id}` | GET, DELETE | Read one result, or remove it (also removes it from scheduled checks) |
| `/page-checks/schedule` | GET, POST | Read or set `frequency` (`off`, `daily`, `weekly`) and `templates` |
| `/page-checks/schedule/run` | POST | Runs one batch of scheduled checks now |

**Permission:** Lumtera's report capability.

### Documents

`POST /documents/scan` checks PDFs. Pass `id` to check one file, or page through all of them with the `after` cursor until `done` is true. **Permission:** Lumtera's report capability.
