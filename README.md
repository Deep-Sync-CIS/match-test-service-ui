# Match Test Service UI

A React UI for the Match Test Service within DeepSync Core. It provides overview and run flows for match reports, connections, and intelligence views. Built with Vite, React, TypeScript, and Module Federation for embedding in the main DeepSync Core UI.

## Features

- **Overview** – Dashboard with KPIs, match history, and job details
- **Run Match Report** – Run and configure match reports (PII, digital, transaction)
- **Connections** – Manage connections
- **Preparing Match Report** – Preparing-report flow
- **Intelligence** – Intelligence views

## Tech Stack

- **Vite** + **React 18** + **TypeScript**
- **React Router** (relative routes for host embedding)
- **Zustand** (match report & filter state)
- **TanStack React Query** (data fetching)
- **Recharts** (charts)
- **Module Federation** – exposes `./App` for the host shell

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

App is served at `http://localhost:3002/match-test-service/` (port may vary).

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint & format

```bash
npm run lint
npm run format        # format
npm run format:check  # check only
```

## Hosting & deployment

- The app is built to be served under **`/match-test-service/`** (Vite `base` in `vite.config.ts`). If the hosting path changes, update `base` there.
- **Deploy** to S3 and invalidate CloudFront:

  ```bash
  npm run deploy
  ```

  Optional env vars (see `scripts/deploy-app.sh`):

  - `STACK_NAME` – CloudFormation stack (default: `deepsync-core-ui-dev`)
  - `AWS_REGION` – AWS region (default: `us-east-1`)
  - `APP_PREFIX` – S3 path prefix (default: `match-test-service`)
  - `SKIP_BUILD=1` – Use existing `dist/` and skip build

## Embedding in the host

The host should mount the app with a route such as:

```tsx
<Route path="match-test-service/*" element={<MatchTestService />} />
```

This repo’s routes are relative (e.g. index = Overview, `run` = Run Match Report, `connections` = Connections).

## Notes

- Auth and real API integrations are intended to be wired in by the host or via env/configuration when ready.
- Shared dependencies (React, React DOM, React Router) are configured as singletons in Module Federation to align with the host.
