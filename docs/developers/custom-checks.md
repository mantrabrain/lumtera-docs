---
title: Custom checks
description: Add your own accessibility check to Lumtera with a PHP class. It then appears in the editor, reports, settings, WP-CLI and the Abilities API. You can also add block editor quick fixes.
---

# Custom checks

You can add your own checks to Lumtera. For example, you could enforce a house style, or check the markup of a custom block.

## Where your check appears {#where-your-check-appears}

A registered check appears everywhere a built-in one does:

- the editor sidebar, Elementor panel and review mode
- scans on save, the Overview and the Content report
- <span class="screen-path">Lumtera → Settings → Checks</span>, where it can be made stricter, softer or switched off
- `wp lumtera check`, `scan`, `issues` and `rules`, including the [SARIF and JUnit](/developers/wp-cli#sarif-and-junit) reports for CI
- the `lumtera/list-rules`, `lumtera/list-issues` and `lumtera/explain-rule` [abilities](/developers/abilities)
- Pro page checks, and the list of checks for Pro [ignore rules](/pro/ignore)

One thing differs: only Lumtera's own checks link to a page in these docs. For an add-on check, the "Learn more" link is left out, and `docs_url` is empty in `lumtera/explain-rule`. Put what people need in `how_to_fix()` and `rationale()`.

## 1. Write the check

A check is a class that extends `\Lumtera\AbstractRule` and implements `id()`, `title()`, `category()`, `wcag()`, `how_to_fix()` and `run()`. It can also override `criteria()`, `rationale()` and `level()`, and set `$severity` and `$confidence`.

This example flags expandable `<details>` sections that have no `<summary>`, or an empty one. Put it in its own file in your plugin, and keep the `namespace` and `use` lines: Lumtera's classes live in the `Lumtera` namespace, so a bare `AbstractRule` or `Issue` in another namespace stops PHP with a "class not found" error.

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

	// How sure the check is. 'certain' is the default.
	protected string $confidence = Issue::CONFIDENCE_CERTAIN;

	public function id(): string {
		return 'acme-details-no-summary';
	}

	public function title(): string {
		return __( 'Disclosure widget has no summary', 'acme' );
	}

	public function category(): string {
		return Wcag::CATEGORY_STRUCTURE;
	}

	// The main criterion.
	public function wcag(): string {
		return '4.1.2';
	}

	// Every criterion a finding counts against, main one first.
	public function criteria(): array {
		return [ '4.1.2', '2.4.6' ];
	}

	public function how_to_fix(): string {
		return __( 'Add a <summary> with a short label as the first child of <details>, e.g. <summary>Shipping details</summary>.', 'acme' );
	}

	public function rationale(): string {
		return __( 'WCAG 4.1.2 asks that every control has a name. Without a summary, the toggle is announced only as "Details", which says nothing about what it opens.', 'acme' );
	}

	public function run( \DOMXPath $xpath ): array {
		$issues = [];

		foreach ( $this->elements( $xpath, '//details' ) as $details ) {
			if ( $this->is_hidden( $details ) ) {
				continue;
			}

			$summary = $this->elements( $xpath, './summary', $details )[0] ?? null;

			if ( null === $summary ) {
				// Less sure for this finding: a heading inside may explain it.
				$issues[] = $this->issue(
					__( 'This expandable section has no <summary>, so its toggle is announced only as "Details".', 'acme' ),
					$details,
					null,
					Issue::CONFIDENCE_LIKELY
				);
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

The filter only runs when Lumtera starts, so loading the class inside the callback means it's never loaded without Lumtera. (`extends \Lumtera\AbstractRule` would fail otherwise.) Classes that don't implement `Lumtera\RuleInterface` are skipped.

If your check needs constructor arguments, register an instance instead:

```php
add_action( 'lumtera_register_rules', static function ( \Lumtera\RuleRegistry $rules ): void {
	require_once __DIR__ . '/class-details-no-summary.php';
	$rules->register( new DetailsNoSummary() ); // This file is in the Acme\LumteraChecks namespace too.
} );
```

::: warning Timing
Both hooks fire once, on `plugins_loaded` at priority 10. A theme's `functions.php` loads too late for them. From a theme, register the check directly, after Lumtera has loaded:

```php
add_action( 'after_setup_theme', function () {
	if ( class_exists( \Lumtera\Plugin::class ) && \Lumtera\Plugin::instance()->is_booted() ) {
		require_once __DIR__ . '/inc/class-details-no-summary.php';
		// functions.php has no namespace, so give the class its full name.
		\Lumtera\Plugin::instance()->rules->register( new \Acme\LumteraChecks\DetailsNoSummary() );
	}
} );
```

`is_booted()` is false when Lumtera stopped itself, for example on a server without the PHP DOM extension.
:::

## 3. Try it

With the plugin active, check some markup from the command line. Nothing is stored:

```sh
echo '<details><p>Hidden text</p></details><details><summary> </summary><p>More</p></details>' | wp lumtera check - --format=json
```

The report lists two findings from your check: an **Error** for the empty summary, and a **Needs review** for the `<details>` with no summary (its confidence was lowered to `likely`, which caps it). `wp lumtera rules` lists `acme-details-no-summary` with the other checks.

## Replace or remove a built-in check

The registry is keyed by ID, so registering a check with a built-in check's ID replaces it. To remove a built-in check completely:

```php
add_filter( 'lumtera_rule_classes', fn( $classes ) => array_values(
	array_diff( $classes, [ \Lumtera\Rules\TextAllCaps::class ] )
) );
```

Site owners can also switch any check off under <span class="screen-path">Lumtera → Settings → Checks</span>, without code.

A check you register with a built-in check's ID keeps the ID, but not the link to its page in these docs: see [Where your check appears](#where-your-check-appears).

## The contract

| Method | Returns |
| --- | --- |
| `id()` | A stable, unique ID. It's stored with findings, dismissals and settings, so never change it. Use lowercase letters, numbers and hyphens, 64 characters at most. Prefix it with your own name. |
| `title()` | Short title shown in the issue list |
| `category()` | One of the `Wcag::CATEGORY_*` constants (below) |
| `wcag()` | The main WCAG success criterion, for example `'1.1.1'` |
| `level()` | The main criterion's level: `'A'` (default in `AbstractRule`), `'AA'` or `'AAA'` |
| `severity()` | The default severity. In `AbstractRule`, set `protected string $severity`. |
| `how_to_fix()` | Plain-language fix, in WordPress terms |
| `run( \DOMXPath $xpath )` | An array of `Issue` objects |
| `criteria()` | Optional. Every criterion a finding counts against, main one first. Default in `AbstractRule`: `[ wcag() ]`. |
| `rationale()` | Optional. Why a finding matters, in one or two plain sentences: what the criterion asks, why this pattern was flagged, and when it's fine. Never a claim about conformance. Default: empty. |
| `confidence()` | Optional. How sure the check is. In `AbstractRule`, set `protected string $confidence`. Default: `certain`. |

The first eight methods are `\Lumtera\RuleInterface`. A class that implements the interface directly, without `AbstractRule`, works too. It counts as `certain` and has no rationale.

**Severities:** `Issue::SEVERITY_ERROR` (Error), `Issue::SEVERITY_WARNING` (Needs review), `Issue::SEVERITY_NOTICE` (Tip). Use **Needs review** when a person has to decide. Lumtera is built not to cry wolf.

### Confidence {#confidence}

Every check says [how sure it is](/checks#confidence) that a finding is a real barrier. Confidence caps the severity:

| Confidence | Constant | Most severe finding it allows |
| --- | --- | --- |
| Certain | `Issue::CONFIDENCE_CERTAIN` | Error |
| Likely | `Issue::CONFIDENCE_LIKELY` | Needs review |
| Possible | `Issue::CONFIDENCE_POSSIBLE` | Tip, hidden by default |

- A check with `likely` confidence and an `error` severity reports "Needs review". Set the confidence honestly, and the severity follows.
- `issue()` takes a fourth argument to make **one finding** less sure than the check's default, as the example does for a `<details>` with no summary. It can lower confidence, never raise it: passing `certain` to a `likely` check still gives `likely`.
- Findings of `possible` confidence are hidden until someone ticks **Show possible issues** in the Content report or the editor sidebar, and they never count in the score.

### Several criteria {#multiple-criteria}

A finding can fail more than one criterion. A form field with no label, for example, fails 4.1.2, 1.3.1 and 3.3.2. Return every criterion from `criteria()`, main one (`wcag()`) first. `AbstractRule` implements `\Lumtera\MultiCriteriaRule`, so overriding `criteria()` is all you need.

Lumtera reads them with `\Lumtera\Wcag::criteria_of( $rule )`, which falls back to `wcag()` for a class that doesn't implement `MultiCriteriaRule`. Coverage, the WCAG filters in reports, `lumtera/explain-rule` and Pro's conformance report use every criterion. SARIF tags and `wp lumtera rules` show the main one.

**Categories:** `CATEGORY_IMAGES`, `CATEGORY_LINKS`, `CATEGORY_HEADINGS`, `CATEGORY_FORMS`, `CATEGORY_TABLES`, `CATEGORY_MEDIA`, `CATEGORY_STRUCTURE`, `CATEGORY_COLOR`, `CATEGORY_ARIA`, `CATEGORY_LANGUAGE`.

## What your check sees

`run()` gets a `DOMXPath` over the rendered HTML: blocks rendered as on the front end, shortcodes expanded. For post content, that's the content wrapped in `<body>`. For whole pages (Pro page checks, `wp lumtera check` on a full document), it's the whole document. Write queries as `//tag`, not `/html/body/tag`.

It doesn't see your theme's CSS. Only inline styles and classes are available.

If `run()` throws, the rest of the scan carries on without your check. With `WP_DEBUG` on, the error is written to the PHP error log.

Findings the site owner dismissed, or that match a Pro ignore rule, are removed after `run()` returns. Your check doesn't need to handle them.

### Checks that need a browser

`run()` sees markup only. For contrast, layout or keyboard checks that must measure the rendered page, write a browser measure instead: enqueue a script on the [`lumtera_audit_scripts`](/developers/hooks#whole-page) action that calls `window.lumteraAudit.register()`, and add a `MeasuredRule` class for its wording with the [`lumtera_measured_rule_classes`](/developers/hooks#checks-and-scanning) filter. Its findings then appear in review mode and Pro page checks. See [Hooks: JavaScript](/developers/hooks#javascript) for an example.

## Helpers in AbstractRule

| Helper | What it does |
| --- | --- |
| `issue( $message, $node, $severity = null, $confidence = null )` | Builds an issue for this check. `$severity` overrides the check's default for this finding. `$confidence` can lower (never raise) the check's confidence for it. **Always pass the node**: it gives the snippet and line, maps the issue to its block, and makes the fingerprint that dismissals, Pro tasks and Pro ignore rules use. |
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

To add your own button to every issue card, use the `lumtera.issueActions` filter. See [Hooks & filters](/developers/hooks#javascript).
