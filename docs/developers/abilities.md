---
title: Abilities API (AI assistants)
description: Lumtera registers its checks with the WordPress Abilities API, so AI assistants connected through the MCP Adapter can check content, check posts, read the site summary and list the checks.
---

# Abilities API

On **WordPress 6.9 and later**, Lumtera registers four abilities with the WordPress Abilities API. An AI assistant connected to your site, for example through the [WordPress MCP Adapter](https://github.com/WordPress/mcp-adapter), can use them to check content before it's published.

Each ability needs the same permission a person would need in wp-admin. They're registered in core's **site** category, shown in the REST API (`show_in_rest`), and marked public for the MCP Adapter (`meta.mcp.public`). None of them are destructive.

| Ability | Does | Permission |
| --- | --- | --- |
| `lumtera/check-content` | Checks a piece of HTML or block markup. Nothing is saved. | `edit_posts` |
| `lumtera/check-post` | Checks a post and **stores** the result, like saving it | `edit_post` on that post |
| `lumtera/site-summary` | Site-wide totals and the most common issues | Lumtera's report capability (editors and administrators) |
| `lumtera/list-rules` | Every check, with its current severity | `edit_posts` |

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

**Input:** `{ "post_id": 42 }`. Output has the same shape as `check-content`. The result is stored, so reports update. Returns a `lumtera_not_found` error if the post doesn't exist or isn't a content type Lumtera checks.

## lumtera/site-summary

**Input:** none. **Output:** `{ "totals": { … }, "top_issues": [ { "rule", "title", "issues", "posts" } ] }`, with the ten most common issues.

## lumtera/list-rules

**Input:** none. **Output:** an array of `{ "rule", "title", "wcag", "level", "severity" }`. `severity` is the current setting, which may be `off`.

## Example: asking an assistant

With the MCP Adapter set up, you can ask an assistant things like:

- "Check my draft about opening hours for accessibility problems before I publish it."
- "What are the most common accessibility issues on the site?"
- "Rewrite the vague link text in post 42, then check it again."

The assistant acts as the user it's connected as, so it can only check what that user could check in wp-admin.
