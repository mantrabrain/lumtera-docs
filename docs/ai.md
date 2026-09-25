---
title: AI suggestions
description: Optional AI alt text suggestions that use the page the image appears on. Off by default, reviewed by a person, and sent only to the AI provider you connected to WordPress.
---

# AI suggestions

Lumtera works fully without AI. If you'd like help writing alt text, you can switch on **AI suggestions**. They're off by default.

## How it works

- **It uses the AI provider you connected to WordPress.** WordPress 7.0 and later can connect AI providers under <span class="screen-path">Settings → Connectors</span>, for example OpenAI, Anthropic, Google, or a model running on your own server.
- **Lumtera stores no API keys and runs no servers.**
- **Nothing is sent until someone clicks "Suggest alt text".** Nothing is sent in the background or for visitors.
- **Suggestions are drafts.** Nothing changes until a person chooses one, edits it if needed, and saves.

## Switch it on

<ol class="step-list">
  <li>Connect an AI provider that can read images under <span class="screen-path">Settings → Connectors</span>.</li>
  <li>Go to <span class="screen-path">Accessibility → Settings → AI</span>.</li>
  <li>Check the status line says <em>"Ready: a connected AI provider can read images."</em></li>
  <li>Switch on <strong>Suggest alt text</strong> and save.</li>
</ol>

Only administrators can change this setting.

| Status line | What it means |
| --- | --- |
| *AI suggestions use the AI Client built into WordPress 7.0 and later…* | Update WordPress to 7.0 or later. Every check keeps working without AI. |
| *No connected AI provider can read images yet.* | Connect a provider with an image-capable model under Settings → Connectors. |
| *Ready: a connected AI provider can read images.* | You're set. |

## Where it appears

- **Alt text manager:** a **Suggest alt text** button on each image. See [Alt text manager](/alt-text#ai-suggestions).
- **Image block:** in the block's **Accessibility** panel, for images from the Media Library that aren't marked decorative.

Both offer up to three suggestions. If the AI thinks the image is decorative, it says so and suggests marking it decorative instead.

## Suggestions that fit the page

Most AI tools describe what an image *shows*. Good alt text says what an image *means* where it's used. So Lumtera sends the image with its context:

- the image file (a resized version, up to 4 MB), its file name and caption
- from a post that uses the image, and that you can read: the post title, the nearest heading, the figure caption, the text just before and after the image, and whether the image is a link (and the link text)

The AI is asked to follow WCAG 2.2, keep suggestions under 150 characters, never start with "image of", include any text in the image that matters, and **never guess who a person is**.

::: warning Always read a suggestion first
AI can be wrong, and never recognizes people reliably. Check that each suggestion is accurate for the page before you save it. AI suggestions don't make a site compliant on their own.
:::

## A record of what was accepted

When you save an AI suggestion in the alt text manager, edited or not, Lumtera records it against the image, with who accepted it and when. If you rewrite the text completely, or later save text that didn't come from AI, the record is removed.

Choosing a suggestion in the Image block sets the block's alt text but doesn't create this record.

Records are included in WordPress's personal data export and erase tools. See [Data & uninstall](/developers/data#privacy).

## External services

When AI suggestions are on and someone clicks **Suggest**, the data listed above is sent to the AI provider connected to WordPress. That provider's own terms and privacy policy apply. For example:

- OpenAI: [terms](https://openai.com/policies/terms-of-use/), [privacy policy](https://openai.com/policies/privacy-policy/)
- Anthropic: [terms](https://www.anthropic.com/legal/consumer-terms), [privacy policy](https://www.anthropic.com/legal/privacy)
- Google Gemini API: [terms](https://ai.google.dev/gemini-api/terms), [privacy policy](https://policies.google.com/privacy)

## Using Lumtera from an AI assistant

Separately from suggestions, on WordPress 6.9 and later an AI assistant connected to your site can run Lumtera's checks through the WordPress Abilities API. See [Abilities API](/developers/abilities).
