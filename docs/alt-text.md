---
title: Alt text manager
description: See every image in your Media Library on one screen, describe each one once, and add the text to the posts that show it without a description.
---

# Alt text manager

Missing alt text is one of the most common accessibility errors. The alt text manager puts every image in your Media Library on one screen. Describe an image once, and Lumtera offers to add the description to the posts that show it without one.

Go to <span class="screen-path">Accessibility → Alt text</span>.

![The alt text manager](/screenshots/screenshot-5.webp)

## Why posts need updating too

When you insert an image in the block editor, WordPress **copies** its alt text into the post. Adding alt text in the Media Library later doesn't update posts that already use the image. The alt text manager closes that gap.

Elementor reads alt text from the Media Library, so Elementor pages update on their own.

## Tabs

- **Missing alt text**: images with no description
- **Needs review**: images whose alt text looks wrong, such as a file name, "image of…", a generic word like "photo", or text that's very long
- **All images**

The screen opens on the first tab that has something in it. Search by title, file name or alt text. Images are listed newest first, 25 per page.

On a very large library, only the newest images with alt text are counted under **Needs review**, and the screen says so. Older images are still checked when you view them under **All images**.

Each row shows the image, its file name, and how many checked posts use it.

## Describe an image and update its posts

<ol class="step-list">
  <li>Type a description in the <strong>Alt text</strong> field and click <strong>Save</strong>. This updates the image in the Media Library.</li>
  <li>If checked posts show the image without alt text, the row says <em>"Shown without alt text in N posts"</em> and lists them.</li>
  <li>Click <strong>Add it to those N posts</strong> (or <strong>Add it to that post</strong>).</li>
</ol>

Lumtera then adds the description to those posts:

- **It never replaces alt text someone already wrote.** It only fills in images with no description.
- **It leaves decorative images alone**, whether they're marked with WordPress's **Mark as decorative**, Lumtera's **Decorative image** switch, or `role="none"` or `role="presentation"` on the image.
- **Each change is saved as a normal revision**, so you can roll it back from the post's Revisions screen.
- **Posts you can't edit are skipped**, and the screen tells you how many.

Lumtera can update images in Image, Media & Text, Cover, Custom HTML and classic content. If an image is inside another kind of block, the row says so. Add the alt text there in the editor.

If your account can't save certain markup, such as embeds, posts containing it are skipped rather than risk changing them. Ask an administrator to add the alt text there.

::: tip Check your content first
The list of posts that use each image comes from Lumtera's checks. Posts that haven't been checked yet won't appear. The screen reminds you if any content hasn't been checked, with a link to the Overview.
:::

## Cover and Media & Text blocks

Cover and Media & Text blocks have no "decorative" switch. WordPress asks you to leave their alt text empty when the image is only decoration. Lumtera can't tell a deliberate empty alt from a forgotten one, so it still lists those copies here, and as items to review in the content report.

If the image really is decorative, don't add text to that post. [Dismiss](/dismissing) its review item with a reason instead.

## Who can use it

Anyone who can upload files (Authors and up) can open the alt text manager.

- Editors and administrators see every image.
- Authors see only the images they uploaded, and can only update posts they can edit.

Authors see *"Showing the images you uploaded. Ask an editor to describe other images."* Developers can change who can open the screen with the `lumtera_images_capability` filter. See [Roles & permissions](/permissions).

## Writing good alt text

- Describe what the image **means on this page**, not just what it shows.
- Keep it short. A sentence is usually enough.
- Don't start with "image of" or "photo of". Screen readers already announce it as an image.
- If the image contains text that matters, include that text.
- If the image is a link, describe where the link goes.
- If the image adds nothing, mark it decorative instead.

## Alt text embedded in photos

Photographers and image libraries can embed alt text in a photo's metadata (the IPTC **Alt Text (Accessibility)** field). WordPress 7.0 and later copy it into the image's alt text when you upload the image.

On older WordPress versions, Lumtera does the same. It only fills in images that have no alt text yet, and never overwrites alt text someone wrote. If the photo has the field in several languages, it prefers your site's language.

Embedded alt text was written for the photo, not for your page. Check it still fits where you use the image.

## AI suggestions

If an administrator has switched on **Suggest alt text** under [AI suggestions](/ai), each image you can edit has a **Suggest alt text** button. It offers up to three suggestions based on the image and where it's used.

<ol class="step-list">
  <li>Click <strong>Suggest alt text</strong>.</li>
  <li>Click <strong>Use this</strong> next to a suggestion. It's copied into the <strong>Alt text</strong> field.</li>
  <li>Edit it if needed, then click <strong>Save</strong>. Nothing is saved until you do.</li>
</ol>

If the AI thinks the image may be purely decorative, it says so. If the image adds nothing to the content, leave its alt text empty.

Suggestions you save here are recorded against the image, with who accepted them and when. See [A record of accepted alt text](/ai#a-record-of-accepted-alt-text).
