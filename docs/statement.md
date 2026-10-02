---
title: Accessibility statement
description: Create a draft accessibility statement against WCAG 2.1, WCAG 2.2 or EN 301 549, with templates for the European Accessibility Act, UK public sector, ADA Title II and AODA. Known problems are filled in from your results, and ADA Title II exception tags record your reasoning.
---

# Accessibility statement

An accessibility statement tells visitors how accessible your site is, what you know doesn't work yet, and how to reach you if they hit a barrier. Public-sector sites in the EU and UK must publish one, and the European Accessibility Act (EAA) expects businesses to explain how their services meet the accessibility requirements.

Lumtera creates a **draft** statement page from your answers and your results. Go to <span class="screen-path">Lumtera → Feedback & statement → Statement</span>. Anyone who can publish pages can use it, which means editors and administrators by default.

![The accessibility statement generator](/screenshots/screenshot-8.webp)

::: info Not legal advice
A statement describes where your site stands. It doesn't make a site compliant on its own. Check with your adviser which rules apply to you.
:::

## Create your statement

<ol class="step-list">
  <li>Choose a <strong>Template</strong> and a <strong>Standard</strong>.</li>
  <li>Fill in the form (see the fields below). The <strong>Before you publish</strong> list at the side shows what your template still needs.</li>
  <li>Click <strong>Create draft statement</strong>. Lumtera creates a draft page called "Accessibility statement" and opens it in the editor.</li>
  <li>Review and edit the draft, then publish it.</li>
  <li>Link to it from every page, usually in the footer. See <a href="#link-to-your-statement">Link to your statement</a>.</li>
</ol>

**Nothing is published automatically.**

## Templates

Templates change the headings and which answers are needed. The facts come from the same answers, so you can switch template at any time.

| Template | For |
| --- | --- |
| **General (W3C model)** | Most sites. The structure of the W3C accessibility statement generator. |
| **European Accessibility Act** | Services covered by the EAA. Adds the Annex V service information: a description of the service and how it meets the accessibility requirements. |
| **UK public sector (PSBAR)** | UK public sector websites. The headings of the UK model statement. |
| **US ADA Title II / Section 504** | US state and local government and other public entities. How to request an accessible version, and content that may fall under an exception. |
| **Ontario AODA** | Organizations in Ontario. The feedback process and accessible formats on request. |

Each template has its own wording for how to complain or escalate.

## Standards

| Standard | Notes |
| --- | --- |
| **WCAG 2.1 level AA** | The technical standard of the ADA Title II web rule, and what most laws referred to until recently. |
| **WCAG 2.2 level AA** | The current version of WCAG. Meeting it also meets WCAG 2.1 and 2.0 AA. |
| **EN 301 549 V3.2.1** | The harmonised European standard today. For web content, it includes WCAG 2.1 level AA. |
| **EN 301 549 V4.1.1** | Includes WCAG 2.2 level AA. Published in September 2026; its citation in the EU Official Journal is expected in late 2026. |

With an EN 301 549 standard, each known problem names the EN clause as well as the WCAG criterion.

## Fields

