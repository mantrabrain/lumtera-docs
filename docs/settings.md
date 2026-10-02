---
title: Settings
description: Every Lumtera setting, from the grouped settings index and its search to which content to check, whole-page results, the check before publishing, what happens to your data when Lumtera is deleted, the weekly home page check, per-check severity, site fixes, AI suggestions, permissions, the email summary and the feedback form.
---

# Settings

Go to <span class="screen-path">Lumtera → Settings</span>. Only administrators can change settings. More precisely, it takes the `manage_options` capability, and that can't be changed.

## The settings index

Settings are split into sections, listed in groups with a short description of each:

![The settings index, with sections in groups and the Find a setting search box](/screenshots/settings-index.webp)

| Group | Section | What it's for | Guide |
| --- | --- | --- | --- |
| Checking | **General** | What gets checked, and when | [General](#general) |
| | **Checks** | Turn checks on or off, set how strict | [Checks](#checks) |
| | **Ignore rules** (Pro) | Hide findings you have reviewed | [Ignore everywhere](/pro/ignore) |
| Fixing | **Site fixes** | Optional fixes for your theme | [Site fixes](/site-fixes) |
| | **AI suggestions** | Suggestions from your AI provider | [AI suggestions](/ai) |
| | **Fix approvals** (Pro) | Who proposes and approves fixes | [Fixes queue](/pro/fixes-queue) |
| | **Issue trackers** (Pro) | GitHub, GitLab, Jira and Linear | [Fix tracking](/pro/fix-tracking#issue-trackers) |
| Feedback and notifications | **Feedback** | The visitor feedback form and inbox | [Feedback form and inbox](/feedback#settings) |
| | **Response targets** (Pro) | How quickly you aim to reply | [Response targets](/pro/feedback-targets) |
| | **Email summary** | The weekly summary email | [Weekly email summary](/email-summary) |
| | **Alerts** (Pro) | Email and Slack alerts on new errors | [Monitoring & alerts](/pro/monitoring) |
| | **Integrations** (Pro) | Webhooks, Slack and Teams | [Activity log & webhooks](/pro/activity-webhooks#webhooks) |
| People | **Permissions** | Who can see and do what | [Roles & permissions](/permissions) |
| | **Branding** (Pro) | Your name, logo and color on reports | [Client reports](/pro/reports#branding) |
| Lumtera Pro | **License** | Your Lumtera Pro license | [License & plans](/pro/license) |

The Pro sections appear once Lumtera Pro is installed, and with Pro the **People** group is called **People and branding**. Add-ons can add their own sections, which appear under **More**.

**Find a setting** filters the index as you type, by section names and the settings inside them, and says when nothing matches. On a phone, the index becomes a **Section:** menu at the top of the screen.

Each section saves only its own fields. **General**, **Checks** and **AI suggestions** each have **Reset to defaults**, which resets only that section. In **General**, that also sets [When Lumtera is deleted](#when-lumtera-is-deleted) back to **Keep my data (recommended)**.

::: tip Settings apply to the next check
Changing a setting doesn't re-check content that's already been checked. After changing what's checked or how strict to be, go to the Overview and click **Check all content again**.
:::

## General

### Content to check

The content types Lumtera checks, reports on and shows in the editor. Every public content type is listed, including custom post types. Media (attachments) aren't listed.

**Default:** Posts and Pages, plus Products if WooCommerce is active.

Choose at least one. If you save with none ticked, Lumtera keeps your previous choice, saves your other changes, and shows *"Choose at least one content type. The previous choice was kept; your other changes were saved."*

### While editing

These apply to the block editor, Elementor and the classic editor.

| Setting | Default | What it does |
| --- | --- | --- |
| **Check content on save** | On | Checks each post when it's saved, so the reports and the list-table column stay up to date. Adds a fraction of a second to saving. |
| **Outline blocks and widgets with issues** | On | A subtle outline in the editor canvas around blocks with issues. This sets the default. Each author can switch it off for themselves. |
| **Let people save review-mode findings (theme, menus, footer) to the reports** | On | Lets review mode's **Whole page** tab save what it finds in the theme, menus and footer to the reports. Each person still chooses **Save results to reports** for themselves. Turn this off to store nothing. See [Save results to reports](/review-mode#save-results-to-reports). |

### Before publishing

What happens in the block editor when an author publishes content that has errors.

| Option | What happens |
| --- | --- |
| **Do nothing** | Issues are only shown in the Lumtera sidebar. |
| **Show a summary** (default) | The pre-publish panel lists any errors. Publishing is never blocked. |
| **Require confirmation** | If there are errors, the author must confirm **Publish anyway** before the post can be published or scheduled, even with WordPress's pre-publish checks turned off. Saving drafts always works. |

Elementor and the classic editor show the issues but never hold publishing. See [Before publishing](/block-editor#before-publishing).

### When Lumtera is deleted {#when-lumtera-is-deleted}

What happens to feedback messages, results and settings if Lumtera is deleted from the Plugins screen. Deactivating never removes anything.

| Option | What happens |
| --- | --- |
| **Keep my data (recommended)** (default) | Feedback messages, results and settings stay in the database, so installing Lumtera again picks them up. |
| **Delete everything** | Also deletes every feedback message (visitors' reports, names, email addresses and your replies), every result and every setting. This can't be undone. |

**Download every feedback message (CSV)** under the choice saves a copy first. It shows when there are messages to save.

Either way, deleting Lumtera stops its scheduled tasks, such as the weekly email.

On the <span class="screen-path">Plugins</span> screen, while Lumtera is active:

- With **Keep my data**, Lumtera's row says **Data is kept if deleted**, with a **change** link to this setting.
- With **Delete everything**, a warning under Lumtera's row says how many feedback messages and results would be deleted, with **Export feedback first (CSV)** and **Keep my data instead**. Clicking **Deactivate** asks you to confirm first, because once Lumtera is inactive it can't warn you again before you delete it.

On a multisite network, each site keeps or deletes its own data as set on that site. Keeping it is the default.

### Weekly home page check {#weekly-home-page-check}

![The When Lumtera is deleted and Weekly home page check cards under Settings, General](/screenshots/settings-home-check.webp)

**Off** by default. Click **Check my home page every week** to turn it on (or turn it on from the [getting-started checklist](/quick-start#the-getting-started-checklist), together with the weekly email).

Once a week, your own server loads your home page as a logged-out visitor and checks it. It's the same check as `wp lumtera check --page=/` in [WP-CLI](/developers/wp-cli): the HTML your server sends, including the theme's header, menus and footer. Nothing is sent to any other server. The first check runs in the background within a few minutes of turning it on.

- New errors show on the [Overview](/site-report#weekly-home-page-check), with **Check now** and the trend, and in the [weekly email](/email-summary).
- It can't measure what needs a browser, such as contrast from your theme's styles, keyboard focus and layout. Use [review mode](/review-mode)'s **Whole page** tab for those.
- It runs through WP-Cron, so it needs a visit to the site (or a real cron job) to start. If your host blocks the site from loading its own pages (a "loopback" request), the Overview says the check didn't run and why. <span class="screen-path">Tools → Site Health</span> shows whether loopback requests work.

**Turn off the weekly check** stops it. Developers can check a different page with the `lumtera_home_watch_url` filter; see [Hooks & filters](/developers/hooks#admin-screens).

### Getting started {#getting-started}

If you dismissed the Overview's getting-started checklist, a **Getting started** card here has **Show the getting-started checklist** to bring it back.

## Checks

Raise, lower or turn off any of the [69 checks](/checks), and the [whole-page checks](/checks#whole-page-checks) that review mode and Lumtera Pro's page checks run in the browser. They're listed under **Whole page, in the browser**.

![The Checks settings](/screenshots/screenshot-7.webp)

For each check, choose:

- **Default**: the check's built-in severity, shown in brackets
- **Error**
- **Needs review**
- **Tip**
- **Off**: the check doesn't run at all

Checks are grouped by category, with jump links. **Filter checks** searches check titles, fix text and WCAG numbers. **Show changed only** lists just the checks you've changed, marked **Changed**. **Reset** sets one check back to its default.

A severity you choose applies to everything that check finds. Turning off one of the alt text checks also removes it from the alt text manager's **Needs review** tab. Turning a check off also lowers the coverage shown on the Overview, if no other check covers the same criterion.

::: warning Be careful turning checks off
If a check keeps flagging something that's fine on one page, [dismiss](/dismissing) that item instead. Turn a check off only if it never applies to your site. With Lumtera Pro, you can also [ignore one finding everywhere](/pro/ignore) under **Ignore rules**.
:::

## AI suggestions

Optional, AI-assisted suggestions you review. Every switch is **off** by default, and every check works without AI.

| Setting | Where it appears |
| --- | --- |
| **Suggest alt text** | The alt text manager, the Image block, and **Draft with AI** in the fix dialog |
| **Suggest better link text** | The block editor sidebar, on vague links, web addresses used as link text, and links that share text with links to other pages, and **Draft with AI** in the fix dialog |
| **Suggest headings** | The block editor sidebar, on bold text that looks like a heading, and on long content with no subheadings, and **Draft with AI** in the fix dialog |
| **Draft a plain-language summary** | The **Reading level** in the block editor sidebar, when content reads above the target grade |

The last three are grouped under **Writing help in the editor**. They're listed only when a connected AI provider can write text.

See [AI suggestions](/ai) for what each one needs, and exactly what it sends.

## Site fixes

Optional fixes for common theme problems: a skip link, a visible focus ring, pinch-zoom, link underlines, new-tab text, document link details and form labels. All off by default. See [Site fixes](/site-fixes).

## Permissions

Choose which roles can see the reports, dismiss errors, use review mode and handle accessibility feedback. With Lumtera Pro, also who can propose and approve fixes, and who can manage client reports. Administrators always can. See [Roles & permissions](/permissions).

## Email summary

An optional weekly email with your score, error counts, what was fixed, the most common issues, pages that got worse and the weekly home page check. Off by default. The section also shows when a summary could not be sent, and has **Send a test summary now**. See [Weekly email summary](/email-summary).

## Feedback

Who gets an email when a visitor sends feedback, how long personal data is kept, and the optional Akismet spam check. See [Feedback form and inbox](/feedback#settings).

## Pro settings {#pro-settings}

<p><span class="pro-pill">Pro</span> Lumtera Pro adds these sections.</p>

| Section | Guide |
| --- | --- |
| **Ignore rules** | [Ignore everywhere](/pro/ignore) |
| **Fix approvals** | [Fixes queue](/pro/fixes-queue) |
| **Alerts** | [Monitoring & alerts](/pro/monitoring) |
| **Response targets** | [Feedback response targets](/pro/feedback-targets) |
| **Branding** | [Client reports](/pro/reports#branding) |
| **Integrations** | [Webhooks](/pro/activity-webhooks#webhooks) |
| **Issue trackers** | [Fix tracking](/pro/fix-tracking#issue-trackers) |
| **License** | [License & plans](/pro/license) |

A few Pro settings live on their own screens: scheduled checks and signed-in checks on **Page checks**, and how long to keep activity and evidence on **Activity**.

## For developers

The `lumtera_settings_sections` filter adds sections, `lumtera_settings_groups` places them in the index, and `lumtera_settings_keywords` adds words that **Find a setting** matches. See [Hooks & filters](/developers/hooks).
