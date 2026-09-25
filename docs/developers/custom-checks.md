---
title: Custom checks
description: Add your own accessibility check to Lumtera with a PHP class. It then appears in the editor, reports, settings, WP-CLI and the Abilities API. You can also add block editor quick fixes.
---

# Custom checks

You can add your own checks to Lumtera. For example, you could enforce a house style, or check the markup of a custom block. A registered check appears everywhere a built-in one does:

- the editor sidebar, Elementor panel and review mode
- scans on save, the Overview and the Content report
- <span class="screen-path">Accessibility → Settings → Checks</span>, where it can be made stricter, softer or switched off
- `wp lumtera check`, `scan` and `rules`
- the `lumtera/list-rules` ability, and Pro page checks

## 1. Write the check

A check is a class that extends `Lumtera\AbstractRule` and implements `id()`, `title()`, `category()`, `wcag()`, `how_to_fix()` and `run()`.

This example flags expandable `<details>` sections that have no `<summary>`, or an empty one:

```php
<?php // class-details-no-summary.php
namespace Acme\LumteraChecks;

use Lumtera\AbstractRule;
use Lumtera\Issue;
use Lumtera\Wcag;

defined( 'ABSPATH' ) || exit;

final class DetailsNoSummary extends AbstractRule {

	// Default severity. level() returns 'A' unless you override it.
	protected string $severity = Issue::SEVERITY_WARNING;

	public function id(): string {
		return 'acme-details-no-summary';
	}

	public function title(): string {
		return __( 'Disclosure widget has no summary', 'acme' );
	}

	public function category(): string {
		return Wcag::CATEGORY_STRUCTURE;
	}

	public function wcag(): string {
		return '4.1.2';
	}

	public function how_to_fix(): string {
		return __( 'Add a <summary> with a short label as the first child of <details>, e.g. <summary>Shipping details</summary>.', 'acme' );
	}

	public function run( \DOMXPath $xpath ): array {
		$issues = [];

		foreach ( $this->elements( $xpath, '//details' ) as $details ) {
			if ( $this->is_hidden( $details ) ) {
				continue;
			}

			$summary = $this->elements( $xpath, './summary', $details )[0] ?? null;

			if ( null === $summary ) {
				$issues[] = $this->issue( __( 'This expandable section has no <summary>, so its toggle is announced only as "Details".', 'acme' ), $details );
			} elseif ( '' === $this->accessible_name( $summary ) ) {
				// A single finding can carry its own severity.
				$issues[] = $this->issue( __( 'This expandable section\'s summary is empty.', 'acme' ), $summary, Issue::SEVERITY_ERROR );
			}
		}

		return $issues;
	}
}
```

## 2. Register it

From a plugin (or mu-plugin):

```php
<?php
/**
 * Plugin Name: Acme Lumtera Checks
 * Requires Plugins: lumtera
 */
namespace Acme\LumteraChecks;

defined( 'ABSPATH' ) || exit;

add_filter( 'lumtera_rule_classes', static function ( array $classes ): array {
	require_once __DIR__ . '/class-details-no-summary.php';
	$classes[] = DetailsNoSummary::class;
	return $classes;
} );
```

The filter only runs when Lumtera starts, so loading the class inside the callback means it's never loaded without Lumtera. (`extends \Lumtera\AbstractRule` would fail otherwise.)

If your check needs constructor arguments, register an instance instead:

```php
add_action( 'lumtera_register_rules', static function ( \Lumtera\RuleRegistry $rules ): void {
	require_once __DIR__ . '/class-details-no-summary.php';
	$rules->register( new DetailsNoSummary() );
} );
```

::: warning Timing
Both hooks fire once, on `plugins_loaded` at priority 10. A theme's `functions.php` loads too late for them. From a theme, register the check directly, after Lumtera has loaded:

```php
add_action( 'after_setup_theme', function () {
	if ( class_exists( \Lumtera\Plugin::class ) ) {
		require_once __DIR__ . '/inc/class-details-no-summary.php';
		\Lumtera\Plugin::instance()->rules->register( new DetailsNoSummary() );
	}
} );
```
:::

## Replace or remove a built-in check

The registry is keyed by ID, so registering a check with a built-in check's ID replaces it. To remove a built-in check completely:

```php
add_filter( 'lumtera_rule_classes', fn( $classes ) => array_values(
	array_diff( $classes, [ \Lumtera\Rules\TextAllCaps::class ] )
) );
```

