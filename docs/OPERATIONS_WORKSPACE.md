# NYRO operations workspace — architecture and demo guide

## Source references

Functional navigation and screen structure were reviewed from the supplied 16-minute AquaPay recording. The default workspace follows its wallets, services, business summary and transaction report arrangement. Master/member navigation, profile tabs, scheme/product configuration, add-money and payout flows are also reflected. NexLink's public demo was consulted for component patterns; the implementation uses the existing project's React/Bootstrap components and original styles. No actual identities, balances, credentials or API response contents from the recording were included.

## Where to work

- `src/app/navigation.js`: grouped route registry and demo visibility.
- `src/app/App.jsx`: shell composition, route selection, mobile/desktop navigation.
- `src/shared/layout/`: header, page search and collapsible sidebar.
- `src/features/operations/domain/demoWorkspace.js`: seed data, transaction state transition, filtering and formatting.
- `src/features/operations/WorkspaceContext.jsx`: session-memory workspace state.
- `src/features/operations/pages/OperationsDashboard.jsx`: wallet/service overview, report and analytics.
- `src/features/operations/pages/PaymentPage.jsx`: four local simulation workflows.
- `src/features/operations/components/`: reusable report and drawer.
- `src/features/members/MembersPage.jsx`: role directories and profile tabs.
- `src/features/masters/SchemesPage.jsx`: demo scheme and product editor.
- `src/styles/operations.css`: workspace-only layout, tokens and responsive/motion styles.
- `src/features/auth/`: unchanged approved login and OTP.

## Demo walkthrough

1. Use demo details, sign in and enter OTP `123456`.
2. On Dashboard open a wallet statement, service tile or report; all demo balances use INR.
3. Add Money: select a mock channel, wallet and amount; choose a simulated outcome. On Completed the mock balance increases. Pending/Failed does not change balances.
4. Payout: enter a fictional mobile number, find demo customer, select or add fictional beneficiary, enter amount, simulate. Review the receipt and report.
5. Members: expand Members, select a role, search/create or Manage an account. Profile, schemes, parent mapping and wallet lock can be edited in memory. No real KYC, password or device management is implemented.
6. Master > Scheme Manager > Configure: select a product, scroll the per-channel table horizontally, set fictional rates and save a row. No real calculations are executed.
7. Account menu: switch Administrator/Operator demo view or sign out. The role view switch is not access control. All operational data resets when the workspace unmounts/reloads.

## Known limitations

Master routes other than Scheme Manager are requirement placeholders; actual backend workflows for those, permissions, KYC, real card/UPI/payment flows, settlement and commissions need approved contracts. Existing Finance and Team dashboards remain their original illustrative pages; their data is separate from the operational ledger. The full original CRM default component remains in source but is not the active default route. No real transactions occur. Real commercial template use requires a suitable license. Full Vite build and real ApexCharts/Lucide rendering must be verified on the developer machine. Offline preview only approximates those dependencies.
