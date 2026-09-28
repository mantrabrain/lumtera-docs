---
title: All checks
description: Every one of Lumtera's 69 content checks and 33 whole-page checks, with its WCAG 2.2 success criteria, level, default severity, why it is flagged and how to fix it.
---

# All checks

Lumtera runs **69 checks** on your content. 65 of them map to WCAG 2.2 level A or AA success criteria. The other 4 are level AAA best practices, which is why they show up as tips. Review mode adds [33 whole-page checks](#whole-page-checks) of the rendered page, and Lumtera Pro adds [form, hover and consistency checks](#lumtera-pro-checks).

Some checks count against more than one criterion. For example, a link with no text fails both 2.4.4 (link purpose) and 4.1.2 (name, role, value). The tables list every criterion a check covers, the main one first.

Each check starts with a **default severity**:

| Severity | Shown as | Meaning |
| --- | --- | --- |
| `error` | **Error** | Lumtera is confident this is a barrier. Errors lower the score the most. |
| `warning` | **Needs review** | A machine can't decide this alone. A person should look and confirm or dismiss it. Lowers the score a little. |
| `notice` | **Tip** | Best practice. Worth fixing, but not a WCAG A/AA failure on its own. Doesn't affect the score. |

You can change any check's severity, or switch it off, under <span class="screen-path">Lumtera → Settings → Checks</span>. See [Settings](/settings#checks).

## How sure is each check? {#confidence}

Every finding also has a **confidence**: how sure the check is that it is a real barrier. Confidence decides the most severe default a finding can have:

| Confidence | Most severe default | Meaning |
| --- | --- | --- |
| Certain | Error | The markup shows the problem. |
| Likely | Needs review | Probably a barrier, but a person should confirm it. |
| Possible | Tip, hidden by default | Worth a look, but often fine. |

A check can lower the confidence of a single finding when something makes it less sure, but it never raises it. Findings of **possible** confidence are hidden until you tick **Show possible issues** in the Content report or the editor sidebar, and they never count in the score.

Every finding has a **Why is this flagged?** panel that gives the reason in plain words. The same reason is shown under each check below. To see how well the checks find real problems without false alarms, read [How accurate is Lumtera?](/accuracy).

::: tip Linking to a check
Every check below has a stable anchor that matches its ID, for example [`/checks#image-missing-alt`](#image-missing-alt). The IDs never change. They are the same ones you see in WP-CLI output, the REST API and the Abilities API, and every **Learn more** link in Lumtera points here.
:::

## Summary

### Images (9)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Image has no alternative text](#image-missing-alt) | `image-missing-alt` | 1.1.1 | A | Error |
| [Image has empty alt text](#image-empty-alt) | `image-empty-alt` | 1.1.1 | A | Needs review |
| [Alt text looks like a file name](#image-alt-filename) | `image-alt-filename` | 1.1.1 | A | Needs review |
| [Alt text repeats "image of"](#image-alt-redundant) | `image-alt-redundant` | 1.1.1 | A | Tip |
| [Alt text is very long](#image-alt-long) | `image-alt-long` | 1.1.1 | A | Tip |
| [Image map area has no text](#area-missing-alt) | `area-missing-alt` | 1.1.1 | A | Error |
| [Image button has no text](#input-image-missing-alt) | `input-image-missing-alt` | 1.1.1 | A | Error |
| [Alt text is a placeholder](#image-alt-placeholder) | `image-alt-placeholder` | 1.1.1 | A | Needs review |
| [Alt text repeats nearby text](#image-alt-duplicates-text) | `image-alt-duplicates-text` | 1.1.1 | A | Tip |

### Links & buttons (11)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Link has no text](#link-no-name) | `link-no-name` | 2.4.4, 4.1.2 | A | Error |
| [Link text is vague](#link-ambiguous-text) | `link-ambiguous-text` | 2.4.4 | A | Needs review |
| [Link does not go anywhere](#link-fake) | `link-fake` | 4.1.2 | A | Needs review |
| [Link opens a new tab without warning](#link-new-window) | `link-new-window` | 3.2.5 | AAA | Tip |
| [Button has no text](#button-no-name) | `button-no-name` | 4.1.2 | A | Error |
| [Link opens a document file](#link-to-document) | `link-to-document` | 2.4.4 | A | Needs review |
| [Link text is a web address](#link-url-as-text) | `link-url-as-text` | 2.4.4 | A | Tip |
| [Same link text goes to different pages](#link-same-text-different-url) | `link-same-text-different-url` | 2.4.4 | A | Needs review |
| [Image and text link go to the same page](#link-adjacent-duplicate) | `link-adjacent-duplicate` | 2.4.4 | A | Tip |
| [In-page link goes nowhere](#link-anchor-missing) | `link-anchor-missing` | 2.4.4 | A | Error |
| [Link or button may be too small to tap](#target-size-small) | `target-size-small` | 2.5.8 | AA | Needs review |

### Headings (6)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Heading is empty](#heading-empty) | `heading-empty` | 1.3.1 | A | Error |
| [Heading level is skipped](#heading-skipped-level) | `heading-skipped-level` | 1.3.1 | A | Needs review |
| [Content uses an H1 heading](#heading-h1-in-content) | `heading-h1-in-content` | 1.3.1 | A | Tip |
| [Bold text may be a heading](#heading-possible) | `heading-possible` | 1.3.1 | A | Tip |
| [Heading is very long](#heading-too-long) | `heading-too-long` | 1.3.1 | A | Tip |
| [Long content has no subheadings](#content-no-headings) | `content-no-headings` | 2.4.10 | AAA | Tip |

### Forms (10)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Form field has no label](#form-field-no-label) | `form-field-no-label` | 4.1.2, 1.3.1, 3.3.2 | A | Error |
| [Form field has more than one label](#form-field-multiple-labels) | `form-field-multiple-labels` | 1.3.1 | A | Needs review |
| [Options are not grouped with their question](#form-group-no-fieldset) | `form-group-no-fieldset` | 1.3.1 | A | Needs review |
| [Personal-data field has no autocomplete](#input-autocomplete-missing) | `input-autocomplete-missing` | 1.3.5 | AA | Tip |
| [Autocomplete value is not valid](#input-autocomplete-invalid) | `input-autocomplete-invalid` | 1.3.5 | AA | Error |
| [Form asks for the same email twice](#form-redundant-entry) | `form-redundant-entry` | 3.3.7 | A | Tip |
| [Password field blocks pasting or password managers](#password-paste-blocked) | `password-paste-blocked` | 3.3.8 | AA | Error |
| [Check the CAPTCHA has an accessible alternative](#captcha-present) | `captcha-present` | 3.3.8 | AA | Needs review |
| [Dropdown changes page when an option is chosen](#select-navigates) | `select-navigates` | 3.2.2 | A | Needs review |
| [Dragging may be the only way to use this](#drag-without-alternative) | `drag-without-alternative` | 2.5.7, 2.1.1 | AA | Needs review |

### Tables (4)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Table has no header cells](#table-no-headers) | `table-no-headers` | 1.3.1 | A | Needs review |
| [Table header cell is empty](#table-empty-header) | `table-empty-header` | 1.3.1 | A | Tip |
| [Table may be used for layout](#table-layout) | `table-layout` | 1.3.1 | A | Needs review |
| [Table has empty rows](#table-empty-row) | `table-empty-row` | 1.3.1 | A | Tip |

### Audio, video & embeds (10)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Media plays sound automatically](#media-autoplay-audio) | `media-autoplay-audio` | 1.4.2 | A | Error |
| [Moving video cannot be paused](#media-no-pause) | `media-no-pause` | 2.2.2 | A | Needs review |
| [Video has no captions track](#video-no-captions) | `video-no-captions` | 1.2.2 | A | Needs review |
| [Embedded frame has no title](#iframe-no-title) | `iframe-no-title` | 4.1.2 | A | Error |
| [Scrolling or blinking text](#marquee-blink) | `marquee-blink` | 2.2.2 | A | Error |
| [Check captions on embedded video](#video-embed-captions) | `video-embed-captions` | 1.2.2 | A | Needs review |
| [Check that the slider can be paused](#carousel-motion) | `carousel-motion` | 2.2.2 | A | Tip |
| [Animated image may need a way to pause](#animated-gif) | `animated-gif` | 2.2.2, 2.3.1 | A | Needs review |
| [Check audio has a transcript](#audio-no-transcript) | `audio-no-transcript` | 1.2.1 | A | Needs review |
| [Embedded frames share the same title](#iframe-duplicate-title) | `iframe-duplicate-title` | 4.1.2 | A | Needs review |

### Structure & text (10)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Text is formatted as a list by hand](#list-fake) | `list-fake` | 1.3.1 | A | Tip |
| [List item is outside a list](#list-item-orphan) | `list-item-orphan` | 1.3.1 | A | Needs review |
| [Empty paragraphs used for spacing](#empty-paragraph-spacing) | `empty-paragraph-spacing` | 1.3.1 | A | Tip |
| [Emoji used as bullets or icons](#emoji-as-icon) | `emoji-as-icon` | 1.3.1 | A | Tip |
| [Text is justified](#text-justified) | `text-justified` | 1.4.8 | AAA | Tip |
| [Underlined text looks like a link](#text-underline-not-link) | `text-underline-not-link` | 1.3.1 | A | Tip |
| [Text is very small](#text-too-small) | `text-too-small` | 1.4.4 | AA | Tip |
| [Long passage in capital letters](#text-all-caps) | `text-all-caps` | 1.4.8 | AAA | Tip |
| [Page refreshes or redirects on a timer](#meta-refresh) | `meta-refresh` | 2.2.1, 3.2.5 | A | Error |
| [Instruction may rely on shape, position, color or sound](#sensory-language) | `sensory-language` | 1.3.3, 1.4.1 | A | Tip |

### Color (1)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Text color has low contrast](#color-contrast) | `color-contrast` | 1.4.3 | AA | Error |

### ARIA & keyboard (7)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Hidden element can still be focused](#aria-hidden-focusable) | `aria-hidden-focusable` | 4.1.2, 2.4.3 | A | Error |
| [Unknown ARIA role](#aria-invalid-role) | `aria-invalid-role` | 4.1.2 | A | Needs review |
| [Label points to a missing element](#aria-broken-reference) | `aria-broken-reference` | 1.3.1 | A | Needs review |
| [Duplicate ID](#duplicate-id) | `duplicate-id` | 4.1.2 | A | Tip |
| [Positive tabindex changes the focus order](#tabindex-positive) | `tabindex-positive` | 2.4.3 | A | Needs review |
| [Accessible name leaves out the visible text](#label-in-name) | `label-in-name` | 2.5.3 | A | Needs review |
| [Only a tooltip names this control](#name-from-title-only) | `name-from-title-only` | 4.1.2 | A | Needs review |

### Language (1)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Language code is invalid](#lang-invalid) | `lang-invalid` | 3.1.2 | AA | Needs review |

## Check details

### Images

#### Image has no alternative text {#image-missing-alt}

`image-missing-alt` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 1.1.1 asks for a text alternative for every image; this image has no alt attribute at all, so screen readers often read out its file name, while alt="" is the right choice for a decorative image.

**How to fix:** Select the image and fill in "Alternative text" in the block settings. Describe what the image shows or does in context. If the image is purely decorative, mark it decorative so screen readers skip it: "Mark as decorative" in the Image settings (WordPress 7.1 and later), or "Decorative image" under Accessibility on older versions. Outside the block editor, give decorative images an empty alt (alt="").

**Good to know:** Also reports elements with `role="img"` and SVGs with an image role that have no name. An image named only by its `title` attribute, or with `alt=" "` (a space), is **Needs review**.

#### Image has empty alt text {#image-empty-alt}

`image-empty-alt` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 1.1.1 lets decorative images use empty alt text so screen readers skip them; editors also leave it empty when no alt text was entered, so a person should confirm this image is decorative.

**How to fix:** If the image shows information visitors need — a product, a person, a chart, text — add alternative text describing it. If it is purely decorative, dismiss this item. In Elementor, set the alt text on the image in the Media Library. (Image blocks in the block editor are covered by their own decorative setting instead.) In Cover and Media &amp; Text blocks an empty alt text is how WordPress marks an image decorative; if that was intended, dismiss this item with a reason.

#### Alt text looks like a file name {#image-alt-filename}

`image-alt-filename` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 1.1.1 asks for alt text that describes what an image conveys; this alt text looks like a file name or camera label, which describes nothing, unless the file name happens to be a real description.

**How to fix:** Replace the alt text with a short description of what the image shows or does, as you would describe it to someone over the phone.

#### Alt text repeats "image of" {#image-alt-redundant}

`image-alt-redundant` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Tip** · Confidence: certain

**Why it's flagged:** WCAG 1.1.1 asks for alt text that conveys the image's purpose; screen readers already say "image", so words such as "image of" at the start of the alt text are heard twice.

**How to fix:** Remove words like "image of" or "picture of" from the start of the alt text. Screen readers already announce that it is an image. Keep the word only when the medium matters, e.g. "Oil painting of…".

#### Alt text is very long {#image-alt-long}

`image-alt-long` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 1.1.1 asks for a text alternative that serves the image's purpose; this alt text is very long and cannot be skimmed, which may be fine for a complex image, though a caption or nearby description usually works better.

**How to fix:** Keep alt text to a sentence or two. If the image carries detailed information — a chart, a diagram, a map — give a short alt text and put the full description in the caption or the surrounding text.

#### Image map area has no text {#area-missing-alt}

`area-missing-alt` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 1.1.1 asks for a text alternative for images that convey meaning, and each clickable area of an image map is a link announced by its alt text; this area has none, so screen readers read it as an unnamed link.

**How to fix:** Add an alt attribute to every &lt;area&gt; describing where the link goes, e.g. alt="Northern region sales".

#### Image button has no text {#input-image-missing-alt}

`input-image-missing-alt` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 1.1.1 asks for a text alternative for images, and an image used as a button needs alt text naming its action; this one has none, so it is announced as an unlabelled button.

**How to fix:** Add an alt attribute that says what the button does, e.g. alt="Search" — not what the picture looks like.

#### Alt text is a placeholder {#image-alt-placeholder}

`image-alt-placeholder` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 1.1.1 asks that meaningful images have a real description and decorative ones empty alt text; this alt text is a placeholder such as "image", which does neither.

**How to fix:** Select the image and, in the block sidebar, replace the alternative text with what the image shows or what it is for, e.g. "Acme Bakery logo" rather than "logo". If the image is only decoration, clear the field (or switch on "Decorative image") so screen readers skip it.

#### Alt text repeats nearby text {#image-alt-duplicates-text}

`image-alt-duplicates-text` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 1.1.1 asks that alt text serves the same purpose as the image; this alt text repeats text right next to it, so screen reader users hear it twice, and empty alt text may suit an image the text already describes.

**How to fix:** Make the alt text describe what the picture shows, and let the caption or heading add context — they are read out too. If the image only illustrates the text beside it, mark it decorative (Image block settings &gt; Accessibility) so it is skipped. For a linked image with text in the same link, an empty alt is right.

### Links & buttons

#### Link has no text {#link-no-name}

`link-no-name` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html), [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 2.4.4 and 4.1.2 ask that every link has a name that says where it goes; this link has no text, alt text or label, so screen readers announce only the address or "link".

**How to fix:** Give the link visible text. If the link is an image, add alt text to the image that says where the link goes (e.g. "Download the 2026 annual report"). For icon-only links, add an aria-label.

#### Link text is vague {#link-ambiguous-text}

`link-ambiguous-text` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 2.4.4 asks that a link's purpose is clear from its text or its context; this link text, such as "read more", says nothing on its own, which is fine when the sentence or heading around it makes the destination clear.

**How to fix:** Rewrite the link so its text names the destination, e.g. "Read our refund policy" instead of "click here". If the design needs short text, keep it visible and add the full purpose with an aria-label that starts with the visible words.

**Good to know:** Vague phrases are recognised in English, German, French, Spanish, Italian, Dutch and Portuguese, using the language of the page or of the text. Developers can change the lists with the `lumtera_vague_link_phrases` filter.

#### Link does not go anywhere {#link-fake}

`link-fake` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 4.1.2 asks that controls expose the right role; this link has no real destination and acts as a button, so keyboard and screen reader users meet a link that does not behave like one, unless a script gives it a proper role and keyboard support.

**How to fix:** If it takes the visitor to another page or section, give it a real URL. If it performs an action (opens a menu, plays a video), use a Button block or &lt;button&gt; element instead, which works with Enter and Space and is announced as a button.

**Good to know:** A `#` link that opens a submenu is not reported: a link with `aria-haspopup` or `aria-expanded`, a `menuitem` in a menu, or a link with a submenu next to it or inside it. A `#` link with no submenu, and `javascript:` links, are still reported.

#### Link opens a new tab without warning {#link-new-window}

`link-new-window` · WCAG [3.2.5 Change on Request](https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html) · Level AAA · Default: **Tip** · Confidence: certain

**Why it's flagged:** WCAG 3.2.5 (level AAA) asks that changes of context happen only when people ask for them; this link opens a new tab or window without saying so, which is fine when the link text warns about it.

**How to fix:** Either turn off "Open in new tab" in the link settings, or add "(opens in a new tab)" to the link text so people know before they click.

#### Button has no text {#button-no-name}

`button-no-name` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 4.1.2 asks that every control has a name assistive technology can read; this button has no text, label or alt text, so screen readers announce only "button".

**How to fix:** Add visible text to the button that says what it does. For icon-only buttons, add an aria-label such as aria-label="Close menu".

#### Link opens a document file {#link-to-document}

`link-to-document` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 2.4.4 asks that links make clear where they lead, and linked documents are content too; this link opens a file such as a PDF, which Lumtera cannot check, so confirm the file is accessible and the link says what it opens.

**How to fix:** Check the document itself: it needs real headings, alt text for images, a set language and a logical reading order (for PDFs, export from Word or Google Docs as a "tagged" PDF, then run the Adobe Acrobat accessibility check). Consider also publishing the content as a normal page. In the link text, say what the file is and roughly how big, e.g. "2026 price list (PDF, 1.2 MB)". Once the document has been checked, dismiss this item.

#### Link text is a web address {#link-url-as-text}

`link-url-as-text` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Tip** · Confidence: certain

**Why it's flagged:** WCAG 2.4.4 asks that link text describes the destination; this link's text is a long web address, which screen readers read out symbol by symbol, while a short, recognisable domain is fine.

**How to fix:** Select the address in the editor and type words that describe the page instead, e.g. "Spring menu at Rosa's Café"; the link stays the same. If visitors need to see the address (for example in a printed handout), keep it but add the page name in front of it.

#### Same link text goes to different pages {#link-same-text-different-url}

`link-same-text-different-url` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 2.4.4 asks that each link's purpose can be told from its text and context; links with the same text here go to different pages, which is fine when the text around each one makes it clear.

**How to fix:** Make each link's text say where it goes, e.g. "Pricing for teams" and "Pricing for schools". If the links really lead to the same content (for example two addresses for one page), dismiss this item.

#### Image and text link go to the same page {#link-adjacent-duplicate}

`link-adjacent-duplicate` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Tip** · Confidence: certain

**Why it's flagged:** WCAG 2.4.4 asks that each link's purpose is clear; two links next to each other go to the same place, so keyboard and screen reader users meet the same destination twice, which is not a failure but is easy to combine.

**How to fix:** Use one link instead of two: remove the link from the image (select it and use Unlink in the toolbar), or put the image and the text inside the same link. In a Query Loop, you can turn off "Link to post" on the Post Featured Image block and keep it on the Post Title.

#### In-page link goes nowhere {#link-anchor-missing}

`link-anchor-missing` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 2.4.4 asks that links lead where their text says; this in-page link points at an ID that is not in the content, so it goes nowhere, unless the theme or a plugin adds that ID on the live page.

**How to fix:** Give the section the link should jump to a matching HTML anchor: select its block (usually a heading) and fill in Advanced &gt; HTML anchor with the text after the # in the link, spelled exactly the same. Or change the link to point at an anchor that exists.

#### Link or button may be too small to tap {#target-size-small}

`target-size-small` · WCAG [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · Level AA · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 2.5.8 asks that touch targets are at least 24 by 24 pixels or have enough space around them; the size set in this content is smaller, while links inside text and targets with enough spacing are exempt.

**How to fix:** Make the link or button at least 24 × 24 pixels, for example by making its icon larger or adding padding around it. Smaller targets pass only if nothing else clickable sits within 24 pixels of them. Links inside a sentence are exempt.

### Headings

#### Heading is empty {#heading-empty}

`heading-empty` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 1.3.1 asks that headings in code match real headings; this heading has no text, so it shows up as a blank entry in screen reader heading lists.

**How to fix:** Type the heading text, or delete the block. To add space between sections, use a Spacer block rather than an empty heading.

#### Heading level is skipped {#heading-skipped-level}

`heading-skipped-level` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 1.3.1 asks that the heading structure reflects the content; this heading skips a level, such as H2 to H4, which suggests a missing section to screen reader users, though a skipped level is not a barrier on its own.

**How to fix:** Choose heading levels by structure, not by size: sections of the post are H2, sub-sections inside them H3, and so on. To change how a heading looks, change its font size in the block settings instead of its level.

#### Content uses an H1 heading {#heading-h1-in-content}

`heading-h1-in-content` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 1.3.1 asks for a heading structure that matches the page; most themes show the post title as the page's H1, so another H1 in the content may compete with it, which is fine if your theme does not show the title as an H1.

**How to fix:** Change this heading to H2. Most themes already show the post title as the page's single H1. If your theme hides the title and you intend this to replace it, dismiss this tip.

#### Bold text may be a heading {#heading-possible}

`heading-possible` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 1.3.1 asks that text which looks like a heading is marked up as one; this short, bold paragraph before body text looks like a heading, which is fine if it is only emphasis.

**How to fix:** If this line introduces a section, turn the paragraph into a Heading block (type "/heading" or use the block's Transform menu). If it is just emphasis, dismiss this tip.

#### Heading is very long {#heading-too-long}

`heading-too-long` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 1.3.1 asks that markup matches what the content is; this heading is as long as a paragraph, which usually means body text made a heading for its size, and is fine if it really is a heading.

**How to fix:** If this text is not a section title, turn it into a Paragraph block (block toolbar &gt; Transform) and make it larger with Typography &gt; Size in the sidebar instead. If it is a title, shorten it and move the detail into the paragraph that follows.

#### Long content has no subheadings {#content-no-headings}

`content-no-headings` · WCAG [2.4.10 Section Headings](https://www.w3.org/WAI/WCAG22/Understanding/section-headings.html) · Level AAA · Default: **Tip** · Confidence: certain

**Why it's flagged:** WCAG 2.4.10 (level AAA) asks for headings that organise content into sections; this long passage has no subheadings, which is fine for short or single-topic text.

**How to fix:** Break the text into sections and give each one a Heading block (H2 for main sections, H3 inside them). Screen reader users can then jump from section to section, and everyone can skim to the part they need. Section headings are a level AAA recommendation.

### Forms

#### Form field has no label {#form-field-no-label}

`form-field-no-label` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html), [3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 4.1.2, 1.3.1 and 3.3.2 ask that each form field has a name and a label tied to it in code; this field has none (a placeholder is not a label), so screen reader users cannot tell what to enter.

**How to fix:** Add a visible &lt;label&gt; tied to the field with for="field-id", or wrap the field inside its label. In form-builder plugins, turn on the field's label (you can style it smaller, but keep it). A placeholder is not a label.

**Good to know:** Also covers fields built with ARIA roles such as `textbox`, `combobox` and `slider`. A field named only by its placeholder is **Needs review**, because the placeholder disappears once someone types.

#### Form field has more than one label {#form-field-multiple-labels}

`form-field-multiple-labels` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review** · Confidence: certain

**Why it's flagged:** WCAG 1.3.1 asks that labels are tied to their fields in code; this field has more than one label, and browsers and screen readers disagree on which to announce, so visitors may hear only part of it.

**How to fix:** Keep one &lt;label&gt; for the field and put all the label text in it. Extra help such as "We never share your email" belongs in a hint tied to the field with aria-describedby. In form-builder plugins, this usually means removing a label you added by hand next to the field's own label setting.

#### Options are not grouped with their question {#form-group-no-fieldset}

`form-group-no-fieldset` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 1.3.1 asks that groups shown on screen are also grouped in code; these related radio buttons or checkboxes have no fieldset and legend or named group, so each option is announced without its question, unless the options make sense on their own.

**How to fix:** Wrap the options in a &lt;fieldset&gt; and put the question in a &lt;legend&gt; as its first child, e.g. &lt;legend&gt;Preferred contact method&lt;/legend&gt;. In form plugins, look for a setting that shows the field label as a group label or legend; most do this for radio and checkbox fields. Alternatively, give the wrapper role="radiogroup" (or role="group") and an aria-labelledby pointing at the question.

#### Personal-data field has no autocomplete {#input-autocomplete-missing}

`input-autocomplete-missing` · WCAG [1.3.5 Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html) · Level AA · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 1.3.5 asks that fields collecting the visitor's own details say so with an autocomplete token; this field looks like it asks for a name, email, phone or address, which Lumtera guesses from its label, and fields about someone else are exempt.

**How to fix:** Add an autocomplete attribute naming what the field collects, such as autocomplete="email", "name", "tel", "street-address" or "postal-code". Most form plugins have an autocomplete setting on each field. Only fields that ask about the visitor themselves need it, so dismiss this item for fields asking about someone else (for example, a friend's email).

#### Autocomplete value is not valid {#input-autocomplete-invalid}

`input-autocomplete-invalid` · WCAG [1.3.5 Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html) · Level AA · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 1.3.5 asks that fields collecting the visitor's own details say so with a standard autocomplete token; this field's autocomplete value is not one browsers understand, so they ignore it and cannot fill in the field or tell assistive tools what it is for.

**How to fix:** Use one of the standard autocomplete values, such as "name", "email", "tel", "street-address", "postal-code" or "current-password", optionally preceded by "shipping" or "billing" (and, for phone numbers and emails, "home", "work" or "mobile"). To stop browsers filling in a field that is not about the visitor, use autocomplete="off".

**Good to know:** The value is checked against the HTML autofill rules. A misspelled or wrongly ordered value, such as `email-address` or `given-name billing`, is an **Error**. A value made only of unknown words, such as `autocomplete="nope"`, is **Needs review**: sites often use that to switch autofill off on fields that are not about the visitor.

#### Form asks for the same email twice {#form-redundant-entry}

`form-redundant-entry` · WCAG [3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html) · Level A · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 3.3.7 asks that visitors are not made to type the same information twice in one process; this looks like a confirmation field, which is allowed for passwords and where re-entering is essential.

**How to fix:** Remove the "confirm email" field. To catch typos, show the address back to the visitor before they submit, or send a confirmation email with a link. Most form plugins have a setting to turn the confirmation field off.

#### Password field blocks pasting or password managers {#password-paste-blocked}

`password-paste-blocked` · WCAG [3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) · Level AA · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 3.3.8 asks that signing in does not depend on remembering or retyping a password; this password field blocks pasting or password managers, which turns signing in into a memory test.

**How to fix:** Remove the onpaste (or oncopy/ondrop) handler that stops pasting, and replace autocomplete="off" with autocomplete="current-password" on sign-in forms or autocomplete="new-password" on registration and reset forms. Visitors can then paste or let their password manager fill in the field.

#### Check the CAPTCHA has an accessible alternative {#captcha-present}

`captcha-present` · WCAG [3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) · Level AA · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 3.3.8 asks that signing in or proving you are human does not depend on a puzzle or memory test unless there is an alternative or help; a CAPTCHA was found, and whether it is a barrier depends on how it is set up, for example with an invisible or audio option.

**How to fix:** Prefer spam protection that asks visitors nothing, such as an invisible or score-based CAPTCHA, a honeypot field or your form plugin's built-in spam filter. If a challenge must stay, make sure it does not require typing distorted text, solving a sum or memorizing something, offers an audio option, and that visitors can get help another way (for example by email). For sign-in and registration forms this is required by WCAG 2.2 (3.3.8).

#### Dropdown changes page when an option is chosen {#select-navigates}

`select-navigates` · WCAG [3.2.2 On Input](https://www.w3.org/WAI/WCAG22/Understanding/on-input.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 3.2.2 asks that changing a setting, such as picking an option in a dropdown, does not take visitors somewhere else unless they were told first; this dropdown appears to load another page as soon as its value changes, which is fine only if there is a button to confirm the choice or visitors are warned beforehand.

**How to fix:** Add a "Go" button next to the dropdown and remove the automatic jump, so the page only changes when the visitor presses the button. For WordPress's Categories or Archives dropdown, you can switch the widget or block to show a list of links instead of a dropdown. Check the result with the keyboard: Tab to the dropdown, use the arrow keys to move through the options, and make sure you stay on the page.

#### Dragging may be the only way to use this {#drag-without-alternative}

`drag-without-alternative` · WCAG [2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html), [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) · Level AA · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 2.5.7 asks that anything done by dragging can also be done with single clicks or taps, and 2.1.1 that it works from the keyboard; this looks like something that is dragged, which is fine if buttons or click-to-place offer another way.

**How to fix:** Make sure every drag action has a simple alternative: "Move up" and "Move down" buttons for sortable lists, or clicking an item and then clicking where it should go. For sliders, let visitors click a point on the track or use a number field, and make the slider focusable with the arrow keys. Then try it yourself with only the keyboard (Tab, Enter and the arrow keys) and with single clicks. If the plugin providing this feature has an accessible mode or setting, turn it on.

### Tables

#### Table has no header cells {#table-no-headers}

`table-no-headers` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 1.3.1 asks that data tables mark their header cells; this table has none, so screen readers read its values without their row or column names, unless it is a layout table marked role="presentation".

**How to fix:** Select the Table block and turn on "Header section" in its settings, then put column names in the header row. If the table is only used for layout, rebuild it with Columns blocks instead.

#### Table header cell is empty {#table-empty-header}

`table-empty-header` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip** · Confidence: certain

**Why it's flagged:** WCAG 1.3.1 asks that table headers are marked up so cells are read with them; this header cell is empty, so the cells under it have no header to announce, while the top-left corner cell is fine to leave empty.

**How to fix:** Type a short name for the column or row into the header cell.

#### Table may be used for layout {#table-layout}

`table-layout` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 1.3.1 asks that tables in code hold tabular data; this table seems to be used only to place things side by side, so screen readers announce rows and columns that mean nothing, which is fine if it really holds data.

**How to fix:** If the table only places content side by side, rebuild it with a Columns, Row or Grid block. If it really holds data, add a header row (Table block settings &gt; Header section) so each value is announced with its heading. For layout tables you cannot change, add role="presentation" to the table element.

#### Table has empty rows {#table-empty-row}

`table-empty-row` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip** · Confidence: certain

**Why it's flagged:** WCAG 1.3.1 asks that the structure in code matches the content; this table has empty rows, usually left over from editing, which screen readers count and read as blank cells.

**How to fix:** Delete the empty rows: click into a cell of the row and choose Delete row from the Table block toolbar. To add space between rows, use the table's styles instead of blank rows.

### Audio, video & embeds

#### Media plays sound automatically {#media-autoplay-audio}

`media-autoplay-audio` · WCAG [1.4.2 Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 1.4.2 asks that sound playing for more than three seconds can be paused or turned down on its own; this audio or video starts playing with sound by itself, which drowns out screen readers, unless it is muted.

**How to fix:** Turn off "Autoplay" in the Audio or Video block settings. If a video must start by itself, also turn on "Muted" so it plays silently.

**Good to know:** Clips of 3 seconds or less are not reported. When the player has native controls or its own Pause or Mute button, the finding is **Needs review** instead of an error.

#### Moving video cannot be paused {#media-no-pause}

`media-no-pause` · WCAG [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 2.2.2 asks that content moving for more than five seconds can be paused or stopped; this video plays and loops by itself without controls, which is fine if the theme adds a working pause button.

**How to fix:** Turn on "Playback controls" for the video, turn off "Loop" so it stops within five seconds, or use a still image instead. Check whether your theme already adds a pause button before dismissing.

#### Video has no captions track {#video-no-captions}

`video-no-captions` · WCAG [1.2.2 Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 1.2.2 asks for captions on prerecorded video with sound; this video has no captions track, which is fine if captions are burned into the picture or the video has no speech.

**How to fix:** In the Video block settings, use "Text tracks" to upload a captions file (.vtt) and set its kind to Captions. If the captions are already part of the picture, or the video has no speech, dismiss this item.

#### Embedded frame has no title {#iframe-no-title}

`iframe-no-title` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 4.1.2 asks that each frame has a name; this iframe has no title, so screen readers cannot say what it holds before visitors enter it, unless it is hidden from assistive technology.

**How to fix:** Add a title attribute describing the content, e.g. title="Map of our Brooklyn office". Embeds added with WordPress embed blocks get one automatically — this is usually pasted embed code.

**Good to know:** A frame taken out of the keyboard order (`tabindex="-1"`) or marked `role="none"` is **Needs review** instead of an error.

#### Scrolling or blinking text {#marquee-blink}

`marquee-blink` · WCAG [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 2.2.2 asks that moving or blinking content can be paused; marquee and blink elements move or blink with no way to stop them.

**How to fix:** Replace the &lt;marquee&gt; or &lt;blink&gt; element with static text. To draw attention, use a heading, a color-contrasted callout or a Group block with a background.

#### Check captions on embedded video {#video-embed-captions}

`video-embed-captions` · WCAG [1.2.2 Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 1.2.2 asks for captions on prerecorded video; this video is embedded from another service, where Lumtera cannot see its captions, so confirm they exist and are accurate.

**How to fix:** Open the video on the service it is hosted on and check it has accurate captions (on YouTube: YouTube Studio &gt; Subtitles; on Vimeo: the video's Distribution &gt; Subtitles). Automatic captions often mishear names and terms, so review and correct them. If the video has no speech or important sounds, or captions are already shown in the picture, dismiss this item. Separately, if important information is only shown visually, WCAG 1.2.5 (AA) also asks for audio description or a text alternative.

#### Check that the slider can be paused {#carousel-motion}

`carousel-motion` · WCAG [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · Level A · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 2.2.2 asks that content moving on its own for more than five seconds can be paused, stopped or hidden; this looks like a slider, which may advance by itself, and it is fine if it does not auto-play or has a working pause control.

**How to fix:** View the page and check: if the slides change by themselves, there must be a visible pause or stop button, or the movement must stop within five seconds. The simplest fix is to turn off "Autoplay" in the slider block or plugin settings. Also check the previous/next buttons and dots can be reached and used with the Tab and Enter keys (WCAG 2.1.1). If the slider only moves when a visitor clicks, and works from the keyboard, dismiss this item.

#### Animated image may need a way to pause {#animated-gif}

`animated-gif` · WCAG [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), [2.3.1 Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 2.2.2 asks that anything moving for more than five seconds can be paused, and 2.3.1 that nothing flashes more than three times a second; this image is, or may be, animated, and it is fine if it stops within five seconds, does not flash, or the page has a pause control. For images stored on this site, Lumtera reads the file to see whether it has more than one frame.

**How to fix:** If the image moves for more than five seconds, replace it with a still image, an animation that stops after a few loops, or a Video block with "Playback controls" turned on so visitors can pause it. Also make sure it does not flash more than three times a second. If it stops quickly, or the page offers a working pause button, dismiss this item.

**Good to know:** For images stored on your site, Lumtera reads the file and counts its frames. It recognises animated GIF, APNG and WebP images.

#### Check audio has a transcript {#audio-no-transcript}

`audio-no-transcript` · WCAG [1.2.1 Audio-only and Video-only (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 1.2.1 asks for a text alternative to prerecorded audio; no transcript or link to one was found near this player, which is fine if a transcript is elsewhere on the page or the audio only repeats text already there.

**How to fix:** Publish a text transcript of the recording: everything that is said, who says it, and any important sounds. Put it right below the player, or link to it with text that includes the word "transcript". Music with no spoken words does not need one; dismiss this item in that case.

#### Embedded frames share the same title {#iframe-duplicate-title}

`iframe-duplicate-title` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Needs review** · Confidence: certain

**Why it's flagged:** WCAG 4.1.2 asks that each frame has a name that identifies it; different frames here share the same title, so screen reader users cannot tell them apart, which is fine when they show the same content.

**How to fix:** Give each embedded frame a title that says what it contains, e.g. title="Video: how to repot a cactus" and title="Map of our Leeds shop". Pasted embed codes often come with a generic title such as "YouTube video player"; edit it in the HTML.

### Structure & text

#### Text is formatted as a list by hand {#list-fake}

`list-fake` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 1.3.1 asks that lists shown on screen are marked up as lists; these paragraphs start with dashes, bullets or numbers, so screen readers do not announce them as a list, which is fine if they are not really one.

**How to fix:** Convert the lines into a List block (select the paragraphs and choose Transform → List). Screen readers then announce "list, 4 items" and let visitors skip it.

#### List item is outside a list {#list-item-orphan}

`list-item-orphan` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review** · Confidence: certain

**Why it's flagged:** WCAG 1.3.1 asks that list structure is correct in code; this list item is not inside a list, so it is not announced as part of one, unless a script places it in a list later.

**How to fix:** Wrap the items in a &lt;ul&gt; or &lt;ol&gt;, or recreate them with a List block.

#### Empty paragraphs used for spacing {#empty-paragraph-spacing}

`empty-paragraph-spacing` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip** · Confidence: certain

**Why it's flagged:** WCAG 1.3.1 asks that markup conveys structure rather than layout; several empty paragraphs in a row are used here as spacing, and some screen readers announce each one as "blank".

**How to fix:** Delete the empty paragraph blocks. To add space, use a Spacer block, or the block's Dimensions settings (margin and padding) in the sidebar.

#### Emoji used as bullets or icons {#emoji-as-icon}

`emoji-as-icon` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 1.3.1 asks that structure shown on screen is also available in code; emoji used as bullets or as the only text of a link are read out by their full names, which is fine when the emoji is meant to be heard.

**How to fix:** For lines that start with an emoji, use a List block instead, so the lines are announced as a list; drop the emoji or keep it at the end of the line. For a link or button that shows only an emoji, add text that says what it does (it can be visually hidden), or an aria-label such as aria-label="Share on WhatsApp".

#### Text is justified {#text-justified}

`text-justified` · WCAG [1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) · Level AAA · Default: **Tip** · Confidence: certain

**Why it's flagged:** WCAG 1.4.8 (level AAA) asks that text is not justified to both margins; justified text gets uneven gaps between words that make it harder to read for many people with dyslexia or low vision.

**How to fix:** Align the text to the left (or to the right in right-to-left languages) instead of justifying it. Justified text leaves uneven gaps between words that make paragraphs harder to follow, especially for people with dyslexia. This is a level AAA recommendation, not a requirement for AA conformance.

#### Underlined text looks like a link {#text-underline-not-link}

`text-underline-not-link` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 1.3.1 asks that meaning shown on screen is also available in code; underlined text that is not a link looks clickable and its emphasis is not announced, which is fine if the underline is a style readers understand.

**How to fix:** Remove the underline (select the text and turn off Underline in the toolbar, or reset Typography &gt; Decoration). To stress a word, use bold or italics instead, which are also announced as emphasis. Keep underlines for links, so visitors can tell what they can click.

#### Text is very small {#text-too-small}

`text-too-small` · WCAG [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) · Level AA · Default: **Tip** · Confidence: certain

**Why it's flagged:** No WCAG criterion sets a minimum font size, but WCAG 1.4.4 asks that text stays readable when enlarged; text set below 12 pixels here is hard to read for many people, so this is a tip only.

**How to fix:** Select the block and choose a larger size under Typography &gt; Size, ideally the default body size. Keep text at 12px or larger; fine print is still content visitors need to read. Set sizes in rem or em rather than px so text grows when visitors change their browser's text size.

#### Long passage in capital letters {#text-all-caps}

`text-all-caps` · WCAG [1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) · Level AAA · Default: **Tip** · Confidence: certain

**Why it's flagged:** WCAG 1.4.8 (level AAA) is about text that is easy to read; long runs of capital letters are slower to read and some screen readers spell them out, which is fine for short labels and acronyms.

**How to fix:** Write the text in normal sentence case. Capitals are harder to read in longer passages, and some screen readers spell typed capitals out letter by letter. For emphasis, use bold instead. If the design calls for capitals, type the text normally and set Typography &gt; Letter case to uppercase, and keep it to short labels. This is a readability recommendation, not a WCAG AA requirement.

#### Page refreshes or redirects on a timer {#meta-refresh}

`meta-refresh` · WCAG [2.2.1 Timing Adjustable](https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html), [3.2.5 Change on Request](https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 2.2.1 asks that visitors can turn off, adjust or extend any time limit; this page tells the browser to reload or leave after a set number of seconds, which can cut people off mid-read. An instant redirect has no time limit and is only a tip (WCAG 3.2.5, level AAA).

**How to fix:** Remove the timed refresh. If the page has moved, set up a redirect on the server instead, for example with a redirect plugin or your host's settings, so visitors arrive at the new address straight away. If content needs to update, let visitors choose when, with a "Refresh" link or button. If a theme or plugin adds the tag, check its settings or ask its developer.

**Good to know:** An immediate redirect (0 seconds) is a **Tip** instead: a server redirect is better, but it is not a barrier.

#### Instruction may rely on shape, position, color or sound {#sensory-language}

`sensory-language` · WCAG [1.3.3 Sensory Characteristics](https://www.w3.org/WAI/WCAG22/Understanding/sensory-characteristics.html), [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) · Level A · Default: **Tip** · Confidence: possible

**Why it's flagged:** WCAG 1.3.3 asks that instructions do not rely only on shape, size, position or sound, and 1.4.1 that they do not rely only on color; this sentence seems to point to something that way, which is fine when the thing is also named in the text.

**How to fix:** Name the thing as well as describing it, using the words visitors see on it: write "select Submit (the round green button)" instead of "click the round green button", or "use the Search box in the sidebar" instead of "use the box on the right". Remember that on phones, things "on the right" often move below the content. If the text already names it, dismiss this item.

**Good to know:** The built-in phrase list is English. Developers can add phrases, also for other languages, with the `lumtera_sensory_phrases` filter.

### Color

#### Text color has low contrast {#color-contrast}

`color-contrast` · WCAG [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · Level AA · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 1.4.3 asks for a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text; the text and background colors set in this content fall below that, while logos and purely decorative or disabled text are exempt.

**How to fix:** Select the block and open Styles → Color. Pick a darker text color or a lighter background (or the reverse) until the editor's own contrast warning disappears. Normal text needs 4.5:1; large text (24px, or 18.66px bold) needs 3:1.

**Good to know:** Disabled buttons and fields, and the labels of disabled fields, are left out, as WCAG allows. Text with an inline `text-shadow` is **Needs review**, because the shadow can change how readable it is.

### ARIA & keyboard

#### Hidden element can still be focused {#aria-hidden-focusable}

`aria-hidden-focusable` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) · Level A · Default: **Error** · Confidence: certain

**Why it's flagged:** WCAG 4.1.2 asks that every control exposes a name and role, and 2.4.3 that focus moves in a meaningful order; this element is hidden from screen readers with aria-hidden but can still take keyboard focus, so keyboard users land on something that announces nothing.

**How to fix:** Either remove aria-hidden="true", or add tabindex="-1" to every link, button and field inside the hidden element so keyboard focus skips it too.

#### Unknown ARIA role {#aria-invalid-role}

`aria-invalid-role` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 4.1.2 asks that assistive technology can tell what each element is; this role is not one ARIA defines, so it is ignored and the element loses the meaning the author intended.

**How to fix:** Correct the spelling of the role, or remove the role attribute. Native HTML elements (button, nav, ul) already carry the right role and are the better choice.

#### Label points to a missing element {#aria-broken-reference}

`aria-broken-reference` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review** · Confidence: certain

**Why it's flagged:** WCAG 1.3.1 asks that relationships shown on screen are also available in code; this label or description points at an ID that is not in the content, so the relationship is lost, unless the theme or a script adds that element to the page.

**How to fix:** Make sure the referenced ID exists in the content and is spelled exactly the same (IDs are case-sensitive). This often breaks when a block is copied and its IDs are regenerated.

#### Duplicate ID {#duplicate-id}

`duplicate-id` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Tip** · Confidence: certain

**Why it's flagged:** WCAG 4.1.2 relies on unique IDs so that labels and references reach the right element; this ID appears more than once, which matters most when a label, ARIA attribute or link points at it.

**How to fix:** Give each element a unique ID. In the block editor, check Advanced → HTML anchor on copied blocks, which keep the original's anchor.

#### Positive tabindex changes the focus order {#tabindex-positive}

`tabindex-positive` · WCAG [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) · Level A · Default: **Needs review** · Confidence: certain

**Why it's flagged:** WCAG 2.4.3 asks that focus moves in an order that keeps meaning; a tabindex above 0 moves this element to the front of the whole page's Tab order, which is rarely what visitors expect.

**How to fix:** Change the tabindex to 0 (or remove it) and put the element where it belongs in the content order instead.

#### Accessible name leaves out the visible text {#label-in-name}

`label-in-name` · WCAG [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 2.5.3 asks that a control's accessible name contains its visible text; this aria-label leaves out the visible words, so voice-control users who say what they see get no match, unless the visible text is hidden by the theme.

**How to fix:** Change the aria-label so it contains the visible words, ideally at the start: for a button showing "Subscribe", use "Subscribe to our newsletter", not "Sign up". Often the simplest fix is to remove the aria-label altogether (in the block editor, use the block's "Edit as HTML" option, or the label setting of the plugin that added it) and let the visible text be the name.

**Good to know:** Always **Needs review**: short labels, icons and abbreviations are often fine, and a person can confirm them in seconds.

#### Only a tooltip names this control {#name-from-title-only}

`name-from-title-only` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Needs review** · Confidence: likely

**Why it's flagged:** WCAG 4.1.2 asks that controls have an accessible name; this element is named only by its title attribute, which touch and keyboard users never see and some screen readers skip.

**How to fix:** Give the control a name everyone can perceive: visible text for a link or button, or a visible &lt;label&gt; for a form field. For icon-only links and buttons, add an aria-label with the same words as the tooltip. You can keep the title attribute, but do not rely on it.

### Language

#### Language code is invalid {#lang-invalid}

`lang-invalid` · WCAG [3.1.2 Language of Parts](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html) · Level AA · Default: **Needs review** · Confidence: certain

**Why it's flagged:** WCAG 3.1.2 asks that changes of language are marked in code so screen readers pronounce them correctly; this lang value is not a valid language code, so the passage may be read with the wrong voice.

**How to fix:** Use a standard language code such as lang="fr", lang="es-MX" or lang="zh-Hant". In the editor, select the text and use the Language format in the toolbar.

**Good to know:** Codes are looked up in the list of real language codes, so `em-US` or `eng` are reported and `en-US` is not. A `lang` attribute on an element with no text of its own is not reported.

## Whole-page checks {#whole-page-checks}

The checks above read your content. The **33 whole-page checks** below run in your browser on the page as it is rendered, with your theme, menus, footer and page-builder output. They run in [review mode](/review-mode), and in [page checks](/pro/page-checks) with Lumtera Pro, on the same engine, so both give the same results. Like any check, you can change their severity or switch them off under <span class="screen-path">Lumtera → Settings → Checks</span>.

The keyboard, menu and text-spacing checks run when you ask for them, because they move focus and change the page for a moment. Everything else runs when the page has loaded.

### Page structure

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Page has no title](#page-title-missing) | `page-title-missing` | 2.4.2 | A | Error |
| [Page title does not describe the page](#page-title-generic) | `page-title-generic` | 2.4.2 | A | Needs review |
| [Page language is missing or not valid](#page-lang) | `page-lang` | 3.1.1 | A | Error |
| [No main landmark](#page-no-main) | `page-no-main` | 1.3.1 | A | Needs review |
| [More than one main landmark](#page-many-main) | `page-many-main` | 1.3.1 | A | Needs review |
| [Landmarks of the same kind share a name](#page-landmark-labels) | `page-landmark-labels` | 1.3.1 | A | Needs review |
| [Skip link goes nowhere](#page-skip-broken) | `page-skip-broken` | 2.4.1 | A | Error |
| [No "Skip to content" link](#page-no-skip) | `page-no-skip` | 2.4.1 | A | Needs review |
| [Page has no H1 heading](#page-no-h1) | `page-no-h1` | 1.3.1 | A | Needs review |
| [More than one H1 heading](#page-many-h1) | `page-many-h1` | 1.3.1 | A | Needs review |
| [Heading level skipped](#page-heading-skip) | `page-heading-skip` | 1.3.1 | A | Needs review |

### Color and contrast

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Text has low contrast](#page-contrast) | `page-contrast` | 1.4.3 | AA | Error |
| [Text over an image: check contrast](#page-contrast-image) | `page-contrast-image` | 1.4.3 | AA | Needs review |
| [Controls or icons are hard to see](#page-nontext-contrast) | `page-nontext-contrast` | 1.4.11 | AA | Needs review |
| [Focus indicator has low contrast](#page-focus-contrast) | `page-focus-contrast` | 1.4.11 | AA | Needs review |
| [Links look the same as the text around them](#page-link-color) | `page-link-color` | 1.4.1 | A | Error |

### Layout, zoom and spacing

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Zooming is disabled](#page-zoom-disabled) | `page-zoom-disabled` | 1.4.4 | AA | Error |
| [Page scrolls sideways at this width](#page-reflow) | `page-reflow` | 1.4.10 | AA | Needs review |
| [Small, crowded click target](#page-target-size) | `page-target-size` | 2.5.8 | AA | Needs review |
| [Text is cut off or overlaps when text spacing is increased](#page-text-spacing) | `page-text-spacing` | 1.4.12 | AA | Needs review |
| [Items are shown in a different order from the page's HTML](#page-visual-order) | `page-visual-order` | 1.3.2 | A | Needs review |

### Keyboard (Keyboard tab: Check keyboard access)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [No visible keyboard focus](#page-focus-visible) | `page-focus-visible` | 2.4.7 | AA | Needs review |
| [Keyboard focus goes somewhere invisible](#page-focus-ghost) | `page-focus-ghost` | 2.4.7, 2.4.3 | AA | Error |
| [Sticky bar hides the keyboard focus](#page-focus-obscured) | `page-focus-obscured` | 2.4.11 | AA | Needs review |
| [Tab order jumps back up the page](#page-focus-order) | `page-focus-order` | 2.4.3, 1.3.2 | A | Needs review |
| [Focusing an element changes the page](#page-focus-change) | `page-focus-change` | 3.2.1 | A | Error |
| [Pop-up content on focus does not close with Escape](#page-focus-dismiss) | `page-focus-dismiss` | 1.4.13 | AA | Needs review |
| [Possible keyboard trap](#page-focus-trap) | `page-focus-trap` | 2.1.2 | A | Needs review |

### Menus and pop-ups (Keyboard tab: Test menus and pop-ups)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Menu or disclosure toggle does not work as announced](#page-disclosure) | `page-disclosure` | 4.1.2, 2.1.1 | A | Error |
| [Submenu opens on hover only](#page-hover-menu) | `page-hover-menu` | 2.1.1 | A | Needs review |
| [Dialog or pop-up is hard to use with a keyboard](#page-dialog) | `page-dialog` | 2.4.3, 4.1.2 | A | Error |
| [Tabs do not work as tabs](#page-tabs) | `page-tabs` | 4.1.2, 2.1.1 | A | Error |
| [Carousel to test with the keyboard](#page-carousel) | `page-carousel` | 2.2.2, 2.1.1 | A | Needs review |

### Whole-page check details

#### Page has no title {#page-title-missing}

`page-title-missing` · WCAG [2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html) · Level A · Default: **Error**

**Why it's flagged:** Success criterion 2.4.2 asks for a title that names the page: browser tabs, bookmarks and screen readers announce it first.

**How to fix:** Themes add the title automatically when they support "title-tag". If yours does not, ask the theme author, or set titles with your SEO plugin.

#### Page title does not describe the page {#page-title-generic}

`page-title-generic` · WCAG [2.4.2 Page Titled](https://www.w3.org/WAI/WCAG22/Understanding/page-titled.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criterion 2.4.2 asks for a title that describes the page. A generic title is flagged for a person to judge, since it can be right on a home page.

**How to fix:** Give the post a descriptive title. If the theme or an SEO plugin builds the title, check its title template includes the post title.

#### Page language is missing or not valid {#page-lang}

`page-lang` · WCAG [3.1.1 Language of Page](https://www.w3.org/WAI/WCAG22/Understanding/language-of-page.html) · Level A · Default: **Error**

**Why it's flagged:** Success criterion 3.1.1 asks for the page's language in the markup, so screen readers pronounce it correctly.

**How to fix:** Set Settings → General → Site Language, and make sure the theme prints language_attributes() on its &lt;html&gt; element.

#### No main landmark {#page-no-main}

`page-no-main` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criterion 1.3.1 asks that the page's structure is in its markup. A main landmark lets screen reader users jump to the content.

**How to fix:** The theme should wrap the page content in a &lt;main&gt; element (or role="main"). Accessibility-ready themes do this.

#### More than one main landmark {#page-many-main}

`page-many-main` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criterion 1.3.1 asks that the page's structure is in its markup. One main landmark should hold the page's own content.

**How to fix:** Keep a single &lt;main&gt; element. A page builder or plugin may add its own; change the extra one to a &lt;div&gt; or &lt;section&gt;.

#### Landmarks of the same kind share a name {#page-landmark-labels}

`page-landmark-labels` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criterion 1.3.1 asks that structure is in the markup. Landmarks of the same kind need different names to be told apart.

**How to fix:** Give each one a short, different aria-label, for example "Main menu" and "Footer menu". In block themes, set it in the Navigation block's Advanced → ARIA label; in classic themes it is set in the theme's templates.

#### Skip link goes nowhere {#page-skip-broken}

`page-skip-broken` · WCAG [2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html) · Level A · Default: **Error**

**Why it's flagged:** Success criterion 2.4.1 asks for a way past blocks repeated on every page. A skip link whose target is missing does not move focus anywhere.

**How to fix:** Make the skip link's href match the id of the element that wraps the main content (for example href="#main" and &lt;main id="main"&gt;).

#### No "Skip to content" link {#page-no-skip}

`page-no-skip` · WCAG [2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criterion 2.4.1 asks for a way past blocks repeated on every page. A main landmark helps screen reader users; a skip link helps keyboard users.

**How to fix:** Add a "Skip to content" link as the first focusable item, pointing at the id of the main content. Most accessibility-ready themes include one.

#### Page has no H1 heading {#page-no-h1}

`page-no-h1` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criterion 1.3.1 asks that the page's structure is in its markup. Screen reader users often jump to the H1 to learn what a page is about.

**How to fix:** Most themes show the post title as the H1. If yours hides the title or uses a different level, add one H1 that names the page.

#### More than one H1 heading {#page-many-h1}

`page-many-h1` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criterion 1.3.1 asks that the page's structure is in its markup. One H1 that names the page is the usual pattern; several can be fine.

**How to fix:** Keep the post title as the only H1. The site name in the header, or H1 blocks in the content, usually belong at a lower level.

#### Heading level skipped {#page-heading-skip}

`page-heading-skip` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criterion 1.3.1 asks that the page's structure is in its markup. A skipped level can make screen reader users think a section is missing.

**How to fix:** Use heading levels in order. Headings in the header, sidebar or footer come from the theme or widgets; choose the level there, or style a lower level to look the same.

#### Text has low contrast {#page-contrast}

`page-contrast` · WCAG [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · Level AA · Default: **Error**

**Why it's flagged:** Success criterion 1.4.3 asks for a contrast ratio of at least 4.5:1 for text, or 3:1 for large text, measured here from the colours the browser paints.

**How to fix:** Darken the text or lighten its background (or the reverse) until the ratio reaches 4.5:1, or 3:1 for large text (24px, or 18.66px bold). On theme parts these colors usually come from the Site Editor's Styles, the Customizer or the page builder's global colors.

#### Text over an image: check contrast {#page-contrast-image}

`page-contrast-image` · WCAG [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · Level AA · Default: **Needs review**

**Why it's flagged:** Success criterion 1.4.3 asks for enough contrast between text and what is behind it. Over an image the contrast changes from pixel to pixel, so a person has to judge.

**How to fix:** Look at the text against the lightest and darkest parts of the image behind it, at every screen width. If any part is hard to read, add a darker (or lighter) overlay, or move the text off the busy area.

#### Controls or icons are hard to see {#page-nontext-contrast}

`page-nontext-contrast` · WCAG [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) · Level AA · Default: **Needs review**

**Why it's flagged:** Success criterion 1.4.11 asks that the parts of a control people need to see to find and use it, such as a field's edge or an icon, have a contrast ratio of at least 3:1 against adjacent colors.

**How to fix:** Give form fields a border (or a fill) and icons a color with a contrast ratio of at least 3:1 against the background next to them. These styles usually come from the theme's or form plugin's CSS, or the Site Editor's Styles.

#### Focus indicator has low contrast {#page-focus-contrast}

`page-focus-contrast` · WCAG [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) · Level AA · Default: **Needs review**

**Why it's flagged:** Success criterion 1.4.11 asks that visual information needed to identify a control's state, including the keyboard focus indicator, has a contrast ratio of at least 3:1 against adjacent colors.

**How to fix:** Make the focus outline (or ring) a color with at least 3:1 contrast against the background around the element, for example a 2px solid outline in a dark color on light backgrounds. Set it with :focus-visible in the theme's CSS.

#### Links look the same as the text around them {#page-link-color}

`page-link-color` · WCAG [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) · Level A · Default: **Error**

**Why it's flagged:** Success criterion 1.4.1 asks that colour is not the only way to tell things apart. A link in a sentence needs an underline, or 3:1 contrast with the text and another cue on focus.

**How to fix:** Underline links in body text (the simplest fix, usually a theme or Styles → Elements → Link setting). If you keep them without underlines, the link color needs 3:1 contrast against the text and a visible change such as an underline on hover and keyboard focus.

#### Zooming is disabled {#page-zoom-disabled}

`page-zoom-disabled` · WCAG [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) · Level AA · Default: **Error**

**Why it's flagged:** Success criterion 1.4.4 asks that text can be enlarged to 200%. Blocking pinch zoom stops that on phones.

**How to fix:** Remove "user-scalable=no" and any "maximum-scale" below 2 from the viewport meta tag. It usually comes from the theme's header or a performance plugin setting.

#### Page scrolls sideways at this width {#page-reflow}

`page-reflow` · WCAG [1.4.10 Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) · Level AA · Default: **Needs review**

**Why it's flagged:** Success criterion 1.4.10 asks that content fits a 320 pixel wide window without scrolling in two directions, except content such as tables and maps.

**How to fix:** Find the element that sticks out (often a wide table, image, embed or fixed-width block) and let it shrink: max-width: 100%, or wrap tables so they scroll on their own. Then test with the window 320 pixels wide, or zoomed to 400%.

#### Small, crowded click target {#page-target-size}

`page-target-size` · WCAG [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · Level AA · Default: **Needs review**

**Why it's flagged:** Success criterion 2.5.8 asks for targets of at least 24 by 24 pixels, or enough space around them. Whether another control does the same job needs a person.

**How to fix:** Make the link or button at least 24 × 24 pixels (padding counts), or add space so nothing else is within 12 pixels of its center. Icon links in headers and footers, and pagination, are the usual suspects. This is fine if another control on the page does the same thing at a good size.

#### Text is cut off or overlaps when text spacing is increased {#page-text-spacing}

`page-text-spacing` · WCAG [1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) · Level AA · Default: **Needs review**

**Why it's flagged:** Success criterion 1.4.12 asks that nothing is lost when people increase line, paragraph, letter and word spacing, as many people with dyslexia or low vision do. Lumtera applied that spacing for a moment and measured what changed. A box that cuts text off on purpose, with the full text available another way, is fine.

**How to fix:** Let boxes grow with their text: replace fixed heights with min-height, and remove overflow: hidden (or let the box scroll) where text sits. Avoid fixed widths on buttons and labels. Then check again with the text spacing test.

#### Items are shown in a different order from the page's HTML {#page-visual-order}

`page-visual-order` · WCAG [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criterion 1.3.2 asks that when the order of content matters, the order in the code matches it, because screen readers and the Tab key follow the code. Lumtera cannot tell whether the order matters here, so this is for review.

**How to fix:** Put the items in the order they are shown, for example by moving the block in the editor, instead of reordering them with CSS (order, row-reverse or grid placement). If the order does not change the meaning, as with a row of equal cards, dismiss this item.

#### No visible keyboard focus {#page-focus-visible}

`page-focus-visible` · WCAG [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) · Level AA · Default: **Needs review**

**Why it's flagged:** Success criterion 2.4.7 asks that keyboard focus is visible. Lumtera focused the element and nothing about how it looks changed. A theme can show focus in ways styles do not reveal (a script drawing a ring elsewhere), so a person should confirm by pressing Tab.

**How to fix:** Give links, buttons and form fields a clear focus style, for example a:focus-visible, button:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }, and remove any "outline: none" or "outline: 0" rule that has no replacement.

#### Keyboard focus goes somewhere invisible {#page-focus-ghost}

`page-focus-ghost` · WCAG [2.4.7 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html), [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) · Level AA · Default: **Error**

**Why it's flagged:** Success criteria 2.4.7 and 2.4.3 ask that keyboard focus is visible and moves in a meaningful order. Lumtera moved focus to this element and measured it afterwards: it could not be seen.

**How to fix:** Take hidden content out of the tab order while it is hidden: use display: none or visibility: hidden (or the inert attribute) on closed menus, drawers and slides, and show it again when it opens.

#### Sticky bar hides the keyboard focus {#page-focus-obscured}

`page-focus-obscured` · WCAG [2.4.11 Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) · Level AA · Default: **Needs review**

**Why it's flagged:** Success criterion 2.4.11 asks that a focused item is not entirely hidden by author content such as sticky headers. Lumtera focused each item, scrolled it to the edge of the window and checked what was on top of it.

**How to fix:** Add scroll-padding to the html element in your theme's CSS so the browser keeps focused items clear of the bar, and make cookie notices and chat widgets dismissible.

#### Tab order jumps back up the page {#page-focus-order}

`page-focus-order` · WCAG [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), [1.3.2 Meaningful Sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criteria 2.4.3 and 1.3.2 ask that focus moves in an order that keeps meaning. A jump back up the page is often a mistake, but can be intended, so a person should decide.

**How to fix:** Make the order in the HTML match the order on screen: remove positive tabindex values, and move content in the markup rather than with CSS order or absolute positioning.

#### Focusing an element changes the page {#page-focus-change}

`page-focus-change` · WCAG [3.2.1 On Focus](https://www.w3.org/WAI/WCAG22/Understanding/on-focus.html) · Level A · Default: **Error**

**Why it's flagged:** Success criterion 3.2.1 asks that receiving focus does not change the context. Lumtera saw the change right after focusing the element.

**How to fix:** Only change the page when someone activates a control (a click, Enter or Space), never when it merely receives focus. Look for focus or focusin handlers in the theme or plugin scripts.

#### Pop-up content on focus does not close with Escape {#page-focus-dismiss}

`page-focus-dismiss` · WCAG [1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html) · Level AA · Default: **Needs review**

**Why it's flagged:** Success criterion 1.4.13 asks that extra content shown on hover or focus can be dismissed without moving focus. Content that covers nothing, or reports an input error, is exempt, so a person should confirm.

**How to fix:** Let Escape hide content that appears on focus without moving focus, for example with a keydown handler that closes the submenu or tooltip. Content that does not cover anything else is exempt.

#### Possible keyboard trap {#page-focus-trap}

`page-focus-trap` · WCAG [2.1.2 No Keyboard Trap](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criterion 2.1.2 asks that keyboard users can always move focus away. A script stopped the Tab key here; press Tab and Shift+Tab yourself to confirm.

**How to fix:** Do not cancel the Tab key unless focus is kept inside an open modal dialog on purpose, and then let Escape close it. Widgets such as editors should say how to leave them.

#### Menu or disclosure toggle does not work as announced {#page-disclosure}

`page-disclosure` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) · Level A · Default: **Error**

**Why it's flagged:** Success criterion 4.1.2 asks that controls expose their name and state to assistive technology. Lumtera clicked the toggle and pressed Escape with a script, then checked the state and what appeared.

**How to fix:** Use a &lt;button&gt; with aria-expanded="false" as the toggle, switch aria-expanded to "true" when it opens what it controls, and give it a name. For menus, close the submenu on Escape and move focus back to the button.

#### Submenu opens on hover only {#page-hover-menu}

`page-hover-menu` · WCAG [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criterion 2.1.1 asks that everything works from the keyboard. Lumtera focused the parent link and the submenu stayed hidden, while a hover rule or script shows it for the mouse.

**How to fix:** Open the submenu for keyboard users too: add a toggle button with aria-expanded next to the parent link, or at least show it with :focus-within as well as :hover.

#### Dialog or pop-up is hard to use with a keyboard {#page-dialog}

`page-dialog` · WCAG [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html), [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Error**

**Why it's flagged:** Success criteria 2.4.3 and 4.1.2 ask that focus moves in a meaningful order and that a dialog is exposed as one, with a name. Lumtera opened it with a script click and checked where focus went.

**How to fix:** Use the &lt;dialog&gt; element opened with showModal(), or a role="dialog" container with aria-modal="true" and a name (aria-labelledby its heading). Move focus into it when it opens, close it on Escape, and move focus back to the button that opened it.

#### Tabs do not work as tabs {#page-tabs}

`page-tabs` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html), [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) · Level A · Default: **Error**

**Why it's flagged:** Success criteria 4.1.2 and 2.1.1 ask that the selected tab is exposed and that tabs work from the keyboard. Lumtera read the tabs and pressed an arrow key with a script.

**How to fix:** Follow the ARIA tabs pattern: role="tab" buttons inside role="tablist", aria-selected="true" on the current tab, aria-controls pointing at its role="tabpanel", tabindex="-1" on the other tabs, and Left/Right arrow keys to move between them.

#### Carousel to test with the keyboard {#page-carousel}

`page-carousel` · WCAG [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html), [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html) · Level A · Default: **Needs review**

**Why it's flagged:** Success criteria 2.2.2 and 2.1.1 ask that moving content can be paused and that everything works from the keyboard. Carousels often miss one of these, so a person should try it.

**How to fix:** Make sure the previous, next and pause buttons are real buttons with names, that slides out of view are out of the Tab order, and that moving slides can be paused and do not move on their own for more than five seconds.

## Lumtera Pro checks {#lumtera-pro-checks}

<p><span class="pro-pill">Pro</span> Lumtera Pro adds these checks to its page checks. They need a real browser and, for consistency, more than one page.</p>

### Form tests

Every Pro plan. See [Form tests](/pro/form-tests).

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Form errors are not announced to screen readers](#form-errors-not-announced) | `form-errors-not-announced` | 4.1.3, 3.3.1 | AA | Needs review |
| [No error appears when required fields are empty](#form-no-error-shown) | `form-no-error-shown` | 3.3.1 | A | Needs review |
| [Fields with errors are not marked as invalid](#form-error-no-invalid) | `form-error-no-invalid` | 3.3.1, 4.1.2 | A | Needs review |
| [Error messages are not linked to their fields](#form-error-not-linked) | `form-error-not-linked` | 3.3.1 | A | Needs review |
| [Focus does not move to the first error](#form-error-focus) | `form-error-focus` | 3.3.1 | A | Needs review |
| [A field has no lasting label](#form-error-label-lost) | `form-error-label-lost` | 3.3.2 | A | Needs review |
| [Errors are shown by colour alone](#form-error-color-only) | `form-error-color-only` | 1.4.1, 3.3.1 | A | Needs review |
| [Error messages could say what to fix](#form-error-not-specific) | `form-error-not-specific` | 3.3.3 | AA | Tip |

### Hover, focus and pressed states

Every Pro plan. See [Hover, focus and pressed states](/pro/page-checks).

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Text is hard to read on hover, focus or press](#page-state-contrast) | `page-state-contrast` | 1.4.3 | AA | Needs review |
| [Controls fade on hover, focus or press](#page-state-nontext) | `page-state-nontext` | 1.4.11 | AA | Needs review |

### Carousel motion

Every Pro plan. See [Carousel motion](/pro/page-checks).

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Carousel moves on its own](#page-carousel-motion) | `page-carousel-motion` | 2.2.2 | A | Error |

### Consistency across pages

Freelancer plan and up. See [Consistency across pages](/pro/consistency).

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Menus list their links in a different order on different pages](#consistency-navigation) | `consistency-navigation` | 3.2.3 | AA | Needs review |
| [Links to the same page have different names on different pages](#consistency-identification) | `consistency-identification` | 3.2.4 | AA | Needs review |
| [Help is in a different place on different pages](#consistency-help) | `consistency-help` | 3.2.6 | A | Needs review |
| [No search box or site map on the pages checked](#consistency-multiple-ways) | `consistency-multiple-ways` | 2.4.5 | AA | Needs review |

### Lumtera Pro check details

#### Form errors are not announced to screen readers {#form-errors-not-announced}

`form-errors-not-announced` · WCAG [4.1.3 Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) · Level AA · Default: **Needs review** · Every Pro plan

**Why it's flagged:** Success criterion 4.1.3 asks that messages such as "the form has errors" reach screen reader users, and 3.3.1 that errors are identified. Lumtera submitted the form empty in a hidden frame and watched for three seconds; it did not see the errors placed where screen readers announce them.

**How to fix:** Put the error summary in an element with role="alert" (or aria-live="assertive") that is already on the page before the errors appear, or move keyboard focus to an error summary or to the first field with an error. Many form plugins have an accessibility setting for this; if yours does not, ask its developer.

#### No error appears when required fields are empty {#form-no-error-shown}

`form-no-error-shown` · WCAG [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) · Level A · Default: **Needs review** · Every Pro plan

**Why it's flagged:** Success criterion 3.3.1 asks that when an input error is detected, the field is identified and the error described in text. Lumtera submitted the form empty in a hidden frame; it may have missed a message shown in an unusual way, so check by hand.

**How to fix:** When a required field is empty, the form should say so in text, next to the field and in a summary, and not send. Check the form's settings for its required fields, then test it again.

#### Fields with errors are not marked as invalid {#form-error-no-invalid}

`form-error-no-invalid` · WCAG [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html), [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Needs review** · Every Pro plan

**Why it's flagged:** Success criteria 3.3.1 and 4.1.2 ask that a field in error is identified to assistive technology too. With aria-invalid, screen readers say "invalid entry" when people move to the field.

**How to fix:** Add aria-invalid="true" to each field that has an error, and remove it once the error is fixed. Many form plugins do this in their accessibility settings.

#### Error messages are not linked to their fields {#form-error-not-linked}

`form-error-not-linked` · WCAG [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) · Level A · Default: **Needs review** · Every Pro plan

**Why it's flagged:** Success criterion 3.3.1 asks that the field in error is identified and the error described. An error message that sits next to a field but is not connected to it is not read when people move to that field.

**How to fix:** Give each error message an id and add it to the field's aria-describedby, so screen readers read the message when people move to the field. Many form plugins do this in their accessibility settings.

#### Focus does not move to the first error {#form-error-focus}

`form-error-focus` · WCAG [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) · Level A · Default: **Needs review** · Every Pro plan

**Why it's flagged:** Moving focus to the errors is not required by WCAG on its own, but it is the most reliable way for keyboard and screen reader users to find what to fix (3.3.1). Check it by hand with the keyboard.

**How to fix:** After a submission with errors, move keyboard focus to an error summary with links to each field, or to the first field with an error. Many form plugins have a setting to "scroll to" or "focus" the first error.

#### A field has no lasting label {#form-error-label-lost}

`form-error-label-lost` · WCAG [3.3.2 Labels or Instructions](https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions.html) · Level A · Default: **Needs review** · Every Pro plan

**Why it's flagged:** Success criterion 3.3.2 asks for labels or instructions when content requires input. Placeholder text disappears as soon as people type, and a label replaced by an error message leaves people guessing what the field was for.

**How to fix:** Give every field a visible label that stays on screen: a &lt;label&gt; element, not only placeholder text, and keep it when an error appears (show the error next to it instead).

#### Errors are shown by colour alone {#form-error-color-only}

`form-error-color-only` · WCAG [1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html), [3.3.1 Error Identification](https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html) · Level A · Default: **Needs review** · Every Pro plan

**Why it's flagged:** Success criterion 1.4.1 asks that colour is not the only way information is shown, and 3.3.1 that errors are described in text. People who cannot tell the colours apart, and screen reader users, would not know which fields to fix.

**How to fix:** Show a text message next to each field with an error (for example "Enter your email address"), not only a red border or background. An icon can help, but it needs text too.

#### Error messages could say what to fix {#form-error-not-specific}

`form-error-not-specific` · WCAG [3.3.3 Error Suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html) · Level AA · Default: **Tip** · Every Pro plan

**Why it's flagged:** Success criterion 3.3.3 asks that when an error is detected and a fix is known, the suggestion is given. A message read next to its field may be clear enough; this is a tip, not a failure.

**How to fix:** Make each message name the field and say what to enter, for example "Enter your email address, like name@example.com" instead of "This field is required." Most form plugins let you change the messages.

#### Text is hard to read on hover, focus or press {#page-state-contrast}

`page-state-contrast` · WCAG [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · Level AA · Default: **Needs review** · Every Pro plan

**Why it's flagged:** Success criterion 1.4.3 applies to text in every state. People move the pointer over links and buttons, and keyboard users see them focused, so the text must stay readable then too. The states were measured by applying the page's own hover, focus and press styles; styles added by scripts are not seen.

**How to fix:** Change the hover, focus and pressed colors (the :hover, :focus and :active styles in the theme's CSS, or the hover settings of the block or page builder) so the text keeps a contrast ratio of at least 4.5:1 against its background, or 3:1 for large text.

#### Controls fade on hover, focus or press {#page-state-nontext}

`page-state-nontext` · WCAG [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) · Level AA · Default: **Needs review** · Every Pro plan

**Why it's flagged:** Success criterion 1.4.11 asks that the parts of a control people need to see to find and use it keep a contrast ratio of at least 3:1, in each state. The states were measured by applying the page's own hover, focus and press styles.

**How to fix:** Keep icons, borders and fills that show where a control is at a contrast ratio of at least 3:1 against the colors next to them in every state: change the :hover, :focus or :active styles in the theme's CSS, or the builder's hover settings.

#### Carousel moves on its own {#page-carousel-motion}

`page-carousel-motion` · WCAG [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · Level A · Default: **Error** · Every Pro plan

**Why it's flagged:** Success criterion 2.2.2 asks that content which moves on its own for more than five seconds can be paused, stopped or hidden. Moving slides distract people with attention difficulties and move text away before some people finish reading it.

**How to fix:** Turn off autoplay in the slider's settings, or add a visible pause button that stops the movement (most slider plugins have a "pause" or "autoplay controls" option). Pausing only while the pointer is over the slider is not enough for keyboard and touch users.

#### Menus list their links in a different order on different pages {#consistency-navigation}

`consistency-navigation` · WCAG [3.2.3 Consistent Navigation](https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation.html) · Level AA · Default: **Needs review** · Freelancer plan and up

**Why it's flagged:** Lumtera Pro compares the pages its page checks have seen. Differences are for a person to review: a section can have its own menu, and finding none does not prove the site is consistent.

**How to fix:** Use the same menu, with its links in the same order, on every page that repeats it. Menus built in the Site Editor or under Appearance &gt; Menus are usually shared already.

#### Links to the same page have different names on different pages {#consistency-identification}

`consistency-identification` · WCAG [3.2.4 Consistent Identification](https://www.w3.org/WAI/WCAG22/Understanding/consistent-identification.html) · Level AA · Default: **Needs review** · Freelancer plan and up

**Why it's flagged:** Lumtera Pro compares the pages its page checks have seen. Differences are for a person to review: a section can have its own menu, and finding none does not prove the site is consistent.

**How to fix:** Give header and footer links that go to the same page the same name everywhere, e.g. always "Contact", not "Contact" on some pages and "Get in touch" on others.

#### Help is in a different place on different pages {#consistency-help}

`consistency-help` · WCAG [3.2.6 Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help.html) · Level A · Default: **Needs review** · Freelancer plan and up

**Why it's flagged:** Lumtera Pro compares the pages its page checks have seen. Differences are for a person to review: a section can have its own menu, and finding none does not prove the site is consistent.

**How to fix:** Keep contact details, help links and chat in the same region, in the same order, on every page that has them, usually in the header or footer template.

#### No search box or site map on the pages checked {#consistency-multiple-ways}

`consistency-multiple-ways` · WCAG [2.4.5 Multiple Ways](https://www.w3.org/WAI/WCAG22/Understanding/multiple-ways.html) · Level AA · Default: **Needs review** · Freelancer plan and up

**Why it's flagged:** Lumtera Pro compares the pages its page checks have seen. Differences are for a person to review: a section can have its own menu, and finding none does not prove the site is consistent.

**How to fix:** Offer more than one way to find pages: for example a search box in the header and a site map or a list of pages linked from the footer.

## What the content checks can't see

The content checks read the HTML your post produces: blocks, classic content, shortcode output and page-builder output. They don't see your theme's CSS, header, menus or footer. That's deliberate: every result is something you can fix in the editor, and your theme can never cause a false alarm there. Lumtera also checks your [site parts](/site-parts), such as menus, template parts and widget areas, when they are saved.

To check the rendered page with the theme included, use the [whole-page checks](#whole-page-checks) in [review mode](/review-mode#whole-page), or [page checks](/pro/page-checks) in Lumtera Pro.

Automated checks find only part of what WCAG covers. With the whole-page checks, they cover **37 of 55** WCAG 2.2 A and AA criteria, fully or in part; the content checks alone cover **25 of 55**. Covering a criterion means a check looks at it, not that your site meets it. See [What automated testing can't do](/manual-testing).
