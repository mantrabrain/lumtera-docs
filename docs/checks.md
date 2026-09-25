---
title: All checks
description: Every one of Lumtera's 64 content checks, with its WCAG 2.2 success criterion, level, default severity and how to fix what it finds.
---

# All checks

Lumtera runs **64 checks** on your content. 60 of them map to a WCAG 2.2 level A or AA success criterion. The other 4 are level AAA best practices, which is why they show up as tips.

Each check starts with a **default severity**:

| Severity | Shown as | Meaning |
| --- | --- | --- |
| `error` | **Error** | Lumtera is confident this is a barrier. Errors lower the score the most. |
| `warning` | **Needs review** | A machine can't decide this alone. A person should look and confirm or dismiss it. Lowers the score a little. |
| `notice` | **Tip** | Best practice. Worth fixing, but not a WCAG A/AA failure on its own. Doesn't affect the score. |

You can change any check's severity, or switch it off, under <span class="screen-path">Accessibility → Settings</span>. See [Settings](/settings#checks).

::: tip Linking to a check
Every check below has a stable anchor that matches its ID, for example [`/checks#image-missing-alt`](#image-missing-alt). The IDs never change, and they're the same ones you'll see in WP-CLI output, the REST API and the Abilities API.
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
| [Alt text is a generic word](#image-alt-placeholder) | `image-alt-placeholder` | 1.1.1 | A | Needs review |
| [Alt text repeats nearby text](#image-alt-duplicates-text) | `image-alt-duplicates-text` | 1.1.1 | A | Tip |

### Links & buttons (11)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Link has no text](#link-no-name) | `link-no-name` | 2.4.4 | A | Error |
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

### Forms (7)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Form field has no label](#form-field-no-label) | `form-field-no-label` | 4.1.2 | A | Error |
| [Form field has more than one label](#form-field-multiple-labels) | `form-field-multiple-labels` | 1.3.1 | A | Needs review |
| [Options are not grouped with their question](#form-group-no-fieldset) | `form-group-no-fieldset` | 1.3.1 | A | Needs review |
| [Personal-data field has no autocomplete](#input-autocomplete-missing) | `input-autocomplete-missing` | 1.3.5 | AA | Needs review |
| [Form asks for the same email twice](#form-redundant-entry) | `form-redundant-entry` | 3.3.7 | A | Tip |
| [Password field blocks pasting or password managers](#password-paste-blocked) | `password-paste-blocked` | 3.3.8 | AA | Error |
| [Check the CAPTCHA has an accessible alternative](#captcha-present) | `captcha-present` | 3.3.8 | AA | Needs review |

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
| [Check that the slider can be paused](#carousel-motion) | `carousel-motion` | 2.2.2 | A | Needs review |
| [GIF may be animated](#animated-gif) | `animated-gif` | 2.2.2 | A | Needs review |
| [Check audio has a transcript](#audio-no-transcript) | `audio-no-transcript` | 1.2.1 | A | Needs review |
| [Embedded frames share the same title](#iframe-duplicate-title) | `iframe-duplicate-title` | 4.1.2 | A | Needs review |

### Structure (8)

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

### Color (1)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Text color has low contrast](#color-contrast) | `color-contrast` | 1.4.3 | AA | Error |

### ARIA & keyboard (7)

| Check | ID | WCAG | Level | Default |
| --- | --- | --- | --- | --- |
| [Hidden element can still be focused](#aria-hidden-focusable) | `aria-hidden-focusable` | 4.1.2 | A | Error |
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

`image-missing-alt` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Error**

**How to fix:** Select the image and fill in "Alternative text" in the block settings. Describe what the image shows or does in context. If the image is purely decorative, mark it decorative so screen readers skip it: "Mark as decorative" in the Image settings (WordPress 7.1 and later), or "Decorative image" under Accessibility on older versions. Outside the block editor, give decorative images an empty alt (alt="").

#### Image has empty alt text {#image-empty-alt}

`image-empty-alt` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Needs review**

**How to fix:** If the image shows information visitors need — a product, a person, a chart, text — add alternative text describing it. If it is purely decorative, dismiss this item. In Elementor, set the alt text on the image in the Media Library. (Image blocks in the block editor are covered by their own decorative setting instead.) In Cover and Media & Text blocks an empty alt text is how WordPress marks an image decorative; if that was intended, dismiss this item with a reason.

#### Alt text looks like a file name {#image-alt-filename}

`image-alt-filename` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Needs review**

**How to fix:** Replace the alt text with a short description of what the image shows or does, as you would describe it to someone over the phone.

#### Alt text repeats "image of" {#image-alt-redundant}

`image-alt-redundant` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Tip**

**How to fix:** Remove words like "image of" or "picture of" from the start of the alt text. Screen readers already announce that it is an image. Keep the word only when the medium matters, e.g. "Oil painting of…".

#### Alt text is very long {#image-alt-long}

`image-alt-long` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Tip**

**How to fix:** Keep alt text to a sentence or two. If the image carries detailed information — a chart, a diagram, a map — give a short alt text and put the full description in the caption or the surrounding text.

#### Image map area has no text {#area-missing-alt}

`area-missing-alt` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Error**

**How to fix:** Add an alt attribute to every &lt;area&gt; describing where the link goes, e.g. alt="Northern region sales".

#### Image button has no text {#input-image-missing-alt}

`input-image-missing-alt` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Error**

**How to fix:** Add an alt attribute that says what the button does, e.g. alt="Search" — not what the picture looks like.

#### Alt text is a generic word {#image-alt-placeholder}

`image-alt-placeholder` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Needs review**

**How to fix:** Select the image and, in the block sidebar, replace the alternative text with what the image shows or what it is for, e.g. "Acme Bakery logo" rather than "logo". If the image is only decoration, clear the field (or switch on "Decorative image") so screen readers skip it.

#### Alt text repeats nearby text {#image-alt-duplicates-text}

`image-alt-duplicates-text` · WCAG [1.1.1 Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · Level A · Default: **Tip**

**How to fix:** Make the alt text describe what the picture shows, and let the caption or heading add context — they are read out too. If the image only illustrates the text beside it, mark it decorative (Image block settings &gt; Accessibility) so it is skipped. For a linked image with text in the same link, an empty alt is right.


### Links & buttons

#### Link has no text {#link-no-name}

`link-no-name` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Error**

**How to fix:** Give the link visible text. If the link is an image, add alt text to the image that says where the link goes (e.g. "Download the 2026 annual report"). For icon-only links, add an aria-label.

#### Link text is vague {#link-ambiguous-text}

`link-ambiguous-text` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Needs review**

**How to fix:** Rewrite the link so its text names the destination, e.g. "Read our refund policy" instead of "click here". If the design needs short text, keep it visible and add the full purpose with an aria-label that starts with the visible words.

#### Link does not go anywhere {#link-fake}

`link-fake` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Needs review**

**How to fix:** If it takes the visitor to another page or section, give it a real URL. If it performs an action (opens a menu, plays a video), use a Button block or &lt;button&gt; element instead, which works with Enter and Space and is announced as a button.

#### Link opens a new tab without warning {#link-new-window}

`link-new-window` · WCAG [3.2.5 Change on Request](https://www.w3.org/WAI/WCAG22/Understanding/change-on-request.html) · Level AAA · Default: **Tip**

**How to fix:** Either turn off "Open in new tab" in the link settings, or add "(opens in a new tab)" to the link text so people know before they click.

#### Button has no text {#button-no-name}

`button-no-name` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Error**

**How to fix:** Add visible text to the button that says what it does. For icon-only buttons, add an aria-label such as aria-label="Close menu".

#### Link opens a document file {#link-to-document}

`link-to-document` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Needs review**

**How to fix:** Check the document itself: it needs real headings, alt text for images, a set language and a logical reading order (for PDFs, export from Word or Google Docs as a "tagged" PDF, then run the Adobe Acrobat accessibility check). Consider also publishing the content as a normal page. In the link text, say what the file is and roughly how big, e.g. "2026 price list (PDF, 1.2 MB)". Once the document has been checked, dismiss this item.

#### Link text is a web address {#link-url-as-text}

`link-url-as-text` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Tip**

**How to fix:** Select the address in the editor and type words that describe the page instead, e.g. "Spring menu at Rosa's Café"; the link stays the same. If visitors need to see the address (for example in a printed handout), keep it but add the page name in front of it.

#### Same link text goes to different pages {#link-same-text-different-url}

`link-same-text-different-url` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Needs review**

**How to fix:** Make each link's text say where it goes, e.g. "Pricing for teams" and "Pricing for schools". If the links really lead to the same content (for example two addresses for one page), dismiss this item.

#### Image and text link go to the same page {#link-adjacent-duplicate}

`link-adjacent-duplicate` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Tip**

**How to fix:** Use one link instead of two: remove the link from the image (select it and use Unlink in the toolbar), or put the image and the text inside the same link. In a Query Loop, you can turn off "Link to post" on the Post Featured Image block and keep it on the Post Title.

#### In-page link goes nowhere {#link-anchor-missing}

`link-anchor-missing` · WCAG [2.4.4 Link Purpose (In Context)](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) · Level A · Default: **Error**

**How to fix:** Give the section the link should jump to a matching HTML anchor: select its block (usually a heading) and fill in Advanced &gt; HTML anchor with the text after the # in the link, spelled exactly the same. Or change the link to point at an anchor that exists.

#### Link or button may be too small to tap {#target-size-small}

`target-size-small` · WCAG [2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · Level AA · Default: **Needs review**

**How to fix:** Make the link or button at least 24 × 24 pixels, for example by making its icon larger or adding padding around it. Smaller targets pass only if nothing else clickable sits within 24 pixels of them. Links inside a sentence are exempt.


### Headings

#### Heading is empty {#heading-empty}

`heading-empty` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Error**

**How to fix:** Type the heading text, or delete the block. To add space between sections, use a Spacer block rather than an empty heading.

#### Heading level is skipped {#heading-skipped-level}

`heading-skipped-level` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**How to fix:** Choose heading levels by structure, not by size: sections of the post are H2, sub-sections inside them H3, and so on. To change how a heading looks, change its font size in the block settings instead of its level.

#### Content uses an H1 heading {#heading-h1-in-content}

`heading-h1-in-content` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip**

**How to fix:** Change this heading to H2. Most themes already show the post title as the page's single H1. If your theme hides the title and you intend this to replace it, dismiss this tip.

#### Bold text may be a heading {#heading-possible}

`heading-possible` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip**

**How to fix:** If this line introduces a section, turn the paragraph into a Heading block (type "/heading" or use the block's Transform menu). If it is just emphasis, dismiss this tip.

#### Heading is very long {#heading-too-long}

`heading-too-long` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip**

**How to fix:** If this text is not a section title, turn it into a Paragraph block (block toolbar &gt; Transform) and make it larger with Typography &gt; Size in the sidebar instead. If it is a title, shorten it and move the detail into the paragraph that follows.

#### Long content has no subheadings {#content-no-headings}

`content-no-headings` · WCAG [2.4.10 Section Headings](https://www.w3.org/WAI/WCAG22/Understanding/section-headings.html) · Level AAA · Default: **Tip**

**How to fix:** Break the text into sections and give each one a Heading block (H2 for main sections, H3 inside them). Screen reader users can then jump from section to section, and everyone can skim to the part they need. Section headings are a level AAA recommendation.


### Forms

#### Form field has no label {#form-field-no-label}

`form-field-no-label` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Error**

**How to fix:** Add a visible &lt;label&gt; tied to the field with for="field-id", or wrap the field inside its label. In form-builder plugins, turn on the field's label (you can style it smaller, but keep it). A placeholder is not a label.

#### Form field has more than one label {#form-field-multiple-labels}

`form-field-multiple-labels` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**How to fix:** Keep one &lt;label&gt; for the field and put all the label text in it. Extra help such as "We never share your email" belongs in a hint tied to the field with aria-describedby. In form-builder plugins, this usually means removing a label you added by hand next to the field's own label setting.

#### Options are not grouped with their question {#form-group-no-fieldset}

`form-group-no-fieldset` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**How to fix:** Wrap the options in a &lt;fieldset&gt; and put the question in a &lt;legend&gt; as its first child, e.g. &lt;legend&gt;Preferred contact method&lt;/legend&gt;. In form plugins, look for a setting that shows the field label as a group label or legend; most do this for radio and checkbox fields. Alternatively, give the wrapper role="radiogroup" (or role="group") and an aria-labelledby pointing at the question.

#### Personal-data field has no autocomplete {#input-autocomplete-missing}

`input-autocomplete-missing` · WCAG [1.3.5 Identify Input Purpose](https://www.w3.org/WAI/WCAG22/Understanding/identify-input-purpose.html) · Level AA · Default: **Needs review**

**How to fix:** Add an autocomplete attribute naming what the field collects, such as autocomplete="email", "name", "tel", "street-address" or "postal-code". Most form plugins have an autocomplete setting on each field. Only fields that ask about the visitor themselves need it, so dismiss this item for fields asking about someone else (for example, a friend's email).

#### Form asks for the same email twice {#form-redundant-entry}

`form-redundant-entry` · WCAG [3.3.7 Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html) · Level A · Default: **Tip**

**How to fix:** Remove the "confirm email" field. To catch typos, show the address back to the visitor before they submit, or send a confirmation email with a link. Most form plugins have a setting to turn the confirmation field off.

#### Password field blocks pasting or password managers {#password-paste-blocked}

`password-paste-blocked` · WCAG [3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) · Level AA · Default: **Error**

**How to fix:** Remove the onpaste (or oncopy/ondrop) handler that stops pasting, and replace autocomplete="off" with autocomplete="current-password" on sign-in forms or autocomplete="new-password" on registration and reset forms. Visitors can then paste or let their password manager fill in the field.

#### Check the CAPTCHA has an accessible alternative {#captcha-present}

`captcha-present` · WCAG [3.3.8 Accessible Authentication (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) · Level AA · Default: **Needs review**

**How to fix:** Prefer spam protection that asks visitors nothing, such as an invisible or score-based CAPTCHA, a honeypot field or your form plugin's built-in spam filter. If a challenge must stay, make sure it does not require typing distorted text, solving a sum or memorizing something, offers an audio option, and that visitors can get help another way (for example by email). For sign-in and registration forms this is required by WCAG 2.2 (3.3.8).


### Tables

#### Table has no header cells {#table-no-headers}

`table-no-headers` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**How to fix:** Select the Table block and turn on "Header section" in its settings, then put column names in the header row. If the table is only used for layout, rebuild it with Columns blocks instead.

#### Table header cell is empty {#table-empty-header}

`table-empty-header` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip**

**How to fix:** Type a short name for the column or row into the header cell.

#### Table may be used for layout {#table-layout}

`table-layout` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**How to fix:** If the table only places content side by side, rebuild it with a Columns, Row or Grid block. If it really holds data, add a header row (Table block settings &gt; Header section) so each value is announced with its heading. For layout tables you cannot change, add role="presentation" to the table element.

#### Table has empty rows {#table-empty-row}

`table-empty-row` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip**

**How to fix:** Delete the empty rows: click into a cell of the row and choose Delete row from the Table block toolbar. To add space between rows, use the table's styles instead of blank rows.


### Audio, video & embeds

#### Media plays sound automatically {#media-autoplay-audio}

`media-autoplay-audio` · WCAG [1.4.2 Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html) · Level A · Default: **Error**

**How to fix:** Turn off "Autoplay" in the Audio or Video block settings. If a video must start by itself, also turn on "Muted" so it plays silently.

#### Moving video cannot be paused {#media-no-pause}

`media-no-pause` · WCAG [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · Level A · Default: **Needs review**

**How to fix:** Turn on "Playback controls" for the video, turn off "Loop" so it stops within five seconds, or use a still image instead. Check whether your theme already adds a pause button before dismissing.

#### Video has no captions track {#video-no-captions}

`video-no-captions` · WCAG [1.2.2 Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) · Level A · Default: **Needs review**

**How to fix:** In the Video block settings, use "Text tracks" to upload a captions file (.vtt) and set its kind to Captions. If the captions are already part of the picture, or the video has no speech, dismiss this item.

#### Embedded frame has no title {#iframe-no-title}

`iframe-no-title` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Error**

**How to fix:** Add a title attribute describing the content, e.g. title="Map of our Brooklyn office". Embeds added with WordPress embed blocks get one automatically — this is usually pasted embed code.

#### Scrolling or blinking text {#marquee-blink}

`marquee-blink` · WCAG [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · Level A · Default: **Error**

**How to fix:** Replace the &lt;marquee&gt; or &lt;blink&gt; element with static text. To draw attention, use a heading, a color-contrasted callout or a Group block with a background.

#### Check captions on embedded video {#video-embed-captions}

`video-embed-captions` · WCAG [1.2.2 Captions (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html) · Level A · Default: **Needs review**

**How to fix:** Open the video on the service it is hosted on and check it has accurate captions (on YouTube: YouTube Studio &gt; Subtitles; on Vimeo: the video's Distribution &gt; Subtitles). Automatic captions often mishear names and terms, so review and correct them. If the video has no speech or important sounds, or captions are already shown in the picture, dismiss this item. Separately, if important information is only shown visually, WCAG 1.2.5 (AA) also asks for audio description or a text alternative.

#### Check that the slider can be paused {#carousel-motion}

`carousel-motion` · WCAG [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · Level A · Default: **Needs review**

**How to fix:** View the page and check: if the slides change by themselves, there must be a visible pause or stop button, or the movement must stop within five seconds. The simplest fix is to turn off "Autoplay" in the slider block or plugin settings. Also check the previous/next buttons and dots can be reached and used with the Tab and Enter keys (WCAG 2.1.1). If the slider only moves when a visitor clicks, and works from the keyboard, dismiss this item.

#### GIF may be animated {#animated-gif}

`animated-gif` · WCAG [2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) · Level A · Default: **Needs review**

**How to fix:** If the GIF moves for more than five seconds, replace it with a still image, a GIF that stops after a few loops, or a Video block with "Playback controls" turned on so visitors can pause it. If it is a still image, dismiss this item.

#### Check audio has a transcript {#audio-no-transcript}

`audio-no-transcript` · WCAG [1.2.1 Audio-only and Video-only (Prerecorded)](https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded.html) · Level A · Default: **Needs review**

**How to fix:** Publish a text transcript of the recording: everything that is said, who says it, and any important sounds. Put it right below the player, or link to it with text that includes the word "transcript". Music with no spoken words does not need one; dismiss this item in that case.

#### Embedded frames share the same title {#iframe-duplicate-title}

`iframe-duplicate-title` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Needs review**

**How to fix:** Give each embedded frame a title that says what it contains, e.g. title="Video: how to repot a cactus" and title="Map of our Leeds shop". Pasted embed codes often come with a generic title such as "YouTube video player"; edit it in the HTML.


### Structure

#### Text is formatted as a list by hand {#list-fake}

`list-fake` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip**

**How to fix:** Convert the lines into a List block (select the paragraphs and choose Transform → List). Screen readers then announce "list, 4 items" and let visitors skip it.

#### List item is outside a list {#list-item-orphan}

`list-item-orphan` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**How to fix:** Wrap the items in a &lt;ul&gt; or &lt;ol&gt;, or recreate them with a List block.

#### Empty paragraphs used for spacing {#empty-paragraph-spacing}

`empty-paragraph-spacing` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip**

**How to fix:** Delete the empty paragraph blocks. To add space, use a Spacer block, or the block's Dimensions settings (margin and padding) in the sidebar.

#### Emoji used as bullets or icons {#emoji-as-icon}

`emoji-as-icon` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip**

**How to fix:** For lines that start with an emoji, use a List block instead, so the lines are announced as a list; drop the emoji or keep it at the end of the line. For a link or button that shows only an emoji, add text that says what it does (it can be visually hidden), or an aria-label such as aria-label="Share on WhatsApp".

#### Text is justified {#text-justified}

`text-justified` · WCAG [1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) · Level AAA · Default: **Tip**

**How to fix:** Align the text to the left (or to the right in right-to-left languages) instead of justifying it. Justified text leaves uneven gaps between words that make paragraphs harder to follow, especially for people with dyslexia. This is a level AAA recommendation, not a requirement for AA conformance.

#### Underlined text looks like a link {#text-underline-not-link}

`text-underline-not-link` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Tip**

**How to fix:** Remove the underline (select the text and turn off Underline in the toolbar, or reset Typography &gt; Decoration). To stress a word, use bold or italics instead, which are also announced as emphasis. Keep underlines for links, so visitors can tell what they can click.

#### Text is very small {#text-too-small}

`text-too-small` · WCAG [1.4.4 Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) · Level AA · Default: **Tip**

**How to fix:** Select the block and choose a larger size under Typography &gt; Size, ideally the default body size. Keep text at 12px or larger; fine print is still content visitors need to read. Set sizes in rem or em rather than px so text grows when visitors change their browser's text size.

#### Long passage in capital letters {#text-all-caps}

`text-all-caps` · WCAG [1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html) · Level AAA · Default: **Tip**

**How to fix:** Write the text in normal sentence case. Capitals are harder to read in longer passages, and some screen readers spell typed capitals out letter by letter. For emphasis, use bold instead. If the design calls for capitals, type the text normally and set Typography &gt; Letter case to uppercase, and keep it to short labels. This is a readability recommendation, not a WCAG AA requirement.


### Color

#### Text color has low contrast {#color-contrast}

`color-contrast` · WCAG [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · Level AA · Default: **Error**

**How to fix:** Select the block and open Styles → Color. Pick a darker text color or a lighter background (or the reverse) until the editor's own contrast warning disappears. Normal text needs 4.5:1; large text (24px, or 18.66px bold) needs 3:1.


### ARIA & keyboard

#### Hidden element can still be focused {#aria-hidden-focusable}

`aria-hidden-focusable` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Error**

**How to fix:** Either remove aria-hidden="true", or add tabindex="-1" to every link, button and field inside the hidden element so keyboard focus skips it too.

#### Unknown ARIA role {#aria-invalid-role}

`aria-invalid-role` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Needs review**

**How to fix:** Correct the spelling of the role, or remove the role attribute. Native HTML elements (button, nav, ul) already carry the right role and are the better choice.

#### Label points to a missing element {#aria-broken-reference}

`aria-broken-reference` · WCAG [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) · Level A · Default: **Needs review**

**How to fix:** Make sure the referenced ID exists in the content and is spelled exactly the same (IDs are case-sensitive). This often breaks when a block is copied and its IDs are regenerated.

#### Duplicate ID {#duplicate-id}

`duplicate-id` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Tip**

**How to fix:** Give each element a unique ID. In the block editor, check Advanced → HTML anchor on copied blocks, which keep the original's anchor.

#### Positive tabindex changes the focus order {#tabindex-positive}

`tabindex-positive` · WCAG [2.4.3 Focus Order](https://www.w3.org/WAI/WCAG22/Understanding/focus-order.html) · Level A · Default: **Needs review**

**How to fix:** Change the tabindex to 0 (or remove it) and put the element where it belongs in the content order instead.

#### Accessible name leaves out the visible text {#label-in-name}

`label-in-name` · WCAG [2.5.3 Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html) · Level A · Default: **Needs review**

**How to fix:** Change the aria-label so it contains the visible words, ideally at the start: for a button showing "Subscribe", use "Subscribe to our newsletter", not "Sign up". Often the simplest fix is to remove the aria-label altogether (in the block editor, use the block's "Edit as HTML" option, or the label setting of the plugin that added it) and let the visible text be the name.

#### Only a tooltip names this control {#name-from-title-only}

`name-from-title-only` · WCAG [4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html) · Level A · Default: **Needs review**

**How to fix:** Give the control a name everyone can perceive: visible text for a link or button, or a visible &lt;label&gt; for a form field. For icon-only links and buttons, add an aria-label with the same words as the tooltip. You can keep the title attribute, but do not rely on it.


### Language

#### Language code is invalid {#lang-invalid}

`lang-invalid` · WCAG [3.1.2 Language of Parts](https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.html) · Level AA · Default: **Needs review**

**How to fix:** Use a standard language code such as lang="fr", lang="es-MX" or lang="zh-Hant". In the editor, select the text and use the Language format in the toolbar.


## What the checks can't see

The content checks read the HTML your post produces: blocks, classic content, shortcode output and page-builder output. They don't see your theme's CSS, header, menus or footer. That's deliberate: every result is something you can fix in the editor, and your theme can never cause a false alarm.

To check the rendered page with the theme included, use the **Whole page** tab in [review mode](/review-mode#whole-page), or [page checks](/pro/page-checks) in Lumtera Pro.

Automated checks find only part of what WCAG covers. See [What automated testing can't do](/manual-testing).
