---
title: Ignore everywhere
description: Hide a finding that repeats on every page, such as markup your theme adds to every footer, with a required reason, an optional expiry and a log of every change.
---

# Ignore everywhere <span class="pro-pill">Pro</span>

Some findings repeat on every page because of markup you can't change, such as a link your theme adds to every footer. Dismissing it on each page one by one isn't practical. An **ignore rule** hides that finding everywhere it appears, with a reason your team can see.

::: warning Only ignore what isn't a barrier
Use ignore rules for findings that are genuinely not a barrier, or for markup you can't change and have reported to its maker. An ignored finding is still there for visitors. Findings come back when the rule is removed or expires.
:::

Only administrators can add and remove ignore rules.

## What an ignore rule does

- Every matching finding, on every post and page, is hidden. It counts as dismissed, so it leaves scores and totals the same way a [dismissal](/dismissing) does.
- It applies to content checks and to [page checks](/pro/page-checks).
- A rule made in the editor from an item that needs review never hides an error of the same check.
- When you add or remove a rule, the pages that may be affected are checked again in the background, so scores and totals catch up.

In the block editor's Lumtera sidebar, ignored findings are listed with the page's dismissed items, marked **Ignored site-wide by** *name* **on** *date*, with the reason. Administrators can click **Restore** there. Restoring removes the whole rule, so the finding comes back on every page.

## Ignore a finding from the editor

<ol class="step-list">
  <li>In the block editor's Lumtera sidebar, find the issue and click <strong>Ignore everywhere…</strong>. It appears on issues that point at markup.</li>
  <li>Under <strong>Match</strong>, choose <strong>This exact markup</strong>, or <strong>Elements like this one (pattern)</strong>. For a pattern, check the suggested <strong>Pattern</strong> and edit it if needed.</li>
  <li>Enter the <strong>Reason (required)</strong>. It's shown to everyone who sees the hidden finding.</li>
  <li>Optionally set <strong>Expires (optional)</strong>.</li>
  <li>Click <strong>Ignore everywhere</strong>.</li>
</ol>

**Manage ignore rules** in the same form opens the settings screen.

## Add a rule in Settings

Go to <span class="screen-path">Accessibility → Settings → Ignore rules</span>. Under **Add an ignore rule**:

<ol class="step-list">
  <li>Choose the <strong>Check</strong>: any content check or page check.</li>
  <li>Under <strong>Match</strong>, choose <strong>Exact markup</strong> or <strong>Pattern</strong>.</li>
  <li>Enter the <strong>Markup or pattern</strong> (up to 1,000 characters).</li>
  <li>Enter the <strong>Reason (required)</strong> (up to 500 characters).</li>
  <li>Optionally choose an <strong>Expires (optional)</strong> date.</li>
  <li>Click <strong>Add rule</strong>. You'll see <em>"Ignore rule added. Pages with matching findings are being checked again in the background."</em></li>
</ol>

## Exact markup or pattern

**Exact markup** hides findings of the chosen check whose markup is the same as the snippet you enter. Copy it from **Markup** on the finding. Differences in spacing and typography are ignored.

**Pattern** hides findings of the chosen check on elements that look alike. A pattern is an optional tag name followed by `.class` and `#id` parts, for example:

| Pattern | Matches |
| --- | --- |
| `a.social-link` | `a` elements whose `class` contains "social-link" |
| `footer#colophon` | `footer` elements whose `id` contains "colophon" |
| `.cookie-banner` | any element whose `class` contains "cookie-banner" |

The tag must be the same, and each `.class` or `#id` part only has to appear somewhere in the element's `class` or `id`. So `a.social` also matches `<a class="footer-social-link">`. Keep patterns as specific as you can.

A rule only applies to the check you chose. The same markup is still reported by other checks.

## Expiry

With an expiry date, the rule stops applying after the end of that day, site time. Leave it empty to keep the rule until you remove it.

Expired rules stay in the list, marked **Expired** *date*, until you remove them. Their findings come back the next time each page is checked.

## The Ignore rules screen

The **Ignore rules** table lists each rule with its **Check**, what it **Matches** (**Exact markup** or **Pattern**, and the value), the **Reason**, who **Added** it and when, and when it **Expires** (**Never** if it doesn't). **Remove** deletes a rule. Its findings are reported again as pages are checked.

While pages are being checked again, the screen says how many are waiting.

You can have up to 500 rules.

## The log

**Recent changes** lists the last 20 changes, such as who ignored which check site-wide, or stopped ignoring it, with the markup or pattern and the reason.

The [Activity log](/pro/activity-webhooks) keeps the full history, as **Issue ignored site-wide** and **Site-wide ignore removed** entries under **Dismissed and ignored issues**. The same events can go to your [webhooks](/pro/activity-webhooks#events).

## If the license stops

Ignore rules need an active license. While Pro is paused or not activated, rules don't hide anything, and ignored findings come back as pages are checked. The rules are kept, and apply again when the license is active.

## For developers

Rules can be listed, added and removed through the REST API at `lumtera-pro/v1/ignore`, by users who can manage options, while the license is active. Other add-ons can hide findings site-wide with the free plugin's `lumtera_ignored_issue` filter. See [Hooks & filters](/developers/hooks).
