---
title: Installation
description: Install Lumtera, check all your content, and open the editor sidebar. Requirements, what Lumtera promises, the first run and how to add Lumtera Pro.
---

<script setup>
import { withBase } from 'vitepress'
</script>

# Installation

## Requirements

- WordPress **6.6** or later
- PHP **8.1** or later, with the **DOM** extension (`php-xml`). Most hosts have it switched on. If yours doesn't, Lumtera shows a notice asking you to have your host enable it, and doesn't start.

Optional:

- WordPress **6.9+** for the [Abilities API](/developers/abilities), which lets AI assistants run Lumtera's checks.
- WordPress **7.0+** and an AI provider connected under <span class="screen-path">Settings → Connectors</span> for [AI suggestions](/ai): alt text, link text, headings and plain-language summaries.

## Install the free plugin

<ol class="step-list">
  <li>In WordPress, go to <span class="screen-path">Plugins → Add New</span>.</li>
  <li>Search for <strong>Lumtera</strong>. Click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
</ol>

Or upload the zip: <span class="screen-path">Plugins → Add New → Upload Plugin</span>, choose `lumtera.zip`, then **Install Now** and **Activate**.

Lumtera needs no account and no API key. Everything runs inside your own WordPress.

## Our promises

- No account.
- Nothing leaves your site unless you turn on your own AI provider or the Akismet spam check for the feedback form.
- No overlay: nothing is added for visitors unless you add it.
- Every fix is shown before it is saved, and can be undone.
- No nags: no pop-ups or upgrade notices. [Pro tips](/site-report#pro-tips) are one line and can be dismissed.
- Every check, and fixing issues one at a time, stays free.

The five **Pro** preview screens in the Lumtera menu (**Page checks** under **Checks**, **Fixes queue** under **Fixes**, **Reports** and **Evidence** under **Reports**, and **Portfolio**) are there only while Lumtera Pro isn't installed. They describe what each Pro feature does, without prices, and they disappear once Pro is active. See [Your WordPress admin](/admin-map#without-lumtera-pro).

## Your first check

After you activate it, a notice says **"Lumtera is ready."** on the Dashboard and Plugins screens, until you run your first check or dismiss it.

<ol class="step-list">
  <li>Click <strong>Check my site</strong>, or go to <span class="screen-path">Lumtera → Overview</span>.</li>
  <li>Click <strong>Check all content</strong>. Lumtera checks your posts, pages and products, and your site parts such as menus and template parts, in small batches on your own server. Keep the tab open until it finishes. You can carry on working in another tab. If the check stops, the Overview offers <strong>Continue where it stopped</strong>.</li>
  <li>When it's done, the progress bar says what was found, for example <em>"Done — 6 items checked: 2 errors on 2 items, 5 to review."</em>, with <strong>See what to fix</strong>, which takes you to the items that need attention. The Overview's numbers update in place: your average score, errors, items that need review, your coverage and the most common issues. See <a :href="withBase('/site-report')">Site report</a>.</li>
</ol>

From now on, content is checked again each time it's saved, so you don't need to re-run the full check.

The Overview also shows a **Get started** checklist: check your content, check your site parts, turn on the baseline [site fixes](/site-fixes), test your home page by hand, and create your [statement](/statement) and [feedback form](/feedback). Dismiss it whenever you like.

## What automated checks cover

With review mode's whole-page checks, Lumtera's automated checks cover **37 of 55** WCAG 2.2 A and AA criteria, fully or in part. The checks of saved content alone cover **25 of 55**. Covering a criterion means a check looks at it, not that your site meets it. The rest need a person: the [guided checklists](/manual-checks) walk you through them. The Overview shows your own site's number, worked out from the checks you have switched on. See [What automated testing can't do](/manual-testing).

## Check a post as you write

Open any post in the block editor and click the **Lumtera icon** in the top toolbar. The **Lumtera Accessibility** sidebar lists every issue in the post, with a fix for each one. See [Block editor sidebar](/block-editor).

## Check a whole page

View any page of your site while logged in (a post or page you can edit, or, if you can see Lumtera's reports, the blog home page, an archive, search results or the shop) and choose **Accessibility** in the admin bar. [Review mode](/review-mode) checks the page as rendered, theme included, and can walk it with the keyboard.

## Add Lumtera Pro (optional)

[Lumtera Pro](/pro/) is a separate add-on plugin. Keep the free plugin active, then upload and activate `lumtera-pro.zip` and enter your license key. Lumtera Pro 1.1.0 needs Lumtera 1.2.1 or newer: with an older version, Pro shows *"Lumtera Pro needs Lumtera 1.2.1 or newer. Please update Lumtera."* and stays off until you update. See [Lumtera Pro](/pro/#requirements).

## Multisite

Lumtera can be network-activated or activated per site. Each site keeps its own settings and results, and each site's administrators choose what happens to its data when Lumtera is deleted. With Lumtera Pro on the Agency or Unlimited plan, a network overview and one network license are added. See [Multisite network](/pro/multisite).

## Uninstalling

Deactivating Lumtera removes nothing. When you delete it, Lumtera keeps your results, settings and feedback messages by default, so installing it again picks them up. The Plugins screen shows *Data is kept if deleted* under Lumtera. To remove everything instead, choose **Delete everything** under <span class="screen-path">Lumtera → Settings → General → When Lumtera is deleted</span>, where you can also download every feedback message as CSV first. Any accessibility statement page you created is always kept. See [Settings](/settings#when-lumtera-is-deleted) and [Data & uninstall](/developers/data).
