# EnergyMixApp Frontend

React frontend for the EnergyMix recruitment task. The application displays the current and forecast UK electricity generation mix, highlights clean energy sources, and calculates the cleanest electric vehicle charging window by using data from the EnergyMix backend API.

This repository contains only the frontend. The API and calculation logic are maintained in a separate backend repository.

## Related Repositories

* Frontend: https://github.com/Kazume23/EnergyMix-Frontend
* Backend API: https://github.com/Kazume23/EnergyMix-Backend

## Deployed Application

* Frontend: https://energymix-frontend-hju7.onrender.com
* Backend API: https://energymix-backend-wsuq.onrender.com
* Author GitHub: https://github.com/Kazume23

## Features

* Displays the UK energy mix for today, tomorrow, and the day after tomorrow.
* Shows one pie chart per day with generation source percentages.
* Displays the clean energy percentage for each day.
* Highlights clean energy sources in the source lists.
* Supports EV charging duration selection from 1 to 6 full hours.
* Calculates and displays the cleanest charging window returned by the backend.
* Shows the averaged generation mix for the optimal charging window.
* Supports English and Polish interface text.
* Supports light and dark mode.
* Stores selected language and theme in local storage.
* Uses a professional loading state while grid data is being fetched.
* Displays a minimalist footer with an author signature and GitHub profile link.
* Handles API timeouts, aborted requests, and invalid API response shapes.

Clean energy sources for this task:

```text
biomass
nuclear
hydro
wind
solar
```

## Technology Stack

* React
* TypeScript
* Vite
* Recharts
* i18next / react-i18next
* Lucide React

## Frontend Structure

```text
src/api          API client, endpoint functions, and response validation
src/components   Presentational UI components
src/constants    Shared app constants
src/hooks        Application workflows and side effects
src/i18n         Translation resources and i18next setup
src/types        Shared TypeScript types
src/utils        Formatting, preferences, and source helpers
```

`src/application.tsx` is intentionally kept as the application composition layer. Data loading, charging-window workflow, and user preferences are handled in dedicated hooks.

## Backend API

The frontend expects the backend to expose these endpoints:

```http
GET /api/carbon/daily-mix
```

Returns averaged generation mix data for today, tomorrow, and the day after tomorrow.

Expected response shape:

```ts
type DailyEnergyMix = {
  date: string
  cleanEnergyPercentage: number
  sources: {
    fuel: string
    percentage: number
  }[]
}
```

```http
GET /api/carbon/optimal-charging-window?hours=3
```

Returns the optimal charging window for the selected duration, including the averaged generation mix for that exact window.

Expected response shape:

```ts
type OptimalChargingWindow = {
  start: string
  end: string
  averageCleanEnergyPercentage: number
  sources: {
    fuel: string
    percentage: number
  }[]
}
```

## Environment Configuration

For local development, the Vite development server proxies `/api` requests to the local backend configured in `vite.config.ts`:

```text
https://localhost:7008
```

For deployed environments, set:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

Current production backend URL:

```env
VITE_API_BASE_URL=https://energymix-backend-wsuq.onrender.com
```

When `VITE_API_BASE_URL` is not set, requests are made to `/api/...`, which allows the Vite proxy to forward them to the local backend during development.

## Requirements

* Node.js 24.x
* npm
* Running EnergyMix backend API

## Running Locally

Install dependencies:

```bash
npm install
```

Start the backend first according to the backend repository instructions:

```text
https://github.com/Kazume23/EnergyMix-Backend
```

Run the frontend development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

```bash
npm run dev
npm run build
npm run typecheck
npm run lint
npm run audit
npm run preview
```

## Production Checks

Before deploying, run:

```bash
npm run lint
npm run typecheck
npm run audit
npm run build
```

## Continuous Integration

GitHub Actions validates the frontend on pushes and pull requests to `main`.

The workflow:

* installs dependencies with `npm ci`,
* audits dependencies with `npm run audit`,
* runs ESLint,
* runs TypeScript type checking,
* builds the production bundle.

## Notes

The frontend focuses on the recruitment-task requirements: daily energy mix visibility, clean energy percentage, and EV charging optimization. The backend is responsible for fetching Carbon Intensity API data and calculating averaged source shares.
