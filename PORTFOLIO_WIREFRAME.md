# Portfolio Wireframe

Last updated: 2026-06-22

## Purpose

This wireframe translates the portfolio design brief into a concrete page structure before implementation.

It focuses on:

- layout hierarchy
- section order
- content placement
- CTA placement
- desktop and mobile behavior

This is still pre-code.

## Site Structure

First release should be a strong single-page portfolio:

1. Hero
2. Capability Band
3. Featured Work
4. Experience Timeline
5. Services
6. Pricing Preview
7. How I Work
8. Technical Stack
9. Resume + Contact

## Desktop Wireframe

```text
+----------------------------------------------------------------------------------+
| NAV                                                                             |
| [Wai Phyo Oo]                     [Work] [Services] [About] [Resume] [Contact] |
+----------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------+
| HERO                                                                            |
|                                                                                  |
|  Wai Phyo Oo                              +------------------------------------+ |
|  Backend-Focused Full-Stack Developer     | SIGNAL PANEL                       | |
|  building enterprise workflows,           |------------------------------------| |
|  reporting systems, and practical         | .NET      React      SQL      Go   | |
|  business software.                       | Enterprise systems                 | |
|                                           | Freelance + Remote-ready           | |
|  [View Projects] [Start a Project]        | POS / Tradenet / Reporting / PDF  | |
|                                           +------------------------------------+ |
|  Proof strip: .NET | React | SQL | Go | Enterprise | Remote                     |
+----------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------+
| CAPABILITY BAND                                                                  |
|                                                                                  |
|  [Backend Systems]   [Workflow & Reporting]   [Full-Stack Delivery]             |
|  short explanation    short explanation        short explanation                 |
+----------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------+
| FEATURED WORK                                                                    |
|                                                                                  |
|  [Large featured project row]                                                    |
|  Restaurant POS                                                                  |
|  Role / stack / impact / 3 proof bullets / CTA                                  |
|                                                                                  |
|  [Asymmetric row]                         [Asymmetric row]                       |
|  Enterprise E-Commerce / DOCA            Tradenet Member Management              |
|  summary                                 summary                                 |
|                                                                                  |
|  [Wide row]                                                                    |
|  BDMS / Safety Data Sheet / Go backend highlights                               |
+----------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------+
| EXPERIENCE TIMELINE                                                              |
|                                                                                  |
|  2024 ---------------- 2025 ---------------- 2026                                |
|   |                      |                     |                                  |
|  Tradenet            Shwe-Digits           Freelance / Public projects           |
|  member flow         enterprise systems    POS / Go / PDF / remote-ready         |
+----------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------+
| SERVICES                                                                         |
|                                                                                  |
|  [Fast Business Website]  [E-commerce Website]  [Custom Project Build]          |
|  short value              short value            short value                     |
|                                                                                  |
|  [Maintenance / Improvements]                                                    |
|  short value                                                                    |
+----------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------+
| PRICING PREVIEW                                                                  |
|                                                                                  |
|  Fast Business Website       Starting from Ks 600,000                            |
|  E-commerce Website          Starting from Ks 1,800,000                          |
|  Custom Project Build        Starting from Ks 2,500,000 / Custom Quote          |
|  Monthly Support             Starting from Ks 250,000 / month                    |
|                                                                                  |
|  note: final price depends on scope, content, integrations, and timeline        |
+----------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------+
| HOW I WORK                                                                       |
|                                                                                  |
|  [1. Understand the project] [2. Build the right scope] [3. Launch and improve]|
+----------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------+
| TECHNICAL STACK                                                                  |
|                                                                                  |
|  Languages        Backend        Frontend        Databases                       |
|  Reporting        Dev/Deploy     Tools           Integrations                    |
+----------------------------------------------------------------------------------+

+----------------------------------------------------------------------------------+
| RESUME + CONTACT                                                                 |
|                                                                                  |
|  Left side:                              Right side:                             |
|  short closing statement                 working inquiry form                    |
|  resume download                         name                                    |
|  GitHub                                  email                                   |
|  email                                   company / brand                         |
|  Telegram                                project type                            |
|  remote availability                     budget range                            |
|                                          timeline                                |
|                                          project details                         |
|                                          [Send Inquiry]                          |
+----------------------------------------------------------------------------------+
```

## Mobile Wireframe

