---
title: Fixes queue
description: Propose fixes for many pages at once, or once at the source for a shared header, footer, pattern or menu. Review each change, apply the approved ones in the background, and undo any of them. Choose who can propose and approve fixes.
---

# Fixes queue

<p><span class="pro-pill">Pro</span> Every plan. The approval rule needs Agency or Unlimited.</p>

The free plugin [fixes one issue at a time](/fixing-issues), from the editor or the Content report. The **Fixes queue** does the same for many pages at once, with a review step in between. Open <span class="screen-path">Lumtera → Fixes → Fixes queue</span>.

It works in three steps:

1. **Propose.** Lumtera drafts a fix for each page. Nothing on your pages changes yet.
2. **Review.** Check each change, edit the text if needed, then approve or reject it.
3. **Apply.** Approved fixes are written to the pages, which are then checked again. Each page keeps a revision, and you can undo any fix here.

Each change comes from one of Lumtera's built-in fixes or from text you write. If you've connected an AI provider, text such as alt text can also be drafted by AI. Nothing is fixed automatically: a person approves every change before it's applied.

## Propose fixes

![The Fixes queue: propose, review and apply, with the choice of which issues to fix](/screenshots/pro-fixes-queue.webp)

<ol class="step-list">
  <li>In the <strong>Propose fixes</strong> card, choose where the fixes come from, under <strong>Fix issues from</strong>:
    <ul>
      <li><strong>The same issue on many pages</strong>: a "fix once" group, such as the same vague "Read more" link on 12 pages. Choose it under <strong>Issue</strong>.</li>
      <li><strong>Every issue from one check</strong>, such as every link that opens a new tab. Choose it under <strong>Check</strong>.</li>
      <li><strong>Everything in one shared part (fix at the source)</strong>: every fixable issue in one header, footer, pattern or menu. Choose it under <strong>Shared part</strong>. See <a href="#fix-at-the-source">Fix at the source</a>.</li>
    </ul>
  </li>
  <li>Click <strong>Propose fixes</strong>. Proposing doesn't change any page.</li>
</ol>

Lumtera drafts one change per issue, for pages you can edit. The run works in the background, a few items at a time. You can leave the screen: the **Current run** card shows progress, such as *"9 of 9 done"*, and **Cancel run** stops it after the item in progress.

