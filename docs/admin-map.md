---
title: Your WordPress admin
description: A map of everything Lumtera adds to WordPress. The grouped Lumtera menu and its screens with and without Lumtera Pro, the settings index, the Network Admin menu, the editor sidebar, review mode, the admin bar, the Dashboard widget and the list-table column, and who can see each one.
---

# Your WordPress admin

Lumtera adds one top-level menu, **Lumtera**, plus a few things inside screens you already use. (Before version 1.1, the menu was called **Accessibility**.) This page maps each one to its guide.

## The Lumtera menu {#the-lumtera-menu}

The menu has one item for each group of screens, in the order of the work: check, fix, report, then hear from visitors. At the top of every Lumtera screen, the same groups appear as tabs, and the screens of the current group appear as a second row of tabs. Every screen keeps its own address (`admin.php?page=lumtera-…`), so bookmarks and links from older emails still work.

The menu shows a red badge with the number of items that have at least one error, including drafts and scheduled posts. **Feedback & statement** shows the number of new feedback messages.

"Report roles" below means the roles allowed to **See reports and check the site** under <span class="screen-path">Lumtera → Settings → Permissions</span>. By default, that's editors and administrators. See [Roles & permissions](/permissions).

### With Lumtera Pro {#with-lumtera-pro}

| Menu item | Screens (tabs) | Who can open them | Guide |
| --- | --- | --- | --- |
| **Overview** | Overview | Report roles | [Site report](/site-report#overview) |
| **Checks** | **Content** (the Content report) · **Page checks** · **Documents** · **Test sessions** · **Compare scans** | Report roles. Compare scans: administrators | [Site report](/site-report#content-report), [Page checks](/pro/page-checks), [PDF checks](/pro/documents), [Test sessions](/pro/test-sessions), [Compare scans](/pro/compare-scans) |
| **Fixes** | **Fixes queue** · **Alt text** · **Fix tracking** (people who can't see the reports see it as **My fixes**) | Fixes queue: people who may propose or approve fixes. Alt text: anyone who can upload files. Fix tracking: anyone who can edit posts | [Fixes queue](/pro/fixes-queue), [Alt text manager](/alt-text), [Fix tracking](/pro/fix-tracking) |
| **Reports** | **Reports** · **Evidence** · **Activity** | Reports: report roles (creating, deleting and sharing reports also needs **Manage client reports**, which administrators always have). Evidence and Activity: administrators | [Client reports](/pro/reports), [Evidence log](/pro/evidence), [Activity log](/pro/activity-webhooks) |
| **Feedback & statement** | **Feedback** · **Statement** · **Burden records** | Feedback: roles allowed to **Handle accessibility feedback**. Statement and Burden records: anyone who can publish pages | [Feedback form and inbox](/feedback), [Accessibility statement](/statement), [Burden records](/pro/burden) |
| **Portfolio** | Client portfolio. From the Growth plan; on the Personal plan the menu item shows a **Growth** tag and the screen describes it | Administrators | [Client portfolio](/pro/portfolio) |
| **Settings** | A grouped index of every settings section, with a search box | Administrators | [Settings](/settings) |

The **Accessibility Conformance Report** belongs to the **Reports** group. You open it from the Reports screen. See [Accessibility Conformance Report](/pro/acr).

**Free vs Pro** isn't in the menu while Pro is active.

A screen someone can't open isn't shown to them, and a group with only one screen they can open shows just that screen, under the screen's own name. For example, with Lumtera Pro active, authors see **Fixes** with **Alt text** and **My fixes**, and contributors see **My fixes**.

### Without Lumtera Pro {#without-lumtera-pro}

The menu is **Overview**, **Checks**, **Fixes**, **Reports** (Pro), **Feedback & statement**, **Portfolio** (Pro), **Settings** and **Free vs Pro**.

| Menu item | Screens (tabs) | Who can open them | Guide |
| --- | --- | --- | --- |
| **Overview** | Overview | Report roles | [Site report](/site-report#overview) |
| **Checks** | **Content** · **Page checks** (Pro preview) | Report roles | [Site report](/site-report#content-report) |
| **Fixes** | **Alt text** · **Fixes queue** (Pro preview) | Alt text: anyone who can upload files. Preview: report roles | [Alt text manager](/alt-text) |
| **Reports** (Pro) | **Reports** · **Evidence** (both Pro previews) | Report roles | [What Pro adds](/pro/) |
| **Feedback & statement** | **Feedback** · **Statement** | Feedback: roles allowed to **Handle accessibility feedback**. Statement: anyone who can publish pages | [Feedback form and inbox](/feedback), [Accessibility statement](/statement) |
| **Portfolio** (Pro) | Client portfolio (Pro preview) | Report roles | [What Pro adds](/pro/) |
| **Settings** | The settings index | Administrators | [Settings](/settings) |
| **Free vs Pro** | Compares the free plugin with the Pro plans, without prices. In the menu only. | Report roles | [What Pro adds](/pro/) |

![The Page checks preview screen without Lumtera Pro, under Checks, with the Lumtera menu on the left](/screenshots/pro-preview.webp)

Five Pro screens appear as previews with a "Pro" badge, each after the working screens of its group: **Page checks** (in **Checks**, after **Content**), **Fixes queue** (in **Fixes**, after **Alt text**), **Reports** and **Evidence** (the **Reports** group) and **Portfolio**. Each one describes what the Pro feature does, without prices. Nothing you already use is locked. The other Pro screens (Documents, Test sessions, Compare scans, Fix tracking, Activity and Burden records) aren't listed until Pro is installed. Old links to Documents, Test sessions and Compare scans open the Page checks preview, Fix tracking opens the Fixes queue preview, and Activity opens the Evidence preview. Alt text is under <span class="screen-path">Lumtera → Fixes → Alt text</span>.

The header's **Upgrade to Pro** link appears once you've checked your content. With Pro active, the previews become the real screens and **Free vs Pro** disappears.

### The settings index {#the-settings-index}

<span class="screen-path">Lumtera → Settings</span> lists every section in groups, each with a short description. Type in **Find a setting** to filter them. On a phone, the index becomes a **Section:** menu. Sections marked (Pro) appear only with Lumtera Pro.

| Group | Sections |
| --- | --- |
| Checking | General · Checks · Ignore rules (Pro) |
| Fixing | Site fixes · AI suggestions · Fix approvals (Pro) · Issue trackers (Pro) |
| Feedback and notifications | Feedback · Response targets (Pro) · Email summary · Alerts (Pro) · Integrations (Pro) |
| People | Permissions · Branding (Pro). With Pro, the group is called **People and branding**. |
| Lumtera Pro | License (Pro). Until a license key is active, this group is listed first. |

See [Settings](/settings).

### Network Admin {#network-admin}

When Lumtera Pro is network-activated on a multisite network, **Network Admin** gets its own **Lumtera** menu for super admins, with two items: **Overview** (**Accessibility across the network**: every site's automated score from its last checks, worst first) and **License** (the one network license). The network overview and the network license need the Agency or Unlimited plan; on a lower plan the overview says which plan includes it, and Pro works on the main site only. See [Multisite network](/pro/multisite).

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
| Admin bar, on the front end | **Accessibility**, with a red badge counting this content's errors: opens review mode on the live page, with the **This post**, **Whole page**, **Keyboard**, **Manual** and **Screen reader** tabs (**This post** only on a single post or page). Its menu shows this content's counts and the last whole-page result, with **Check this page**, **Fix in the editor** and **Open the accessibility overview**. Shown on posts you can edit to roles allowed to review pages (by default, anyone who can edit posts), and on the blog home page, archives, search results and the shop to people who can also see the reports. | [Review mode](/review-mode#the-admin-bar-menu) |
| Posts, Pages and Products lists | **Accessibility** column with each item's status and score. Sortable by score. | [Site report](/site-report#the-accessibility-column) |
| Dashboard | **Lumtera Accessibility** widget with your score and the pages that need attention. Shown to report roles. | [Site report](/site-report#dashboard-widget) |
| Media Library | Alt text details and ADA Title II exception tags on files | [Alt text manager](/alt-text), [Exception tags](/statement#exception-tags) |
| Blocks | **Accessibility statement link**, **Accessibility feedback form** and **Plain-language summary** | [Statement](/statement#link-to-your-statement), [Feedback form](/feedback) |
| Users | **Lumtera Reporter** role for agency hubs, and **Accessibility client** with Lumtera Pro | [Roles & permissions](/permissions) |
| Tools → Export / Erase Personal Data | Lumtera's dismissals, feedback, fix history, accepted AI alt text and manual check results | [Data & uninstall](/developers/data) |

Who can see what is covered in [Roles & permissions](/permissions).
