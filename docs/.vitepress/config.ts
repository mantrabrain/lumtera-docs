import { defineConfig } from 'vitepress'

// The docs are served from https://lumtera.mantrabrain.com/docs/. Override with
// DOCS_BASE=/ to serve them from a domain root instead.
const BASE = process.env.DOCS_BASE ?? '/docs/'
const HOST = 'https://lumtera.mantrabrain.com'
const SITE = `${HOST}${BASE.replace(/\/$/, '')}`

const TITLE = 'Lumtera Documentation'
const DESCRIPTION =
  'Official documentation for Lumtera, the WCAG 2.2 accessibility checker for WordPress (Free + Pro).'

const UTM = 'utm_source=docs&utm_medium=referral&utm_campaign=lumtera-docs'
const PRICING = `https://mantrabrain.com/plugins/lumtera/pricing/?${UTM}`

export default defineConfig({
  title: TITLE,
  description: DESCRIPTION,
  lang: 'en-US',
  base: BASE,

  head: [
    [
      'meta',
      {
        name: 'keywords',
        content:
          'Lumtera, WordPress accessibility, WCAG 2.2, ADA, EAA, Section 508, accessibility checker, Lumtera Pro, MantraBrain'
      }
    ],
    ['meta', { name: 'author', content: 'MantraBrain' }],
    ['meta', { name: 'theme-color', content: '#1f4e79' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${BASE}favicon.svg` }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${BASE}favicon-32x32.png` }],
    ['link', { rel: 'apple-touch-icon', href: `${BASE}apple-touch-icon.png` }],
    ['link', { rel: 'manifest', href: `${BASE}site.webmanifest` }],

    // Open Graph
    ['meta', { property: 'og:site_name', content: TITLE }],
    ['meta', { property: 'og:image', content: `${SITE}/og-image.jpg` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${SITE}/og-image.jpg` }],

    // Schema.org
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: TITLE,
        description: DESCRIPTION,
        url: `${SITE}/`,
        publisher: { '@type': 'Organization', name: 'MantraBrain', url: 'https://mantrabrain.com' }
      })
    ]
  ],

  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Lumtera Docs',

    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Guide',
        items: [
          {
            text: 'Get started',
            items: [
              { text: 'Installation', link: '/installation' },
              { text: 'Quick start', link: '/quick-start' },
              { text: 'Your WordPress admin', link: '/admin-map' },
              { text: 'Scores & severities', link: '/scoring' }
            ]
          },
          {
            text: 'Check & fix',
            items: [
              { text: 'Block editor sidebar', link: '/block-editor' },
              { text: 'Review mode', link: '/review-mode' },
              { text: 'Site report', link: '/site-report' },
              { text: 'All checks', link: '/checks' }
            ]
          },
          {
            text: 'Tools',
            items: [
              { text: 'Alt text manager', link: '/alt-text' },
              { text: 'Site fixes', link: '/site-fixes' },
              { text: 'Accessibility statement', link: '/statement' },
              { text: 'Settings', link: '/settings' }
            ]
          }
        ]
      },
      {
        text: 'Pro',
        items: [
          { text: 'What Pro adds', link: '/pro/' },
          { text: 'License & plans', link: '/pro/license' },
          { text: 'Page checks', link: '/pro/page-checks' },
          { text: 'Client reports', link: '/pro/reports' },
          { text: 'Agency portfolio', link: '/pro/portfolio' }
        ]
      },
      {
        text: 'Developers',
        items: [
          { text: 'WP-CLI', link: '/developers/wp-cli' },
          { text: 'REST API', link: '/developers/rest-api' },
          { text: 'Hooks & filters', link: '/developers/hooks' },
          { text: 'Custom checks', link: '/developers/custom-checks' },
          { text: 'Abilities API', link: '/developers/abilities' }
        ]
      },
      {
        text: 'Help',
        items: [
          { text: 'FAQs', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Support', link: '/support' }
        ]
      },
      { text: 'Get Pro', link: PRICING, target: '_blank', rel: 'noopener' }
    ],

    sidebar: [
      {
        text: 'Get started',
        collapsed: false,
        items: [
          { text: 'Home', link: '/' },
          { text: 'Installation', link: '/installation' },
          { text: 'Quick start', link: '/quick-start' },
          { text: 'Your WordPress admin', link: '/admin-map' },
          { text: 'Scores & severities', link: '/scoring' }
        ]
      },
      {
        text: 'Check & fix',
        collapsed: false,
        items: [
          { text: 'Block editor sidebar', link: '/block-editor' },
          { text: 'Classic editor & page builders', link: '/page-builders' },
          { text: 'Review mode (live page)', link: '/review-mode' },
          { text: 'Site report', link: '/site-report' },
          { text: 'Dismissing issues', link: '/dismissing' },
          { text: 'All checks', link: '/checks' }
        ]
      },
      {
        text: 'Tools',
        collapsed: false,
        items: [
          { text: 'Alt text manager', link: '/alt-text' },
          { text: 'AI suggestions', link: '/ai' },
          { text: 'Site fixes', link: '/site-fixes' },
          { text: 'Accessibility statement', link: '/statement' },
          { text: 'Settings', link: '/settings' },
          { text: 'Roles & permissions', link: '/permissions' }
        ]
      },
      {
        text: 'Lumtera Pro',
        collapsed: false,
        items: [
          { text: 'What Pro adds', link: '/pro/' },
          { text: 'License & plans', link: '/pro/license' },
          { text: 'Page checks', link: '/pro/page-checks' },
          { text: 'PDF checks', link: '/pro/documents' },
          { text: 'Monitoring & alerts', link: '/pro/monitoring' },
          { text: 'Fix tracking', link: '/pro/fix-tracking' },
          { text: 'Client reports', link: '/pro/reports' },
          { text: 'Agency portfolio', link: '/pro/portfolio' },
          { text: 'Multisite network', link: '/pro/multisite' },
          { text: 'Activity log & webhooks', link: '/pro/activity-webhooks' }
        ]
      },
      {
        text: 'Developers',
        collapsed: false,
        items: [
          { text: 'WP-CLI', link: '/developers/wp-cli' },
          { text: 'REST API', link: '/developers/rest-api' },
          { text: 'Hooks & filters', link: '/developers/hooks' },
          { text: 'Custom checks', link: '/developers/custom-checks' },
          { text: 'Abilities API (AI assistants)', link: '/developers/abilities' },
          { text: 'Data & uninstall', link: '/developers/data' }
        ]
      },
      {
        text: 'Help',
        collapsed: false,
        items: [
          { text: 'What automated testing can\'t do', link: '/manual-testing' },
          { text: 'FAQs', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Changelog', link: '/changelog' },
          { text: 'Support', link: '/support' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/mantrabrain/lumtera-docs' }],

    footer: {
      message: `© MantraBrain · GPLv2+ · <a href="${PRICING}" target="_blank" rel="noopener"><strong>Lumtera Pro</strong> pricing</a>`,
      copyright: `Copyright © ${new Date().getFullYear()} MantraBrain`
    },

    editLink: {
      pattern: 'https://github.com/mantrabrain/lumtera-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: { dateStyle: 'medium' }
    },

    search: { provider: 'local' },

    outline: { level: [2, 3], label: 'On this page' },

    docFooter: { prev: 'Previous', next: 'Next' },

    // Read by MarkdownPageActions ("Copy page" / "View as Markdown").
    markdownSource: {
      pattern: 'https://raw.githubusercontent.com/mantrabrain/lumtera-docs/main/docs/:path'
    }
  },

  markdown: {
    theme: { light: 'github-light', dark: 'github-dark' }
  },

  vite: {
    build: { chunkSizeWarningLimit: 1000 }
  },

  // Fail the build on broken internal links so a bad cross-reference never ships.
  ignoreDeadLinks: false,

  sitemap: { hostname: `${SITE}/` },

  transformHead: ({ pageData }) => {
    const description = pageData.frontmatter?.description || DESCRIPTION
    const title = pageData.title ? `${pageData.title} | ${TITLE}` : TITLE
    const slug = pageData.relativePath.replace(/\.md$/, '').replace(/(^|\/)index$/, '$1')
    const url = `${SITE}/${slug}`

    return [
      ['meta', { property: 'og:type', content: 'article' }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['link', { rel: 'canonical', href: url }]
    ]
  }
})
