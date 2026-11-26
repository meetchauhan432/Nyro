# NYRO Workspace — NexLink UI (V8)

React 18 + Vite 6. The UI follows the NexLink Bootstrap 5 admin template; the login → OTP → workspace flow is unchanged. All data is fictional.

## Run

```bash
npm install
npm run dev
```

Demo login: mobile `9000000000`, password `NyroDemo!` (use the "Use demo details" button). Demo OTP is shown in the OTP dialog.

## Structure

| Area | Location |
| --- | --- |
| Login + OTP flow (reducer, rules, service) | `src/features/auth/` (logic untouched; markup restyled) |
| Shell: header, sidebar, routing (`#default`, `#final`, `#team`) | `src/app/`, `src/shared/layout/` |
| Default Dashboard | `src/features/dashboard/` |
| Final (Finance) Dashboard | `src/features/finance/` |
| Team Management | `src/features/team/` |
| Shared UI (Card, Chart, DataTable, Avatar, Badge) | `src/shared/ui/` |
| Theme tokens and layout | `src/styles/theme.css`, `layout.css` |

## Notes

- The NexLink theme stylesheet, icon fonts, logo, and login background image were not supplied, so colours, spacing and fonts are approximated (Bootstrap 5.3 + custom tokens, Inter font, Lucide icons, ApexCharts via `react-apexcharts`). To match pixel-for-pixel, port the template's `styles.css` into `src/styles/` and swap `public/` assets.
- "Sign up" and "Login with Google" are shown but inactive (no such flow exists in the demo).
- Laravel handoff notes: `docs/LARAVEL_INTEGRATION.md`.
