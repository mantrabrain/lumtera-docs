---
title: Weekly email summary
description: An optional weekly email with your site's accessibility score and how it changed, error and review counts, what you fixed, the most common issues, pages that got worse and the weekly home page check. Off by default, and sent by your own site.
---

# Weekly email summary

Lumtera can send a short email once a week with how your site is doing. It's **off by default**.

The email is sent by your own site with `wp_mail()`, like password reset emails. Lumtera sends nothing anywhere else.

## Turn it on

The quickest way is the Overview's [getting-started checklist](/quick-start#the-getting-started-checklist): **Send me the weekly email** turns it on for the address shown, and **Also check my home page every week** (ticked by default) turns on the [weekly home page check](/settings#weekly-home-page-check) too. Or:

<ol class="step-list">
  <li>Go to <span class="screen-path">Lumtera → Settings → Email summary</span>.</li>
  <li>Switch on <strong>Send a weekly summary</strong>.</li>
  <li>In <strong>Send to</strong>, enter who should get it, or leave it empty to use the site admin email.</li>
  <li>Choose a <strong>Day</strong>.</li>
  <li>Click <strong>Save changes</strong>.</li>
</ol>

Once it's on and saved, the section shows the date and time of the next summary.

## Check that email arrives {#send-a-test-summary}

Many sites can't send email until an SMTP plugin or an email service is set up. To check yours, click **Send a test summary now** in the **Check that email arrives** card. It sends this week's summary straight away, with *"(test)"* in the subject, to the addresses in **Send to**. A test doesn't change next week's comparison.

If it doesn't arrive within a few minutes, check the spam folder, then your site's email setup.

## When sending fails {#when-sending-fails}

Lumtera records every attempt to send the summary. If one fails, the Email summary section shows it, for example *"The summary due on September 28, 2026 could not be sent."*, with the reason WordPress gave. It also says what usually fixes it: many hosts need an SMTP plugin, or an email service, before WordPress can send mail, and password reset emails are probably affected too. Once a summary gets through, the section shows **Last summary sent:** with the date.

Only administrators can change this setting.

## Settings

| Setting | Default | Notes |
| --- | --- | --- |
| **Send a weekly summary** | Off | |
| **Send to** | The site admin email | Email addresses separated by commas, up to ten. When you save, Lumtera names any address that isn't valid and leaves it out. If none of them are valid, the summary goes to the site admin email, and Lumtera says so. |
| **Day** | Monday | Any day of the week |
| **Include a note about Lumtera Pro** | On | One line at the end of the email about what Lumtera Pro adds. Switch it off to leave it out. Shown only while Lumtera Pro isn't installed, and the line is never sent once it is. |

### The note about Lumtera Pro {#note-about-lumtera-pro}

Without Lumtera Pro, the email can end with one factual line: *"This summary covers the content Lumtera has checked. Lumtera Pro can also check your key pages, forms and checkout on a schedule and alert you to new errors."* To leave it out, switch off **Include a note about Lumtera Pro** and save. The switch isn't shown once Pro is installed, and the line is never sent then.

The time isn't a setting. The email goes out around 9:00 in your site's time zone (<span class="screen-path">Settings → General → Timezone</span>).

