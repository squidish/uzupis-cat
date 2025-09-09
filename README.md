# Užupis Cat — Retro Tribute

A playful monorepo scaffold for a retro-styled tribute site.

## Quick start

```bash
npm install
npm run dev
```

The command above starts both the Vite client (port 5173) and the Express API server (port 3000).

## Scripts

- `npm run dev` – run client and server in development mode
- `npm run build` – build both apps
- `npm test` – run unit tests for client and server
- `npm run lint` – lint both apps

## Development vs Production

Development uses the Vite dev server with a proxy to the API. For production, build the apps and run the compiled server:

```bash
npm run build
node apps/server/dist/index.js
```

The server reads the `PORT` environment variable (default `3000`).

## Docker

To build and run production containers locally:

```bash
docker compose up --build
```

- Client: http://localhost:5173
- Server: http://localhost:5174

The client container proxies `/api` to the server container.

## Production Notes

- The server enables `Access-Control-Allow-Origin: *` by default. Set a tighter policy for real deployments.
- Configure ports with the `PORT` env variable in each service.
- The client can point to a remote API by setting `VITE_API_BASE` at build time.

## Replace the Pixel Cat

The SVG used for the pixel cat lives in `apps/client/src/components/PixelCat.tsx`. Replace the `<svg>` markup with your own art. Keep an accessible name via `aria-label` and maintain motion preferences.

## Accessibility and i18n

- UI elements provide labels and respect `prefers-reduced-motion`.
- Language strings live in `apps/client/src/i18n`. Add new `{lang}.json` files and update `index.tsx` to support additional locales.
