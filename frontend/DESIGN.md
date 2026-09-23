---
name: Folio & Ink
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1b1c'
  on-surface-variant: '#57423b'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8a726a'
  outline-variant: '#dec0b7'
  surface-tint: '#a23e18'
  primary: '#9f3c16'
  on-primary: '#ffffff'
  primary-container: '#bf542c'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59c'
  secondary: '#3f6653'
  on-secondary: '#ffffff'
  secondary-container: '#beead1'
  on-secondary-container: '#436b58'
  tertiary: '#7c5400'
  on-tertiary: '#ffffff'
  tertiary-container: '#9c6b00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59c'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#822801'
  secondary-fixed: '#c1ecd4'
  secondary-fixed-dim: '#a5d0b9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#274e3d'
  tertiary-fixed: '#ffdeae'
  tertiary-fixed-dim: '#fdba45'
  on-tertiary-fixed: '#281900'
  on-tertiary-fixed-variant: '#604100'
  background: '#fcf9f8'
  on-background: '#1b1b1c'
  surface-variant: '#e5e2e1'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system crafts an intimate, physical-feeling digital reading sanctum. Rooted in tactile neo-editorialism, it marries the quiet dignity of classical private libraries with the structured utility of contemporary independent publishing tools. 

The emotional signature is intentional, warm, and contemplative. It rejects the cold, sterile utilitarianism of algorithmic social feeds in favor of tactile paper finishes, considered structural outlines, and archival typography. The aesthetic combines clean, hairline-delineated card architecture inspired by architectural drafting and fine bookbinding with vibrant, book-cloth accent pigments. 

Targeted at voracious readers, literary essayists, and mindful curators, the interface treats every reading statistic, quote snippet, and cover presentation not as mere data points, but as collectible artifacts within an enduring personal library.

## Colors

The color palette draws directly from bookbinding materials, archival parchment, and vintage printing inks:

- **Primary (`#C85A32` - Terracotta Bookcloth):** A sun-baked, earthen rust reminiscent of Italian book cloth and leather bookmark ribbons. Used for primary interactive highlights, current reading badges, and focal calls-to-action.
- **Secondary (`#1B4332` - Deep Library Emerald):** A dense forest green drawn from antique library lamps and gilded leather spines. Anchors secondary metrics, reading challenge milestones, and deep focus states.
- **Tertiary (`#D99B26` - Antique Saffron):** A warm, radiant ochre referencing gilded edge foil and vintage marbling. Applied to ratings, bookmarks, and curated staff picks.
- **Neutral (`#1E1E1E` - Carbon Black):** An ink-dense charcoal that replaces pure digital black. Delivers crisp outlines, structural panel borders, and body typography with the tactile authority of letterpress printing.
- **Background & Canvas:**
  - Root App Surface: `#F5F0E8` (Raw Linen Parchment)
  - Card & Container Surface: `#FAF7F2` (Unbleached Vellum)
  - Subtle Overlay / Elevated Accent: `#EAE3D5` (Pressed Manilla)
  - Accent Tone (Dusty Rose): `#C47B78` (Dried Petal & Ribbon marker accent)

## Typography

The typographical pairing forms a dialogue between historical literature and modern Swiss information architecture:

- **Display & Headlines (Newsreader):** A contemporary transitional serif cut with literary gravitas. Headline sizes leverage the optical warmth and deliberate rhythm of reading prose, evoking physical printed paperbacks and hardcover frontispieces.
- **Body & Data Displays (Plus Jakarta Sans):** A crisp, humanist geometric sans-serif that balances clarity with gentle curves. Its generous counters ensure effortless legibility across metadata grids, author indices, pagination trackers, and reading statistics.
- **Overline Badges & Archival Tags (`label-sm`):** Rendered in uppercase with generous tracking (`0.08em`) to resemble library index cataloging stamps and archival accession marks.

## Layout & Spacing

The layout is structured around an editorial grid combining a left navigation folio with a modular content canvas:

