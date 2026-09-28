---
title: Feedback response targets
description: Set how many days you aim to take to answer each kind of accessibility feedback, see overdue requests, get alerts by email and Slack, assign requests and turn them into fix tasks.
---

# Feedback response targets

<p><span class="pro-pill">Pro</span> Every plan</p>

The free plugin gives you an accessibility [feedback form and inbox](/feedback). Lumtera Pro adds **response targets**: how quickly you aim to answer each kind of request. Requests that go past their target are marked overdue, and you're told once through your alert channels. You can also assign a request to someone and turn it into a fix task.

## Set your response targets {#set-targets}

<ol class="step-list">
  <li>Go to <span class="screen-path">Lumtera → Settings → Response targets</span> (administrators only).</li>
  <li>Under <strong>Your response targets</strong>, enter a number of days for each kind of request.</li>
  <li>Save.</li>
</ol>

| Request type | Default target |
| --- | --- |
| **Report a barrier** | 5 days |
| **Request an accessible version of content or a document** | 10 days |
| **Something else** | 10 days |

Targets are in **calendar days**, counted to the end of the day in your site's time zone. 0 means no target, and the longest target is 365 days. Changes apply to every open request.

::: warning Your own goal, not a legal deadline
A response target is how quickly **you** aim to answer. It isn't a legal deadline. Check with your adviser what applies to you.
:::

## Overdue requests {#overdue}

A request that is still **New** or **In progress** after its target is **overdue**. Lumtera checks every hour.

In the feedback inbox (<span class="screen-path">Lumtera → Feedback & statement → Feedback</span>):

- Overdue requests get an **Overdue** badge.
- The **Overdue** view lists them all, with a count, for example **Overdue (3)**.
- Each request shows **Your response target**, with *"Answer by …"* or *"Overdue since …"*, or *"No target set for this type"*.

### Alerts by email and Slack {#alerts}

When a request goes overdue, you're told **once**, through the channels you set up under <span class="screen-path">Lumtera → Settings → Alerts</span>:

- **Email**, to the **Send to** addresses, when **Email me when a publish adds errors** is on. The subject is *"[Site name] 3 accessibility requests are past your response target"*. The email lists each request's reference, type and due date, and a link to the **Overdue** view.
- **Slack**, to the Slack webhook, with the same list and an **Open the feedback inbox** link.

The event `feedback.overdue` also goes to the [activity log](/pro/activity-webhooks) and to any [webhooks](/pro/activity-webhooks#webhooks) that send **Accessibility feedback** events.

### Weekly overdue summary {#weekly-summary}

With **Weekly summary email** on (under **Alerts**), every request still past its target is listed in a separate weekly email: *"[Site name] Weekly: 3 accessibility requests past your response target"*. Nothing is sent in a week with no overdue requests.

## Assign a request {#assign}

Open a request in the inbox. Under **Assigned to**, choose a person and click **Assign**. The list shows everyone who can handle accessibility feedback (see [Permissions](/permissions)).

- *"Assigned. They were sent an email with a link to this request."* The email's subject is *"[Site name] Accessibility feedback assigned to you: A11Y-2026-0001"*.
- *"Assigned to you."* when you pick yourself. No email is sent.
- *"Nobody is assigned to this request now."* when you choose **Nobody**.

Assigned requests show an **Assigned to** *name* badge. The **Assigned to me** view lists yours. Assigning doesn't change the request's status.

## Create a fix task {#fix-task}

When a request is about a page on your site, you can track the fix in [Fix tracking](/pro/fix-tracking):

<ol class="step-list">
  <li>Open the request. Assign it first if you want the task to go to someone.</li>
  <li>Click <strong>Create fix task</strong>. The task is created on the page the request is about, assigned to the person above.</li>
</ol>

You'll see: *"Fix task created for the page this request is about, and the request is now in progress. Follow the task in Fixes."* A **New** request moves to **In progress**. The request then shows its **Fix task**.

If the request isn't about a page on your site, you'll see: *"This feedback is not about a page on this site, so there is nothing to attach a task to."*

A fix task made from feedback isn't closed by a re-scan, because no automated check reports it. A person closes it.

## Evidence

Feedback received, status changes, assignments and overdue requests are recorded in the [evidence log](/pro/evidence). The [evidence pack](/pro/evidence#evidence-pack) lists each request by reference only, with whether it was answered within your target. What visitors wrote, their names and email addresses stay in your site.

In the [client portfolio](/pro/portfolio), a client site that runs Lumtera Pro reports how many of its requests are past their target.
