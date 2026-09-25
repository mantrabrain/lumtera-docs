---
title: Roles & permissions
description: Who can see Lumtera's screens, dismiss errors, use the alt text manager and create statements, and the Lumtera Reporter role for agency hubs.
---

# Roles & permissions

Lumtera uses WordPress's standard roles. Nothing needs setting up.

## Who can do what

| Task | Administrator | Editor | Author | Contributor |
| --- | :---: | :---: | :---: | :---: |
| See the editor sidebar on posts they can edit | ✓ | ✓ | ✓ | ✓ |
| Dismiss items to review and tips | ✓ | ✓ | ✓ | ✓ |
| Dismiss **errors** | ✓ | ✓ | | |
| Open review mode on posts they can edit | ✓ | ✓ | ✓ | ✓ |
| Use the alt text manager | ✓ | ✓ | Own uploads | |
| Overview, Content report, Dashboard widget, **Check all content** | ✓ | ✓ | | |
| Create the accessibility statement | ✓ | ✓ | | |
| Change settings | ✓ | | | |

### Lumtera Pro

| Task | Administrator | Editor | Author | Contributor |
| --- | :---: | :---: | :---: | :---: |
| Page checks, Documents, Reports | ✓ | ✓ | | |
| Fixes: see and assign every task | ✓ | ✓ | | |
| **My fixes**: tasks assigned to them or on their posts | | | ✓ | ✓ |
| Track a fix | ✓ | ✓ | Assign to self only | Assign to self only |
| Activity log, Portfolio, license, Pro settings | ✓ | | | |

Anyone who can edit a post can track a fix on it, and authors can only assign fixes to themselves.

## Lumtera Reporter

**Lumtera Reporter** is a role with one job: letting an agency's [portfolio](/pro/portfolio) read this site's accessibility summary. It can log in to read its own profile, and read the summary through the REST API. That's all. It can't see or edit content, Lumtera's screens or anything else in wp-admin.

To give an agency access:

<ol class="step-list">
  <li>Go to <span class="screen-path">Users → Add New</span> and create a user with the role <strong>Lumtera Reporter</strong>.</li>
  <li>Edit the user and create an <strong>Application Password</strong>.</li>
  <li>Send the username and Application Password to the agency.</li>
</ol>

The summary includes the site name and address, the score and totals, the five most common issues, and the titles of up to five published items with the most errors. It includes no page content.

To revoke access, delete the Application Password or the user.

## Changing permissions (developers)

These filters change who can do what:

| Filter | Default | Controls |
| --- | --- | --- |
| `lumtera_capability` | `edit_others_posts` | Overview, Content, Dashboard widget, bulk checks, and Pro's Page checks, Documents and Reports |
| `lumtera_images_capability` | `upload_files` | The alt text manager |
| `lumtera_dismiss_errors_capability` | `edit_others_posts` | Dismissing and restoring errors |

For example, to let authors dismiss errors:

```php
add_filter( 'lumtera_dismiss_errors_capability', fn() => 'publish_posts' );
```

See [Hooks & filters](/developers/hooks#permissions).
