---
title: Guided checklists
description: One step-by-step item for each WCAG 2.2 criterion that needs a person, in the block editor and in review mode, with Pass, Fail or Not applicable saved per page and per criterion, suggestions for items that don't apply, and results that count as evidence.
---

# Guided checklists

Automated checks can't tell whether your menu works with a keyboard, whether captions are accurate, or whether text survives extra spacing. The guided checklist walks you through testing these yourself, one short item at a time. You don't need to be an expert. You record each result on the page, so you and your team can see what has been tested, and by whom.

The results are your own evaluation record. Lumtera doesn't test these things for you, and a page that passes every item isn't automatically "compliant". See [What automated testing can't do](/manual-testing).

## Where to find it

- **Block editor:** open the post settings sidebar (the **Post** or **Page** tab) and expand **Manual accessibility checks**.
- **Review mode:** open the **Manual** tab while viewing the page. See [Review mode](/review-mode#manual).

Both show the same checklist and save to the same place. The checklist appears for the content types Lumtera checks (see [Settings](/settings#content-to-check)). A new post has to be saved once first. Until then the panel says *"Save the draft to record manual accessibility checks for it."*

## What's in the checklist

There is **one item for each WCAG 2.2 A or AA criterion that software can't fully decide**, 54 in all, grouped by what you do to test them:

| Group | Criteria |
| --- | --- |
| **Keyboard only** | 2.1.1, 2.1.2, 2.4.3, 2.4.7, 2.4.11, 2.4.1, 2.1.4, 3.2.1 |
| **Zoom to 200% and a narrow window** | 1.4.4, 1.4.10 |
| **Text spacing** | 1.4.12 |
| **Screen reader** | 1.3.1, 2.4.6, 2.4.2, 1.3.2, 2.4.4, 4.1.2, 2.5.3, 4.1.3, 3.1.2 |
| **Forms and error messages** | 3.3.2, 3.3.1, 3.3.3, 1.3.5, 3.2.2, 3.3.4, 3.3.7, 3.3.8 |
| **Video and audio** | 1.2.2, 1.2.1, 1.2.3, 1.2.5, 1.2.4, 1.4.2 |
| **Motion, flashing and time limits** | 2.2.2, 2.3.1, 2.2.1 |
| **Content that appears on hover or focus** | 1.4.13 |
| **Portrait and landscape** | 1.3.4 |
| **Touch, mouse and motion** | 2.5.8, 2.5.2, 2.5.1, 2.5.7, 2.5.4 |
| **Images, color and contrast** | 1.1.1, 1.4.5, 1.4.3, 1.4.11, 1.4.1, 1.3.3 |
| **Consistent across pages** | 3.2.3, 3.2.4, 3.2.6, 2.4.5 |

Each item has a plain title, such as **Everything works with the keyboard** or **Error messages say how to fix it**.

Above the list, a progress line shows how far you've got, such as *"12 of 54 checks recorded"*. Use **Show** to list **All checks**, **Not recorded yet** or **Failed**.

## Run a check

Open an item. It shows:

- **Why it matters**: who is affected and how
- **Steps**: what to do, in order
- **Tools to use**: for example your keyboard, NVDA or VoiceOver, browser zoom, or a phone
- **Open the page**: opens the page in a new tab. Once the post is published, this is the live page. Before that, it's the preview.
- **What to record**: what counts as a pass, a fail, and when the check doesn't apply
- the **WCAG success criterion**, linked to the W3C's explanation

Then record the result:

<ol class="step-list">
  <li>Under <strong>Result</strong>, choose <strong>Pass</strong>, <strong>Fail</strong> or <strong>Not applicable</strong>.</li>
  <li>Optionally, add a <strong>Note</strong>, such as <em>"Menu opens with Enter but Escape does not close it."</em></li>
  <li>Click <strong>Save result</strong>, or <strong>Save and go to the next check</strong>.</li>
</ol>

The result is saved straight away. You don't need to update the post. To remove a result, open the item and click **Clear result**. When an item already has a result, it shows who recorded it and when, such as *"Recorded as Pass by Sam on March 3, 2026."*

After you save, focus stays in the checklist, on the item you saved or the next one, so you can work through it with the keyboard.

## Items that probably don't apply

Lumtera looks at what the page contains, from the post and from the last whole-page check, such as a form, a video, a carousel or a login form. Items that only matter for things the page doesn't have are listed under **Checks that probably do not apply**, for example *"This page does not seem to have a video, so this check probably does not apply. You decide."*

Click **Review suggestions**, untick anything the page does have, then **Mark these as not applicable**. It's only a suggestion: you decide.

### The text spacing preview

The **Text spacing** item has an extra link, **Open with test spacing**. It opens the page with the spacing from WCAG's text spacing test applied: line height 1.5 times the text size, 2 times the text size after paragraphs, letter spacing 0.12 times and word spacing 0.16 times.

A banner in the corner says **Text spacing test is on.** Click **Turn off test spacing** to go back to the normal page. Only you see this preview. It works only for signed-in users who can edit that post, and visitors never get it.

## Who can use it

Anyone who can edit a post can see its checklist and record or clear results. Each result records who saved it and when.

## Where the results show up

- **In the editor and review mode**, for everyone who can edit the post.
- **In the Content report.** Under an item's title, a line shows how many checks are recorded and how many failed. See [Content report](/site-report#content-report).
- **On the Overview's coverage meter.** A pass or "not applicable" recorded in the last 12 months, with no newer failure, counts as evidence for that criterion. See [Review coverage](/scoring#review-coverage).
- **In the accessibility statement**, which can list criteria with failed manual checks. See [Accessibility statement](/statement).
- **In an Accessibility Conformance Report**, with Lumtera Pro. Results on published content feed the conformance level of each criterion. See [Accessibility Conformance Report](/pro/acr).

Manual results don't change the automated score.

With Lumtera Pro, [test sessions](/pro/test-sessions) organize manual testing per template, with the assistive technology used and a sign-off.

## Results from older versions

Early versions of the panel had nine guided checks, such as **Keyboard only**. A result recorded against one of them is carried over to each criterion that check covered, so nothing you recorded is lost.

## Good to know

- **Results belong to the page, not to a version of it.** If you change a page a lot, run the affected items again and update the result.
- **Start with your key pages:** the home page, a typical post, your contact form and your checkout. Pages built from the same template usually pass or fail together.
- **Privacy.** Each result stores the user who recorded it, the date and the optional note. WordPress's personal data export includes them. Erasing a user's data keeps the result but removes who recorded it and the note. See [Data & uninstall](/developers/data).

## For developers

Results are saved per page and per criterion. Several can be saved at once with `POST /lumtera/v1/posts/{id}/manual/batch`, and each save fires `lumtera_manual_test_saved`. The `lumtera_page_features` filter changes what Lumtera thinks a page contains, which drives the "probably does not apply" suggestions. See [REST API](/developers/rest-api) and [Hooks & filters](/developers/hooks).
