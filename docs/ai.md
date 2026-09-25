---
title: AI suggestions
description: Optional AI-assisted suggestions you review, for alt text, link text, headings and a plain-language summary. Each is off by default, runs only when someone clicks, and sends data only to the AI provider you connected to WordPress.
---

# AI suggestions

Lumtera works fully without AI. If you'd like help, you can switch on AI-assisted suggestions you review, one feature at a time:

| Feature | Setting | Where the button appears |
| --- | --- | --- |
| [Alt text](#alt-text) | **Suggest alt text** | Alt text manager and the Image block |
| [Link text](#link-text) | **Suggest better link text** | Block editor sidebar, on some link issues |
| [Headings](#headings-and-subheadings) | **Suggest headings** | Block editor sidebar, on some heading issues |
| [Plain-language summary](#plain-language-summary) | **Draft a plain-language summary** | Block editor sidebar, under **Reading level** |

Every switch is off by default.

## How it works

- **It uses the AI provider you connected to WordPress.** WordPress 7.0 and later can connect AI providers under <span class="screen-path">Settings → Connectors</span>, for example OpenAI, Anthropic, Google, or a model running on your own server.
- **Lumtera stores no API keys and runs no servers.** Requests go from your site to the provider you chose, under that provider's terms.
- **Nothing is sent until someone clicks a button.** Nothing is sent in the background, and nothing for visitors.
- **Each click is one request** to your provider, which may charge for it.
- **Suggestions are drafts.** Nothing changes until a person chooses one. In the editor, using one is an ordinary edit that **Undo** reverts.
- **Only people who can edit the post** (or the image) can ask for a suggestion.

## Switch it on

<ol class="step-list">
  <li>Connect an AI provider under <span class="screen-path">Settings → Connectors</span>. For alt text, choose one with a model that can read images.</li>
  <li>Go to <span class="screen-path">Accessibility → Settings → AI</span>.</li>
  <li>Check the status lines (see below).</li>
  <li>Switch on the features you want and click <strong>Save changes</strong>.</li>
</ol>

Only administrators can change these settings.

The **AI suggestions** card holds **Suggest alt text**, and shows one of these status lines:

| Status line | What it means |
| --- | --- |
| *AI suggestions use the AI Client built into WordPress 7.0 and later…* | Update WordPress to 7.0 or later, or turn AI back on if it's switched off in WordPress. The switch can't be turned on until then. Every check keeps working without AI. |
| *No connected AI provider can read images yet.* | Connect a provider with an image-capable model under Settings → Connectors. |
| *Ready: a connected AI provider can read images.* | You're set. |

The **Writing help in the editor** card holds the other three switches. It lists them only when a connected provider can write text. Otherwise it shows *"No connected AI provider can write text yet."* with a link to Settings → Connectors.

Lumtera re-checks what your provider can do every 10 minutes, so a newly connected provider can take a few minutes to show as ready.

## Alt text

**Setting:** **Suggest alt text**

**Where:**

- **Alt text manager:** a **Suggest alt text** button on each image you can edit. See [Alt text manager](/alt-text#ai-suggestions).
- **Image block:** in the block's **Accessibility** panel in the block editor, for images from the Media Library that aren't marked decorative. It needs the `upload_files` capability (Authors and up).

Up to three suggestions come back. In the alt text manager, **Use this** copies one into the field. You edit it if needed, then click **Save**. In the Image block, **Use** sets the block's alt text, which you can still edit. If the AI thinks the image may be purely decorative, it says so.

### Suggestions that fit the page

Most AI tools describe what an image *shows*. Good alt text says what an image *means* where it's used. So Lumtera sends the image with where it's used.

**What's sent:**

- the image file (a resized version when there is one, and never a file over 4 MB), its file name and its caption
- from a post that uses the image, and that you can read: the post title, the nearest heading above the image, the figure caption, a little text just before and after the image, and whether the image is a link (and the link's text)

In the Image block, the post you're editing is used. In the alt text manager, it's the first post that uses the image and that you can read.

The AI is asked to follow WCAG 2.2, keep suggestions under 150 characters, never start with "image of", include any text in the image that matters, and **never guess who a person is**. It may only name people the caption or page text names.

## Link text

**Setting:** **Suggest better link text**

**Where:** a **Suggest link text** button in the block editor sidebar, on these issues:

- [Vague link text](/checks#link-ambiguous-text), such as "click here"
- [A web address used as link text](/checks#link-url-as-text)
- [The same link text going to different pages](/checks#link-same-text-different-url)

Up to three suggestions come back. **Use** replaces the link's text, in a paragraph or a Button block. The link's address doesn't change. If the link has an `aria-label`, it's removed, so screen readers read the new visible text. Suggestions that Lumtera's own link checks would flag again are dropped.

**What's sent:**

- the link text
- where the link points, as the site and page path only. Query strings and `#` fragments are never sent. Email, phone and text-message links are sent only as "an email address", "a phone number" or "a text message number".
- the sentence and paragraph around the link
- the post title, as typed in the editor
- the title of the linked page, only when it's a public page on your site. Private, draft and password-protected pages are never sent.

## Headings and subheadings

**Setting:** **Suggest headings**

**Where:** in the block editor sidebar:

- **Suggest heading** on [bold text that looks like a heading](/checks#heading-possible). You get the text **As it is** plus two **Rewritten** versions. The button, such as **Use as H2**, turns the paragraph into a heading at the same level as the heading before it (H2 if there's none).
- **Suggest subheadings** on [long content without subheadings](/checks#content-no-headings). You get two to four H2 subheadings, each placed **Before** a paragraph. Click **Insert H2** to add them one at a time.

**What's sent:**

- For **Suggest heading**: the post title, the bold line, the text that follows it, and the heading before it.
- For **Suggest subheadings**: the post title and the text of the post's paragraphs, lists and quotes, numbered. Each is cut to 400 characters, up to 80 of them and about 16,000 characters in all.

## Plain-language summary

**Setting:** **Draft a plain-language summary**

**Where:** a **Draft a plain-language summary** button under **Reading level** in the block editor sidebar. It appears only when the content reads above the target grade (grade 9), which relates to WCAG 3.1.5 Reading Level (AAA). The reading level is measured for English, Spanish, French, German, Italian and Dutch, in content of at least 100 words.

The draft is up to about 120 words. You can edit it in the panel, then click **Add at the top**, or **Add at the top as a "Summary" details block**. A summary supplements the post. It never rewrites it.

**What's sent:** the post title and the visible text of the post as it is in the editor (paragraphs, headings, lists, tables, quotes and captions), up to about 3,000 words.

Summaries aren't offered for posts built with a page builder.

## Limits

Each person can make 30 AI requests in 10 minutes, across all four features. After that, Lumtera shows *"Too many AI requests in a short time. Wait a few minutes and try again."* Developers can change the limit with the `lumtera_ai_rate_limit` filter. See [Hooks & filters](/developers/hooks).

The writing features work in the block editor only. They aren't available in Elementor, other page builders or the classic editor.

::: warning Always read a suggestion first
AI can be wrong, can miss the point of the text, and never recognizes people reliably. Check each suggestion is accurate for the page before you use it. Once you use it, it's your content. AI suggestions don't make a site compliant on their own.
:::

## A record of accepted alt text

When you save an AI alt text suggestion in the alt text manager, edited or not, Lumtera records it against the image, with who accepted it and when. If you replace the text with your own words (so nothing of the suggestion is left), or later save text that didn't come from AI, the record is removed.

Only the alt text manager keeps this record. Choosing a suggestion in the Image block, or using link text, a heading or a summary in the editor, is an ordinary edit. It shows in the post's revisions like any other change, but isn't recorded as AI-assisted.

Records are included in WordPress's personal data export and erase tools. See [Data & uninstall](/developers/data#privacy).

## External services

When a feature is on and someone clicks its button, the data listed for that feature is sent to the AI provider connected to WordPress. That provider's own terms and privacy policy apply. For example:

- OpenAI: [terms](https://openai.com/policies/terms-of-use/), [privacy policy](https://openai.com/policies/privacy-policy/)
- Anthropic: [terms](https://www.anthropic.com/legal/consumer-terms), [privacy policy](https://www.anthropic.com/legal/privacy)
- Google Gemini API: [terms](https://ai.google.dev/gemini-api/terms), [privacy policy](https://policies.google.com/privacy)

## Using Lumtera from an AI assistant

Separately from suggestions, on WordPress 6.9 and later an AI assistant connected to your site can run Lumtera's checks through the WordPress Abilities API. See [Abilities API](/developers/abilities).