```text
+----------------------------------+
| NAV                              |
| [Wai Phyo Oo]         [Menu]     |
+----------------------------------+

+----------------------------------+
| HERO                             |
| Wai Phyo Oo                      |
| Backend-Focused Full-Stack       |
| Developer building enterprise    |
| workflows and business software. |
|                                  |
| [View Projects]                  |
| [Start a Project]                |
|                                  |
| Proof strip                      |
| .NET | React | SQL | Go          |
| Enterprise | Remote              |
|                                  |
| SIGNAL PANEL                     |
| .NET / React / SQL / Go          |
| POS / Tradenet / Reporting       |
+----------------------------------+

+----------------------------------+
| CAPABILITY BAND                  |
| Backend Systems                  |
| Workflow & Reporting             |
| Full-Stack Delivery              |
+----------------------------------+

+----------------------------------+
| FEATURED WORK                    |
| Restaurant POS                   |
| summary                          |
|                                  |
| Enterprise systems               |
| summary                          |
|                                  |
| Tradenet                         |
| summary                          |
+----------------------------------+

+----------------------------------+
| EXPERIENCE TIMELINE              |
| 2024 -> 2025 -> 2026             |
| compact stacked timeline         |
+----------------------------------+

+----------------------------------+
| SERVICES                         |
| Fast Business Website            |
| E-commerce Website               |
| Custom Project Build             |
| Maintenance / Improvements       |
+----------------------------------+

+----------------------------------+
| PRICING PREVIEW                  |
| Ks 600,000+                      |
| Ks 1,800,000+                    |
| Ks 2,500,000+ / custom           |
| Ks 250,000 / month               |
+----------------------------------+

+----------------------------------+
| HOW I WORK                       |
| 1. Understand                    |
| 2. Build                         |
| 3. Launch                        |
+----------------------------------+

+----------------------------------+
| TECH STACK                       |
| grouped accordion or compact     |
| blocks                           |
+----------------------------------+

+----------------------------------+
| CONTACT                          |
| resume link                      |
| email / GitHub / Telegram        |
|                                  |
| name                             |
| email                            |
| project type                     |
| budget                           |
| timeline                         |
| message                          |
| [Send Inquiry]                   |
+----------------------------------+
```

## Section Notes

## Hero

The hero should do three things immediately:

- identify Wai clearly
- explain value clearly
- present two action paths:
  job/recruiter path and client/freelance path

Recommended hero CTAs:

- `View Projects`
- `Start a Project`

Recommended supporting line:

Available for remote roles and freelance web projects.

## Signal Panel

Instead of a portrait or random illustration, use a structured panel that feels like an engineering overview.

Recommended content inside:

- primary stack
- domain strengths
- delivery modes
- top project domains

This gives the site a distinct identity.

## Featured Work Layout

The featured projects should not all use the same card size.

Recommended order:

1. Restaurant POS
2. Enterprise E-Commerce / DOCA / DOCCA
3. Tradenet Member Management
4. BDMS
5. Safety Data Sheet / Go backend

Recommended layout rhythm:

- first project gets the widest and most detailed treatment
- next two get balanced split rows
- final ones get compact supporting rows

## Services Layout

This section should feel service-oriented, not like a skills checklist.

Each service block should show:

- service name
- who it is for
- what is included at a high level
- starting price or custom quote note

Recommended service labels:

- Fast Business Website
- E-commerce Website
- Custom Project Build
- Maintenance / Improvements

## Pricing Layout

The pricing section should feel transparent, but not boxed into strict package complexity.

Best visual treatment:

- clean rows
- starting price on the right
- short scope hint below each line

This should look more like a rate sheet preview than a cheap pricing grid.

## Contact Layout

The contact section should support two kinds of visitors:

- recruiters or hiring managers
- freelance clients

That is why the right side should be a real inquiry form, while the left side stays simple and direct.

Recommended form fields:

- Name
- Email
- Company or Brand
- Project Type
- Budget Range
- Timeline
- Project Details

## Navigation Behavior

Desktop nav:

- fixed or lightly sticky
- minimal
- section jump links

Mobile nav:

- simple drawer or sheet
- no oversized menu animation

## Visual Priorities

The final UI build should emphasize:

- strong typography
- clear grid alignment
- restrained color use
- more lines and structure than bubble-card UI

The page should feel like:

- a modern product presentation
- a serious freelancer portfolio
- an engineering case-study site

all at once.

## Build Readiness

This wireframe is ready to guide:

- visual mock styling
- section-by-section implementation
- content mapping into data files
- later frontend coding

The next step before coding is:

Create a higher-fidelity visual mock direction from this wireframe, including typography choice, color tokens, spacing rhythm, and exact section styling.
