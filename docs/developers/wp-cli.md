---
title: WP-CLI
description: Scan content, check any HTML, and read stored results from the command line with wp lumtera. Output as tables, CSV, JSON, SARIF or JUnit, with exit codes for CI pipelines.
---

# WP-CLI

Lumtera adds a `wp lumtera` command with five subcommands.

| Command | What it does |
| --- | --- |
| [`wp lumtera scan`](#wp-lumtera-scan) | Scans posts and stores the results, exactly as saving them would |
| [`wp lumtera check`](#wp-lumtera-check) | Checks any HTML without storing anything. Exits with status 1 when it finds problems. |
| [`wp lumtera stats`](#wp-lumtera-stats) | Site-wide totals and the most frequent problems |
| [`wp lumtera issues`](#wp-lumtera-issues) | Lists every stored open issue |
| [`wp lumtera rules`](#wp-lumtera-rules) | Lists every check with its WCAG criterion and current setting |

`check` and `issues` can write [SARIF and JUnit](#sarif-and-junit) for CI tools. See [Accessibility checks in CI](/developers/ci) for complete pipelines.

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
| `--status=<statuses>` | Comma-separated statuses from `publish`, `draft`, `pending`, `private` and `future`. Default: all five. Implies `--all`. |
| `--format=<format>` | `table` (default), `json`, `csv`, or `summary` (totals only) |

Pass either post IDs or `--all`, not both. IDs that aren't posts are skipped with a warning. So are posts of a content type Lumtera doesn't check, and posts with another status (for example `trash`).

```sh
# Scan two posts.
wp lumtera scan 12 34

# Scan everything and print only the totals.
wp lumtera scan --all --format=summary

# Scan published pages and save the results as CSV.
wp lumtera scan --post_type=page --status=publish --format=csv > scan.csv
```

Columns: `ID`, `title`, `score`, `errors`, `warnings`, `notices`. With `table` and `summary`, a progress bar runs and a totals line ends the output. With `json` and `csv`, rows stream as they're scanned and the totals line goes to standard error, so standard output stays machine-readable:

```
Scanned 12 posts. Average score 88. Errors: 8. Needs review: 12. Tips: 5. Posts with errors: 4.
```

Scans from WP-CLI count as a bulk check: they don't send [Pro alerts](/pro/monitoring), and they fire `lumtera_bulk_batch_done` once at the end. See [Hooks & filters](/developers/hooks#checks-and-scanning).

## wp lumtera check

Checks HTML for accessibility problems **without storing anything**. It reads a file, standard input, or a page of this site.

```
wp lumtera check [<file>] [--page=<url>] [--format=<format>] [--fail-on=<severity>]
```

| Option | Description |
| --- | --- |
| `<file>` | Path to an HTML file, or `-` for standard input. Reads standard input when omitted and input is piped. |
| `--page=<url>` | A URL on this site, or a path such as `/about/`. Other hosts are refused. (It's `--page` because `--url` is WP-CLI's global option.) |
| `--format=<format>` | `table` (default), `json`, `sarif` or `junit` |
| `--fail-on=<severity>` | The lowest severity that makes the command exit with status 1: `error` (default), `warning`, `notice` or `none` |

Pass either a file or `--page`, not both.

**What is checked:**

- Whole documents (starting with a doctype or an `<html>` tag) are checked as pages. The `heading-h1-in-content` check is skipped for them, because on a whole page the theme supplies the H1.
- Block markup is rendered first, as on the front end.
- Anything else is checked as an HTML fragment.
- Input is limited to 5 MB.

**How `--page` fetches:** the URL must use `http` or `https` and have the same host and port as the site's home URL. It waits up to 15 seconds and follows up to 3 redirects, each of which must stay on the site. Any status other than 200 is an input error. The request comes from the server WP-CLI runs on, so that server must be able to reach its own site.

**Exit codes:**

| Code | Meaning |
| --- | --- |
| `0` | No issue at or above `--fail-on` |
| `1` | At least one issue at or above `--fail-on` |
| `2` | Lumtera couldn't use the input: the file couldn't be read, input was empty or larger than 5 MB, the URL was refused or didn't return 200, or `--fail-on` was invalid |

The exit code doesn't depend on `--format`. WP-CLI rejects an unknown `--format` value itself, with exit code 1.

```sh
# Check a built file.
wp lumtera check build/index.html

# Check a page on this site as JSON.
wp lumtera check --page=/ --format=json

# Fail on anything that needs review, too.
echo '<img src="a.png">' | wp lumtera check - --fail-on=warning
echo $?   # 1
```

Table output lists `severity`, `rule`, `wcag`, `message` and `context`, then a line such as `Score 82. Errors: 1. Needs review: 1. Tips: 0.` With no issues, it prints `Success: No automated issues found.`

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

`source` is `STDIN`, the file path, or the full URL for `--page`.

Check static HTML from any source:

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

JSON output:

```json
{
    "totals": { "content": 12, "scanned": 12, "average": 88, "errors": 8, "warnings": 12,
                "notices": 5, "failing": 4, "unscanned": 0, "passing": 8 },
    "rules": [ { "rule": "form-field-no-label", "title": "Form field has no label", "wcag": "4.1.2 (A)",
                 "severity": "error", "issues": 3, "posts": 1 } ]
}
```

`failing` counts items with at least one error. `passing` counts checked items without errors.

## wp lumtera issues

Lists every stored open issue, from the last check of each item. Dismissed issues, and issues [ignored site-wide](/pro/ignore) in Pro, aren't included. Only items of the content types Lumtera checks, with status `publish`, `draft`, `pending`, `private` or `future`, are listed.

```
wp lumtera issues [--rule=<id>] [--severity=<severity>] [--post_type=<type>] [--format=<format>]
```

| Option | Description |
| --- | --- |
| `--rule=<id>` | Only this check, for example `image-missing-alt`. See [All checks](/checks) or `wp lumtera rules`. |
| `--severity=<severity>` | `error`, `warning` or `notice` |
| `--post_type=<type>` | Only this content type. It must be enabled in Lumtera's settings. |
| `--format=<format>` | `table` (default), `csv`, `json`, `sarif` or `junit`. Every format except `table` streams, so large sites don't run out of memory. |

```sh
wp lumtera issues --severity=error
wp lumtera issues --rule=image-missing-alt --post_type=page --format=csv > alt.csv
wp lumtera issues --format=sarif > lumtera.sarif
```

Columns: `post_id`, `title`, `rule`, `severity`, `wcag`, `message`.

`issues` always exits with status 0 when its options are valid. It reads results, so it never fails a build because of what it finds. Use [`check`](#wp-lumtera-check) for that.

## wp lumtera rules

Lists every check with its WCAG criterion and current setting.

```
wp lumtera rules [--format=<format>]
```

`--format` is `table` (default), `csv` or `json`. Columns: `id`, `title`, `wcag`, `level`, `severity`, `setting`. `severity` is the check's default. `setting` is `default`, `off`, or the severity the site owner chose instead under <span class="screen-path">Settings → Checks</span>.

```sh
wp lumtera rules --format=csv > rules.csv
```

## SARIF and JUnit

`wp lumtera check` and `wp lumtera issues` both accept `--format=sarif` and `--format=junit`.

**SARIF** (version 2.1.0) is for GitHub code scanning and other SARIF viewers:

- The tool is named `Lumtera`. Its `rules` list every registered check, with its title, how to fix it, a `helpUri` to the W3C *Understanding WCAG 2.2* page for its criterion, and tags such as `accessibility`, `wcag111` and `wcag22a`. Checks switched off in the settings are marked `"enabled": false`.
- Each result has a `ruleId`, a `level`, a `message` and one location. `artifactLocation.uri` is the page URL, file path or `STDIN` for `check`, and the item's permalink for `issues`. `region.snippet.text` holds the markup.
- `partialFingerprints` has a `lumteraFingerprint/v1` key built from the issue's fingerprint and its location, so the same issue matches the same alert from one run to the next.

| Lumtera severity | SARIF level |
| --- | --- |
| Error | `error` |
| Needs review | `warning` |
| Tip | `note` |

**JUnit XML** is for GitLab, Jenkins, Azure Pipelines, CircleCI and similar tools:

- There is one `<testsuite>` per page (`check`) or per content item (`issues`), and one `<testcase>` per issue.
- Issues at or above `--fail-on` are `<failure>` elements. For `issues`, that's errors only. Other issues are `<skipped>`, with their details in `<system-out>`, so they show up without failing the report.
- A page with no issues gets one passing test case named "No automated issues found". `issues` lists only items that have stored issues.
