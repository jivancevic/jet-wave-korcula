# CLAUDE.md

@AGENTS.md

Marketing landing page for **Jet Wave**, a jet ski & speedboat rental business in Korčula, Croatia. Single-page, bilingual (EN primary, HR secondary), single brand. Live at `jetwavekorcula.com`.

## Commands

No build step. It's static files.

```bash
# Preview locally (any static server works)
python3 -m http.server 8000   # → http://localhost:8000
# then open the page and click through BOTH languages + check the console
```

The quality gate is "open it, click through EN and HR, check the console" — there is no test suite or CI, deliberately (see `docs/adr/0002`).

## Stack

- **HTML5 / CSS3 / vanilla ES6 JS** — no framework, no bundler, no package.json
- **Custom i18n** — `js/i18n.js`, query-param + localStorage (`docs/adr/0003`)
- **AOS** (scroll animations) + **Font Awesome** (icons) — via CDN, pinned versions
- **Fonts** — *Saira* (body, Google Fonts) + *Garosia* (headings, local `fonts/Garosia.otf`)
- **Deploy** — Cloudflare Pages, auto-deploy on push to `main` (`docs/adr/0001`)

## Architecture

```
index.html        # the whole page — all sections
css/styles.css     # all styles; design tokens in the :root block (~line 64)
js/i18n.js         # EN+HR strings + the translator
js/script.js       # nav, animations, form handling, interactions
assets/            # images, video, favicons, team/ + models/ photos
```

## Hard rules

- **Re-skinnable shell.** Colours live ONLY in the `:root` token block in `css/styles.css` (`--deep-red #780000`, `--sea-blue #015fff`, `--white`, `--black`, …). Fonts are declared once (`@font-face` + the Google Fonts link). Don't hard-code a hex value or font name in a component rule — reference the token.
- **Both languages, always.** Every user-facing string must exist in EN **and** HR in `js/i18n.js` and be wired via a `data-i18n` attribute. A one-language string, or text hard-coded in `index.html`, is a bug (`docs/adr/0003`).
- **`main` is production.** A push to `main` deploys live via Cloudflare Pages. Don't push half-done work.
- **Keep SEO in sync.** If sections/locales change, update `sitemap.xml`, `robots.txt`, and the `hreflang`/canonical tags in `index.html`.

## Discovery docs

- `CONTEXT.md` — domain glossary (the right words for things)
- `docs/adr/` — decisions and why
- `memory/MEMORY.md` — persistent project memory

## Work plan

Operate in **Plan-First** mode. Start every task with a short Plan of Action; after presenting it you may write/edit files automatically. Stop and ask before destructive commands (`rm`, `git reset`), any `git` commit/push, or `gh repo create`.
