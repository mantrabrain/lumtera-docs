---
title: Client portfolio
description: See every client site's accessibility score, trend and coverage on one screen, connected straight from their WordPress with Application Passwords, and send clients branded monthly or quarterly updates. No cloud service in between.
---

# Client portfolio

<p><span class="pro-pill">Pro</span> Growth, Agency and Unlimited plans</p>

<div class="pro-callout">The client portfolio holds up to <strong>5 client sites on Growth</strong>, <strong>25 on Agency</strong> and <strong>no set number on Unlimited</strong>. Your own site is always included and doesn't count. On the Personal plan, the Portfolio screen says which plan it needs. When the portfolio reaches 80% of your plan's number, a dismissible line names the plan that holds more, with <strong>See the … plan</strong> and <strong>Upgrade in your account</strong> links.</div>

See every client site on one screen, straight from their WordPress. There's no external service: your own WordPress site is the hub, and it reads each client site's summary directly over its REST API. Go to <span class="screen-path">Lumtera → Portfolio</span> (administrators only). The screen is called **Client portfolio**.

**Client sites only need the free Lumtera plugin.** They don't need Pro or a license. A few extras, such as the latest full check and report links in client emails, appear when the client site runs Lumtera Pro too.

## Connect a client site {#connect}

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
  <li>Click <strong>Connect site</strong>. You'll see "<em>Client name</em> is connected."</li>
</ol>

The password is stored encrypted with your site's secret keys. It's used only to read the site's accessibility summary and, if the user is allowed to, to start rescans and create reports. It's never shown again. You can revoke it at any time on the client's profile screen.

::: tip Which user to connect with
- **Lumtera Reporter** is enough to see the site in your portfolio.
- **Rescans** from the hub need a user who may run checks on the client site, such as an editor.
- **Report links in client emails** need an administrator with the **Manage client reports** permission on a client site that runs Lumtera Pro.
:::

::: warning Requirements for client sites
- **HTTPS.** Client sites must use `https://`, so the Application Password is never sent unencrypted. WordPress only allows Application Passwords over HTTPS anyway.
- **A public address.** Local and private network addresses are refused.
- **Not your own site.** Your site is already in the portfolio as **(this site)**, with live results.
- **The final address.** If the site redirects (for example from `www` to non-`www`), connect it using the address it redirects to.
:::

If your plan's allowance is used up, the form says so. Sites beyond the allowance, for example after a downgrade, are kept but **paused**: they keep their history but aren't refreshed, rescanned or emailed. Remove sites or upgrade to use them again.

## The portfolio dashboard

The tiles at the top show the **Average score** across your sites that have results (sites not checked yet are left out, and the tile says how many, for example *"across 4 sites; 1 not checked yet"*), the **Median score** (shown once 3 sites have results: half your sites score higher, half lower), **Errors** and how many sites have them, and **Sites in portfolio**.

The **Sites** table shows, for each site:

| Column | What it shows |
| --- | --- |
| **Site** | Its name and address (with the port and folder when there is one, so `example.com` and `example.com:8443`, or two sites in different folders on one host, can be told apart), when it last synced, and its labels. Your own site is always first, marked **(this site)** and **live**. |
| **Score** | The average automated score, with a small chart of the last 90 days. Screen readers get a text summary of the trend instead. |
| **Errors** and **Needs review** | The site's current counts. |
| **Since last month** | **Worse**, **Better** or **No change**, with the change in errors and score, for example "errors +4, score −3 since 28 August". It says **Lumtera updated since** when the client updated Lumtera in between, because new or improved checks can change the numbers. |
| **Coverage** | How many of the 55 WCAG 2.2 A and AA criteria have evidence from a check or a recent manual test, for example "35 of 55 criteria with evidence". |
| **Checked** | How much content has been checked, for example "40 of 52". |

Click **Details** to open a site's page, or **Refresh** to sync one site now.

### Order, labels and bulk actions

- **Order** the table by **Most errors first** (the default), **Regressed since last month**, **Lowest score first** or **Name, A to Z**. **Regressed since last month** puts the sites that got worse first: the most new errors, then the largest score drop. Sites with less than a month of history come last.
- **Label** filters the table by the labels you gave your sites, for example the care plan each is on.
- Tick sites, then under **With selected sites** choose **Sync now** or **Queue full rescan** and click **Apply**. **Sync now** reads each site's latest numbers. **Queue full rescan** checks all of each site's content again, on that site, one site after another in the background. Progress shows in the table.
- **Refresh all** syncs every site.

Sites sync **twice a day** in the background.

## A site's page {#site-page}

Click **Details** on a site to see:

- **Last 90 days**: charts of the score and errors, one point for each day the site was refreshed. **Show the numbers** opens the same data as a table, for screen readers and anyone who prefers numbers. History is kept for 400 days.
- **This site and your portfolio**: the site's score and errors compared with the median of your portfolio (your own site included). Nothing is compared with sites outside your portfolio, and nothing leaves your sites.
- **Compare two dates**: the score, errors, items that need review, pages checked, criteria with evidence and feedback waiting for an answer, on two days you pick.
- **Latest full check**: how many problems are **New problems**, **Fixed** and **Still there** since the check before. Shown when the client site runs Lumtera Pro, which keeps a record of each full check.
- **Statement and feedback**: whether the client's [accessibility statement](/statement) is published and when its review is due, how much visitor [feedback](/feedback) is waiting for an answer and, if the client runs Lumtera Pro, how much is past its [response target](/pro/feedback-targets). It also shows how many [site parts](/site-parts) were checked.
- **Full rescan**: **Queue full rescan** for this site.
- **Client emails** (see below).
- **Labels**: up to 5 labels of up to 30 characters, separated by commas, for example "Gold plan, Retainer". Click **Save labels**.
- **Connection**: enter a new username or **New Application Password** and click **Update connection**. The site is checked with the new details before they're saved. For security, the Application Password is never kept in the form: enter it again.
- **Remove site from portfolio** deletes the site with its history and email settings. Revoke its Application Password on the client site too.

