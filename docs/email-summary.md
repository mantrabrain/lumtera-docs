---
title: Weekly email summary
description: An optional weekly email with your site's accessibility score and how it changed, error and review counts, the most common issues and pages that got worse. Off by default, and sent by your own site.
---

# Weekly email summary

Lumtera can send a short email once a week with how your site is doing. It's **off by default**.

The email is sent by your own site with `wp_mail()`, like password reset emails. Lumtera sends nothing anywhere else.

## Turn it on

<ol class="step-list">
  <li>Go to <span class="screen-path">Accessibility → Settings → Email summary</span>.</li>
  <li>Switch on <strong>Send a weekly summary</strong>.</li>
  <li>In <strong>Send to</strong>, enter who should get it, or leave it empty to use the site admin email.</li>
  <li>Choose a <strong>Day</strong>.</li>
  <li>Click <strong>Save changes</strong>.</li>
</ol>

Once it's on and saved, the section shows the date and time of the next summary.

Only administrators can change this setting.

## Settings

| Setting | Default | Notes |
| --- | --- | --- |
| **Send a weekly summary** | Off | |
| **Send to** | The site admin email | Email addresses separated by commas, up to ten. Invalid addresses are dropped. If none of them are valid, the summary goes to the site admin email, and Lumtera warns you when you save. |
| **Day** | Monday | Any day of the week |

The time isn't a setting. The email goes out around 9:00 in your site's time zone (<span class="screen-path">Settings → General → Timezone</span>).

::: tip Scheduled tasks need visits
WordPress runs scheduled tasks when someone visits the site. On a quiet site, the email goes out with the next visit after 9:00. If it often arrives late, ask your host to run WP-Cron from a real server cron job. See [Scheduled tasks run late](/troubleshooting#scheduled-tasks-run-late-or-not-at-all).
:::

## What's in the email

The subject is *"[Your site name] Weekly accessibility summary"*. The email contains:

- **Your average score** out of 100, and how many points it went up or down since last week's email. The first email says there's no change to compare yet.
- **Error** and **needs review** counts.
- How many content items have been checked, out of the total.
- **Most common issues**: the three checks with the most findings, with how many times each was found and in how many items.
- **Got worse this week**: up to five pages whose score dropped since the last email, biggest drop first, each with its old and new score and a link to edit it. If no page got worse, it says so.
- An **Open the accessibility overview** button.
- A reminder that automated checks find many problems, not all of them, and a high score doesn't mean the site is fully accessible.
- A link to turn the summary off or change who gets it.

The numbers match the [Overview](/site-report#overview), so they include drafts and other unpublished content that's been checked. If nothing has been checked yet, the email says so and asks you to run a check from the Overview.

The email is plain HTML in a single column, with no images and no tracking.

### How "Got worse this week" works

While the summary is on, Lumtera notes each page whose score drops when it's checked again, for example when someone saves it. It remembers the score from before the first drop, so a page that drops and then recovers during the week isn't listed. The list starts fresh after each email.

Only drops that happen while the summary is on are noted, so the first email after turning it on can show an empty list.

## Stop the email

Switch off **Send a weekly summary** and save. Every email links back to this settings page.

Uninstalling Lumtera also removes the setting and the scheduled email.

## With Lumtera Pro <span class="pro-pill">Pro</span> {#with-lumtera-pro}

Lumtera Pro has its own weekly summary, as part of [Monitoring & alerts](/pro/monitoring). So that no one gets two emails:

- While Lumtera Pro is active, the **Email summary** section is hidden and the free summary isn't sent.
- Pro's summary is switched on and off with **Weekly summary email** under <span class="screen-path">Accessibility → Settings → Alerts</span>, and goes to the addresses in that section's **Send to**.
- Your free summary settings are kept. If you deactivate Lumtera Pro, the free summary starts again with its saved settings, from the next time someone opens wp-admin.

Pro's summary always goes out on Mondays at 9:00, and needs an active license. If Lumtera Pro is active without an active license, neither summary is sent.

| | Free summary | Pro summary |
| --- | --- | --- |
| Setting | **Email summary** section | **Weekly summary email** under **Alerts** |
| Default | Off | On, once Pro is licensed |
| Day | You choose | Monday |
| Change since last week | Score | Score and errors, from score history |
| Most common issues | Top 3 | Top 5 |
| Pages listed | Pages whose score dropped | **Needs attention**: up to five items with errors |

## For developers

The `lumtera_email_summary_active` filter decides whether the summary is sent. It defaults to the setting, and to off while Lumtera Pro is active.

```php
// Never send the free weekly summary on this site.
add_filter( 'lumtera_email_summary_active', '__return_false' );
```

The email is sent with `wp_mail()`, so an SMTP plugin changes how it's delivered. If it doesn't arrive, install an SMTP plugin and send a test email from it.
