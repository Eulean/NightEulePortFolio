# Portfolio Design Brief

Last updated: 2026-06-22

## Goal

Design a portfolio site for Wai Phyo Oo that feels modern, fast, credible, and distinct without looking like a generic developer template. The site should help with remote job applications and make the strongest case for Wai as a backend-focused full-stack developer with real enterprise workflow experience.

The design should optimize for:

- Fast first impression
- Strong professional credibility
- Clean storytelling around real work
- Easy future updates
- Easy deployment
- Good mobile and desktop experience

## Positioning

This portfolio should not feel like a student showcase or a template gallery.

The strongest positioning is:

Backend-Focused Full-Stack Developer building business systems, workflow tools, reporting platforms, and enterprise applications.

The portfolio should communicate:

- Real business software experience
- Practical engineering, not just visuals
- Enterprise workflow understanding
- Ability to build complete systems
- Seriousness, clarity, and trust

## Recommended Site Personality

The design direction should feel:

- Sharp
- Technical
- Calm
- Modern
- Structured
- Slightly editorial

It should not feel:

- Playful startup landing page
- Purple gradient AI template
- Over-animated portfolio clone
- Minimal to the point of emptiness
- Card spam

## Core Design Concept

Working concept name:

Signal Board

The site should feel like a refined hybrid of:

- an engineering case-study site
- a clean internal product dashboard
- an editorial portfolio

The visual idea is that the homepage quickly proves capability through "signals" instead of generic self-description.

Example signals:

- Years of practical coding and active project work
- Enterprise workflow systems
- .NET + React + SQL + Go
- Tradenet / reporting / POS / document workflows
- Remote-ready builder

## Visual Direction

### Color system

Recommended palette:

- Background: warm light gray or soft stone, not pure white
- Primary text: deep charcoal
- Accent: deep teal or industrial blue-green
- Secondary accent: rust or muted copper for highlights
- Lines/surfaces: pale gray-blue

Avoid:

- purple-heavy palette
- neon cyberpunk
- pure black and pure white only
- big generic gradients

Suggested starting tokens:

- `--bg: #f3f1ec`
- `--surface: #fbfaf7`
- `--ink: #182129`
- `--muted: #5c6770`
- `--accent: #0f6a73`
- `--accent-2: #a35a2c`
- `--line: #d7d9d4`

### Typography

Use a typography pairing with character.

Recommended direction:

- Headings: a strong serif or industrial-feeling display serif
- Body/UI: clean sans-serif

Example pairings:

- `Bricolage Grotesque` + `Source Serif 4`
- `Manrope` + `Bitter`
- `Plus Jakarta Sans` + `Cormorant Infant`

Best recommendation for this portfolio:

- Headings: `Source Serif 4`
- Body/UI: `Manrope`

Reason:

- Feels mature and distinctive
- Keeps the site readable and modern
- Helps the portfolio stand apart from generic SaaS-like developer templates

### Layout mood

- Wide desktop layout
- Tight spacing where useful, but not cramped
- Strong grid lines and section rhythm
- Full-width sections rather than floating cards
- Strategic use of framed project panels only where they help

## Homepage Structure

The homepage should be the portfolio. No separate landing page first.

### 1. Hero

Purpose:

Make Wai's positioning instantly clear in the first screen.

Hero content:

- Name
- Strong title
- One-sentence value proposition
- Compact proof strip
- Primary actions

Recommended headline:

Wai Phyo Oo

Recommended sub-headline:

Backend-Focused Full-Stack Developer building enterprise workflows, reporting systems, and practical business software.

Recommended proof strip:

- .NET
- React
- SQL
- Go
- Enterprise systems
- Remote-ready

Primary CTA:

- View Projects

Secondary CTA:

- Download Resume

Additional CTA:

- Start a Project

Visual treatment:

- Large type, left aligned
- Right side contains a "signal panel" instead of a portrait
- Signal panel can show capability metrics, stacks, and project domains

### 2. Capability Band

Purpose:

Show what Wai actually does without using fluffy skill bubbles.

Three columns:

- Backend Systems
- Workflow & Reporting
- Full-Stack Delivery

Each should have 2-3 lines of plain-language explanation.

### 3. Featured Work

Purpose:

This is the most important section of the site.

Recommended featured projects:

1. Restaurant POS
2. Enterprise E-Commerce / DOCA / DOCCA Systems
3. Tradenet Member Management
4. BDMS / tested backend work
5. Safety Data Sheet / PDF generation

Design treatment:

- Not equal cards
- Use asymmetric project rows
- Each project gets a strong title, role, stack, impact summary, and 3 signal bullets

For private work:

- Mark as private enterprise work
- Focus on role, domain, and engineering contribution
- No screenshots unless approved