| Field | Notes |
| --- | --- |
| **Organization name** | Required. Defaults to your site title. |
| **Description of the service**, **How the service meets the accessibility requirements** | Needed for the **European Accessibility Act** template (Annex V). Other templates leave them out. |
| **Conformance status** | **Partially conformant** (the default, and the honest choice for most sites), **Fully conformant**, **Non-conformant** or **Not yet assessed**. See [Fully conformant](#fully-conformant). |
| **Contact email**, **Phone (optional)**, **Feedback form address (optional)** | At least one is needed. Leave the feedback form address empty to link the page that has your [feedback form](/feedback), found automatically. The contact email is also where visitors' answers to your [feedback replies](/feedback#reply-update-and-note) go. |
| **We aim to respond within** | Defaults to "5 business days" |
| **Evaluation method** | **Self-evaluation by our own team**, **Evaluation by an outside expert**, or both, with **More about the evaluation (optional)** |
| **Last evaluated** | Suggested from your last site-wide check and your manual checks |
| **Mention Lumtera as the testing tool** | Off by default |
| **Known limitations** | One per line. **Pre-filled** from the errors Lumtera found on published content. Edit them into plain language for visitors. |
| **List the requirements not yet met, by success criterion** | Adds a list from open errors on published content and failed manual checks, such as *"WCAG 1.4.3 Contrast (Minimum): automated checks found failures on 1 published page."* |
| **List content tagged with an exception** | Lists the posts and files you tagged with an [ADA Title II exception](#exception-tags) |
| **Tested with (optional)** | Browsers and assistive technology you've checked the site with, one per line. For example, "NVDA with Firefox". |
| **Disproportionate burden (optional)** | Only if you have assessed that fixing specific content would be a disproportionate burden: name the content, explain why, and say what accessible alternative you offer. With Lumtera Pro, summaries from your [burden records](/pro/burden) can be added. |
| **How to complain**, **Enforcement body web address (optional)** | Where visitors can complain if your reply doesn't help, such as the authority that enforces accessibility rules in your country |
| **Statement first prepared** / **Last reviewed** | Left empty, "first prepared" keeps its earlier date (or today). "Last reviewed" keeps the date shown unless you change it, or tick **I have reviewed this statement** to set it to today. |

## Fully conformant {#fully-conformant}

Lumtera never writes "fully conformant" for you. **Fully conformant** needs both:

- a full audit of the site against the standard, which you confirm by ticking **A full audit of the site against the standard found no failures**, and
- no failures Lumtera knows of on published content.

Otherwise the draft says "partially conformant", and the screen explains why, for example *"Lumtera knows of 5 requirements not met on published content, so the statement will say "partially conformant" until they are fixed."* Fix the listed failures, or confirm the audit, then update the statement.

## With Lumtera Pro

The Statement screen also shows:

- **Disproportionate burden records**: your structured assessments, and how many summaries go into the statement. See [Burden records](/pro/burden).
- **Manual test sessions**: signing off a [test session](/pro/test-sessions) lists manual testing with assistive technology among the statement's evaluation methods.

## Updating your statement

Fill in the form again and click **Update draft statement**. Lumtera never overwrites work you've done:

- If you haven't edited the draft, it's updated in place.
- **If you've edited the draft**, your edits are kept, and a new draft is created from the form.
- **If the statement is already published**, the live page is left unchanged, and a new draft is created for you to review and publish. The live page stays linked until you publish the new draft.
- **If the statement page is in the trash**, a new draft is created. You can also restore the old page from the trash.

Statements should be reviewed at least once a year. If yours was last reviewed more than a year ago, the Statement screen reminds you.

The statement page is your content, so it's kept if you delete Lumtera.

## Link to your statement {#link-to-your-statement}

Visitors should be able to find the statement from every page, usually in the footer. Links appear only once the statement is published.

- **Block:** add the **Accessibility statement link** block, for example to your footer template part in the Site Editor. It can also link to your feedback form.
- **Shortcode:** `[lumtera_statement_link]`, or `[lumtera_statement_link link="feedback"]` for the feedback form.
- **Footer link (classic themes):** tick **Link the statement in the site footer** and click **Save footer link**. It adds a small "Accessibility statement" link at the end of every page. It's off by default. Block themes place the block in their footer instead.

## ADA Title II exception tags {#exception-tags}

Under the ADA Title II web rule, some content may not need to meet WCAG 2.1 AA when certain conditions apply. You can record which exception you believe applies to a post, or to a file in the Media Library, with your reasoning:

- **Archived web content**
- **Preexisting electronic document**
- **Content posted by a third party**
- **Individualized, secured document**

For a post, use the **Accessibility exception** panel in the block editor's post settings. For a file, use the field in the Media Library's attachment details. Choose the exception, read the conditions listed for it, and write **Why the exception applies**.

A tag is a record of your reasoning, not a verdict:

- **Tagged items stay in every total and report**, with an **"Exception claimed"** badge. Nothing is hidden or left out of your score.
- The Content report can show only tagged items, with **Show → Exception claimed**.
- The statement can list tagged content.
- The exceptions have limits: an accessible version must still be provided to anyone who asks.

This is not legal advice. Check with your adviser.

## For developers

The statement fires `lumtera_statement_saved` when a draft is created or updated, and has `lumtera_statement_aside` for the side column. `lumtera_statement_burden_items`, `lumtera_statement_method_items` and `lumtera_statement_has_feedback_link` add burden summaries, evaluation methods and the feedback link. Exception tags are stored in the post meta `_lumtera_exception` and `_lumtera_exception_type`, and fire `lumtera_exception_tagged`. See [Hooks & filters](/developers/hooks).
