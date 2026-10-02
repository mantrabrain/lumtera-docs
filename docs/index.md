---
title: Lumtera Documentation
description: Guides and reference for Lumtera, the WCAG 2.2 accessibility checker for WordPress. It checks as you write and on the rendered page, keyboard included, with fixes you approve. Not an overlay.
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
  <span class="lt-hero__eyebrow">Lumtera 1.2.1 · Lumtera Pro 1.1.0</span>
  <h1 class="lt-hero__title">Find and fix accessibility problems while you write, and on the live page.</h1>
  <p class="lt-hero__lede">Lumtera checks your posts, pages and products against <strong>WCAG 2.2 level A and AA</strong> as you write, and checks the rendered page, keyboard and widgets included. Each issue is explained in plain words. Fixes are shown before they are saved, and every one can be undone. Lumtera is <strong>not an overlay</strong>: it adds nothing to your site for visitors. It helps you fix the content itself.</p>
  <div class="lt-hero__actions">
    <a class="lt-btn lt-btn--primary" :href="withBase('/installation')">Install Lumtera</a>
    <a class="lt-btn lt-btn--ghost" :href="withBase('/quick-start')">Quick start</a>
    <a class="lt-btn lt-btn--ghost" :href="withBase('/checks')">Browse all 69 checks</a>
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
  <p>33 whole-page checks with your theme included, on any page of your site (posts, the blog home page, archives, search and the shop), a keyboard walk, menu and pop-up tests and a screen reader preview.</p>
  <span class="lt-card__cta">Open review mode →</span>
</a>

<a class="lt-card" :href="withBase('/site-report')">
  <h3>Site report</h3>
  <p>Your score and coverage, the same issue grouped across pages, a filterable report you can export as CSV, and every dismissed issue with who, when and why.</p>
  <span class="lt-card__cta">Read the report →</span>
</a>

<a class="lt-card" :href="withBase('/fixing-issues')">
  <h3>Fix issues, with undo</h3>
  <p>See each change before it is saved, apply it, and undo it. Fix a header or footer problem once, where it comes from.</p>
  <span class="lt-card__cta">Fix issues →</span>
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
  <h3>Guided checklists</h3>
  <p>One step-by-step item for each WCAG criterion that needs a person, with results saved per page and per criterion.</p>
</a>

<a class="lt-card" :href="withBase('/site-parts')">
  <h3>Site parts</h3>
  <p>Menus, template parts, synced patterns and widget areas are checked too, and each issue says where it comes from.</p>
</a>

<a class="lt-card" :href="withBase('/feedback')">
  <h3>Feedback form &amp; inbox</h3>
  <p>A form visitors use to report a barrier or ask for an accessible version, with an inbox, reference numbers and replies.</p>
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
  <p>A draft statement with WCAG 2.1, WCAG 2.2 or EN 301 549, and EAA, UK public sector, ADA Title II and AODA templates.</p>
</a>

<a class="lt-card" :href="withBase('/permissions')">
  <h3>Permissions</h3>
  <p>Choose which roles see the reports, dismiss errors and use review mode.</p>
</a>

<a class="lt-card" :href="withBase('/email-summary')">
  <h3>Weekly email summary</h3>
  <p>Optional. Your score and how it changed, what you fixed, top issues, pages that got worse and a weekly check of your home page, sent by your own site.</p>
</a>

</div>

## Lumtera Pro {#lumtera-pro}

<p><span class="pro-pill">Pro</span> Everything above is free, with no page limits. <a :href="withBase('/pro/')">Lumtera Pro</a> is an optional add-on for teams and agencies. Lumtera Pro 1.1.0 needs Lumtera 1.2.1 or newer (see <a :href="withBase('/pro/#requirements')">requirements</a>).</p>

<div class="lt-cards">

<a class="lt-card" :href="withBase('/pro/page-checks')">
  <h3>Page checks</h3>
  <p>Many pages checked in your browser at desktop and phone width, and scheduled checks as a logged-out visitor.</p>
</a>

<a class="lt-card" :href="withBase('/pro/form-tests')">
  <h3>Form tests</h3>
  <p>Required fields of Contact Form 7, WPForms, Gravity Forms, the WooCommerce classic checkout and plain HTML forms submitted empty to check error messages, focus and announcements, with safeguards so nothing is sent.</p>
</a>

<a class="lt-card" :href="withBase('/pro/fixes-queue')">
  <h3>Fixes queue</h3>
  <p>Propose fixes for the same issue on many pages, review every change, then apply and undo them in the background.</p>
</a>

<a class="lt-card" :href="withBase('/pro/evidence')">
  <h3>Evidence log</h3>
  <p>A tamper-evident log of scans, manual tests, fixes and feedback, with an evidence pack you can print or export.</p>
</a>

<a class="lt-card" :href="withBase('/pro/reports')">
  <h3>Client reports</h3>
  <p>Branded reports covering all 55 WCAG 2.2 A and AA criteria. Share links and white-label from the Growth plan.</p>
</a>

<a class="lt-card" :href="withBase('/pro/acr')">
  <h3>Accessibility Conformance Report</h3>
  <p>A report in the VPAT 2.5 layout, filled from your automated and manual results, on every plan.</p>
</a>

<a class="lt-card" :href="withBase('/pro/portfolio')">
  <h3>Client portfolio</h3>
  <p>From the Growth plan: all your client sites on one screen, connected straight from their WordPress, with trends and client emails.</p>
</a>

<a class="lt-card" :href="withBase('/pro/')">
  <h3>Everything in Pro</h3>
  <p>Signed-in checks, PDF checks, compare scans, test sessions, alerts, fix tracking and more, by plan.</p>
</a>

</div>

## For developers

[WP-CLI](/developers/wp-cli) (a `check` command with exit codes and baselines) · [CI with SARIF and JUnit](/developers/ci) · [REST API](/developers/rest-api) · [Hooks & filters](/developers/hooks) · [Custom checks](/developers/custom-checks) · [Abilities API for AI assistants](/developers/abilities)

::: info Honest by design
With review mode's whole-page checks, Lumtera's automated checks cover **37 of 55** WCAG 2.2 A and AA criteria, fully or in part. The checks of saved content alone cover 25 of 55. Covering a criterion means a check looks at it, not that your site meets it. The rest need a person, and the [guided checklists](/manual-checks) walk you through them. A score of 100 in Lumtera means "no automated issues found", never "compliant". [What automated testing can't do →](/manual-testing) · [How accurate is Lumtera? →](/accuracy)
:::
