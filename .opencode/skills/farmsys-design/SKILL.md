---
name: farmsys-design
description: Use for any change to the FarmSys POS landing page (Astro + Tailwind CSS v4 + TypeScript): UI design, components, layout, copy, pricing, accessibility, SEO, privacy, PII, screenshots, video, or WhatsApp/contact configuration.
---

# FarmSys POS Landing Design

Project rules for `/home/dmgarzonp/Documentos/proyectosAI/farmaSys-Web`.

## Stack and file map

- Astro 6, Tailwind CSS 4 (PostCSS), TypeScript strict, static output.
- `src/styles/global.css`: design tokens and base styles.
- `src/components/`: Header, Footer, MobileNav, Demo, VideoModal.
- `src/components/sections/`: Hero, Stats, Features, Showcase, Compliance, Testimonials, Pricing, FinalCTA.
- `src/config/site.ts`: contact and deployment data read from `PUBLIC_*` environment variables.
- `.env.example`: committed template; `.env` is local and gitignored.
- `src/scripts/`: typed client behavior (header, tabs, form, video, mobile nav).
- `src/pages/`: index, acceso, privacidad, terminos.
- `public/images/`, `public/videos/`: media assets.

## Design system

- Primary: `#006948`; primary container `#00855d`; mint `#86f2e4`.
- Tertiary purple `#712ae2` only for small accents, never as the main CTA.
- Surfaces: `#faf8ff` base, `#f2f3ff` low, white for cards.
- Text: `#131b2e` primary, `#3d4a42` secondary.
- Headings: Plus Jakarta Sans Variable. Body and labels: Inter Variable.
- Use existing tokens (`bg-primary`, `text-on-surface`, `font-headline-xl`, `py-space-2xl`, etc.). Do not invent hex colors when a token exists.
- Section rhythm: `py-space-2xl`; container `max-w-7xl` with `px-6 lg:px-12`.
- Cards: `rounded-2xl`; buttons and inputs: `rounded-lg`.
- Desktop header is fixed and 80 px tall; mobile uses a fixed bottom nav.
- Avoid generic AI tells: no random gradients, glassmorphism, emoji icons, giant shadows, or inconsistent radii.
- Page background: a fixed, premium pharmacy-interior image (`page-bg` in `BaseLayout` + `bg-pharmacy-premium.webp`) with a warm white/green overlay. Alternating sections use `surface-glass` / `surface-glass-white` with subtle borders; cards stay solid. Keep AA contrast. Replace the image with a real pharmacy photo when available.

## Components and content

- Primary CTA: “Agendar demo”. Quote CTA: “Solicitar cotización”.
- Business model is a **one-time desktop license**. Never add monthly prices, `/mes`, `por local`, or subscription plans.
- Pricing tiers: Botica, Farmacia Pro, Cadena Multi-Sucursal. Show features, not prices.
- Keep the demo/cotización form with cajas, sucursales, ciudad, WhatsApp, and consent.
- Use Spanish (Ecuador), benefit-led copy, short sentences, and clear next steps.
- Do not use absolute legal claims such as “cero multas”, “100% legal”, or “0% mermas”. Prefer “cumplimiento”, “reduce el riesgo”, “mermas bajo control”.
- Do not invent metrics or testimonials. Verify “+350 farmacias”, “+150.000 facturas” and quotes with the client.
- Testimonials need written consent. Prefer initials and business names when consent is limited.

## Privacy and PII (critical)

Treat names, cédula/RUC, phone, email, address, license keys, patient data and prescriptions as personal data.

- Never hardcode real personal data in source, tests, demo data, screenshots, video, or copy.
- Use fictional demo data; mask or redact identifiers in captures and recordings.
- Never commit databases, backups, dumps, or seed files with real data. Keep `*.sqlite`, `*.db`, `*.sql`, `*.dump`, `backups/` out of Git.
- Keep business contact data and deployment URLs in `.env` (`PUBLIC_PHONE`, `PUBLIC_WHATSAPP_NUMBER`, `PUBLIC_SITE_URL`, etc.), consumed by `src/config/site.ts`. Never hardcode numbers, emails, or domains in components.
- Keep secrets and API keys out of the repo and out of client code; use environment variables or `{file:...}` config.
- The demo form opens WhatsApp with the user's data. The privacy page must disclose this and the consent checkbox must remain required.
- Strip metadata from screenshots and video; do not publish OG images with real personal data.
- For the desktop app, keep demo/production data in a database or seed layer, never in code. Encrypt backups, limit retention, and restrict access.
- Follow Ecuador’s LOPDP: purpose limitation, consent, retention, access/rectification/erasure rights, and incident response.

## Accessibility (WCAG 2.2 AA)

- Semantic HTML first; ARIA only when native elements cannot do the job.
- Visible focus rings; full keyboard access; no `user-scalable=no`.
- Contrast at least 4.5:1 for body text; do not wash out secondary CTAs.
- Tabs: `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`, arrow-key support.
- Modal: native `<dialog>`, labelled title, Escape/backdrop close, focus return, pause media on close.
- Forms: visible labels, `autocomplete`, `inputmode`, required indicators, error/status messages.
- Respect `prefers-reduced-motion`; avoid motion-only meaning.

## Performance and SEO

- Do not use the Tailwind CDN. Keep the compiled CSS.
- Self-host fonts; optimize images to WebP/AVIF and set width/height.
- Hero image eager; below-the-fold media lazy; video `preload="none"` with poster.
- Keep JS small and in `src/scripts/`.
- Every page needs title, meta description, canonical, OG/Twitter tags and JSON-LD where relevant.
- Keep `site` in `astro.config.mjs` and `sitemap`/`robots.txt` aligned with the real domain.

## Workflow

1. Read `src/styles/global.css` and the closest existing component before editing.
2. Reuse tokens and patterns; do not create a parallel design system.
3. Test at 390, 768 and 1440 px; verify no horizontal overflow.
4. Run `npm run check` and `npm run build`.
5. Visually inspect desktop and mobile; verify tabs, menu, modal, form validation, and all links.
6. If available, run an axe/WCAG scan and fix violations before finishing.
