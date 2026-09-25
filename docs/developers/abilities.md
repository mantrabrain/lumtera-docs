---
title: Abilities API (AI assistants)
description: Lumtera registers its checks with the WordPress Abilities API, so AI assistants connected through the MCP Adapter can check content, check posts, read the site summary and list the checks.
---

# Abilities API

On **WordPress 6.9 and later**, Lumtera registers four abilities with the WordPress Abilities API. An AI assistant connected to your site, for example through the [WordPress MCP Adapter](https://github.com/WordPress/mcp-adapter), can use them to check content before it's published.

Each ability needs the same permission a person would need in wp-admin. They're registered in core's **site** category, shown in the REST API (`show_in_rest`), and marked public for the MCP Adapter (`meta.mcp.public`). None of them are destructive.

| Ability | Does | Permission | Annotations |
| --- | --- | --- | --- |
| `lumtera/check-content` | Checks a piece of HTML or block markup. Nothing is saved. | `edit_posts` | read-only, idempotent |
| `lumtera/check-post` | Checks a post and **stores** the result, like saving it | `edit_post` on that post | idempotent |
| `lumtera/site-summary` | Site-wide totals and the most common issues | Lumtera's report capability: `lumtera_view_reports` by default, given to roles under [Settings → Permissions](/permissions) | read-only, idempotent |
| `lumtera/list-rules` | Every check, with its current severity | `edit_posts` | read-only, idempotent |

The abilities are registered only when WordPress has the Abilities API (`wp_register_ability()`).

To run one through the REST API, call `/wp-abilities/v1/abilities/{name}/run`, for example `/wp-abilities/v1/abilities/lumtera/check-post/run`. WordPress picks the method from the annotations: read-only abilities need `GET`, with the input in the `input` query parameter. `lumtera/check-post` needs `POST`, with `{ "input": { … } }` in the JSON body. Because `check-content` is read-only, its content travels in the URL, so long content can hit URL length limits. For those, use Lumtera's own [`POST /lumtera/v1/check`](/developers/rest-api#post-check) route.

## lumtera/check-content

**Input:**

```json
{ "content": "<!-- wp:paragraph --><p><a href=\"/more\">Click here</a></p><!-- /wp:paragraph -->" }
```

`content` is required, up to 512 KB by default (see `lumtera_max_check_bytes`).

**Output:**

```json
{
  "score": 96,
  "counts": { "error": 0, "warning": 1, "notice": 0 },
  "issues": [
    {
      "rule": "link-ambiguous-text",
      "title": "Link text is vague",
      "severity": "warning",
      "wcag": "2.4.4",
      "level": "A",
      "message": "\"Click here\" does not say where the link goes when read out of context.",
      "how_to_fix": "…",
      "context": "<a href=\"/more\">Click here</a>"
    }
  ]
}
```

## lumtera/check-post

**Input:** `{ "post_id": 42 }`. `post_id` is required and at least 1. Output has the same shape as `check-content`. The saved post is checked as it's stored now, and the result is stored, so reports update and `lumtera_post_scanned` fires. Returns a `lumtera_not_found` error if the post doesn't exist or isn't a content type Lumtera checks.

## lumtera/site-summary

**Input:** none. **Output:** `{ "totals": { … }, "top_issues": [ { "rule", "title", "issues", "posts" } ] }`, with the ten most common checks. `totals` has `content`, `scanned`, `unscanned`, `average`, `errors`, `warnings`, `notices`, `failing` and `passing`, as in [`wp lumtera stats`](/developers/wp-cli#wp-lumtera-stats).

## lumtera/list-rules

**Input:** none. **Output:** an array of `{ "rule", "title", "wcag", "level", "severity" }`, one for every registered check, [custom checks](/developers/custom-checks) included. `severity` is the current setting, which may be `off`.

## Example: asking an assistant

With the MCP Adapter set up, you can ask an assistant things like:

- "Check my draft about opening hours for accessibility problems before I publish it."
- "What are the most common accessibility issues on the site?"
- "Rewrite the vague link text in post 42, then check it again."

The assistant acts as the user it's connected as, so it can only check what that user could check in wp-admin.
