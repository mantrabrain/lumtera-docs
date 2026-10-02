---
title: FAQs
description: Answers to common questions about Lumtera. What it can and can't promise, overlays, what gets checked, page builders, AI, permissions, privacy, performance and Lumtera Pro.
---

# FAQs

## Will Lumtera make my site ADA or WCAG compliant?

No tool can do that on its own, and you should be wary of any that claims to. Lumtera finds the problems automation can reliably detect and tells you how to fix them. Meeting WCAG also needs manual testing, an accessible theme and ongoing care. See [What automated testing can't do](/manual-testing).

## How much of WCAG does Lumtera check automatically?

WCAG 2.2 has 55 success criteria at levels A and AA. With review mode's whole-page checks, Lumtera's automated checks cover **37 of 55** of them, fully or in part. The checks of saved content alone cover **25 of 55**. Lumtera Pro's form tests bring it to **40 of 55**, and its consistency checks (Growth plan and up) to **44 of 55**. "Covers" means a check looks at that criterion; it doesn't mean your site meets it. The rest need a person, and the [guided checklists](/manual-checks) walk you through them. The Overview shows your site's own coverage. See [Review coverage](/scoring#review-coverage).

## How accurate are the checks?

It was measured against the W3C's ACT rules test cases, whose right answers are known. On the 21 W3C ACT rules its checks cover, Lumtera reported 130 of 132 known failures (98%) at any severity: 95 as errors and 35 for review, with 4 false alarms in 222 clean examples. That covers those 21 rules only: across all 34 rules tested, including those outside Lumtera's checks, axe-core found more failures than Lumtera. Where a check isn't sure, it says **Needs review** rather than raising a false error. See [How accurate is Lumtera?](/accuracy).

## Is Lumtera an overlay?

No. Lumtera never adds a widget to your site or rewrites your pages in the visitor's browser. It helps you fix the content itself. The optional [site fixes](/site-fixes) change the HTML your server sends, in the same way for every visitor, and are all off by default.

## Does it add anything to my site's front end?

Not unless you choose to. Signed-in users who can edit a post can open [review mode](/review-mode) from the admin bar, if their role is allowed under [Permissions](/permissions). People who can see the reports can also open it on the blog home, archives, search results and the shop page. That only loads for them, and only when they ask for it. Visitors see something only where you add it: one of Lumtera's blocks or shortcodes (the [feedback form](/feedback), the statement link or a plain-language summary), the optional footer link to your statement, or a [site fix](/site-fixes) you switch on.

## Which standards does it check against?

WCAG 2.2 levels A and AA. WCAG 2.2 includes every criterion of WCAG 2.0 and 2.1 except the obsolete 4.1.1 Parsing. Those are the versions referenced by Section 508 (2.0), the US Department of Justice's ADA Title II rule (2.1) and EN 301 549 (2.1), the standard behind the European Accessibility Act. 65 of the 69 checks map to level A or AA criteria. The other four are level AAA best practices, shown as tips. See [All checks](/checks). The [accessibility statement](/statement) can also name EN 301 549 as its standard.

## Does it check my theme?

Yes, one page at a time. The saved checks look at the content you write: blocks, classic content, page-builder layouts and shortcode output. That keeps every result something you can fix in the editor.

Your menus, template parts, synced patterns and widget areas are checked too, as [site parts](/site-parts), and each issue says where it comes from, so you can fix it once.

The **Whole page** tab in [review mode](/review-mode#whole-page) checks the page as your browser renders it, theme included: contrast, landmarks, the skip link, headings, target size and zoom. The **Keyboard** tab walks the page with the Tab key. [Page checks](/pro/page-checks) in Lumtera Pro check many pages and templates on a schedule, as a logged-out visitor.

## Why is something marked "Needs review" instead of "Error"?

Because a machine can't decide it on its own. Is this empty alt text deliberate? Does this YouTube video have captions? Lumtera doesn't guess, so it doesn't cry wolf. Look, and either fix it or [dismiss it](/dismissing) with a reason. Every issue has **Why is this flagged?**, which explains the reason. See [How sure is each check?](/checks#confidence)

## Can Lumtera fix issues for me?

With your approval, yes. Many issues have **Fix without opening** in the Content report, or **Review fix** in the editor. Lumtera shows the change before anything is saved, saves a revision, checks the page again, and lets you undo it. A problem in a shared header, footer, menu or pattern can be fixed once, where it comes from. Nothing is ever fixed automatically, and content a page builder manages is never changed. See [Fixing issues](/fixing-issues).

## Why didn't Lumtera flag low contrast on my page?

The content checks only check contrast when **both** the text color and the background color are set in the block. Otherwise the colors come from your theme's CSS, which the content checks can't see, and guessing would cause false alarms. The **Whole page** tab in review mode measures the real colors on screen, including text over gradients and images.

## Can I turn off a check, or make it stricter?

Yes. Under <span class="screen-path">Lumtera → Settings → Checks</span>, set any check to Error, Needs review, Tip or Off. See [Settings](/settings#checks).

## Who can dismiss an issue?

Anyone who can edit a post can dismiss items that need review, and tips. Dismissing an error needs an editor or administrator by default. To change who can, go to <span class="screen-path">Lumtera → Settings → Permissions</span>. See [Dismissing issues](/dismissing) and [Roles & permissions](/permissions).

## Can I choose who sees the reports?

Yes. Under <span class="screen-path">Lumtera → Settings → Permissions</span>, choose which roles can see the reports and check the site, dismiss errors, use review mode and handle accessibility feedback. With Lumtera Pro, you also choose who can [manage client reports](/permissions#manage-client-reports). Administrators always can. See [Roles & permissions](/permissions).

## Does it work with my page builder?

Tested on real installs: Elementor, Beaver Builder, SiteOrigin Page Builder, Brizy, Visual Composer Website Builder, Live Composer and Zion Builder, and the block libraries Spectra, Kadence Blocks, GenerateBlocks, Stackable, Otter, Essential Blocks, Greenshift and Kubio. Divi 4 (Divi 5 layouts are blocks), Bricks, Oxygen 2 to 4 and WPBakery are supported through their documented APIs. Each one is checked from the builder's own output, and turns on when the builder is active. Oxygen 6 and Breakdance aren't supported yet. Lumtera never changes content a page builder manages; it tells you what to fix in the builder.

Elementor also gets a live panel inside the Elementor editor. Values in Advanced Custom Fields are checked with the post. See [Classic editor & page builders](/page-builders).

## Does it work with the classic editor? WooCommerce?

Yes to both. The classic editor gets a **Lumtera Accessibility** box below the content, with the issues from the last save. WooCommerce product descriptions and short descriptions are checked. See [Classic editor & page builders](/page-builders#classic-editor).

## Does it slow down my site?

Not for visitors. Nothing runs on the front end unless you add a Lumtera block or switch on site fixes, which are tiny. In the editor, checks run in the background. Checking on save adds a fraction of a second to saving, and you can switch it off. **Check all content** runs in small batches, so it works within any host's time limits.

## Does Lumtera use AI?

Only if you turn it on. Lumtera offers AI-assisted suggestions you review for alt text, link text, headings and a plain-language summary. Each has its own switch, all off by default, and every check works without them.

When a feature is on, data is sent only when someone clicks its button, such as **Suggest** or **Draft with AI**, and only to the AI provider you connected to WordPress (WordPress 7.0 and later). Nothing changes until a person chooses a suggestion. See [AI suggestions](/ai).

## Is my content sent anywhere?

Not by default. Checks, reports, fixes and the feedback inbox all run and are stored inside your WordPress. There is no account and no tracking. Data leaves your site only if you turn on one of these:

- **AI suggestions** send what's listed for each feature to your AI provider, when someone clicks. See [AI suggestions](/ai).
- **The Akismet spam check for the feedback form** sends each feedback message to Akismet. It's off by default, and needs the Akismet plugin, active and connected. See [Feedback form and inbox](/feedback).

The weekly email summary and feedback notifications are sent by your own site's email. The optional [weekly home page check](/settings#weekly-home-page-check) loads the home page from your own server, and refuses any other address. **Report a false positive** and the **Docs** buttons are ordinary links: nothing is sent unless you post the report yourself. Feedback messages are included in WordPress's personal data export and erase tools. See [Data & uninstall](/developers/data).

## What happens to my data if I delete Lumtera?

It's kept by default, so reinstalling picks up your results, feedback and settings. To remove everything instead, choose **Delete everything** under <span class="screen-path">Lumtera → Settings → General</span> → **When Lumtera is deleted**. Deactivating never removes anything. See [When Lumtera is deleted](/settings#when-lumtera-is-deleted).

## Does the alt text manager change my posts?

Only when you ask it to. After you describe an image, Lumtera lists the posts that show it without alt text, and adds the description when you click the button. Existing alt text is never replaced, each change is saved as a revision, and posts you can't edit are skipped. See [Alt text manager](/alt-text).

## Which languages does the reading level support?

English, Spanish, French, German, Italian and Dutch, each with a formula made for that language. With Polylang or WPML, each post's own language is used. Other languages aren't measured, because a formula built for one language gives meaningless numbers for another.

## I changed a setting. Why haven't my results changed?

Settings apply to the next check. Go to the Overview and click **Check all content again**.

## Will Lumtera nag me to upgrade or leave a review?

No pop-ups and no upgrade notices. Without Pro, a few screens can show one short [Pro tip](/site-report#pro-tips) at a relevant moment, and each can be hidden for good. After a week, once your site has made real progress, the Overview asks once for a [short review](/site-report#review-request), with **Maybe later** and **Don't ask again**. Everything free stays free, and nothing is locked.

## Is there a page limit?

No. The free plugin checks any number of posts, pages, products and custom post types, with no per-scan fees.

## What does Lumtera Pro add?

Page checks for many pages at desktop and phone width, including scheduled checks as a logged-out visitor, and [signed-in checks](/pro/signed-in-checks) as a test user (one role on the Personal and Growth plans, any number on Agency and Unlimited). [Form tests](/pro/form-tests) that submit forms empty and check the error messages, without sending anything. Hover and focus contrast, carousel checks, [consistency across pages](/pro/consistency) (Growth plan and up) and PDF checks. A tamper-evident [evidence log](/pro/evidence), [compare scans](/pro/compare-scans), [test sessions](/pro/test-sessions), and a [fixes queue](/pro/fixes-queue) to review, apply and undo fixes in bulk. Alerts, fix tracking with issue trackers, branded client reports, an [Accessibility Conformance Report](/pro/acr) on every plan, a [client portfolio](/pro/portfolio) (Growth plan and up) and multisite tools (Agency plan and up).

The Content report's CSV export is part of the free plugin. Everything in the free plugin stays free. See [What Pro adds](/pro/).

## What happens when my Pro license expires?

Pro keeps working on the sites where it is active. Updates, support and activating new sites pause until you renew. A reminder shows 30 and 7 days before a yearly license expires. Personal, Growth and Agency are also sold as lifetime licenses, which never expire. Unlimited is sold yearly only. See [License & plans](/pro/license#when-a-license-expires).

A refunded key is different: Pro's features turn off, and the free plugin keeps working. See [Refunds](/support#refunds).

## Can I use Lumtera on client sites?

Yes. The free plugin is GPL and has no site limits. To see all your clients' sites on one screen, use the [client portfolio](/pro/portfolio) in Pro (Growth plan and up). Client sites only need the free plugin.

## Can I use Lumtera in CI?

Yes. `wp lumtera check --page=/` checks a page of your site and exits with an error code when it finds problems. It writes SARIF for GitHub code scanning, or JUnit for other CI tools. Record today's issues with `--write-baseline=<file>`, then run with `--baseline=<file>`, so the build fails only on new issues. A ready-made GitHub Action is coming, but it isn't available yet. See [CI](/developers/ci).
