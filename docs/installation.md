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

The four **Pro** screens in the Lumtera menu (**Page checks**, **Reports**, **Evidence** and **Portfolio**) are there only while Lumtera Pro isn't installed. They describe what each Pro feature does, without prices, and they disappear once Pro is active. See [Your WordPress admin](/admin-map#without-lumtera-pro).

## Your first check

After you activate it, a notice says **"Lumtera is ready."** on the Dashboard and Plugins screens, until you run your first check or dismiss it.

<ol class="step-list">
  <li>Click <strong>Check my site</strong>, or go to <span class="screen-path">Lumtera → Overview</span>.</li>
  <li>Click <strong>Check all content</strong>. Lumtera checks your posts, pages and products, and your site parts such as menus and template parts, in small batches on your own server. Keep the tab open until it finishes. You can carry on working in another tab. If the check stops, the Overview offers <strong>Continue where it stopped</strong>.</li>
  <li>When it's done, the Overview shows your average score, errors, items that need review, your coverage and the most common issues. See <a :href="withBase('/site-report')">Site report</a>.</li>
</ol>

From now on, content is checked again each time it's saved, so you don't need to re-run the full check.

The Overview also shows a **Get started** checklist: check your content, check your site parts, turn on the baseline [site fixes](/site-fixes), test your home page by hand, and create your [statement](/statement) and [feedback form](/feedback). Dismiss it whenever you like.

## What automated checks cover

With review mode's whole-page checks, Lumtera's automated checks cover **37 of 55** WCAG 2.2 A and AA criteria, fully or in part. The checks of saved content alone cover **25 of 55**. Covering a criterion means a check looks at it, not that your site meets it. The rest need a person: the [guided checklists](/manual-checks) walk you through them. The Overview shows your own site's number, worked out from the checks you have switched on. See [What automated testing can't do](/manual-testing).

## Check a post as you write

Open any post in the block editor and click the **Lumtera icon** in the top toolbar. The **Lumtera Accessibility** sidebar lists every issue in the post, with a fix for each one. See [Block editor sidebar](/block-editor).

## Check a whole page

View a post or page you can edit and choose **Accessibility** in the admin bar. [Review mode](/review-mode) checks the page as rendered, theme included, and can walk it with the keyboard.

## Add Lumtera Pro (optional)

[Lumtera Pro](/pro/) is a separate add-on plugin. Keep the free plugin active, then upload and activate `lumtera-pro.zip` and enter your license key. See [Lumtera Pro](/pro/).

## Multisite

Lumtera can be network-activated or activated per site. Each site keeps its own settings and results. See [Multisite network](/pro/multisite).

## Uninstalling

Deactivating Lumtera removes nothing. Deleting it removes its results and settings, but keeps any accessibility statement page you created. Feedback messages are removed too, so export anything you need to keep first. See [Data & uninstall](/developers/data).
