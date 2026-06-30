# Jet Wave Korčula

Domain language for the Jet Wave marketing site — a single-page bilingual landing page advertising a jet ski (and speedboat) rental business on the island of Korčula, Croatia. Domain terms only; no implementation detail.

## Language

**Jet Wave**:
The brand and business — jet ski & speedboat rental in Korčula. Always two words, "Jet Wave"; the domain is `jetwavekorcula.com`.
_Avoid_: JetWave, Jetwave, Wave Rider

**Jet ski**:
The core rental product — a Sea-Doo personal watercraft. HR: _jet ski_ / _skija_.
_Avoid_: wave runner, PWC, "the bikes"

**Speedboat**:
The secondary rental product, distinct from a jet ski. HR: _gliser_.
_Avoid_: boat (too generic), yacht

**Model**:
A specific machine in the fleet. The fleet is presented in two sub-sections — **Jet Skis** and **Speedboat**. Current jet skis: **Sea-Doo Spark 3UP** (2016, white, 900cc / 90 HP), **Sea-Doo GTI 130 SE** (2018, green, 1500cc / 135 HP), **Sea-Doo GTX 130 Pro** (2025, cyan, 1600cc / 130 HP). Speedboat: **Idea Marine 58** (Yamaha 115 HP, registered for 7 people). The earlier RXT-X RS 300 / GTI 130 jet skis have been retired from the site.

**Jet car**:
A future product — a jet-ski styled as a sports car (the planned units: two **LaFerrari Aperta**, 2025, yellow & red, 1630cc / 170 HP). **Held off the live site on purpose**: the business has no rental permits for jet cars yet, so they are deferred to a later version (no "first in Croatia" claim until then). Specs kept here so they're ready to add.

**Location**:
The single physical pickup point in Korčula: **La Banya**. (A former second point, _Put Sv. Nikole 38_, was dropped — the business now operates from La Banya only.)

**Rental tier**:
A pricing/duration option, not a product. Three tiers: **30 minutes** (€80), **1 hour** (€140, the "Most Popular" / _Najpopularnije_ tier), and **Daily rent** (on request / _Na upit_ — primarily the speedboat).

**Booking**:
A customer request to rent. Handled off-site (WhatsApp / Instagram / phone) — there is no online booking engine. The "Book Now" CTA points the visitor at contact channels, it does not transact. See [[adr-0002-static-tier-no-backend]].

**Team**:
The two-person crew, named and bio'd on the site: **Filip** (a.k.a. "Fila", "The Captain of Adrenaline") and **Gabriel** ("The Master of the Waves"). Real people, real photos — not stock personas.

**Locale**:
The site is bilingual: **EN** is primary/default, **HR** (Croatian) is the secondary translation. Locale is selected by the visitor, persisted in `localStorage`, and reflected in the `?lang=` query parameter — it is not a separate route or page. See [[adr-0003-query-param-i18n]].

## Relationships

- The **business** (Jet Wave) operates from one **Location** (La Banya) and is run by a two-person **Team**.
- The fleet contains several **Models**; a **Booking** is for a Model at a **Rental tier**.
- Every user-facing string exists in both **Locales** (EN + HR) — the two must stay in sync.

## Flagged ambiguities

- "Rental" vs "hire" — the old README used both. Canonical English is **rental**.
- Speedboat is a distinct **product** from the jet skis; don't fold it under "jet ski".
- **Jet cars** appear in meeting briefs but are **not** live on the site yet (no permits). If a brief says "add jet cars", confirm permit status before publishing — they stay deferred until then.
