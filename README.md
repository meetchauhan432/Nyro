# NYRO Workspace — NexLink-inspired UI — NYRO login refinement

React 18 + Vite 6. The UI follows the NexLink Bootstrap 5 admin template; the login → OTP → workspace flow is preserved, with an original NYRO ribbon hero and responsive verification dialog. All data is fictional.

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

- The workspace uses independently implemented NexLink-inspired patterns (Bootstrap 5.3 + custom tokens, Lucide icons and ApexCharts). The login artwork is original and the login logo is cropped from the supplied NYRO logo. Confirm appropriate licensing before incorporating any proprietary template assets or code.
- "Sign up" and "Login with Google" are shown but inactive (no such flow exists in the demo).
- Authentication refinement and verification: `DEVELOPMENT_PROGRESS.md`.
- Laravel handoff notes: `docs/LARAVEL_INTEGRATION.md`.
