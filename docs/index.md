---
title: Lumtera Documentation
description: Guides and reference for Lumtera, the WCAG 2.2 accessibility checker for WordPress. Find and fix accessibility problems as you write. Not an overlay.
aside: false
prev: false
next:
  text: Installation
  link: /installation
---

<script setup>
import { withBase } from 'vitepress'
</script>

<div class="lt-hero">
  <span class="lt-hero__eyebrow">Lumtera 1.0 · Free + Pro</span>
  <h1 class="lt-hero__title">Find and fix accessibility problems while you write.</h1>
  <p class="lt-hero__lede">Lumtera checks your posts, pages and products against <strong>WCAG 2.2 level A and AA</strong>. Each issue appears next to the block that caused it, with a plain-language fix. Many issues have a one-click fix. Lumtera is <strong>not an overlay</strong>: it adds nothing to your site for visitors. It helps you fix the content itself.</p>
  <div class="lt-hero__actions">
    <a class="lt-btn lt-btn--primary" :href="withBase('/installation')">Install Lumtera</a>
    <a class="lt-btn lt-btn--ghost" :href="withBase('/quick-start')">Quick start</a>
    <a class="lt-btn lt-btn--ghost" :href="withBase('/checks')">Browse all 64 checks</a>
  </div>
  <ul class="lt-hero__chips" aria-label="Requirements">
    <li>WordPress 6.6+</li>
    <li>PHP 8.1+</li>
    <li>Block editor, classic editor &amp; page builders</li>
    <li>No account, no API key</li>
  </ul>
</div>

## Start here

<div class="lt-cards">

<a class="lt-card" :href="withBase('/installation')">
  <h3>Install &amp; first scan</h3>
  <p>Install the free plugin, scan everything you've already published and read your first results.</p>
  <span class="lt-card__cta">Install →</span>
</a>

<a class="lt-card" :href="withBase('/block-editor')">
  <h3>Check while you write</h3>
  <p>The editor sidebar, quick fixes, jumping to the block, and the check before publishing.</p>
  <span class="lt-card__cta">Use the sidebar →</span>
</a>

<a class="lt-card" :href="withBase('/review-mode')">
  <h3>Review the live page</h3>
  <p>Outline issues on the published page and check the whole page, theme included.</p>
  <span class="lt-card__cta">Open review mode →</span>
</a>

<a class="lt-card" :href="withBase('/site-report')">
  <h3>Site report</h3>
  <p>Your score, the same issue grouped across pages, and a filterable report of every post, page and product.</p>
  <span class="lt-card__cta">Read the report →</span>
</a>

<a class="lt-card" :href="withBase('/checks')">
  <h3>All checks</h3>
  <p>Every check with its WCAG criterion, default severity and how to fix what it finds.</p>
  <span class="lt-card__cta">See the checks →</span>
</a>

<a class="lt-card" :href="withBase('/scoring')">
  <h3>Scores &amp; severities</h3>
  <p>How the score is worked out, and what Error, Needs review and Tip mean.</p>
  <span class="lt-card__cta">Understand scores →</span>
</a>

</div>

## Tools in the free plugin

<div class="lt-cards">

<a class="lt-card" :href="withBase('/alt-text')">
  <h3>Alt text manager</h3>
  <p>Every image in the Media Library on one screen. Describe an image once and add the text to the posts that use it.</p>
</a>

<a class="lt-card" :href="withBase('/manual-checks')">
  <h3>Guided manual checks</h3>
  <p>Nine step-by-step checks for what no tool can test, such as keyboard use and zoom, with results saved on each page.</p>
</a>

<a class="lt-card" :href="withBase('/page-builders')">
  <h3>Page builders &amp; custom fields</h3>
  <p>Elementor, Divi, Beaver Builder, Bricks, Oxygen and WPBakery layouts, and Advanced Custom Fields values, checked from their real output.</p>
</a>

<a class="lt-card" :href="withBase('/ai')">
  <h3>AI suggestions</h3>
  <p>Optional and off by default: alt text, link text, headings and plain-language summaries. A person approves every one.</p>
</a>

<a class="lt-card" :href="withBase('/site-fixes')">
  <h3>Site fixes</h3>
  <p>Small server-side fixes for common theme problems: skip link, focus ring, zoom and more. Each one is off by default.</p>
</a>

<a class="lt-card" :href="withBase('/statement')">
  <h3>Accessibility statement</h3>
  <p>A draft statement page that follows the W3C structure and includes the sections the EAA needs.</p>
</a>

<a class="lt-card" :href="withBase('/permissions')">
  <h3>Permissions</h3>
  <p>Choose which roles see the reports, dismiss errors and use review mode.</p>
</a>

<a class="lt-card" :href="withBase('/email-summary')">
  <h3>Weekly email summary</h3>
  <p>Optional. Your score and how it changed, top issues and pages that got worse, sent by your own site.</p>
</a>

</div>

## Lumtera Pro <span class="pro-pill">Pro</span> {#lumtera-pro}
Everything above is free, with no page limits. [Lumtera Pro](/pro/) is an optional add-on for teams and agencies:

<div class="lt-cards">

<a class="lt-card" :href="withBase('/pro/page-checks')">
  <h3>Page checks</h3>
  <p>Whole pages tested with your theme's real CSS, plus scheduled daily or weekly checks of key pages.</p>
</a>

<a class="lt-card" :href="withBase('/pro/monitoring')">
  <h3>Monitoring &amp; alerts</h3>
  <p>Email and Slack alerts when a publish adds new errors, a weekly summary and score history.</p>
</a>

<a class="lt-card" :href="withBase('/pro/fix-tracking')">
  <h3>Fix tracking</h3>
  <p>Assign issues to people. Tasks close themselves when a re-scan confirms the fix.</p>
</a>

<a class="lt-card" :href="withBase('/pro/ignore')">
  <h3>Ignore everywhere</h3>
  <p>Ignore a repeated finding across the whole site, with a reason, an expiry and a log.</p>
</a>

<a class="lt-card" :href="withBase('/pro/reports')">
  <h3>Client reports</h3>
  <p>Branded reports covering all 55 WCAG 2.2 A and AA criteria, with PDF and CSV export and white-label.</p>
</a>

<a class="lt-card" :href="withBase('/pro/acr')">
  <h3>Accessibility Conformance Report</h3>
  <p>A report in the VPAT 2.5 format, filled from your automated and manual results, for you to review and edit.</p>
</a>

<a class="lt-card" :href="withBase('/pro/portfolio')">
  <h3>Agency portfolio</h3>
  <p>All your client sites on one dashboard, connected straight from their WordPress. No cloud service in between.</p>
</a>

<a class="lt-card" :href="withBase('/pro/documents')">
  <h3>PDF checks</h3>
  <p>PDFs in your Media Library checked for tags, a title, a language, scanned pages and encryption.</p>
</a>

</div>

## For developers

[WP-CLI](/developers/wp-cli) (including a `check` command with exit codes) · [CI with SARIF and JUnit](/developers/ci) · [REST API](/developers/rest-api) · [Hooks & filters](/developers/hooks) · [Custom checks](/developers/custom-checks) · [Abilities API for AI assistants](/developers/abilities)

::: info Honest by design
Automated testing finds only part of what WCAG covers. Independent studies put it at between a third and a half of real barriers. A score of 100 in Lumtera means "no automated issues found", never "compliant". [What automated testing can't do →](/manual-testing)
:::