::: tip Scheduled tasks need visits
WordPress runs scheduled tasks when someone visits the site. On a quiet site, the email goes out with the next visit after 9:00. If it often arrives late, ask your host to run WP-Cron from a real server cron job. See [Scheduled tasks run late](/troubleshooting#scheduled-tasks-run-late-or-not-at-all).
:::

## What's in the email

The subject is *"[Your site name] Weekly accessibility summary"*. The email contains:

- **Your average score** out of 100, and how many points it went up or down since last week's email. The first email says there's no change to compare yet.
- **Error** and **needs review** counts.
- When people have saved [whole-page results](/review-mode#save-results-to-reports), the issues found in the theme, menus and footer, and how many pages were checked as a whole.
- How many content items have been checked, out of the total.
- **Fixed this week**: how many issues went away from content that was edited since the last email. A fix that was undone isn't counted. The first email counts the last 7 days instead.
- **Most common issues**: the three checks with the most findings, with how many times each was found and in how many items.
- **Got worse this week**: up to five pages whose score dropped since the last email, biggest drop first, each with its old and new score and a link to edit it. If no page got worse, it says so.
- **Home page check**, when the [weekly home page check](/settings#weekly-home-page-check) is on: its latest result and date, or why it couldn't run.
- An **Open the accessibility overview** button.
- A reminder that automated checks find many problems, not all of them, and a high score doesn't mean the site is fully accessible.
- Without Lumtera Pro, and unless you switched it off: one line saying what Lumtera Pro adds, with a **See the Pro plans** link.
- A link to turn the summary off, change who gets it or leave out the note about Pro.

The numbers match the [Overview](/site-report#overview), so they include drafts and other unpublished content that's been checked. If nothing has been checked yet, the email says so and asks you to run a check from the Overview.

The email is simple HTML in a single column that fits a phone screen, with no images and no tracking. It also carries a plain-text copy of the same content, for mail programs and people who read email as text.

### How "Got worse this week" works

While the summary is on, Lumtera notes each page whose score drops when it's checked again, for example when someone saves it. It remembers the score from before the first drop, so a page that drops and then recovers during the week isn't listed. The list starts fresh after each email.

Only drops that happen while the summary is on are noted, so the first email after turning it on can show an empty list.

## Stop the email

Switch off **Send a weekly summary** and save. Every email links back to this settings page.

Deactivating or deleting Lumtera stops the scheduled email. Your summary settings are kept unless you chose **Delete everything** under <span class="screen-path">Lumtera → Settings → General</span> → [When Lumtera is deleted](/settings#when-lumtera-is-deleted).

## With Lumtera Pro {#with-lumtera-pro}

<p><span class="pro-pill">Pro</span> Every plan</p>

Lumtera Pro has its own weekly digest, as part of [Monitoring & alerts](/pro/monitoring). So that no one gets two emails:

- While Lumtera Pro sends its digest, the free summary isn't sent. The **Email summary** section says *"Lumtera Pro sends its own weekly digest, so this summary is not sent."*, with a link to **Alerts**.
- Pro's summary is switched on and off with **Weekly summary email** under <span class="screen-path">Lumtera → Settings → Alerts</span>, and goes to the addresses in that section's **Send to**.
- Your free summary settings are kept. If you deactivate Lumtera Pro, the free summary starts again with its saved settings, from the next time someone opens wp-admin.

Pro's digest always goes out on Mondays at 9:00, while Lumtera Pro is licensed on the site. An expired yearly license still counts: only updates and support stop. If Lumtera Pro is installed but no license is activated, or the license was deactivated, Pro sends no digest, so **the free summary is sent** as usual (if you switched it on).

| | Free summary | Pro summary |
| --- | --- | --- |
| Setting | **Email summary** section | **Weekly summary email** under **Alerts** |
| Default | Off | On, once Pro is licensed |
| Day | You choose | Monday |
| Change since last week | Score | Score and errors, from score history |
| Most common issues | Top 3 | Top 5 |
| Pages listed | Pages whose score dropped | **Needs attention**: up to five items with errors |

## For developers

The `lumtera_email_summary_active` filter decides whether the summary is sent. It defaults to the setting, and to off while Lumtera Pro sends its own weekly digest. Whether Pro sends it comes from the `lumtera_pro_sends_digest` filter: its default is whether Pro is active, and Pro answers with whether it's licensed on the site (an expired license counts).

```php
// Never send the free weekly summary on this site.
add_filter( 'lumtera_email_summary_active', '__return_false' );
```

The email is sent with `wp_mail()`, so an SMTP plugin changes how it's delivered. Failures reported through WordPress's `wp_mail_failed` action are recorded and shown in the settings, as described above.
