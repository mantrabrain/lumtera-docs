---
title: Review mode
description: Check the live page as your browser renders it, theme included. 33 whole-page checks, a keyboard walk, menu and pop-up tests, a screen reader preview, guided checks and color vision simulation, with results you can save to your reports.
---

# Review mode

Review mode shows accessibility issues on the page itself, and checks the **whole page** as your browser renders it: your theme's header, menus and footer, page-builder output, and your content.

![Review mode on a live page](/screenshots/screenshot-2.webp)

## Open review mode

<ol class="step-list">
  <li>While logged in, view any page of your site: a post, page or product you can edit, or, if you can see Lumtera's reports, the blog home page, an archive, search results or the shop page.</li>
  <li>Click <strong>Accessibility</strong> in the admin bar. On a single post, a red count shows the errors saved for that post.</li>
</ol>

A panel opens on the side, and each issue is outlined in place. Click **Close review**, or **Accessibility** again, to leave.

### Where review mode works {#where-review-mode-works}

Review mode works on single posts, pages and products, and on pages that list content: the blog home page, archives (categories, tags, authors and dates), search results and the WooCommerce shop page.

On pages that list content, there is no **This post** tab: review mode opens on **Whole page**, and its results belong to the site rather than to one post. **Edit page** opens the page behind the listing (such as your posts page or shop page) when there is one. These pages need permission to see Lumtera's reports, not just to edit posts.

