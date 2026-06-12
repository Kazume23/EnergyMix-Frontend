# EnergyMix Frontend

Frontend for a recruitment task that displays the current and forecast UK energy generation mix and helps users find the cleanest electric vehicle charging window.

The app consumes a backend API that aggregates data from the public Carbon Intensity API.

## Features

* Shows the UK energy mix for three days: today, tomorrow, and the day after tomorrow.
* Displays one pie chart per day with source percentages and clean energy share.
* Labels each daily card with its relative day, so the three columns are easy to read.
* Calculates the cleanest EV charging window for a selected duration from 1 to 6 full hours.
* Displays the averaged generation mix for the selected optimal charging window.
* Uses the task definition of clean energy: biomass, nuclear, hydro, wind, and solar.
* Supports English and Polish UI language switching.
* Supports light and dark mode.
* Saves the selected language and theme in local storage.

## Technology Stack

* React
* TypeScript
* Vite
* Recharts

## Backend API

The frontend expects two backend endpoints:

```http
GET /api/carbon/daily-mix
```

Returns the averaged generation mix for today, tomorrow, and the day after tomorrow.

```http
GET /api/carbon/optimal-charging-window?hours=3
```

Returns the best charging window for the selected duration, including start time, end time, average clean energy percentage, and averaged source shares for that window.

## Environment Configuration

For local development, Vite proxies `/api` requests to the backend configured in `vite.config.ts`:

```text
https://localhost:7008
```

For deployed environments, set:

```env
VITE_API_BASE_URL=https://your-backend-url.com
```

When `VITE_API_BASE_URL` is not set, requests are made to `/api/...`, which allows the local Vite proxy to handle them.

## Running Locally

Install dependencies:

```bash
npm install
```

Start the backend according to the backend repository instructions.

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
npm run lint
npm run preview
```

## Notes

The frontend is intentionally focused on the requirements from the recruitment task: daily mix visibility, clean energy percentage, and EV charging optimization based on half-hour forecast intervals processed by the backend.
