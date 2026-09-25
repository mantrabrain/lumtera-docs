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

Each row shows the image, its file name, and how many checked posts use it.

## Describe an image and update its posts

<ol class="step-list">
  <li>Type a description in the <strong>Alt text</strong> field and click <strong>Save</strong>. This updates the image in the Media Library.</li>
  <li>If checked posts show the image without alt text, the row says <em>"Shown without alt text in N posts"</em> and lists them.</li>
  <li>Click <strong>Add it to those N posts</strong> (or <strong>Add it to that post</strong>).</li>
</ol>

Lumtera then adds the description to those posts:

- **It never replaces alt text someone already wrote.** It only fills in images with no description.
- **It leaves decorative images alone**, whether they're marked with WordPress's **Mark as decorative**, Lumtera's **Decorative image** switch, or `role="none"`.
- **Each change is saved as a normal revision**, so you can roll it back from the post's Revisions screen.
- **Posts you can't edit are skipped**, and the screen tells you how many.

Lumtera can update images in Image, Media & Text, Cover, Custom HTML and classic content. If an image is inside another kind of block, the row says so. Add the alt text there in the editor.

If your account can't save certain markup, such as embeds, posts containing it are skipped rather than risk changing them. Ask an administrator to add the alt text there.

::: tip Check your content first
The list of posts that use each image comes from Lumtera's checks. Posts that haven't been checked yet won't appear. The screen reminds you if any content hasn't been checked, with a link to the Overview.
:::

## Cover and Media & Text blocks

In Cover and Media & Text blocks, WordPress uses an empty alt to mean "decorative". Lumtera still lists those copies, because it can't tell whether the empty alt was deliberate. If the image really is decorative, dismiss the review item in the editor.

## Who can use it

Anyone who can upload files (Authors and up) can open the alt text manager.

- Editors and administrators see every image.
- Authors see only the images they uploaded, and can only update posts they can edit.

## Writing good alt text

- Describe what the image **means on this page**, not just what it shows.
- Keep it short. A sentence is usually enough.
- Don't start with "image of" or "photo of". Screen readers already announce it as an image.
- If the image contains text that matters, include that text.
- If the image is a link, describe where the link goes.
- If the image adds nothing, mark it decorative instead.

## AI suggestions

If an administrator has switched on [AI suggestions](/ai), each row has a **Suggest alt text** button. It offers up to three suggestions based on the image and where it's used. Click **Use this** to put one in the field, edit it if needed, then **Save**. Nothing is saved until you do.

Suggestions you accept here are recorded against the image, with who accepted them and when.
