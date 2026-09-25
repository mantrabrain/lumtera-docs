---
title: Site fixes
description: Optional server-side fixes for common theme accessibility problems, including a skip link, visible focus, pinch-zoom, link underlines, new-tab text, document link details and form labels. Off by default. Not an overlay.
---

# Site fixes

Some accessibility problems come from your theme, not your content. Under <span class="screen-path">Accessibility → Settings → Site fixes</span> you can switch on small fixes for the most common ones.

- **Every fix is off by default.** Each one explains **What it changes:** and when to **Leave it off if**.
- **This isn't an overlay.** Each fix is a small change to the HTML or CSS your server sends. Every visitor gets the same page, there's no widget, and nothing rewrites the page in the browser.
- **Fixing the theme itself is always better.** Use these while you wait for a theme fix, or when you can't change the theme.

Only administrators can change these settings. Changes show on your site right away. Clear any page cache to see them. Use **Preview on your site** to open your home page, then check a page with the keyboard and a screen reader.

## Keyboard

### Add a "Skip to content" link

Adds a **Skip to content** link as the first thing on every page. It's hidden until someone presses <kbd>Tab</kbd>, then appears as a high-contrast box in the top-left corner.

- **Target:** when you save with this fix on, Lumtera looks at your home page for an existing skip link and the main content area, and shows what it found, for example *"Found your main area on the home page: #primary."* To set it yourself, fill in **Skip to the element with this ID (optional)**, without the `#`. The element must exist on every page. If you leave the field empty and Lumtera found no main area, the link points to `#content`.
- **No link is added** if your theme already has a skip link, or if it's a block theme (WordPress adds its own skip link to block themes that have a main area).
- Your theme must call `wp_body_open()`, as almost all modern themes do.

### Show where keyboard focus is

Adds a clear outline around links, buttons and form fields when they're reached with the keyboard. It overrides a theme that removes outlines. Clicking a link or button with the mouse shows no ring. Text fields show it however they're focused.

Leave it off if your theme already shows a clear focus indicator.

- **Ring color (optional)**: a hex color such as `#0a4f9c`. Empty uses near-black, `#1d1d1d`.
- A contrasting halo is picked automatically, so the ring shows on light and dark backgrounds. The contrast between ring and halo never drops below 4.5:1, and the screen shows the ratio.

## Zoom

### Allow zooming on mobile

Some themes stop people from pinch-zooming on phones, which fails WCAG 1.4.4. This fix adds a viewport tag that allows zooming, at the end of the page `<head>`.

Browsers use the last viewport tag, so this one wins over a restrictive tag printed earlier. It can't override a tag that the theme adds after WordPress's `wp_head()`. Use the **Whole page** tab in [review mode](/review-mode#whole-page) to confirm zoom works.

Leave it off if your theme isn't responsive (built for a fixed desktop width), or its viewport tag sets other values you need, such as `viewport-fit=cover`.

## Links in content

These apply to posts and pages as they're shown, not to what's saved. Turning a fix off undoes it.

### Underline links in content

Underlines links inside post content, comments, and paragraphs in the main area, so they don't rely on color alone (WCAG 1.4.1). Buttons and links in navigation menus aren't changed.

### Say when a link opens a new tab

Adds hidden text, *"(opens in a new tab)"*, to links in post content that open a new tab, so screen reader users know. If the link has an `aria-label`, the text is added to that instead. Links that already say "new tab" or "new window" are left alone.

Stopping links from opening new tabs is the better fix.

### Show file type and size on document links

Adds the file type and size, such as *"(PDF, 1.2 MB)"*, to links in post content that point to PDF, DOC, DOCX, XLS, XLSX, PPT and PPTX files in your Media Library.

**Show the file details:**

- **To everyone** (default): small visible text after the link.
- **To screen readers only**: hidden text.

Links that already name the file type, File block buttons, and files hosted elsewhere aren't changed.

## Forms

### Label the search and comment forms

Gives WordPress's own search and comment form fields an accessible name ("Search", "Name", "Email", "Website", "Comment") when your theme leaves them unlabeled. It also names an icon-only search button "Search". Fields that already have a label, `aria-label` or `title` aren't changed. Nothing visible changes.

Visible labels in the theme are better than these hidden ones.

## For developers

`lumtera_site_fixes_skip_link_target`, `lumtera_site_fixes_theme_has_skip_link`, `lumtera_site_fixes_viewport` and `lumtera_site_fixes_filter_content` let you adjust these fixes. See [Hooks & filters](/developers/hooks#site-fixes).
