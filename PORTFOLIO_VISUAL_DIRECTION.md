# Portfolio Visual Direction

Last updated: 2026-06-22

## Goal

This document turns the wireframe into a higher-fidelity visual direction before coding.

It defines:

- visual mood
- typography
- color system
- spacing rhythm
- UI surfaces
- section styling
- motion direction

This is the final design language reference before implementation.

## Design Theme

Theme name:

Structured Signal

The portfolio should feel like:

- a high-trust engineering portfolio
- a refined freelance service site
- a modern product presentation

It should look calm, sharp, and intentional.

The vibe is:

- editorial but technical
- modern but not trendy in a disposable way
- premium without trying too hard

## Visual Identity

### Overall feel

Imagine:

- light stone paper background
- dark ink typography
- teal system accents
- occasional copper highlights
- grid lines and measured spacing

This should feel more like a well-designed operating manual for a capable builder than a flashy personal brand landing page.

### Keywords

- structured
- warm technical
- precise
- modern
- credible
- fast

## Typography

Recommended pairing:

- Headings: `Source Serif 4`
- Body and UI: `Manrope`

Why this works:

- `Source Serif 4` gives maturity and identity
- `Manrope` keeps the UI clean and current
- together they avoid the generic SaaS-template feeling

### Typographic hierarchy

Hero name:

- large serif
- bold
- tightly composed

Section headings:

- serif
- medium-large
- strong but not oversized

Body:

- sans-serif
- compact and readable

Small labels:

- sans-serif
- uppercase or tracked slightly wider

### Recommended scale

- Hero name: `clamp(3rem, 7vw, 6rem)`
- Hero statement: `clamp(1.2rem, 2vw, 1.8rem)`
- Section title: `clamp(1.5rem, 2vw, 2.2rem)`
- Card/project title: `1.1rem - 1.35rem`
- Body text: `0.98rem - 1.05rem`
- Small labels/meta: `0.76rem - 0.86rem`

## Color System

### Primary palette

```css
:root {
  --bg: #f3efe8;
  --bg-elevated: #fbf8f3;
  --surface: #f7f4ee;
  --surface-strong: #efe9df;
  --ink: #182129;
  --ink-soft: #52606b;
  --line: #d6d2c8;
  --accent: #0f6a73;
  --accent-strong: #0a4f57;
  --accent-warm: #9a5a30;
  --success: #2e6a4f;
  --shadow: rgba(24, 33, 41, 0.08);
}
```

### Usage rules

- `--bg` for full page background
- `--bg-elevated` for major content areas
- `--surface` for subtle panels
- `--ink` for main type
- `--ink-soft` for secondary text
- `--accent` for links, CTA emphasis, bullets, focus states
- `--accent-warm` for selective highlights like pricing or service emphasis

### What to avoid

- pure white everywhere
- heavy gradients
- purple or blue-violet themes
- black glassmorphism

## Grid and Spacing

### Layout width

- Max content width: `1200px - 1280px`
- Inner content width for text-heavy sections: `1080px`

### Section spacing

Recommended vertical rhythm:

- hero top padding: large
- section top/bottom padding: `88px - 120px` desktop
- section top/bottom padding: `56px - 72px` mobile

### Grid style

- Use clean grid divisions
- Add subtle horizontal separators
- Avoid random floating card placement

Visual structure should come from:

- alignment
- whitespace
- section framing
- typography hierarchy

not from many decorative boxes.

## Surface Styling

### Panels

Use panels selectively for:

- signal panel
- service cards
- pricing panel
- contact form

Recommended panel style:

- low-radius corners: `8px`
- light border
- warm elevated background
- soft shadow only when useful

### Lines

Thin rules are important to the visual language.

Use:

- top borders
- section dividers
- grid-aligned separators
- understated framing lines

This adds structure without clutter.

## Section-by-Section Mock Direction

## 1. Hero

### Layout

Desktop:

- two columns
- left column wider
- right column contains signal panel

Mobile:

- stacked
- text first
- signal panel below CTAs

### Styling

- big serif name
- concise professional statement
- muted proof strip below CTAs
- signal panel should feel like an engineering dashboard summary

### Hero panel content style

Use small grouped rows like:

- Stack
- Domains
- Work Mode
- Selected Signals

