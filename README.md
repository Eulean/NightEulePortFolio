# Wai Phyo Oo Portfolio

Portfolio site for Wai Phyo Oo, built with Next.js.

## Live site

- Production: `https://nighteuleportfolio-site.vercel.app/`
- GitHub: `https://github.com/Eulean/NightEulePortFolio`

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS v4
- Formspree for contact form delivery

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://127.0.0.1:3000`.

## Environment

Create `.env.local`:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

## Resume file

The deployable resume lives at:

`public/files/Wai_Phyo_Oo_Resume.pdf`

## Production checks

```bash
pnpm run typecheck
pnpm run build
```

## Remote job finder

Generate a fresh remote job match report:

```bash
pnpm jobs
```

The report is written to:

`jobs/remote-jobs.md`

## Deploy

Recommended:

- push to GitHub
- import the repo into Vercel
- set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in Vercel project environment variables
- redeploy

## Current shipped state

- portfolio homepage implemented with project, services, pricing, stack, and contact sections
- dark theme added with persistent toggle
- Formspree contact form connected for live email delivery
- resume PDF included in `public/files/Wai_Phyo_Oo_Resume.pdf`
- live production deployment available on Vercel