### 4. Experience Timeline

Purpose:

Turn scattered org/project work into a convincing career story.

This should be a structured timeline or stepped vertical layout showing:

- Shwe-Digits enterprise systems work
- one-project-one-month backend project work
- independent/public project development

This section should feel like evidence, not autobiography.

### 5. Technical Stack Section

Purpose:

Give recruiters a quick scan section.

Presentation style:

- Structured grouped lists
- No generic pill cloud

Groups:

- Languages
- Backend
- Frontend
- Databases
- Reporting & Docs
- Dev/Deploy

### 6. Resume / Contact Section

Purpose:

Make action easy.

Include:

- short closing line
- resume download
- GitHub
- email
- Telegram
- remote work availability

This should feel clean and direct, not like a contact form-heavy section.

### 7. Freelance Services Section

Purpose:

Show that Wai is available not only for jobs, but also for client work.

This section should sit above the final contact area, because it creates a stronger conversion path for clients who land on the site.

The services should be framed clearly and commercially:

- Static websites
- Business/company websites
- E-commerce sites
- Custom web projects
- Ongoing support and updates

Each service should communicate:

- what kind of client it is for
- what kind of deliverable is included
- whether pricing is fixed, starting-from, or quote-based

Recommended service card titles:

- Fast Business Website
- E-commerce Website
- Custom Project Build
- Maintenance / Improvements

## Freelance Services Strategy

This portfolio should treat freelance work as a serious offer, not as a side note.

Recommended positioning:

I build fast, modern websites and practical custom web projects for businesses, personal brands, and growing online sellers.

Recommended service list:

### 1. Static / Business Website

Best for:

- company profile sites
- personal brands
- service businesses
- restaurants
- clinics
- portfolios
- landing pages

### 2. E-commerce Website

Best for:

- small online shops
- catalog + inquiry businesses
- stores needing checkout, products, and order management

### 3. Custom Project

Best for:

- dashboards
- admin portals
- booking systems
- internal tools
- workflow systems
- custom business logic

### 4. Support / Maintenance

Best for:

- monthly updates
- bug fixes
- content updates
- small feature additions
- performance and reliability improvements

## Recommended Pages

For the first version, keep it lean:

- `/` Home portfolio
- `/services` optional later
- `/resume` optional later
- `/projects/[slug]` optional later for detailed case studies

Best first release:

- One excellent homepage
- Resume PDF download
- Optional lightweight project detail drawers or anchored sections

## Content Strategy

The site should emphasize:

- What was built
- What business/workflow problem it solved
- What technologies were used
- What Wai specifically contributed

The site should avoid:

- Long personal storytelling
- Generic "I love coding" copy
- Empty mission statements
- Overclaiming ownership of private systems

Best writing tone:

- Direct
- calm
- specific
- credible

For freelance services, also make it:

- easy to understand
- reassuring for non-technical clients
- clear about scope boundaries

## Interaction Design

Keep motion intentional and light.

Recommended motion:

- soft hero reveal on load
- staggered section entrance
- project row hover with subtle shift
- animated section markers or grid traces

Avoid:

- heavy parallax
- spinning icons
- gimmicky cursor effects
- flashy chart junk

For service cards and pricing:

- use restrained hover states
- show structure and clarity rather than animated gimmicks

## Update Model

The portfolio should be easy to update later.

Recommended content model for implementation:

- `site.config.ts` for basic identity/contact
- `projects.ts` or `projects.json` for portfolio entries
- `experience.ts` for timeline/work sections
- `skills.ts` for grouped stack items
- `services.ts` for freelance offerings
- `pricing.ts` for pricing labels, package notes, and CTA copy

That way future updates only require editing data files, not redesigning layouts.

## Recommended Tech Direction For Later Build

For implementation later, the best fit is:

- Next.js
- TypeScript
- Tailwind CSS
- MDX or data-driven JSON/TS config
- deploy to Vercel

Reason:

- Fast deployment
- strong SEO defaults
- easy file-based updates
- easy resume/project integration
- scalable later if adding blog or case-study pages

If even simpler deployment is preferred:

- Vite + React + static deploy to Vercel or Netlify

But the strongest long-term choice is still Next.js.

## Contact Form Strategy

The contact section should not be only links. It should include a real working contact form so visitors can send project inquiries directly from the site.

Recommended form fields:

- Name
- Email
- Company or brand name
- Project type
- Budget range
- Timeline
- Project details

Recommended project type options:

- Business website
- E-commerce website
- Custom web project
- Maintenance / improvements
- Job opportunity

Recommended budget options:

- Under budget range
- Starter range
- Growth range
- Custom quote needed

The form should also:

- validate required fields
- show success and error states clearly
- protect against spam
- send a real email notification
- optionally store submissions later

