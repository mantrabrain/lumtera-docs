---
title: Installation
description: Install Lumtera, check all your content, and open the editor sidebar. Requirements, first run and how to add Lumtera Pro.
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

## Your first check

After you activate it, a notice says **"Lumtera is ready."** on the Dashboard and Plugins screens, until you run your first check or dismiss it.

<ol class="step-list">
  <li>Click <strong>Check my site</strong>, or go to <span class="screen-path">Accessibility → Overview</span>.</li>
  <li>Click <strong>Check all content</strong>. Lumtera checks your posts, pages and products in small batches on your own server. Keep the tab open until it finishes. You can carry on working in another tab.</li>
  <li>When it's done, the Overview shows your average score, errors, items that need review, and the most common issues. See <a :href="withBase('/site-report')">Site report</a>.</li>
</ol>

From now on, content is checked again each time it's saved, so you don't need to re-run the full check.

## Check a post as you write

Open any post in the block editor and click the **Lumtera icon** in the top toolbar. The **Accessibility** sidebar lists every issue in the post, with a fix for each one. See [Block editor sidebar](/block-editor).

## Add Lumtera Pro (optional)

[Lumtera Pro](/pro/) is a separate add-on plugin. Keep the free plugin active, then upload and activate `lumtera-pro.zip` and enter your license key. See [Lumtera Pro](/pro/).

## Multisite

Lumtera can be network-activated or activated per site. Each site keeps its own settings and results. See [Multisite network](/pro/multisite).

## Uninstalling

Deactivating Lumtera removes nothing. Deleting it removes its results and settings, but keeps any accessibility statement page you created. See [Data & uninstall](/developers/data).
