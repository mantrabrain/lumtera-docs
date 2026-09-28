---
title: Consistency across pages
description: Lumtera Pro compares the pages it has checked for menu order, the names of header and footer links, where help is, and a search box or site map. Freelancer, Agency and Unlimited plans.
---

# Consistency across pages

<p><span class="pro-pill">Pro</span> Freelancer, Agency and Unlimited plans</p>

Some WCAG criteria are about the whole site, not one page. People learn where the menu items are, what a link is called and where to find help. When one page does it differently, they get lost. No single-page check can see that.

**Consistency across pages** compares the pages Lumtera Pro has checked, and lists the differences for a person to review.

## The four checks

| Check | ID | WCAG | Looks for |
| --- | --- | --- | --- |
| Menus list their links in a different order on different pages | [`consistency-navigation`](/checks#consistency-navigation) | 3.2.3 Consistent Navigation (AA) | A menu repeated across pages lists the links it shares with most pages in a different order on some of them. |
| Links to the same page have different names on different pages | [`consistency-identification`](/checks#consistency-identification) | 3.2.4 Consistent Identification (AA) | A header or footer link to the same address is named differently on different pages. |
| Help is in a different place on different pages | [`consistency-help`](/checks#consistency-help) | 3.2.6 Consistent Help (A) | A way to get help (a contact, help, support or FAQ link, a phone number, an email address or a chat widget) is in another region, or in another order, than on most pages. |
| No search box or site map on the pages checked | [`consistency-multiple-ways`](/checks#consistency-multiple-ways) | 2.4.5 Multiple Ways (AA) | None of the pages checked has a search box or a link to a site map. |

Each finding names the pages that differ from most, and what most pages do. For example: *"The “Main” menu in the header lists the links it shares with other pages in a different order on 2 of the 30 pages that have it."*

All four are **Needs review**:

- A difference isn't always a failure. A section of the site can have its own menu, on purpose.
- Finding no differences doesn't show the site is consistent. It only compares the pages checked.

Confirm with the **Consistent across pages** checks in a [test session](/pro/test-sessions).

## Where to find it

Go to <span class="screen-path">Lumtera → Checks → Test sessions</span>. The **Cross-page consistency** card shows the last comparison: how many pages were compared and when, then each difference with its WCAG criterion.

It compares automatically after each [scheduled page check](/pro/page-checks#scheduled-checks) run. To compare now, click **Compare pages again**. The status line says, for example, *"Compared 30 pages: 1 difference to review."*

At least two checked pages are needed. The more key pages and templates your scheduled checks visit, the more the comparison can see.

## Which pages are compared

Every scheduled check, and every desktop browser check on the Page checks screen, keeps a short record of the page: its menus and their links, the names of header and footer links, its help links and chat widgets, and whether it has a search box or site map link. Lumtera keeps these records for the 150 most recently checked pages.

The comparison uses the pages that still have a logged-out desktop result on the Page checks screen. Pages you remove from the results drop out of the next comparison. [Signed-in results](/pro/signed-in-checks) and phone-width results aren't compared.

On Business, the records are still kept, so they're ready if you upgrade.

## Where the findings go

The findings belong to the site as a whole, not to one page. They are stored as site-level findings and appear:

- in the **Cross-page consistency** card on Test sessions;
- in the [conformance report (ACR)](/pro/acr), against their criteria. While a consistency finding is open, a manual pass for that criterion isn't enough to mark it "Supports".

You can change the severity of each check, or turn it off, under [Settings → Checks](/settings#checks).

With consistency checks on, together with [form tests](/pro/form-tests), Lumtera's automated checks cover **44 of the 55** WCAG 2.2 A and AA success criteria, fully or in part: consistency adds 2.4.5, 3.2.3, 3.2.4 and 3.2.6. Covering a criterion means a check looks at it, not that the site meets it.

## For developers

- `lumtera_help_lexicon` (a free plugin filter) sets the words that mark a link as a way to get help, by kind: `contact`, `help`, `support` and `faq`. Words are lowercase and matched as whole words in the link's name, or as a segment of its address. Add words in your site's language here.
- `lumtera_pro_consistency_checked( $result )` fires after each comparison, with the time, the number of pages and the findings.
- `POST /lumtera-pro/v1/consistency/run` runs a comparison, for users who can use Test sessions. See [REST API](/developers/rest-api).

See [Hooks & filters](/developers/hooks).
