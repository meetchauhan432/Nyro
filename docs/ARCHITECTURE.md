# Frontend architecture

## Why feature-based modules?

In the supplied V6, `src/app.js` contained the app shell, all page render methods, payment forms, member forms, the global state and workflow methods. `src/styles.css` held all features plus version-specific overrides. Editing one concern required searching both large files. V7 replaces the original files, rather than leaving duplicates alongside the new architecture.

```
src/
  main.jsx                      React entry point
  app/
    App.jsx                     Composition and feature navigation
    navigation.js               Menu configuration
    components/                 Workspace dialogs and dialog dispatcher
    hooks/                      Layout state, focus, shortcuts, scroll setup
  features/
    dashboard/                  Overview page, cash-flow widget, sample chart data
    wallets/                    Wallet panel, animated balance hook, sample balances
    services/                   Service launcher and service definitions
    payments/
      components/steps/         Separate customer, beneficiary, amount, review, result
      hooks/                    Demo finance state and submission lifecycle
      domain/                   Pure amount/fee validation
      services/                 Pure local ledger transitions (demo only)
      mocks/                    Fictional beneficiaries
      payments.css
    transactions/               Transaction page/list/receipt, filters, CSV, hooks, mocks
    members/
      pages/                    Directory and profile pages
      components/               Directory table, filters, summary, form
      components/profile/       Individual profile tabs
      hooks/                    Member state and editing lifecycle
      domain/                   Role names and member filters
      services/                 Local member rules and record creation
      mocks/                    Fictional directory records
      directory.css
      member-form.css
      profile.css
  shared/
    api/                        Configurable JSON transport and error type
    hooks/                      Small generic state and motion utilities
    layout/                     Sidebar, header, role navigation, scoped layout CSS
    lib/                        Currency and initials helpers
    ui/                         Buttons, form fields, drawer, icons, common UI CSS
  styles/                       Tokens, base, overlays, global motion and import order
```

Feature pages consume only their relevant state/actions. `App.jsx` composes the hooks, passes the feature slices to their pages and coordinates navigation and dialogs; domain functions do not import React. Member state is separate from payments. Wallet and transaction records share one demo ledger hook intentionally so a simulated payment changes both atomically. Display-only animation is separate from the integer-paise amount used by finance rules. Transaction list filtering and export are pure utilities.

### Dependency direction

`app` → feature pages/hooks + shared layout. Feature components → own domain/hooks/services + reusable shared UI. Cross-feature composition (e.g. the dashboard using the wallet panel and transaction list) is allowed. `shared/layout/RoleNavigation.jsx` reads the member role configuration for the sidebar. `shared/api`, `shared/lib` and generic UI must not depend on `app` or feature business rules. Do not import the app root into a feature.

### Adding a new feature

1. Create a folder in `src/features/<feature>/` for the actual page and components. Add `hooks`, `domain`, `services`, `api` or `mocks` only when needed, not empty boilerplate.
2. Put data validation and mapping in pure domain functions, network calls in the approved feature API adapter, and UI state in its hook. Use `shared/ui` for buttons/forms and `shared/lib/money.js` for integer-paise display.
3. Add the approved navigation entry to `src/app/navigation.js`, register the page in `App.jsx` and add its real permission checks after the backend contract is known. Existing navigation is in-memory, as in V6; production URL routing, deep links and authenticated route guards remain future work.
4. Put feature styles next to the feature and import them through `src/styles/index.css`. The stylesheet import order intentionally preserves the V6 cascade. Keep global styles in `styles/` and header/sidebar styles in their layout files.
5. Add Node tests in `tests/` for pure logic; extend `tests/browser/smoke.py` when the UI behavior changes. Run tests and review desktop/mobile views.

### Style conventions

- Use named component exports, JSX, two-space indentation and explicit props. Name files after their component or domain concern.
- Use readable state and event names. Feature hooks own mutations; page components coordinate visual presentation only. Do not duplicate a hook's business rules in JSX.
- Monetary values in the demo are integer paise. Use the server's approved decimal/units contract and adapters in production; never rely on an animated value for financial validation.
- `tokens.css` is the shared theme foundation. Feature CSS preserves the tested local responsive and interaction rules. Some intentional cascade overrides remain to keep exact V6 appearance; do not rewrite them indiscriminately.
