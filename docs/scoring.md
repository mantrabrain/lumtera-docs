---
title: Scores & severities
description: How Lumtera works out a score, what Error, Needs review and Tip mean, how sure each finding is, and how the average score and the review coverage meter are calculated.
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

Each finding also has a **confidence**: certain, likely or possible. A check that is only fairly sure can never report an error, and findings of **possible** confidence are hidden until you tick **Show possible issues**. They never count in the score. See [How sure is each check?](/checks#confidence) and [How accurate is Lumtera?](/accuracy).

## How the score is worked out

Each post, page or product gets a score from 1 to 100:

```
score = 100 × 0.85^errors × 0.96^items to review
```

Rounded, and never lower than 1. Tips don't count, and neither do dismissed items or findings ignored everywhere with [Lumtera Pro](/pro/ignore). Results of [guided checklists](/manual-checks) don't change the score either.

A post's score comes from the checks of its content. Whole-page results from [review mode](/review-mode) are shown separately, and never change a post's score.

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
- **Content checked** is how many items have been checked, out of all items of those types. Trash and auto-drafts aren't counted.

## Review coverage {#review-coverage}

Next to the score, the **Review coverage** meter shows how much of WCAG your checks and your own testing cover. It is never merged into the score.

- The headline counts the WCAG 2.2 A and AA criteria that **have evidence**, out of 55. A criterion has evidence when a person recorded a pass or "not applicable" for it in the last 12 months (with no newer failure), or when the checks that cover it found no errors or items to review on your published content.
- The line below says how many criteria your automated checks cover, how many of those fully and how many in part, and how many need a person.

The coverage number is worked out from the checks you have switched on, so it is your site's own number. With every free check on, content checks plus review mode's whole-page checks cover **37 of 55** criteria, fully or in part. The checks of saved content alone cover **25 of 55**. Lumtera Pro's [form tests](/pro/form-tests) bring it to **40 of 55**, and its [consistency checks](/pro/consistency) (Freelancer plan and up) to **44 of 55**.

::: warning Covering is not meeting
A criterion is covered when a check looks at it. That doesn't mean your site meets it. Many criteria are covered only in part: for example, a check can find an image with no alt text, but not whether the alt text is accurate. Use the [guided checklists](/manual-checks) to record the rest.
:::

The meter is full only when every criterion has a recorded result, and even then it says "evidence recorded", never that the site conforms.

## When scores update

A post's stored score updates whenever it's checked:

- when it's saved (if **Check content on save** is on, which is the default)
- when you run **Check all content** from the Overview, or **Check** or **Check again** on an item in the Content report
- when an issue on it is dismissed or restored
- when a [fix](/fixing-issues) is applied or undone
- when a site part it shows is fixed at the source, and Lumtera checks the pages that use it again
- when the Alt text manager adds alt text to it (this saves the post, so it's re-checked if **Check content on save** is on)
- when you run `wp lumtera scan`
- with Lumtera Pro, when the [fixes queue](/pro/fixes-queue) applies or undoes a change

**Changing settings doesn't re-check anything.** After you change a check's severity or switch a check off, run **Check all content again** from the Overview to update existing results.

Live checks in the editor sidebar are never stored. They update as you type, and the stored result updates when you save.
