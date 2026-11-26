# NYRO Technologies — Modular Financial Workspace (V7)

React 18 + Vite 6 frontend for NYRO Technologies. AquaPay is a functional reference only. The V6 visual design, layout, brand assets and prototype workflows are retained; the implementation is reorganized into feature modules. All data is fictional. No production API is connected and no money moves.

## Get started

Use Node.js 22.12+ (or a compatible supported Node.js release) and npm. From this directory:

```bash
npm ci
npm run dev
```

Open the URL Vite prints. The usual default is `http://localhost:5173`. If npm installation fails, check your network and Node version; do not copy another machine's `node_modules` directory. The source ZIP includes the existing package lock, not installed dependencies.

```bash
npm test          # Pure Node.js unit tests; no extra test dependency
npm run build     # Build Vite production assets into dist/
npm run preview   # Serve the built frontend for review
```

The separately supplied `NYRO-Modular-Preview.html` is an offline review artifact compiled from these JSX modules with React 18 from the original upload. It is not the Vite build or a deployable fintech system. Edit the source in this project, not the standalone preview.

## Where to work

| Task | File or folder |
| --- | --- |
| Change brand colors and animation tokens | `src/styles/tokens.css` |
| Modify sidebar, navigation, logo | `src/shared/layout/Sidebar.jsx`, `RoleNavigation.jsx`, `sidebar.css`, `src/app/navigation.js`, `public/nyro-logo.png` |
| Modify top bar or layout | `src/shared/layout/Header.jsx`, `header.css`, `workspace.css` |
| Change wallet balance animations | `src/features/wallets/hooks/useAnimatedBalance.js`, `wallets.css` |
| Edit dashboard | `src/features/dashboard/pages/OverviewPage.jsx`, `dashboard.css` |
| Edit quick services | `src/features/services/components/ServiceLauncher.jsx`, `config/services.js` |
| Change payout stages | `src/features/payments/components/steps/` |
| Fix wallet/payout state or amount validation | `src/features/payments/hooks/useDemoFinance.js`, `domain/paymentRules.js`, `services/demoFinanceService.js` |
| Edit member table / filters / creation | `src/features/members/components/`, `pages/MembersPage.jsx`, `directory.css`, `member-form.css` |
| Edit individual profile tabs | `src/features/members/components/profile/`, `profile.css` |
| Fix member role/parent validation | `src/features/members/domain/roles.js`, `services/demoMemberService.js` |
| Edit transaction search, sort or CSV | `src/features/transactions/domain/transactionFilters.js`, `hooks/useTransactions.js` |
| Edit scroll effects | `src/shared/hooks/scrollMotion.js`, `src/styles/motion.css`, `shared/layout/header.css` |
| Integrate approved Laravel API | `src/shared/api/` and the relevant feature's future API adapter |

See [Architecture](docs/ARCHITECTURE.md) for module boundaries, [Laravel integration](docs/LARAVEL_INTEGRATION.md) for the handoff, and [Verification](docs/VERIFICATION.md) for what has actually been tested.

## Demo flows

- Payout: enter fictional customer `9000000000`, select a beneficiary, enter an amount, review the fictional ₹10 fee, select a simulated outcome and explicitly confirm. Completed/pending debits include the fee; failed payouts do not debit. No real gateway is involved.
- Add Money: a simulated top-up updates the in-memory wallet and transaction list.
- Transactions: search, status filter, amount sort, pagination, CSV and receipt details.
- Users & roles: SA → NSM → SH → CNF → MD → DT → RT, member filtering, local member creation, editable profile, scheme and immediate-parent assignment. Use fictional `90000xxxxx` mobiles and `@example.invalid` email addresses. The role mapping is illustrative, not an approved access-control policy.
- Security, KYC upload, wallet lock and device mapping remain informational. Credit card payment and RuPay UPI remain clearly marked as unconnected reference services.
- All values reset on refresh or demo reset. The money-flow chart is an illustrative fixed sample, not a derived live financial report.

## Team rules

Keep feature-specific logic in its feature. Share only genuinely reusable UI/utilities. Use named exports and PascalCase JSX files. Use `@features`, `@shared`, and `@app` aliases configured consistently in Vite and VS Code. Do not hardcode production routes or secrets; do not expose real PII. Keep frontend changes separate from Laravel business logic. Update `DEVELOPMENT_PROGRESS.md` and relevant tests when changing behavior. No Git push, merge or deployment has been performed.
