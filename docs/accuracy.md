---
title: How accurate is Lumtera?
description: How well Lumtera's checks find real accessibility problems on the W3C ACT test cases, how few false alarms they raise on 529 accessible and real-world pages, how both tests were run, and what no automated checker can find.
---

# How accurate is Lumtera?

An accessibility checker can go wrong in two ways: it can **miss** real problems, or it can raise **false alarms** on things that are fine. We measured both, on test pages whose right answers are already known, in two rounds:

- **September 2026, finding real problems.** The W3C ACT rules test cases and the W3C Before and After demo, on Lumtera 1.0.0.2. See [Known failures found](#known-failures-found).
- **October 2026, false alarms on accessible pages.** 529 pages that meet WCAG 2.2 AA or nearly so, plus all 1,209 ACT test cases, before and after the fixes in Lumtera 1.2.2. See [False alarms on accessible pages](#false-alarms).

Both are our own tests, not independent audits, and neither is a score for WCAG as a whole.

## False alarms on accessible pages {#false-alarms}

**On 529 accessible and real-world pages, the fixes in Lumtera 1.2.2 took the errors we judged to be false alarms from 194 to none in review mode, without losing any known failure in the ACT test cases.**

An **error** on a page that meets WCAG is a false alarm. **Needs review** isn't counted as one, because it asks a person to decide, but it should be rare on a good page, so it's counted too. "Before" is Lumtera 1.2.1; "after" is the same code with the fixes, released in 1.2.2.

| On the 529 accessible and real-world pages | Before (1.2.1) | After (1.2.2) |
| --- | --- | --- |
| Errors, every engine | 384 | 190 |
| … of which false alarms, after checking each by hand | **194** | **0 in review mode**; 8 in the editor's check of raw content (below) |
| … of which real problems in the pages | 190 | 190 |
| Needs review, whole-page checks (review mode, keyboard and widget tests, Pro's page checks) | 1,275 | 592 |

| On the 1,209 W3C ACT test cases | Before (1.2.1) | After (1.2.2) |
| --- | --- | --- |
| Passing or inapplicable examples reported as an error by the matching check | 7 of 496 | **1 of 496** |
| Known failures found, at any severity | 177 of 259 | **177 of 259** (unchanged) |
| Known failures found as an error | 98 of 259 | 96 of 259 |

The two known failures that moved from an error to Needs review did so on purpose: they are videos that play on their own without **Muted**, and whether a video has a sound track isn't in the page.

Each of the 190 errors left was checked by hand and is a real problem in the page as published: in-page links in the GOV.UK component examples that point at targets the example doesn't contain, frames without a title and links to missing targets in the W3C pattern examples, and, in Twenty Twenty-Four, a Cover image output as an unnamed image and a core pattern with dark link text on a black band.

The 8 remaining false alarms are in two W3C pattern examples whose script names a button and hides a field after the page loads. The editor's check reads the saved markup, so it can't see that. Review mode checks the page as the browser shows it, and reports nothing there.

**What changed to get there.** Every fix lowers a check's certainty where the page can't decide it. None raises it:

- Content inside `<noscript>` and `<template>`, and `inert` content, is no longer checked: visitors with scripts on never see it.
- Focus guards from focus-trap scripts, and slides, drawers and menus that CSS may hide, are Needs review instead of errors in the content check. See [Hidden element can still be focused](/checks#aria-hidden-focusable).
- Symbols and one-letter icons are measured at 3:1 and are Needs review. See [Text color has low contrast](/checks#color-contrast).
- An autoplaying video without **Muted**, an Image block with empty alt text, and a dialog with no name are Needs review. More than one H1 is a tip.
- The whole-page checks read modern CSS colors (`color-mix()`, `oklch()`, `lab()`), overlays, collapsed panels and custom focus styles, report landmarks only when they share a name, and recognise skip links by their words or target.

Each false alarm became a regression test that fails on the old code, so it stays fixed.

### How the false-alarm test was run

- **Pages.** All 1,209 ACT test cases; 76 WAI-ARIA Authoring Practices examples; 248 GOV.UK Design System component examples; WordPress 7.1 with Twenty Twenty-Five (116 pages, including one for every pattern) and Twenty Twenty-Four (73); 7 WooCommerce pages; and 9 hand-written accessible pages covering names, images, forms, contrast, hidden content, right-to-left and East Asian languages, links, media, widgets and tables.
- **Every engine on every page.** The content checks (the same code as `wp lumtera check` and the editor's check), review mode's whole-page checks, the on-demand keyboard and widget tests, and Lumtera Pro's page-check measures, in Chrome, with the network blocked so each run saw the same pages.
- **Triage.** Every error on an accessible page, and every error on a passing ACT example, was looked at by hand and judged a real problem, a false alarm or a quirk of the test page.

## Known failures found {#known-failures-found}

**On the 21 W3C ACT rules its checks cover, Lumtera reported 130 of 132 known failures (98%) at any severity: 95 as errors and 35 for review, with 4 false alarms in 222 clean examples.**

That result is for those 21 rules only, measured on Lumtera 1.0.0.2. It is not a score for WCAG as a whole, and it is not a claim that Lumtera finds more than other checkers. The October round, scored on all the ACT test cases, found the same number of known failures before and after its fixes, so they cut false alarms without losing detections.

| On the 21 covered ACT rules | Lumtera 1.0.0.2 (measured; test cases now run on every build) | Before the fixes |
| --- | --- | --- |
| Known failures reported, at any severity | **130 of 132 (98%)** | 101 of 132 (77%) |
| … reported as an error | 95 of 132 | 72 of 132 |
| … reported for review (**Needs review**) | 35 of 132 | — |
| Clean examples reported as an error (false alarms) | **4 of 222** | 23 of 222 |

On the **W3C "Before and After" demo** site, each inaccessible page gets between 33 and 45 Lumtera errors, all of them real barriers, and the four accessible pages get **no errors**.

The fixes this measurement led to shipped in Lumtera 1.0.0.2, including the new [Autocomplete value is not valid](/checks#input-autocomplete-invalid) check. See the [changelog](/changelog).

### Compared with axe-core {#compared-with-axe-core}

We also ran axe-core, a widely used open-source checker, on the same pages as a second opinion. On the same 132 known failures, axe-core found 105 as violations. Lumtera's 130 includes 35 findings it reports for review rather than as errors, so the two numbers don't measure the same thing. And the 21 rules are the ones Lumtera's checks cover: **across all 34 rules tested, including those outside Lumtera's checks, axe-core found more failures than Lumtera.** The two tools are built for different jobs, and neither replaces testing by a person.

### How this test was run

- **Test pages.** 572 test cases for 34 ACT rules, from the W3C's [ACT rules repository](https://github.com/w3c/wcag-act-rules), and the inaccessible and accessible versions of the four pages of the W3C [Before and After Demonstration](https://www.w3.org/WAI/demos/bad/). All were served from a local server.
- **Lumtera, two ways.** Each page was checked by the content checks (the same code as `wp lumtera check`), and by the whole-page checks in headless Chrome, with default settings, the same engine review mode uses. The on-demand keyboard walk and text-spacing test were not part of this run.
- **axe-core** ran on the same pages as a second opinion.
- **Scoring.** Each ACT rule was matched to the Lumtera checks that cover it. A failing example counts as found when one of those checks reports it. A passing example counts as a false alarm only when one of them reports it as an error.

The 13 ACT rules outside Lumtera's checks were run too, so the gaps are on record. Lumtera doesn't claim them. The test cases the benchmark produced are kept as regression tests, so a later change that breaks one fails the build.

## Why "Needs review" isn't a false alarm

When Lumtera is sure, it reports an **Error**. When a person has to decide, it reports **Needs review**. Those aren't counted as false alarms: they ask a person to look, which is what the [confidence rules](/checks#confidence) are for. For example, a field named only by its placeholder text is Needs review, not an error, because it may be fine for some forms.

## Known limits

These are left as they are on purpose, or not solved yet:

- **Text inside web components** (shadow DOM) isn't checked for contrast yet. Web components are rare on WordPress sites.
- **Changes a script makes after the page loads**, such as a name it adds or a field it hides, can't be seen by the editor's check of saved content. Review mode checks the page as the browser shows it.
- **How long an autoplaying clip plays** isn't in the page, so a short clip near the end of a long file can still be reported.
- **Focus guards, hidden slides, symbols and silent autoplaying videos** are reported as Needs review rather than not at all, because only running the page, or hearing it, shows whether they are a problem.

## What no automated checker can find

Some WCAG failures need a person, or need the page to be used over time. Lumtera lists them as [guided checklist](/manual-checks) items instead. For example:

- whether alt text, captions and transcripts are **right**, not just present
- whether reading order, focus order, headings and link text **make sense**
- meaning carried only by layout, color, shape or sound
- keyboard traps and focus handling that depend on scripts
- whether error messages say what went wrong and how to fix it
- timing, motion and flashing in context
- whether navigation stays consistent across pages (Lumtera Pro's [consistency checks](/pro/consistency) compare the pages you check)

With review mode's whole-page checks, Lumtera's automated checks cover **37 of 55** WCAG 2.2 A and AA criteria, fully or in part. Covering a criterion means a check looks at it, not that your site meets it. See [What automated testing can't do](/manual-testing).

::: tip Found a false alarm?
Every finding has **Why is this flagged?** and **Report a false positive**, which opens a report in the WordPress.org support forum with the details filled in. Nothing is sent from your site until you post it.
:::
