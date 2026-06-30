# Static tier — no build step, no backend

This is a **Tier A** static marketing site: hand-written HTML/CSS/JS served as files, with no build/bundler, no package.json, and no server. Third-party libraries (AOS, Font Awesome, Google Fonts) load from CDNs. Bookings are handled off-site via WhatsApp / Instagram / phone — there is deliberately **no online booking engine, database, auth, or payments**.

Chosen because the site's job is to inform and route visitors to contact channels; a backend would add hosting cost, attack surface, and maintenance for zero customer benefit at this stage.

**Consequences:**
- There is no `.env` / secrets and therefore no `.env.example` — nothing to configure. (Recorded here so its absence reads as intentional, not an oversight.)
- The quality gate is "open `index.html`, click through both languages, check the console" — there is no test suite or CI by design.
- If real bookings/payments are ever needed, that is a Tier-B migration (a server or a hosted form service), and this ADR should be superseded.
