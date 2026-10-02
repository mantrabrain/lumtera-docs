---
title: WP-CLI
description: Scan content and site parts, check any HTML, compare with a baseline, and read stored results from the command line with wp lumtera. Output as tables, CSV, JSON, SARIF or JUnit, with exit codes for CI pipelines.
---

# WP-CLI

Lumtera adds a `wp lumtera` command with five subcommands. Lumtera Pro adds no commands of its own.

| Command | What it does |
| --- | --- |
| [`wp lumtera scan`](#wp-lumtera-scan) | Scans posts, or the site parts every page shares, and stores the results, exactly as saving them would |
| [`wp lumtera check`](#wp-lumtera-check) | Checks any HTML without storing anything. Exits with status 1 when it finds problems. |
| [`wp lumtera stats`](#wp-lumtera-stats) | Site-wide totals and the most frequent problems |
| [`wp lumtera issues`](#wp-lumtera-issues) | Lists every stored open issue |
| [`wp lumtera rules`](#wp-lumtera-rules) | Lists every check with its WCAG criterion and current setting |

`check` and `issues` can write [SARIF and JUnit](#sarif-and-junit) for CI tools, and can compare a run with a [baseline](#baselines) so a build fails only on new issues. See [Accessibility checks in CI](/developers/ci) for complete pipelines.

## wp lumtera scan

Scans posts and stores the results, exactly as saving them would.

```
wp lumtera scan [<id>...] [--all] [--parts] [--post_type=<types>] [--status=<statuses>] [--format=<format>]
```

| Option | Description |
| --- | --- |
| `<id>...` | One or more post IDs |
| `--all` | Every post of the content types enabled in Lumtera's settings |
| `--parts` | Check the [site parts](/site-parts) every page shares instead of posts: template parts, synced patterns, navigation menus and widget areas. Pass it on its own. |
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

# Check the header, footer, menus and other shared site parts.
wp lumtera scan --parts
```

Columns: `ID`, `title`, `score`, `errors`, `warnings`, `notices`. With `table` and `summary`, a progress bar runs and a totals line ends the output. With `json` and `csv`, rows stream as they're scanned and the totals line goes to standard error, so standard output stays machine-readable:

```
Scanned 12 posts. Average score 88. Errors: 8. Needs review: 12. Tips: 5. Posts with errors: 4.
```

Scans from WP-CLI count as a bulk check. They don't send [Pro alerts](/pro/monitoring). They fire `lumtera_bulk_batch_done` once at the end, and a scan of the whole site (`--all`, or `--post_type` / `--status`) also fires `lumtera_bulk_scan_done` with the new site totals. See [Hooks & filters](/developers/hooks#checks-and-scanning).

### Site parts: `--parts`

`wp lumtera scan --parts` checks every site part Lumtera finds (up to 200) and stores what it finds, so issues in a shared header or menu are listed once, against the part, instead of on every page. Parts that no longer exist, such as another theme's template parts or a deleted menu, are forgotten. A part that couldn't be checked this time keeps its earlier findings.

- It can't be combined with post IDs, `--all` or `--post_type`.
- The table output prints a warning for each part that couldn't be checked, a warning when parts were left out over the limit of 200, and then `Success: Checked 9 site parts. Issues found: 4.`
- `--format=json` prints the result as one object: `{ "checked": 9, "issues": 4, "failed": {}, "skipped": 0 }`. `failed` maps each part (`type|key`) to the reason it couldn't be checked.
- When it finishes, it fires `lumtera_parts_scan_done` with the same result. Add a part a plugin prints, or leave one out, with the [`lumtera_scan_site_parts`](/developers/hooks#site-parts) filter.

## wp lumtera check

Checks HTML for accessibility problems **without storing anything**. It reads a file, standard input, or a page of this site.

```
wp lumtera check [<file>] [--page=<url>] [--format=<format>] [--fail-on=<severity>]
  [--baseline=<file>] [--write-baseline=<file>] [--stored] [--rendered=<file>]
```

| Option | Description |
| --- | --- |
| `<file>` | Path to an HTML file, or `-` for standard input. Reads standard input when omitted and input is piped. With `--page`, the file is a saved copy of that page, and nothing is fetched. |
| `--page=<url>` | A URL on this site, or a path such as `/about/`. Other hosts are refused. (It's `--page` because `--url` is WP-CLI's global option.) |
| `--format=<format>` | `table` (default), `json`, `sarif` or `junit` |
| `--fail-on=<severity>` | The lowest severity that makes the command exit with status 1: `error` (default), `warning`, `notice` or `none`. Any other value exits with status 2. |
| `--baseline=<file>` | Leave out findings already in this [baseline](#baselines). Only new ones count towards the exit status. |
| `--write-baseline=<file>` | Record every current finding in this file, to pass as `--baseline` later |
| `--stored` | With `--page` only: also include the last results a browser stored for that URL. See [Adding browser results](#adding-browser-results). |
| `--rendered=<file>` | With `--page` only: also include what a browser measured on that URL, from a `lumtera-rendered/v1` JSON file. See [Adding browser results](#adding-browser-results). |

**What is checked:**

- Whole documents (starting with a doctype or an `<html>` tag) are checked as pages. The `heading-h1-in-content` check is skipped for them, because on a whole page the theme supplies the H1.
- Block markup is rendered first, as on the front end.
- Anything else is checked as an HTML fragment.
- Input is limited to 5 MB.

**How `--page` fetches:** the URL must use `http` or `https` and have the same host and port as the site's home URL. It waits up to 15 seconds and follows up to 3 redirects, each of which must stay on the site. Any status other than 200 is an input error. The request comes from the server WP-CLI runs on, so that server must be able to reach its own site. When it can't (in some containers, for example), save the page yourself and pass the file with `--page` naming which page it is a copy of:

```sh
curl -s http://localhost:8888/pricing/ -o pricing.html
wp lumtera check pricing.html --page=/pricing/
```

**Exit codes:**

| Code | Meaning |
| --- | --- |
| `0` | No issue at or above `--fail-on`, or `--write-baseline` wrote its file |
| `1` | At least one issue at or above `--fail-on` (with `--baseline`: at least one new one) |
| `2` | Lumtera couldn't use the input: the file couldn't be read, input was empty or larger than 5 MB, the URL was refused or didn't return 200, `--fail-on` was invalid, the baseline or rendered file couldn't be read or isn't in the right format, the baseline couldn't be written, or `--stored` / `--rendered` was used without `--page` |

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

Table output lists `severity`, `rule`, `wcag`, `message` and `context`, then a line such as `Score 82. Errors: 1. Needs review: 1. Tips: 0.` With no issues, it prints `Success: No automated issues found.` With `--page`, a note says what the server's HTML can't show. Notes go to standard output with the table and to standard error with every other format, so machine-readable output stays clean.

JSON output, for an image without alt text and a vague link:

```json
{
    "source": "STDIN",
    "score": 82,
    "counts": { "error": 1, "warning": 1, "notice": 0 },
    "issues": [
        {
            "severity": "error",
            "rule": "image-missing-alt",
            "title": "Image has no alternative text",
            "wcag": "1.1.1 (A)",
            "message": "The image \"a.png\" has no alt attribute, so screen readers may read out its file name instead.",
            "context": "<img src=\"a.png\">"
        },
        {
            "severity": "warning",
            "rule": "link-ambiguous-text",
            "title": "Link text is vague",
            "wcag": "2.4.4 (A)",
            "message": "\"Click here\" does not say where the link goes when read out of context.",
            "context": "<a href=\"/x\">Click here</a>"
        }
    ]
}
```

- `source` is `STDIN`, the file path, or the full URL for `--page`.
- `score` and `counts` describe the whole input. With `--baseline`, `issues` lists only the new findings, and a `baseline` object adds the counts: `{ "new": 1, "unchanged": 1, "fixed": 0 }`.

Check static HTML from any source:

```sh
curl -s https://staging.example.com/ | wp lumtera check -
```

::: tip
`check` reads the page's HTML without running JavaScript or loading CSS, so on its own it can't measure rendered color contrast, keyboard focus or layout. Add [browser results](#adding-browser-results), or use [review mode](/review-mode) or [Pro page checks](/pro/page-checks).
:::

### Adding browser results

Some checks need a real browser: contrast from theme styles, keyboard focus, layout and zoom. Two options add them to `check --page`. Both need `--page`, and both are compared with `--baseline` like every other finding. A finding that appears more than once (for example, in both sources) counts once.

**`--stored`** adds the last results a browser stored for that URL: [review mode](/review-mode) with **Save results to reports** ticked, or Lumtera Pro's page checks. When nothing is stored yet, a note says so and the command carries on. Plugins can supply more results through the [`lumtera_cli_stored_page_results`](/developers/hooks#wp-cli) filter.

**`--rendered=<file>`** reads a JSON file of browser measurements in the `lumtera-rendered/v1` format. Each result is matched to `--page` by its path and query, so the file may use another host name for the same site (a container or a tunnel). Results from several screen widths are merged. The findings are worded with this site's messages and settings. A file that isn't in this format exits with status 2.

::: info Coming
The browser runner that writes `lumtera-rendered/v1` files isn't published yet. Until it is, use `--stored` to add what review mode or Pro page checks measured.
:::

## Baselines

An existing site usually has issues nobody can fix this week. A baseline records them, so a CI build fails only when something new appears. Both `check` and `issues` accept `--baseline` and `--write-baseline`.

```sh
# Once: record what is there today, and commit the file.
wp lumtera check --page=/ --write-baseline=.lumtera-baseline.json

# In CI: known issues are left out, and only new ones count towards the exit code.
wp lumtera check --page=/ --baseline=.lumtera-baseline.json
wp lumtera issues --baseline=.lumtera-baseline.json --fail-on=error
```

**The file.** `--write-baseline` writes JSON in the `lumtera-baseline/v1` format, and exits with `0` once the file is written:

```json
{
    "format": "lumtera-baseline/v1",
    "tool": "Lumtera",
    "version": "1.2.1",
    "created": "2026-09-28T01:29:56+00:00",
    "fingerprints": [
        "adfca57ae5eabec4be4ea082a5697481"
    ]
}
```

**Matching.** Each fingerprint is the same key as SARIF's `partialFingerprints` (`lumteraFingerprint/v1`): the check, the offending markup and where it was found (the page URL, the file path, `STDIN`, or the item's permalink for `issues`). Changing the markup or the location makes a finding new, so keep the same file path or `--page` from run to run.

**What `--baseline` accepts.** A file written by `--write-baseline`, or a SARIF log from an earlier `wp lumtera check --format=sarif` or `issues --format=sarif` (results marked `absent` are ignored). Files up to 20 MB are read. A file that can't be read, isn't one of these, or has an entry that isn't a Lumtera fingerprint exits with status `2`, never with an empty baseline that would pass everything.

**The output.**

- **SARIF** keeps every result and marks each one `baselineState`: `new` or `unchanged`.
- **Table, JSON, CSV and JUnit** leave unchanged findings out.
- A summary line reports the comparison: `Against the baseline: 1 new, 1 unchanged (not shown), 0 no longer found.` It goes to standard output with `table` and to standard error with every other format.

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
    "totals": { "content": 18, "scanned": 18, "average": 92, "errors": 8, "warnings": 12,
                "notices": 8, "failing": 4, "unscanned": 0, "passing": 14 },
    "rules": [ { "rule": "form-field-no-label", "title": "Form field has no label", "wcag": "4.1.2 (A)",
                 "severity": "error", "issues": 3, "posts": 1 } ]
}
```

`failing` counts items with at least one error. `passing` counts checked items without errors.

## wp lumtera issues

Lists every stored open issue, from the last check of each item. Dismissed issues, and issues [ignored site-wide](/pro/ignore) in Pro, aren't included. Only items of the content types Lumtera checks, with status `publish`, `draft`, `pending`, `private` or `future`, are listed.

```
wp lumtera issues [--rule=<id>] [--severity=<severity>] [--post_type=<type>] [--format=<format>]
  [--fail-on=<severity>] [--baseline=<file>] [--write-baseline=<file>]
```

| Option | Description |
| --- | --- |
| `--rule=<id>` | Only this check, for example `image-missing-alt`. See [All checks](/checks) or `wp lumtera rules`. |
| `--severity=<severity>` | `error`, `warning` or `notice` |
| `--post_type=<type>` | Only this content type. It must be enabled in Lumtera's settings. |
| `--format=<format>` | `table` (default), `csv`, `json`, `sarif` or `junit`. Every format except `table` streams, so large sites don't run out of memory. |
| `--fail-on=<severity>` | The lowest severity of a listed (new) issue that makes the command exit with status 1: `error`, `warning`, `notice` or `none`. Default: `none`. |
| `--baseline=<file>` | Leave out issues already in this [baseline](#baselines). Only new ones count towards `--fail-on`. |
| `--write-baseline=<file>` | Record every matching issue in this file, to pass as `--baseline` later. Once the file is written the command exits with `0`, whatever `--fail-on` says. |

```sh
wp lumtera issues --severity=error
wp lumtera issues --rule=image-missing-alt --post_type=page --format=csv > alt.csv
wp lumtera issues --format=sarif > lumtera.sarif
wp lumtera issues --baseline=.lumtera-baseline.json --fail-on=error
```

Columns: `post_id`, `title`, `rule`, `severity`, `wcag`, `message`.

By default (`--fail-on=none`), `issues` exits with status 0 whatever it finds. Pass `--fail-on` to fail a build on stored results. It works with every `--format`, including SARIF and JUnit, and with or without `--baseline` (where only new issues count). It exits with status 2 for an invalid `--fail-on` or a baseline that can't be read or written.

## wp lumtera rules

Lists every check with its WCAG criterion and current setting.

```
wp lumtera rules [--format=<format>]
```

`--format` is `table` (default), `csv` or `json`. Columns: `id`, `title`, `wcag`, `level`, `severity`, `setting`. `severity` is the check's default. `setting` is `default`, `off`, or the severity the site owner chose instead under <span class="screen-path">Lumtera → Settings → Checks</span>. `wcag` is the check's main criterion. The [checks list](/checks) shows every criterion a check maps to.

```sh
wp lumtera rules --format=csv > rules.csv
```

## SARIF and JUnit

`wp lumtera check` and `wp lumtera issues` both accept `--format=sarif` and `--format=junit`.

**SARIF** (version 2.1.0) is for GitHub code scanning and other SARIF viewers:

- The tool is named `Lumtera`. Its `rules` list every registered check, with its title, how to fix it, a `helpUri` to the W3C *Understanding WCAG 2.2* page for its main criterion, and tags such as `accessibility`, `wcag111` and `wcag22a`. Checks switched off in the settings are marked `"enabled": false`.
- Each result has a `ruleId`, a `level`, a `message` and one location. `artifactLocation.uri` is the page URL, file path or `STDIN` for `check`, and the item's permalink for `issues`. `region.snippet.text` holds the markup.
- When the markup comes from a [site part](/site-parts) (a template part, a menu, a widget area), the location also has a `logicalLocations` entry naming that part.
- `partialFingerprints` has a `lumteraFingerprint/v1` key built from the issue's fingerprint and its location, so the same issue matches the same alert from one run to the next.
- With `--baseline`, each result has a `baselineState` of `new` or `unchanged`.

| Lumtera severity | SARIF level |
| --- | --- |
| Error | `error` |
| Needs review | `warning` |
| Tip | `note` |

**JUnit XML** is for GitLab, Jenkins, Azure Pipelines, CircleCI and similar tools:

- There is one `<testsuite>` per page (`check`) or per content item (`issues`), and one `<testcase>` per issue.
- Issues at or above `--fail-on` are `<failure>` elements. Other issues are `<skipped>`, with their details in `<system-out>`, so they show up without failing the report. For `issues`, `--fail-on` defaults to `none`, so every issue is listed as skipped unless you pass `--fail-on`.
- A page with no issues gets one passing test case named "No automated issues found". `issues` lists only items that have stored issues.
