---
title: Fix tracking
description: Assign accessibility issues to people, follow their progress, and let Lumtera Pro confirm each fix with a re-scan.
---

# Fix tracking <span class="pro-pill">Pro</span>

Turn any issue into a task, assign it to someone, and let re-scans confirm the fix. Tasks close themselves once Lumtera no longer finds the issue.

![The Fix tracking screen](/screenshots/pro-fixes.webp)

## Track an issue

A **Track fix** button appears on every issue:

- in the block editor's Lumtera sidebar
- in the classic editor's Accessibility box
- in the issue lists on <span class="screen-path">Accessibility → Content</span>

<ol class="step-list">
  <li>Click <strong>Track fix</strong> on the issue.</li>
  <li>Choose who to assign it to under <strong>Assign to</strong>. It's you by default, or pick <strong>Nobody yet</strong>.</li>
  <li>Click <strong>Track</strong>. A status chip now shows on the issue.</li>
</ol>

The person you assign gets an email, unless you assigned yourself.

### Who can assign what

- Anyone who can edit a post can track fixes on it.
- **Authors** can only assign fixes to themselves.
- **Editors** can assign fixes to anyone who can edit that post.
- Closing an **error** as **Won't fix** needs the same permission as dismissing an error. By default that's editors and administrators. See [Dismissing issues](/dismissing).

## Statuses

| Status | Meaning |
| --- | --- |
| **Open** | Tracked, not started |
| **In progress** | Someone is working on it |
| **Fixed** | A re-scan confirmed the issue is gone. If someone marks it Fixed by hand, it shows as **Marked fixed (not yet verified)** until the next re-scan confirms it. |
| **Won't fix** | Closed without fixing, for example because the issue was dismissed |

## Re-scans confirm fixes

Every time a post is scanned (for example when it's saved), Lumtera Pro checks its tasks:

- **The issue is gone:** the task becomes **Fixed** (verified).
- **The issue is still there:** a task marked Fixed is **reopened**.
- **The markup changed, but the same problem is still there:** the task follows the issue and stays open.
- **The issue was dismissed:** the task closes as **Won't fix**.

Deleting a post deletes its tasks.

## The Fixes screen

Go to <span class="screen-path">Accessibility → Fixes</span>. Tiles show **Open**, **In progress**, **Fixed in the last 30 days** (verified by re-scan only) and **Assigned to me**.

Filter by **Show** (open and in progress by default, or any single status, or everything) and **Assigned to**. In the table you can change a task's assignee and status in place, and open its **History**.

Authors and contributors see **My fixes** instead: tasks assigned to them, or on posts they wrote.

## History

Every task keeps a full history: who started tracking it, who it was assigned to, each status change, notes, and each automatic change from a re-scan. Automatic changes are shown as made by "Lumtera". Fix tracking events also appear in the [Activity log](/pro/activity-webhooks).
