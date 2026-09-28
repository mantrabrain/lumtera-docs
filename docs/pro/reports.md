---
title: Client reports
description: Create branded, printable accessibility reports with a full WCAG 2.2 A and AA checklist, save them as PDF, share them with a read-only link and give clients their own read-only sign-in.
---

# Client reports

<p><span class="pro-pill">Pro</span> Every plan. White-label and share links: Growth, Agency and Unlimited plans.</p>

Turn your results into a branded report you can send to a client. Every report covers all **55 WCAG 2.2 level A and AA success criteria**. Go to <span class="screen-path">Lumtera → Reports → Reports</span>. The screen is called **Client reports**. Anyone with the **See reports and check the site** permission can create reports (editors and administrators by default).

The **Reports** group has four sub-tabs: **Reports**, [Evidence](/pro/evidence), [Compare scans](/pro/compare-scans) and [Activity](/pro/activity-webhooks). The [Accessibility Conformance Report](/pro/acr) opens from a card on this screen.

![The cover of a client report, with the Download HTML and Save as PDF buttons](/screenshots/pro-report.webp)

## Create a report

<ol class="step-list">
  <li>Enter a <strong>Report title</strong> (default "Accessibility report") and the <strong>Client</strong> name (default: your site name).</li>
  <li>Optionally add a <strong>Note for the client</strong>. It's shown at the top of the summary, for example to say what was agreed or what happens next.</li>
  <li>Under <strong>Include</strong>, choose <strong>Findings for each page</strong> (on by default) and <strong>Tips (best-practice suggestions)</strong> (off by default).</li>
  <li>Click <strong>Create report</strong>. It's added to the <strong>Reports</strong> list below. Click its title to open it in a new tab.</li>
</ol>

Below the button, a line such as *"Covers 18 checked pages · average score 92"* tells you what the report will include.

Scan your content first, from <span class="screen-path">Lumtera → Overview</span>. Content that hasn't been checked is left out, and the screen tells you how many items that is. Next to the form, **Your branding** previews what new reports will use, with an **Edit branding** link.

**Every report is saved exactly as created.** Later scans, fixes or branding changes never change a report you've already made, so you always have a record of what the client received.

## What's in a report

- **Cover:** your logo or agency name, the report title, client, date, who prepared it and a contact.
- **Summary:** your note, the **Average automated score**, **Errors**, items that **Need review** and **Pages checked**, and the change since the previous report. When there are two full scans to compare, it also says how many findings are new and how many were fixed since the scan before (see [Compare scans](/pro/compare-scans)).
- **WCAG 2.2 checklist:** each of the 55 A and AA criteria with one of these results:

  | Result | Meaning |
  | --- | --- |
  | **Issues found** | Automated checks found definite failures |
  | **Needs review** | Likely problems a person should confirm |
  | **No automated issues** | Checked automatically and nothing found. Manual review is still advised. |
  | **Manual check needed** | No automated check covers this criterion |

- **Issues and how to fix them**, grouped by check, most severe and most frequent first.
- **Findings by page**, for published pages. Included when **Findings for each page** is on.
- **Live page checks**, if you use [page checks](/pro/page-checks) and **Findings for each page** is on. It shows each public page's result, preferring the scheduled, logged-out check when there is one. Pages you also check signed in as a test user ([signed-in checks](/pro/signed-in-checks), Agency and Unlimited plans) appear as their own entries, marked **Checked as:** and the role, for example "Customer".
- **Recommended next steps.**

The report states clearly that it's an automated review, not a statement of conformance. Form test results and signed-off [test sessions](/pro/test-sessions) are counted in the [Accessibility Conformance Report](/pro/acr) and the [evidence pack](/pro/evidence#evidence-pack), not in the client report.

## Save as PDF or HTML

Open the report and use the toolbar:

- **Save as PDF** opens your browser's print dialog. Choose "Save as PDF". **Chrome and Edge produce a tagged PDF** that screen readers can navigate, so your accessibility report is accessible too.
- **Download HTML** saves a single self-contained file, with your logo embedded if it's under 1 MB.
- **All reports** takes you back to the list.

The **Reports** list shows your latest 50 reports with their **Score** and **Errors**, and **Download**, **Share** and **Delete** for each. Deleting asks first: *"Delete this report? This cannot be undone."* Reports are private and are never indexed by search engines.

## Share links {#share-links}

<div class="pro-callout">Share links are included in the <strong>Growth</strong>, <strong>Agency</strong> and <strong>Unlimited</strong> plans. On the Personal plan, the <strong>Share links</strong> card says which plan it needs.</div>

