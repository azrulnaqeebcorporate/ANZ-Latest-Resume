# Design Style Guide — "Azrul Naqeeb" Personal Branding

Reference: `e649efd1263d454d9e1793de9faff341.jpg` (original "Haesak" poster)
Style family: modern social-media agency / sticker-brutalist personal branding,
common in Indonesian graphic-designer portfolios made in Canva/Pixellab.

Rebrand (2026-09-23): name is now **Azrul Naqeeb** ("Azrul"), tagline
**Web and Graphic Designer**, **7 years of experience in the creative
industry**, and the brand palette is **dark grey + purple** (lime removed).
Headline: "I'm Azrul Naqeeb, a Creative Designer & AI Developer For …".
The hero keyword rotates: Website → Web App → Social Media GFX →
Infographics → Videos → Landing Pages.

Portfolio tabs (2026-10-05): four tabs — Website Portfolio, Graphic
Portfolio, **Video Portfolio** and **Development Portfolio**. The Video
Portfolio is populated with **10 Instagram reels** (RAYDEE2WIN / Alvigor /
The Bold Circle): covers pulled via Instagram oEmbed into
`assets/portfolio/video-*.jpg`, titles taken from the reel captions,
purple "Watch Reel" buttons to the reel URLs. Video cards are **vertical
9:16 covers in a 4-column grid** (3 columns ≤960 px, 2 ≤460 px) with
`object-fit: contain`. Development Portfolio (2 columns, 16:9 thumbs,
`contain`) first card is real: **NumNum POS for Coffee Store** (cover
`assets/portfolio/numnum-pos.png`, Challenges/Solutions block, "Demo Now"
button → numnum-pos.vercel.app, access credentials in an accordion).
Video/Development render from CMS once their gids are set in `content.js`
(`CMS.gid.videoPortfolio` / `CMS.gid.developmentPortfolio`); the baked-in
cards are the fallback. The Graphic Portfolio renderer filters out the
sheet row titled `AI Pillar 1.png`. About Me is the seven-years WordPress /
four-years creative / two-years video + support paragraph ending with
AI-built web apps (Codex, NumNum POS, team gfx platform) — the CMS
renderer swaps it in until the sheet mentions "Codex".

Revision 13 (2026-09-23): **the site is now CMS-driven.** `content.js` loads
every section from the Google Sheet ("ANZ - Website Portfolio") at page load
via `export?format=csv&gid=…` per tab (gid-keyed; gviz name-based fetches
were too stale for live editing). Tabs: Website Portfolio, Graphic Portfolio,
About, Education, Experience, Softwares, Certifications, References,
Networking. Renderers swap inner content only when the tab returns rows —
hardcoded HTML stays as the offline fallback. Editing guide: CMS-GUIDE.md.

Revision 12 (2026-09-23): Website Portfolio covers upgraded to **full-page
strips** (`assets/portfolio/fullpage-*.png`) with a **hover scroll-peek** —
hovering a card animates `object-position` top → bottom over 3.4 s so the
cover appears to scroll through the whole page design (reverses on
un-hover; no video required). Cards without a full-page image (Cikgu
Trading, SiagaXGroup) keep static covers until assets exist.

Revision 11 (2026-09-23): Website Portfolio covers are now the real project
images from the Google Drive folder (`assets/portfolio/*.png`, downloaded
locally from Drive — site does not hotlink Drive). The sheet's
"Project Image Main Cover Link" column (B2–B10) was filled with each image's
Drive view link. Card 1 retitled "Baseera Engineering | …". If the sheet's
cover column later gets real image URLs, prefer local downloads over
hotlinking.

Revision 10 (2026-09-23): Website Portfolio populated with 9 real projects
from the Google Sheet. Card anatomy: numbered brand thumbnail (alternating
ink/purple — used until cover images exist) → niche tag (small purple
uppercase) → title → label chips → **description clamped to 2 lines**
(`-webkit-line-clamp`) → purple "View Design" button (grey disabled state
when the project link is missing).

Revision 9 (2026-09-23): cream surfaces replaced by **light grey**
(`--surface: #F2F2F2`) for the hero and the Portfolio panel. Work entries
now carry their **duration in an ink-black pill at the right of the company
name** (role line is duration-free); companies stay 10 px apart and bullet
spacing stays compact (4 px). The Portfolio panel is built out: **tab
switcher** (Website Portfolio / Graphic Portfolio — ink active pill) over
card grids: **Website Portfolio = 2 columns** with wide 16:9 thumbnails,
**Graphic Portfolio = 3 columns** with social-media-post **4:5 rectangle**
thumbnails. Cards are slightly darker grey (`--card: #E6E6E6`) with a
title and a purple "View Design" button.
Networking Session has its first entries (Seremban 2 Networking Session,
Wordcamp 2025).

