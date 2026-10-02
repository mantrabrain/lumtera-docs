---
title: Troubleshooting
description: Fixes for common Lumtera problems, including the plugin not starting, the sidebar not showing, checks that stop, missing results, permissions, AI suggestions, the weekly email, site fixes, and Pro background tasks and licensing.
---

# Troubleshooting

## Lumtera doesn't start: "needs the PHP DOM extension"

Lumtera reads HTML with PHP's DOM extension. If your server doesn't have it, Lumtera shows *"Lumtera needs the PHP DOM extension, which is not enabled on this server."* and does nothing else. Ask your host to enable **php-xml** (DOM). It's switched on by almost every host.

## Where did the Accessibility menu go? {#where-did-the-accessibility-menu-go}

Since version 1.1, Lumtera's admin menu is called **Lumtera**, and the editor sidebar, Elementor panel, classic editor box and Dashboard widget are called **Lumtera Accessibility**. Everything is where it was, and every screen keeps its address. The admin bar item on the front end is still **Accessibility**. See [Your WordPress admin](/admin-map).

## The Lumtera Accessibility sidebar doesn't appear in the editor {#the-accessibility-sidebar-doesn-t-appear-in-the-editor}

- Look for the **Lumtera icon** in the editor's top toolbar, or open the **Options** menu (⋮) and choose **Lumtera Accessibility**.
- Check the content type is ticked under [Settings → Content to check](/settings#content-to-check).

## "This post is too large to check live"

Posts over 512 KB of content, or 5,000 blocks, aren't checked while you type. They're still checked when you save. Developers can raise the limit with [`lumtera_max_check_bytes`](/developers/hooks#checks-and-scanning).

## "Too many checks in a short time"

Each user can run 120 live checks a minute. Wait a moment. Developers can change the limit with `lumtera_check_rate_limit`.

## "Check all content" stopped

If you stopped the check, closed the tab or lost the connection, open the Overview again. It shows **A check did not finish** with **Continue where it stopped**, which carries on from where it got to. See [Continue a check that stopped](/site-report#continue-a-check-that-stopped).

The message *"The check stopped because of an error."* usually means a request failed, for example because a security plugin or the host blocked it. Click **Try again**.

If checking one item stops the server, usually because it runs out of memory or time, Lumtera skips it and carries on. The item is listed under **Items that could not be checked** on the Overview, with the reason, and isn't counted as passing. Click **Try again** on it after the cause is fixed. If it stops the server again:

- Ask your host to raise PHP's memory limit or maximum execution time, or split the page into smaller pages.
- Look in your PHP error log for the cause. Administrators also see the server's error message on the card. A shortcode from a deactivated plugin is a common one.
- Run `wp lumtera scan --all` in WP-CLI. Errors are shown on screen, which makes the cause easier to find.

See [Items that could not be checked](/site-report#items-that-could-not-be-checked).

## A post shows "Not checked"

It hasn't been saved or checked since Lumtera was installed. Click **Check N new items** on the Overview, or **Check** on its row in the Content report.

## An issue I dismissed is back

Lumtera says why with **Showing again:** on the issue: either the finding is more severe now, or its markup probably changed. Dismiss it again if it's still not a problem. See [Showing again](/dismissing#showing-again).

## The keyboard check won't stop, or the page reloaded

While **Check keyboard access** or **Test menus and pop-ups** runs, it moves focus through the page, so <kbd>Tab</kbd> doesn't reach the **Stop** button. Press <kbd>Escape</kbd> to stop it.

If focusing something on the page reloads it, the check can't carry on in the old page. After the reload, the **Keyboard** tab names the element it was focusing, with **Continue the check**. Continue to finish the check and list that element as a finding. See [Keyboard](/review-mode#keyboard).

## Results differ between browsers

The checks give the same results in Chrome, Edge, Firefox and Safari, apart from real browser differences: Firefox and Safari draw their own system focus ring, which Lumtera can't measure, and Safari draws no box-shadow on a system-style button, so a focus style that relies on one really is invisible there. See [In other browsers](/review-mode#in-other-browsers).

## Results didn't change after I changed a setting

Settings apply to the next check. Go to the Overview and click **Check all content again**.

## A result is wrong

First, check it's not a **Needs review** item. Those are things a person has to decide, and dismissing them is expected. If a check is definitely wrong:

- Dismiss the item with a reason, so it stops appearing.
- Tell us, with the check's ID and the HTML that triggered it. `wp lumtera check` is an easy way to reproduce it. See [Support](/support).

## The alt text manager doesn't list a post that uses an image

The list comes from Lumtera's checks, so posts that haven't been checked don't appear. Run **Check all content**. Images inside blocks Lumtera can't update are listed separately. Add the alt text there in the editor.

## Someone can't see the Lumtera menu or review mode {#someone-can-t-see-the-accessibility-menu-or-review-mode}

What each role can do is set under <span class="screen-path">Lumtera → Settings → Permissions</span>.

- **The Overview, Content report and Dashboard widget** need **See reports and check the site**. By default, that's editors and administrators.
- **Review mode** needs **Review pages on the site**. On a single post or page, the person must be able to edit it. On the blog home, archives, search results and the shop page, they also need **See reports and check the site**. The **Accessibility** item only shows in the admin bar on the front end.
- **The alt text manager** needs the ability to upload files (Authors and up).
- **Settings** are for administrators only.

If the roles look right, check for a role editor plugin or custom code that removes the `lumtera_view_reports`, `lumtera_dismiss_errors` or `lumtera_review_mode` capability, or a filter such as `lumtera_capability`. See [Roles & permissions](/permissions).

## "No connected AI provider can read images" or "can write text"

AI suggestions need WordPress 7.0 or later, with AI not switched off, and a connected provider under <span class="screen-path">Settings → Connectors</span>:

- **Suggest alt text** needs a model that can read images.
- **Link text, headings and the summary** need a model that can write text. Their switches are listed only once one is connected.

Lumtera re-checks what your provider can do every 10 minutes. See [AI suggestions](/ai).

## An AI suggestion button doesn't appear

- Check an administrator switched that feature on under <span class="screen-path">Lumtera → Settings → AI suggestions</span>.
- **Suggest link text** and **Suggest heading** only appear on the issues they help with, in the block editor sidebar. **Suggest subheadings** appears on long content with no subheadings.
- **Draft a plain-language summary** only appears under **Reading level** when the content reads above the target grade, in a supported language.
- The writing features work in the block editor only, not in Elementor or the classic editor.

## "Too many AI requests in a short time"

Each person can make 30 AI requests in 10 minutes, across all AI features. Wait a few minutes. Developers can change the limit with `lumtera_ai_rate_limit`.

## The weekly email summary doesn't arrive

- Check **Send a weekly summary** is on under <span class="screen-path">Lumtera → Settings → Email summary</span>, and look at the **Next summary** date shown there.
- **Look for a failure notice** in the same section, such as *"The summary due on … could not be sent."*, with the reason WordPress gave. See [When sending fails](/email-summary#when-sending-fails).
- **Click Send a test summary now** to check that email arrives. Check the spam folder too.
- **If Lumtera Pro sends its weekly digest**, the free summary isn't sent. Pro sends its own, while it's licensed on the site (an expired license still counts). See [Weekly email summary](/email-summary#with-lumtera-pro).
- **The email goes out with the first site visit after 9:00** on the chosen day. On a quiet site, see [Scheduled tasks run late](#scheduled-tasks-run-late-or-not-at-all).
- **If your site can't send mail**, install an SMTP plugin, or set up an email service. Password reset emails are probably affected too.

## The weekly home page check didn't run {#the-weekly-home-page-check-didnt-run}

The Overview's **Weekly home page check** card says *"The check on … did not run."* with the reason.

- *"The site could not load its own home page: … Some hosts block a site from requesting its own pages"*: your host or a firewall blocks "loopback" requests. <span class="screen-path">Tools → Site Health</span> shows whether they work. Ask your host to allow them.
- If the message names a security plugin, allow requests from the server to itself in that plugin.
- If the first check hasn't run yet, it runs the next time someone visits the site. See [Scheduled tasks run late](#scheduled-tasks-run-late-or-not-at-all).

Administrators can click **Check now** to try again straight away. See [Weekly home page check](/settings#weekly-home-page-check).

## Feedback emails don't arrive

- Check the addresses under <span class="screen-path">Lumtera → Settings → Feedback</span> → **Email new feedback to**. When you save, Lumtera names any address that isn't valid and leaves it out, and warns you if none are left, because then no email is sent.
- Every message is still in the inbox, under <span class="screen-path">Lumtera → Feedback & statement → Feedback</span>, whether or not the email arrived.
- If your site can't send mail, install an SMTP plugin. See [Feedback form and inbox](/feedback#settings).

## A site fix doesn't show on my site

- **Clear your page cache** and any CDN cache. Lumtera empties the page cache of WP Super Cache, W3 Total Cache, WP Rocket, WP Fastest Cache, SiteGround Speed Optimizer, LiteSpeed Cache, Cache Enabler and Breeze when you save, but not your host's or CDN's cache.
- **Skip link:** your theme must call `wp_body_open()`. No link is added if your theme already has one, or if it's a block theme, which gets WordPress's own. If WordPress's own skip link is switched off on a block theme, Lumtera adds one and gives the template's main area the ID `lumtera-main`. See [Site fixes](/site-fixes).
- **Zoom:** if your theme prints its viewport tag after `wp_head()`, it wins. Ask the theme author to fix it.
- **Link fixes** apply only to post content, not menus, widgets or the footer.

## I deleted Lumtera. Is my data gone? {#i-deleted-lumtera-is-my-data-gone}

Not unless you chose **Delete everything** under <span class="screen-path">Lumtera → Settings → General</span> → [When Lumtera is deleted](/settings#when-lumtera-is-deleted). By default, results, feedback and settings are kept, and installing Lumtera again picks them up. While Lumtera is active, the <span class="screen-path">Plugins</span> screen says **Data is kept if deleted** under it.

## Review mode can't find the post's content

Some themes display content in an unusual way. The **Whole page** tab still works. Use the editor sidebar for the content checks.

## Scheduled tasks run late, or not at all {#scheduled-tasks-run-late-or-not-at-all}

The free [weekly email summary](/email-summary) and the feedback clean-up run with WP-Cron. In Lumtera Pro, alerts, the weekly summary, scheduled page checks, PDF checks and portfolio syncs run in the background with WP-Cron (or Action Scheduler, if WooCommerce is active). WP-Cron only runs when someone visits the site, and some hosts switch it off.

With Lumtera Pro, <span class="screen-path">Tools → Site Health</span> shows **Lumtera Pro background tasks are running late** when tasks are more than an hour late. The fix is a real server cron job that runs every five minutes:

```sh
*/5 * * * * wget -q -O - https://example.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1
```

or, with WP-CLI:

```sh
*/5 * * * * cd /path/to/wordpress && wp cron event run --due-now >/dev/null 2>&1
```

Pro's background jobs also need Lumtera Pro to be licensed on the site. An expired license still counts.

## Alert emails don't arrive {#alert-emails-dont-arrive}

<p><span class="pro-pill">Pro</span> Every plan</p>

- Click **Send a test alert** under <span class="screen-path">Lumtera → Settings → Alerts</span>.
- If the test fails by email, your site can't send mail. Install an SMTP plugin and send a test from it.
- Remember alerts are only for **new errors on published content**. Drafts, bulk checks and imports don't send alerts. See [How alerts work](/pro/monitoring#how-alerts-work).

## License problems {#license-problems}

<p><span class="pro-pill">Pro</span> Every plan</p>

See [License & plans](/pro/license#common-activation-errors). Most often: the license has reached its site limit (deactivate it on an old site), or your host blocks outgoing requests to `store.mantrabrain.com`.

## A client site won't connect to the portfolio {#a-client-site-wont-connect-to-the-portfolio}

<p><span class="pro-pill">Pro</span> Growth plan and up</p>

See [Troubleshooting connections](/pro/portfolio#troubleshooting-connections).

## Still stuck?

See [Support](/support).