**Open its Lumtera overview** opens the client site's own Lumtera screens in a new tab. **Refresh now** syncs the site.

## Client emails {#client-emails}

<div class="pro-callout">Client emails are included in the <strong>Growth</strong>, <strong>Agency</strong> and <strong>Unlimited</strong> plans.</div>

Send your client a short update with their site's numbers, in your [branding](/pro/reports#branding). On a site's page, under **Client emails**:

<ol class="step-list">
  <li>Under <strong>Send</strong>, choose <strong>Monthly</strong> or <strong>Quarterly</strong> (or <strong>Off</strong>).</li>
  <li>Enter the <strong>Recipients</strong>: up to 10 email addresses, separated by commas or new lines.</li>
  <li>Optionally tick <strong>Add a link to a new full report</strong>.</li>
  <li>Click <strong>Save email settings</strong>. The screen tells you when the next email goes out.</li>
</ol>

Scheduled emails go out on the first day of the month or quarter and cover the one that just ended. The subject reads *"Site name: accessibility update, period"*, for example *"Crumb & Co. Bakery: accessibility update, September 2026"* or *"… accessibility update, Q3 2026"*.

The email includes the automated score, errors, items that need review, pages checked, the change since last time, the latest full check, criteria with evidence, the statement's status and feedback waiting for an answer, with the most frequent problems. It says that automated checks don't find everything and that the numbers aren't a certification. Replies go to the contact email in your branding. With white-label on, it doesn't mention Lumtera.

**The full report link.** When **Add a link to a new full report** is ticked, the client site creates a fresh [client report](/pro/reports) and the email links to its [share link](/pro/reports#share-links). This needs Lumtera Pro on the client site, and a connection user who is an administrator with the **Manage client reports** permission there. The **Report link** line tells you whether it's **Ready** or why not, and the link is offered only when the client site would accept the request. Without it, the email is sent without a link.

Before you rely on the schedule:

- **Preview email** and **Plain-text version** show the email as it will be sent.
- **Send a test to me** sends it to your own address, with "[Test]" in the subject.
- **Send now to recipients** sends it straight away, after asking you to confirm.

Emails are sent by your site through WordPress, so they arrive only as reliably as its mail setup allows. If a test doesn't arrive, set up an SMTP plugin. A scheduled email isn't sent with results more than 7 days old: if refreshing the site failed, it's tried again the next day, and **Last problem** says why.

## Give clients their own sign-in

To let a client look at their own results, create a user on **their** site with the **Accessibility client** role. It sees only the Overview and Reports and can change nothing. The role comes with Lumtera Pro on every plan and works on WooCommerce shops too. See [The Accessibility client role](/pro/reports#client-role).

## Troubleshooting connections

| Message | Fix |
| --- | --- |
| The username or Application Password was not accepted… | Check the username and paste the Application Password again. The user needs the Lumtera Reporter role, or to be an editor or administrator, and Application Passwords must not be turned off on that site. |
| The site refused the request before WordPress could check the Application Password… | A security plugin or firewall on the client site is blocking REST API requests. Allow REST API requests with Application Passwords there. |
| Lumtera is not active on that site… | Install and activate the free Lumtera plugin on the client site. |
| The site redirects to … | Connect the site with its final address. |
| Client sites must use https://… | Connect over HTTPS. |
| That address cannot be reached from this site… | Use the site's public address. Local and private network addresses are refused. |
| That is this site's own address… | Your own site is already the first row. Connect client sites only. |
| The saved application password can no longer be read… | Your site's secret keys changed (for example, the salts were regenerated). Update the site's connection with a new Application Password. To stop this happening, define `LUMTERA_PRO_ENCRYPTION_KEY` in `wp-config.php`. |

## How it works {#how-it-works}

The hub requests `/?rest_route=/lumtera/v1/site-summary` on each client site, using the username and Application Password. The `?rest_route=` form works under every permalink setting. The request never follows redirects. No content is copied.

The client site returns a summary only: its score, errors, items to review, coverage, its most common issues and worst published pages. Since summary version 2 it also returns:

- **coverage**: criteria with evidence
- **statement**: whether the statement is published, and when it's due for review
- **feedback**: open requests and, with Lumtera Pro on the client site, overdue ones
- **parts**: how many site parts were checked
- **run_diff**: new and fixed findings between the last two full checks (Lumtera Pro on the client site)
- whether the connection may start a rescan

Every new field was added without changing the old ones, so older hubs keep working. See [REST API](/developers/rest-api).

If your plan changes to one without the portfolio, syncing stops, but your connected sites stay saved.

## For developers

The free plugin's `lumtera_site_summary` filter lets you add fields to the summary a hub reads. Add fields only: don't remove or retype existing ones, which older hubs rely on. See [Hooks & filters](/developers/hooks).