Revision 8 (2026-09-23): **Cream `#FAF4E6`** joins the palette as a surface
color — hero background is cream, and a **blank cream Portfolio panel**
(placeholder) sits at the bottom. Work bullet spacing is compact again
(4 px). About Me copy uses no em dashes. Company titles carry context
suffixes (ALVIGOR — Singapore HR Training Providers; CHIP In Asia —
Malaysia's No 1 Payment Gateway; Plutio — SAAS Europe Company). Bachelor
sub line adds "3.6 CGPA (Dean)". Software group labels are **light purple
`#D9C2FF`**; three new groups added (AI Tools & Solutions, Graphic
Inspiration & Resources, Email Marketing Tools). Hero now has a button row:
purple "View My Portfolio" + ink "Connect On Thread" with the official
Threads logo. "Networking Session" placeholder section added after
References.

Revision 7 (2026-09-23): **ALVIGOR** added as the current role (Web & Graphic
Designer, Remote, Sep 2025–Present) — CHIP In Asia now ends Sep 2025.
Education date pill sits inline at the **right of the entry title** (flex
header row). Work bullet points use 13 px vertical gaps. Softwares & Tools
are **grouped by function** (Website Builders & CMS / LMS Platforms /
Design & Creative / Video & Content / Code & Data / Productivity) with
bold group labels. **References** (from the resume) added below
Certifications as name + role/contact rows.

Revision 6 (2026-09-23): About Me rewritten graphic-design-first (~70/30
graphic vs web). Education and Work Experience entries now carry **bulleted
detail points** (about 5 per role, from the resume). "Skills" renamed
**"Softwares & Tools"** (12 tools incl. Affinity, Canva, Capcut, Framer,
Breakdance). Added "Canva For Masters" (Udemy) certification and a purple
**"View My Portfolio" CTA button** (with emoji) under the hero headline.
Rotator clip fixed (vertical padding so descenders never cut). **Purple
panel is no longer sticky** — with bulleted entries it exceeds the viewport,
and a pinned panel would hide its bottom; the first file-pull (dark →
purple) still plays, the rest scrolls normally.

Revision 5 (2026-09-23): real resume content loaded from
`resume-azrul-naqeeb-zulkafli.pdf`. About Me rewritten in English from the
resume summary; Education = UNISEL Bachelor (2019-2021) + UNISEL TESL
Diploma (2015-2017); Work Experience = 6 real roles (CHIP In Asia, University
of Cyberjaya, Plutio, Freelance, SiagaX Tech, AR6.asia internship). The
"Software" section is renamed **Skills** (WordPress/Wix/Drupal/LearnDash/
HTML & CSS/MySQL/Notion with category labels). The bottom dark panel is
repurposed from a duplicate into **Certifications** (MUET Band 4, Notion for
Project Management, WordPress Beginners to Masters). Correct spelling of the
name per the resume: **Naqeeb**.

Revision 4 (2026-09-23): hero background is **clean white** again (hello
sticker field removed). Portrait is now a **pre-designed graphic**
(`assets/photo-hero.png`) carrying its own purple/lime decorative shapes —
a deliberate palette exception inside the portrait image only. The hero has
**zero bottom padding** so the portrait connects flush with the dark panel
(no gap). The word rotator is **horizontal** (words slide left-to-right).

Revision 3 (2026-09-23): sidebar rail removed — panels are **full width**.
Hero is compact, hero bio removed, and the photo's height exactly matches
the headline block (no more panel overlap). Headline now reads "I'm Azrul
Naqeeb, a Web & Graphic Designer For …" and the rotator order is Social
Media → Infographics → Website → Activity Books. Education entries stack
vertically (10 px gaps) with **grey titles**. A copy of the dark panel sits
below the purple panel, extending the file-stacking scroll to three panels
(dark → purple → dark).

Use this file as the source of truth for any new graphic in this project.
Hex values and pixel sizes are approximations sampled/estimated from the
reference image — when in doubt, sample the source image again.

---

## 1. Canvas & Format

- Portrait feed poster, **4:5 ratio** (reference ≈ 736×920 → design at
  **1080×1350 px** for export).
- Single-page CV/poster hybrid: hero intro on top, stacked info panels below.
- Flat design overall — **no gradients, no drop shadows, no glass effects**.
  Depth comes purely from layering and overlap.
- All pixel values below assume the 1080×1350 reference canvas.

---

## 2. Color Palette

| Token | Hex (approx.) | Usage |
|---|---|---|
| Dark grey (primary accent) | `#2E2E33` | Keyword highlight boxes, "Hello!!" sticker, sidebar strip |
| Purple (secondary accent) | `#7A2BF5` | Name/keyword boxes, tilted stickers, bottom info panel, date pills, cursor-arrow shape |
| Black (ink) | `#0E0E10` | Headline text, dark content panel |
| White | `#FFFFFF` | Text on dark/purple/grey |
| Light grey (surface) | `#F2F2F2` | Hero background and the light portfolio panel |
| Card grey | `#E6E6E6` | Portfolio cards and inactive tab pills |
| Light purple | `#D9C2FF` | Software group labels on the purple panel only |
| Muted gray | `#C9C9C9` | Body/paragraph text on the dark panel, grey entry titles |

Brand rule: the only two brand colors are **dark grey and purple** — no
other accent hues (lime is retired).

Rules:
- Backgrounds are only **white, black, or purple** — never dark grey behind
  large areas (it is an accent, max ~10% of canvas).
- Accents always appear as **solid blocks behind keywords**, alternating
  purple ↔ dark grey, never both on the same word.
- Text is pure black on white, pure white on purple/black/dark grey.
- On purple surfaces use **white** (not grey) for micro-accents like chip
  underlines — grey on purple has poor contrast.
- Purple panel body text is white; secondary lines slightly dimmed (use white
  at ~70% opacity instead of a new hex).

---

## 3. Typography

Font family: a **geometric/grotesque sans** — Poppins or Plus Jakarta Sans
(the reference reads as one of these). Use one family for everything; vary only
weight and size.

| Role | Weight | Size (px) | Case / Notes |
|---|---|---|---|
| Display headline | ExtraBold/Black 800–900 | ~92–100 | Mixed case, tight tracking ≈ -2%, line height 1.0–1.05 |
| "Hello!!" sticker text | Bold 700 | ~30 | , tilted with its box |
| Microcopy (top corners) | Bold 700 | ~18–20 | Uppercase, letterspaced +2%, 2 stacked lines |
| Section labels ("About Me", "Education", "Work Experience", "Software") | Bold 700 | ~36 | White, wraps to max 2 lines |
| Body paragraph | Regular 400 | ~20 | Muted gray on dark, line height ~1.55 |
| Entry titles (schools, companies) | SemiBold/Bold 600–700 | ~24 | White |
| Entry subtitles (role + year) | Regular 400 | ~18 | White ~70% |
| Date pill text | Bold 700 | ~18 | White on purple |
| Sidebar vertical text | ExtraBold 800 | ~72 ("Web and Graphic Designer") | White on dark grey, rotated -90° |
| Software name | Bold 700 | ~22 | White |
| Software skill micro-label | Regular 400 | ~14 | White ~60–70% |

Typographic voice:
- Headlines are **stacked short lines** (2–5 words per line), left-aligned.
- Keywords inside headlines get solid color boxes; the rest stay black.
- No serif, no script, no italics anywhere.

---

## 4. Spacing & Sizing System

Base unit: **8 px**. All spacing is a multiple of 8.

- Outer safe margin: **56–72 px** from canvas edges.
- Hero height: ~42% of canvas; info panels: ~58%.
- Dark panel internal padding: **56–64 px** (top/left/right), 48 px bottom of section.
- Gap between major sections (About Me → Education → panel break): **40–48 px**.
- Column split inside panels: **label column ~28% / content column ~72%**, gutter 32 px.
- Work Experience grid: 2 columns × 2 rows, **column gap ~64 px, row gap ~24 px**.
- Software grid: 3 columns × 2 rows, row gap ~32 px; icon-to-text gap 12 px.
- Date pill: padding 10×18 px, corner radius ~16 px (stadium/pill shape).
- Accent boxes behind keywords: padding ≈ 8×20 px, corner radius ~16–20 px,
  box slightly taller than cap height; keep consistent across all boxes.

---

## 5. Layout Structure (top → bottom)

1. **Hero (white bg)** — compact (56 px top padding, **zero bottom padding**
   so the portrait touches the dark panel).
   - Background: clean white — no decorations.
   - **Portrait graphic** left — pre-designed image with its own purple/lime
     decorative shapes (palette exception inside the image only); its height
     exactly equals the headline block height (grid stretch +
     `object-fit: contain`, bottom-aligned flush with the dark panel).
    - Headline block right: tilted dark-grey "Hello!!" sticker → `I'm` +
      name on purple box → "a Creative Designer &" black line → "AI Developer"
      on dark-grey box + tilted purple "For" sticker → **rotating keyword**
      (Website → Web App → Social Media GFX → Infographics → Videos →
      Landing Pages) + purple cursor-arrow.
   - No corner microcopy, no bio row, no background decorations.
2. **Dark panel** — black, **square edges, full width**, first sticky
   "file". About Me (paragraph) + Education (vertical stack, 10 px gaps,
   grey entry titles, purple date pills, optional dimmed institution line).
3. **Purple panel** — purple, **square edges, full width**, second sticky
   "file", **min-height 100vh with content near the top**. Work Experience
   (vertical list, 10 px gaps) + **Skills** (vertical rows: bold tool name +
   dimmed category, same line, 10 px gaps).
4. **Certifications panel** — black copy style, third sticky "file",
   highest z-index, min-height 100vh, ends the page. Certifications as a
   vertical stack: grey title + dimmed issuer line (MUET / Udemy style).
5. No sidebar rail, no corner blobs.

---

## 6. Components & Visual Motifs

- **Keyword highlight boxes**: solid purple or dark grey, white text, radius 16–20 px.
  Alternate colors word to word; never two adjacent boxes of the same color.
- **Tilted stickers**: pill/box rotated **-8° to +10°** ("Hello!!" ≈ -7° dark
  grey, "For" ≈ +8° purple). Only 1–2 per composition.
- **Rotating keyword**: the hero's final line cycles a fixed word list
  (Website → Web App → Social Media GFX → Infographics → Videos → Landing
  Pages) with a horizontal slide animation and width morph; black text,
  followed by the cursor arrow.
- **Portrait graphic**: pre-designed image (photo + decorative purple/lime
  shapes baked in); height matches the headline block exactly; bottom-aligned
  flush against the dark panel.
- **Cursor-arrow / paper-plane shape**: solid purple triangle-pointer, ~90 px,
  placed after the final headline word, slight rotation.
- **CTA button**: solid purple pill (white bold text, radius ~14 px,
  padding 15×28 px) under the hero headline; hover swaps to ink black.
- **Date pills**: purple stadium pills, white bold text.
- **Entry detail points**: bulleted lists under education/work entries
  (~0.92 rem, 20 px indent, disc markers) — grey on dark panels, dimmed
  white (78%) on the purple panel for contrast.
- **Softwares & Tools rows**: text-only — bold white tool name + dimmed
  category on the same line, baseline-aligned, 12 px apart. No icons, no
  underlines.
- **List rhythm**: Education, Work Experience, and Software entries stack
  vertically, one per line, 10 px row gaps. Education entry titles are grey
  (`#C9C9C9`), work entry titles stay white.

## 7. Motion

- **File-stacking scroll**: the dark panel is `position: sticky; top: 0` and
  pins while the purple panel slides over it — the "file pull". Beyond that,
  panels scroll normally. **Rule: never make a panel sticky if its content
  can exceed one viewport height** — the bottom would be hidden behind the
  next panel.
- **Word rotator**: hold 2400 ms per word, **horizontal slide left-to-right**
  (550 ms, `cubic-bezier(.65,0,.35,1)`), container width morphs with the same
  easing; seamless loop via cloned first word. The container carries ±0.09em
  vertical padding so ascenders/descenders never clip.
- **Scroll reveal**: content sections fade + rise from 48 px below
  (`opacity` + `translateY`, 700 ms, `cubic-bezier(.2,.6,.2,1)`),
  triggered once per section via IntersectionObserver at 15% visibility.
- Respect `prefers-reduced-motion`: rotator stays static, sections visible.
- Note: use `overflow-x: clip` (not `hidden`) on body, or sticky breaks.

---

## 8. Do / Don't Checklist

Do:
- Keep the black + white + purple + dark-grey tetrad exactly; no new hues.
- Alternate purple/dark-grey keyword boxes in every headline.
- Let the photo overlap panel boundaries — flat but layered.
- Keep generous negative space around the headline.
- Keep panels square-edged and full-bleed (radii removed in revision 2).

Don't:
- No gradients, shadows, outlines on text, 3D effects, or glassmorphism.
- No dark grey as a full-panel background (accent only; panels stay black or purple).
- No lime anywhere — retired from the palette.
- No blob circles/swooshes, corner blobs, squiggle underlines, chip icons,
  or accent underlines — all removed.
- No sidebar rail, no corner microcopy, no hero bio row.
- No rounded panel corners.
- No extra fonts, italics, or centered paragraphs.
- No more than 2 tilted elements per composition (the hello sticker field
  is the one exception — it IS the tilted motif).
- Don't place body text on dark grey or microcopy on purple.
