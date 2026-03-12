# DESIGN.md — Visual Design System

## Inspiration
Modelled on the official Manchester United website (manutd.com).
Bold, premium, sports-media feel. Dark backgrounds, strong red accents,
full-bleed imagery, clean editorial typography.

---

## Colour Palette

| Token             | Value     | Usage                                  |
|-------------------|-----------|----------------------------------------|
| `--color-primary` | `#DA291C` | Buttons, CTAs, active states, accents  |
| `--color-black`   | `#0A0A0A` | Page backgrounds, nav                  |
| `--color-dark`    | `#1A1A1A` | Card backgrounds, sections             |
| `--color-mid`     | `#2A2A2A` | Borders, dividers, hover states        |
| `--color-white`   | `#FFFFFF` | Primary text, headings                 |
| `--color-grey`    | `#A0A0A0` | Secondary text, metadata, timestamps  |
| `--color-red-dark`| `#B71C1C` | Hover state for primary red            |

Default to **dark mode**. Light backgrounds should be used sparingly.

---

## Typography

- **Font**: Inter (all weights)
- **Headings**: Bold to Black weight (700–900), uppercase for section labels
- **Body**: Regular (400), 16px base, 1.6 line-height
- **Meta/labels**: 12–13px, uppercase, letter-spacing: 0.08em, grey

### Type Scale
| Element        | Size     | Weight | Notes                     |
|----------------|----------|--------|---------------------------|
| Hero heading   | 48–72px  | 900    | Uppercase, tight tracking |
| Section title  | 28–36px  | 700    | Uppercase label above     |
| Card title     | 18–22px  | 600    |                           |
| Body           | 15–16px  | 400    |                           |
| Meta / label   | 12–13px  | 500    | Uppercase, spaced         |

---

## Layout & Spacing

- Max content width: **1280px**, centred
- Section padding: **80px vertical** on desktop, **48px** on mobile
- Card grid: **3 columns** desktop → **2 tablet** → **1 mobile**
- Use **8px base grid** for all spacing (8, 16, 24, 32, 48, 64, 80)
- Full-bleed hero sections edge-to-edge, content inside max-width container

---

## Components

### Navigation
- Black background, sticky on scroll
- Club crest top left
- Nav links: white, uppercase, 13px, letter-spacing
- Red underline/highlight on active link
- Hamburger menu on mobile → slide-in drawer from left
- CTA button (e.g. "Join") in red on the right side

### Hero
- Full-viewport-height, full-bleed background image
- Dark gradient overlay (bottom-up) so text is readable
- Large white heading, red accent line or label above
- One clear CTA button in red below heading

### Cards (News / Fixtures / Events)
- Dark background (`--color-dark`)
- Image on top with fixed aspect ratio (16:9)
- Red category label above title (uppercase, small)
- White title, grey timestamp/meta below
- Subtle red left-border or bottom-border on hover
- No heavy box shadows — use border or background shift for hover

### Buttons
- Primary: Red background, white text, no border-radius (or 2px max)
- Secondary: Transparent, white border, white text
- Hover: Darken red slightly, slight scale transform (1.02)
- All caps, letter-spacing, medium weight

### Section Labels
- Small red uppercase text above section headings (e.g. "LATEST NEWS")
- Large bold white heading below

### Dividers
- Thin red line (`1–2px`) used sparingly as section separators or accents

---

## Imagery
- Use high-contrast, action-focused football photography
- Always use dark overlays on images to maintain text legibility
- Maintain consistent 16:9 aspect ratio for all card images
- Hero images should be full-width, high resolution

---

## Iconography
- Use **Lucide React** icons throughout
- White or grey, sized 20–24px in UI contexts
- Red for active/highlighted states

---

## Motion & Interactions
- Keep animations subtle and fast (150–200ms)
- Hover: slight background darken + red accent reveal
- Page transitions: simple fade
- No flashy or distracting animations — premium and restrained

---

## Don'ts
- No light/white page backgrounds on main sections
- No rounded corners beyond 2–4px (keep it sharp and editorial)
- No gradients except dark overlays on images
- No bright colours other than red
- No generic card shadows — use borders and background shifts instead