---
title: What Lumtera Pro adds
description: Lumtera Pro is an optional add-on for the free Lumtera plugin. It adds whole-page and PDF checks, alerts, fix tracking, client reports and an agency portfolio.
---

<script setup>
import { withBase } from 'vitepress'
</script>

# What Lumtera Pro adds

Lumtera Pro is an add-on for the free [Lumtera](/) plugin. **Everything in the free plugin stays free**, with no page limits. Pro adds tools for keeping a site accessible over time, and for reporting on it to clients.

<div class="pro-callout"><strong>Get Lumtera Pro</strong>: plans start at one site. <a href="https://mantrabrain.com/plugins/lumtera/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=lumtera-docs" target="_blank" rel="noopener">Compare plans and pricing →</a></div>

## Features

| Feature | What it does | Plan |
| --- | --- | --- |
| [Page checks](/pro/page-checks) | Tests whole live pages (theme, menus, footer, checkout) with your theme's real CSS, and re-checks up to 25 key pages daily or weekly as a logged-out visitor. | All plans |
| [PDF checks](/pro/documents) | Checks the PDFs in your Media Library for tags, a title, a language, real text, bookmarks and restrictive security settings. | All plans |
| [Monitoring & alerts](/pro/monitoring) | Email and Slack alerts when a publish adds new errors, a weekly summary email, and score history on the Overview. | All plans |
| [Fix tracking](/pro/fix-tracking) | Assign issues to people. A re-scan confirms each fix and closes the task. Full history for every task. | All plans |
| [Client reports](/pro/reports) | Branded, printable reports with all 55 WCAG 2.2 A and AA criteria, plus CSV export of findings. | All plans |
| White-label reports | Hides the "Generated with Lumtera" credit on reports. | Freelancer and up |
| [Agency portfolio](/pro/portfolio) | Every client site on one screen, connected straight from their WordPress. | Agency and up |
| [Multisite network overview](/pro/multisite) | Every site in a network on one Network Admin screen. | Agency and up |
| [Activity log & webhooks](/pro/activity-webhooks) | Who changed what, and when. Send events to Slack, Microsoft Teams or your own tools. | All plans |

## Plans

| Plan | Sites | Includes |
| --- | --- | --- |
| Personal | 1 | Every Pro feature except white-label and the portfolio |
| Freelancer | 5 | Adds white-label reports |
| Agency | 25 | Adds the agency portfolio and the multisite network overview |
| Unlimited | Unlimited | Everything |

See [pricing](https://mantrabrain.com/plugins/lumtera/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=lumtera-docs) for current prices. Report branding (logo, colors, agency name) is included in **every** plan. Only hiding the Lumtera credit needs Freelancer or higher.

## Where Pro appears in WordPress

Pro adds these screens under <span class="screen-path">Accessibility</span>:

| Menu | Who can open it |
| --- | --- |
| **Page checks** | Editors and administrators |
| **Documents** | Editors and administrators |
| **Fixes** (**My fixes** for authors and contributors) | Anyone who can edit posts |
| **Activity** | Administrators |
| **Reports** | Editors and administrators |
| **Portfolio** | Administrators |

It also adds four tabs to <span class="screen-path">Accessibility → Settings</span>: **Alerts**, **Branding**, **Integrations** and **License**. Once Pro is installed, the free plugin's **Free vs Pro** screen is hidden.

## Install Lumtera Pro

<ol class="step-list">
  <li>Install and activate the free <strong>Lumtera</strong> plugin first. Pro is an add-on and won't run without it.</li>
  <li>Download <code>lumtera-pro.zip</code> from your <a href="https://store.mantrabrain.com/account/" target="_blank" rel="noopener">MantraBrain account</a>.</li>
  <li>Go to <span class="screen-path">Plugins → Add New → Upload Plugin</span>, choose the zip, and click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
  <li>Enter your license key under <span class="screen-path">Accessibility → Settings → License</span>. See <a :href="withBase('/pro/license')">License &amp; plans</a>.</li>
</ol>

If the free plugin is missing, you'll see: *"Lumtera Pro is an add-on and needs the free Lumtera plugin installed and active."*

## Requirements

- WordPress 6.6 or later, PHP 8.1 or later
- The free Lumtera plugin, active
- For scheduled work (alerts, scheduled checks, the weekly summary): working WP-Cron or Action Scheduler. See [Troubleshooting](/troubleshooting#scheduled-tasks-run-late-or-not-at-all).
