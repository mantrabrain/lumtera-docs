---
title: Site report
description: The Overview, the filterable Content report, the Accessibility column in your post lists, and the Dashboard widget.
---

# Site report

## Overview

<span class="screen-path">Accessibility → Overview</span> is your site at a glance. Editors and administrators can open it.

![The Accessibility overview](/screenshots/screenshot-3.webp)

### Check all content

Click **Check all content** to check every post, page and product. Lumtera works in small batches on your own server, so it runs within the time limits of any host, and nothing is sent to an outside service.

- A progress bar shows how far it's got. Keep the tab open. You can carry on working in another tab.
- **Stop** stops after the current batch.
- When some content is already checked, **Check N new items** checks only the rest.
- After the first run, the button says **Check all content again**. Use it after you change settings.

You don't need to re-run it after editing. Posts are checked again each time they're saved.

### Summary cards

| Card | Shows | Click it to see |
| --- | --- | --- |
| **Average automated score** | The average score across checked content | |
| **Errors** | Total errors, and how many items have them | Items with errors |
| **Needs review** | Items a person should confirm | Items to review |
| **Coverage** | How much content has been checked | Items not checked yet |

See [Scores & severities](/scoring) for how these are worked out.

### Most common issues

The eight checks that fire most often across your site, errors first. Fixing a pattern once often fixes it everywhere. Click a check to see every item that has it.

### Needs attention

The items with the most errors. **See all N items with errors** opens the Content report filtered to them.

### What a score cannot tell you

A reminder that automated checks find only part of WCAG, with a five-minute manual checklist. See [What automated testing can't do](/manual-testing).

With [Lumtera Pro](/pro/monitoring), the Overview also shows your **score history**.

## Content report

<span class="screen-path">Accessibility → Content</span> lists every checked post and page, worst first.

Filter by:

- **Search titles**
- **Show**: All checked, With errors, Without errors, or Not checked yet
- **Type**: posts, pages, products and so on
- **Issue**: any single check
- **Severity**: Error, Needs review or Tip

Each row shows the item's errors, items to review, tips and score. Click **Issues** to see each problem inline, with how to fix it and the markup. Click **Check again** to re-check one item. To fix or dismiss an issue, open the item in its editor.

### Export

- **With Lumtera Pro:** **Export CSV** downloads every finding matching your filters. See [Client reports](/pro/reports#export-findings-to-csv).
- **Free:** use WP-CLI: `wp lumtera issues --format=csv > issues.csv`. See [WP-CLI](/developers/wp-cli#wp-lumtera-issues).

## The Accessibility column

The Posts, Pages and Products lists (and any other checked content type) get an **Accessibility** column after the title. It shows:

- **Not checked**, **N errors** (red), **N to review** (amber) or **No issues found** (green)
- the score, and when it was last checked

Click the column header to **sort by score**, worst first. Items that haven't been checked always sort last.

## Dashboard widget

The **Accessibility** widget on the WordPress Dashboard shows your average score, errors and items to review, and the three items with the most errors. Hide it from **Screen Options** if you don't need it.

## Share results

- Give read-only access to an agency: see the [Lumtera Reporter role](/permissions#lumtera-reporter).
- Send a client a branded report: see [Client reports](/pro/reports) in Pro.
