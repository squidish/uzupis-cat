# Užupis Cat — Retro Tribute

A playful monorepo scaffold for a retro-styled tribute site.

## Development

```bash
pnpm install
pnpm -w dev
```

Other scripts:

- `pnpm -w build`
- `pnpm -w test`
- `pnpm -w lint`
- `pnpm -w format`

## Testing

```bash
pnpm -w test
```

This runs unit tests for both apps and a Playwright end-to-end spec. The Playwright
configuration starts the development servers automatically.

To run the E2E tests against a production build instead:

1. Build the apps with `pnpm -w build`.
2. Serve the built client and start the compiled server.
3. Run `playwright test`.
