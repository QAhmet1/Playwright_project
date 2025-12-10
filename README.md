# Playwright Automation Suite

UI and API automation using Playwright with Page Object Model, reusable commands, Allure reports, and GitHub Actions scheduling.

## What you get
- POM-based UI flows against public demo apps (TodoMVC and The Internet login).
- API flows against DummyJSON demo API.
- Custom fixtures that expose pages/clients as reusable commands.
- Allure reporting + Playwright HTML report with one command to run and open.
- GitHub Actions workflow scheduled via cron (07:00 UTC daily) and on push/PR.

## Quick start
1. Install deps: `npm install`
2. Run everything with Allure: `npm run test:allure:open`  
   - Runs tests → generates Allure → opens the report locally.
3. Alternative runs:
   - UI only: `npm run test:ui`
   - UI headed & open HTML report: `npm run test:ui:headed:open`
   - API only: `npm run test:api`
   - CI mode (list + allure + html reporters): `npm run test:ci`
   - Open latest Playwright HTML: `npm run report:playwright`
   - Clean artifacts: `npm run clean:reports`

## Project structure
- `playwright.config.ts` — reporters (list + html + allure), retries, tracing, media retention.
- `tests/pages` — Page Objects (`TodoPage`, `LoginPage`).
- `tests/support` — shared fixtures/clients (POM + `DemoApiClient` for API).
- `tests/ui` — UI specs using POM + custom fixtures.
- `tests/api` — API specs using reusable client.
- `allure-results` / `allure-report` — generated at runtime (ignored from source).

## Allure flow
- Reporter wired in config.
- Generate: `npm run allure:generate`
- Open existing report: `npm run allure:open`
- Full flow (run + generate + open): `npm run test:allure:open`

## GitHub Actions
- Workflow: `.github/workflows/playwright.yml`
- Triggers: push, pull_request, and cron `0 7 * * *` (07:00 UTC daily).
- Artifacts: Playwright HTML + Allure report zipped for download.

## Demo targets
- UI: https://demo.playwright.dev/todomvc, https://the-internet.herokuapp.com/login
- API: https://dummyjson.com

## Environment Configuration
Create a `.env` file in the project root to configure (optional - defaults are used if not set):
- **Credentials**: `LOGIN_USER`, `LOGIN_PASS`
- **Base URLs**: `BASE_URL_TODO`, `BASE_URL_LOGIN`, `BASE_URL_API`

Example `.env`:
```
LOGIN_USER=tomsmith
LOGIN_PASS=SuperSecretPassword!
BASE_URL_TODO=https://demo.playwright.dev/todomvc
BASE_URL_LOGIN=https://the-internet.herokuapp.com/login
BASE_URL_API=https://dummyjson.com
```

All values have defaults, but env overrides allow switching environments (dev/staging/prod) without code changes.

## Notes
- Tests are written in TypeScript with strict mode on.
- Media (screenshots/video/trace) kept for failures to aid debugging.
- `.env` file is gitignored for security.

