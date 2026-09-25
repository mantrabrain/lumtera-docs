---
title: Troubleshooting
description: Fixes for common Lumtera problems, including the plugin not starting, the sidebar not showing, checks that stop, missing results, site fixes not showing, and Pro background tasks and licensing.
---

# Troubleshooting

## Lumtera doesn't start: "needs the PHP DOM extension"

Lumtera reads HTML with PHP's DOM extension. If your server doesn't have it, Lumtera shows *"Lumtera needs the PHP DOM extension, which is not enabled on this server."* and does nothing else. Ask your host to enable **php-xml** (DOM). It's switched on by almost every host.

## The Accessibility sidebar doesn't appear in the editor

- Look for the **Lumtera icon** in the editor's top toolbar, or open the **Options** menu (⋮) and choose **Accessibility checker**.
- Check the content type is ticked under [Settings → Content to check](/settings#content-to-check).

## "This post is too large to check live"

Posts over 512 KB of content, or 5,000 blocks, aren't checked while you type. They're still checked when you save. Developers can raise the limit with [`lumtera_max_check_bytes`](/developers/hooks#checks-and-scanning).

## "Too many checks in a short time"

Each user can run 120 live checks a minute. Wait a moment. Developers can change the limit with `lumtera_check_rate_limit`.

## "Check all content" stopped

The message *"The check stopped because of an error."* usually means a single post failed to render. For example, a shortcode from a deactivated plugin may have caused a PHP error.

- Click **Try again**.
- Look in your PHP error log for the cause.
- If it keeps stopping, run `wp lumtera scan --all` in WP-CLI. Errors are shown on screen, which makes the cause easier to find.

## A post shows "Not checked"

It hasn't been saved or checked since Lumtera was installed. Click **Check new items** on the Overview, or **Check** on its row in the Content report.

## Results didn't change after I changed a setting

Settings apply to the next check. Go to the Overview and click **Check all content again**.

## A result is wrong

First, check it's not a **Needs review** item. Those are things a person has to decide, and dismissing them is expected. If a check is definitely wrong:

- Dismiss the item with a reason, so it stops appearing.
- Tell us, with the check's ID and the HTML that triggered it. `wp lumtera check` is an easy way to reproduce it. See [Support](/support).

## The alt text manager doesn't list a post that uses an image

The list comes from Lumtera's checks, so posts that haven't been checked don't appear. Run **Check all content**. Images inside blocks Lumtera can't update are listed separately. Add the alt text there in the editor.

## "No connected AI provider can read images"

AI suggestions need WordPress 7.0+ and a provider with an image-capable model under <span class="screen-path">Settings → Connectors</span>. Lumtera re-checks every 10 minutes. See [AI suggestions](/ai).

## A site fix doesn't show on my site

- **Clear your page cache** and any CDN cache.
- **Skip link:** your theme must call `wp_body_open()`. No link is added if your theme already has one, or if it's a block theme, which gets WordPress's own.
- **Zoom:** if your theme prints its viewport tag after `wp_head()`, it wins. Ask the theme author to fix it.
- **Link fixes** apply only to post content, not menus, widgets or the footer.

## Review mode can't find the post's content

Some themes display content in an unusual way. The **Whole page** tab still works. Use the editor sidebar for the content checks.

## Scheduled tasks run late, or not at all <span class="pro-pill">Pro</span> {#scheduled-tasks-run-late-or-not-at-all}

Alerts, the weekly summary, scheduled page checks, PDF checks and portfolio syncs run in the background with WP-Cron (or Action Scheduler, if WooCommerce is active). WP-Cron only runs when someone visits the site, and some hosts switch it off.

<span class="screen-path">Tools → Site Health</span> shows a **Lumtera Pro background tasks** warning when jobs are more than an hour late. The fix is a real server cron job that runs every five minutes:

```sh
*/5 * * * * wget -q -O - https://example.com/wp-cron.php?doing_wp_cron >/dev/null 2>&1
```

or, with WP-CLI:

```sh
*/5 * * * * cd /path/to/wordpress && wp cron event run --due-now >/dev/null 2>&1
```

Background jobs also need an active license.

## Alert emails don't arrive <span class="pro-pill">Pro</span>

- Click **Send a test alert** under <span class="screen-path">Accessibility → Settings → Alerts</span>.
- If the test fails by email, your site can't send mail. Install an SMTP plugin and send a test from it.
- Remember alerts are only for **new errors on published content**. Drafts, bulk checks and imports don't send alerts. See [How alerts work](/pro/monitoring#how-alerts-work).

## License problems <span class="pro-pill">Pro</span>

See [License & plans](/pro/license#common-activation-errors). Most often: the license has reached its site limit (deactivate it on an old site), or your host blocks outgoing requests to `store.mantrabrain.com`.

## A client site won't connect to the portfolio <span class="pro-pill">Pro</span>

See [Troubleshooting connections](/pro/portfolio#troubleshooting-connections).

## Still stuck?

See [Support](/support).
