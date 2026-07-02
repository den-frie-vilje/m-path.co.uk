# Comparative design review — target group & message (2026-07-01)

Multi-agent review (audience/conversion + original-vs-new comparison critics). Goal: 10x the
original on **who it's for** and **what it says**, not just craft.

## Verdict
Net improvement over the WordPress/Elementor original in craft + IA (per-audience routes, scannable
accordions, honest sentence-case copy, real semantics). But it under-serves its **two distinct
buyers** and leans generic in places. The original's one discipline worth keeping: contact routes
visible everywhere.

## The two buyers (from the content)
- **Schools & colleges** — safeguarding / PSHE leads, heads. Anxieties: the manosphere, boys'
  mental health, safeguarding compliance, age-appropriateness (11–18), backlash. Route: `education@`.
- **Workplaces** — HR / DE&I / L&D leads. Job: male DE&I disengagement (the Forbes stat), inclusion,
  allyship, justify spend. Proof: Barclays/Nike/KPMG/L'Oréal. Route: `info@`.

## Prioritized improvements
1. **Home = an audience fork.** Hero CTAs + a two-card audience chooser send schools vs workplaces
   to their journey immediately (was "Discover more"/"Get in touch"). Symmetric closing CTA.
2. **Lead with the contrarian positioning** (compassion not blame; moving beyond "toxic masculinity";
   manosphere expertise) — the one thing a generic wellbeing consultancy would never say.
3. **Audience-correct proof.** Tag testimonials; workplaces show corporate quotes, schools show the
   speaker/education-relevant proof (London Speaker Bureau explicitly cites *schools & universities*).
   Stop showing Barclays quotes to a safeguarding lead.
4. **Credential strip on the money pages** — surface BACP registration, BBC/Telegraph/Woman's Hour,
   UN HeForShe / Number 10 (grounded in `about.json`), currently buried on `/about`.
5. **Objection-handling FAQ** per audience (Is this therapy? Will it blame boys/men? Is it
   anti-women / does it undercut DE&I? Logistics?) — answered from the site's own thesis.
6. **"How it works" process** (enquiry → scoping call → tailored proposal → delivery → follow-up /
   network) — reduces the "prices on request" wall without inventing prices.
7. **Structured enquiry** — an audience-routed enquiry form (composes a routed email, zero-backend;
   drop in Formspree/serverless later) instead of a bare `mailto:`.
8. **Fix trust leaks** — placeholder social links removed; duplicate schools heading fixed.

## Grounded now vs needs the client (we never invent facts)
- **Implemented (grounded in the real source):** audience fork, tagged/relocated testimonials,
  credential strip, objection FAQ (from the existing thesis), generic process shape, enquiry form,
  sharpened hero copy, contrarian framing, trust-leak fixes.
- **Flagged — needs Chris/M-Path to supply (NOT fabricated):** named school/college testimonials &
  logos; DBS/safeguarding-policy specifics; measurable outcome metrics (%/before-after); pricing
  tiers; real social profile URLs. Placeholders invite these ("available on request") rather than
  assert them.

## Branding / aesthetic dimension (art-direction + aesthetic-vs-original critics)

**Honest verdict:** big step up in *craft*, but it landed in **generic modern-consultancy** — the
2024 SaaS uniform: 135° purple→magenta gradient hero + rounded-2xl hairline cards + gradient icon
chips + full pills + blurred glow blobs. Tasteful but forgettable. The *original* was tasteless but
**unmistakable** — a rave-flyer palette (blue-purple-cyan-pink-yellow), fearless full-bleed
saturated colour blocks, real cyan/yellow accents, energy suited to teenage boys. We kept the craft
and threw away the **nerve**. Target = the third thing: **crafted AND unmistakable**.

**Emotional register:** *a steady hand on the shoulder* — warm, assured, hopeful, human, considered.
Avoid: clinical, corporate-cold, laddish, preachy (the thesis is "compassion not blame").

**Highest-impact aesthetic moves (both critics agree):**
1. **Reclaim the page middle for the brand.** Six consecutive near-white sections today; `tone="violet"`/
   `"gradient"` are defined in `Section.svelte` and *never used*. Paint a core section per page
   (Services on home; Programme on schools/workplaces) in brand colour.
2. **Add a flat deep-plum gravitas surface** (`tone="plum"`, ~`#1c0d2e→#2c1147`, near-flat): gradient =
   invitation/energy, flat plum = trust/authority (safeguarding, credentials, workplace pages).
3. **Give cyan + yellow real repeated jobs** (currently dead tokens): cyan `#41fff8` = the "path/hope"
   keyline/underline + the path line; yellow `#ffe250` = one lit hero word + the active/"allyship"
   step node. Scarce and systematic, not random. (Both are large-text/graphic only — a11y.)
4. **The PATH motif as a real system** — a thin drawn route line threading sections + **numbered
   journey nodes** on the ProgrammeAccordion (upcoming=outline, current=violet+cyan ring, destination=
   yellow), and a shared **2° badge-tilt token** echoing the logo. On-name, ownable, no competitor has it.
5. **One signature photo treatment**: brand violet-duotone for environment/atmosphere shots + reuse the
   hero gradient-scrim on in-body images; **faces stay full-colour** (DE&I legibility). Vary aspect rhythm.
6. **Warm the neutrals** off cool-lilac toward a barely-warm sand; keep purple-tinted inks.
7. **Type personality**: a true display tier (`clamp(56→120px)`), mixed-weight headlines (Jost 300+700),
   promote `brand-gradient-text` to a real headline moment (not just stats), all-caps kicker as furniture,
   enormous StatBand numerals.
8. **Texture + tension**: deliver the promised fine **grain** on dark/gradient grounds (inline SVG noise),
   promote the 2° tilt to a recurring device, and one **contrarian shape** (a single angled divider) to
   break the pill/rounded monotony. Kill: drop-shadow-everything, glassmorphism, competing gradients.
9. **Flex mood per audience, one system:** schools = hotter saturation, more cyan/yellow, bigger display,
   expressive path; workplaces = deep aubergine, more negative space, one restrained keyline, premium
   full-colour photography. Driven by a tone/`journey` prop, not forked components.

Carry forward from the original: its *courage* with saturated full-bleed colour and true accent use.

## What actually landed (update — supersedes the accent recs above)
The identity moves shipped (plum gravitas ground, poster display tier, the 300→700 "highlighted
turn", inline-SVG grain, the 2° tilt, the PATH-motif journey nodes — all in `src/app.css`), **but
the cyan/yellow accent recommendation (#3) was reversed.** The research pass
(`docs/type-color-principles.md`) found cyan-on-magenta is the worst possible pairing (vibrating,
chromatic aberration), so cyan + yellow were dropped: the palette went monochrome-brand, then took a
single **gold** accent (`--color-gold-400`) for the primary CTA on dark grounds, plus a scrapped
wide-gamut P3/OKLCH gold experiment that survives only as a progressive `@supports` block. The path
line + nodes are rendered in the violet family, not cyan/yellow. Full history: DECISIONS.md §6.
A separate feature also landed: a hand-designed **print / white-paper stylesheet** (DECISIONS.md §7).

## Deferred to the technical pass (per Ole)
a11y audit, responsive polish, and appearance/microinteraction **animations** — after this
message + static-aesthetic pass lands. (The static aesthetic/identity above is IN scope now.)
