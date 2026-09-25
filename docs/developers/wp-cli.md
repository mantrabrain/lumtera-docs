---
title: WP-CLI
description: Scan content, check any HTML, and read stored results from the command line with wp lumtera. Includes a check command with exit codes for CI pipelines.
---

# WP-CLI

Lumtera adds a `wp lumtera` command with five subcommands.

| Command | What it does |
| --- | --- |
| [`wp lumtera scan`](#wp-lumtera-scan) | Scans posts and stores the results, exactly as saving them would |
| [`wp lumtera check`](#wp-lumtera-check) | Checks any HTML without storing anything. Exits non-zero when it finds problems. |
| [`wp lumtera stats`](#wp-lumtera-stats) | Site-wide totals and the most frequent problems |
| [`wp lumtera issues`](#wp-lumtera-issues) | Lists every stored open issue |
| [`wp lumtera rules`](#wp-lumtera-rules) | Lists every check with its WCAG criterion and current setting |

## wp lumtera scan

Scans posts and stores the results, exactly as saving them would.

```
wp lumtera scan [<id>...] [--all] [--post_type=<types>] [--status=<statuses>] [--format=<format>]
```

| Option | Description |
| --- | --- |
| `<id>...` | One or more post IDs |
| `--all` | Every post of the content types enabled in Lumtera's settings |
| `--post_type=<types>` | Comma-separated content types. They must be enabled in Lumtera's settings. Implies `--all`. |
| `--status=<statuses>` | Comma-separated statuses. Default: `publish,draft,pending,private,future`. Implies `--all`. |
| `--format=<format>` | `table` (default), `json`, `csv`, or `summary` (totals only) |

```sh
# Scan two posts.
wp lumtera scan 12 34

# Scan everything and print only the totals.
wp lumtera scan --all --format=summary

# Scan published pages and save the results as CSV.
wp lumtera scan --post_type=page --status=publish --format=csv > scan.csv
```

Columns: ID, title, score, errors, warnings, notices. Scans from WP-CLI don't send [Pro alerts](/pro/monitoring). They record the starting point, like a bulk scan from the Overview.

## wp lumtera check

Checks HTML for accessibility problems **without storing anything**. It reads a file, standard input, or a page of this site.

```
wp lumtera check [<file>] [--page=<url>] [--format=<format>] [--fail-on=<severity>]
```

| Option | Description |
| --- | --- |
| `<file>` | Path to an HTML file, or `-` for standard input. Reads standard input when omitted and input is piped. |
| `--page=<url>` | A URL on this site, or a path such as `/about/`. Other hosts are refused. (It's `--page` because `--url` is WP-CLI's global option.) |
| `--format=<format>` | `table` (default) or `json` |
| `--fail-on=<severity>` | `error` (default), `warning`, `notice` or `none` |

Whole documents (with `<html>` or a doctype) are checked as pages. Fragments and block markup are checked as post content. Input is limited to 5 MB.

**Exit codes:**

| Code | Meaning |
| --- | --- |
| `0` | No issues at or above `--fail-on` |
| `1` | At least one issue at or above `--fail-on` |
| `2` | The input couldn't be read, the URL was refused, or an option was invalid |

```sh
# Check a built file.
wp lumtera check build/index.html

# Check a page on this site as JSON.
wp lumtera check --page=/ --format=json

# Fail on anything that needs review, too.
echo '<img src="a.png">' | wp lumtera check - --fail-on=warning
echo $?   # 1
```

JSON output, for a paragraph with a vague link and an icon-only link:

```json
{
  "source": "STDIN",
  "score": 82,
  "counts": { "error": 1, "warning": 1, "notice": 0 },
  "issues": [
    {
      "severity": "error",
      "rule": "link-no-name",
      "title": "Link has no text",
      "wcag": "2.4.4 (A)",
      "message": "The link to /cart shows only an icon with no text alternative. Screen readers announce just \"link\".",
      "context": "<a href=\"/cart\"><svg aria-hidden=\"true\"></svg></a>"
    },
    {
      "severity": "warning",
      "rule": "link-ambiguous-text",
      "title": "Link text is vague",
      "wcag": "2.4.4 (A)",
      "message": "\"Click here\" does not say where the link goes when read out of context.",
      "context": "<a href=\"/more\">Click here</a>"
    }
  ]
}
```

### Use it in CI

Fail a deployment when a key page has an accessibility error:

```yaml
# .github/workflows/a11y.yml (excerpt)
- name: Accessibility check
  run: |
    for page in / /shop/ /contact/; do
      wp lumtera check --page="$page" --path=/var/www/html || exit 1
    done
```

Or check static HTML from any source:

```sh
curl -s https://staging.example.com/ | wp lumtera check -
```

::: tip
`check` reads the page's HTML without running JavaScript or loading CSS, so it can't measure rendered color contrast. Use [review mode](/review-mode#whole-page) or [Pro page checks](/pro/page-checks) for that.
:::

## wp lumtera stats

Shows site-wide totals and the most frequent problems.

```
wp lumtera stats [--top=<number>] [--format=<format>]
```

| Option | Description |
| --- | --- |
| `--top=<number>` | How many checks to list, 0 to 100. Default: 10. |
| `--format=<format>` | `table` (default) or `json` |

```sh
wp lumtera stats
wp lumtera stats --format=json --top=3
```

JSON output: `{ "totals": { … }, "rules": [ { "rule", "title", "wcag", "severity", "issues", "posts" } ] }`.

## wp lumtera issues

Lists every stored open issue. Dismissed issues aren't included.

```
wp lumtera issues [--rule=<id>] [--severity=<severity>] [--post_type=<type>] [--format=<format>]
```

| Option | Description |
| --- | --- |
| `--rule=<id>` | Only this check, for example `image-missing-alt`. See [All checks](/checks). |
| `--severity=<severity>` | `error`, `warning` or `notice` |
| `--post_type=<type>` | Only this content type |
| `--format=<format>` | `table` (default), `csv` or `json`. CSV and JSON stream, so they suit large sites. |

```sh
wp lumtera issues --severity=error
wp lumtera issues --rule=image-missing-alt --post_type=page --format=csv > alt.csv
```

Columns: post_id, title, rule, severity, wcag, message.

## wp lumtera rules

Lists every check with its WCAG criterion and current setting.

```
wp lumtera rules [--format=<format>]
```

`--format` is `table` (default), `csv` or `json`. Columns: id, title, wcag, level, severity, setting. `setting` is `default`, `off`, or the severity the site owner chose instead of the default.

```sh
wp lumtera rules --format=csv > rules.csv
```