A share link opens one report, read-only, for someone without an account on your site.

<ol class="step-list">
  <li>In the <strong>Reports</strong> list, click <strong>Share</strong> next to the report.</li>
  <li>Choose when the <strong>Link stops working after</strong>: 7 days, 30 days (the default), 90 days or 1 year.</li>
  <li>Click <strong>Create share link</strong>.</li>
  <li>Copy the <strong>Link for your client</strong> with <strong>Copy link</strong>. It's shown only once.</li>
</ol>

How share links protect the report:

- **Only a scrambled copy is kept.** Your site stores a hash of the link's secret token, never the token itself. The link can't be shown again, and a copy of the database can't open a report. Lost a link? Create a new one.
- **They expire on their own.** After the date you chose, the link says *"This link has expired. Ask the person who sent it for a new one."*
- **You can revoke a link at any time.** Click **Revoke** in the **Share links** table and confirm. Anyone who opens it then sees that it has been withdrawn.
- **They're never cached or indexed.** The page is sent with `noindex` and `no-store`, so search engines don't list it and browsers and proxies don't keep a copy.
- **Views are counted, visitors aren't tracked.** The **Share links** table shows each link's **Status** (for example *"Works until …"*, *"Expired …"* or *"Revoked …"*), when it was **Created** and how many **Views** it has had. Nothing about the visitor is recorded. Views are also written to the [activity log](/pro/activity-webhooks) as `report.viewed`, at most once an hour per link.

Each report keeps up to 20 links. Expired and revoked links stay listed for 90 days, then are removed.

[Client emails](/pro/portfolio#client-emails) can include a share link to a new full report, created on the client's site.

## The Accessibility client role {#client-role}

Give clients their own sign-in so they can read their results without being able to change anything. Lumtera Pro adds the **Accessibility client** role (`lumtera_client`) on every plan.

<ol class="step-list">
  <li>Go to <span class="screen-path">Users → Add New</span>.</li>
  <li>Create a user for your client with the role <strong>Accessibility client</strong>.</li>
</ol>

When they sign in, they land on the Lumtera Overview. They see only **Overview** and **Reports**:

- They can open and download the client reports in the list.
- They can read the [conformance report (ACR)](/pro/acr#for-clients): the card on the Reports screen shows **View conformance report**, which opens the finished report read-only. They can't open the editor.
- They can't create, delete or share reports. The **Create a report** form, **Delete** and **Share** aren't shown to them.
- They can't start **Check all content** or change anything in Lumtera. Other Lumtera screens lead back to the Overview, and any change is refused with: *"Your account can view accessibility results and reports, but not change them. Ask your agency or the site owner to make the change."*

The role works on WooCommerce shops too. WooCommerce normally sends people who can't edit posts to **My account**. Lumtera lets the Accessibility client role into its report screens.

The role gets the **See reports and check the site** permission by default. You can change that under [Permissions](/permissions). If a user also has a role that can edit posts, the restrictions don't apply to them. When Lumtera Pro is deleted, the role is removed and those users keep their accounts, without a role.

## Branding {#branding}

Set your branding once under <span class="screen-path">Lumtera → Settings → Branding</span> (administrators only). It's printed on the cover and every page footer. Reports already created keep the branding they were made with.

| Setting | Default |
| --- | --- |
| **Logo** | None |
| **Agency name** | Your site name |
| **Website** | Your site address |
| **Contact email** | The admin email |
| **Accent color** | `#1f4e79` |
| **Footer text (optional)** | Empty (the agency name is used) |
| **Hide the "Generated with Lumtera" credit (white-label)** | Off. **Growth plan and up.** |

Text on the accent color switches between black and white automatically to stay readable, and the accent is darkened where needed to reach 4.5:1 contrast.

Branding is included in every plan. It's also used by the [conformance report](/pro/acr), the [evidence pack](/pro/evidence#evidence-pack) and [client emails](/pro/portfolio#client-emails).

White-label (hiding the credit) needs the Growth plan or higher. On the Personal plan, the setting is replaced by a note saying which plan it needs. If a plan is downgraded, new reports show the credit again.

## Export findings to CSV

You don't need Pro for a spreadsheet of findings. The **Content report**'s **Export CSV** is part of the free plugin: see [Site report](/site-report).

## For developers

- The `lumtera_pro_report_row_actions` action fires among each report's actions in the reports list. Lumtera Pro uses it for **Share**. It receives the report ID, and the report's title and client for screen-reader labels.
- The `lumtera_pro_client_rest_allowed` filter lists REST routes an Accessibility client may still write to. It's empty by default.

See [Hooks & filters](/developers/hooks).
