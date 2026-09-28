---
title: Your WordPress admin
description: A map of everything Lumtera adds to WordPress. The grouped Lumtera menu and its screens, the settings index, the editor sidebar, review mode, the admin bar, the Dashboard widget and the list-table column, and who can see each one.
---

# Your WordPress admin

Lumtera adds one top-level menu, **Lumtera**, plus a few things inside screens you already use. (Before version 1.1, the menu was called **Accessibility**.) This page maps each one to its guide.

## The Lumtera menu {#the-lumtera-menu}

The menu has one item for each group of screens. At the top of every Lumtera screen, the same groups appear as tabs, and the screens of the current group appear as a second row of tabs. Every screen keeps its own address (`admin.php?page=lumtera-…`), so bookmarks and links from older emails still work.

The menu shows a red badge with the number of items that have at least one error, including drafts and scheduled posts. **Feedback & statement** shows the number of new feedback messages.

"Report roles" below means the roles allowed to **See reports and check the site** under <span class="screen-path">Lumtera → Settings → Permissions</span>. By default, that's editors and administrators. See [Roles & permissions](/permissions).

| Menu item | Screens (tabs) | Who can open them | Guide |
| --- | --- | --- | --- |
| **Overview** | Overview | Report roles | [Site report](/site-report#overview) |
| **Checks** | **Content** (the Content report) · **Page checks** · **Documents** · **Test sessions** | Report roles | [Site report](/site-report#content-report), [Page checks](/pro/page-checks), [PDF checks](/pro/documents), [Test sessions](/pro/test-sessions) |
| **Fixes** | **Fix tracking** · **Fixes queue** · **Alt text** | Fix tracking: anyone who can edit posts. Fixes queue: people who may propose or approve fixes. Alt text: anyone who can upload files | [Fix tracking](/pro/fix-tracking), [Fixes queue](/pro/fixes-queue), [Alt text manager](/alt-text) |
| **Reports** | **Reports** · **Evidence** · **Compare scans** · **Activity** | Reports: report roles. Evidence, Compare scans and Activity: administrators | [Client reports](/pro/reports), [Evidence log](/pro/evidence), [Compare scans](/pro/compare-scans), [Activity log](/pro/activity-webhooks) |
| **Feedback & statement** | **Feedback** · **Statement** · **Burden records** | Feedback: roles allowed to **Handle accessibility feedback**. Statement and Burden records: anyone who can publish pages | [Feedback form and inbox](/feedback), [Accessibility statement](/statement), [Burden records](/pro/burden) |
| **Portfolio** | Client portfolio | Administrators | [Client portfolio](/pro/portfolio) |
| **Settings** | A grouped index of every settings section, with a search box | Administrators | [Settings](/settings) |
| **Free vs Pro** | Compares the free plugin with Pro plans. Hidden once Pro is active. | Report roles | [What Pro adds](/pro/) |

The **Accessibility Conformance Report** belongs to the **Reports** group. You open it from the Reports screen. See [Accessibility Conformance Report](/pro/acr).

A screen someone can't open isn't shown to them, and a group with only one screen they can open shows just that screen, under the screen's own name. For example, authors see **My fixes** and **Alt text**, and contributors see **My fixes**, when Lumtera Pro is active.

### Without Lumtera Pro {#without-lumtera-pro}

The menu is **Overview**, **Checks**, **Alt text**, **Reports** (Pro), **Feedback & statement**, **Portfolio** (Pro), **Settings** and **Free vs Pro**.

![The Page checks preview screen without Lumtera Pro, with the Lumtera menu on the left](/screenshots/pro-preview.webp)

Four Pro screens appear as previews with a "Pro" badge: **Page checks** (in **Checks**, after **Content**), **Reports** and **Evidence** (the **Reports** group) and **Portfolio**. Each one describes what the Pro feature does, without prices. Nothing you already use is locked. The other Pro screens (Documents, Test sessions, Fix tracking, Fixes queue, Compare scans, Activity and Burden records) aren't listed until Pro is installed. Old links to the first six open the preview that covers them. Because the **Fixes** group then has only **Alt text**, the menu shows <span class="screen-path">Lumtera → Alt text</span>.

The header's **Upgrade to Pro** link appears once you've checked your content. With Pro active, the previews become the real screens and **Free vs Pro** disappears.

### The settings index

<span class="screen-path">Lumtera → Settings</span> lists every section in groups, each with a short description. Type in **Find a setting** to filter them. On a phone, the index becomes a **Section:** menu.

| Group | Sections |
| --- | --- |
| Checking | General · Checks · Ignore rules (Pro) |
| Fixes and AI | Site fixes · AI suggestions |
| People | Permissions · Fix approvals (Pro) |
| Notifications | Email summary · Alerts (Pro) |
| Visitor feedback | Feedback · Response targets (Pro) |
| Reports and integrations | Branding (Pro) · Integrations (Pro) · Issue trackers (Pro) |
| Lumtera Pro | License |

See [Settings](/settings).

## Inside the editors

| Where | What | Guide |
| --- | --- | --- |
| Block editor, top toolbar | Lumtera icon: opens the **Lumtera Accessibility** sidebar. The icon gets a colored dot when there are errors or items to review. Also in the Options menu as **Lumtera Accessibility**. | [Block editor sidebar](/block-editor) |
| Block editor, post settings sidebar | **Manual accessibility checks** panel: the guided checklist, with results saved on the post | [Guided checklists](/manual-checks) |
| Block editor, pre-publish panel | **Lumtera Accessibility** summary before publishing | [Before publishing](/block-editor#before-publishing) |
| Image block settings | **Accessibility** panel: decorative switch and **Suggest alt text** | [Decorative images](/block-editor#decorative-images) |
| Elementor editor | Floating **Lumtera Accessibility** button and panel | [Elementor](/page-builders#elementor) |
| Classic editor | **Lumtera Accessibility** box below the content | [Classic editor](/page-builders#classic-editor) |

Divi, Beaver Builder, Bricks, Oxygen and WPBakery don't get a panel inside the builder, but their pages are checked and Lumtera's links open them in the builder. See [Other page builders](/page-builders#other-page-builders).

## Elsewhere in WordPress

| Where | What | Guide |
| --- | --- | --- |
| Admin bar, on a post or page | **Accessibility**, with a red badge counting this content's errors: opens review mode on the live page, with the **This post**, **Whole page**, **Keyboard**, **Screen reader** and **Manual** tabs. Its menu shows this content's counts and the last whole-page result, with **Check this page**, **Fix in the editor** and **Open the accessibility overview**. Shown to roles allowed to review pages (by default, anyone who can edit posts), on posts they can edit. | [Review mode](/review-mode#the-admin-bar-menu) |
| Posts, Pages and Products lists | **Accessibility** column with each item's status and score. Sortable by score. | [Site report](/site-report#the-accessibility-column) |
| Dashboard | **Lumtera Accessibility** widget with your score and the pages that need attention. Shown to report roles. | [Site report](/site-report#dashboard-widget) |
| Media Library | Alt text details and ADA Title II exception tags on files | [Alt text manager](/alt-text), [Exception tags](/statement#exception-tags) |
| Blocks | **Accessibility statement link**, **Accessibility feedback form** and **Plain-language summary** | [Statement](/statement#link-to-your-statement), [Feedback form](/feedback) |
| Users | **Lumtera Reporter** role for agency hubs, and **Accessibility client** with Lumtera Pro | [Roles & permissions](/permissions) |
| Tools → Export / Erase Personal Data | Lumtera's dismissals, feedback, fix history, accepted AI alt text and manual check results | [Data & uninstall](/developers/data) |

Who can see what is covered in [Roles & permissions](/permissions).
