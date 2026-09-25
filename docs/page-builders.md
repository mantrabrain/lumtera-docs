---
title: Classic editor & page builders
description: How Lumtera checks content in the classic editor, Elementor, WooCommerce products, block libraries and shortcodes.
---

# Classic editor & page builders

Lumtera checks what your content really outputs. Blocks are rendered the same way they are on the front end, and shortcodes are expanded. Page builders are checked from their own output.

## Classic editor

In the classic editor, an **Accessibility check** box appears below the content.

- It lists the issues from the **last save**. Save your changes, then click **Check saved version** to check again.
- Each issue has a **Dismiss** button, which asks for an optional reason.
- Where a fix mentions block settings: in the classic editor, click an image and choose the pencil (**Edit**) to set its alternative text, or edit the markup in the **Text** tab.

The classic editor doesn't check live, show a reading level or hold publishing.

## Elementor

Elementor pages are checked from **Elementor's own output**, not from the post content, so the results match what visitors see. They're checked again each time you save in Elementor.

![Lumtera's panel inside the Elementor editor](/screenshots/screenshot-6.webp)

Inside the Elementor editor, an **Accessibility** button floats at the bottom of the preview, with a red badge if there are errors. It opens a panel with:

- the score, headline, reading level and filters (**All**, **Errors**, **Review**, **Tips**)
- an issue card for each problem, with **Select widget**, **How to fix**, the markup and a WCAG link
- **Dismiss** (without a reason field), and a list of dismissed items with **Restore**
- **Outline widgets with issues**, which is remembered in your browser

The panel checks your **unsaved changes** too, a moment after each edit. Anywhere else in Lumtera, links to an Elementor page open it in Elementor.

The panel appears for the content types Lumtera checks, for people who can edit the page. Elementor's own Role Manager still applies.

## WooCommerce

When WooCommerce is active, **products** are checked by default. Lumtera checks both the product **description** and the **short description**. Products appear in the reports and get the **Accessibility** column in the products list.

[Page checks](/pro/page-checks) in Lumtera Pro can also check the Shop, Cart, Checkout and My account pages, with your theme.

## Block libraries

Lumtera renders third-party blocks exactly as they appear on the front end, then traces each issue back to its block. It's been tested with the blocks of **Spectra**, **Kadence Blocks**, **GenerateBlocks**, **Stackable**, **Otter** and **Essential Blocks**.

Reusable blocks (synced patterns), template parts and navigation are checked as part of the output, but **Select block** takes you to the containing block, not inside it.

## Shortcodes

Shortcodes in your content are expanded before checking, so a contact form added with a shortcode is checked too.

## Other content types

Any public content type can be checked, including custom post types. Choose them under [Settings → Content to check](/settings#content-to-check).

## What isn't checked here

Content checks don't see your theme's header, menus, sidebar or footer. To check those, use the **Whole page** tab in [review mode](/review-mode#whole-page), or [page checks](/pro/page-checks) in Pro.
