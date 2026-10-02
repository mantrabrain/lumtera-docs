---
title: Page checks
description: Check whole live pages with your theme's real CSS, at desktop and phone width, with the same engine as review mode, plus hover and focus contrast and moving carousels. Schedule daily or weekly checks of your key pages as a logged-out visitor.
---

# Page checks

<p><span class="pro-pill">Pro</span> Every plan</p>

The free plugin checks the content you write. **Page checks** test whole live pages: theme, menus, footer, checkout, cookie banners. Open <span class="screen-path">Lumtera → Checks → Page checks</span>. Anyone with the **See reports and check the site** permission can use it (editors and administrators by default).

Page checks run the same audit engine as the free plugin's [review mode](/review-mode#whole-page), so a page gets the same results in both. Pro adds checks of its own on top, lets you check many pages at once, keeps the results, and re-checks your key pages on a schedule.

There are two ways to run them:

| | Browser checks | Scheduled checks |
| --- | --- | --- |
| Runs | When you click **Check selected pages** | Daily or weekly, in the background |
| Pages | As many as you tick, plus one address you type | Your key pages, up to your plan's limit per run (25, 100, 250 or 500) |
| Loaded as | You, logged in (or a test user, with [signed-in checks](/pro/signed-in-checks)) | A logged-out visitor |
| Screen width | Desktop, and phone width (390 px) if you ask for it | No layout (no browser) |
| Color contrast, keyboard and widget tests | Measured in the page, with your theme's real CSS | Not measured. Contrast from your last browser check is shown instead. |
| Alerts | No | Yes, for new errors |

![The Page checks screen with the results table](/screenshots/pro-page-checks.webp)

## Check pages in your browser

<ol class="step-list">
  <li>Under <strong>Choose pages</strong>, tick the pages to check. The first six in each list are ticked for you.
    <ul>
      <li><strong>Key pages and templates</strong>: your home page, the blog page (if you have one), WooCommerce's Shop, Cart, Checkout and My account pages, your most-used category archive, search results and the 404 page.</li>
      <li><strong>Recently updated content</strong>: your 20 most recently changed published items, of the content types Lumtera checks.</li>
    </ul>
  </li>
  <li>Optionally add <strong>Another page on this site</strong>, as a path such as <code>/about/</code> or a full address.</li>
  <li>To test phones too, turn on <strong>Also check at phone width (390px)</strong>. Your browser remembers this choice.</li>
  <li>Click <strong>Check selected pages</strong>. A progress bar shows each page as it's checked.</li>
</ol>

Each page loads out of sight in your browser tab, with your theme's real CSS, as you see it while logged in. Content shown only to logged-out visitors, such as cookie banners, may differ: scheduled checks cover that. To check pages as a customer or member, use [signed-in checks](/pro/signed-in-checks) (the **Check pages as a customer or member instead** link).

Cart and Checkout are listed "(with a sample product)". Checking them adds a product to *your own* cart, so the page isn't empty.

Only pages on this site can be checked. A page that blocks being embedded, or redirects to another site, shows *"The page could not be read."* A page gets 20 seconds to load. Pages that fail are listed with **Try again**.

