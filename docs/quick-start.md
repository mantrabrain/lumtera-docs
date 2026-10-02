---
title: Quick start
description: Go from a fresh install to a checked site in about 15 minutes. The getting-started checklist, checking your content and site parts, fixing the most common issues with undo, checking a live page with the keyboard, the weekly email, and publishing a statement and feedback form.
---

# Quick start

This walkthrough takes you from a fresh install to a checked site, with the biggest problems fixed, in about 15 minutes. The **Get started** checklist on the Overview follows the same steps.

## The getting-started checklist {#the-getting-started-checklist}

![The Get started checklist on the Overview, with seven steps and the one-click weekly email](/screenshots/getting-started.webp)

<span class="screen-path">Lumtera → Overview</span> opens with **Get started**, seven steps with a count such as *"2 of 7 steps done."* Steps Lumtera can see tick themselves off, and the card updates right after a check finishes. For the others, click **Mark done** (or **Not done yet** to undo it).

| Step | What it does | Ticks itself off when |
| --- | --- | --- |
| **Check all your content** | Runs the checks on every post and page, on your own server | Content has been checked |
| **Try review mode on your home page** | **Open review mode** opens your home page in [review mode](/review-mode). Without a static home page, the step is **Try review mode on a page** and opens the page with the most errors. | A whole-page check of that page is saved |
| **Get the weekly email** | **Send me the weekly email** turns on the [weekly email](/email-summary) to the address shown, in one click. **Also check my home page every week** (ticked) turns on the [weekly home page check](/settings#weekly-home-page-check) at the same time. | The weekly email is on |
| **Check your site parts** | Headers, footers, menus and patterns: fix a problem once there. **Open Site parts** opens the [Site parts](/site-parts) tab of the Content report. | Every site part has been checked |
| **Turn on the baseline fixes** | A skip link, a visible focus outline and pinch zoom on phones. See [Site fixes](/site-fixes). | All three are on |
| **Test your home page by hand** | Keyboard only, zoom to 200% and a screen reader. See [Manual testing](/manual-testing). | Guided checklist results are recorded on your static home page |
| **Create your statement and feedback form** | See [Accessibility statement](/statement) | The statement is published and links to a feedback form |

When every step is done, the card says *"Every step is done. Keep testing by hand as your site changes."* **Dismiss** hides it for you; **Show the getting-started checklist** under <span class="screen-path">Lumtera → Settings → General</span> brings it back. With Lumtera Pro active, the weekly email step is left out (Pro sends its own weekly digest), and after you activate a license, [Pro's first-run checklist](/pro/license#first-run-checklist) replaces this one.

## 1. Check everything you've published

Go to <span class="screen-path">Lumtera → Overview</span> and click **Check all content**. Lumtera checks your posts, pages and products, and your site parts: menus, template parts, synced patterns and widget areas. When it finishes, the progress bar says what was found, for example *"Done — 6 items checked: 2 errors on 2 items, 5 to review."*, with **See what to fix**, which takes you straight to the items that need attention. The Overview then shows:

- an **Average automated score** (see [Scores & severities](/scoring))
- **Errors**: problems Lumtera is confident about
- **Needs review**: things a person should confirm
- **Content checked**: how much of your content has been checked
- **Review coverage**: how many of the 55 WCAG 2.2 A and AA criteria your checks look at, and how many have evidence behind them

If the check stops, for example because you closed the tab, the Overview shows **A check did not finish** with **Continue where it stopped**. See [Check all content](/site-report#check-all-content).

## 2. Fix the most common issues first

Start with the **Fix once, clear many** card, if you see it. It lists the same problem in the same markup on several items, such as a vague "Read more" link in a synced pattern, or a missing label in a form used on every page. When the problem comes from a site part, **Fix at the source** fixes it once in that part and checks the pages that use it again. See [Site parts](/site-parts) and [Fix at the source](/fixing-issues#fix-at-the-source).

The **Most common issues** card lists the checks that fire most often across your site. Click an issue to see every post that has it in the [Content report](/site-report#content-report). Then click **Issues** on a row to see what to fix. Many issues have **Fix without opening**: Lumtera shows the change before anything is saved, and you can undo it afterwards. See [Fixing issues](/fixing-issues).

## 3. Describe your images

Missing alt text is usually the most common error. Go to <span class="screen-path">Lumtera → Fixes → Alt text</span>. Describe each image once, then click the button that adds it to the posts that show it without a description (it says how many, such as **Add it to those 3 posts**). See [Alt text manager](/alt-text).

## 4. Fix issues in the editor

Open a post from **Needs attention** on the Overview. In the editor's **Lumtera Accessibility** sidebar:

- Click **Select block** to jump to the problem.
- Use the **quick fix** button where there is one, such as **Change to H3** or **Convert to a list**. You can undo it like any edit.
- For other fixes, click **Review fix** to see the change before it is saved.
- For items that need review, decide. If it's fine, click **Dismiss…** and add a short reason.

See [Block editor sidebar](/block-editor).

## 5. Check a live page, theme included

Open any published page while logged in, and click **Accessibility** in the admin bar. [Review mode](/review-mode) has these tabs:

- **Whole page** checks your header, menus and footer, and measures real color contrast.
- **Keyboard** walks the page with the Tab key and tests menus and pop-ups.
- **Screen reader** previews the headings, landmarks, links and form fields a screen reader lists.

The admin bar item also has a small menu: this content's counts, the last whole-page result, **Check this page**, **Fix in the editor** and **Open the accessibility overview**.

## 6. Turn on the baseline site fixes

If your theme lacks a skip link, a visible focus outline or pinch zoom on phones, switch those fixes on under <span class="screen-path">Lumtera → Settings → Site fixes</span>. They stay free, and each one is off until you turn it on. See [Site fixes](/site-fixes).

## 7. Get a weekly email

Click **Send me the weekly email** in the checklist, or turn on **Send a weekly summary** under <span class="screen-path">Lumtera → Settings → Email summary</span>. Each week your own site emails your score, new errors and what you fixed. Leave **Also check my home page every week** ticked to add a check of your home page as visitors get it. See [Weekly email summary](/email-summary).

## 8. Decide how strict to be

In <span class="screen-path">Lumtera → Settings</span>:

- **General → Before publishing**: choose whether authors see a summary of errors before they publish (the default), or must confirm to publish anyway.
- **Checks**: make any check stricter or softer, or switch it off.
- **Permissions**: choose which roles see the reports, dismiss errors and use review mode. See [Roles & permissions](/permissions).

See [Settings](/settings).

## 9. Publish a statement and a feedback form

Add the **Accessibility feedback form** block to a page, so visitors can report a barrier. See [Feedback form and inbox](/feedback).

Then go to <span class="screen-path">Lumtera → Feedback & statement → Statement</span>, choose a template and standard, fill in your details, and click **Create draft statement**. Review the draft, publish it, and link to it from your footer. See [Accessibility statement](/statement).

## 10. Test the rest by hand

A score of 100 means "no automated issues found", not "compliant". Spend five minutes on the [manual check](/manual-testing#the-five-minute-manual-check) on your key pages. For a fuller pass, work through the [guided checklists](/manual-checks) and record the results on each page.