- **Desktop (1200px+):** Employs a persistent 280px left masthead/sidebar anchored by a vertical hairline boundary (`1.5px solid #1E1E1E`). The primary content area utilizes an asymmetric 12-column grid with `1.25rem` gutters and `2rem` outer page margins, grouping stat panels, reading queues, and feature covers into rhythmic blocks.
- **Tablet (768px - 1199px):** Sidebar collapses into a compact 72px icon dock or a sticky top bar. Content reflows into an 8-column layout with `1rem` gutters.
- **Mobile (< 768px):** Reflows into a single fluid column with `1rem` outer canvas padding. Metric tiles and curated lists scroll horizontally with snap points or stack into clean vertical cards.
- **Spacing Rhythm:** Internal card padding relies strictly on `space-md` (`1rem`) and `space-lg` (`1.5rem`), mirroring the balanced margins of classical book page proportions (Van de Graaf canon).

## Elevation & Depth

In alignment with the reference aesthetic, visual depth avoids artificial digital blurs, heavy ambient drops, or diffuse gradients. Hierarchy is achieved through **structural outlines and tactile card layering**:

- **Hairline Outlines:** All interactive cards, metric indicators, dropdowns, and button containers use a crisp `1.5px` border in `#1E1E1E`. 
- **Surface Layering:** 
  - Canvas floor sits at `#F5F0E8`.
  - Cards and modules lift visually by stepping forward to `#FAF7F2` against the darker perimeter line.
  - Active elements or hovered cards apply a direct, tactile offset drop shadow: `2px 2px 0px #1E1E1E` (hard, zero-blur), mimicking stamped stationery or physical index cards.
- **Dividers:** Fine continuous rules (`1px solid #1E1E1E` or `1px solid rgba(30,30,30, 0.15)` for internal subtle splits) evoke ruled archival ledger paper.

## Shapes

The design uses a restrained, tactile corner radius:
- Base panels, data widgets, input fields, and book card containers maintain an `8px` (`rounded-md` / `0.5rem`) radius.
- Larger editorial features, reading shelves, and spotlight modules step up to `16px` (`rounded-lg` / `1rem`).
- Pills and chip tags employ fully rounded circular caps (`9999px`) to create an immediate shape contrast against square book jackets and tabular data cards.
- Book cover thumbnails retain a sharp, authentic `2px` to `4px` corner to evoke real trimmed paper stock and book boards.

## Components

- **Buttons:**
  - *Primary Button:* Solid `#1E1E1E` fill with `#FAF7F2` text, `1.5px` solid `#1E1E1E` border, `rounded-md` (8px). Hover triggers an offset ink shadow: `translate(-1px, -1px)` with `box-shadow: 2px 2px 0px #C85A32`.
  - *Accent Button:* Solid `#C85A32` fill with white or ivory text, high contrast and tactile.
  - *Secondary / Ghost Button:* `#FAF7F2` surface, `#1E1E1E` border, dark text. Hover shifts background to `#EAE3D5`.
- **Stat Cards & Metric Tiles:**
  - Wrapped in `1.5px #1E1E1E` borders, `#FAF7F2` background, `1rem` padding.
  - Structure: Upper eyebrow label (`label-sm` uppercase tracking), numeric KPI (`headline-lg` in Newsreader), and lower progress descriptor with trend icons and contextual reading microcopy.
- **Chips & Literary Badges:**
  - Genre tags, reading status indicators ("Currently Reading", "DNF", "Archived"), and shelf tokens.
  - Pill-shaped (`rounded-full`), `1px` border, pastel-tinted paper backgrounds (`#FAF7F2`, `#FDEEE9` for terracotta hints, `#EAF3EE` for emerald hints), paired with bold `label-sm` typography.
- **Book Cards & Presentation Tiles:**
  - Upright ratio containers framing book jacket art with crisp inner borders.
  - Include an interactive corner bookmark ribbon icon (`#D99B26`), reading progress percentage bar (solid ink track), and direct star or leaf-rating iconography.
- **Inputs & Dropdown Selectors:**
  - Crisp `#FAF7F2` parchment background, `1.5px #1E1E1E` border, `8px` border radius. Focus states illuminate with a solid terracotta outline offset (`outline: 2px solid #C85A32`).
- **Quote & Annotation Blocks:**
  - Left-bordered with a heavy `3px` solid `#1B4332` or `#C85A32` accent rule, rendered in italicized Newsreader, evoking marginalia and literary pull-quotes.