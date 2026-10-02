---
title: Fixing issues
description: How Lumtera fixes issues you approve. See each change before it is saved, apply it, and undo it. Fix a shared header, footer, pattern or menu once, where it comes from. Draft with AI, contrast fixes and what Lumtera never changes.
---

# Fixing issues

Many issues can be fixed without hunting for the block. Lumtera shows the change before anything is saved. You can edit it, apply it or cancel. Every applied fix is saved as a revision, checked again, and can be undone.

There is no automatic fixing: nothing changes until a person clicks **Apply fix**.

## Where to fix

- **Content report:** click **Issues** on a row, then **Fix without opening** on an issue. See [Content report](/site-report#content-report).
- **Block editor sidebar:** **Review fix** on an issue card. Quick fixes such as **Change to H3** are also there, as ordinary edits with **Undo**. See [Block editor sidebar](/block-editor#reviewed-fixes).
- **Fix once, clear many** and **By issue:** **Fix at the source** on an issue that comes from a shared part. See [below](#fix-at-the-source).

## The fix dialog

<ol class="step-list">
  <li>The dialog shows <strong>What will change</strong>, with the markup <strong>Before</strong> and <strong>After</strong>, and <strong>Where</strong>: the page or the shared part. It says <em>"Only this block changes. The rest of the page stays exactly as it is."</em></li>
  <li>Where the fix needs words, such as alt text or link text, type them in the field. The preview updates as you type. For alt text, Lumtera suggests the image's alt text from the Media Library when there is one.</li>
  <li>Click <strong>Apply fix</strong>. Lumtera saves a new revision, checks the page again and tells you the result, for example <em>"Fixed. Lumtera checked the page again and this issue is gone."</em></li>
  <li>To go back, click <strong>Undo</strong>. WordPress also keeps a revision, so <strong>Compare revisions</strong> shows exactly what changed, and the earlier version can be restored from the page's revisions.</li>
</ol>

**Cancel** closes the dialog without changing anything. In the block editor, save your changes first: the fix is made to the saved page, and unsaved edits would be lost.

If revisions are turned off on your site, the dialog says so. Undo then works only while the block stays as the fix left it.

## What can be fixed this way

| Check | The fix |
| --- | --- |
| [Image has no alternative text](/checks#image-missing-alt), [Alt text looks like a file name](/checks#image-alt-filename), [Alt text repeats "image of"](/checks#image-alt-redundant), [Alt text is very long](/checks#image-alt-long), [Alt text is a placeholder](/checks#image-alt-placeholder) | Sets the alt text you type (or approve) on the image |
| [Link text is vague](/checks#link-ambiguous-text), [Link text is a web address](/checks#link-url-as-text), [Same link text goes to different pages](/checks#link-same-text-different-url) | Replaces the link text with text that says where the link goes. The address stays the same. |
| [Heading level is skipped](/checks#heading-skipped-level), [Content uses an H1 heading](/checks#heading-h1-in-content) | Changes the heading level |
| [Heading is empty](/checks#heading-empty) | Removes the empty heading |
| [Bold text may be a heading](/checks#heading-possible) | Turns the bold line into a real heading |
| [Link opens a new tab without warning](/checks#link-new-window) | Makes the link open in the same tab |
| [Embedded frame has no title](/checks#iframe-no-title) | Gives the frame a title that says what it shows |

Other checks, such as lists, tables, empty paragraphs and contrast, are fixed in the block editor, where you see the result straight away. See [Quick fixes](/block-editor#quick-fixes) and [Fix low contrast](/block-editor#fix-low-contrast).

## Draft with AI

When an administrator has switched on [AI suggestions](/ai) for alt text, link text or headings, the dialog has **Draft with AI**. The draft is marked **AI draft — review before applying**. Read it, edit it if needed, then apply it yourself. An AI draft is never applied on its own. It sends the same data as the editor's AI buttons for that feature, and uses the same request limit.

## Fix at the source {#fix-at-the-source}

Headers, footers, menus and patterns appear on many pages. When an issue comes from one of these [site parts](/site-parts), the dialog offers to fix it once, in the part, with **Fix at the source (clears N pages)**:

| Where the issue comes from | What changes |
| --- | --- |
| A **template part**, such as the header or footer | Only that block of the template part. Every page that shows it gets the change. |
| A **synced pattern** | Only that block of the pattern |
| A **Navigation** menu | Only that link in the Navigation menu |
| A **classic menu** item | Only that menu item, in its menu |
| A **widget** | Nothing: the dialog opens **Appearance → Widgets** for you to fix it there |

After the fix, Lumtera checks the pages that use the part again and shows the result, such as *"The issue is gone from all of them."* On a large site, it checks the rest in the background, and the next full check covers any it couldn't reach.

::: warning Fixing a theme's template part
When a template part still comes from your theme's files, fixing it creates a customised copy in your site, just as editing it in the Site Editor does. From then on, updates to that part in the theme don't reach your site until you remove the customisation in the Site Editor. The dialog explains this before you apply. **Undo** deletes the customised copy, so the theme's own part is used again.
:::

Template parts that come from a plugin, and patterns that are no longer synced, can't be fixed here. The dialog says why and where to fix them.

## What Lumtera never changes

Lumtera is careful about what it writes:

- **Content a page builder manages is never changed.** For a page built with Elementor or another builder, the dialog says which builder to fix it in, with a link. See [Page builders](/page-builders).
- **Only the block the fix is for changes.** Lumtera changes block settings, or the one element in the markup, and then confirms nothing else on the page changed. If anything else would change, it stops and changes nothing.
- **Classic-editor posts** get only small, one-attribute fixes, such as a link's target. Anything bigger is fixed in the editor.
- **Very large pages** are fixed in the editor.
- If another plugin changes the content while it is being saved, Lumtera puts the page back as it was.

## Who can fix

To fix an issue, a person needs to be able to edit that post. Fixing a site part at the source needs the rights to edit it: template parts, menus and widgets need the theme options capability (administrators), synced patterns need the right to edit them.

With [Lumtera Pro](/pro/fixes-queue), the **Fixes queue** proposes fixes for many pages at once for you to review and apply, and from the Agency plan an approval rule can require a second person to approve each one.

## Privacy

Lumtera keeps a history of each fix: who proposed it, who approved and applied it, and when. It is included in WordPress's personal data export as "Lumtera accessibility fixes", and names are removed when a person's data is erased. See [Data & uninstall](/developers/data).

## For developers

Fixes go through the REST API (`/lumtera/v1/changes/…`), and AI assistants can propose a fix through the Abilities API, which waits for a person to approve it. The `lumtera_managed_by_builder` filter tells Lumtera a post is managed by a builder, and `lumtera_change_allowed` lets an add-on, such as Lumtera Pro's approval rule, refuse a change. See [REST API](/developers/rest-api), [Abilities API](/developers/abilities) and [Hooks & filters](/developers/hooks).
