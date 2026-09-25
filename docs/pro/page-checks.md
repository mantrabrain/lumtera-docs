---
title: Page checks
description: Test whole live pages with your theme's real CSS in your browser, and schedule daily or weekly checks of up to 25 key pages as a logged-out visitor.
---

# Page checks <span class="pro-pill">Pro</span>

The free plugin checks the content you write. **Page checks** test whole live pages: theme, menus, footer, checkout, cookie banners. Open <span class="screen-path">Accessibility → Page checks</span>. Editors and administrators can use it.

There are two ways to run them:

| | Browser checks | Scheduled checks |
| --- | --- | --- |
| Runs | When you click **Check selected pages** | Daily or weekly, in the background |
| Loaded as | You, logged in, at desktop width (1280 px) | A logged-out visitor |
| Color contrast | Measured from your theme's real CSS | Not measured (no browser). Contrast from your last browser check is shown instead. |
| Alerts | No | Yes, for new errors |

![The Page checks screen with the results table](/screenshots/pro-page-checks.webp)

## Check pages in your browser

<ol class="step-list">
  <li>Under <strong>Choose pages</strong>, tick the pages to check. <strong>Key pages and templates</strong> lists your home page and blog, WooCommerce's Shop, Cart, Checkout and My account pages, a category archive, search results and the 404 page. <strong>Recently updated content</strong> lists your 20 most recently changed posts.</li>
  <li>Optionally add <strong>Another page on this site</strong>, as a path such as <code>/about/</code> or a full address.</li>
  <li>Click <strong>Check selected pages</strong>.</li>
</ol>

Each page loads out of sight in your browser tab, with your theme's real CSS. Cart and Checkout are loaded "with a sample product", which adds a product to *your own* cart so the page isn't empty.

Only pages on the same site can be checked. A page that blocks being embedded, or redirects to another site, shows *"The page could not be read."* A page gets 20 seconds to load.

### What's checked

Every [content check](/checks), run on the whole rendered page, plus these page checks:

| Check | WCAG | Severity | Looks for |
| --- | --- | --- | --- |
| Page has no title | 2.4.2 (A) | Error | No `<title>` |
| Page language is missing | 3.1.1 (A) | Error | `<html lang>` missing or invalid |
| No way to skip to the main content | 2.4.1 (A) | Needs review | No `<main>` landmark and no skip link among the first five links |
| Zooming is disabled | 1.4.4 (AA) | Error | The viewport blocks pinch-zoom (`user-scalable=no` or `maximum-scale` below 2) |
| Text has low contrast on the live page | 1.4.3 (AA) | Error | Contrast measured from the computed colors in the browser |

The live contrast check reads every visible piece of text and compares its computed color with the background. It needs 4.5:1, or 3:1 for large text (24 px, or 18.66 px bold). It skips text over background images and gradients, where contrast can't be measured reliably. It reports up to 40 findings per page, and skips anything the content contrast check already reported.

## Results

The results table lists each page with its **Errors**, **Needs review** count and **Score**, and who checked it: **Your browser** or **Scheduled, logged out**.

- **Issues** expands the findings for a page.
- **Check again** re-runs the check.
- **Remove** takes a page out of the results. Scheduled checks skip it too, until you check it again by hand.

If a page redirects, its results are stored under the page that actually loaded.

## Scheduled checks

Scheduled checks run from the server as a logged-out visitor, so you see what visitors get: cookie banners, logged-out menus and so on. They're **on by default, daily**, once your license is active.

Settings, on the **Scheduled checks** card:

- **Run scheduled checks**: Off, Daily or Weekly.
- **Include key templates automatically** (on by default). Lumtera finds your theme's templates for you: home and blog pages, the category, tag and author archives, search results, the 404 page, WooCommerce pages and one recent post of each post type. Expand **N templates found** to see the list.

Which pages are checked, up to **25** in total:

1. key templates (if the option is on)
2. every page you've checked in the browser
3. recently updated content

Pages you removed from the results are left out.

**Timing:** the first run is at 03:00 (site time) the next day, then daily or weekly. Pages are checked five at a time in the background. **Run now** starts a run straight away and shows progress. **Last run** and **Next run** show on the card.

Scheduled checks fetch pages without a browser, so they can't:

- measure color contrast. Each scheduled row shows the contrast findings from your last browser check, marked with the date they were measured.
- see content that is hidden only by a stylesheet.

### Alerts from scheduled checks

When a scheduled check finds errors that weren't there last time, Lumtera Pro sends an alert to the email addresses and Slack webhook set under [Monitoring & alerts](/pro/monitoring). The first scheduled check of a page only records the starting point.

## Page checks in client reports

[Client reports](/pro/reports) include a **Live page checks** section for public pages. The page checks also count toward the WCAG checklist for criteria 2.4.2, 3.1.1, 2.4.1, 1.4.4 and 1.4.3.

## For developers

- `lumtera_pro_scheduled_templates` filters the templates found automatically.
- `lumtera_pro_scheduled_urls` filters the final list of URLs to check.
- `lumtera_pro_send_page_alert` can stop an alert for a page.

See [Hooks & filters](/developers/hooks).