Not pills everywhere.

Example:

```text
STACK
.NET / React / SQL / Go

DOMAINS
Enterprise systems
Reporting workflows
POS and document tools

MODE
Remote roles
Freelance projects
```

## 2. Capability Band

This should be a horizontal strip with 3 columns on desktop and stacked blocks on mobile.

Each block should have:

- small label
- short title
- 2-line explanation

Visual style:

- no heavy cards
- use dividers between columns
- soft background tint or thin top/bottom rule

## 3. Featured Work

This section should carry the strongest visual weight after the hero.

### Layout direction

Project 1:

- wide feature row
- title, role, summary, proof bullets, stack, CTA

Project 2 and 3:

- split layout
- one left, one right

Project 4 and 5:

- more compact support rows

### Visual style

- project titles in serif or bold mixed style
- muted project meta line
- strong whitespace
- one subtle accent line or marker per project

No giant thumbnail placeholders unless real visuals are available.

For private projects, use:

- domain tag
- role
- contribution signals

instead of fake screenshots.

## 4. Experience Timeline

### Layout

Desktop:

- vertical spine or stepped timeline

Mobile:

- stacked timeline cards with left border marker

### Look

- restrained
- evidence-driven
- date markers + role summaries
- not decorative history

## 5. Services

This should look commercially clear.

### Layout

Desktop:

- 3-up row plus 1 full-width or 2x2 grid

Mobile:

- stacked cards

### Card contents

- service name
- short promise
- best-for line
- starting-price or quote note
- CTA

### Visual behavior

- hover lift should be subtle
- card border becomes accent-tinted on hover
- CTA stays clear and simple

## 6. Pricing Preview

This section should feel transparent and mature.

### Recommended style

- framed rate sheet
- not ecommerce pricing cards

Layout:

- service on left
- starting price on right
- scope hint below

Example feel:

```text
Fast Business Website                  Starting from Ks 600,000
Responsive company website with core pages, contact flow, and launch support
```

This is cleaner than package columns.

## 7. How I Work

This should be compact and confidence-building.

### Layout

- 3 equal stages desktop
- stacked on mobile

### Styling

- numbered blocks
- subtle line connecting them on desktop
- small explanation text

## 8. Technical Stack

This section should feel organized, not noisy.

### Layout

- grouped matrix
- maybe 2 or 3 columns

### Styling

- plain grouped lists
- subtle category headings
- avoid giant skill-tag clouds

## 9. Resume + Contact

This section should feel like the close of a strong professional document.

### Layout

Desktop:

- left informational block
- right real inquiry form

Mobile:

- stacked with form second

### Contact form styling

- clean labels
- strong field borders
- generous vertical spacing
- one strong submit button

### Form tone

The form should feel serious and easy:

- not playful
- not too many fields
- not intimidating

## Buttons

Recommended button system:

### Primary button

- dark teal background
- light text
- medium height
- subtle hover deepen

### Secondary button

- transparent or light surface
- dark text
- border

### Tertiary links

- text + small arrow

## Motion Direction

Motion should be minimal and purposeful.

Recommended:

- fade/slide hero reveal
- staggered section entrance
- hover shift on project rows
- subtle line grow or underline reveal

Avoid:

- bounce effects
- overscaled hover animations
- parallax stacks
- anything that slows perceived performance

## Imagery Strategy

Do not depend on stock photos.

Preferred visual assets later:

- real project screenshots for public work
- abstract system diagrams or structured visual blocks for private work
- simple UI crops only if high quality

If there are no usable screenshots for a section, typography and layout should carry the weight instead.

## Mobile Direction

Mobile should not feel like a squeezed desktop design.

Priorities:

- stacked clarity
- larger tap targets
- tighter but readable spacing
- fast first viewport understanding

Mobile hero should still show:

- name
- positioning
- CTA
- proof strip

without requiring a lot of scrolling first.

## Final Look Summary

If this is executed well, the portfolio should feel like:

- a serious developer portfolio
- a capable freelancer's business front
- a polished, modern, easy-to-trust web product

The strongest emotional outcome should be:

"This person builds real things, communicates clearly, and looks reliable enough to hire."

## Next Step

After this, we are ready to start implementation with:

- exact content mapping
- component structure
- framework setup
- first coded homepage pass
