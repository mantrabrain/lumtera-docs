---
title: Dismissing issues
description: How to dismiss an issue that isn't a problem, undo it, who can dismiss errors, how dismissals survive re-scans, why a dismissed issue can show again, and how to review and restore them in the Content report's Dismissed view.
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

A notice says **Issue dismissed.** Click **Undo** in it to report the issue again straight away. Press <kbd>Escape</kbd> to close the dismiss form without dismissing.

You can also dismiss issues:

- in the **Content report**: click **Issues** on a row, then **Dismiss** on an issue. You can add a reason.
- in the **classic editor**'s Accessibility box, which asks for a reason
- in the **Elementor** panel, which asks for an optional reason under **Why is this not a problem? (optional)**, like the block editor
- in [review mode](/review-mode), for whole-page findings. There you choose **Every page it appears on** (for something in a shared part, such as the footer) or **This page only**.

Dismissing re-checks and saves the post's results straight away, so the score and reports update.

## Who can dismiss

| Severity | Who can dismiss it |
| --- | --- |
| Needs review, Tip | Anyone who can edit the post |
| Error | Anyone who can edit the post and whose role may dismiss errors. By default, that's editors and administrators. |

An administrator chooses which roles may dismiss errors under <span class="screen-path">Lumtera → Settings → Permissions</span>, in **Dismiss errors**. Administrators always can. See [Roles & permissions](/permissions).

People who can't dismiss an error see *"You can't dismiss errors. Ask someone who can, or fix the issue."* in the sidebar instead of the button. Restoring needs the same permission as dismissing.

Developers can also change this with the `lumtera_dismiss_errors_capability` filter. See [Hooks & filters](/developers/hooks).

## How dismissals work

- **They survive re-scans and updates.** A dismissal is tied to the check and the markup it found. Small changes that don't change the element, such as extra spaces or reordered attributes, don't undo it, and two identical elements on one page are dismissed separately.
- **They come back if the markup changes.** Edit the image, link or block and Lumtera looks at it fresh.
- **They never hide something worse.** If the same markup later triggers a more severe finding, it shows.
- **They don't count.** Dismissed items don't affect the score or the report's totals.
- **Each one is recorded**, with who dismissed it, when, and why.

## Showing again {#showing-again}

When an issue you dismissed comes back, Lumtera says why, with **Showing again:** in the Content report, the block editor sidebar and the Elementor panel. There are two reasons:

- **It is more severe now.** The dismissal was for the same markup, but the finding is now more severe, for example because someone made the check stricter in Settings. A dismissal never hides a more severe finding.
- **Its markup probably changed.** An issue from this check was dismissed on this page before, and that dismissal no longer matches anything. Lumtera can't be certain it is the same issue, so it says so: *"If this is the same one, it shows again because its markup changed since then. Dismiss it again if it is still not a problem."*

Each hint gives the date, who dismissed it, and the reason they gave.

## See and restore dismissed items

**In the Content report:** open <span class="screen-path">Lumtera → Checks → Content</span> and choose the **Dismissed** view. It lists every issue dismissed in your content, with who dismissed it, when and why. Click **Restore** on a row, or tick several (or **Select all on this page**) and click **Restore selected**. Restored issues are reported again and count in the score. Restoring needs edit access to the item (and, for errors, the **Dismiss errors** permission); a row you can't restore says which one you're missing. See [Site report](/site-report#dismissed).

**In the editor:** at the bottom of the sidebar (or the Elementor panel), expand **N dismissed items**. Each shows *"Dismissed by name on date"* and the reason. Click **Restore** to bring it back.

Restoring needs the same permission as dismissing.

## Ignore everywhere {#ignore-everywhere}

<p><span class="pro-pill">Pro</span> Every plan</p>

Dismissing works on one post. If the same finding comes from your theme or a pattern and appears on many pages, [Ignore everywhere](/pro/ignore) in Lumtera Pro hides it across the whole site, with a reason and an optional expiry.

Findings ignored this way also appear in the sidebar's dismissed list, marked *"Ignored site-wide by name on date"*. The **Restore** button appears only for people allowed to manage site-wide ignores.

With [Lumtera Pro](/pro/activity-webhooks), dismissals and restores also appear in the **Activity** log. Dismissing an issue that has a tracked fix closes the task as **Won't fix**.

## Turning a check off instead

If a check never applies to your site, don't dismiss it again and again. Switch it off, or lower its severity, in [Settings → Checks](/settings#checks).

## Privacy

Dismissals store the user's ID and optional note. They're included in WordPress's personal data export and erase tools. Erasing removes the name and note but keeps the dismissal. The "Showing again" hints are kept with the post's results, and aren't part of the export. See [Data & uninstall](/developers/data).
