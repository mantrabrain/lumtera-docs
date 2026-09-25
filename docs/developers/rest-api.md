---
title: REST API
description: Lumtera's REST routes under lumtera/v1 and Lumtera Pro's under lumtera-pro/v1, with methods, arguments, permissions and responses.
---

# REST API

Lumtera's admin screens and editor panels are built on these routes, so everything the UI can do is available to your own code. Authenticate as you would with any WordPress REST route, using a cookie and nonce in wp-admin, or an Application Password from outside.

::: tip Permalinks
If your site uses plain permalinks, use the `?rest_route=` form, for example `https://example.com/?rest_route=/lumtera/v1/site-summary`. It works under every permalink setting.
:::

When a permission check fails, WordPress answers with its usual `rest_forbidden` error (401 when logged out, 403 when logged in).

"Lumtera's report capability" below means the capability from the `lumtera_capability` filter. By default that's `lumtera_view_reports`, which <span class="screen-path">Settings → Permissions</span> gives to roles. See [Roles & permissions](/permissions).

## Free: `lumtera/v1`

| Route | Methods | Purpose |
| --- | --- | --- |
| [`/check`](#post-check) | POST | Check unsaved content |
| [`/posts/{id}/issues`](#get-posts-id-issues) | GET | Stored results for a post |
| [`/posts/{id}/scan`](#post-posts-id-scan) | POST | Check a saved post and store the result |
| [`/posts/{id}/dismiss`](#post-posts-id-dismiss) | POST | Dismiss or restore an issue |
| [`/posts/{id}/manual`](#posts-id-manual) | GET, POST | Manual check results |
| [`/posts/{id}/ai/link-text`](#ai-writing-suggestions) | POST | AI suggestions for vague link text |
| [`/posts/{id}/ai/headings`](#ai-writing-suggestions) | POST | AI suggestions for headings |
| [`/posts/{id}/ai/summary`](#ai-writing-suggestions) | POST | AI plain-language summary |
| [`/site-summary`](#get-site-summary) | GET | Site-wide numbers for the Pro portfolio |
| [`/bulk`](#post-bulk) | POST | Next batch of **Check all content** |
| [`/images/{id}`](#post-images-id) | POST, PUT, PATCH | Save an image's alt text |
| [`/images/{id}/apply`](#post-images-id-apply) | POST | Copy alt text into posts |
| [`/images/{id}/suggest`](#post-images-id-suggest) | POST | AI alt text suggestions |

### POST /check

Checks content **without storing anything**. This is what the editor sidebar calls as you type.

| Argument | Type | Default | Notes |
| --- | --- | --- | --- |
| `post_id` | int | 0 | The post being edited. Used for permissions, the reading level's language and dismissals. |
| `content` | string | `''` | Block markup or HTML, up to 512 KB (`lumtera_max_check_bytes`) |
| `block_ids` | string[] | `[]` | Editor block client IDs, in order, so issues can be mapped to blocks. Up to 5,000, each up to 64 characters. |
| `elementor` | string | `''` | Unsaved Elementor data (JSON), up to the same size as `content` |

**Permission:** `edit_post` on `post_id` if given, otherwise `edit_posts`.

**Rate limit:** 120 checks per user per minute (`lumtera_check_rate_limit`). Over the limit returns HTTP 429 `lumtera_rate_limited`.

With `elementor` and a `post_id`, the unsaved Elementor elements are rendered and checked instead of `content`. That needs Elementor's own edit permission (403 `lumtera_forbidden`) and valid JSON (400 `lumtera_bad_elements`).

**Response:**

```json
{
  "issues": [ { "rule": "link-no-name", "title": "Link has no text", "category": "links",
                "wcag": "2.4.4", "wcag_name": "Link Purpose (In Context)",
                "wcag_url": "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
                "level": "A", "how_to_fix": "…", "id": "<fingerprint>", "severity": "error",
                "message": "…", "context": "<a …>", "block": "<client id>", "element": "" } ],
  "dismissed": [],
  "counts": { "error": 1, "warning": 0, "notice": 0 },
  "score": 85,
  "rules_run": 64,
  "readability": { "grade": 7.2, "words": 412, "sentences": 31, "target": 9, "lang": "en",
                   "formula": "flesch-kincaid", "formula_name": "Flesch–Kincaid grade level",
                   "score": 7.2, "scale": "grade", "label": "Easy to read" },
  "can_dismiss_errors": true
}
```

- `id` is the issue's **fingerprint**: an MD5 of the check ID and the normalized markup. A repeat of the same markup in one post adds its occurrence number, so each copy has its own fingerprint. Dismissals, Pro tasks and Pro ignore rules are keyed on it.
- `readability` is `null` when it isn't measured: for an unsupported language, or text that's too short. `formula` depends on the post's language (Polylang and WPML are read). `scale` tells how to read `score`.
- `dismissed` lists hidden issues with the same fields, plus `dismissed_by`, `note`, `time`, `source` and `can_restore`. `source` is `post` for a dismissal on this post. For an issue [ignored site-wide](/pro/ignore) in Pro, `source` is `global`, `note` is the reason, and `restore_path` and `expires` are added.
- `can_dismiss_errors` is `false` when there's no `post_id`.
- Posts built with Elementor also get `builder: { name, edit_url }`.

### GET /posts/{id}/issues

The stored issues for a post, from its last check. Nothing is checked again. **Permission:** `edit_post`.

Response: `{ "issues": [ … ], "summary": { "errors", "warnings", "notices", "dismissed", "score", "grade", "scanned_at", "version" } }`. Issues have the same fields as in `/check`, with `block` empty. `summary` is `null` if the post hasn't been checked.

### POST /posts/{id}/scan

Checks the saved post and **stores** the result. Returns the same shape as `/check`. **Permission:** `edit_post`.

Errors: 404 `lumtera_not_found`, 400 `lumtera_not_scanned` (the content type isn't checked).

### POST /posts/{id}/dismiss

Dismisses an issue, or restores it.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `fingerprint` | string | Yes | 32 lowercase hex characters |
| `rule` | string | Yes | The check ID |
| `severity` | `error`, `warning` or `notice` | Yes | |
| `note` | string | | Up to 1,000 characters |
| `content` | string | | Unsaved editor content, to find issues not saved yet |
| `elementor` | string | | Unsaved Elementor data |
| `restore` | bool | | `true` to restore instead of dismiss |

**Permission:** `edit_post`. Dismissing or restoring an **error** also needs the capability from `lumtera_dismiss_errors_capability`. By default that's `lumtera_dismiss_errors`, given to roles under <span class="screen-path">Settings → Permissions</span>.

The server finds the issue itself and uses its real check and severity, whatever the request says. It looks in the stored results, then the saved post, then `content` or `elementor`.

Returns `{ "ok": true }`, then checks the post again and stores the result. Errors: 404 `lumtera_not_dismissed` (restoring an issue that isn't dismissed), 400 `lumtera_unknown_issue`, 403 `lumtera_forbidden`.

### /posts/{id}/manual

Results of the [manual checks](/manual-checks) for a post.

**Permission:** `edit_post`, and the post must be of a content type Lumtera checks.

`GET` returns the current results. `POST` records or clears one result:

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `test` | string | Yes | `keyboard`, `zoom-reflow`, `text-spacing`, `screen-reader`, `forms`, `media`, `motion-timing`, `hover-focus` or `orientation` |
| `result` | string | Yes | `pass`, `fail`, `na`, or `''` to clear the result |
| `note` | string | | Up to 2,000 characters |
| `failed` | string[] | | With `fail`: the WCAG criteria that failed, such as `2.4.7`. Up to 10. Empty means every criterion of the test failed. |

Both methods return:

```json
{
  "results": {
    "keyboard": { "result": "fail", "note": "Focus is lost in the menu.", "failed": [ "2.4.7" ],
                  "time": 1790000000, "userName": "Maya", "date": "September 25, 2026" }
  },
  "summary": { "total": 9, "done": 1, "passed": 0, "failed": 1, "na": 0 },
  "label": "Manual checks: 1 of 9 done, 1 failed"
}
```

Error: 400 `lumtera_manual_invalid`. Saving fires `lumtera_manual_test_saved`. See [Hooks & filters](/developers/hooks#manual-checks).

### AI writing suggestions

Three routes ask the AI provider connected to WordPress for writing suggestions. Each needs its switch on under <span class="screen-path">Settings → AI</span> (settings keys `link_text`, `headings` and `summary`) and WordPress's AI Client. See [AI suggestions](/ai).

**Permission:** the feature is switched on, and `edit_post` on the post. The post must exist.

**Rate limit:** 30 AI requests per user in 10 minutes, shared by all AI features, alt text included (`lumtera_ai_rate_limit`). Over the limit returns 429 `lumtera_ai_rate_limited`.

All three accept `title` (string): the post title as typed. When empty, the saved title is used.

Suggestions are drafts. Nothing is saved: the editor shows them, and the author chooses whether to use one.

#### POST /posts/{id}/ai/link-text

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `text` | string | Yes | The current link text |
| `href` | string | | The link's address |
| `html` | string | | The paragraph around the link |
| `rule` | string | | The finding: `link-ambiguous-text` (default), `link-url-as-text` or `link-same-text-different-url` |

Response: `{ "suggestions": [ "…" ], "note": "…" }`, with up to three suggestions of at most 90 characters. Suggestions that repeat the current text, or would still fail the link text checks, are removed.

#### POST /posts/{id}/ai/headings

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `mode` | string | Yes | `bold` (turn a bold paragraph into a heading) or `outline` (suggest where subheadings go) |
| `text` | string | For `bold` | The bold paragraph |
| `next` | string | | `bold`: the text that follows it |
| `previous` | string | | `bold`: the heading before it |
| `paragraphs` | string[] | For `outline` | The post's paragraphs, in order. Up to 80 are used. At least 3 must have text. |

Response for `bold`: `{ "suggestions": [ "…" ], "note": "…" }`, with up to two suggestions. For `outline`: `{ "headings": [ { "index": 3, "text": "…" } ], "note": "…" }`, with up to four headings. `index` is the zero-based position in `paragraphs` that the heading goes before. Headings are at most 80 characters.

#### POST /posts/{id}/ai/summary

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `content` | string | Yes | The post content (HTML or block markup), up to 512 KB. It needs at least 100 words. |

Response: `{ "summary": "…", "words": 96, "note": "…" }`. The summary is at most 120 words.

**Errors for all three:** 400 `lumtera_ai_no_input` (nothing to work with), 501 `lumtera_ai_unavailable` or `lumtera_ai_no_model`, 502 `lumtera_ai_failed` or `lumtera_ai_bad_answer`. Each route has a `lumtera_ai_{feature}_pre` filter to answer without the AI Client. See [Hooks & filters](/developers/hooks#ai).

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

Checks the next batch of content, for **Check all content**. Each call checks up to 50 posts, stopping early after about 2 seconds.

| Argument | Type | Default |
| --- | --- | --- |
| `after` | int | 0. The cursor from the previous response. |
| `only_unscanned` | bool | false |

**Permission:** Lumtera's report capability. Response: `{ "scanned", "after", "remaining", "done", "totals" }`. Call again with the returned `after` until `done` is true. Each call fires `lumtera_bulk_batch_done`.

### POST /images/{id}

Saves an image's alt text in the Media Library. Also accepts PUT and PATCH. **Permission:** `edit_post` on the image. `id` must be an image.

| Argument | Type | Notes |
| --- | --- | --- |
| `alt` | string | Required |
| `source` | `''` or `ai` | `ai` records that the text began as an AI suggestion, and who accepted it |

Response: `{ "id", "alt", "status": "missing|review|ok", "judged", "used", "empty": [ { "id", "title", "editable" } ], "manual": [ … ] }`. `empty` lists posts showing the image without alt text that Lumtera can fill. `manual` lists posts where the alt text has to be added by hand.

### POST /images/{id}/apply

Adds the image's alt text to posts that show it without any. Existing alt text is never replaced. **Permission:** `edit_post` on the image.

Response: `{ "updated": [ … ], "skipped": 0, "skipped_reasons": { "permission": 0, "filtered": 0 } }` plus the image state. Error 400 `lumtera_no_alt` if the image has no alt text yet.

### POST /images/{id}/suggest

Asks the connected AI provider for alt text suggestions. Needs [AI alt text suggestions](/ai) switched on. **Permission:** the feature is switched on, and `edit_post` on the image.

| Argument | Type | Notes |
| --- | --- | --- |
| `post_id` | int | Optional. The post to take context from. It's ignored if the user can't read it. |

Response: `{ "suggestions": [ "…" ], "decorative": false, "note": "…" }` with up to three suggestions.

It shares the AI rate limit above. Errors: 429 `lumtera_ai_rate_limited`, 400 `lumtera_ai_no_file` (the file can't be read or is over 4 MB), 501 `lumtera_ai_unavailable` or `lumtera_ai_no_model`, 502 `lumtera_ai_failed` or `lumtera_ai_bad_answer`.

## Pro: `lumtera-pro/v1` <span class="pro-pill">Pro</span> {#pro-lumtera-pro-v1}
Every Pro route also needs an active license. Otherwise its permission check fails.

### Fix tracking

| Route | Method | Arguments | Permission |
| --- | --- | --- | --- |
| `/tasks` | GET | `post_id` (required) | `edit_post` |
| `/tasks` | POST | `post_id`, `fingerprint` (required); `assignee` (default 0); `note` | `edit_post`. Assigning someone else needs `edit_others_posts`. |
| `/tasks/{id}` | POST | `status` (`open`, `in_progress`, `fixed`, `wont_fix`), `assignee`, `note` | `edit_post` on the task's post. `wont_fix` on an error needs the dismiss-errors capability. |
| `/tasks/{id}/history` | GET | | `edit_post` on the task's post |
| `/tasks/{id}/issue` | POST | | `edit_post` on the task's post, a connected [issue tracker](/pro/fix-tracking#issue-trackers), and Lumtera's report capability |
| `/assignees` | GET | | `edit_posts` |

`POST /tasks` finds the issue on the server by its fingerprint: first in the stored results, then by checking the saved post. `rule`, `severity`, `message` and `context` are still accepted from older clients, but ignored. Errors: 404 `lumtera_pro_finding`, 400 `lumtera_pro_assignee` (that person can't edit the post), 403 `lumtera_pro_assign_others`.

`GET /tasks` returns an object keyed by fingerprint. A task looks like:

```json
{
  "id": 7, "post_id": 42, "fingerprint": "…", "rule": "link-no-name", "title": "Link has no text",
  "wcag": "2.4.4", "severity": "error", "message": "…", "context": "…",
  "status": "in_progress", "verified": false, "status_label": "In progress",
  "assignee": 3, "assignee_name": "Maya", "updated": 1790000000,
  "post_title": "Order bread online", "edit_url": "…",
  "issue": { "tracker": "github", "tracker_name": "GitHub", "url": "https://github.com/acme/site/issues/12", "key": "#12" }
}
```

`issue` is `null` until an issue is created for the task in a tracker.

`POST /tasks/{id}/issue` creates the task's issue in the connected tracker (GitHub, GitLab, Jira or Linear) and returns the task. A task that already has an issue returns it unchanged. Errors: 404 `lumtera_pro_tracker_task`, 400 `lumtera_pro_tracker_none`, 409 `lumtera_pro_tracker_busy` (being created right now), 429 when the tracker asks to wait, and 502 for other tracker errors.

History entries are `{ "action", "detail", "user", "time" }`. `/assignees` returns `[ { "id", "name" } ]`: everyone who can edit posts, or only you if you can't assign others.

### Ignore rules

Rules that hide a finding on every page. See [Ignore site-wide](/pro/ignore).

| Route | Method | Notes |
| --- | --- | --- |
| `/ignore` | GET | Every rule, newest first, including expired ones |
| `/ignore` | POST | Adds a rule. Returns it with HTTP 201. |
| `/ignore/{id}` | DELETE | Removes a rule. Returns `{ "deleted": true, "previous": { … } }`. |

**Permission:** `manage_options`.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `rule` | string | Yes | The check ID. Pro page check IDs are accepted too. |
| `match` | `exact` or `pattern` | | Default `exact` |
| `value` | string | Yes | Up to 1,000 characters. For `exact`: the finding's markup, as shown under **Markup**. For `pattern`: an optional tag name followed by `.class` and `#id` parts, such as `a.social-link` or `.cookie-banner`. |
| `reason` | string | Yes | Up to 500 characters. Shown wherever the finding is hidden. |
| `expires` | string or int | | A date (`Y-m-d`, end of that day in the site's time zone) or a Unix time. Empty for never. |
| `severity` | string | | `error`, `warning` or `notice`: the most severe finding the rule may hide. Empty for any. |

A rule looks like:

```json
{
  "id": "k3x9q2m7b1zc", "rule": "link-ambiguous-text", "match": "pattern", "value": "a.read-more",
  "severity": "", "reason": "Theme archive links; the heading gives context.",
  "user": 1, "time": 1790000000, "expires": 0,
  "check": "Link text is vague", "by": "Maya", "expired": false
}
```

Errors (400 unless noted): `lumtera_pro_ignore_rule`, `lumtera_pro_ignore_match`, `lumtera_pro_ignore_value`, `lumtera_pro_ignore_pattern`, `lumtera_pro_ignore_reason`, `lumtera_pro_ignore_expiry`, `lumtera_pro_ignore_full` (500 rules at most), 409 `lumtera_pro_ignore_exists`, and 404 `lumtera_pro_ignore_missing` on delete.

Adding or removing a rule re-checks the affected posts in the background. It also records `issue.ignored_globally` or `issue.unignored_globally` in the [activity log](/pro/activity-webhooks#events).

### Page checks

| Route | Method | Notes |
| --- | --- | --- |
| `/page-checks` | POST | Stores a browser check. See the arguments below. |
| `/page-checks/{id}` | GET, DELETE | Read one result, or remove it. Removing a desktop result also removes the page from scheduled checks. |
| `/page-checks/schedule` | GET, POST, PUT, PATCH | Read or set `frequency` (`off`, `daily`, `weekly`; required) and `templates` (bool) |
| `/page-checks/schedule/run` | POST | Runs one batch of scheduled checks now |

`POST /page-checks` arguments:

| Argument | Type | Notes |
| --- | --- | --- |
| `url` | string | Required. A page of this site. |
| `html` | string | Required. The rendered page, up to 6 MB. |
| `title` | string | Up to 300 characters |
| `contrast` | array | Up to 200 contrast measurements from the browser |
| `viewport` | string | `desktop` (default) or `phone`. A page has one stored result per viewport. |
| `layout` | array | With `phone`: up to 100 reflow and touch-target measurements taken at 390 pixels wide |

A result looks like `{ "id", "url", "title", "errors", "warnings", "notices", "score", "checked", "source", "browser", "viewport", "issues": [ … ] }`. `source` is `browser` or `scheduled`.

**Permission:** Lumtera's report capability.

### Documents

`POST /documents/scan` checks PDFs. Pass `id` to check one file, or page through all of them with the `after` cursor until `done` is true. `paged` picks the page of the results table returned at the end. **Permission:** Lumtera's report capability. Error: 404 `lumtera_pro_not_found`.
