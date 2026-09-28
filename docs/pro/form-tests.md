---
title: Form tests
description: Lumtera Pro submits a form empty in a hidden frame, with a safety guard so nothing is sent, and checks how its errors are shown and announced. Works with Contact Form 7, WPForms, Gravity Forms, the WooCommerce checkout and plain HTML forms.
---

# Form tests

<p><span class="pro-pill">Pro</span> Every plan</p>

A form that looks fine can still fail people when something goes wrong. If the errors aren't announced, a screen reader user doesn't know the form wasn't sent. If a field is only outlined in red, some people can't tell which one to fix. You only see these problems after submitting the form, so the content checks can't find them.

**Form tests** submit a form with every field empty and watch what happens. They run from the **Forms** card on <span class="screen-path">Lumtera → Checks → Page checks</span>, for anyone with the **See reports and check the site** permission (editors and administrators by default).

## Test a form

<ol class="step-list">
  <li>Check the pages that have forms, such as your contact, sign-up and checkout pages, with <strong>Check selected pages</strong>. Each check lists the forms it finds in the <strong>Forms</strong> card.</li>
  <li>In the <strong>Forms</strong> card, find the form. Each one shows its name, what it's made with (for example <strong>Contact Form 7</strong>), the page it's on and how many required fields it has.</li>
  <li>Click <strong>Test form</strong>. The form is loaded again in a hidden frame and submitted empty. This takes a few seconds.</li>
  <li>Read the result under the form, which starts with the date it was tested and says what was found, for example <em>"3 items to review"</em>. Click <strong>Show N issues</strong> to read each finding and how to fix it.</li>
</ol>

See [Check pages in your browser](/pro/page-checks#check-pages-in-your-browser) for step 1.

A form with no problems says *"no problems found with how errors are shown. Listen to it with a screen reader to be sure."* A test that couldn't finish says why, and what to do.

**Remove from list** takes a form off the card. Checking its page again lists it again.

Tests run only when you click **Test form**, one form at a time. Scheduled checks never submit forms.

## Which forms are tested

| Form | Tested |
| --- | --- |
| Contact Form 7 | Yes |
| WPForms (Lite and Pro) | Yes |
| Gravity Forms | Yes |
| WooCommerce checkout (the classic `[woocommerce_checkout]` checkout) | Yes |
| Plain HTML forms | Yes, when they send to the same page, to `admin-post.php` or to `wp-comments-post.php` |
| WooCommerce block checkout | Not yet. Test it by hand, or use the classic checkout shortcode to test it here. |

A form is only tested when it has **required fields**, because an empty submission shows errors only when something is required. A form that sends to **another site** is never tested: Lumtera can't make sure nothing is processed there. Both are listed with the reason, so you know to test them by hand.

## Nothing is sent

A form test never sends an email, saves an entry or places an order:

- **Fields are never filled in.** Spam traps (honeypots) and captchas are left alone.
- **A safety guard runs for you only.** Before the test, Lumtera gives your login session a short-lived dry-run token in a cookie that page scripts can't read. While it's valid, a guard on the server stops any email, form entry or order from that form, even if the empty submission gets past the form's own checks. Visitors and real submissions are never affected.
- **The guard ends by itself.** The token is removed as soon as the test ends, and expires after 2 minutes in any case.
- **Plain HTML forms never leave the frame.** They have no hook that is sure to stop them, so the browser cancels any submission that gets past the page's scripts, and the frame's network requests are blocked while the test runs.

What each guard does:

| Form | Guard while a test runs |
| --- | --- |
| Contact Form 7 | Skips every email, stops the submission before it's sent, and tells Flamingo to store nothing |
| WPForms | Adds an error before the entry is saved, so it always stops there, and switches its emails off |
| Gravity Forms | Marks the submission as not valid before the entry is saved, and switches notifications off |
| WooCommerce checkout | Adds a checkout error, so no order, customer or payment is created. The block checkout's Store API refuses changes during a test. |
| Plain HTML | Refuses any form post that no form plugin owns, before WordPress hands it on |

If a stored copy of the page was served, for example by a caching plugin, the guard can't be confirmed, and the form isn't submitted. The result then asks you to exclude the page from caching for logged-in users.

## What's checked

After submitting the form, Lumtera watches for three seconds (longer while the form is still waiting for the server). These 8 checks can report:

| Check | ID | WCAG | Severity |
| --- | --- | --- | --- |
| Form errors are not announced to screen readers | [`form-errors-not-announced`](/checks#form-errors-not-announced) | 4.1.3, 3.3.1 | Needs review |
| No error appears when required fields are empty | [`form-no-error-shown`](/checks#form-no-error-shown) | 3.3.1 | Needs review |
| Fields with errors are not marked as invalid | [`form-error-no-invalid`](/checks#form-error-no-invalid) | 3.3.1, 4.1.2 | Needs review |
| Error messages are not linked to their fields | [`form-error-not-linked`](/checks#form-error-not-linked) | 3.3.1 | Needs review |
| Focus does not move to the first error | [`form-error-focus`](/checks#form-error-focus) | 3.3.1 | Needs review |
| A field has no lasting label | [`form-error-label-lost`](/checks#form-error-label-lost) | 3.3.2 | Needs review |
| Errors are shown by colour alone | [`form-error-color-only`](/checks#form-error-color-only) | 1.4.1, 3.3.1 | Needs review |
| Error messages could say what to fix | [`form-error-not-specific`](/checks#form-error-not-specific) | 3.3.3 | Tip |

In plain words, it checks that:

- an error appears at all, in text;
- the errors are announced, through a live region or by moving focus to them;
- each field in error is marked invalid (`aria-invalid`), so screen readers say "invalid entry";
- each message is linked to its field (`aria-describedby`), so it's read when people reach the field;
- focus moves to the first error, or to an error summary;
- each field keeps a label, rather than relying on placeholder text or a label the error replaces;
- errors aren't shown by colour alone;
- messages say what to fix, not just "invalid".

These are "needs review" findings for a person to confirm. When the browser's own checks stop the empty form (for example with the `required` attribute), the result says so: screen readers announce those messages, but they disappear quickly, so test the form by hand too.

You can change the severity of each check, or turn it off, under [Settings → Checks](/settings#checks).

## Where the results go

- Each form keeps its last result on the **Forms** card.
- Findings count with their page in the [conformance report (ACR)](/pro/acr). A form that was skipped, failed, or never tested isn't evidence.
- Each finished test is recorded in the [evidence log](/pro/evidence): the page, the form plugin and name, the outcome and what was found by check. Never a field's value or an error message's text.

With form tests, Lumtera's automated checks cover **40 of the 55** WCAG 2.2 A and AA success criteria, fully or in part: they add 3.3.1, 3.3.3 and 4.1.3. Covering a criterion means a check looks at it, not that the site meets it. See [Accuracy](/accuracy).

## Limits

- Forms that appear only after an action, such as after adding to the cart, may not be on the page when the test loads it. The result says so.
- A form the page fills in for you (for example from your account details) can't be tested empty. Test it logged out by hand.
- Only what can be seen in three seconds counts. Always try an important form yourself with the keyboard and a screen reader.

## For developers

`lumtera_pro_form_tested( $form )` fires after a test's outcome is stored, with the form and its last result. See [Hooks & filters](/developers/hooks).
