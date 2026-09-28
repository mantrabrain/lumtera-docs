---
title: Compare scans
description: See what changed between two scans of your site, with new findings first, then what was fixed and what is still there, by check and by site part, and which WordPress, theme and plugin updates happened in between.
---

# Compare scans

<p><span class="pro-pill">Pro</span> Every plan</p>

Compare scans shows what changed between two scans: new findings first, then what was fixed. Use it after a theme or plugin update, a redesign or a round of fixes. Go to <span class="screen-path">Lumtera → Reports → Compare scans</span> (administrators only).

## Which scans are kept

Lumtera Pro keeps a copy of the results of each of these scans, so there's something to compare after the next one:

- **Full scans of your content**: "Check all content" on the Overview, or `wp lumtera scan --all` with WP-CLI.
- **Site parts (menus, template parts, patterns, widgets)**: each site parts check. See [Site parts](/site-parts).
- **Scheduled page checks**: each scheduled run of [page checks](/pro/page-checks).

It keeps the last 12 scans of each kind, and the first scan of each month for the last 24 months.

With each scan, Pro also notes the WordPress version, the active theme (and its parent theme) and the active plugins with their versions. That's how it can tell you what was updated between two scans. Scans made before Lumtera Pro recorded this have no such list.

Until there are two scans of a kind, the screen says: *"Comparing needs two scans of this kind. Each full scan ("Check all content" or WP-CLI), site parts check and scheduled page check is kept, so there is something to compare after the next one."*

## Compare two scans

<ol class="step-list">
  <li>Under <strong>Scans of</strong>, choose <strong>Full scans of your content</strong>, <strong>Site parts (menus, template parts, patterns, widgets)</strong> or <strong>Scheduled page checks</strong>.</li>
  <li>Choose the <strong>Older scan</strong> and the <strong>Newer scan</strong>. Each is listed with its date, what started it (for example <strong>Check all content</strong>, <strong>WP-CLI</strong> or <strong>scheduled</strong>) and how many findings it had.</li>
  <li>Click <strong>Compare</strong>.</li>
</ol>

Two shortcuts sit below the form:

- **Since the last scan** compares the latest two scans. This is what the screen shows when you open it.
- **Since a date**: pick a date and click **Show changes**. The newest scan is compared with the last scan made on or before that date. If there's none, you'll see *"There is no earlier scan to compare with for that date. Pick another date, or two scans below."*

## Read the results

The summary, headed **From** *date* **to** *date*, shows three numbers: how many findings are **new** (and how many of those are errors), how many were **fixed**, and how many are **still there**.

**New since the older scan** comes first. It groups the new findings by where they come from, for example:

- *"12 new errors, all from template part "Header", changed 3 days ago"*
- *"2 new findings in page content"*

When a site part, such as a template part, synced pattern or navigation menu, was edited between the two scans, its line is marked **(likely cause)**. Use its **Edit** link to open it. **Where the new findings are** then lists the pages and parts with the most new findings.

### Updated between these scans {#updated-between-these-scans}

When WordPress, the theme or a plugin changed between the two scans, **Updated between these scans** lists it, for example:

- *"WordPress updated from 6.8.2 to 6.9"*
- *"Theme “Twenty Twenty-Five” updated from 1.2 to 1.3"*
- *"Plugin “WooCommerce” activated"*, *"… updated from … to …"* or *"… deactivated"*

*"An update can change what visitors get, so it is a possible cause of new findings."* It's a lead, not a verdict: an edited site part marked **(likely cause)** is usually the more direct explanation. A long list ends with *"and N more changes"*.

**By check** lists each check whose findings changed, with how many are **New**, **Fixed** and **Still there**.

**Fixed since the older scan** lists **Where findings were fixed**.

### After a Lumtera update {#version-change}

If the two scans were made with different versions of Lumtera's checks, a banner warns you: *"These scans were made with different versions of the checks (… and …). Some differences may come from checks that were added or changed, not from changes to your site."* Checks are added and improved over time, so a jump in findings right after you update Lumtera isn't always a change to your site.

::: tip After a theme or plugin update
Run **Check all content** (and a [site parts](/site-parts) check if your theme uses template parts) before and after the update. Then compare the two scans with **Since the last scan**. **Updated between these scans** names the update, and new findings grouped under one template part or menu usually point at what changed.
:::

## Where else scan changes appear

- [Client reports](/pro/reports) say how many findings are new and fixed since the scan before.
- The [evidence log](/pro/evidence) records each full scan with its new, fixed and still-there counts.
- In the [client portfolio](/pro/portfolio), each client site that runs Lumtera Pro shows its **Latest full check**.

## For developers

The `lumtera/compare-scans` ability returns the new, fixed and still-there findings between two saved scans of the same kind (the latest two by default), by check. See [Abilities](/developers/abilities).

Each stored scan keeps the site's environment (WordPress version, theme, parent theme and active plugins with versions) in its totals, under `env`; scans recorded before this have `env` set to `null`, and no update list is shown for them.
