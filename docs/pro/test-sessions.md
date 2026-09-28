---
title: Test sessions
description: Test each key page template by hand with the manual checklist and your assistive technology, attach screenshots, and sign off, so the results count in your conformance report and statement.
---

# Test sessions

<p><span class="pro-pill">Pro</span> Every plan</p>

Automated checks can't test everything. A **test session** records, for one page template, what a person found with each check of the manual checklist, which browser and assistive technology they used, and screenshots. Signed-off sessions count in your [conformance report (ACR)](/pro/acr) and your [statement](/statement).

Go to <span class="screen-path">Lumtera → Checks → Test sessions</span>. Anyone with the **See reports and check the site** permission can record sessions (editors and administrators by default).

::: info Your own evaluation record
A test session is your own record of how you tested the site. It doesn't certify the site.
:::

## One session per template

Pages built the same way share a template, so testing one of each covers most of the site. The **Page templates** table lists your key templates, the same ones [scheduled page checks](/pro/page-checks) include, for example **Template: Home page**, **Template: Single Post**, **Template: Category archive**, **Template: Search results** and **Template: Page not found (404)**.

Each template has a **Status** (**Not started**, **In progress: 3 of 20 checks** or **Signed off** with the date and who signed it), its **Results** so far (passed, failed and not applicable), and a button: **Start testing**, **Continue** or **View**.

## Record a session

<ol class="step-list">
  <li>Click <strong>Start testing</strong> next to a template.</li>
  <li>Click <strong>Open the page to test</strong>. It opens in a new tab.</li>
  <li>Under <strong>What you are testing with</strong>, enter the <strong>Browser</strong> (for example "Firefox 131"), the <strong>Assistive technology</strong> (for example "NVDA", "VoiceOver" or "keyboard only") and <strong>Its version</strong>. Click <strong>Save</strong>. These are recorded with each result, and you can change them for a single check under that check.</li>
  <li>Work through the checks. Each one names its WCAG criterion and level, about how long it takes, the <strong>Tools to use</strong>, the <strong>Steps</strong> and <strong>What to record</strong>.</li>
  <li>For each check, choose a <strong>Result</strong>: <strong>Pass</strong>, <strong>Fail</strong> or <strong>Not applicable</strong>. Optionally add a <strong>Note (optional): what you tested and found</strong> and screenshots, then click <strong>Save result</strong>.</li>
</ol>

Each saved check shows *"Recorded as … by … on …"*. **Clear result** removes a result you saved by mistake. You don't have to finish in one go: come back with **Continue**.

The checks are the same guided checklist the block editor uses for single pages: one item for each WCAG criterion that needs a person, such as keyboard access, zoom and reflow, screen reader output, forms, media, motion and touch. See [Guided checklists](/manual-checks).

### Screenshots {#screenshots}

Click **Add screenshot** under a check to attach PNG, JPEG, GIF or WebP images.

::: warning Screenshots are public addresses
Screenshots are stored in your media library and **can be opened by anyone with the link**. Don't capture personal data, such as customer names, email addresses or order details.
:::

While a session is signed off, its screenshots can't be deleted from the media library.

## Sign off {#sign-off}

When you've recorded what you tested:

<ol class="step-list">
  <li>Scroll to <strong>Sign off</strong>.</li>
  <li>Tick <strong>I confirm these results are my own evaluation of this template.</strong></li>
  <li>Click <strong>Sign off session</strong>.</li>
</ol>

Signing off **locks the results** and records who signed and when. You need at least one result first. Checks without a result are listed as not evaluated in your conformance report.

### Reopen a session {#reopen}

Only an administrator can reopen a signed-off session. Open the session, enter the **Reason for reopening (kept in the session's history)** and click **Reopen session**. The session's **History** lists every sign-off and reopening, with who did it and why. Reopening a session also takes its results out of the conformance report until it's signed off again.

## Where the results count {#where-results-count}

- **[Accessibility Conformance Report](/pro/acr#evidence).** Each signed-off session counts as manual evidence for its template's page (public pages only), by criterion. A passed check can help make a row "Supports", and a failed check makes it "Partially Supports" or "Does Not Support". The remarks name the template, result, tester, assistive technology and date.
- **[Accessibility statement](/statement).** The statement's evaluation methods list manual testing of your key page templates with the assistive technology you used. The **Manual test sessions** card on the Statement screen shows what's added.
- **[Evidence log](/pro/evidence).** Each result, sign-off and reopening is recorded, and the [evidence pack](/pro/evidence#evidence-pack) lists your manual test records.

## Cross-page consistency {#consistency}

The **Cross-page consistency** card on the same screen compares the pages scheduled checks visit: menu order (WCAG 3.2.3), names of header and footer links (3.2.4), where help is (3.2.6), and search or a site map (2.4.5). It runs after each scheduled page check. Click **Compare pages again** to run it now. It needs the Freelancer plan or higher. See [Consistency checks](/pro/consistency).

## Privacy

Test sessions are part of WordPress's personal data tools, as **Lumtera Pro manual test sessions** (<span class="screen-path">Tools → Export Personal Data</span> and **Erase Personal Data**). An export includes the person's results, notes, sign-offs and reopening reasons. Erasing keeps every result and sign-off, because the evaluation took place, but removes who did it, their notes and their reopening reasons. Screenshots stay in the media library. Delete them there if they show personal data.
