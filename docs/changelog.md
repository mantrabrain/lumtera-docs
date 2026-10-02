---
title: Changelog
description: Release notes for Lumtera 1.0.0 to 1.2.1 and Lumtera Pro 1.0.0 to 1.1.0.
---

# Changelog

Lumtera Pro 1.1.0 needs Lumtera 1.2.1 or newer. See [Requirements](/pro/#requirements).

## Lumtera 1.2.1 {#lumtera-1-2-1}

- After **Check all content**, your results appear first, with a summary of what was found and a link to what to fix. See [Site report](/site-report).
- [Review mode](/review-mode#where-review-mode-works) works on the blog home page, archives, search and the shop page, and the [weekly home page check](/settings#weekly-home-page-check) opens it.
- New: a [**Dismissed** view](/site-report#dismissed) in the Content report shows who dismissed each issue, when and why, with **Restore**.
- New: [choose what happens to your data](/settings#when-lumtera-is-deleted) when Lumtera is deleted (keep it by default, or delete everything), with a [feedback export](/feedback).
- [Feedback](/feedback) replies use your statement's contact email as Reply-To, and include the reference number and the original message.
- Contrast is checked for text on a Cover block whose overlay is set to 0%.
- Issues anywhere in a synced pattern link back to their block.
- [Fix at the source](/fixing-issues#fix-at-the-source) counts only the pages that use that part.
- WP-CLI: `wp lumtera issues --fail-on` sets the exit status in every format, with or without `--baseline`. See [WP-CLI](/developers/wp-cli).
- Editor: the toolbar button names its counts, <kbd>Escape</kbd> closes the dismiss form, dismissing can be undone, and the summary block starts in its text. See [Block editor sidebar](/block-editor).
- Clearer wording throughout.

## Lumtera 1.2.0 {#lumtera-1-2-0}

- Faster, lighter Overview, coverage, weekly email and abilities on sites with many saved whole-page results: each saved result now keeps a small summary, so site-wide numbers no longer load every finding into memory. Results saved before this version get their summary in the background, a few at a time; the numbers are the same.
- The **Fixed this week** count in the [weekly email](/email-summary) no longer counts a fix that was undone.
- For add-on developers: new filters `lumtera_page_result_summaries` and `lumtera_page_result_load`, and `PageResults::index()`, `summaries()`, `walk()` and `with_issues()`. `lumtera_page_result_sources` still works. See [Whole-page results for add-ons](/developers/hooks#page-results-for-add-ons).

## Lumtera 1.1.1 {#lumtera-1-1-1}

- Output buffers used while checking content always close back to where they started, even when a block, widget or shortcode leaves its own buffer open.
- No longer loads WordPress admin files it doesn't use.
- The readme lists the chat widgets Lumtera recognizes in your page's HTML, and confirms it never contacts them.

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

## Lumtera Pro 1.1.0 {#lumtera-pro-1-1-0}

- License and updates rebuilt: a new [license screen](/pro/license#your-license-card) (save, activate, check status, deactivate), plan and site counts, a daily license check, and updates with a changelog in **View details**. Existing licenses move over automatically.
- New permission: **Manage client reports** is needed to create, delete and share reports and to edit the conformance report. Administrators have it; give it to editors under <span class="screen-path">Lumtera → Settings → Permissions</span>. See [Who can manage reports](/pro/reports#manage-permission).
- Deactivating or uninstalling Lumtera Pro no longer fails when Lumtera is inactive.
- [Scheduled checks](/pro/page-checks): **Save** works while the usage tip is showing.
- [Form tests](/pro/form-tests) can test hand-made forms that post to the same page.
- [Client portfolio](/pro/portfolio): sites that haven't been checked are left out of the average.
- Expanded snippets can be scrolled with the keyboard; the portfolio table fits at 1280px; clearer messages.
- **Check again** on the Updates screen shows a new version on the first click.
- Deleting Lumtera Pro with `LUMTERA_PRO_DELETE_LICENSE` frees this site's activation on the store. See [Data & uninstall](/developers/data).
- Needs Lumtera 1.2.1.

## Lumtera Pro 1.0.1 {#lumtera-pro-1-0-1}

- Faster, lighter conformance report and Overview on sites with many page check results: each result now keeps a small summary, so site-wide numbers no longer load every finding into memory. Results from 1.0.0 get their summary in the background, a few at a time; the numbers are the same.
- Needs Lumtera 1.2.0 or newer. With an older Lumtera, Pro asks you to update it and stays off until you do.
- The readme says what deleting Lumtera Pro keeps, and how to remove it too. See [Data & uninstall](/developers/data).

## Lumtera Pro 1.0.0 {#lumtera-pro-1-0-0}

First release. 1.0.0 also included:

- The plans are **Personal**, **Growth**, **Agency** and **Unlimited**. Personal, Growth and Agency can be a yearly or a [lifetime license](/pro/license#yearly-and-lifetime-licenses); Unlimited is yearly.
- [Signed-in checks](/pro/signed-in-checks) on every plan: 1 role on Personal and Growth, any number on Agency and Unlimited.
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
- [Signed-in checks](/pro/signed-in-checks) with one-time passes and view-only test users: one role on Personal and Growth, any number on Agency and Unlimited.
- [Form tests](/pro/form-tests) with dry-run safeguards for Contact Form 7, WPForms, Gravity Forms, WooCommerce classic checkout and plain HTML forms.
- Hover, focus and pressed-state contrast, and a runtime carousel check.
- [Consistency checks across pages](/pro/consistency) (Growth plan and up).
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
- White-label reports, [client portfolio](/pro/portfolio) with trends, client emails and share links (Growth plan and up).
- [Multisite](/pro/multisite) network overview and network license (Agency plan and up).
- [Abilities](/developers/abilities) for AI assistants that apply only changes a person approved, unless you allow built-in rule fixes.
- [Licensing](/pro/license) and automatic updates.
