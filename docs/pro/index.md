---
title: What Lumtera Pro adds
description: Lumtera Pro is an optional add-on for the free Lumtera plugin. It adds live page checks, form tests, PDF checks, a fixes queue, alerts, fix tracking, evidence, client reports, a conformance report and a client portfolio.
---

<script setup>
import { withBase } from 'vitepress'
</script>

# What Lumtera Pro adds

Lumtera Pro is an add-on for the free [Lumtera](/) plugin. **Everything in the free plugin stays free**, with no page limits. That includes review mode's whole-page checks and the Content report's **Export CSV**. Pro adds tools for keeping a site accessible over time, and for reporting on it to clients.

<div class="pro-callout"><strong>Get Lumtera Pro</strong>: plans start at one site. <a href="https://mantrabrain.com/plugins/lumtera/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=lumtera-docs" target="_blank" rel="noopener">Compare plans and pricing →</a></div>

## Features

### Checking

| Feature | What it does | Plan |
| --- | --- | --- |
| [Page checks](/pro/page-checks) | Checks whole live pages (theme, menus, footer, checkout) with your theme's real CSS, at desktop and phone width. It runs the same engine as [review mode](/review-mode), plus hover, focus and pressed-state contrast and a check for carousels that move on their own. Scheduled checks re-check your key pages daily or weekly as a logged-out visitor. | Every plan |
| [Form tests](/pro/form-tests) | Submits a form empty in a hidden frame, safely, and checks how its errors are shown and announced. Works with Contact Form 7, WPForms, Gravity Forms, the WooCommerce checkout and plain HTML forms. | Every plan |
| [Signed-in checks](/pro/signed-in-checks) | Checks My account, cart, checkout and members' pages as a test user with the role you choose. | Every plan: 1 role on Business and Freelancer, any number on Agency and Unlimited |
| [Consistency across pages](/pro/consistency) | Compares the pages checked for menu order, link names, where help is, and a search box or site map. | Freelancer and up |
| [PDF checks](/pro/documents) | Checks the PDFs in your Media Library for tags, a title, a language, real text, bookmarks and restrictive security settings. | Every plan |
| [Test sessions](/pro/test-sessions) | Records a person's tests of each template, with the assistive technology and browser used, and a sign-off. | Every plan |
| [Ignore everywhere](/pro/ignore) | Hides a finding that repeats on every page, such as a theme footer, with a reason, an optional expiry and a log. | Every plan |

### Fixing

