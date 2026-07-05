# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`Krinuh` is the customer-facing Next.js e-commerce and portfolio site for the artist Krinuh. It is one of three repos in the Krinuh-Suite (see the top-level `../CLAUDE.md`). It talks to `krinuh-exp-ts-be` (the backend) over plain `fetch` calls for product data, and uses Cloudinary for images, Stripe for payments, and EmailJS for enquiry forms. Deployed on Vercel at www.krinuh.com.

## Commands

- `npm run dev` — start dev server (Next.js, default port 3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — ESLint (`next lint`)

There is no test suite in this repo.

## Architecture

- Next.js 14 **App Router**, JavaScript/TypeScript mixed (`.jsx`/`.tsx` files coexist under `src/app`). Path alias `@/*` maps to `src/app/*` (see `jsconfig.json`).
- UI is built on **shadcn/ui + Radix primitives**, styled with Tailwind (`src/app/components/ui` holds the generated shadcn primitives; hand-written composite components live directly under `src/app/components`).
- **Data fetching is client-side, not server-side.** Pages like `gallery/page.tsx` and `jewellery/page.tsx` are static shells; the actual product data is fetched in the browser (e.g. `components/paintings-client.tsx`, `jewellery/page.tsx`) directly from the backend's hardcoded production URL `https://krinuh-be-ts.vercel.app`. This was a deliberate change to avoid Vercel serverless function timeouts on server-side fetches — see the comment in `gallery/page.tsx`. When adding new data-driven pages, follow this client-fetch pattern rather than reverting to server components with server-side fetches.
- `src/app/lib/wake-backend.tsx` pings the backend root on every page load (`layout.tsx`) with `mode: "no-cors"` to warm up the backend's serverless cold start. Keep this in `layout.tsx` if the backend continues to have cold-start issues.
- `src/app/v2/sampleData.ts` holds static/sample product data (hero slides, announcements, fallback painting/jewelry/decoration data) still used by the homepage (`page.tsx`) for non-fetched sections — most product carousels on the homepage are currently commented out in favor of static sections like `ShopByCategories`, `CategoryFeature`, `OurStorySection`.
- State: cart and search state are React Context (`src/app/Context/cart-context.tsx`, `search-context.tsx`), not a global store library.
- Routes: `gallery` (paintings), `jewellery`, `decorations`, `search`, `cart` are the main sections, each a route segment under `src/app`.
- Checkout (`components/checkout-form.tsx`) integrates Stripe via `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`; images are served via `next-cloudinary` using `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`.
- Enquiry/contact forms (`components/enquiry-form.tsx`, `Enquire.jsx`, `CustomEnquire.jsx`) send via EmailJS rather than the backend.

## Gotchas

- The backend URL is hardcoded as a literal string in multiple client components (not an env var) — if the backend URL changes, grep for `krinuh-be-ts.vercel.app` across `src/app` and `src/app/components`.
- `.next` and `node_modules` are present in the working tree checkout; don't treat their contents as source.
