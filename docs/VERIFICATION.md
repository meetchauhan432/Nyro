# V7 verification report

## Results executed on 26 Nov 2026

- `npm test`: 16 tests passed, 0 failed. Financial amount parsing, fee inclusion, payout outcomes, ledger consistency, top-up validation, member creation/validation/role parent selection and filters, transaction sorting/CSV and HTTP transport were tested using Node's test runner. HTTP tests use an injected fake fetch; no external requests were made.
- Browser compilation: the actual modular JSX source was transpiled using the installed TypeScript compiler and bundled into a separate offline HTML preview with React 18/ReactDOM and scheduler from the supplied ZIP. This is not Vite's production bundle. Chromium was used with Playwright; page content was loaded from the offline HTML because direct file URL navigation is restricted in the test environment.
- Desktop visual parity: original V6 and refactored V7 were independently rendered with React 18 at 1440×900, reduced-motion enabled, with matching browser settings. Full-page PNGs for overview, member directory and profile had identical dimensions and identical RGB pixels. This does not claim every page or browser is pixel-identical.
- Responsive checks: dashboard, member directory, member profile and Create User were tested at 1920, 1440, 1280, 1024, 768, 390 and 320px widths (28 assertions). No unintended page horizontal overflow in those cases.
- Browser functional regression: completed, failed and pending payouts; exact wallet changes; Add Money; transaction search, CSV export, receipt; wallet privacy; service navigation; Ctrl+K search; role directory; Create User; duplicate member rejection; profile editing; scheme and parent assignment; all informational profile tabs; collapsible sidebar; ambient motion pause/resume; demo reset; service hover with stable icons; scroll progress/reveal; reduced-motion setting. All passed in the executed browser suite. No JavaScript page errors observed.
- Static syntax and identifier/import spot check: the compiler's syntax, missing-name and missing-export diagnostic categories were checked; no matching diagnostics. This is not a complete TypeScript type check; the project uses JavaScript and JSX.

## Build limitations

`npm ci` was attempted but failed in the execution environment; the uploaded `node_modules` contained Windows-only Vite native binaries. `npm run build` was attempted and could not find an installed Vite executable. Production Vite build remains unverified. The source lockfile is retained and the ZIP deliberately excludes node_modules. On your machine run `npm ci`, then `npm run build`.

The preview uses the actual uploaded React 18 runtime rather than the legacy React 16 runtime from earlier prototype exports. Browser tests are against that preview, not a Vite dev server. Full cross-browser, accessibility, security, performance and Laravel sandbox integration remain pending. No real transactions, credentials or identity data were used.

## Reproduce checks

Run `npm test` for pure JavaScript tests. To run browser tests against the Vite frontend, start `npm run dev` in another terminal. Install optional Python Playwright (`python -m pip install playwright` and `python -m playwright install chromium`), set `NYRO_TEST_URL` if Vite uses a different port, and run `python tests/browser/smoke.py`. Alternatively set `NYRO_PREVIEW_HTML` to the offline preview path. The smoke test uses fictional local records only and must not be run against production systems.