| Feature | What it does | Plan |
| --- | --- | --- |
| [Fixes queue](/pro/fixes-queue) | Proposes fixes for many pages at once, or once at the source for a header, footer, pattern or menu. You review each change, then apply it in the background. Every fix can be undone. | Every plan |
| Approval rule | Requires a second person to approve each fix in the [fixes queue](/pro/fixes-queue#require-a-second-person-to-approve). | Agency and up |
| [Fix tracking](/pro/fix-tracking) | Assign issues to people. A re-scan confirms each fix and closes the task. Send fixes to GitHub, GitLab, Jira or Linear. | Every plan |
| [Monitoring & alerts](/pro/monitoring) | Email and Slack alerts when a publish adds new errors, a weekly digest email, and score history on the Overview. | Every plan |

### Reporting and records

| Feature | What it does | Plan |
| --- | --- | --- |
| [Client reports](/pro/reports) | Branded, printable reports with all 55 WCAG 2.2 A and AA criteria. | Every plan |
| White-label reports | Hides the Lumtera credit on client reports and conformance reports. | Freelancer and up |
| Client emails and share links | Email reports to clients on a schedule, and share a report with a private link. See [Client reports](/pro/reports) and [Client portfolio](/pro/portfolio). | Freelancer and up |
| [Conformance report (ACR)](/pro/acr) | A draft Accessibility Conformance Report in the VPAT 2.5 layout, filled in from your automated and manual results, for you to review. | Every plan |
| [Evidence log](/pro/evidence) | A tamper-evident timeline of scans, tests, fixes, feedback and statement changes, with an evidence pack to print or export. Not legal advice. | Every plan |
| [Compare scans](/pro/compare-scans) | Shows what is new, fixed and still there between two scans, by check and by site part. | Every plan |
| [Feedback response targets](/pro/feedback-targets) | Your own reply goals for visitor feedback, with an **Overdue** view. | Every plan |
| [Burden records](/pro/burden) | Records of disproportionate burden decisions, with a public summary for your statement. Not legal advice. | Every plan |
| [Activity log & webhooks](/pro/activity-webhooks) | Who changed what, and when. Send events to Slack, Microsoft Teams or your own tools. | Every plan |
| [Client portfolio](/pro/portfolio) | Your client sites on one screen, connected straight from their WordPress. | Freelancer and up |
| [Multisite network](/pro/multisite) | One license for a whole network, and every site on one Network Admin screen. | Agency and up |

## Plans

Without Pro, **Free vs Pro** in the Lumtera menu compares the free plugin with each plan, feature by feature, without prices.

![The Free vs Pro screen: features by plan, Free, Business, Freelancer and Agency or Unlimited](/screenshots/free-vs-pro.webp)

| | Business | Freelancer | Agency | Unlimited |
| --- | --- | --- | --- | --- |
| Sites | 1 | 5 | 25 | Unlimited |
| Pages per scheduled run | 25 | 100 | 250 | 500 |
| Fixes per queue run | 25 | 100 | 250 | 500 |
| Client portfolio | — | 5 client sites | 25 client sites | No set number |
| Signed-in checks | 1 role | 1 role | Any number of roles | Any number of roles |

Each plan is sold yearly or as a lifetime license. Both include the same features.

**Every plan includes** page checks and scheduled checks, signed-in checks, form tests, hover and focus contrast, the carousel check, PDF checks, test sessions, the evidence log, compare scans, the fixes queue, fix tracking and issue trackers, alerts and the weekly digest, ignore rules, the activity log and webhooks, feedback response targets, burden records, client reports with your branding, the conformance report (ACR) and the client role.

**Freelancer and up** add white-label reports, the client portfolio, client emails, share links and consistency checks across pages.

**Agency and up** add signed-in checks as any number of roles, the approval rule for fixes, the multisite network overview and a network-wide license.

A feature or limit above your plan shows a short note naming the plan that includes it, with **See the … plan** and **Upgrade in your account** links. See [pricing](https://mantrabrain.com/plugins/lumtera/pricing/?utm_source=docs&utm_medium=referral&utm_campaign=lumtera-docs) for current prices, and [License & plans](/pro/license#plans) for how upgrades work.

## Where Pro appears in WordPress

The <span class="screen-path">Lumtera</span> menu has one item per group. Each group's screens show as sub-tabs at the top of the page. With Pro active, the groups are:

| Group | Pro screens in it | Who can open them |
| --- | --- | --- |
| **Checks** | **Page checks**, **Documents**, **Test sessions** (next to the free **Content** report) | Roles with the **See reports and check the site** permission (editors and administrators by default) |
| **Fixes** | **Fix tracking** and **Fixes queue** (next to the free **Alt text**) | **Fix tracking**: anyone who can edit posts. Authors and contributors see it as **My fixes**. **Fixes queue**: roles that can propose or approve fixes (see [Fixes queue](/pro/fixes-queue#who-can-propose-and-approve)) |
| **Reports** | **Reports**, **Evidence**, **Compare scans**, **Activity**. The conformance report (ACR) opens from **Reports**. | **Reports** and the ACR: the **See reports and check the site** permission. **Evidence**, **Compare scans** and **Activity**: administrators |
| **Feedback & statement** | **Burden records** (next to the free **Feedback** and **Statement**) | Editors and administrators |
| **Portfolio** | **Client portfolio** | Administrators |

The permission is set under <span class="screen-path">Lumtera → Settings → Permissions</span>. See [Permissions](/permissions).

Pro also adds these sections to <span class="screen-path">Lumtera → Settings</span>, for administrators. The settings index groups them with the free plugin's sections, and **Find a setting** searches them all.

| Settings group | Pro sections |
| --- | --- |
| Checking | **Ignore rules**: see [Ignore everywhere](/pro/ignore) |
| People | **Fix approvals**: see [Fixes queue](/pro/fixes-queue#fix-approvals-settings) |
| Notifications | **Alerts**: see [Monitoring & alerts](/pro/monitoring) |
| Visitor feedback | **Response targets**: see [Feedback response targets](/pro/feedback-targets) |
| Reports and integrations | **Branding**: see [Client reports](/pro/reports). **Integrations**: see [Activity log & webhooks](/pro/activity-webhooks). **Issue trackers**: see [Fix tracking](/pro/fix-tracking#issue-trackers) |
| Lumtera Pro | **License**: see [License & plans](/pro/license) |

Once Pro is installed:

- the free plugin's **Free vs Pro** screen, upgrade buttons and [Pro tips](/site-report#pro-tips) are hidden.
- after you activate a license, a [first-run checklist](/pro/license#first-run-checklist) for your plan appears on the Overview and the License screen, in place of the free plugin's getting-started checklist.
- while the license is active, Pro's [weekly digest](/pro/monitoring#weekly-summary) replaces the free plugin's [weekly email summary](/email-summary). Its settings are kept. If Pro is installed but its license isn't active, the free summary is still sent.

Without Pro, four Pro screens appear in the menu as previews marked **Pro**: **Page checks**, **Reports**, **Evidence** and **Portfolio**. Each one describes what the feature does, without prices. The other Pro screens aren't listed until Pro is installed, so the **Fixes** group shows only **Alt text**, as <span class="screen-path">Lumtera → Alt text</span>.

## Install Lumtera Pro

<ol class="step-list">
  <li>Install and activate the free <strong>Lumtera</strong> plugin first. Pro is an add-on and won't run without it.</li>
  <li>Download <code>lumtera-pro.zip</code> from your <a href="https://store.mantrabrain.com/account/" target="_blank" rel="noopener">MantraBrain account</a>.</li>
  <li>Go to <span class="screen-path">Plugins → Add New → Upload Plugin</span>, choose the zip, and click <strong>Install Now</strong>, then <strong>Activate</strong>.</li>
  <li>Enter your license key under <span class="screen-path">Lumtera → Settings → License</span>, or in the <strong>License key</strong> field on any Pro screen. See <a :href="withBase('/pro/license')">License &amp; plans</a>.</li>
</ol>

If the free plugin is missing, you'll see: *"Lumtera Pro is an add-on and needs the free Lumtera plugin installed and active."*

## Requirements

- WordPress 6.6 or later, PHP 8.1 or later
- The free Lumtera plugin, active
- For scheduled work (alerts, scheduled checks, the weekly digest, PDF checks in the background, the fixes queue, portfolio syncs, webhooks): working WP-Cron or Action Scheduler. See [Troubleshooting](/troubleshooting#scheduled-tasks-run-late-or-not-at-all).
