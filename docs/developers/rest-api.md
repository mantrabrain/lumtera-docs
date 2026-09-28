---
title: REST API
description: Every REST route of Lumtera (lumtera/v1) and Lumtera Pro (lumtera-pro/v1), with methods, arguments, permissions and responses.
---

# REST API

Lumtera's admin screens, editor panels and review mode run on these routes. Everything the screens do is open to your own code.

- Free routes live under `lumtera/v1`.
- Lumtera Pro's routes live under `lumtera-pro/v1`.

## Authentication {#authentication}

Sign in as you would for any WordPress REST route:

- **In wp-admin or on the site:** the login cookie plus a REST nonce in the `X-WP-Nonce` header. `wp.apiFetch` adds it for you.
- **From outside WordPress:** an Application Password, sent with HTTP Basic authentication.

The one exception is [`POST /feedback`](#post-feedback). It is public, because visitors are not signed in.

When a permission check fails, WordPress answers with its usual `rest_forbidden` error: 401 when signed out, 403 when signed in.

::: tip Plain permalinks
If your site uses plain permalinks, use the `?rest_route=` form. For example: `https://example.com/?rest_route=/lumtera/v1/site-summary`. It works under every permalink setting.
:::

### Capabilities used on this page {#capabilities}

| Words used below | What it means |
| --- | --- |
| **the report capability** | The capability from the `lumtera_capability` filter. Default `lumtera_view_reports`. |
| **the review capability** | The capability from the `lumtera_review_capability` filter. Default `lumtera_review_mode`. |
| **the dismiss-errors capability** | The capability from the `lumtera_dismiss_errors_capability` filter. Default `lumtera_dismiss_errors`. |
| **the summary capability** | `lumtera_view_summary`. The Lumtera Reporter role and administrators have it. |

You give these to roles under <span class="screen-path">Lumtera → Settings → Permissions</span>. See [Roles & permissions](/permissions).

## Free routes: `lumtera/v1` {#free}

| Route | Methods | Permission | Purpose |
| --- | --- | --- | --- |
| [`/check`](#post-check) | POST | `edit_post` on `post_id`, or `edit_posts` | Check unsaved content |
| [`/posts/{id}/issues`](#get-posts-id-issues) | GET | `edit_post`, or read-only for report viewers | Stored results for a post |
| [`/posts/{id}/scan`](#post-posts-id-scan) | POST | `edit_post` | Check a saved post and store the result |
| [`/posts/{id}/dismiss`](#post-posts-id-dismiss) | POST | `edit_post` (+ dismiss-errors for errors) | Dismiss or restore an issue |
| [`/bulk`](#post-bulk) | POST | report capability | Next batch of **Check all content** |
| [`/page-results`](#post-page-results) | POST | review capability + nonce | Check a whole page from review mode |
| [`/page-results/dismiss`](#post-page-results-dismiss) | POST | review capability + nonce | Dismiss or restore a whole-page finding |
| [`/page-results/preference`](#post-page-results-preference) | POST | review capability + nonce | The person's **Save results to reports** choice |
| [`/posts/{id}/manual`](#posts-id-manual) | GET, POST | `edit_post` | Checklist results |
| [`/posts/{id}/manual/batch`](#post-posts-id-manual-batch) | POST | `edit_post` | Save several checklist results |
| [`/changes/propose`](#post-changes-propose) | POST | `edit_post` on `post_id` | Draft a fix for one issue |
| [`/changes/propose-part`](#post-changes-propose-part) | POST | Can edit that part | Draft a fix at the source (a shared part) |
| [`/changes`](#get-changes) | GET | `edit_post` on `post_id` | A post's changes |
| [`/changes/{id}/apply`](#changes-id-actions) | POST | Can edit the change's page or part | Approve and apply a change |
| [`/changes/{id}/revert`](#changes-id-actions) | POST | Can edit the change's page or part | Undo an applied change |
| [`/changes/{id}/reject`](#changes-id-actions) | POST | Can edit the change's page or part | Reject a proposed change |
| [`/changes/{id}/rescan`](#changes-id-actions) | POST | Can edit the change's part | Check the pages that show a fixed part again |
| [`/posts/{id}/ai/link-text`](#ai-writing-suggestions) | POST | Feature on + `edit_post` | AI suggestions for vague link text |
| [`/posts/{id}/ai/headings`](#ai-writing-suggestions) | POST | Feature on + `edit_post` | AI suggestions for headings |
| [`/posts/{id}/ai/summary`](#ai-writing-suggestions) | POST | Feature on + `edit_post` | AI plain-language summary |
| [`/images/{id}`](#post-images-id) | POST, PUT, PATCH | `edit_post` on the image | Save an image's alt text |
| [`/images/{id}/apply`](#post-images-id-apply) | POST | `edit_post` on the image | Copy alt text into posts |
| [`/images/{id}/suggest`](#post-images-id-suggest) | POST | Feature on + `edit_post` on the image | AI alt text suggestions |
| [`/feedback`](#post-feedback) | POST | Public, rate-limited | The visitor feedback form |
| [`/site-summary`](#get-site-summary) | GET | summary or report capability | Site-wide numbers for an agency hub |
| [`/prompts/{prompt}`](#post-prompts) | POST | `manage_options` for `review`; report capability for `hint-…` | Answer the review request or hide a Pro tip |

## Checks and scans {#checks-and-scans}

### POST /check {#post-check}

Checks content **without storing anything**. The editor sidebar calls it as you type.

| Argument | Type | Default | Notes |
| --- | --- | --- | --- |
| `post_id` | int | 0 | The post being edited. Used for permissions, the reading level's language and dismissals. |
| `content` | string | `''` | Block markup or HTML, up to 512 KB (`lumtera_max_check_bytes`) |
| `block_ids` | string[] | `[]` | Editor block client IDs, in order, so issues map to blocks. Up to 5,000, each up to 64 characters. |
| `elementor` | string | `''` | Unsaved Elementor data (JSON), up to the same size as `content` |

**Permission:** `edit_post` on `post_id` when it is given. Otherwise `edit_posts`.

**Rate limit:** 120 checks per user per minute (`lumtera_check_rate_limit`; 0 turns it off). Over the limit returns 429 `lumtera_rate_limited`. Whole-page checks and the `lumtera/check-content` ability count against the same limit.

With `elementor` and a `post_id`, Lumtera renders and checks the unsaved Elementor elements instead of `content`. That needs Elementor's own edit permission (403 `lumtera_forbidden`) and valid JSON (400 `lumtera_bad_elements`).

**Response:**

```json
{
  "issues": [ { "rule": "link-no-name", "title": "Link has no text", "category": "links",
                "wcag": "2.4.4", "wcag_name": "Link Purpose (In Context)",
                "wcag_url": "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html",
                "criteria": [ { "id": "2.4.4", "name": "Link Purpose (In Context)", "url": "…", "level": "A" },
                              { "id": "4.1.2", "name": "Name, Role, Value", "url": "…", "level": "A" } ],
                "docs_url": "…", "level": "A", "how_to_fix": "…", "rationale": "…",
                "id": "<fingerprint>", "severity": "error", "confidence": "certain",
                "message": "…", "context": "<a …>", "block": "<client id>", "element": "",
                "origin": null, "reopened": null } ],
  "dismissed": [],
  "counts": { "error": 1, "warning": 0, "notice": 0 },
  "possible": 0,
  "score": 85,
  "rules_run": 69,
  "readability": { "grade": 7.2, "words": 412, "sentences": 31, "target": 9, "lang": "en",
                   "formula": "flesch-kincaid", "formula_name": "Flesch–Kincaid grade level",
                   "score": 7.2, "scale": "grade", "label": "Easy to read" },
  "reading_note": "",
  "can_dismiss_errors": true
}
```

- `id` is the issue's **fingerprint**: an MD5 of the check ID and the issue's markup. A repeat of the same markup in one post adds its occurrence number, so each copy has its own fingerprint. Dismissals, fixes, Pro tasks and Pro ignore rules are keyed on it.
- `criteria` lists every WCAG criterion the check maps to. `wcag` is the main one.
- `confidence` is `certain`, `likely` or `possible`. `possible` counts how many issues are only possible ones.
- `rules_run` is the number of checks switched on. It is 69 when every check is on.
- `origin` is `null` for the post's own content. For markup from a shared part (a template part, synced pattern, menu, widget and so on) it is `{ "type", "id", "key", "owner", "label", "type_label", "edit_url" }`. See [Site parts](/site-parts).
- `reopened` is `null`, or explains why an issue someone dismissed shows again: `{ "reason": "changed" | "severity", "time", "dismissed_by", "note", "text" }`.
- `readability` is `null` when it isn't measured: for an unsupported language, or text that's too short. `reading_note` then says why. `formula` depends on the post's language (Polylang and WPML are read). `scale` tells you how to read `score`.
- `dismissed` lists hidden issues with the same fields, plus `dismissed_by`, `note`, `time`, `source` and `can_restore`. `source` is `post` for a dismissal on this post. For an issue ignored site-wide in Pro, `source` is `global`, `note` is the reason, and `restore_path` and `expires` are added.
- `can_dismiss_errors` is `false` when there's no `post_id`.
- Posts built with a page builder also get `builder: { "name", "edit_url", "live" }`. `live` is `true` for Elementor, whose editor checks unsaved changes as you work.

### GET /posts/{id}/issues {#get-posts-id-issues}

The stored issues for a post, from its last check. Nothing is checked again.

**Permission:** `edit_post` on the post. People with the report capability may also read a **published** post of a checked content type that they can read. They get the results read-only.

**Response:**

```json
{
  "issues": [ … ],
  "summary": { "errors": 0, "warnings": 0, "notices": 0, "dismissed": 0, "score": 100,
               "grade": null, "scanned_at": 1790419821, "version": "1.0.0" },
  "read_only": false
}
```

Issues have the same fields as in `/check`, with `block` empty. `summary` is `null` if the post hasn't been checked. `read_only` is `true` for someone who may see the reports but not edit the post.

### POST /posts/{id}/scan {#post-posts-id-scan}

Checks the saved post and **stores** the result. Returns the same shape as `/check`.

**Permission:** `edit_post` on the post.

**Errors:** 404 `lumtera_not_found`, 400 `lumtera_not_scanned` (Lumtera doesn't check this content type).

### POST /posts/{id}/dismiss {#post-posts-id-dismiss}

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

**Permission:** `edit_post` on the post. Dismissing or restoring an **error** also needs the dismiss-errors capability.

The server finds the issue itself and uses its real check and severity, whatever the request says. It looks in the stored results, then the saved post, then `content` or `elementor`. A dismissal never hides the same markup later reported as more serious.

Returns `{ "ok": true }`, then checks the post again and stores the result.

**Errors:** 404 `lumtera_not_dismissed` (restoring an issue that isn't dismissed), 400 `lumtera_unknown_issue`, 403 `lumtera_forbidden`.

### POST /bulk {#post-bulk}

Checks the next batch of content, for **Check all content**. Each call checks up to 50 posts, and stops early after about 2 seconds.

| Argument | Type | Default | Notes |
| --- | --- | --- | --- |
| `after` | int | 0 | The cursor from the previous response |
| `only_unscanned` | bool | false | Only posts that have never been checked |

**Permission:** the report capability, and the `lumtera_can_check_all` filter (default `true`). Lumtera Pro's read-only client role is turned away through that filter.

**Response:** `{ "scanned", "after", "remaining", "done", "skipped", "totals" }`. Call again with the returned `after` until `done` is `true`. `skipped` lists post IDs passed over because their last check crashed PHP and they haven't changed since.

Each call fires `lumtera_bulk_batch_done`. The last batch of a run that started at `after: 0` also fires `lumtera_bulk_scan_done`. See [Hooks & filters](/developers/hooks).

## Whole-page results {#whole-page-results}

Review mode's **Whole page** tab uses these routes. See [Review mode](/review-mode).

**Permission for all three:** signed in, the review capability, and a valid `nonce` from the review panel (action `lumtera_page_results`). A bad or expired nonce returns 403 `lumtera_bad_nonce`. These routes are meant for the review panel, not for scripts.

### POST /page-results {#post-page-results}

Checks a page snapshot from the browser. The content checks run on the snapshot, and the browser's whole-page findings are cleaned and added. The answer gives every finding's source and fingerprint.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `url` | string | Yes | A page on this site, up to 2,048 characters |
| `nonce` | string | Yes | The review panel's nonce |
| `post_id` | int | | The post the page shows. Default 0. |
| `html` | string | | The page snapshot, up to 3 MB (`lumtera_max_page_bytes`) |
| `findings` | object[] | | The audit engine's findings, up to 500 |
| `width` | int | | The browser window's width, 0 to 20,000 |
| `save` | bool | | `true` to store the result for the reports. Default `false`. |

**Extra permission:** when the page shows a post, `edit_post` on that post. An address that shows a different post than `post_id` returns 400 `lumtera_url`.

The result is stored only when all of these are true:

- `save` is `true`.
- **Allow saving whole-page results** is on under <span class="screen-path">Lumtera → Settings → General</span>.
- The person ticked **Save results to reports** in the panel (see [`/page-results/preference`](#post-page-results-preference)).
- The page shows a post the person can edit, or the person has the report capability. A page that shows no post, such as an archive, belongs to everyone.

It shares the 120-per-minute limit of `/check` (429 `lumtera_rate_limited`).

**Response:** `{ "url", "counts", "items", "measured", "dismissed", "stored", "saving": { "enabled", "opted" } }`.

- `items` are content findings. `measured` are the browser's whole-page findings, each with its `index` in `findings` and `dismissed`. `dismissed` lists hidden findings with their `dismissal`.
- Each finding has `fingerprint`, `kind`, `rule`, `title`, `severity`, `confidence`, `message`, `context`, `how_to_fix`, `docs_url`, `wcag`, `wcag_url`, `wcag_name`, `level`, `selector`, `source`, `scope` and `can_dismiss: { "site", "url" }`.

**Errors:** 400 `lumtera_url` (not a page on this site), 403 `lumtera_forbidden`.

### POST /page-results/dismiss {#post-page-results-dismiss}

Dismisses or restores one whole-page finding.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `url` | string | Yes | The page |
| `nonce` | string | Yes | The review panel's nonce |
| `fingerprint` | string | Yes | 32 lowercase hex characters |
| `scope` | `site` or `url` | | Default `site`. `site` hides the finding on every page. Only findings from template-level parts (such as a header) can use `site`. Others are always dismissed on this page only. |
| `note` | string | | Up to 1,000 characters |
| `restore` | bool | | `true` to restore |

**Extra permission, per finding:**

- `site` scope needs the report capability.
- `url` scope needs `edit_post` on the post the page shows. A page that shows no post needs the report capability.
- An **error** also needs the dismiss-errors capability.

The finding and its severity come from this person's last check of the page (kept for an hour) or the stored results, never from the request.

Returns `{ "ok": true, "scope": "site" }`, or `{ "ok": true }` after a restore.

**Errors:** 400 `lumtera_unknown_issue`, 404 `lumtera_not_dismissed`, 403 `lumtera_forbidden`, 400 `lumtera_url`.

### POST /page-results/preference {#post-page-results-preference}

Remembers whether this person saves results to reports. It is off until they tick the box.

| Argument | Type | Required |
| --- | --- | --- |
| `nonce` | string | Yes |
| `save` | bool | Yes |

Returns `{ "save": true, "enabled": true }`. `enabled` is the site setting.

## Manual checklists {#manual-checklists}

Results of the guided checklists for a post. Each item is one WCAG criterion that needs a person, such as `2.4.7`.

**Permission for both routes:** `edit_post`, and the post must be of a content type Lumtera checks.

### /posts/{id}/manual {#posts-id-manual}

`GET` returns the current results, what the page seems to contain, and which items seem not to apply. `POST` records or clears one result.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `test` | string | Yes | A criterion ID from the checklist, such as `2.4.7`. The older test names (`keyboard`, `zoom-reflow`, `text-spacing`, `screen-reader`, `forms`, `media`, `motion-timing`, `hover-focus`, `orientation`) are still accepted and saved to their criteria. |
| `result` | string | Yes | `pass`, `fail`, `na`, or `''` to clear the result |
| `note` | string | | Up to 2,000 characters |
| `failed` | string[] | | With an older test name and `fail`: the criteria that failed. The others are saved as passed. Empty means all failed. Up to 10. |

**Response of GET:**

```json
{
  "results": {
    "2.4.7": { "result": "fail", "note": "Focus is lost in the menu.", "time": 1790000000,
               "userName": "Maya", "date": "September 25, 2026" }
  },
  "summary": { "total": 54, "done": 1, "passed": 0, "failed": 1, "na": 0 },
  "label": "Manual checks: 1 of 54 done, 1 failed",
  "features": {
    "found": { "hasForm": true, "hasVideo": false, "hasAudio": false, "hasCarousel": false, "…": false },
    "source": "content",
    "date": "",
    "suggested": [ "1.2.1", "1.2.2", "2.2.1" ]
  }
}
```

`POST` returns the same without `features`. `suggested` lists items that seem not to apply to this page.

**Error:** 400 `lumtera_manual_invalid`. Saving fires `lumtera_manual_test_saved`. See [Hooks & filters](/developers/hooks).

### POST /posts/{id}/manual/batch {#post-posts-id-manual-batch}

Saves several checklist results at once. The checklist's **Mark as not applicable** action uses it.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `results` | object[] | Yes | 1 to 100 items of `{ "test", "result", "note" }`. `test` must be a criterion ID (older test names are not accepted here). |

Returns the same shape as `POST /posts/{id}/manual`. **Error:** 400 `lumtera_manual_invalid`.

## Fixes and changes {#fixes-and-changes}

The single-issue fix flow: propose a fix, review the before and after, apply it, and undo it if needed. It is free and has no limits. See [Fixing issues](/fixing-issues).

Proposing never changes a page. Applying saves a revision first when the post type keeps revisions. Lumtera Pro's approval policy can narrow who may apply, through the `lumtera_change_allowed` filter.

A change looks like:

```json
{
  "id": 12, "post_id": 42, "post_title": "Order bread online",
  "rule": "image-missing-alt", "rule_title": "Image has no alternative text",
  "fingerprint": "…", "status": "proposed", "origin": "rule", "origin_detail": "…",
  "summary": "…", "where": "…", "before": "<img …>", "after": "<img alt=\"…\" …>",
  "value": "…", "value_kind": "alt", "value_label": "Alt text", "value_help": "…", "value_max": 150,
  "value_source": "rule", "from_library": false, "alternatives": [], "note": "",
  "ai_available": true, "revisions": true, "verify": "", "verify_detail": null,
  "compare_url": "", "edit_url": "…", "target": null
}
```

- `status` is `proposed`, `approved`, `applied`, `rejected`, `stale`, `failed` or `reverted`.
- `target` is `null` for a change to the post itself. For a change to a shared part it holds `type`, `key`, `label`, `type_label`, `menu_item`, `creates` and `notice`, plus rescan progress.

### POST /changes/propose {#post-changes-propose}

Drafts a fix for one issue on a post.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `post_id` | int | Yes | The post |
| `fingerprint` | string | Yes | The issue's fingerprint |
| `value` | string | | Your own text (alt text, link text and so on), up to 1,000 characters |
| `source` | `''`, `rule` or `ai` | | `rule` uses Lumtera's built-in fixer. `ai` asks the connected AI provider for a draft (needs the matching feature on under <span class="screen-path">Lumtera → Settings → AI suggestions</span>). |
| `replaces` | int | | The ID of an earlier proposal this one replaces |
| `rule`, `block` | string | | From the block editor: the check ID and the block's position, such as `0/2` |

**Permission:** `edit_post` on `post_id`. It shares the 120-per-minute limit of `/check` (429 `lumtera_rate_limited`).

Returns the proposed change.

### POST /changes/propose-part {#post-changes-propose-part}

Drafts one fix in the shared part an issue comes from, such as a header template part or a menu. The fix then reaches every page that shows the part.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `part_type` | string | Yes | `content`, `synced_pattern`, `template_part`, `template`, `navigation`, `menu`, `widget`, `theme`, `plugin` or `unknown` |
| `part_key` | string | | The part's key, up to 191 characters |
| `rule` | string | Yes | The check ID |
| `fingerprint` | string | Yes | The issue's fingerprint |
| `value` | string | | Your own text, up to 1,000 characters |
| `source` | `''`, `rule` or `ai` | | As above |

**Permission:** the route needs `edit_posts` or `edit_theme_options`. Then the part itself is checked: `edit_post` on a synced pattern, `edit_theme_options` for everything else. It shares the `/check` rate limit.

**Errors include:** 422 `lumtera_no_fix` (no automatic fix for this check, or a page-structure check), 422 `lumtera_part_unsupported`, 403 `lumtera_forbidden`.

### GET /changes {#get-changes}

Up to 50 changes for a post.

| Argument | Type | Required |
| --- | --- | --- |
| `post_id` | int | Yes |

**Permission:** `edit_post` on `post_id`. Returns an array of changes.

### POST /changes/{id}/apply, /revert, /reject, /rescan {#changes-id-actions}

| Route | What it does |
| --- | --- |
| `/changes/{id}/apply` | Approves a proposed change (the person applying it is the approver) and applies it. Takes an optional `value` (up to 1,000 characters) to edit the text first. |
| `/changes/{id}/revert` | Undoes an applied change |
| `/changes/{id}/reject` | Rejects a proposed change |
| `/changes/{id}/rescan` | For a fix in a shared part: checks the next few pages that show the part again. Returns `{ "id", "total", "done", "failed", "more", "before", "now", "finished" }`. Call again until `finished` is `true`. |

**Permission:** whoever may edit the change's page (`edit_post`) or its shared part (see above). The `lumtera_change_allowed` filter can refuse approve, reject, apply and revert.

Each returns the change. Errors carry the change in `data.change` where there is one.

**Common errors:** 404 `lumtera_change_not_found`, 409 `lumtera_change_state` (the change isn't in a state for that action), 409 `lumtera_stale` (the page changed since the fix was drafted), 403 `lumtera_forbidden` or `lumtera_filtered`, 500 `lumtera_save_failed`.

## AI writing suggestions {#ai-writing-suggestions}

Three routes ask the AI provider connected to WordPress for writing suggestions. Each needs its switch on under <span class="screen-path">Lumtera → Settings → AI suggestions</span> (settings keys `link_text`, `headings` and `summary`) and WordPress's AI Client. See [AI suggestions](/ai).

**Permission:** the feature is switched on, and `edit_post` on the post. The post must exist.

**Rate limit:** 30 AI requests per user in 10 minutes, shared by all AI features, alt text and AI fix drafts included (`lumtera_ai_rate_limit`). Over the limit returns 429 `lumtera_ai_rate_limited`.

All three accept `title` (string): the post title as typed. When it's empty, the saved title is used.

Suggestions are drafts. Nothing is saved. The editor shows them, and the author chooses whether to use one.

### POST /posts/{id}/ai/link-text {#post-ai-link-text}

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `text` | string | Yes | The current link text |
| `href` | string | | The link's address, up to 2,048 characters |
| `html` | string | | The paragraph around the link |
| `rule` | string | | The finding: `link-ambiguous-text` (default), `link-url-as-text` or `link-same-text-different-url` |

**Response:** `{ "suggestions": [ "…" ], "note": "…" }`, with up to three suggestions of at most 90 characters. Suggestions that repeat the current text, or would still fail the link text checks, are removed.

### POST /posts/{id}/ai/headings {#post-ai-headings}

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `mode` | string | Yes | `bold` (turn a bold paragraph into a heading) or `outline` (suggest where subheadings go) |
| `text` | string | For `bold` | The bold paragraph |
| `next` | string | | `bold`: the text that follows it |
| `previous` | string | | `bold`: the heading before it |
| `paragraphs` | string[] | For `outline` | The post's paragraphs, in order. Up to 80 are used. At least 3 must have text. |

**Response for `bold`:** `{ "suggestions": [ "…" ], "note": "…" }`, with up to two suggestions.

**Response for `outline`:** `{ "headings": [ { "index": 3, "text": "…" } ], "note": "…" }`, with up to four headings. `index` is the zero-based position in `paragraphs` that the heading goes before. Headings are at most 80 characters.

### POST /posts/{id}/ai/summary {#post-ai-summary}

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `content` | string | Yes | The post content (HTML or block markup), up to 512 KB. It needs at least 100 words. |

**Response:** `{ "summary": "…", "words": 96, "note": "…" }`. The summary is at most 120 words.

**Errors for all three:** 400 `lumtera_ai_no_input` (nothing to work with), 501 `lumtera_ai_unavailable` or `lumtera_ai_no_model`, 502 `lumtera_ai_failed` or `lumtera_ai_bad_answer`. Each route has a `lumtera_ai_{feature}_pre` filter to answer without the AI Client. See [Hooks & filters](/developers/hooks).

## Images and alt text {#images}

### POST /images/{id} {#post-images-id}

Saves an image's alt text in the Media Library. Also accepts PUT and PATCH.

**Permission:** `edit_post` on the image. `id` must be an image.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `alt` | string | Yes | |
| `source` | `''` or `ai` | | `ai` records that the text began as an AI suggestion, and who accepted it |

**Response:** `{ "id", "alt", "status": "missing|review|ok", "judged", "used", "empty": [ { "id", "title", "editable" } ], "manual": [ … ] }`. `empty` lists posts that show the image without alt text that Lumtera can fill. `manual` lists posts where the alt text has to be added by hand.

### POST /images/{id}/apply {#post-images-id-apply}

Adds the image's alt text to posts that show it without any. Existing alt text is never replaced.

**Permission:** `edit_post` on the image. Each post is skipped unless you can edit it.

**Response:** `{ "updated": [ … ], "skipped": 0, "skipped_reasons": { "permission": 0, "filtered": 0 } }` plus the image state. **Error:** 400 `lumtera_no_alt` if the image has no alt text yet.

### POST /images/{id}/suggest {#post-images-id-suggest}

Asks the connected AI provider for alt text suggestions.

**Permission:** AI alt text suggestions are switched on, and `edit_post` on the image. See [AI suggestions](/ai).

| Argument | Type | Notes |
| --- | --- | --- |
| `post_id` | int | Optional. The post to take context from. It's ignored if you can't read it. |

**Response:** `{ "suggestions": [ "…" ], "decorative": false, "note": "…" }`, with up to three suggestions.

It shares the AI rate limit above. **Errors:** 429 `lumtera_ai_rate_limited`, 400 `lumtera_ai_no_file` (the file can't be read or is over 4 MB), 501 `lumtera_ai_unavailable` or `lumtera_ai_no_model`, 502 `lumtera_ai_failed` or `lumtera_ai_bad_answer`.

## Visitor feedback {#feedback}

### POST /feedback {#post-feedback}

Receives the accessibility feedback form when JavaScript is on. Without JavaScript the same form posts to `admin-post.php` and gets the same checks. See [Accessibility feedback](/feedback).

**Permission:** public. Visitors are not signed in, and the form carries no nonce, so it works in cached pages.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `message` | string | Yes | Up to 5,000 characters |
| `type` | string | Yes | `barrier`, `alternative` or `other` |
| `page_url` | string | | The page the problem is on, a web address up to 2,000 characters |
| `reply_format` | string | | `email` (default), `large_print`, `easy_read`, `audio`, `braille` or `other` |
| `name` | string | | Up to 100 characters |
| `email` | string | | A valid email address |
| `consent` | bool | With `name` or `email` | Permission to store the name and email |
| `lumtera_ts` | string | Yes | The signed time stamp the form prints |
| `lumtera_hp` | string | | The hidden honeypot field. Leave it empty. |

Every field is sanitised. Nothing sent is shown as HTML.

**Spam and abuse checks, in order:**

1. **Honeypot.** If `lumtera_hp` has text, the answer is the usual thank-you and nothing is stored.
2. **Time stamp.** `lumtera_ts` must be signed by the site and at least 3 seconds old. Otherwise the status is `too_fast`.
3. **Rate limit.** Each IP address may send **5 messages per hour** (`lumtera_feedback_rate_limit`; 0 turns it off). IPv6 addresses are counted per /64 network. Only a salted hash of the address is kept. Behind a proxy, return the real visitor address from `lumtera_feedback_client_ip`.
4. **Spam filter.** Akismet runs only if the site owner ticked **Check messages with Akismet** under <span class="screen-path">Lumtera → Settings → Feedback</span>. The `lumtera_feedback_is_spam` filter has the last word. Spam gets the usual thank-you and is not stored.

**Responses:**

| Status | HTTP | Body |
| --- | --- | --- |
| Sent | 201 | `{ "status": "sent", "reference": "…", "message": "…" }` |
| Invalid fields | 400 | `{ "status": "invalid", "errors": { "message": "…", "email": "…" } }` |
| Too fast | 400 | `{ "status": "too_fast", "errors": { "form": "…" } }` |
| Over the limit | 429 | `{ "status": "limited", "errors": { "form": "…" } }` |

`errors` is keyed by field name, or `form` for the whole form. The messages are written to be shown to the visitor.

## Site summary {#site-summary}

### GET /site-summary {#get-site-summary}

A summary of the site for an agency hub, such as the Lumtera Pro [client portfolio](/pro/portfolio). The hub reads it with an Application Password. No page content is included.

**Permission:** the summary capability or the report capability.

**Response (summary version 2):**

```json
{
  "name": "Crumb & Co. Bakery",
  "url": "https://example.com",
  "admin_url": "https://example.com/wp-admin/admin.php?page=lumtera",
  "version": "1.0.0.3",
  "totals": { "content": 18, "scanned": 18, "average": 92, "errors": 8, "warnings": 12,
              "notices": 8, "failing": 4, "unscanned": 0, "passing": 14 },
  "coverage": { "total": 55, "automated": 44, "automated_full": 1, "automated_partial": 43,
                "needs_person": 11, "with_evidence": 35, "complete": false,
                "label": "35 of 55 WCAG 2.2 A/AA criteria have evidence",
                "sentence": "…" },
  "rules": [ { "title": "Form field has no label", "wcag": "4.1.2", "severity": "error", "issues": 3, "posts": 1 } ],
  "worst": [ { "title": "Contact", "errors": 4, "url": "https://example.com/wp-admin/post.php?post=42&action=edit" } ],
  "time": 1790559281,
  "summary_version": 2,
  "statement": { "state": "none", "status": "", "reviewed": "", "review_due": "", "overdue": false },
  "feedback": { "open": 0, "overdue": null, "source": "free" },
  "parts": 3,
  "pro_active": false,
  "can_rescan": true,
  "run_diff": null
}
```

- `version` is the Lumtera plugin version. `summary_version` is the version of this shape. Version 1 had no `summary_version` field.
- Version 2 only **adds** fields: `coverage`, `summary_version`, `statement`, `feedback`, `parts`, `pro_active`, `can_rescan` and `run_diff`. Hubs built for version 1 read the rest as before.
- `coverage` is shown beside the average score, never merged into it. Covering a criterion means a check looks at it, not that the site meets it.
- `rules` lists the five most common checks. `worst` lists up to five **published** items. Drafts and private titles stay on the site.
- `statement.state` is `published`, `draft` or `none`. `review_due` is a year after the last review.
- `feedback.open` counts new and in-progress messages. Without Pro, `overdue` is `null` (unknown, not zero).
- `parts` is the number of shared site parts found. See [Site parts](/site-parts).
- `can_rescan` is `true` when this connection may start a full check with [`POST /bulk`](#post-bulk).

**With Lumtera Pro active on the site,** Pro adds to it:

- `pro_active`: `true` while the license is active.
- `can_report`: the licence is active and the user has `manage_options`, so the hub may call [`POST /reports`](#pro-reports).
- `can_share`: `can_report`, and the plan includes share links (Freelancer and up).
- `feedback.overdue`: the number of overdue messages, and `feedback.source` becomes `pro`.
- `run_diff`: `{ "new", "fixed", "persisting", "at", "since", "version_changed" }` between the last two full checks, or `null`.

Add your own fields with the `lumtera_site_summary` filter. Don't remove or change the type of existing fields. Older hubs rely on them.

## Review request and Pro tips {#prompts}

### POST /prompts/{prompt} {#post-prompts}

Records the current person's answer to the Overview's [review request](/site-report#review-request) or to a [Pro tip](/site-report#pro-tips). It changes only that person's user meta.

| Argument | Type | Notes |
| --- | --- | --- |
| `prompt` (in the path) | string | `review`, or `hint-` plus a tip: `hint-review-page`, `hint-repeated-issue`, `hint-forms`, `hint-pdfs`, `hint-evidence` |
| `do` | string | Required. For `review`: `later` (ask again in 30 days), `never` or `reviewed`. For a tip: `dismiss`. |

Returns what happens now, in words, for example *"Lumtera will ask again in 30 days."* An unknown prompt or answer returns 400 `lumtera_prompt`. The same answers work without JavaScript through `admin-post.php?action=lumtera_prompt`.

## Lumtera Pro routes: `lumtera-pro/v1` {#pro}

<div class="pro-callout">These routes come with Lumtera Pro. Unless a route says otherwise, its permission check also needs an <strong>active license</strong>. Some need a plan: <strong>Freelancer and up</strong> for consistency checks and the client portfolio. Signed-in checks are on every plan, for as many roles as the plan allows. See <a href="/pro/license">License</a>.</div>

| Route | Methods | Permission | Plan |
| --- | --- | --- | --- |
| [`/tasks`](#pro-fix-tracking) | GET, POST | `edit_post` on `post_id` | Every plan |
| [`/tasks/{id}`](#pro-fix-tracking) | POST | `edit_post` on the task's post | Every plan |
| [`/tasks/{id}/history`](#pro-fix-tracking) | GET | `edit_post` on the task's post | Every plan |
| [`/tasks/{id}/issue`](#pro-fix-tracking) | POST | `edit_post` on the task's post + a connected tracker + report capability | Every plan |
| [`/assignees`](#pro-fix-tracking) | GET | `edit_posts` (+ `edit_post` on `post_id` if given) | Every plan |
| [`/ignore`](#pro-ignore-rules) | GET, POST | `manage_options` | Every plan |
| [`/ignore/{id}`](#pro-ignore-rules) | DELETE | `manage_options` | Every plan |
| [`/page-checks`](#pro-page-checks) | POST | report capability | Every plan |
| [`/page-checks/{id}`](#pro-page-checks) | GET, DELETE | report capability | Every plan |
| [`/page-checks/schedule`](#pro-page-checks) | GET, POST, PUT, PATCH | report capability | Every plan |
| [`/page-checks/schedule/run`](#pro-page-checks) | POST | report capability | Every plan |
| [`/documents/scan`](#pro-documents) | POST | report capability | Every plan |
| [`/form-flows`](#pro-form-tests) | GET | report capability | Every plan |
| [`/form-flows/arm`](#pro-form-tests) | POST, DELETE | POST: report capability. DELETE: any signed-in user. | Every plan (POST) |
| [`/form-flows/forms`](#pro-form-tests) | POST | report capability | Every plan |
| [`/form-flows/{id}`](#pro-form-tests) | POST, DELETE | report capability | Every plan |
| [`/role-scans`](#pro-signed-in-checks) | GET, POST | `manage_options` | Every plan (roles per plan) |
| [`/role-scans/pass`](#pro-signed-in-checks) | POST | `manage_options` | Every plan (roles per plan) |
| [`/sessions/{id}/items`](#pro-test-sessions) | POST | report capability | Every plan |
| [`/sessions/{id}/env`](#pro-test-sessions) | POST | report capability | Every plan |
| [`/sessions/{id}/signoff`](#pro-test-sessions) | POST | report capability | Every plan |
| [`/sessions/{id}/reopen`](#pro-test-sessions) | POST | `manage_options` | Every plan |
| [`/consistency/run`](#pro-consistency) | POST | report capability | Freelancer and up |
| [`/remediation/changes`](#pro-fixes-queue) | GET | Propose or approve fixes | Every plan |
| [`/remediation/changes/{id}`](#pro-fixes-queue) | POST | Propose or approve fixes | Every plan |
| [`/remediation/approve`](#pro-fixes-queue) | POST | Approve fixes | Every plan |
| [`/remediation/reject`](#pro-fixes-queue) | POST | Propose or approve fixes | Every plan |
| [`/remediation/apply`](#pro-fixes-queue) | POST | Propose or approve fixes (checked per change) | Every plan |
| [`/remediation/undo`](#pro-fixes-queue) | POST | Propose or approve fixes (checked per change) | Every plan |
| [`/remediation/preview`](#pro-fixes-queue) | GET | Propose or approve fixes | Every plan |
| [`/remediation/propose`](#pro-fixes-queue) | POST | Propose or approve fixes | Every plan |
| [`/remediation/run`](#pro-fixes-queue) | POST | Propose or approve fixes | Every plan |
| [`/remediation/run/cancel`](#pro-fixes-queue) | POST | Propose or approve fixes | Every plan |
| [`/remediation/run/dismiss`](#pro-fixes-queue) | POST | Propose or approve fixes | Every plan |
| [`/portfolio/rescans`](#pro-portfolio) | GET | `manage_options` | Freelancer and up |
| [`/reports`](#pro-reports) | POST | `manage_options` (licence checked in the route) | Every plan; share link Freelancer and up |

### Fix tracking {#pro-fix-tracking}

| Route | Method | Arguments | Permission |
| --- | --- | --- | --- |
| `/tasks` | GET | `post_id` (required) | `edit_post` |
| `/tasks` | POST | `post_id`, `fingerprint` (required); `assignee` (default 0); `note`; `content` (the block editor's content, to find issues not saved yet) | `edit_post`. Assigning someone else needs `edit_others_posts`. |
| `/tasks/{id}` | POST | `status` (`open`, `in_progress`, `fixed`, `wont_fix`), `assignee`, `note` | `edit_post` on the task's post. `wont_fix` on an error needs the dismiss-errors capability. |
| `/tasks/{id}/history` | GET | | `edit_post` on the task's post |
| `/tasks/{id}/issue` | POST | | `edit_post` on the task's post, a connected issue tracker, and the report capability |
| `/assignees` | GET | `post_id` (optional) | `edit_posts`, and `edit_post` on `post_id` when given |

`POST /tasks` finds the issue on the server by its fingerprint: first in the stored results, then by checking the saved post. `rule`, `severity`, `message` and `context` are still accepted from older clients, but ignored.

**Errors:** 404 `lumtera_pro_finding`, 400 `lumtera_pro_assignee` (that person can't edit the post), 403 `lumtera_pro_assign_others`, `lumtera_pro_wont_fix`.

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

`POST /tasks/{id}/issue` creates the task's issue in the connected tracker (GitHub, GitLab, Jira or Linear) and returns the task. A task that already has an issue returns it unchanged. **Errors:** 404 `lumtera_pro_tracker_task`, 400 `lumtera_pro_tracker_none`, 409 `lumtera_pro_tracker_busy` (being created right now), 429 when the tracker asks to wait, and 502 for other tracker errors.

History entries are `{ "action", "detail", "user", "time" }`. `/assignees` returns `[ { "id", "name" } ]`. People with `edit_others_posts` get everyone who can edit posts (and, with `post_id`, can edit that post). Everyone else gets only themselves.

### Ignore rules {#pro-ignore-rules}

Rules that hide a finding on every page.

| Route | Method | Notes |
| --- | --- | --- |
| `/ignore` | GET | Every rule, newest first, including expired ones |
| `/ignore` | POST | Adds a rule. Returns it with HTTP 201. |
| `/ignore/{id}` | DELETE | Removes a rule. Returns `{ "deleted": true, "previous": { … } }`. |

**Permission:** `manage_options` and an active license.

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `rule` | string | Yes | The check ID. Whole-page check IDs are accepted too. |
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

**Errors** (400 unless noted): `lumtera_pro_ignore_rule`, `lumtera_pro_ignore_match`, `lumtera_pro_ignore_value`, `lumtera_pro_ignore_pattern`, `lumtera_pro_ignore_reason`, `lumtera_pro_ignore_expiry`, `lumtera_pro_ignore_full` (500 rules at most), 409 `lumtera_pro_ignore_exists`, and 404 `lumtera_pro_ignore_missing` on delete.

Adding or removing a rule checks the affected posts again in the background. It also records `issue.ignored_globally` or `issue.unignored_globally` in the activity log.

### Page checks {#pro-page-checks}

| Route | Method | Notes |
| --- | --- | --- |
| `/page-checks` | POST | Stores a browser check. See the arguments below. |
| `/page-checks/{id}` | GET, DELETE | Read one result, or remove it. Removing a desktop result also removes the page from scheduled checks. |
| `/page-checks/schedule` | GET, POST, PUT, PATCH | Read or change the schedule |
| `/page-checks/schedule/run` | POST | Runs one batch of scheduled checks now |

**Permission:** the report capability and an active license.

`POST /page-checks` arguments:

| Argument | Type | Notes |
| --- | --- | --- |
| `url` | string | Required. A page of this site, full or relative (`/about/`). |
| `html` | string | Required. The rendered page, up to 6 MB. |
| `title` | string | Up to 300 characters |
| `findings` | object[] | The audit engine's whole-page findings, up to 500 |
| `viewport` | string | `desktop` (default) or `phone`. A page has one stored result per viewport. |
| `role` | string | For a [signed-in check](#pro-signed-in-checks): the role the page was opened as |
| `scan` | string | For a signed-in check: the `scan` ID from `/role-scans/pass` |
| `contrast`, `layout` | array | Sent by earlier versions of the screen. Still accepted. |

A signed-in result is saved only when the person may manage signed-in checks and `scan` matches a pass they made for that page and role. Otherwise the answer is 403 `lumtera_pro_role`.

A result looks like `{ "id", "url", "title", "errors", "warnings", "notices", "score", "checked", "source", "browser", "viewport", "role", "role_label", "issues": [ … ] }`. `source` is `browser` or `scheduled`. `role` is empty for a signed-out check.

**Errors:** 400 `lumtera_pro_url` (not a page on this site).

`POST /page-checks/schedule` arguments:

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `frequency` | string | Yes | `off`, `daily` or `weekly` |
| `templates` | bool | | Include key page templates |
| `sitemap` | bool | | Also check pages from the site's sitemap |
| `list` | string | | Your own list of addresses, one per line, up to 200,000 characters |

`GET` returns the schedule and its state, including `limit`: the plan's pages per scheduled run (Business 25, Freelancer 100, Agency 250, Unlimited 500; `lumtera_pro_limit` filter). Other fields include `pages`, `summary`, `skipped` (list lines left out and why), `running`, `done`, `total`, `last` and `next`.

### Documents {#pro-documents}

`POST /documents/scan` checks PDFs in the Media Library.

| Argument | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | int | 0 | Check one file |
| `after` | int | 0 | Without `id`: the cursor. Pass the `cursor` from the previous response until `done` is `true`. |
| `paged` | int | 1 | Which page of the results table to return at the end |

**Permission:** the report capability and an active license. **Error:** 404 `lumtera_pro_not_found` (not a PDF).

### Form tests {#pro-form-tests}

<div class="pro-callout">Form tests are on every Pro plan. See <a href="/pro/form-tests">Form tests</a>.</div>

The Page checks screen submits a form on a page with test data, while a safety guard stops the submission from doing anything. These routes store the forms found and their results.

**Permission:** the report capability, and a license that includes form tests.

| Route | Method | Notes |
| --- | --- | --- |
| `/form-flows` | GET | Every form found. Returns `{ "forms": [ … ] }`. |
| `/form-flows/arm` | POST | Starts a test: sets a dry-run token for this user in an HttpOnly cookie for 120 seconds. Returns `{ "armed": true, "expires" }`. Error: 403 `lumtera_pro_form_arm`. |
| `/form-flows/arm` | DELETE | Ends a test and removes the cookie. Any signed-in user may call it, since it only removes their own token. Returns `{ "armed": false }`. |
| `/form-flows/forms` | POST | The forms a browser check found on a page. They replace that page's earlier list. |
| `/form-flows/{id}` | POST | Stores one form's test result |
| `/form-flows/{id}` | DELETE | Removes a form from the list |

`POST /form-flows/forms` arguments: `url` (required, a page on this site), `title` (up to 300 characters), `forms` (up to 30). Each form has `key`, `adapter` (`cf7`, `wpforms`, `gravity`, `woo-checkout`, `woo-blocks` or `native`), `name`, `selector`, `required`, `fields` and `skip`.

`POST /form-flows/{id}` arguments:

| Argument | Type | Required | Notes |
| --- | --- | --- | --- |
| `status` | string | Yes | `tested`, `skipped` or `failed` |
| `reason` | string | | Up to 40 characters |
| `findings` | array | | Up to 100 findings |
| `required` | int | | Required fields found, 0 to 500 |
| `errors` | int | | Error messages found, 0 to 500 |

`{id}` is the form's 32-character ID. **Errors:** 400 `lumtera_pro_url`, 404 `lumtera_pro_form_missing`.

### Signed-in checks {#pro-signed-in-checks}

<div class="pro-callout">Signed-in checks are on every plan: 1 role on <strong>Business</strong> and <strong>Freelancer</strong>, any number on <strong>Agency</strong> and <strong>Unlimited</strong> (<code>lumtera_pro_limit</code> feature <code>role_scans</code>). See <a href="/pro/signed-in-checks">Signed-in checks</a>.</div>

Checks pages as a test user of a role, such as a shop customer.

**Permission:** `manage_options` and an active license. The plan's role limit is checked on every call, including each pass.

| Route | Method | Notes |
| --- | --- | --- |
| `/role-scans` | GET | The roles checked, their settings and test users |
| `/role-scans` | POST | Saves every role's settings, then adds or removes one role |
| `/role-scans/pass` | POST | A one-time pass to open one page as a role |

`POST /role-scans` arguments:

| Argument | Type | Notes |
| --- | --- | --- |
| `roles` | object | Keyed by role: `{ "shop": [ … ], "cart": bool, "list": "one address per line", "scheduled": bool }` |
| `add` | string | A role to add. Lumtera creates its test user. Up to 5 roles. |
| `remove` | string | A role to remove, with its test user |

Returns the state plus `notes`. The admin who saves becomes the one scheduled checks run for. Each role's list keeps up to 100 addresses. wp-admin, the login page and addresses that do something when opened are left out. **Errors:** 400 or 500 `lumtera_pro_roles`; 403 `lumtera_pro_role_limit` when adding a role would go over the plan's number of roles.

`POST /role-scans/pass` arguments: `url` and `role` (both required). Returns `{ "url", "scan", "role", "label", "note" }`. Open `url` in a frame within 120 seconds, then send the check to [`POST /page-checks`](#pro-page-checks) with `role` and `scan`. **Errors:** 400 `lumtera_pro_pass_user`, `lumtera_pro_pass_url`.

### Test sessions {#pro-test-sessions}

<div class="pro-callout">Test sessions are on every Pro plan. See <a href="/pro/test-sessions">Test sessions</a>.</div>

Sessions are created on the Test sessions screen. These routes record the testing.

**Permission:** the report capability, and a license that includes evidence. Reopening needs `manage_options`.

| Route | Method | Arguments |
| --- | --- | --- |
| `/sessions/{id}/items` | POST | `criterion` (required, a checklist criterion ID such as `2.1.1`), `result` (required: `pass`, `fail`, `na` or `''`), `note` (up to 2,000 characters), `at` (`{ "browser", "at", "version" }`, each up to 60 characters), `attachments` (up to 10 Media Library IDs) |
| `/sessions/{id}/env` | POST | `browser`, `at` (the assistive technology), `version`: the session's default setup |
| `/sessions/{id}/signoff` | POST | Signs the session off and locks it. At least one item must be done. |
| `/sessions/{id}/reopen` | POST | `reason` (required, up to 500 characters) |

Each returns the session: `{ "items": { "2.1.1": { "result", "note", "tester", "date", "at", "attachments" } }, "counts", "env", "locked", "signoff" }`. A signed-off session refuses changes until it is reopened.

### Consistency {#pro-consistency}

<div class="pro-callout">Consistency checks are on the <strong>Freelancer</strong>, <strong>Agency</strong> and <strong>Unlimited</strong> plans. See <a href="/pro/consistency">Consistency checks</a>.</div>

`POST /consistency/run` compares the stored browser checks across pages: consistent navigation, consistent identification, consistent help and multiple ways to find pages. No arguments.

**Permission:** the report capability, and a plan that includes consistency checks.

Returns `{ "pages", "items", "html" }`: the pages compared, the number of findings, and the screen's updated results.

### Fixes queue {#pro-fixes-queue}

Proposes, approves, applies and undoes fixes in batches. See [Fixes queue](/pro/fixes-queue).

**Permission:** an active license, the fixes table in place, and either capability from <span class="screen-path">Lumtera → Settings → Fix approvals</span>:

- **Propose fixes** (`lumtera_propose_changes`)
- **Approve and apply fixes** (`lumtera_approve_changes`)

Each action also checks every change: the person must be able to edit its page or shared part. Changes on pages they can't edit are never listed. With the approval policy on (Agency and up), nobody can approve their own proposal.

| Route | Method | Arguments | Notes |
| --- | --- | --- | --- |
| `/remediation/changes` | GET | `view` (`waiting`, `approved`, `applied`, `attention`, `closed`; default `waiting`), `page` | 25 per page. Returns `{ "view", "page", "pages", "total", "rows", "counts", "cap", "run", "own" }`. |
| `/remediation/changes/{id}` | POST | `value` (required, up to 1,000 characters) | Edits a proposed change's text |
| `/remediation/approve` | POST | `ids` (up to 500) or `all: true` | Needs **Approve and apply fixes** (403 `lumtera_pro_not_approver`) |
| `/remediation/reject` | POST | `ids` | |
| `/remediation/apply` | POST | `ids` or `all: true` (every approved change) | Starts a background run |
| `/remediation/undo` | POST | `ids` or `all: true` (every applied change) | Starts a background run |
| `/remediation/preview` | GET | See below | How many findings and pages a proposal run would cover |
| `/remediation/propose` | POST | See below | Starts a background proposal run |
| `/remediation/run` | POST | | The current run's progress. It may also advance a run that is late, so it is `POST` only. |
| `/remediation/run/cancel` | POST | | Stops the current run |
| `/remediation/run/dismiss` | POST | | Clears a finished run's message |

The run routes accept `POST` only: reading a run's progress can advance it, and a `GET` must never change anything. To read a run without touching it, use the `run` field of `GET /remediation/changes`. (Earlier builds used `GET /remediation/run` and `DELETE /remediation/run`.)

`/remediation/preview` and `/remediation/propose` take:

| Argument | Type | Notes |
| --- | --- | --- |
| `type` | string | Required. `group` (one issue across pages), `rule` (every finding of a check) or `part` (a shared part) |
| `rule` | string | The check ID. With `part`, empty means every check of the part. |
| `fingerprint` | string | For `group` |
| `part_type`, `part_key` | string | For `part` |

Each run handles up to the plan's fixes per queue run: Business 25, Freelancer 100, Agency 250, Unlimited 500 (`cap` in the responses; `lumtera_pro_limit` filter). `preview` returns `{ "found", "queued", "left", "cap", "pages", "sample", "origin", "part" }`.

**Errors:** 400 `lumtera_pro_none_selected`, 403 `lumtera_pro_not_approver`, 403 `lumtera_pro_batch_none` when a `lumtera_pro_limit` filter gives the plan no queue changes (`-1`).

### Portfolio {#pro-portfolio}

<div class="pro-callout">The client portfolio is on the <strong>Freelancer</strong>, <strong>Agency</strong> and <strong>Unlimited</strong> plans. See <a href="/pro/portfolio">Client portfolio</a>.</div>

`GET /portfolio/rescans` returns the progress of rescans started from the Client portfolio screen, keyed by client site ID: `{ "<site id>": { "name", "status", "text" } }`. `status` is `''`, `queued`, `running`, `done` or `failed`. The screen starts rescans itself. This route only reads progress.

**Permission:** `manage_options`, and a plan that includes the portfolio.

### Reports {#pro-reports}

`POST /reports` runs on a **client site** that has Lumtera Pro. An agency hub calls it to create a report and a share link to put in a client email. See [Client reports](/pro/reports).

**Permission:** `manage_options`. The route itself checks the license: without an active one it returns 403 `lumtera_pro_inactive`.

| Argument | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | string | `''` | Up to 200 characters |
| `client` | string | `''` | Up to 200 characters |
| `intro` | string | `''` | Up to 2,000 characters |
| `include_pages` | bool | `true` | Include the per-page list |
| `share_days` | int | 30 | How long the share link works, 1 to 365 days |

**Limit:** 10 reports per hour per site. Over it returns 429 `lumtera_pro_rate`.

Returns HTTP 201:

```json
{ "id": 318, "title": "…", "created_at": 1790000000,
  "share_url": "https://client.example/…", "expires": 1792592000, "note": "" }
```

Share links need the Freelancer plan or above on the client site. Without it, `share_url` and `expires` are `null` and `note` says which plan is needed. **Error:** 500 `lumtera_pro_report`.

## Related {#related}

- [Hooks & filters](/developers/hooks)
- [Abilities](/developers/abilities): the same actions for AI agents, with human approval
- [WP-CLI](/developers/wp-cli)
- [Data](/developers/data): what Lumtera stores and where
