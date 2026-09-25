---
title: Scores & severities
description: How Lumtera works out a score, what Error, Needs review and Tip mean, and how the average score and coverage are calculated.
---

# Scores & severities

## Severities

Every issue Lumtera finds has one of three severities:

| Severity | Meaning | Affects the score? |
| --- | --- | --- |
| <span class="sev sev--error">Error</span> | Lumtera is confident this is a barrier. | Yes, strongly |
| <span class="sev sev--review">Needs review</span> | A machine can't decide this on its own, such as whether alt text is accurate or a video has captions. A person should confirm or dismiss it. | A little |
| <span class="sev sev--tip">Tip</span> | A best practice, including the four WCAG AAA checks. | No |

Lumtera is built not to cry wolf. When it can't be sure, it says **Needs review**, not **Error**. Each check has a default severity, listed in [All checks](/checks). You can change it, or switch the check off, in [Settings](/settings#checks).

## How the score is worked out

Each post, page or product gets a score from 1 to 100:

```
score = 100 × 0.85^errors × 0.96^items to review
```

Rounded, and never lower than 1. Tips and dismissed items don't count.

| Found | Score |
| --- | --- |
| Nothing | 100 |
| 1 item to review | 96 |
| 1 error | 85 |
| 2 errors | 72 |
| 5 errors | 44 |

The score is colored **good** from 90, **warning** from 60 to 89, and **critical** below 60.

Because the penalty multiplies, the score never reaches zero. A page with 20 errors still scores lower than one with 10, and fixing any error always raises the score.

::: warning A score of 100 isn't "compliant"
100 means "no automated issues found". Automated checks find only part of what WCAG covers. See [What automated testing can't do](/manual-testing).
:::

## Site-wide numbers

On the [Overview](/site-report#overview):

- **Average automated score** is the average of the stored scores of every checked item. Published posts count, and so do drafts, pending, private and scheduled ones. Only the content types you chose in Settings are included.
- **Errors** is the total number of errors. "On N items" is how many items have at least one.
- **Needs review** is the total number of items to review.
- **Coverage** is how many items have been checked, out of all items of those types. Trash and auto-drafts aren't counted.

## When scores update

A post's stored score updates whenever it's checked:

- when it's saved (if **Check content on save** is on, which is the default)
- when you run **Check all content**, or **Check** on a row of the Content report
- when an issue on it is dismissed or restored
- when the Alt text manager adds alt text to it
- when you run `wp lumtera scan`

**Changing settings doesn't re-check anything.** After you change a check's severity, run **Check all content again** from the Overview to update existing results.

Live checks in the editor sidebar are never stored. They update as you type, and the stored result updates when you save.
