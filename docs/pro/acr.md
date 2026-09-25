---
title: Accessibility Conformance Report (ACR)
description: Draft an Accessibility Conformance Report in the VPAT 2.5 WCAG edition layout, filled in from your automated and manual check results, then review every row before you share it.
---

# Accessibility Conformance Report <span class="pro-pill">Pro</span>

<div class="pro-callout">The conformance report is included in the <strong>Freelancer</strong>, <strong>Agency</strong> and <strong>Unlimited</strong> plans.</div>

An Accessibility Conformance Report (ACR) documents, criterion by criterion, how a website conforms to WCAG. Clients, procurement teams and public bodies often ask for one, usually in the **VPAT®** format.

Lumtera Pro drafts an ACR for your site in the **VPAT 2.5 WCAG edition** layout, covering the 55 WCAG 2.2 level A and AA success criteria. It fills in each row from your results. **You review and complete it.**

::: warning A draft, not a certification
Lumtera can't decide conformance for you. Automated checks find only part of what WCAG covers, so the report never marks a criterion as supported from automated results alone. Treat what Lumtera fills in as a starting point. A person who knows the site must review every row before the report is shared. The report itself says it isn't a certification or a legal guarantee.
:::

## Open the report

Go to <span class="screen-path">Accessibility → Reports</span>. Below the reports list, the **Accessibility Conformance Report (VPAT 2.5)** card has an **Open conformance report** button. On a plan without the report, the card says which plan it needs.

Anyone with the **See reports and check the site** permission can open and edit it (editors and administrators by default).

There's one conformance report per site. It always reflects your current results, and the report date is the day you view or export it.

## Before you start

The report is only as good as the evidence behind it:

- **Scan your content**, from <span class="screen-path">Accessibility → Overview</span>. Only published content counts.
- **Run [page checks](/pro/page-checks)** on your key pages, so theme-level criteria such as page title, language, skip links, zoom and contrast are covered.
- **Record [manual checks](/manual-checks)** in the block editor's **Manual accessibility checks** panel, on your key published pages. Only a passed manual check can make a criterion **Supports**.

## How each row is filled in

Each criterion gets one of the five VPAT conformance levels, from this evidence:

| Level | When Lumtera uses it |
| --- | --- |
| **Supports** | A manual check passed for this criterion, and no automated or manual check failed. |
| **Partially Supports** | Something failed (an automated error, or a failed manual check) on some pages, but not all. |
| **Does Not Support** | Something failed on every page that was checked. |
| **Not Applicable** | Manual checks found the criterion doesn't apply, and no automated finding needs review. |
| **Not Evaluated** | Anything else, including criteria where automated checks found nothing. Clean automated results alone can't prove conformance. |

Items that need review count as evidence to look at, not as failures. The **Remarks and explanations** column says what was found, for example *"Automated checks found 3 failures. Pages affected: 2 of 40 checked."* or *"Not confirmed by manual testing, so conformance is not claimed."*

::: tip "Not Evaluated" rows need work
The VPAT reserves "Not Evaluated" for level AAA. Before you call the report complete, evaluate those rows: test them, record manual checks, or set the level yourself with an explanation.
:::

## Review and edit

The screen has three parts.

**Product information**, shown at the top of the report:

| Field | Default |
| --- | --- |
| **Name of product** | Your site name |
| **Version** (optional) | Empty |
| **Product description** (optional) | Empty |
| **Contact information** | The contact email from your [branding](/pro/reports#branding) |
| **Evaluated by** | The agency name from your branding |
| **Other evaluation methods** (optional) | Empty. Lumtera's automated and manual checks are listed for you. Add anything else, such as an expert review with a screen reader. |
| **Notes** (optional) | Empty |

**Table 1: Success Criteria, Level A** and **Table 2: Success Criteria, Level AA**. For each criterion:

- The **Conformance level** list starts on **Automatic:** *level*, which follows your results. Choose a level to override it. Overridden rows are marked **Edited**.
- The **Remarks and explanations** box shows the automatic text. Edit it to write your own. Clear it to go back to the automatic text.

The bar at the bottom counts the rows at each level. Click **Save report** to keep your changes: *"Conformance report saved."*

## View, print and export

Save first: views and downloads use the saved report.

- **View and print** opens the report in a new tab. Its **Save as PDF** button opens your browser's print dialog. **Chrome and Edge produce a tagged PDF** that screen readers can navigate.
- **Download HTML** saves a single self-contained file, with your logo embedded if it's under 1 MB.
- **Download CSV** saves both tables, one row per criterion, with the columns Table, Criterion, Name, Level, Conformance Level, Remarks and Explanations.

The report includes:

- a cover with your logo or agency name, the product, the site, the report date, **Evaluated by** and **Contact**
- product information and the **Evaluation methods used**: automated content checks, live page checks and guided manual checks, with how many pages each covered, plus your own methods
- **Applicable standards and guidelines**: WCAG 2.2 level A and AA, not AAA. Revised Section 508 and EN 301 549 tables aren't included.
- the terms, a summary count, and Tables 1 and 2
- **Table 3: Success Criteria, Level AAA**, which says level AAA wasn't evaluated
- **About this report**, which says it isn't a certification, doesn't guarantee the site is free of barriers or complies with any law, and doesn't reflect changes made after the report date

The report uses your [branding](/pro/reports#branding) accent color, logo and footer. It ends with *"Prepared with Lumtera"* unless white-label is on.

VPAT® is a registered service mark of the Information Technology Industry Council (ITI). The report follows the structure of the VPAT 2.5 WCAG edition.