Recommended implementation approach later:

- Primary: Next.js server-side contact form using Resend
- Fallback: Formspree for lower-maintenance static handling

Reason:

- Resend officially supports serverless and Next.js workflows, which matches the recommended build path.
- Formspree officially supports custom HTML and JavaScript forms without needing a custom backend, so it is a good fallback if the site stays more static.

## Pricing Research Summary

Pricing references collected on 2026-06-22 show the market is wide, but there is a clear pattern:

- Myanmar business-site packages are often low for template/CMS work.
- Southeast Asia freelancer and small-agency pricing rises quickly once custom design, e-commerce, or business logic is involved.
- Custom work should not be priced like a basic brochure site.

Verified market signals used:

- Myanmar Web Design lists business-site packages at `Ks 450,000`, `Ks 650,000`, and `Ks 950,000` for theme-based WordPress/CMS sites.
- Twine's Myanmar rate guide lists approximate monthly developer bands from `MMK 600,000 - 1,200,000` for junior through `MMK 1,200,000 - 2,400,000` for mid-level.
- GoodFirms' 2026 survey says South and Southeast Asia commonly bill around `$10-$15/hour`.
- Philippines references show simple business sites around `PHP 12,000 - 45,000`, more customized company sites around `PHP 45,000 - 108,000`, and e-commerce/advanced features around `PHP 80,000 - 300,000+`.
- Malaysia references show around `RM 1,980` for a basic one-page site, `RM 3,280 - 4,280` for more standard/premium business sites, `RM 5,980` for e-commerce, and `RM 8,980+` for custom builds.
- Thailand references show static websites around `THB 14,900 - 50,000`, e-commerce around `THB 39,500 - 150,000`, and custom web applications around `THB 150,000 - 500,000`.
- Singapore references show freelancers around `SGD 1,000 - 3,000` for small business sites and roughly `SGD 3,000 - 10,000` for e-commerce work.

## Recommended Public Pricing Strategy

Do not publish one giant detailed price table.

Best portfolio approach:

- show "starting from" pricing
- keep custom projects quote-based
- mention that final pricing depends on scope, content, integrations, and timeline

This protects flexibility and avoids trapping Wai into underpricing complex work.

Recommended public pricing blocks:

### Fast Business Website

Suggested public label:

Starting from `Ks 600,000`

Positioning:

- for simple company or personal business websites
- fast delivery
- modern responsive layout
- contact form
- basic SEO setup

### E-commerce Website

Suggested public label:

Starting from `Ks 1,800,000`

Positioning:

- for stores needing products, categories, checkout, and order flow
- final cost depends on payment method, inventory logic, product count, and admin complexity

### Custom Web Project

Suggested public label:

Starting from `Ks 2,500,000` or `Custom Quote`

Positioning:

- for dashboards, portals, booking systems, workflow tools, and business-specific functionality
- should be sold as discovery-led, not fixed-price by default

### Monthly Support

Suggested public label:

Starting from `Ks 250,000 / month`

Positioning:

- bug fixes
- updates
- content changes
- small improvements
- technical support

## Pricing Notes

These recommended public numbers are intentionally positioned:

- above the cheapest local template-only market
- below high-end Singapore or agency pricing
- credible for a Myanmar-based freelancer with real full-stack capability

This means the portfolio can attract:

- Myanmar clients
- regional Southeast Asian clients
- international small-business clients looking for strong value

## Design Changes Triggered By Freelance Positioning

Because freelance work is now a core goal, the site should change in these ways:

### Hero

Add a stronger service-facing secondary line or CTA:

- Available for remote roles and freelance web projects

### Navigation

Recommended nav items:

- Work
- Services
- About
- Resume
- Contact

### Homepage additions

Add:

- services section
- pricing preview
- "how I work" strip

### How I Work strip

This should be a compact 3-step section:

1. Understand the project
2. Build the right scope
3. Launch and improve

This helps non-technical freelance leads trust the process quickly.

## Design Rules For Implementation

When we build this later, keep these rules:

- No generic template hero
- No over-rounded cards everywhere
- No purple gradients
- No giant avatar-first layout
- No meaningless stats
- No fake testimonials
- No filler illustrations
- No separate "about me" page as the core experience

Must have:

- strong first screen
- strong featured work storytelling
- strong services positioning
- working contact form
- excellent typography
- clear hierarchy
- polished mobile layout
- easy resume access

## Final Recommendation

Best first version:

A single-page portfolio with a strong editorial-engineering visual style, built around featured work, enterprise credibility, and a clear freelance services offer instead of generic self-promotion.

This should feel like:

"a developer who builds serious systems, ships clean websites, and can be trusted with real product work."

That is the design target.
