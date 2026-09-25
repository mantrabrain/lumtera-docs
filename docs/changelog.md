---
title: Changelog
description: Release notes for Lumtera and Lumtera Pro.
---

# Changelog

## Lumtera 1.0.0

First stable release.

- 64 checks mapped to WCAG 2.2, built to avoid false alarms. Checks a machine can't decide are marked "Needs review".
- Block editor sidebar with live checks, one-click quick fixes, jump to the block, outlines, a **Decorative image** switch, dismissing with a reason, and a check before publishing.
- Review mode: issues outlined on the live page for logged-in editors, plus whole-page checks of the rendered page (contrast, landmarks, headings, target size, focus, zoom, reflow).
- Optional server-side [site fixes](/site-fixes) for common theme problems (skip link, focus ring, zoom, link underlines, form labels, new-tab and document-link text), off by default.
- [Accessibility statement](/statement) generator following the W3C statement structure, with EAA sections: feedback, enforcement procedure, disproportionate burden and review dates.
- [Guided manual checks](/manual-checks) with results saved per page.
- The same issue on many pages grouped in the content report and overview.
- Page builders and custom fields: Divi, Beaver Builder, Bricks, Oxygen, WPBakery and Advanced Custom Fields.
- Optional [AI writing help](/ai): link text, headings and a plain-language summary.
- [Permissions](/permissions) settings, an optional [weekly email summary](/email-summary), and reading level in six languages (English, Spanish, French, German, Italian and Dutch).
- WP-CLI SARIF and JUnit output for CI.
- Optional AI alt text suggestions through the WordPress AI Client, reviewed by a person before saving.
- WordPress Abilities API integration so AI assistants can run Lumtera's checks.
- Personal data export and erase support for dismissals.
- [Alt text manager](/alt-text) for the Media Library.
- Elementor: pages are checked from Elementor's own output, with a live panel inside the Elementor editor.
- Works with Spectra, Kadence Blocks, GenerateBlocks, Stackable, Otter and Essential Blocks, the classic editor and shortcodes.
- WooCommerce: product descriptions and short descriptions are checked.
- Site overview, filterable content report, sortable list-table column and dashboard widget.
- WP-CLI commands, including a check with exit codes for deployment pipelines.
- Color contrast from block and theme.json colors.
- "Lumtera Reporter" role for read-only access by an agency hub.
- Multisite support, including clean uninstall across a network.

## Lumtera Pro 1.0.0

First stable release.

- Page checks, in the browser and on a schedule.
- PDF checks.
- Alerts and a weekly digest.
- Score history.
- Fix tracking.
- Client reports and CSV export.
- White-label.
- Agency portfolio.
- Licensing and automatic updates.
