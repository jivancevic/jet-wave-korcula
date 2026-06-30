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
A specific machine in the fleet. Current fleet: **Sea-Doo RXT-X RS 300** (the 1630cc / 300 HP flagship, present in a black-and-yellow and a black unit), **Sea-Doo GTI 130** (the 130 HP entry model), and a **Speedboat** (marked "coming soon").

**Location**:
One of the two physical pickup points in Korčula: **La Banya** and **Put Sv. Nikole 38**. Both belong to the one business — they are pickup points, not separate branches with separate branding.

**Rental tier**:
A pricing/duration option, not a product. Three tiers: **30 minutes** (€80), **1 hour** (€150, the "Most Popular" / _Najpopularnije_ tier), and **Custom** (on request / _Na upit_).

**Booking**:
A customer request to rent. Handled off-site (WhatsApp / Instagram / phone) — there is no online booking engine. The "Book Now" CTA points the visitor at contact channels, it does not transact. See [[adr-0002-static-tier-no-backend]].

**Team**:
The two-person crew, named and bio'd on the site: **Filip** (a.k.a. "Fila", "The Captain of Adrenaline") and **Gabriel** ("The Master of the Waves"). Real people, real photos — not stock personas.

**Locale**:
The site is bilingual: **EN** is primary/default, **HR** (Croatian) is the secondary translation. Locale is selected by the visitor, persisted in `localStorage`, and reflected in the `?lang=` query parameter — it is not a separate route or page. See [[adr-0003-query-param-i18n]].

## Relationships

- The **business** (Jet Wave) operates from two **Locations** and is run by a two-person **Team**.
- The fleet contains several **Models**; a **Booking** is for a Model at a **Rental tier**.
- Every user-facing string exists in both **Locales** (EN + HR) — the two must stay in sync.

## Flagged ambiguities

- "Rental" vs "hire" — the old README used both. Canonical English is **rental**.
- "La Banya" and "Put Sv. Nikole 38" read like two businesses but are **one** business with two pickup points. Don't model them as separate brands (contrast with a genuinely-split brand, which would warrant a repo-boundary ADR — that is not the case here).
- Speedboat is a distinct **product** from the jet skis; don't fold it under "jet ski".
