# Typography & colour — researched principles (cited)

Evidence-based direction (5-angle research pass) that replaces the ad-hoc cyan/yellow accents.

## Colour
- **60-30-10**: dominant = warm neutrals; secondary = violet/plum structure; **accent ≤10% reserved
  for the primary CTA** (= violet). — IxDF (ixdf.org/literature/topics/color-harmony), NN/G
  (nngroup.com/articles/color-enhance-design).
- **One brand colour + neutrals is premium & non-generic.** "Most sites need one, maybe two colors";
  accents used *sparingly*, still with 5-10 shades. Monochrome = calm, minimal, accessible (contrast
  from lightness). — Refactoring UI (refactoringui.com/previews/building-your-color-palette),
  Carbon (carbondesignsystem.com/elements/color/overview).
- **Cyan on magenta is the worst possible pairing** — equiluminant + saturated + near-complementary,
  PLUS cyan/magenta chromatic aberration → edge shimmer. Dropped entirely. — Envato Tuts+ (vibrating
  colours), Wikipedia (Chromostereopsis / Chromatic aberration), Albers *Interaction of Color*.
- **If a second accent is ever wanted**: violet's complement is yellow → a **muted gold/amber**,
  desaturated, thin details only, separated by neutral space, ≤10%. Metallic/gold reads premium ONLY
  when restrained. — Media.io luxury palettes; Refactoring UI (desaturate 20-30% / rotate hue ≤30°).
- **Warm neutrals, not cold**: tint greys toward yellow/orange; dark = very-dark plum, not black. On
  coloured grounds use same-hue lower-saturation, not grey. — Refactoring UI.
- **Accent contrast**: CTA ≥3:1 non-text (SC 1.4.11) + label ≥4.5:1 (SC 1.4.3). violet-500 + white =
  5.3:1 ✓. — W3C, WebAIM.

## Typography
- **Emphasis = one clean treatment, strong contrast, sparse** (≤10-30%). Bold OR colour, never
  stacked, never underline for a headline word. Minimal weight contrast "looks amateurish" → use a
  real jump (300 vs 700). — Butterick (practicaltypography.com/bold-or-italic), Strizver/CreativePro,
  Baymard, NN/G.
- **Gradient-clipped text is an overused cliché** (esp. purple-on-white = "AI slop") and must pass
  contrast at its worst point → minimise; solid colour for numerals/headlines. — Designmodo, HubSpot,
  prg.sh, WebAIM.
- **Hierarchy from size + weight + colour**, 2-3 weights, body 400-500 / emphasis 600-700; **never
  <400 for UI/body** (Montserrat-300 large-display only). — Refactoring UI, Penn State (lightweight
  fonts), WebAIM.
- **Scale**: marketing → higher ratio (1.25-1.333); restrictive fixed set. Display line-height ~1.2,
  body ~1.5. — Material 3, Imperavi.
- **Fluid type**: `clamp()` with a **rem+vw** preferred value (never pure vw — breaks zoom); keep
  max ≤ 2.5× min to satisfy WCAG SC 1.4.4. — Smashing, web.dev.
- **Measure ~45-90 CPL (≈66 ideal)** → cap prose width. — Butterick, Baymard.
- **Tracking**: all-caps eyebrows +0.1-0.15em; large display slightly negative; lowercase body none.
  — Butterick (letterspacing), Pimp My Type.
- **Pairing caveat**: Jost + Montserrat are both geometric-leaning → lean on strong size/weight
  contrast so heading vs body read distinctly (squint test). — Smashing, Pangram Pangram.
- **A11y**: body ≥16px; large text = ≥24px / ≥18.7px bold (needs 3:1; small text 4.5:1); line-height
  ≥1.5 body; test text-over-gradient at worst point. — W3C SC 1.4.3/1.4.11/1.4.12, WebAIM, Lighthouse.
