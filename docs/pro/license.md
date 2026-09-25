---
title: License & plans
description: Activate, refresh and deactivate your Lumtera Pro license, what each plan includes, what happens when a license expires, and how updates work.
---

# License & plans

Lumtera Pro needs an active license key to turn on. You'll find the key in your purchase email and in your [account at store.mantrabrain.com](https://store.mantrabrain.com/account/).

## Activate your license

<ol class="step-list">
  <li>Go to <span class="screen-path">Accessibility → Settings → License</span>. There's also a <strong>License</strong> link on the Lumtera Pro row of the Plugins screen.</li>
  <li>Paste your key into <strong>License key</strong>. Spaces and line breaks are removed for you.</li>
  <li>Click <strong>Activate</strong>. You'll see <em>"License activated. Thank you!"</em></li>
</ol>

Until the license is active, every Pro screen shows an **Activate your license to use …** prompt with its own **License key** field. Activating there brings you straight back to the screen you were on.

Only administrators (the `manage_options` capability) can manage the license.

## The License card

Once a key is saved, the card shows:

- **Plan**, **Key** (only the last four characters are shown), **Licensed to** and **Sites** (for example "3 of 5").
- **Renews**, or **Expired on** if it has expired, or **Expires: Never (lifetime)** for lifetime keys.
- A status such as **Active**, **Expired**, **Disabled**, **Revoked**, **Invalid** or **Not activated on this site**.

Buttons:

- **Refresh license** checks the key with the store again. Use it after you renew or upgrade.
- **Deactivate on this site** frees the activation so you can use it on another site. The key is always removed here, even if the store can't be reached. If the store didn't confirm it, free the site from **Licenses** in your store account.

## Plans

| Plan | Sites | Adds |
| --- | --- | --- |
| Personal | 1 | Page checks, PDF checks, alerts and weekly summary, score history, fix tracking, client reports and branding, CSV export, activity log and webhooks |
| Freelancer | 5 | White-label: hide the "Generated with Lumtera" credit on reports |
| Agency | 25 | [Agency portfolio](/pro/portfolio) and the [multisite network overview](/pro/multisite) |
| Unlimited | Unlimited | Everything |

To upgrade, buy the upgrade in your store account, then click **Refresh license**.

## When a license expires

**Everything keeps working.** An expired license stops three things only:

- updates
- support
- activating the key on new sites

The License card says so and shows a **Renew now** link. The update row on the Plugins screen says *"Renew your license to get updates."*

::: warning Don't deactivate an expired key
An expired license can't be activated again, here or on any other site, until it's renewed. If you deactivate it, Pro features stop on this site.
:::

## If the license can't be confirmed

Lumtera Pro checks the license with the store once a day.

- **The store can't be reached** (for example, your host blocks outgoing requests): nothing changes. The last known status is kept.
- **The store says the key isn't valid for this site:** you get a **7-day grace period**. Pro keeps working, and a notice says *"Lumtera Pro could not confirm your license."* with the date it will pause. Pro only pauses after three failed checks spread over at least 7 days.
- **Paused:** the notice changes to *"Lumtera Pro features are paused."* with the reason, and **Check license again** and **Open the license screen** buttons.

While Pro is paused or unlicensed, Pro screens show the activate prompt. Alerts, the weekly summary, scheduled checks, PDF checks, portfolio syncs and webhooks stop. Your data is kept, and everything resumes when the license is active again.

### Moved the site to a new address?

If the site's address changes after activation, you'll see *"Lumtera Pro: this site has a new address."* If this is the live site, reactivate the license. On staging or development copies, set `WP_ENVIRONMENT_TYPE` to `staging`, `development` or `local` in `wp-config.php`.

### Common activation errors

| Message | What to do |
| --- | --- |
| *This license has reached its site limit…* | Deactivate it on a site you no longer use, or upgrade to a bigger plan. |
| *This license expired on …* | Renew it in your store account, then click **Refresh license**. |
| *Could not reach the license server…* | Your server can't connect to `store.mantrabrain.com`. Ask your host whether outgoing requests are blocked. |

## Updates

Lumtera Pro updates like any other plugin, from <span class="screen-path">Dashboard → Updates</span> and the Plugins screen, including the **View details** window. Update information is cached for 3 hours. **Check again** on the Updates screen fetches it fresh.

An active license is needed to download updates. Without one, the update row says *"Activate your license to update."*

## Multisite

If Lumtera Pro is **network-activated**, one license covers the whole network and uses a single site activation. Manage it under <span class="screen-path">Network Admin → Accessibility → License</span>. Each site's License tab shows a read-only summary. See [Multisite network](/pro/multisite).
