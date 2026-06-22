# Wai Phyo Oo Portfolio

Portfolio site for Wai Phyo Oo, built with Next.js.

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

## Deploy

Recommended:

- push to GitHub
- import the repo into Vercel
- set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in Vercel project environment variables
- redeploy
