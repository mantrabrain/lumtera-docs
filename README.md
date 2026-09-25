# Lumtera Documentation

Source for the documentation of [Lumtera](https://mantrabrain.com/plugins/lumtera/), the WCAG 2.2 accessibility checker for WordPress, and its paid add-on Lumtera Pro. The site is built with [VitePress](https://vitepress.dev) and served at <https://lumtera.mantrabrain.com/docs/>.

## Local development

Requires Node.js 18 or later.

```sh
npm install
npm run dev          # http://localhost:5175/docs/
npm run build        # static site in docs/.vitepress/dist
npm run preview      # serve the build locally
npm run check-links  # check internal links and #anchors
```

The build fails on any broken internal link (`ignoreDeadLinks: false`), so a bad cross-reference can't ship.

## Deployment

The site is hosted on Netlify (site `lumtera`, custom domain `lumtera.mantrabrain.com`). `netlify.toml` holds the build settings. Every push to `main` builds and deploys once the repository is linked to the Netlify site.

## Base path

The site is built for the `/docs/` path. To serve it from the root of a domain instead, build with:

```sh
DOCS_BASE=/ npm run build
```

Inside Markdown, write links from the docs root (`[Settings](/settings)`). VitePress adds the base path. Raw HTML links (for example the cards on the home page) are **not** rewritten, so bind them with `withBase`: add `<script setup>import { withBase } from 'vitepress'</script>` to the page and write `<a :href="withBase('/settings')">`.

## Layout

| Path | Contents |
| --- | --- |
| `docs/*.md` | Guides for the free plugin |
| `docs/pro/` | Lumtera Pro features |
| `docs/developers/` | WP-CLI, REST API, hooks, custom checks, Abilities API, data |
| `docs/checks.md` | Every check, generated from the plugin's rule registry (see below) |
| `docs/public/` | Logo, favicons and screenshots |
| `docs/.vitepress/config.ts` | Navigation, sidebar and SEO |
| `docs/.vitepress/theme/` | Brand styles and the "Copy page / View as Markdown" bar |

## Keeping the checks page in sync

`docs/checks.md` lists every check with its ID, WCAG criterion, level, default severity and fix text, copied from the plugin. When a release adds or changes a check, export the rules from a site running the new version:

```sh
wp eval 'echo wp_json_encode( array_map( fn( $r ) => [ "id" => $r->id(), "title" => $r->title(), "category" => $r->category(), "wcag" => $r->wcag(), "wcag_name" => \Lumtera\Wcag::name( $r->wcag() ), "level" => $r->level(), "severity" => $r->severity(), "fix" => $r->how_to_fix() ], array_values( \Lumtera\Plugin::instance()->rules->all() ) ) );' > rules.json
```

Then update the tables and the "Check details" section to match, and add a changelog entry.

## Writing style

- Write for site owners and content editors first. Keep developer detail under `developers/`.
- Use the exact labels from the plugin UI, and show menu paths as `<span class="screen-path">Accessibility → Settings</span>`.
- Mark Pro-only features with a `pro-callout` block.
- Never say Lumtera makes a site "compliant". Say it finds issues automation can detect, and link to [What automated testing can't do](docs/manual-testing.md).

## License

GPL-2.0-or-later © [MantraBrain](https://mantrabrain.com)
