---
title: Site parts
description: How Lumtera checks the parts of your site that appear on many pages, such as template parts, synced patterns, navigation, classic menus and widget areas, shows where each issue comes from, and lets you fix it once.
---

# Site parts

Your header, footer, menus and patterns appear on many pages. A problem in one of them, such as a menu link with no text, is really one problem, even if it shows on every page. Lumtera checks these **site parts** on their own, reports each problem once, against the part it comes from, and lets you fix it there.

## What counts as a site part

- **Template parts**, such as the header and footer of a block theme
- **Synced patterns** (reusable blocks)
- **Navigation** menus (the Navigation block)
- **Classic menus**, from <span class="screen-path">Appearance → Menus</span>
- **Widget areas**, from <span class="screen-path">Appearance → Widgets</span>

## When they are checked

Site parts are checked:

- when a part is saved, for example when you save a template part in the Site Editor or a menu in Appearance → Menus
- when you change theme
- after **Check all content** on the Overview
- when you click **Check site parts now** on the **Site parts** tab of the Content report
- from WP-CLI, with `wp lumtera scan --parts` (see [WP-CLI](/developers/wp-cli))

Nothing runs for visitors. Up to 200 parts are checked in one go, and the tab says when more were left out.

## Where issues come from

When a post uses a site part, an issue found in the post says where it comes from, for example *"Comes from Footer (template part) — fix it once there"*. You see this in:

- the Content report's **By issue** view and **Fix once, clear many** card
- the block editor sidebar
- review mode's **Whole page** tab, for issues in the theme, menus and footer

To trace issues back, Lumtera marks each part in the markup while it checks. These markers are added only during a check, and never reach your visitors.

## The Site parts tab

<span class="screen-path">Lumtera → Checks → Content</span> has a **Site parts** tab. It lists each part with issues, what kind of part it is, the issues found and when it was last checked, with a link to edit it: **Open in Site Editor**, **Edit the pattern**, **Edit the menu** or **Edit the widgets**. Parts from your theme say which theme they come from.

People who edit the theme start in the **Site parts & code** view, which opens this tab. In the **My content** view, issues from site parts are folded away under *"Not in your content — comes from …, owned by site administrators"*, so writers see only what they can fix in their own content. See [Content report](/site-report#content-report).

## Fix it once

Fix a problem in the part and every page that uses it gets the fix. You can:

- open the part from the **Site parts** tab and fix it there, or
- use **Fix at the source** in the fix dialog, which changes only that block of the part, then checks the pages that use it again. See [Fix at the source](/fixing-issues#fix-at-the-source).

Widgets are fixed in <span class="screen-path">Appearance → Widgets</span>.

## Good to know

- **Widget areas are checked as your theme wraps them.** Widgets that WordPress prints as list items are checked inside a list, so they don't cause "list item outside a list" false alarms.
- **Some checks look at the whole page**, such as the heading outline or landmarks. For those, a shared part may be fine on one page and not on another, so fix them on the pages, or change the part only if every page needs the same change.
- **Whole-page checks** in [review mode](/review-mode#whole-page) see the rendered page, CSS included, which the site parts check doesn't.

## For developers

`wp lumtera scan --parts` checks site parts instead of posts. The `lumtera_scan_site_parts` filter and the `lumtera_parts_scan_done` action let you change what is checked and react when a run finishes. See [Hooks & filters](/developers/hooks).
