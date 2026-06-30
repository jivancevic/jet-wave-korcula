<!-- BEGIN:jetwave-agent-rules -->
# Working in this repo — read before editing

This is a **plain static site**: hand-written HTML/CSS/JS, no build step, no npm, no framework. Don't reach for React/Next/Tailwind patterns — there's nothing to compile. Edit the file, refresh the browser.

Gotchas that will bite you if you assume a typical modern stack:

1. **No build, no package manager.** There is no `package.json`, no `node_modules`, no `npm run dev`. Serve the folder with any static server (`python3 -m http.server`) and refresh.
2. **i18n is data-attribute driven, not route-based.** Strings live in `js/i18n.js` under `translations.{en,hr}`; elements opt in with `data-i18n="section.key"`. Adding visible text means: add the key to BOTH `en` and `hr`, then put `data-i18n` on the element. Hard-coded text in `index.html` won't translate and is a bug. (See `docs/adr/0003`.)
3. **Third-party libs are CDN `<script>`/`<link>` tags** (AOS, Font Awesome, Google Fonts) with pinned versions in `index.html`'s `<head>`. There's no import system — a "missing import" is a missing/blocked CDN tag.
4. **Design tokens are CSS custom properties** in the `:root` block of `css/styles.css`. Re-skin there, not by editing individual rules.
5. **`main` auto-deploys to production** via Cloudflare Pages (`docs/adr/0001`). Treat a push to `main` as shipping.
<!-- END:jetwave-agent-rules -->
