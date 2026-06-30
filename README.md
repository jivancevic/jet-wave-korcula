# Jet Wave Korčula 🌊

Marketing landing page for **Jet Wave** — jet ski & speedboat rental on the island of Korčula, Croatia. Single-page, bilingual (English primary, Croatian secondary). Live at **[jetwavekorcula.com](https://jetwavekorcula.com)**.

## Stack

Plain **HTML5 · CSS3 · vanilla ES6 JavaScript** — no framework, no build step. Custom query-param i18n (`js/i18n.js`), AOS scroll animations + Font Awesome via CDN, *Saira* (body) + *Garosia* (headings) fonts. Hosted on **Cloudflare Pages**, auto-deployed on push to `main`.

## Run

No build. Serve the folder with any static server and open it:

```bash
python3 -m http.server 8000   # → http://localhost:8000
```

Then click through **both** languages (EN/HR toggle) and check the browser console — that's the quality gate.

## Layout

```
index.html        # the whole single page
css/styles.css     # styles; design tokens in the :root block
js/i18n.js         # EN + HR strings + the translator
js/script.js       # nav, animations, form, interactions
assets/            # images, video, favicons, team & model photos
```

## Docs

- **`CLAUDE.md`** — repo map + hard rules + how to work here
- **`CONTEXT.md`** — domain language (the right words for things)
- **`docs/adr/`** — the decisions and why (deploy, static tier, i18n approach)
- **`AGENTS.md`** — gotchas for anyone (human or AI) editing the code