Site owners can also switch any check off under **Settings → Checks**, without code.

## The contract

| Method | Returns |
| --- | --- |
| `id()` | A stable, unique ID. It's stored with findings, dismissals and settings, so never change it. Use lowercase letters, numbers and hyphens, 64 characters at most. Prefix it with your own name. |
| `title()` | Short title shown in the issue list |
| `category()` | One of the `Wcag::CATEGORY_*` constants (below) |
| `wcag()` | The WCAG success criterion, for example `'1.1.1'` |
| `level()` | `'A'` (default in `AbstractRule`), `'AA'` or `'AAA'` |
| `severity()` | The default severity. In `AbstractRule`, set `protected string $severity`. |
| `how_to_fix()` | Plain-language fix, in WordPress terms |
| `run( \DOMXPath $xpath )` | An array of `Issue` objects |

**Severities:** `Issue::SEVERITY_ERROR` (Error), `Issue::SEVERITY_WARNING` (Needs review), `Issue::SEVERITY_NOTICE` (Tip). Use **Needs review** when a person has to decide. Lumtera is built not to cry wolf.

**Categories:** `CATEGORY_IMAGES`, `CATEGORY_LINKS`, `CATEGORY_HEADINGS`, `CATEGORY_FORMS`, `CATEGORY_TABLES`, `CATEGORY_MEDIA`, `CATEGORY_STRUCTURE`, `CATEGORY_COLOR`, `CATEGORY_ARIA`, `CATEGORY_LANGUAGE`.

## What your check sees

`run()` gets a `DOMXPath` over the rendered HTML: blocks rendered as on the front end, shortcodes expanded. For post content, that's the content wrapped in `<body>`. For whole pages (Pro page checks, `wp lumtera check` on a full document), it's the whole document. Write queries as `//tag`, not `/html/body/tag`.

It doesn't see your theme's CSS. Only inline styles and classes are available.

If `run()` throws, the error is logged (with `WP_DEBUG` on) and the rest of the scan carries on.

## Helpers in AbstractRule

| Helper | What it does |
| --- | --- |
| `issue( $message, $node, $severity = null )` | Builds an issue for this check. **Always pass the node**: it gives the snippet, maps the issue to its block, and makes the fingerprint for dismissals. |
| `elements( $xpath, $query, $context = null )` | Runs an XPath query and returns only elements |
| `attr( $el, $name )` | Trimmed attribute value, or `''` |
| `inside_link( $el )` | Whether the element is inside an `<a href>` |
| `is_hidden( $el )` | Whether the element or a parent is hidden with `hidden`, `aria-hidden="true"` or an inline `display:none` / `visibility:hidden` |
| `is_focusable( $el )` | Whether it can be reached with <kbd>Tab</kbd> |
| `accessible_name( $el )` | The accessible name, following the W3C order: `aria-labelledby`, `aria-label`, native labelling, text, then `title` |
| `subtree_text( $node )` | What a screen reader reads for a subtree (text, alt, aria-label, SVG title) |
| `label_text( $control )` | Text of the form control's `<label>` elements |
| `text_of_ids( $el, $attribute )` | Text of the elements named in an ID list such as `aria-labelledby` |
| `clean( $text )` | Decodes entities and collapses whitespace |
| `excerpt( $text, $max = 60 )` | Shortens text with "…" |
| `xpath_literal( $value )` | Safely quotes a value for use in XPath |

## Add a quick fix in the block editor

Quick fixes are JavaScript. Add one for your check with the `lumtera.quickFixers` filter, from a script that depends on `lumtera-editor` and is loaded on `enqueue_block_editor_assets`:

```js
wp.hooks.addFilter( 'lumtera.quickFixers', 'acme/details', ( fixers ) => ( {
	...fixers,
	'acme-details-no-summary': ( block, issue ) => {
		if ( block.name !== 'core/details' ) {
			return null; // No fix for this block.
		}
		return {
			label: 'Add a summary',
			done: 'Summary added.',
			apply: () => {
				wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( block.clientId, { summary: 'Details' } );
			},
		};
	},
} ) );
```

`label` is the button text. `done` is announced and shown in a notice with **Undo**. Return `null` when no fix applies.

To add your own button to every issue card, use the `lumtera.issueActions` filter. See [Hooks & filters](/developers/hooks#javascript-hooks).
