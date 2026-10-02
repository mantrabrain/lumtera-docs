---
title: Site report
description: The Overview with its coverage meter, Get started checklist and weekly home page check, continuing a stopped check, the same issue grouped across pages, the filterable Content report with free CSV export and its Dismissed view, the Accessibility column in your post lists, and the Dashboard widget.
---

# Site report

## Overview

<span class="screen-path">Lumtera → Overview</span> is your site at a glance. By default, editors and administrators can open it. Administrators choose which roles can under <span class="screen-path">Lumtera → Settings → Permissions</span>, in **See reports and check the site**. See [Roles & permissions](/permissions).

![The Overview: score, errors, items to review, content checked, review coverage, a Pro tip and Fix once, clear many](/screenshots/screenshot-3.webp)

### Get started checklist {#get-started-checklist}

A new site shows a **Get started** checklist with seven steps, from checking your content to publishing a statement. Steps Lumtera can see are ticked on their own, and the card updates as soon as a check finishes. See [The getting-started checklist](/quick-start#the-getting-started-checklist) for each step.

**Dismiss** puts the checklist away for you. To bring it back, use **Show the getting-started checklist** under <span class="screen-path">Lumtera → Settings → General</span>. With [Lumtera Pro](/pro/license#first-run-checklist) active, Pro's own first-run checklist takes its place.

### Weekly home page check {#weekly-home-page-check}

When the [weekly home page check](/settings#weekly-home-page-check) is on, the Overview shows its card: the errors and items to review found on your home page and when it was checked, its most common issues, and **Errors at each check** for up to the last eight checks. It has **Open it in review mode**, **Check now** (administrators) and **Next check:** with the date. If a check could not run, the card says why, for example when the host blocks the site from loading its own pages.

### Review request {#review-request}

Once Lumtera has been active for at least a week **and** your site has made real progress with it (10 or more issues fixed, half the errors of your first full check gone, or your accessibility statement published), administrators see one short note on the Overview. It names the progress, asks for a short review on WordPress.org if Lumtera helped, and points to the support forum if something went wrong.

- **Leave a review** opens WordPress.org. Lumtera doesn't ask again.
- **Maybe later** asks again in 30 days.
- **Don't ask again** stops it for good.

Each person answers for themselves. It never asks for a star rating, never shows as a pop-up, and appears only on the Overview. Developers can turn it off with the [`lumtera_ask_for_review`](/developers/hooks#admin-screens) filter.

### Pro tips {#pro-tips}

Without Lumtera Pro, a few screens can show one short line about a Pro feature, at the moment it's relevant, marked **Pro tip**, with a **See the Pro plans** link that opens in a new tab:

| Where | When |
| --- | --- |
| Review mode, **Whole page** tab | After it has checked a page (scheduled checks of key pages) |
| Content report, **By issue** | On a group of 10 or more items with the same issue (the fixes queue) |
| Overview | When your site has forms (form tests), or links to PDFs (PDF checks) |
| Accessibility statement | Once the statement is published (the evidence log) |
| Settings → General, weekly home page check | When the weekly home page check is on (scheduled checks of your other key pages) |
| Settings → Email summary | When the weekly summary is on (alerts soon after new errors) |

At most one shows on a screen. They are never a notice or a pop-up, show no prices, and nothing free is locked. **Hide this tip** (the **×** button) hides that tip for you, for good. They never show once Pro is installed. The weekly email can carry a similar line, which you can [switch off](/email-summary#note-about-lumtera-pro).

### Check all content

Click **Check all content** to check every post, page and product, and your [site parts](/site-parts). Lumtera works in small batches on your own server, so it runs within the time limits of any host, and nothing is sent to an outside service.

- A progress bar shows how far it's got. Keep the tab open. You can carry on working in another tab.
- **Stop** stops after the current batch.
- When it finishes, the progress bar says what was found, for example *"Done — 6 items checked: 2 errors on 2 items, 5 to review."*, with **See what to fix** (or **See what to review**), which takes you to **Needs attention**. The numbers on the Overview update without reloading the page, and screen readers hear the result.
- When some content is already checked, **Check N new items** checks only the rest.
- After the first run, the button says **Check all content again**. Use it after you change settings.

You don't need to re-run it after editing. Posts are checked again each time they're saved.

#### Continue a check that stopped {#continue-a-check-that-stopped}

If a check stops before the end, because you clicked **Stop**, closed the tab or lost the connection, Lumtera remembers where it got to for a day. The Overview then shows **A check did not finish**, for example *"Your last "Check all content" stopped 12 minutes ago after 50 items. 27 are left."* Click **Continue where it stopped** to carry on from there, with the count so far. Starting **Check all content** from the beginning resets it.

#### Items that could not be checked {#items-that-could-not-be-checked}

Very rarely, checking one item stops the server, usually because it runs out of memory or time. Lumtera skips that item and carries on with the rest, and the finish message says how many were skipped. The **Items that could not be checked** card lists them, with a plain reason:

- *The server ran out of memory while checking it.*
- *The server ran out of time while checking it.*
- *The server stopped with an error while checking it.*

These items are **not counted as passing**. Each one is tried again when it is edited, or when you click **Try again**. If it stops the server again, ask your host to raise PHP's memory limit or maximum execution time, or split the page into smaller pages. Administrators also see the server's own error message, which can help your host. The card lists only items you can edit, up to ten, then counts the rest.

### Summary cards

| Card | Shows | Click it to see |
| --- | --- | --- |
| **Average automated score** | The average score across checked content | |
| **Errors** | Total errors, and how many items have them | Items with errors |
| **Needs review** | Items a person should confirm | Items to review |
| **Content checked** | How much content has been checked | Items not checked yet |

Next to them, the **Review coverage** meter shows how many of the 55 WCAG 2.2 A and AA criteria have evidence, how many your automated checks cover, and how many need a person. It is shown beside the score, and never merged into it. See [Review coverage](/scoring#review-coverage).

See [Scores & severities](/scoring) for how these are worked out.

### Theme & templates

When people have saved [whole-page results](/review-mode#save-results-to-reports) from review mode, the **Theme & templates** card lists the issues found in the parts every page shares, such as the header and footer, and on how many pages. Fix each one once, where it comes from.

### Fix once, clear many

When the same problem appears in the same markup on two or more items, the **Fix once, clear many** card lists it, most widespread first, up to five at a time. Each row shows the check, a short piece of the markup and how many items have it.

This usually means the markup comes from your theme, a pattern or a synced block. Fix it there, and every item clears. When Lumtera knows the part it comes from, it offers **Fix at the source**. See [Fix at the source](/fixing-issues#fix-at-the-source). Click a row to see the whole group, or **See the whole report by issue** for all of them. See [Content report, by issue](#by-issue).

The card is hidden when nothing repeats.

### Most common issues

Up to eight checks that fire most often across your site, errors first. Each shows how many items it was found on. Fixing a pattern once often fixes it everywhere. Click a check to see every item that has it.

### Needs attention

The items with the most errors, up to seven. **See all N items with errors** opens the Content report filtered to them.

### What a score cannot tell you

A reminder that automated checks find only part of WCAG, with a five-minute manual checklist. See [What automated testing can't do](/manual-testing).

With [Lumtera Pro](/pro/monitoring), the Overview also shows your **Score history**, and a **Client report** card.

## Content report

<span class="screen-path">Lumtera → Checks → Content</span> lists every checked item, in three tabs: **By page**, **By issue** and **Site parts**, plus **Dismissed** once anything has been dismissed. Beside the tabs, a two-way switch chooses how much you see:

| Choice | Shows |
| --- | --- |
| **All findings** | Every finding, item by item, with issues from site parts inline and the CSV export. |
| **My content only** | Only what is in the content itself. Issues from site parts placed in it are folded away under *"Not in your content — comes from …, owned by site administrators"*. |

Until you choose, it follows what you can do: administrators start on **All findings**, people who can edit the theme start on the **Site parts** tab, and everyone else starts on **My content only**. Your choice is remembered for you. (Before version 1.1, **All findings** was called **Compliance**; old links and saved choices still work.)

People who can't edit other people's posts, such as authors, see only published items and their own, and their totals.

### By page

**By page** lists every checked post and page, worst first: most errors, then most items to review.

Filter by:

- **Search titles**
- **Show**: All checked, With errors, Without errors, Not checked yet, or **Exception claimed** (items tagged with an [ADA Title II exception](/statement#exception-tags))
- **Type**: posts, pages, products and so on
- **Issue**: any single check
- **Severity**: Error, Needs review or Tip
- **Show possible issues**: tips the checks are least sure of. They are hidden by default and never counted in the score.

Each row shows the item's errors, items to review, tips and score, and when it was last checked. If anyone has recorded [guided checklist](/manual-checks) results on it, the row also says how many are done and failed.

Click **Issues** to see each problem inline, with:

- how to fix it, the markup, and a **Learn more** link to the [check](/checks)
- **Why is this flagged?**, with the reason in plain words, and **Report a false positive**
- **Fix without opening**, where Lumtera can fix it: see the change before it is saved, apply it, and undo it. See [Fixing issues](/fixing-issues).
- **Dismiss**, with an optional reason. See [Dismissing issues](/dismissing).
- **Showing again**, when an issue you dismissed before has come back, with the reason. See [Showing again](/dismissing#showing-again).

Click **Check again** (or **Check** for an item not checked yet) to re-check one item.

### By issue {#by-issue}

**By issue** groups the same finding across your content. A finding counts once per item, however many times it appears there. Groups are sorted by how many items they're on, most widespread first, so problems from a shared source rise to the top.

Each group shows:

- the severity, the check and its WCAG criterion
- **On N items**
- where it comes from, when Lumtera knows, for example *"Comes from Footer (template part) — fix it once there"*
- the message and the markup that caused it
- **Show the N items**, which lists the items with a **Check again** button on each. After you fix the shared source, click **Check again** on an item to see **Fixed here** or **Still here**.

A group lists up to 50 items. When there are more, **See every item with "…"** opens the **By page** view filtered to that check.

You can filter this view by **Type**, **Issue** and **Severity**.

### Site parts

The **Site parts** tab lists your template parts, synced patterns, navigation menus, classic menus and widget areas, each checked on its own, with **Check site parts now**. See [Site parts](/site-parts).

### Dismissed {#dismissed}

The **Dismissed (N)** tab lists every finding someone marked as not a problem, in the editor or the classic editor box: the issue, the item, **Dismissed by**, **When** and the **Reason** (or *No reason given*). Dismissed findings are left out of scores and reports. Click **Restore** on a row, or tick several (or **Select all on this page**) and click **Restore selected**, to report them again; Lumtera asks you to confirm first. Restoring needs the same permission as dismissing: for errors, the **Dismiss errors** permission. See [Dismissing issues](/dismissing).

### Export CSV {#export-csv}

**Export CSV** downloads every finding that matches your filters, including **Show possible issues**, so the file matches what you see. It exports only what you are allowed to see. Export is part of the free plugin.

With WP-CLI you can also export from the command line: `wp lumtera issues --format=csv > issues.csv`. See [WP-CLI](/developers/wp-cli).

## The Accessibility column

The Posts, Pages and Products lists (and any other checked content type) get an **Accessibility** column after the title. It shows:

- **Not checked**, **N errors** (red), **N to review** (amber) or **No issues found** (green)
- **Score N**, and when it was last checked

Click the column header to **sort by score**, worst first. Items that haven't been checked always sort last.

## Dashboard widget

The **Lumtera Accessibility** widget on the WordPress Dashboard shows your **Average automated score**, **Errors** and **Needs review**, how many issues were fixed in the last 7 days, the review coverage, the three items with the most errors under **Needs attention**, and how many items have been checked. It appears for the same roles that can open the Overview. Hide it from **Screen Options** if you don't need it.

## Share results

- Get a summary by email each week: see [Weekly email summary](/email-summary).
- Let more roles see the reports: see [Roles & permissions](/permissions).
- Give read-only access to an agency: see the [Lumtera Reporter role](/permissions#lumtera-reporter).
- With Lumtera Pro, send a client a branded report or, from the Growth plan, a share link: see [Client reports](/pro/reports).
