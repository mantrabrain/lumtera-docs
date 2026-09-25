---
title: License & plans
description: Activate, refresh and deactivate your Lumtera Pro license, what each plan includes, what happens when a license expires, and how updates work.
---

# License & plans

Lumtera Pro needs an active license key to turn on. You'll find the key in your purchase email and in your [account at store.mantrabrain.com](https://store.mantrabrain.com/account/).

Only administrators can manage the license. On a multisite network where Pro is network-activated, only super admins can.

## Activate your license

You can activate from the License screen, or straight from any Pro screen.

### From the License screen

<ol class="step-list">
  <li>Go to <span class="screen-path">Accessibility → Settings → License</span>. There's also a <strong>License</strong> link on the Lumtera Pro row of the Plugins screen.</li>
  <li>Paste your key into <strong>License key</strong>. Spaces and line breaks are removed for you.</li>
  <li>Click <strong>Activate</strong>. You'll see <em>"License activated. Thank you!"</em></li>
</ol>

### From any Pro screen

Until the license is active, each Pro screen shows an activation card instead of the feature, for example **Activate your license to use page checks**. It says: *"Lumtera Pro is installed; it needs your license key to turn on."*

<ol class="step-list">
  <li>Paste your key into the card's <strong>License key</strong> field.</li>
  <li>Click <strong>Activate license</strong>.</li>
</ol>

If it works, you come straight back to the same screen, now unlocked, with *"License activated. Thank you!"* If it doesn't, you're taken to the License screen, which explains why.

People who can't manage the license see *"Ask a site administrator to activate the Lumtera Pro license."* instead of the key field.

## The License card

Once a key is active, the **Lumtera Pro license** card shows:

- **Plan**, **Key** (only the last four characters are shown), **Licensed to** and **Sites**, for example "3 of 5", or "2 (unlimited)".
- **Renews**, or **Expired on** if it has expired, or **Expires: Never (lifetime)** for lifetime keys.
- A status: **Active**, **Expired**, **Disabled**, **Revoked**, **Invalid**, **Not active on this site** or **Not activated on this site**. On a multisite network you may also see **Main site only** (see [Multisite](#multisite)).

Buttons:

- **Refresh license** checks the key with the store again. Use it after you renew or upgrade.
- **Deactivate on this site** frees the activation so you can use it on another site. The key is always removed here, even if the store can't be reached. If the store didn't confirm it, a message tells you to free the site from **Licenses** in your store account.

Next to it, **What your license covers** lists what Pro includes.

## Plans

| Plan | Sites | Adds |
| --- | --- | --- |
| Personal | 1 | Page checks, PDF checks, alerts and weekly summary, score history, fix tracking and issue trackers, ignore rules, client reports and branding, CSV export, activity log and webhooks |
| Freelancer | 5 | White-label (hide the Lumtera credit on reports), and the [conformance report (ACR)](/pro/acr) |
| Agency | 25 | [Agency portfolio](/pro/portfolio), the [network overview](/pro/multisite#network-overview) and a [network-wide license](/pro/multisite#one-license-for-the-network) |
| Unlimited | Unlimited | Everything |

A key without a plan recorded in the store counts as Personal.

To upgrade, buy the upgrade in your store account, then click **Refresh license**. Features your plan doesn't include say which plan they need.

## When a license expires

**Everything keeps working** on sites where the license is already active. An expired license stops three things only:

- updates
- support
- activating the key on new sites

The License card says *"Your license has expired. Everything keeps working, but you will not receive updates or support until you renew."* with a **Renew now** link. The update row on the Plugins screen says *"Renew your license to get updates."*

::: warning Don't deactivate an expired key
An expired license can't be activated again, here or on any other site, until it's renewed. If you deactivate it, Pro features stop on this site.
:::

## If the license can't be confirmed

Lumtera Pro checks the license with the store once a day.

- **The store can't be reached** (for example, your host blocks outgoing requests): nothing changes. The last known status is kept.
- **The store says the key isn't valid for this site:** you get a **7-day grace period**. Pro keeps working, and a notice says *"Lumtera Pro could not confirm your license."* with the date it will pause, and a **Check the license** link. Pro only pauses after three failed checks spread over at least 7 days.
- **Paused:** the notice changes to *"Lumtera Pro features are paused."* with the reason, and **Check license again** and **Open the license screen** buttons.

While Pro is paused or not activated, Pro screens show the activation card. Alerts, the weekly summary, scheduled checks, PDF checks, portfolio syncs, webhooks and issue tracker requests stop, and [site-wide ignore rules](/pro/ignore) stop hiding findings. Your data is kept, and everything resumes when the license is active again.

### Moved the site to a new address?

If the site's address changes after activation, you'll see *"Lumtera Pro: this site has a new address."* with a **Reactivate the license** link. If this is the live site, reactivate the license. On staging or development copies, set `WP_ENVIRONMENT_TYPE` to `staging`, `development` or `local` in `wp-config.php`.

### Common activation errors

| Message | What to do |
| --- | --- |
| *This license has reached its site limit…* | Deactivate it on a site you no longer use, or upgrade to a bigger plan in your account. |
| *This license expired on …* | Renew it in your store account, then click **Refresh license**. |
| *That license key was not recognized. Check it for typos.* | Copy the key again from your purchase email or store account. |
| *That key is for a different product…* or *That key belongs to a bundle…* | Use the Lumtera Pro key from your purchase email. |
| *This license has been disabled…* | Contact support. |
| *Network activation needs the Agency or Unlimited plan…* | See [Multisite](#multisite). |
| *Could not reach the license server…* | Your server can't connect to `store.mantrabrain.com`. The message includes the reason, such as `HTTP 403`. Ask your host whether outgoing requests are blocked. |

## Updates

Lumtera Pro updates like any other plugin, from <span class="screen-path">Dashboard → Updates</span> and the Plugins screen, including the **View details** window. Update information is cached for 3 hours. **Check again** on the Updates screen fetches it fresh.

An active license is needed to download updates. Without one, the update row says *"Activate your license to update."*

## Deleting the plugin

Deleting Lumtera Pro keeps the license key on the site, so a reinstall keeps working, even with an expired key. To remove it too, define `LUMTERA_PRO_DELETE_LICENSE` as `true` in `wp-config.php` before deleting. See [Data & uninstall](/developers/data).

## Multisite

If Lumtera Pro is **network-activated**, one license covers the whole network and uses a single site activation. A network license needs the **Agency** or **Unlimited** plan. Manage it under <span class="screen-path">Network Admin → Accessibility → License</span>. Each site's License tab shows a read-only summary.

Personal and Freelancer keys work per site: network-deactivate Pro, then activate it and the key on each site. See [Multisite network](/pro/multisite).
