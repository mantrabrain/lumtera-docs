---
title: Settings
description: Every Lumtera setting. Which content to check, checking on save, editor outlines, the check before publishing, per-check severity, AI and site fixes.
---

# Settings

Go to <span class="screen-path">Accessibility → Settings</span>. Only administrators can change settings.

Settings are split into sections: **General**, **Checks**, **AI** and **Site fixes**. [Lumtera Pro](/pro/) adds **Alerts**, **Branding**, **Integrations** and **License**. Each section saves only its own fields.

General, Checks and AI each have **Reset to defaults**, which resets only that section.

::: tip Settings apply to the next check
Changing a setting doesn't re-check content that's already been checked. After changing what's checked or how strict to be, go to the Overview and click **Check all content again**.
:::

## General

### Content to check

The content types Lumtera checks, reports on and shows in the editor. Every public content type is listed, including custom post types.

**Default:** Posts, Pages, and Products if WooCommerce is active. Choose at least one.

### While editing

These apply to the block editor, Elementor and the classic editor.

| Setting | Default | What it does |
| --- | --- | --- |
| **Check content on save** | On | Checks each post when it's saved, so reports and the list-table column stay up to date. Adds a fraction of a second to saving. |
| **Outline blocks and widgets with issues** | On | A subtle outline around blocks with issues in the editor. This sets the default. Each author can switch it off for themselves. |

### Before publishing

What happens in the block editor when an author publishes content that has errors.

| Option | What happens |
| --- | --- |
| **Do nothing** | Issues are only shown in the Lumtera sidebar. |
| **Show a summary** (default) | The pre-publish panel lists any errors. Publishing is never blocked. |
| **Require confirmation** | If there are errors, the author must confirm **Publish anyway** before publishing or scheduling, even with WordPress's pre-publish checks turned off. Saving drafts always works. |

Elementor and the classic editor show issues but never hold publishing. See [Before publishing](/block-editor#before-publishing).

## Checks

Raise, lower or turn off any of the [64 checks](/checks).

![The Checks settings](/screenshots/screenshot-7.webp)

For each check, choose:

- **Default**: the check's built-in severity, shown in brackets
- **Error**
- **Needs review**
- **Tip**
- **Off**: the check doesn't run at all

Checks are grouped by category, with jump links. **Filter checks** searches titles, fix text and WCAG numbers. **Show changed only** lists just the checks you've changed, marked **Changed**. **Reset** sets one check back to its default.

A severity you choose applies to everything that check finds. Turning a check off also removes it from the alt text manager's **Needs review** tab, for the alt text checks.

::: warning Be careful turning checks off
If a check keeps flagging something that's fine on one page, [dismiss](/dismissing) that item instead. Turn a check off only if it never applies to your site.
:::

## AI

**Suggest alt text** (default: **off**) adds a **Suggest** button to the alt text manager and the Image block. See [AI suggestions](/ai) for what it needs and what's sent.

## Site fixes

Optional fixes for common theme problems: a skip link, a visible focus ring, pinch-zoom, link underlines, new-tab text, document link details and form labels. All off by default. See [Site fixes](/site-fixes).

## Pro settings <span class="pro-pill">Pro</span>

| Section | Guide |
| --- | --- |
| **Alerts** | [Monitoring & alerts](/pro/monitoring) |
| **Branding** | [Client reports](/pro/reports#branding) |
| **Integrations** | [Webhooks](/pro/activity-webhooks#webhooks) |
| **License** | [License & plans](/pro/license) |

Two Pro settings live on their own screens: scheduled checks on **Page checks**, and how long to keep entries on **Activity**.
