---
title: How accurate is Lumtera?
description: How well Lumtera's checks find real accessibility problems without false alarms on the 21 W3C ACT rules they cover, measured against the ACT test cases and the W3C Before and After demo, how the test was run, and what no automated checker can find.
---

# How accurate is Lumtera?

An accessibility checker can go wrong in two ways: it can **miss** real problems, or it can raise **false alarms** on things that are fine. We measured both, on test pages whose right answers are already known.

## The results

**On the 21 W3C ACT rules its checks cover, Lumtera reported 130 of 132 known failures (98%) at any severity: 95 as errors and 35 for review, with 4 false alarms in 222 clean examples.**

That result is for those 21 rules only. It is not a score for WCAG as a whole, and it is not a claim that Lumtera finds more than other checkers.

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

## Why "Needs review" isn't a false alarm

When Lumtera is sure, it reports an **Error**. When a person has to decide, it reports **Needs review**. On the passing examples, 14 findings were Needs review and 2 were tips. Those aren't counted as false alarms: they ask a person to look, which is what the [confidence rules](/checks#confidence) are for. For example, a field named only by its placeholder text is Needs review, not an error, because it may be fine for some forms.

## How the test was run

- **Test pages.** 572 test cases for 34 ACT rules, from the W3C's [ACT rules repository](https://github.com/w3c/wcag-act-rules), and the inaccessible and accessible versions of the four pages of the W3C [Before and After Demonstration](https://www.w3.org/WAI/demos/bad/). All were served from a local server.
- **Lumtera, two ways.** Each page was checked by the content checks (the same code as `wp lumtera check`), and by the whole-page checks in headless Chrome, with default settings, the same engine review mode uses. The on-demand keyboard walk and text-spacing test were not part of this run.
- **axe-core** ran on the same pages as a second opinion.
- **Scoring.** Each ACT rule was matched to the Lumtera checks that cover it. A failing example counts as found when one of those checks reports it. A passing example counts as a false alarm only when one of them reports it as an error.

The 13 ACT rules outside Lumtera's checks were run too, so the gaps are on record. Lumtera doesn't claim them. The test cases the benchmark produced are kept as regression tests, so a later change that breaks one fails the build.

## Known limits

These were found in the benchmark and left as they are on purpose:

- **Text inside web components** (shadow DOM) isn't checked for contrast yet. Web components are rare on WordPress sites.
- **Symbols such as "±±±" or a lone "X"** in a Close button can be reported for contrast. WCAG doesn't require contrast for text that isn't in a human language, but telling symbols from words is guesswork, so Lumtera reports them.
- **Focusable links inside hidden content** (`aria-hidden`) can be reported even when a script moves focus away the moment it arrives, because only running the page shows the script.
- **A silent video that plays on its own** can be reported, because whether a file has sound isn't in the page.

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
