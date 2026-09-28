---
title: Disproportionate burden records
description: Keep your disproportionate burden assessments under the European Accessibility Act (Annex VI), review them on time, and add a public summary to your accessibility statement.
---

# Disproportionate burden records

<p><span class="pro-pill">Pro</span> Every plan</p>

Under the European Accessibility Act (Directive (EU) 2019/882), a provider can rely on a **disproportionate burden** only after assessing it against the criteria in **Annex VI**. The assessment must be kept and reviewed at least every five years. Microenterprises providing services are exempt: ask your adviser whether that applies to you.

Lumtera Pro gives you a place to keep those assessments, reminds you when a review is due, and adds a public summary to your [accessibility statement](/statement).

::: warning Not legal advice
Lumtera stores the assessment **you** make. It doesn't decide whether a burden is disproportionate, and this is not legal advice.
:::

Go to <span class="screen-path">Lumtera → Feedback & statement → Burden records</span>. Anyone who can publish pages (editors and administrators by default) can keep burden records, the same people who write the statement. The **Read the Directive (EU) 2019/882, Annex VI** link opens the official text.

## Record an assessment {#record}

Click **Record your assessment** and fill in the form.

**Name.** What the record is about, for example "Video archive 2015–2019". It's required.

**Scope**

- **Web addresses affected**: one per line.
- **Posts, pages and documents affected (IDs)**: IDs separated by commas. A document is its Media Library ID.

**Requirements affected.** Tick the WCAG success criteria you can't meet for this content. Each is listed with its EN 301 549 clause.

**Assessment (Annex VI)**

- **Cost compared with your organization**: the extra cost of meeting the requirement (one-off and ongoing), compared with your organization's size, resources and turnover.
- **Benefit to people with disabilities**: your estimate of the benefit to people with disabilities if the requirement were met.
- **How often and how long it is used**: how often the content or service is used, and for how long.

**Accessible alternative provided.** What you offer instead, and how people get it, for example "Transcripts on request within 5 business days".

**Assessed by**, **Assessment date** and **Next review**. Leave **Next review** empty for five years after the assessment date, or choose a sooner date.

**Public summary.** What visitors read in your accessibility statement: the content affected, why, and the alternative. Leave it empty to keep the record out of the statement.

**Add the public summary to the accessibility statement.** Tick this to publish the summary.

Click **Save record**: *"Record saved."*

## The records list

The list shows each **Record**, the **Requirements** affected, when it was **Assessed** and by whom, the **Next review** date, and whether it's **In the statement**. A record whose review date has passed is marked **Review due**. Open it, review the assessment, update the date and save.

The Statement screen also shows a **Disproportionate burden records** card with how many records you have and how many summaries go into the statement.

## In your accessibility statement {#statement}

Each record with a public summary and **Add the public summary to the accessibility statement** ticked is added to the statement's disproportionate burden section. The line reads your summary, then *"Requirements affected: …"* with the criteria and their EN 301 549 clauses, then *"Alternative: …"*. The rest of the record, including your cost and benefit assessment, stays private.

## Evidence

Saving or reviewing a record is recorded in the [evidence log](/pro/evidence). The [evidence pack](/pro/evidence#evidence-pack) lists each assessment with the criteria, the assessment date and the next review, marked "due" when it's overdue.

## Delete a record {#delete}

Keep assessments you've relied on. Delete only records made by mistake. Open the record and click **Delete this record**. Lumtera asks first: *"Delete this burden record? This cannot be undone. The evidence log keeps the entries made when it was saved."* You'll see *"Record deleted."*

## For developers

The `lumtera_pro_burden_saved` action fires after a record is saved. It receives the record ID, the record now, and the record before (`null` for a new one). Lumtera Pro adds the public summaries to the statement through the free plugin's `lumtera_statement_burden_items` filter. See [Hooks & filters](/developers/hooks).