Each page usually takes a few seconds at each width; how long depends on the page and your computer. It works in Chrome, Edge, Firefox and Safari alike. Pages with sliders take longer: see [Carousels](#carousel-motion).

### Phone width

With **Also check at phone width** on, each page is checked twice: at desktop width, then in a frame 390 pixels wide, like a common phone. The phone result is stored as its own row, labeled **Phone (390px)**, right under the page's **Desktop** row.

| Check | Desktop | Phone (390px) |
| --- | --- | --- |
| Every content check and the whole-page checks | Yes | Yes |
| Text and non-text contrast, target size | Yes | Yes |
| Keyboard walk, menus, pop-ups and other widgets | Yes | Yes |
| Sideways scrolling (reflow) | No | Yes, measured at **320 px** wide |
| Hover, focus and pressed-state contrast | Yes | No |
| Carousels that move on their own | Yes | No |

For the reflow check, the phone frame is narrowed to 320 pixels for a moment, the width WCAG names, and then put back to 390.

The frame keeps your browser's own identity. If your theme sends phones different HTML based on the browser, the phone check sees the desktop HTML at a narrow width.

## What's checked {#what-s-checked}

Every page check runs:

- every [content check](/checks), on the whole rendered page;
- the same [whole-page checks](/checks#whole-page-checks) as review mode's **Whole page** tab: landmarks, headings, skip links, zoom, contrast measured from the computed colors, non-text contrast, link color, target size at every width, text spacing, visual order, reflow at 320 px, and the [keyboard](/review-mode#keyboard) and widget tests (focus visible, focus order, traps, focus hidden under sticky bars, menus, dialogs, tabs and disclosures);
- Pro's own checks, below.

Findings you've hidden with [site-wide ignore rules](/pro/ignore) are hidden in page checks too. You can change the severity of each check, or turn it off, under [Settings → Checks](/settings#checks).

### Hover, focus and pressed-state contrast {#state-contrast}

Text that is readable at rest can become hard to read when the pointer is over it, when it has keyboard focus, or while it is pressed. WCAG's contrast rules apply in every state. Pro puts each link and button on the page into each state in turn, and measures it again.

| Check | ID | WCAG | Severity |
| --- | --- | --- | --- |
| Text is hard to read on hover, focus or press | [`page-state-contrast`](/checks#page-state-contrast) | 1.4.3 (AA) | Needs review |
| Controls fade on hover, focus or press | [`page-state-nontext`](/checks#page-state-nontext) | 1.4.11 (AA) | Needs review. A control's border or fill fading while its text still names it is a tip. |

The finding names the state, for example *"Text is hard to read on hover"*, with the contrast at rest and in that state, the colors, and the ratio it needs.

How it's measured:

- Pro applies the page's own `:hover`, `:focus`, `:focus-visible`, `:focus-within` and `:active` styles, as the browser would if you pointed at, tabbed to or pressed the control. Transitions are paused, so colors are read as they end up, not mid-fade. Everything is put back afterwards.
- Styles that a script adds (for example on `mouseenter`) aren't seen.
- Browsers don't let pages read stylesheets from another site, such as a font or theme CDN. Their hover and focus styles are missed, and findings on that page are marked as possible rather than likely.
- It runs at desktop width, in every browser.

### Carousels that move on their own {#carousel-motion}

WCAG 2.2.2 asks that content that moves on its own for more than five seconds can be paused, stopped or hidden. Pro watches up to three sliders or carousels on each page (Swiper, Slick, Splide, Glide, Owl, Flexslider, Bootstrap, or any element marked as a carousel) for about six seconds each.

| What happened | Finding | Severity |
| --- | --- | --- |
| The slides changed on their own, and no pause or stop button was found | *Carousel moves on its own with no pause button* | Error |
| Lumtera pressed the pause button, and the slides kept changing | *Carousel's pause button does not stop it* | Error |
| The pause button stopped it | *Carousel moves on its own, and its pause button works*: check that the button works from the keyboard and has a name | Tip |

The check ID is [`page-carousel-motion`](/checks#page-carousel-motion) (2.2.2, level A). Findings are "likely": a few seconds of watching can't prove the movement lasts more than five seconds, so confirm it yourself. A slider that doesn't move while it's watched isn't reported here. The free keyboard check still lists it for a person to test.

While sliders are watched, the progress card says so and counts down. **Skip slider checks** stops them for the rest of the run.

### Forms

Each browser check lists the forms it finds in the **Forms** card. **Test form** submits a form empty, safely, and checks how its errors are shown and announced. See [Form tests](/pro/form-tests).

### Signed-in pages

The **Signed-in checks** card checks My account, cart, checkout and members' pages as a test user with a role you choose: 1 role on Personal and Growth, any number on Agency and Unlimited. See [Signed-in checks](/pro/signed-in-checks).

## Results

The results table lists each page with its **Errors**, **Needs review** count and **Score**. Under each page name you'll see its screen size (**Desktop** or **Phone (390px)**), who checked it (**Your browser** or **Scheduled, logged out**) and when. Pages with the most errors come first, each with its Desktop and Phone rows together.

- **Issues** expands the findings for that row.
- **Check again** re-runs the check at the same width.
- **Remove** takes a row out of the results. Removing a desktop row also makes scheduled checks skip that page, until you check it again in the browser. Removing a phone row doesn't affect scheduled checks.

With signed-in checks set up, **Show** filters the table to one role's results, or to **Not signed in as a test user**.

If a page redirects, its results are stored under the page that actually loaded.

## Scheduled checks

Scheduled checks fetch pages from the server as a logged-out visitor, so you see what visitors get: cookie banners, logged-out menus and so on. They're **on by default, daily**, once your license is active.

Settings, on the **Scheduled checks** card:

- **Run scheduled checks**: **Off**, **Daily** or **Weekly**.
- **Include key templates automatically** (on by default). Expand **N templates found** to see the list.
- **Also check pages from**:
  - **This site's sitemap**: found automatically. It's WordPress's own sitemap, or the one Yoast SEO or Rank Math publish. Only pages on this site are checked.
  - **These addresses (optional)**: one per line, a path such as `/pricing/` or the full address of a page on this site. Up to 500 lines. Lines that can't be used are listed under **Not added:** with the reason, such as *not on this site* or *already in the list*.
- Click **Save**. The card says how many pages are checked per run.

### Template discovery

With **Include key templates automatically** on, Lumtera finds your theme's templates for you, so archives, search and the 404 page are covered, not just pages you pick. It looks for:

- the home page, and the posts page if your front page is a static page
- your most-used category archive and tag archive
- the author archive of the author with the most posts
- search results and the 404 page
- WooCommerce's Shop, Cart, Checkout and My account pages
- the most recent published post of each post type Lumtera checks, such as a single post, page or product

Each appears in the results as **Template: …**, for example "Template: Category archive".

### Which pages, and when

Each run checks up to your plan's limit:

| Personal | Growth | Agency | Unlimited |
| --- | --- | --- | --- |
| 25 pages | 100 pages | 250 pages | 500 pages |

Pages are taken in this order, each address once, until the limit is reached:

1. key templates (if the option is on)
2. [signed-in pages](/pro/signed-in-checks), for roles set to be included in scheduled checks
3. every page you've checked in the browser
4. the addresses you pasted
5. pages from the sitemap (if the option is on)
6. recently updated content

Pages you removed from the results are left out.

When the pages found come close to your plan's limit, people who manage the site see a line such as *"Scheduled runs found 30 pages to check; your Personal plan checks 25 in each run, so 5 are left out."*, with links to the plan that checks more. It appears at 80% of the limit and can be dismissed. See [When you reach a limit](/pro/license#when-you-reach-a-limit).

**Timing:** the first run is at 03:00 (site time) the next day, then daily or weekly. Pages are checked five at a time in the background. **Run now** starts a run straight away and shows progress, for example *"Checking as a logged-out visitor: 5 of 25 pages…"*. **Last run** and **Next run** show on the card.

Scheduled checks never add products to a cart, so Checkout is checked in its empty-cart state. They only request pages on your own site, and follow redirects only while they stay on it. They never submit forms.

After each scheduled run, Pro compares the pages it checked for [consistency across pages](/pro/consistency) (Growth and up).

### What scheduled checks can't do

Scheduled checks fetch pages without a browser: there is no CSS, layout, script or keyboard on the server. So they can't measure color contrast, target size, the keyboard walk and widget tests, hover and focus contrast, the carousel check, text spacing or visual order, and they can't see content that is hidden only by a stylesheet.

Instead, a scheduled check **keeps every finding only a browser can measure from your last browser check of that page**, marked with the date it was measured, and works out the page's counts and score from the combined findings. Each scheduled row says *"Contrast from your browser check …"*. With no browser check yet, it says *"Contrast not measured yet: run a browser check"*. The next browser check replaces the kept findings with fresh ones.

Scheduled checks also don't lay the page out at phone width. Run a browser check with **Also check at phone width** for that.

::: tip Keep the browser checks fresh
Kept findings are only as recent as your last browser check. Check your key pages in the browser again after a theme or design change, and before making a report.
:::

### Alerts from scheduled checks

When a scheduled check finds errors that weren't there the last time that page was checked on schedule, Lumtera Pro sends an alert to the email addresses and Slack webhook set under [Monitoring & alerts](/pro/monitoring). The alert says *"Found by the scheduled check of …, loaded as a logged-out visitor."* and links to **Open page checks**. The first scheduled check of a page only records the starting point.

## Page checks in reports

[Client reports](/pro/reports) include a **Live page checks** section for public pages, using each page's desktop result. Page check results also feed the report's WCAG checklist, the [conformance report](/pro/acr), [Compare scans](/pro/compare-scans) and the free plugin's whole-page results.

## For developers

- `lumtera_pro_limit` changes a plan's allowance. For scheduled checks the feature is `scheduled_pages`: `add_filter( 'lumtera_pro_limit', fn( $limit, $feature ) => 'scheduled_pages' === $feature ? 50 : $limit, 10, 2 );`. Runs always have a cap: `0` means the Unlimited plan's 500.
- `lumtera_pro_scheduled_page_limit` filters the final number of pages per run.
- `lumtera_pro_scheduled_templates` filters the templates found automatically.
- `lumtera_pro_sitemap_urls` filters the addresses read from the sitemap.
- `lumtera_pro_scheduled_urls` filters the final list of pages to check. The plan's limit still applies to it.
- `lumtera_pro_send_page_alert` can stop an alert for a page.
- Actions: `lumtera_pro_browser_page_checked` (a browser check was stored), `lumtera_pro_scheduled_page_checked` (a scheduled check was stored), and `lumtera_pro_page_checks_side` and `lumtera_pro_page_checks_after_results` to add your own cards to the screen.

See [Hooks & filters](/developers/hooks).
