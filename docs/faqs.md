---
title: FAQs
description: Answers to common questions about Lumtera. Compliance, overlays, what gets checked, page builders, AI, permissions, privacy, performance and Lumtera Pro.
---

# FAQs

## Will Lumtera make my site ADA or WCAG compliant?

No tool can do that on its own, and you should be wary of any that claims to. Lumtera finds the problems automation can reliably detect in your content and tells you how to fix them. Compliance also needs manual testing and an accessible theme. See [What automated testing can't do](/manual-testing).

## Is Lumtera an overlay?

No. Lumtera never adds a widget to your site or rewrites your pages in the visitor's browser. It helps you fix the content itself. The optional [site fixes](/site-fixes) change the HTML your server sends, in the same way for every visitor, and are all off by default.

## Does it add anything to my site's front end?

Not for visitors. Logged-in users who can edit a post can open [review mode](/review-mode) from the admin bar, if their role is allowed under [Permissions](/permissions). That only loads for them, and only when they ask for it. The only front-end changes for visitors are the site fixes you switch on.

## Which standards does it check against?

WCAG 2.2 levels A and AA. WCAG 2.2 includes every criterion of WCAG 2.0 and 2.1 except the obsolete 4.1.1 Parsing. Those are the versions referenced by Section 508 (2.0), the US Department of Justice's ADA Title II rule (2.1) and EN 301 549 (2.1), the standard behind the European Accessibility Act. 60 of the 64 checks map to a level A or AA criterion. The other four are level AAA best practices, shown as tips. See [All checks](/checks).

## Does it check my theme?

Yes, one page at a time. The saved checks look at the content you write: blocks, classic content, page-builder layouts and shortcode output. That keeps every result something you can fix in the editor.

The **Whole page** tab in [review mode](/review-mode#whole-page) checks the page as your browser renders it, theme included: contrast, landmarks, the skip link, headings, target size, focus and zoom. [Page checks](/pro/page-checks) in Lumtera Pro check many pages and templates on a schedule, as a logged-out visitor.

## Why is something marked "Needs review" instead of "Error"?

Because a machine can't decide it on its own. Is this empty alt text deliberate? Does this YouTube video have captions? Lumtera doesn't guess, so it doesn't cry wolf. Look, and either fix it or [dismiss it](/dismissing) with a reason.

## Why didn't Lumtera flag low contrast on my page?

The content checks only check contrast when **both** the text color and the background color are set in the block. Otherwise the colors come from your theme's CSS, which the content checks can't see, and guessing would cause false alarms. The **Whole page** tab in review mode measures the real colors on screen.

## Can I turn off a check, or make it stricter?

Yes. Under <span class="screen-path">Accessibility → Settings → Checks</span>, set any check to Error, Needs review, Tip or Off. See [Settings](/settings#checks).

## Who can dismiss an issue?

Anyone who can edit a post can dismiss items that need review, and tips. Dismissing an error needs an editor or administrator by default. To change who can, go to <span class="screen-path">Accessibility → Settings → Permissions</span>. See [Dismissing issues](/dismissing) and [Roles & permissions](/permissions).

## Can I choose who sees the reports?

Yes. Under <span class="screen-path">Accessibility → Settings → Permissions</span>, choose which roles can see the reports and check the site, dismiss errors, and use review mode. Administrators always can. See [Roles & permissions](/permissions).

## Does it work with my page builder?

Yes for Elementor, Divi 4 (Divi 5 layouts are blocks), Beaver Builder, Bricks, Oxygen 2 to 4, and WPBakery. Each one is checked from the builder's own output, and turns on when the builder is active. Oxygen 6 and Breakdance aren't supported yet.

Elementor also gets a live panel inside the Elementor editor. Values in Advanced Custom Fields are checked with the post. See [Classic editor & page builders](/page-builders).

## Does it work with the classic editor? WooCommerce?

Yes to both. The classic editor gets an **Accessibility** box below the content, with the issues from the last save. WooCommerce product descriptions and short descriptions are checked. See [Classic editor & page builders](/page-builders#classic-editor).

## Does it slow down my site?

Not for visitors. Nothing runs on the front end unless you switch on site fixes, which are tiny. In the editor, checks run in the background. Checking on save adds a fraction of a second to saving, and you can switch it off. **Check all content** runs in small batches, so it works within any host's time limits.

## Does Lumtera use AI?

Only if you turn it on. Lumtera offers AI-assisted suggestions you review for alt text, link text, headings and a plain-language summary. Each has its own switch, all off by default, and every check works without them.

When a feature is on, data is sent only when someone clicks its button, and only to the AI provider you connected to WordPress (WordPress 7.0 and later). Nothing changes until a person chooses a suggestion. See [AI suggestions](/ai).

## Is my content sent anywhere?

No. Everything runs on your own server. The exceptions are ones you switch on:

- **AI suggestions** send what's listed for each feature to your AI provider, when someone clicks. See [AI suggestions](/ai).
- **The weekly email summary** is sent by your own site's email. See [Weekly email summary](/email-summary).

See [Data & uninstall](/developers/data).

## Does the alt text manager change my posts?

Only when you ask it to. After you describe an image, Lumtera lists the posts that show it without alt text, and adds the description when you click the button. Existing alt text is never replaced, each change is saved as a revision, and posts you can't edit are skipped. See [Alt text manager](/alt-text).

## Which languages does the reading level support?

English, Spanish, French, German, Italian and Dutch, each with a formula made for that language. With Polylang or WPML, each post's own language is used. Other languages aren't measured, because a formula built for one language gives meaningless numbers for another.

## I changed a setting. Why haven't my results changed?

Settings apply to the next check. Go to the Overview and click **Check all content again**.

## Is there a page limit?

No. The free plugin checks any number of posts, pages, products and custom post types, with no per-scan fees.

## What does Lumtera Pro add?

Page checks for many pages, including scheduled checks as a logged-out visitor. PDF checks. Email and Slack alerts, a weekly summary and score history. Fix tracking, with issues created in GitHub, GitLab, Jira or Linear. Ignoring a finding everywhere. Webhooks. Client reports, CSV export, white-label and an [Accessibility Conformance Report](/pro/acr). An agency portfolio and a multisite network overview.

Everything in the free plugin stays free. See [What Pro adds](/pro/).

## What happens when my Pro license expires?

Everything keeps working. You stop getting updates and support until you renew. See [License & plans](/pro/license#when-a-license-expires).

## Can I use Lumtera on client sites?

Yes. The free plugin is GPL and has no site limits. To see all your clients' sites on one screen, use the [agency portfolio](/pro/portfolio) in Pro. Client sites only need the free plugin.
