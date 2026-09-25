---
title: Agency portfolio
description: See every client site's accessibility score on one screen, connected straight from their WordPress with Application Passwords. No cloud service in between.
---

# Agency portfolio <span class="pro-pill">Pro</span>

<div class="pro-callout">The portfolio is included in the <strong>Agency</strong> and <strong>Unlimited</strong> plans. On other plans, the Portfolio screen says which plan it needs.</div>

See every client site on one screen, straight from their WordPress. There's no external service: your own WordPress site is the hub, and it reads each client site's summary directly over its REST API. Go to <span class="screen-path">Accessibility → Portfolio</span> (administrators only).

**Client sites only need the free Lumtera plugin.** They don't need Pro or a license.

## Connect a client site

On the **client** site:

<ol class="step-list">
  <li>Install and activate the free Lumtera plugin.</li>
  <li>Go to <span class="screen-path">Users → Add New</span> and create a user with the role <strong>Lumtera Reporter</strong>. This role can only read the accessibility summary, nothing else.</li>
  <li>Edit that user. Under <strong>Application Passwords</strong>, enter a name such as "Agency hub" and click <strong>Add New Application Password</strong>.</li>
  <li>Copy the password. WordPress shows it only once.</li>
</ol>

On **your** site (the hub), under **Connect a client site**:

<ol class="step-list">
  <li>Enter the <strong>Site address</strong>, for example <code>https://client.example.com</code>.</li>
  <li>Enter the <strong>Username</strong> and paste the <strong>Application Password</strong>.</li>
  <li>Click <strong>Connect site</strong>. You'll see "<em>client.example.com</em> is connected."</li>
</ol>

The password is stored encrypted with your site's secret keys, and it's only used to read the site's accessibility summary. It's never shown again.

::: tip Requirements for client sites
- **HTTPS.** WordPress only allows Application Passwords over HTTPS.
- **A public address.** Local and private network addresses are refused.
- **The final address.** If the site redirects (for example from `www` to non-`www`), connect it using the address it redirects to.
:::

## The portfolio dashboard

- Tiles: **Average score** across all sites, **Errors**, **Sites with errors** and **Sites in portfolio**.
- The **Sites** table: each site's **Score**, **Errors**, **Needs review** and how much content has been **Checked** (for example "40 of 52"), with when it last synced. Your own site is always the first row, marked **(this site)**. Click a site's name to open its Lumtera overview in a new tab.

Sites sync **twice a day** in the background. Use **Refresh all**, or **Refresh** on one site, to sync now.

To change a site's username or password, click **Edit connection** on its row, then use **Update a site's connection** and click **Update connection**. The new details are tested before they're saved. For security, the Application Password is never kept in the form: enter it again. **Remove** takes a site out of your portfolio. Revoke its Application Password on the client site too.

## Troubleshooting connections

| Message | Fix |
| --- | --- |
| The username or Application Password was not accepted… | Check the username and paste the Application Password again. The user needs the Lumtera Reporter role, or to be an editor or administrator. |
| Lumtera is not active on that site… | Install and activate the free Lumtera plugin on the client site. |
| The site redirects to … | Connect the site with its final address. |
| Client sites must use https://… | Connect over HTTPS. |
| That address cannot be reached from this site… | Use the site's public address. Local and private network addresses are refused. |
| That is this site's own address… | Your own site is already the first row. Connect client sites only. |
| The saved application password can no longer be read… | Your site's secret keys changed (for example, the salts were regenerated). Use **Update a site's connection** to enter the password again. To stop this happening, define `LUMTERA_PRO_ENCRYPTION_KEY` in `wp-config.php`. |

## How it works

The hub requests `/?rest_route=/lumtera/v1/site-summary` on each client site, using the username and Application Password. The `?rest_route=` form works under every permalink setting. The request never follows redirects. The client site returns a summary only: its score, errors, items to review, coverage, and its most common issues and worst pages. No content is copied. See [REST API](/developers/rest-api).

If your plan changes to one without the portfolio, syncing stops, but your connected sites stay saved.