Only checks that Lumtera knows how to fix are offered. See [What can be fixed this way](/fixing-issues#what-can-be-fixed-this-way). Content a page builder manages is never changed.

### How many per run

Each run handles up to your plan's number of changes:

| Personal | Growth | Agency | Unlimited |
| --- | --- | --- | --- |
| 25 | 100 | 250 | 500 |

The same limit applies to approving, applying and undoing many changes at once. The rest aren't dropped: they're counted, and the screen says how many are left for the next run.

When a run uses 80% or more of the limit, people who manage the site see one line naming the plan that handles more, with **See the … plan** and **Upgrade in your account** links. **Dismiss this tip** hides it. See [When you reach a limit](/pro/license#when-you-reach-a-limit).

### Text drafted by AI

Some fixes need words, such as alt text or link text. When an administrator has switched on [AI suggestions](/ai), Lumtera asks your AI provider to draft them. Every draft waits for a person, and is marked *"Drafted by AI: check it is accurate for this page before approving."*

AI drafts count toward your [AI request limit](/ai#limits), per person. When you reach it, the run pauses and says so: *"Paused: your account has used its AI drafts for the moment (there is a limit per 10 minutes). The run continues by itself shortly; you can leave this screen."*

Without AI, or when the AI can't draft one, the change is proposed without text and marked *"Needs text: write it below, then approve."* You write it while reviewing.

## Review changes

The **Review changes** card lists the changes in views: **Waiting for review**, **Approved**, **Applied**, **Needs attention** and **Rejected or undone**, each with a count.

Each change shows the page, the check, who proposed it, and what changes, **Before** and **After**. For a fix that needs text, type it under **Text to use** and click **Save text**: *"Text saved. Approve the change to use it."*

- **Approve** or **Reject** one change, or tick several and use **Approve selected** or **Reject selected**.
- **Approve all waiting (N)** approves everything in the view, up to your plan's limit.
- Rejected changes are never applied.

## Apply and undo

- **Apply** one approved change, or use **Apply selected** or **Apply all approved (N)**.
- Applying runs in the background. Each change is written to its page, a revision is saved first, and the page is checked again. The result says *"Fixed: the re-check no longer finds the issue"*, or *"The re-check still reports the issue"*.
- A change that can't be applied, or whose page changed since it was proposed, moves to **Needs attention**, with the reason. Nothing is written for it.
- **Undo** takes an applied fix off again, or use **Undo selected**. Changes are undone newest first, so several fixes on one page come off in the reverse order they went on.

Every applied fix and undo is recorded in the [evidence log](/pro/evidence) and the [activity log](/pro/activity-webhooks). When a tracked issue is fixed, its [task](/pro/fix-tracking#fixes-applied-from-the-queue) closes as verified, and its issue in GitHub, GitLab, Jira or Linear gets a comment.

## Fix at the source {#fix-at-the-source}

A header, footer, synced pattern or menu appears on many pages. **Everything in one shared part (fix at the source)** changes the part itself, so every page that shows it gets the fix:

- **template parts**, such as the header and footer;
- **synced patterns**;
- **Navigation** menus;
- **classic menu** items.

Changing a template part or menu needs permission to edit the site's design (administrators by default). Fixing a template part that still comes from your theme creates a customised copy in your site, as editing it in the Site Editor does. See [Fix at the source](/fixing-issues#fix-at-the-source) and [Site parts](/site-parts).

Changes to shared parts aren't linked to fix tracking tasks, because a task tracks one page. The pages that show the part are checked again after the fix.

## Who can propose and approve {#who-can-propose-and-approve}

Two permissions control the queue:

| Permission | What it allows | Capability |
| --- | --- | --- |
| **Propose fixes** | Draft fixes for review in the Fixes queue, one page or many at once. Proposing never changes a page. | `lumtera_propose_changes` |
| **Approve and apply fixes** | Approve or reject proposed fixes, apply approved ones to pages and undo them. Each applied fix saves a revision of the page first. | `lumtera_approve_changes` |

Administrators always have both. By default, so does every role that can edit other people's posts, such as editors. People also need to be able to edit the page, or the shared part, a change is for.

Anyone who can edit a page can still fix one issue at a time on it from the editor or the Content report, unless **Require a second person to approve** is on.

## Fix approvals settings {#fix-approvals-settings}

Administrators choose who can do what under <span class="screen-path">Lumtera → Settings → Fix approvals</span>, in the **People** group.

- **Propose fixes** and **Approve and apply fixes**: tick the roles that can. Each choice grants the capability to the role. A role editor plugin can also give it to single users. Role changes apply right away, to every user with the role.
- **Review rules**: the two switches below.

### Require a second person to approve {#require-a-second-person-to-approve}

<div class="pro-callout">This rule is part of the <strong>Agency</strong> and <strong>Unlimited</strong> plans. On Personal and Growth the switch is shown, can't be turned on, and says so, with <strong>See the Agency plan</strong> and <strong>Upgrade in your account</strong> links.</div>

With **Require a second person to approve** on, nobody can approve a fix they proposed themselves. Use it when changes to your pages need a second pair of eyes.

While it's on:

- It applies everywhere fixes are made: the Fixes queue, and one-at-a-time fixes in the editor and the Content report. Approving, applying and undoing need **Approve and apply fixes**.
- The queue says *"This site requires a second person to approve: you cannot approve changes you proposed."* If every change waiting is your own, it asks you to find someone else who can approve fixes.
- An approval must still stand when the change is applied, which can be later, in a batch or by someone else. If the person who approved it can no longer approve fixes or edit the page, the change isn't applied: *"The person who approved this change can no longer approve it … Reject it and draft it again for a fresh review."*
- You can always withdraw (reject) your own proposal.

### Let AI agents approve rule fixes

**Let AI agents approve rule fixes** is **off by default**. When it's on, an AI agent connected to this site, through the `lumtera/apply-approved-changes` [ability](/developers/abilities), may approve and apply fixes made by Lumtera's **built-in rules**, for example making a link open in the same tab.

- It never covers text an AI wrote, such as alt text or link text. That always needs a person.
- It has no effect while **Require a second person to approve** is on.

## For developers

- `lumtera_pro_limit` with the feature `batch_size` changes the number of changes per run. See [License & plans](/pro/license#for-developers).
- `lumtera_pro_remediation_ai_allowed( $allowed )` decides whether a run may ask for another AI draft now. By default it follows the free plugin's AI request limit (`lumtera_ai_rate_limit`).
- The capabilities are `lumtera_propose_changes` and `lumtera_approve_changes`.
- The free plugin's `lumtera_change_allowed` filter is how the approval rule reaches the editor and the Content report.
- Abilities: `lumtera/list-proposals`, `lumtera/apply-approved-changes`, `lumtera/revert-change` and `lumtera/create-task`. See [Abilities](/developers/abilities).
- Events: `change.applied`, `change.verified` and `change.reverted` go to the [activity log and webhooks](/pro/activity-webhooks#events).

See [Hooks & filters](/developers/hooks).
