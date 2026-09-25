---
title: Guided manual checks
description: Nine short, step-by-step checks in the block editor for the parts of WCAG that no tool can test for you, with Pass, Fail or Not applicable saved on each page.
---

# Guided manual checks

Automated checks can't tell whether your menu works with a keyboard, whether captions are accurate, or whether text survives extra spacing. Guided manual checks walk you through testing these yourself, one short check at a time. You don't need to be an expert. You record each result on the page, so you and your team can see what has been tested.

The results are your own judgement. Lumtera doesn't test these things for you, and a page that passes every check isn't automatically "compliant". See [What automated testing can't do](/manual-testing).

## Where to find them

<ol class="step-list">
  <li>Open a post or page in the block editor.</li>
  <li>Open the post settings sidebar (the <strong>Post</strong> or <strong>Page</strong> tab).</li>
  <li>Expand the <strong>Manual accessibility checks</strong> panel.</li>
</ol>

The panel lists the nine checks, each with its result: **Pass**, **Fail**, **Not applicable** or **Not done**. Above the list, a progress line shows how far you've got, such as *"4 of 9 done, 1 failed"*.

The panel appears for the content types Lumtera checks (see [Settings](/settings#content-to-check)). A new post has to be saved once first. Until then the panel says *"Save the draft to record manual accessibility checks for it."*

The panel is only in the block editor. The classic editor and the Elementor editor don't have it.

## Run a check

Click a check's name. A window opens with:

- how long it takes, such as **About 5 minutes**
- **Why it matters**: who is affected and how
- **Steps**: what to do, in order
- **Open the page**: opens the page in a new tab. Once the post is published, this is the live page. Before that, it's the preview. If the post hasn't been saved yet, you'll see *"Save the draft first to open the page for this check."*
- **What to record**: what counts as a pass, a fail, and when the check doesn't apply
- the **WCAG success criteria** the check covers, each linked to the W3C's explanation

Then record the result:

<ol class="step-list">
  <li>Under <strong>Result</strong>, choose <strong>Pass</strong>, <strong>Fail</strong> or <strong>Not applicable</strong>.</li>
  <li>If you chose <strong>Fail</strong> and the check covers more than one criterion, untick any under <strong>Which criteria failed?</strong> that actually passed. At least one must stay ticked.</li>
  <li>Optionally, add a <strong>Note</strong>, such as <em>"Menu opens with Enter but Escape does not close it."</em></li>
  <li>Click <strong>Save result</strong>.</li>
</ol>

The result is saved straight away. You don't need to update the post. To remove a result, open the check and click **Clear result**. When a check already has a result, the window shows who recorded it and when, such as *"Recorded as Pass by Sam on March 3, 2026."*

## The nine checks

| Check | About | What you test | WCAG |
| --- | --- | --- | --- |
| **Keyboard only** | 5 min | Tab through the page. Can you reach and use every link, button and control, always see where focus is, follow a sensible order, and never get stuck? | 2.1.1, 2.1.2, 2.4.3, 2.4.7 |
| **Zoom to 200% and a narrow window** | 4 min | At 200% zoom, nothing is cut off or overlapping. At 400% (about as narrow as a 320 px window), text reads by scrolling down only. | 1.4.4, 1.4.10 |
| **Text spacing** | 3 min | With extra line, paragraph, letter and word spacing, all text stays fully visible. | 1.4.12 |
| **Screen reader skim: headings and landmarks** | 5 min | With VoiceOver, NVDA or TalkBack, the list of headings gives a fair outline, the main regions are announced, form controls have clear names, and things that look like headings, lists or tables are announced as such. | 1.3.1, 2.4.6 |
| **Forms and error messages** | 5 min | Every field has a visible label and any instructions it needs. Submitting it empty or with a mistake gives errors in text that say how to fix them. | 3.3.1, 3.3.2, 3.3.3 |
| **Video and audio** | 5 min | Videos have accurate captions, audio has a transcript, and important visual information is described. | 1.2.1, 1.2.2, 1.2.3, 1.2.5 |
| **Motion, flashing and time limits** | 3 min | Anything that moves for more than five seconds can be paused, nothing flashes more than three times a second, and time limits can be turned off, adjusted or extended. | 2.2.1, 2.2.2, 2.3.1 |
| **Content that appears on hover or focus** | 3 min | Tooltips, dropdowns and pop-ups close with <kbd>Escape</kbd>, stay open when you point at them, and don't disappear on their own. | 1.4.13 |
| **Portrait and landscape** | 2 min | The page shows and works on a phone or tablet in both orientations. | 1.3.4 |

Each window explains when **Not applicable** is the right answer. For example, **Forms and error messages** doesn't apply to a page with no form. For checks such as **Keyboard only**, it almost never applies.

### The text spacing preview

The **Text spacing** check has an extra link, **Open with test spacing**. It opens the page with the spacing from WCAG's text spacing test applied: line height 1.5 times the text size, 2 times the text size after paragraphs, letter spacing 0.12 times and word spacing 0.16 times.

A banner in the corner says **Text spacing test is on.** Click **Turn off test spacing** to go back to the normal page. Only you see this preview. It works only for logged-in users who can edit that post, and visitors never get it.

## Who can use them

Anyone who can edit a post can see its manual checks and record or clear results. Each result records who saved it and when.

## Where the results show up

- **In the editor**, in the **Manual accessibility checks** panel, for everyone who can edit the post.
- **In the Content report.** Under an item's title, a line such as *"Manual checks: 4 of 9 done, 1 failed"* appears once at least one check has a result. See [Content report](/site-report#content-report).
- **In an Accessibility Conformance Report** <span class="pro-pill">Pro</span>. Results on published content feed the conformance level of each criterion they cover. See [Accessibility Conformance Report](/pro/acr).

Manual results don't change the automated score, and they aren't included in the Overview's numbers.

## Good to know

- **Results belong to the page, not to a version of it.** If you change a page a lot, run the affected checks again and update the result.
- **Start with your key pages:** the home page, a typical post, your contact form and your checkout. Pages built from the same template usually pass or fail together.
- **Privacy.** Each result stores the user who recorded it, the date and the optional note. WordPress's personal data export includes them. Erasing a user's data keeps the result but removes who recorded it and the note. See [Data & uninstall](/developers/data).
