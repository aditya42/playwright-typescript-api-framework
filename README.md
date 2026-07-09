# Playwright TypeScript API Automation Framework

API automation framework using Playwright Test, TypeScript, reusable API clients, environment configuration, tagging, HTML/JSON reporting, linting, type checking, and GitHub Actions CI.

Playwright supports API testing through `APIRequestContext`, which can send HTTP requests directly from the test runner. This framework uses that model so API tests can run without launching a browser and can share the same Playwright reporting and CI workflow as UI tests.

## Tech Stack

- Playwright Test
- TypeScript
- Node.js 22
- ESLint
- Prettier
- GitHub Actions

## Folder Structure

```text
playwright-typescript-api-framework/
├── .github/workflows/api-tests.yml
├── src/
│   ├── clients/
│   │   ├── base.api-client.ts
│   │   └── posts.api-client.ts
│   ├── config/
│   │   └── env.config.ts
│   ├── models/
│   │   └── post.model.ts
│   └── utils/
│       ├── random.util.ts
│       └── response.util.ts
├── mock-api-server.cjs
├── tests/
│   ├── api/
│   │   └── posts.api.spec.ts
│   └── data/
│       └── post.data.ts
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Automated Test Cases Included

The sample tests use a built-in local mock API by default, so the framework is reliable in local and CI runs. You can switch to a real API by setting `BASE_URL`, for example JSONPlaceholder.

| Test | Tag |
| --- | --- |
| GET `/posts` returns list of posts | `@smoke @regression` |
| GET `/posts/1` returns post details | `@smoke` |
| POST `/posts` creates a post | `@regression` |
| PUT `/posts/1` updates a post | `@regression` |
| PATCH `/posts/1` partially updates a post | `@regression` |
| DELETE `/posts/1` deletes a post | `@regression` |

## Setup

```bash
npm install
cp .env.example .env
```

Update `.env` if you want to run against another API base URL. Leave `BASE_URL` commented to use the built-in mock API.

```env
ENV=qa
# BASE_URL=https://jsonplaceholder.typicode.com
```

Start the mock API manually if needed:

```bash
npm run start:mock-api
```

During `npm run test:api`, Playwright automatically starts the mock API through the `webServer` configuration.

## Run Tests

Run all tests:

```bash
npm test
```

Run only API tests:

```bash
npm run test:api
```

Run smoke tests:

```bash
npm run test:smoke
```

Run regression tests:

```bash
npm run test:regression
```

Open HTML report:

```bash
npm run report
```

## Quality Checks

```bash
npm run typecheck
npm run lint
npm run format
```

## GitHub Actions

The workflow is available at:

```text
.github/workflows/api-tests.yml
```

It runs on:

- Pull requests to `main`
- Pushes to `main`
- Manual workflow dispatch with environment input

CI performs:

1. Checkout
2. Node.js 22 setup
3. `npm ci`
4. TypeScript check
4. ESLint check
5. Playwright API test execution
6. Upload Playwright HTML and JSON reports

## How to Extend

For a new API domain, add:

1. A model under `src/models/`
2. A client under `src/clients/`
3. Test data builder under `tests/data/`
4. Spec file under `tests/api/`

Recommended naming convention:

```text
src/clients/orders.api-client.ts
tests/api/orders.api.spec.ts
```

## Notes

The built-in mock API is intentionally simple and deterministic. Replace `BASE_URL` and client endpoints when connecting this framework to your real application APIs.
