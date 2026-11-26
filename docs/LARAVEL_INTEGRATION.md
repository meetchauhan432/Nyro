# Laravel backend integration plan

The company backend uses PHP/Laravel, but the actual Postman collection, routes, API responses, auth mode, roles, server validation and deployment origins have not been provided. No endpoint is invented. No Laravel files have been added, changed or called. The React frontend remains a separate Vite SPA and uses fictional in-memory data.

## Prepared boundary

- `src/shared/api/httpClient.js`: dependency-injectable fetch transport for JSON and FormData; relative endpoints under a configured base URL, headers, query parameters, credentials policy, request cancellation, normalized `ApiError` with HTTP status and Laravel-shaped 422 field errors. Handles non-JSON success, network failures and empty 204 responses. No payment retry or automatic refresh behavior is added.
- `src/shared/api/client.js`: unconnected client using the `VITE_API_BASE_URL` public environment variable. It fails safely when no URL has been configured. There are no live API callers.
- `src/features/payments/services/demoFinanceService.js` and `src/features/members/services/demoMemberService.js`: currently used local demo services. Keep them isolated from real API adapters and remove/disable the demo path when production mode is developed. Do not send fictional ledger changes to Laravel.

## Before wiring live endpoints

Obtain approved Postman collection/OpenAPI specification, API base URL and deployment origins, exact request/response schemas and units, error codes, authentication/authorization rules, KYC upload requirements, fee and commission rules, wallet/settlement semantics, idempotency and status reconciliation contract. Use a sanitized sandbox API, not production. Document endpoints and roles in a team-approved contract before adding feature API modules.

## Authentication and browser security

Do not assume Laravel Sanctum, Passport, JWT or another auth mechanism. If the team confirms Sanctum cookie-based SPA authentication, configure the exact approved stateful domain, CORS credentials, CSRF initialization and XSRF header behavior. `credentials: 'include'` alone is insufficient; use the confirmed contract and deployment settings. If the backend instead uses bearer tokens, add an approved session/credential strategy and header injection; avoid putting secrets in Vite variables or source control. Do not store production tokens in localStorage without a security review. Authentication is not implemented here.

Treat 401 as unauthenticated, 403 as denied, 419 as a possible session/CSRF issue subject to the backend contract, 422 as field validation, 429 as rate limiting, and 5xx as generic server errors. Map them to accessible error UI and don't expose raw stack traces. Never retry state-changing financial requests automatically.

## Migration sequence

1. Add real feature adapters using the approved routes only. API transport belongs to shared/api; per-feature response mapping belongs to that feature.
2. Add authentication/session provider and authorized URL routing. Laravel enforces permissions on every request, not the sidebar role filters.
3. Replace fictional member lists and wallet reads with approved APIs; keep loading, empty and error states explicit. Implement server-side pagination/filtering based on actual contracts.
4. Integrate writes with validated requests, duplicate-submission protection, idempotency, backend-confirmed amounts and status. The UI must not assume success from a request being accepted or mutate real balances optimistically. Pending outcomes require approved status reconciliation.
5. Integrate profile, KYC, schemes and secure uploads only after authorization and workflow review.
6. Test against sandbox using contract tests and browser checks. Complete accessibility, performance, cross-browser and financial security reviews before deployment.

## Local environment

Copy `.env.example` to `.env.local` after the approved API base is known. `VITE_*` values are exposed to browsers; never put payment secrets or private keys there. The example intentionally has a blank base URL. Dev proxy/CORS rules depend on the actual Laravel deployment and are not guessed.
