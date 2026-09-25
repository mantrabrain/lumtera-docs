---
title: Dismissing issues
description: How to dismiss an issue that isn't a problem, who can dismiss errors, how dismissals survive re-scans, and how to restore them.
---

# Dismissing issues

Some issues aren't problems. An image may really be decorative, or a video embed may already have captions. Dismiss these so they stop showing up, and leave a reason for your team.

## Dismiss an issue

In the block editor sidebar:

<ol class="step-list">
  <li>Click <strong>Dismiss…</strong> on the issue (<strong>Dismiss this error…</strong> for errors).</li>
  <li>Optionally, fill in <strong>Why is this not a problem? (optional)</strong> The reason is saved with the dismissal.</li>
  <li>Click <strong>Dismiss</strong>.</li>
</ol>

You can also dismiss issues:

- in the **classic editor**'s Accessibility box, which asks for a reason
- in the **Elementor** panel, without a reason

The Content report doesn't have a dismiss button. Open the item in its editor.

Dismissing re-checks and saves the post's results straight away, so the score and reports update.

## Who can dismiss

| Severity | Who can dismiss it |
| --- | --- |
| Needs review, Tip | Anyone who can edit the post |
| Error | Anyone who can edit the post and whose role may dismiss errors. By default, that's editors and administrators. |

An administrator chooses which roles may dismiss errors under <span class="screen-path">Accessibility → Settings → Permissions</span>, in **Dismiss errors**. Administrators always can. See [Roles & permissions](/permissions).

People who can't dismiss an error see *"Only an editor can dismiss an error."* in the sidebar instead of the button. Restoring needs the same permission as dismissing.

Developers can also change this with the `lumtera_dismiss_errors_capability` filter. See [Hooks & filters](/developers/hooks).

## How dismissals work

- **They survive re-scans and updates.** A dismissal is tied to the check and the exact markup it found.
- **They come back if the markup changes.** Edit the image, link or block and Lumtera looks at it fresh.
- **They never hide something worse.** If the same markup later triggers a more severe finding, it shows.
- **They don't count.** Dismissed items don't affect the score or the report's totals.
- **Each one is recorded**, with who dismissed it, when, and why.

## See and restore dismissed items

At the bottom of the sidebar (or the Elementor panel), expand **N dismissed items**. Each shows *"Dismissed by name on date"* and the reason. Click **Restore** to bring it back.

## Ignore everywhere <span class="pro-pill">Pro</span> {#ignore-everywhere}
Dismissing works on one post. If the same finding comes from your theme or a pattern and appears on many pages, [Ignore everywhere](/pro/ignore) in Lumtera Pro hides it across the whole site, with a reason and an optional expiry.

Findings ignored this way also appear in the sidebar's dismissed list, marked *"Ignored site-wide by name on date"*. The **Restore** button appears only for people allowed to manage site-wide ignores.

With [Lumtera Pro](/pro/activity-webhooks), dismissals and restores also appear in the **Activity** log. Dismissing an issue that has a tracked fix closes the task as **Won't fix**.

## Turning a check off instead

If a check never applies to your site, don't dismiss it again and again. Switch it off, or lower its severity, in [Settings → Checks](/settings#checks).

## Privacy

Dismissals store the user's ID and optional note. They're included in WordPress's personal data export and erase tools. Erasing removes the name and note but keeps the dismissal. See [Data & uninstall](/developers/data).
