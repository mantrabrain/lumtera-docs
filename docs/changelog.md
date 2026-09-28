---
title: Changelog
description: Release notes for Lumtera 1.0.0 to 1.1.0 and Lumtera Pro 1.0.0.
---

# Changelog

## Lumtera 1.1.0 {#lumtera-1-1-0}

- New: a [weekly home page check](/settings#weekly-home-page-check), off by default and one click to turn on. Your home page is checked every week on your own server; new errors show on the [Overview](/site-report#weekly-home-page-check) and in the weekly email.
- [Weekly email](/email-summary): a **Fixed this week** count, the home page check result and an accessible HTML layout with a plain-text copy, plus an optional one-line [note about Lumtera Pro](/email-summary#note-about-lumtera-pro) that you can switch off.
- [Getting started checklist](/quick-start#the-getting-started-checklist): two new steps, trying review mode on your home page and turning on the weekly email with one click. It updates as soon as a check finishes.
- A clearer Free vs Pro page (the weekly summary is free; support is in the WordPress.org forums), and [4 Pro preview screens](/admin-map#without-lumtera-pro) in the menu instead of 10.
- Short [Pro tips](/site-report#pro-tips) at relevant moments, which you can dismiss and which are hidden when Pro is installed. A one-time [request for a review](/site-report#review-request) once you've made progress, which you can snooze or turn off.
- The admin menu is now called **Lumtera**, and the editor sidebar, Elementor panel, classic editor box and Dashboard widget **Lumtera Accessibility**. The Content report's **Compliance** view is now **All findings**.
- The [alt text screen](/alt-text#images-outside-the-media-library) lists images without alt text that aren't in the Media Library. The admin bar item has a [small menu](/review-mode#the-admin-bar-menu) with this content's counts and quick links.
- Works on SQLite, including WordPress Playground.
- Nothing moved from free to Pro: every check and tool stays free.

## Lumtera 1.0.0.3 {#lumtera-1-0-0-3}

Tested feature by feature in Chrome, Firefox and Safari's engine, with fixes for what that found:

- Review mode's keyboard check can be stopped with <kbd>Escape</kbd>, and continues after a reload with **Continue the check**. See [Keyboard](/review-mode#keyboard).
- [Skip link](/site-fixes#add-a-skip-to-content-link) fixes on block themes: when WordPress's own skip link is switched off, the link now has a target, and there is never a second link.
- Document-link labels on sites with a port in the address.
- Keyboard focus stays in place in the guided checklist and the Elementor panel.
- Contrast over SVG images in Firefox, text spacing in Safari, and system focus rings. See [In other browsers](/review-mode#in-other-browsers).
- The Elementor panel asks for an optional reason when dismissing, like the block editor.
- Feedback: a confirmation before deleting a message, and a warning for recipient addresses that are not valid. See [Feedback form and inbox](/feedback).
- The Content report's CSV export follows **Show possible issues**. Widget areas no longer produce "list item outside a list" false positives.

## Lumtera 1.0.0.2 {#lumtera-1-0-0-2}

- More accurate checks, measured against the W3C ACT test cases. Images and SVGs named only by ARIA, form fields built with ARIA roles, invalid language codes, blocked zoom and autocomplete values are now found. Disabled controls, text shadows, short or controllable audio and menu toggle links no longer raise false errors. See [How accurate is Lumtera?](/accuracy).
- New check: [Autocomplete value is not valid](/checks#input-autocomplete-invalid) (WCAG 1.3.5).
- **Check all content** can continue where it stopped, and lists any item that could not be checked. See [Continue a check that stopped](/site-report#continue-a-check-that-stopped).
- A dismissed issue that comes back says why (**Showing again**). See [Showing again](/dismissing#showing-again).
- The weekly email summary shows when sending failed, and can be tested with **Send a test summary now**. See [Weekly email summary](/email-summary#when-sending-fails).
- Faster reports on large sites, and tighter permission and privacy checks.

## Lumtera 1.0.0.1 {#lumtera-1-0-0-1}

- Every inline script and style is added with WordPress's enqueue functions; nothing is printed as a raw `<style>` or `<script>` tag.
- Database queries use fixed SQL with placeholders only.
- Plugin name shortened to "Lumtera – Accessibility Checker".

## Lumtera 1.0.0 {#lumtera-1-0-0}

First public release.

- 69 checks mapped to WCAG 2.2, built to avoid false alarms: checks a machine cannot decide are marked "Needs review", and **Why is this flagged?** explains each finding. See [All checks](/checks).
- Block editor sidebar with live checks, one-click quick fixes, jump to block, dismiss with a reason, and a pre-publish check. Also in Elementor and the classic editor.
- [Review mode](/review-mode) on the live page, with 33 whole-page checks of the rendered page: title, language, landmarks, skip link, headings, contrast, target size, zoom, reflow, text spacing and reading order.
- Contrast everywhere: gradients, text over images, non-text and focus-indicator contrast, and suggested passing colors from your theme palette.
- Keyboard walk: every Tab stop numbered, with checks for visible focus, focus hidden under sticky headers, focus order and possible keyboard traps.
- Widget tests: menus, disclosures, dialogs, tabs and accordions operated from the keyboard, with the page restored afterwards.
- Screen reader preview of headings, landmarks, links and form fields.
- [Fixes you approve](/fixing-issues): a before-and-after review, a revision for every change, a re-check after saving, and undo.
- [Fix at the source](/fixing-issues#fix-at-the-source): fix an issue once in a template part, synced pattern, navigation or classic menu, and re-check the pages that use it.
- [Site parts](/site-parts): menus, widget areas, template parts, synced patterns and navigation are checked, and each issue shows where it comes from.
- Honest coverage meter: how many WCAG 2.2 A/AA criteria the enabled checks cover, shown next to the score, never merged into it. See [Review coverage](/scoring#review-coverage).
- [Guided checklists](/manual-checks) for the criteria that need a person, with results saved per page and per criterion.
- [Accessibility feedback form](/feedback) block and shortcode, with an inbox, reference numbers, statuses, replies, retention and optional Akismet.
- [Accessibility statement](/statement) with WCAG 2.1, WCAG 2.2 and EN 301 549 options and EAA, PSBAR, ADA Title II and AODA templates.
- [ADA Title II exception tags](/statement#exception-tags) that never hide an item from totals or reports.
- [Content report](/site-report#content-report) with My content, Site parts and Compliance views, grouping of the same issue across pages, CSV export and a column in your post lists.
- Whole-page results saved to reports when you choose.
- [Page builders](/page-builders) and custom fields: Beaver Builder, SiteOrigin, Brizy, Visual Composer, Live Composer, Zion Builder, Divi, Bricks, Oxygen, WPBakery and Advanced Custom Fields, plus a fallback for builders that use the content filter.
- Block libraries: Spectra, Kadence Blocks, GenerateBlocks, Stackable, Otter, Essential Blocks, Greenshift and Kubio; WooCommerce product descriptions.
- [Alt text manager](/alt-text) for the Media Library.
- Optional [AI drafts](/ai) through the WordPress AI Client: alt text (also for many images at once), link text, headings and a plain-language summary, always approved by a person.
- Optional server-side [site fixes](/site-fixes) for common theme problems (skip link, focus ring, zoom, link underlines, form labels, new-tab and document-link text), off by default.
- Blocks: Accessibility statement link, Accessibility feedback form and Plain-language summary; `[lumtera_statement_link]` and `[lumtera_feedback]` shortcodes.
- [WP-CLI](/developers/wp-cli) with exit codes, baselines that fail only on new issues, SARIF and JUnit output, and site part scans.
- [REST API](/developers/rest-api), [hooks](/developers/hooks), and [WordPress Abilities](/developers/abilities) for AI assistants: read-only, plus a fix proposal that waits for a person.
- Reading level in six languages, and vague-link checks in English, German, French, Spanish, Italian, Dutch and Portuguese.
- [Permissions](/permissions), a "Lumtera Reporter" role for agency hubs, an optional [weekly email summary](/email-summary) and a dashboard widget.
- Personal data export and erase for dismissals and feedback; fix history is exported and anonymised.
- Multisite support, including clean uninstall across a network.

## Lumtera Pro 1.0.0 {#lumtera-pro-1-0-0}

First release. The current build of 1.0.0 also includes:

- The first plan is now called **Business** (it was Personal). Each plan can be a yearly or a [lifetime license](/pro/license#yearly-and-lifetime-licenses).
- [Signed-in checks](/pro/signed-in-checks) on every plan: 1 role on Business and Freelancer, any number on Agency and Unlimited.
- A [first-run checklist](/pro/license#first-run-checklist) after a license is activated, tailored to the plan, with steps that tick themselves off.
- Plan limits that link to the plan with more, and a quiet tip at 80% of a limit. See [When you reach a limit](/pro/license#when-you-reach-a-limit).
- A [renewal reminder](/pro/license#renewal-reminders) 30 and 7 days before a yearly license expires, on Lumtera screens only. Pro keeps working after a license expires.
- [Compare scans](/pro/compare-scans#updated-between-these-scans) lists the WordPress, theme and plugin updates made between two scans, as a possible cause.
- Scheduled checks keep every finding only a browser can measure from the last browser check of a page. See [What scheduled checks can't do](/pro/page-checks#what-scheduled-checks-can-t-do).
- The [Accessibility client role](/pro/reports#client-role) can read the finished [conformance report](/pro/acr#for-clients).
- Personal data exporters and erasers for fix tracking and disproportionate burden records. See [Privacy](/developers/data#privacy).
- The fixes queue's run routes accept `POST` only. See [REST API](/developers/rest-api#pro-fixes-queue).

Features in 1.0.0:

- [Page checks](/pro/page-checks) in the browser for many pages, at desktop and phone width, on the free plugin's audit engine.
- Scheduled page checks as a logged-out visitor, with key templates found automatically and a per-plan page limit.
- [Signed-in checks](/pro/signed-in-checks) with one-time passes and view-only test users: one role on Business and Freelancer, any number on Agency and Unlimited.
- [Form tests](/pro/form-tests) with dry-run safeguards for Contact Form 7, WPForms, Gravity Forms, WooCommerce checkout and plain HTML forms.
- Hover, focus and pressed-state contrast, and a runtime carousel check.
- [Consistency checks across pages](/pro/consistency) (Freelancer plan and up).
- [PDF checks](/pro/documents) for the Media Library.
- Tamper-evident [evidence log](/pro/evidence) with verification, monthly summaries and an evidence pack.
- [Scan comparison](/pro/compare-scans) with new, fixed and persisting issues, the site parts edited in between, and the WordPress, theme and plugin updates in between.
- [Test sessions](/pro/test-sessions) with sign-off, feeding the conformance report and statement.
- [Fixes queue](/pro/fixes-queue) with bulk propose, review, apply and undo, built-in fixes or your own text (AI drafts only with a connected AI provider), fix at the source, and an optional approval rule (Agency plan and up).
- [Feedback response targets](/pro/feedback-targets) and [disproportionate burden records](/pro/burden).
- Email and Slack [alerts](/pro/monitoring), weekly digest and score history.
- [Fix tracking](/pro/fix-tracking) with GitHub, GitLab, Jira and Linear.
- [Ignore-everywhere rules](/pro/ignore), [activity log and webhooks](/pro/activity-webhooks).
- Branded [client reports](/pro/reports) and a VPAT 2.5 style [conformance report](/pro/acr) on every plan.
- White-label reports, [client portfolio](/pro/portfolio) with trends, client emails and share links (Freelancer plan and up).
- [Multisite](/pro/multisite) network overview and network license (Agency plan and up).
- [Abilities](/developers/abilities) for AI assistants that apply only changes a person approved, unless you allow built-in rule fixes.
- [Licensing](/pro/license) and automatic updates.