On the Overview, the [weekly home page check](/site-report#weekly-home-page-check) card has **Open it in review mode**, which opens your home page in review mode.

### The admin bar menu {#the-admin-bar-menu}

Hover or focus **Accessibility** in the admin bar (tap it on a phone) to open its menu without starting a review:

- **This content:** the errors and items to review from the last check of this post's content, for example *"This content: 2 errors, 1 to review"*. *"(older check)"* means an earlier version of Lumtera counted them; opening the editor updates them.
- **Whole page:** the last saved [whole-page result](#save-results-to-reports) for this page and how long ago it was, when there is one.
- **Check this page** opens review mode (or **Close the review** while it's open).
- **Fix in the editor** opens the post in its editor.
- **Open the accessibility overview**, for people who can see the reports.

The counts on the item and in the menu cover this post's content. The header, menus and footer are checked in review mode.

Visitors never see or load any of it. Review mode's scripts load only for signed-in people who may use it, only when they ask, and never in cached pages. Review mode doesn't change your content, and it saves whole-page results only if you choose to (see [Save results to reports](#save-results-to-reports)).

The panel is built so your theme's CSS can't restyle it. Use the arrow keys to move between its tabs, and press <kbd>Escape</kbd> to collapse it.

## Who can use it

The **Accessibility** item appears for signed-in users whose role may use review mode: on a single post or page, when they can edit it; on the blog home page, archives, search results and the shop, when they can also see Lumtera's reports. By default, every role that can edit posts may use review mode: contributors, authors, editors and administrators, each on the posts they can edit.

An administrator can change which roles may use it under <span class="screen-path">Lumtera → Settings → Permissions</span>, in **Review pages on the site**. Administrators always can. See [Roles & permissions](/permissions).

## The tabs

| Tab | What it does |
| --- | --- |
| [This post](#this-post) | The issues in the post's content, outlined on the page. Only on a single post or page. |
| [Whole page](#whole-page) | Checks of the rendered page, theme included, run as soon as it loads |
| [Keyboard](#keyboard) | Walks the page with the Tab key, and tests menus, dialogs and tabs |
| [Manual](#manual) | The guided checklist for this page |
| [Screen reader](#screen-reader) | What a screen reader lists: headings, landmarks, links and form fields |

Each tab shows a count of what it found.

## This post {#this-post}

The **This post** tab lists the issues in the post's content, using the same checks as the editor.

- **Show on page** scrolls to the element, highlights it and moves focus to it. Items that aren't visible, such as hidden elements, say **Not visible on the page**.
- **How to fix** expands the fix, with a link to the WCAG criterion and a **Learn more** link to the [check](/checks).
- **Outlines** switches the outlines on the page on and off.
- **Edit post** opens the editor.

If your theme displays the content in an unusual way and Lumtera can't find it on the page, it says so and opens the **Whole page** tab instead. Use the editor's sidebar for the content checks.

## Whole page {#whole-page}

The **Whole page** tab checks the page as your browser renders it, signed in. It runs once the page has finished loading. Click **Check again** after you change something.

It covers:

- **Page structure:** the page title, the page language, landmarks, the skip link, and the heading outline.
- **Contrast:** text contrast measured from the real colors on screen, including text over gradients (the worst part of the gradient is used) and text over images. Also the contrast of controls and icons, and of the keyboard focus indicator.
- **Layout:** zoom that is switched off, sideways scrolling at the current width, small and crowded click targets, links that look like the text around them, and items shown in a different order from the page's HTML.
- **Text spacing (on request):** tick **Also test text spacing** to apply wider line, letter and word spacing for a moment, as some readers set it, and look for text that gets cut off or overlaps. The page flickers while it runs.

For text over an image, Lumtera reads the image's pixels when the image is on your own site. For images from other sites, which browsers don't let a page read, the result is **Text over an image: check contrast**, for you to check yourself.

Findings about the page as a whole, such as a missing title, say **Applies to the whole page** instead of **Show on page**. Each finding says where it comes from, such as a template part, a menu or the post itself, so you can fix a shared problem once, where it comes from. See [Site parts](/site-parts).

The full list, with IDs and WCAG criteria, is in [All checks → Whole-page checks](/checks#whole-page-checks).

**Reflow:** to check that the page works on narrow screens and at high zoom, make the browser window 320 pixels wide (or zoom to 400%), then click **Check again**.

To keep the page responsive on very large pages, Lumtera checks up to 1,500 click targets and 300 Tab stops, and lists a limited number of items for each check. The panel tells you when a page was too large to check completely.

::: tip Fix it once
Your header, menus and footer are usually the same on every page. Fixing a whole-page issue on one page often fixes it across the whole site.
:::

Some issues appear only for signed-out visitors, such as cookie banners. [Page checks](/pro/page-checks) in Lumtera Pro run the same checks as a signed-out visitor, on a schedule, across your key pages.

## Keyboard {#keyboard}

The **Keyboard** tab checks what keyboard users meet. It has two buttons:

![The Keyboard tab in review mode, with every Tab stop numbered on the page](/screenshots/review-keyboard.webp)

**Check keyboard access** moves focus through the page as the <kbd>Tab</kbd> key would, up to 300 Tab stops, and numbers each stop on the page (**Number the Tab stops on the page**). It reports:

- focus you can't see, or focus that lands on something invisible
- focus hidden under a sticky header or footer
- a Tab order that jumps back up the page
- focus that changes the page on its own, such as opening a new page or reloading (WCAG 3.2.1)
- pop-up content that appears on focus and doesn't close with <kbd>Escape</kbd> (WCAG 1.4.13)
- possible keyboard traps

**Test menus and pop-ups** operates disclosures, menus, dialogs, tabs and accordions from the keyboard, including the Navigation block's mobile menu. It checks that each one opens, says whether it is open, moves focus sensibly and closes with <kbd>Escape</kbd>. Then it puts the page back as it was. If something can't be put back exactly, the panel says so, and **Reload page to reset** reloads it.

While either check runs, the status says **Press Escape to stop.** Press <kbd>Escape</kbd>, or click **Stop**, and the results cover the part of the page checked so far. The check moves focus through the page, so <kbd>Escape</kbd> is the way to stop it from the keyboard.

If focusing an element reloads the page, the check can't carry on in the old page. After the reload, the Keyboard tab says which element it was focusing and offers **Continue the check**, which finishes the walk and lists that element as a finding.

::: warning Scripted key presses aren't a real keyboard
Press <kbd>Tab</kbd> and <kbd>Shift</kbd>+<kbd>Tab</kbd> through the page yourself to confirm what the check found.
:::

## Manual {#manual}

The **Manual** tab shows the [guided checklist](/manual-checks) for this page, with steps for each item and **Save result**. Results are saved with the post, the same as in the editor. On a listing page, they are saved with the page behind it (such as your posts page or shop page); archives and search results have no such page, so the **Manual** tab isn't shown there.

## Screen reader {#screen-reader}

The **Screen reader** tab shows what a screen reader works with, in views:

- **Headings**: the heading outline, with skipped levels and empty headings marked.
- **Landmarks**: the header, navigation, main content and footer regions, and any two of the same kind without different names.
- **Links**: every link text on its own, as screen readers can list them, with links that say nothing on their own marked.
- **Form controls**: each field's name and role, with fields named only by a placeholder or a tooltip marked.
- **Read the page**: the page in reading order, roughly as a screen reader would say it.

In each list, use the <kbd>Up</kbd> and <kbd>Down</kbd> arrow keys to move, and <kbd>Enter</kbd> to show the item on the page. **Refresh preview** builds it again after the page changes.

This is a preview, worked out from the page's code. It is not a screen reader. Real screen readers differ from each other, and they are the reference: test with NVDA (free, Windows) or VoiceOver (built into Mac and iPhone) to confirm.

## Simulate color vision

**Simulate** shows the page as people with protanopia, deuteranopia, tritanopia or achromatopsia see it, or with low vision (blur and low contrast). It is an approximation, applied to the page and not to the panel. Choose **Off** to stop.

## Why is this flagged?

Every finding has a **Why is this flagged?** panel that explains, in plain words, why the check reported it and what would make it fine. If you still think it is wrong, **Report a false positive** opens a report in the WordPress.org support forum (or on GitHub), with the check, the Lumtera version and the markup filled in. Remove anything private before you post it. Nothing is sent from your site: the report is posted only if you post it yourself.

## Dismiss a whole-page finding

Choose **Dismiss** on a whole-page finding, then **Dismiss it on**:

- **Every page it appears on**, for something in a shared part, such as the footer
- **This page only**

You can add a reason under **Why is this not a problem? (optional)**. Dismissed findings are listed under **Dismissed**, where **Restore** brings them back. See [Dismissing issues](/dismissing).

## Save results to reports {#save-results-to-reports}

Whole-page results stay in your browser unless you tick **Save results to reports** on the **Whole page** tab. The choice is yours alone and is remembered for you. When it's on, each check of a page is saved, and the panel says **Saved to reports.**

Saved results are used in:

- the Overview's **Theme & templates** card, which lists issues in the parts every page shares
- the Overview's **Review coverage** meter, as evidence for the criteria the whole-page checks cover
- the weekly email summary, reports, the conformance report in Lumtera Pro, and the Abilities API

An administrator can turn saving off for everyone under <span class="screen-path">Lumtera → Settings → General</span> with **Let people save review-mode findings (theme, menus, footer) to the reports**. It is on by default, and each person still has to tick **Save results to reports** for their own checks to be stored.

## In other browsers

The checks run in Chrome, Edge, Firefox and Safari, with the same results, apart from a few real differences between browsers:

- **Focus rings.** Firefox and Safari draw their own system focus ring when a site uses the browser's default outline style. Its color depends on the visitor's system settings and can't be read, so Lumtera doesn't measure its contrast in those browsers. In Chrome and Edge it can, so a check there can show one more AAA tip.
- **Buttons in Safari.** Safari doesn't draw a box-shadow on a button with the system look. A focus style that only adds a box-shadow is therefore invisible in Safari, and the Keyboard tab reports it there, while Chrome and Firefox pass it.
- **Tab in Safari.** By default, <kbd>Tab</kbd> in Safari moves only between form controls, and links are reached with <kbd>Option</kbd>+<kbd>Tab</kbd> or the "Press Tab to highlight each item" setting. The keyboard check follows the full keyboard order, as WCAG expects, whatever that setting is.

## For developers

Review mode and Lumtera Pro's page checks share one audit engine, `window.lumteraAudit`, so both give the same results. It loads only for signed-in users who can use review mode, only on request, with a nonce. Pro and CI runs load pages in **audit mode** (`?lumtera-audit=<nonce>`), which checks the user's capability, hides the admin bar and is never cached. See [CI](/developers/ci) and [Hooks & filters](/developers/hooks).
