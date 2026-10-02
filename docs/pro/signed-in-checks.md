---
title: Signed-in checks
description: Check My account, cart, checkout and members' pages as a test user with the role you choose, safely, with a one-time pass for each page. Lumtera Pro, every plan (1 role on Personal and Growth, any number on Agency and Unlimited).
---

# Signed-in checks

<p><span class="pro-pill">Pro</span> Every plan: 1 role on Personal and Growth, any number on Agency and Unlimited</p>

Account, cart and checkout pages change once someone signs in, and they are the pages customers rely on most. Ordinary [page checks](/pro/page-checks) see them as you (an administrator) or as a logged-out visitor. **Signed-in checks** open them as a customer or member would see them, as a dedicated test user with the role you choose.

They're set up in the **Signed-in checks** card on <span class="screen-path">Lumtera → Checks → Page checks</span>. Only administrators can set them up. Anyone who can use page checks sees the results with the others.

## How many roles your plan includes {#roles-per-plan}

| Personal | Growth | Agency | Unlimited |
| --- | --- | --- | --- |
| 1 role | 1 role | Any number, up to the card's 5 | Any number, up to the card's 5 |

On Personal and Growth, the card says *"Your Personal plan includes signed-in checks as 1 role."* For a shop, that one role is usually **Customer**. Once the role is added, adding another says *"To check as another role, remove one first or upgrade the plan."*, with a sentence naming the plan that allows more and **See the … plan** and **Upgrade in your account** links. See [When you reach a limit](/pro/license#when-you-reach-a-limit).

The limit is checked every time a test user is signed in, so it also holds for scheduled checks. If a plan is downgraded, the first roles you added keep working, up to the new plan's number.

## Add a role

<ol class="step-list">
  <li>In the <strong>Signed-in checks</strong> card, choose a role under <strong>Add a role</strong>. For a shop, add <strong>Customer</strong>.</li>
  <li>Click <strong>Add role</strong>. Lumtera creates the role's test user, for example <code>lumtera-audit-customer</code>.</li>
  <li>Choose the pages to check as that role (see below), then click <strong>Save</strong>.</li>
  <li>Click <strong>Check these pages now</strong>. The pages are checked in your browser, as the test user.</li>
</ol>

Only roles that can't change the site are offered. Roles that can edit content or manage the site, such as Editor or Shop manager, aren't listed. You can add up to 5 roles.

For each role you can set:

- **Shop pages** (with WooCommerce): **My account**, **Cart** and **Checkout**. All three are ticked when you add a role.
- **Put a product in the test user's cart** (off by default). Checkout only shows its form when the cart has something in it. With this on, one product goes into the *test user's own* cart before the cart and checkout are checked: the newest published, in-stock simple product. No order is placed, and your customers' carts aren't touched. Turning it off empties the test user's cart.
- **Other pages to check as** *role* **(optional)**: one address per line, such as `/members/`, up to 100. Addresses that can't be opened signed in, such as wp-admin screens or another site, are listed under **Not added:** with the reason, and the save message says how many were left out, for example *"Saved. 2 addresses for Subscriber were not added: see the list above."* Screen readers hear it too.
- **Include in scheduled checks** (on by default). [Scheduled checks](/pro/page-checks#scheduled-checks) then open these pages as the test user too, alongside the logged-out ones. They run on behalf of the administrator who last saved these settings.

**Remove test user** deletes the role's test user. Results already checked are kept until you remove them from the results.

## Results

Each signed-in result is its own row, next to the page's logged-out result, marked **Signed in as** *role*, for example **Signed in as Customer**. Use **Show** above the results to see one role's results, or **Not signed in as a test user**.

Scheduled signed-in results send [alerts](/pro/page-checks#alerts-from-scheduled-checks) for new errors, like any scheduled check.

A result is only saved when Lumtera can confirm that the page really was opened as the test user. If a page cache, proxy or security plugin answered first, nothing is saved for that page, and the reason is shown.

## How the test user is kept safe

The card's **How the test user is kept safe** section sums it up. In detail:

- **A dedicated sandbox user.** Each role gets its own test user. It has no email address and a 64-character random password nobody is shown. It can never sign in: the login form, XML-RPC, Application Passwords and password resets all refuse it, and a sign-in cookie made for it by some other tool is ignored. It isn't listed on the Users screen. Deleting Lumtera Pro removes it.
- **Only harmless roles.** A role that can edit content, upload files, moderate comments, manage users, themes or plugins, or manage the site can't be used. This is checked again on every page.
- **A one-time pass per page.** Lumtera signs the test user in for one page at a time, with a one-time pass. The pass is signed with an HMAC of your site's secret key, so it can't be forged or changed. It is bound to that exact address on this site, to the test user and to the administrator who made it. It expires after **120 seconds** (2 minutes) and works **once**. On an https site a pass is never sent over plain http: if a scheduled check is redirected from https to http, the signed-in check stops and gives the redirect as the reason.
- **Pages only, never forms.** A request with a pass must be a `GET` (or `HEAD`). A `POST`, `PUT`, `DELETE` or any other method is refused, so if a page tries to send a form as the test user, the request is refused. Passes never work for wp-admin, the login page, the REST API, AJAX, XML-RPC or cron.
- **No sign-in cookie, no caching.** No cookie of any kind is sent back, and the response is marked never to be cached. Your own browser's cookies are ignored for that request, so your own cart and session aren't touched.
- **No addresses that do something.** A signed-in check never opens an address that acts when opened, such as signing out, adding to or removing from a cart, cancelling an order, downloading a file, unsubscribing or confirming something.

## If a check fails

The message completes the sentence *"Page (signed in as role): …"*. Common reasons:

| Message | What to do |
| --- | --- |
| *the one-time pass for this page had already been used or had expired* | The page may be very slow. Check it again. |
| *this address cannot be checked while signed in* | Only ordinary pages of this site can be checked. |
| *the page answered without signing in …* | A page cache, proxy or security plugin answered first. Exclude the page from caching, then check again. |
| *the site refused the request* | A firewall or your host may be blocking requests the site makes to itself. Ask your host to allow them. |
| *the administrator who set up signed-in checks can no longer manage this site* | An administrator presses **Save** under **Signed-in checks** to take them over. |
| *the test … is missing, or its role now lets it edit content or manage the site* | Add the role again. |

If moving through a page with the keyboard, or pressing a slider's pause button, reloads the page, the check stops for that page: a signed-in check can open a page only once. Check it again, or test it by hand.

When scheduled signed-in checks can't run, the card says *"Scheduled signed-in checks are paused:"* with the reason, and the scheduled run's notes list the pages skipped.

## For developers

- `lumtera_pro_role_scan_shop_pages` filters the WooCommerce pages offered (`myaccount`, `cart`, `checkout`, each with a label and address). Only addresses on this site are kept.
- `lumtera_pro_role_scan_sample_product` filters the product put in the test user's cart. Return `0` for none.
- `lumtera_pro_pass_blocked_query_keys` filters the query arguments that make an address "do something", so a signed-in check never opens it. The defaults include `add-to-cart`, `remove_item`, `cancel_order`, `action`, `_wpnonce`, `wc-ajax` and `rest_route`.

See [Hooks & filters](/developers/hooks).
