# Deploy on Cloudflare Pages

The site is hosted on **Cloudflare Pages**, connected to the GitHub repo `jivancevic/jet-wave-korcula` and auto-deploying on push to `main`. The custom domain `jetwavekorcula.com` is served through Cloudflare's proxy (DNS, CDN, and TLS all on Cloudflare), confirmed live (`server: cloudflare`, Cloudflare nameservers) and by the historical commit "Compressed video size for Cloudflare deployment".

We keep it here rather than moving to Vercel/Netlify: it already works, it is free for a static site, and DNS + CDN + hosting live in a single dashboard. Moving would split the stack for no gain.

**Consequence:** a push to `main` is a deploy. Don't push half-finished work to `main` — it goes live immediately. There is no build step to act as a gate (see [[adr-0002-static-tier-no-backend]]).
