---
title: What automated testing can't do
description: Why a Lumtera score of 100 means "no automated issues found", not "compliant", and the five-minute manual check that catches much of the rest.
---

# What automated testing can't do

Lumtera finds the accessibility problems a machine can reliably detect in your content and on the rendered page. That is only part of WCAG. Independent studies put automated testing at between **a third and a half** of real barriers. The rest need a person: is this alt text accurate? Does the page make sense when read aloud? Can you use the menu with a keyboard?

## How much of WCAG the checks cover {#coverage}

WCAG 2.2 has 55 success criteria at levels A and AA. With review mode's whole-page checks, Lumtera's automated checks cover **37 of 55** of them, fully or in part. The checks of saved content alone cover **25 of 55**. With Lumtera Pro's form tests, it's **40 of 55**.

"Covers" means a check looks at that criterion. It doesn't mean your site meets it. Many criteria are covered only in part: a check can find an image with no alt text, but not whether the alt text is accurate. The Overview's **Review coverage** meter shows your own site's numbers, from the checks you have switched on, next to the score and never merged into it. See [Review coverage](/scoring#review-coverage) and [How accurate is Lumtera?](/accuracy).

That's why:

- A score of **100** means "no automated issues found". It never means "compliant".
- Checks a machine can't decide on its own are marked **Needs review**, not **Error**. A person confirms or dismisses them.
- Lumtera never claims to make a site ADA, WCAG, EAA or Section 508 compliant, and you should be wary of any tool that does.

## Why not an overlay?

Overlays are widgets that try to "fix" a site in the visitor's browser. They don't make a site compliant, and they can get in the way of the assistive technology people already use. In 2025 the US Federal Trade Commission ordered an overlay vendor to pay $1 million over claims that its tool made websites compliant.

Lumtera takes the opposite approach. It adds nothing to your site for visitors. It helps you fix the content itself, which is what WCAG, the ADA, the European Accessibility Act and Section 508 actually ask for. The optional [site fixes](/site-fixes) are the one exception: they change the HTML your server sends, in the same way for every visitor. There's still no widget.

## The five-minute manual check

The **Overview** screen includes this checklist, under **What a score cannot tell you**. Run it on your key pages: the home page, a typical post, your contact form and your checkout.

<ol class="step-list">
  <li><strong>Keyboard only.</strong> Put the mouse away and press <kbd>Tab</kbd> through the page. Can you see where focus is, and reach and use every link, menu and form?</li>
  <li><strong>Zoom to 200%.</strong> Does text stay readable without scrolling sideways, and does nothing overlap?</li>
  <li><strong>Listen.</strong> Turn on VoiceOver (<kbd>Cmd</kbd>+<kbd>F5</kbd> on a Mac) or the free NVDA on Windows and read the page. Does it make sense in order?</li>
  <li><strong>Theme colors.</strong> Lumtera's content checks look at colors set in your content. Check your theme's menus, buttons and footer too.</li>
</ol>

The W3C's [Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/) guide goes further.

## Guided checklists

For a more thorough pass, use the guided checklist, in the block editor's **Manual accessibility checks** panel or review mode's **Manual** tab. It has one short item for each WCAG criterion a person has to judge, grouped by topic: keyboard, zoom, text spacing, screen reader, forms, video and audio, motion and time limits, pop-ups, orientation, touch and pointer, images and color, and consistency across pages. Items that probably don't apply to the page are suggested for you. You record **Pass**, **Fail** or **Not applicable** on each page, with an optional note, so your team can see what has been tested, and the results count as evidence on the Overview's coverage meter. See [Guided checklists](/manual-checks).

## Getting closer with Lumtera

Some of the manual work can be narrowed down:

- The **Whole page** tab in [review mode](/review-mode#whole-page) checks the rendered page, theme included: real color contrast, landmarks, the skip link, blocked zoom and sideways scrolling.
- The **Keyboard** tab walks the page with the Tab key and tests menus, dialogs and tabs from the keyboard. The **Screen reader** tab previews what a screen reader lists. Neither replaces a real keyboard or screen reader, but they show you where to look.
- [Page checks](/pro/page-checks) in Lumtera Pro run those whole-page checks on a schedule, as a logged-out visitor, and [form tests](/pro/form-tests) check error messages by submitting forms empty.
- [Guided checklists](/manual-checks) record the results of your own testing on each page, and [test sessions](/pro/test-sessions) in Lumtera Pro organize them per template, with sign-off.
- [Client reports](/pro/reports) in Lumtera Pro list all 55 WCAG 2.2 A and AA criteria and mark the ones no automated check covers as **Manual check needed**, so the client can see what is left to test.
- The [Accessibility Conformance Report](/pro/acr) in Lumtera Pro uses your automated results, your checklist results and your test sessions to suggest a conformance level for each criterion, which you review before exporting. Clean automated results alone are never enough for "Supports".

For a formal conformance claim, get a manual audit by an accessibility specialist, ideally including testing by disabled people.
