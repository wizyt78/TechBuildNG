# TechBuild NG — Premium Investment Website Sales Platform

A polished blue/white sales website for TechBuild NG with:

- Two package cards:
  - Tesla Investment Website — ₦150,000 (was ₦250,000), minimum deposit ₦50,000.
  - Custom Investment Website — ₦180,000 (was ₦300,000), minimum deposit ₦70,000.
- Full payment or deposit checkout.
- Strict client-side + server-side amount validation.
- KoraPay checkout initialization through a secure serverless function.
- Payment verification page.
- Floating WhatsApp support button on every page.
- Live website section and Vimeo placeholder.
- Replaceable brand and package logos in `/assets`.
- Responsive mobile/desktop design.

## Important: KoraPay keys

You should **not** put your KoraPay secret key in the browser.

KoraPay's current API documentation says pay-in APIs use a secret key and the Checkout Redirect flow is initialized through the merchant API. This build therefore keeps the secret key inside the serverless API function and sends the customer to KoraPay's hosted checkout.

You need:

1. A KoraPay account with a test or live secret key.
2. Deploy this repository to Vercel (or another host that can run the included `/api` serverless functions).
3. Add environment variables:
   - `KORAPAY_SECRET_KEY`
   - `SITE_URL`
4. Test with your KoraPay test key before switching to live.
5. Configure/verify your webhook setup in the KoraPay dashboard as required for your account.

GitHub Pages alone can host the visual frontend, but it cannot safely execute the included server-side KoraPay code or protect the secret key. For the complete payment flow, connect the GitHub repo to Vercel.

## Deploy from GitHub

1. Create a new GitHub repository.
2. Upload all files from this folder.
3. Import the GitHub repository into Vercel.
4. Add `KORAPAY_SECRET_KEY` and `SITE_URL` under Vercel Project Settings → Environment Variables.
5. Redeploy.
6. Open the Vercel URL and test a payment with KoraPay test mode.
7. When confirmed, replace the test secret with the live secret.

## Branding / logos

Replace these files with your own files while keeping the same filenames:

- `assets/brand-logo.svg` — your TechBuild NG logo.
- `assets/tesla-investment-logo.svg` — logo/artwork for the first card.
- `assets/custom-build-logo.svg` — logo/artwork for the second card.

If you prefer PNG files, update the matching `src` values in `config.js` and `index.html`.

## Vimeo

Open `config.js` and set:

`videoVimeoUrl: "https://vimeo.com/YOUR_VIDEO_ID"`

The site automatically turns it into a Vimeo player on the Live Website area.

## Live website button

The supplied live demo URL is already configured:

https://wizyt78.github.io/Elonmusk-Tesla/

Change `liveWebsiteUrl` in `config.js` if you want a different demo.

## WhatsApp

The supplied WhatsApp number is already configured as:

+49 177 1371042

The floating WhatsApp button appears on all pages and the success page creates a pre-filled proof message.

## Security notes

- Never commit `.env` or a live secret key to GitHub.
- Do not trust only the browser redirect as proof of payment.
- The included verification endpoint calls KoraPay from the server.
- For a production order-management system, store orders and webhook events in a database and only mark an order as paid after server-side verification.
- Do not request card numbers, CVV, PINs or passwords over WhatsApp.

## Source

KoraPay API documentation:
https://docs.korapay.com/

## Website marketplace catalog

The homepage now renders a searchable catalog of 10 packages from `config.js`. To change a package's title, description, image, sale price, old price, or deposit minimum, edit its entry under `packages` in `config.js`. The matching price/minimum must also be updated in `api/initialize-payment.js` so server-side checkout validation stays aligned.

### Replaceable category artwork

The new package card artwork is stored in `/assets`:

- `banking-website.svg`
- `car-sales.svg`
- `tracking-website.svg`
- `clothing-store.svg`
- `celebrity-store.svg`
- `truck-sales.svg`
- `ecommerce-store.svg`
- `social-media-store.svg`

Replace any SVG with your own artwork using the same filename, or update that package's `logo` value in `config.js`.

### Video library

Add one or more entries to `videoShowcase` in `config.js` with a title, Vimeo URL, and optional label. The homepage displays these in the Website Product Videos library. The first configured video also remains the featured video. For videos hosted elsewhere, the current gallery needs a compatible embed URL implementation.

### Payment scope

The existing KoraPay checkout initialization, hosted checkout redirect, payment verification, and success/cancel handling are retained. The server-side package price allowlist has been extended to include the new package IDs and their deposit floors. Run a real test payment in KoraPay test mode before going live; this source update cannot verify merchant credentials or provider-side configuration.
