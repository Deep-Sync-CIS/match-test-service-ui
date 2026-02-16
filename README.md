# First Part App 1

A lightweight, first-party service UI scaffold for DeepSync. This app mirrors the structure of the main DeepSync Core UI (Vite + React + TypeScript), but ships with a mocked home page and no backend calls.

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

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## Hosting notes
- The app is configured to be hosted under `/first-part-app-1` via Vite `base`.
- If the hosting path changes, update `base` in `vite.config.ts`.

## Notes
- This app is intentionally static.
- Hook into auth and API integrations when ready.
