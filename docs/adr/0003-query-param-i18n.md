# Query-param i18n, not per-locale routes

Bilingual EN/HR content is implemented with a custom lightweight translator (`js/i18n.js`): every translatable element carries a `data-i18n="section.key"` attribute, strings live in one nested `translations` object (EN + HR), and the active locale is chosen by browser detection, persisted in `localStorage` (`jetwave-lang`), and surfaced as a `?lang=en|hr` query parameter. EN is the default and the fallback for any missing key.

Chosen over per-locale routes (`/en`, `/hr`) or a framework i18n because the site is a single static page with no build step (see [[adr-0002-static-tier-no-backend]]) — query-param + localStorage needs no server, no router, and no duplicated HTML.

**Consequence / hard rule:** every user-facing string must exist in **both** EN and HR in `js/i18n.js` and be wired through a `data-i18n` attribute (or the page-title/meta logic in `updateContent()`). A string added to only one language, or hard-coded in the HTML, is a bug. The `hreflang` tags and `sitemap.xml` advertise the `?lang=` URLs to search engines, so keep them in sync if locales change.
