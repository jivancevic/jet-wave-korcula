# Memory — Jet Wave Korčula

- **What:** Static bilingual (EN/HR) marketing landing page for a jet ski & speedboat rental business in Korčula. Single brand, single page. Tier A.
- **Stack:** Vanilla HTML/CSS/JS, no build, no npm. Custom i18n in `js/i18n.js` (query-param + localStorage). AOS + Font Awesome via CDN.
- **Key files:** `index.html` (all sections), `css/styles.css` (tokens in `:root` ~L64), `js/i18n.js` (EN+HR strings), `js/script.js` (behaviour).
- **Design tokens:** `:root` in `css/styles.css` — `--deep-red #780000`, `--sea-blue #015fff`, `--white`, `--black`. Fonts: Saira (body) + Garosia (headings, local .otf).
- **Deploy:** Cloudflare Pages, repo `jivancevic/jet-wave-korcula`, auto-deploy on push to `main`. Domain + DNS + CDN all on Cloudflare. `main` = production.
- **Hard rules:** every string in BOTH EN+HR via `data-i18n`; colours only via `:root` tokens; keep `sitemap.xml`/`hreflang` in sync with locales.
- **Identity:** commit as `Josip Ivančević <josip.ivancevic00@gmail.com>` (canonical). The old `josip.ivancevic@fer.hr` in history is the same GitHub account, pre-rename — left as-is, fixed going forward.
- **User prefs:** Plan-First mode. Static-tier opted out of tests/CI on purpose (see `docs/adr/0002`).
