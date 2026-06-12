# EnergyMix Frontend

Frontend application for the EnergyMix recruitment task. It displays the UK electricity generation mix for three days and allows the user to find the cleanest electric vehicle charging window based on data returned by the backend API.

This repository contains the React frontend. The backend API is maintained in a separate repository.

## Related Repositories

* Frontend: https://github.com/Kazume23/EnergyMix-Frontend
* Backend API: https://github.com/Kazume23/EnergyMix-Backend

## Deployed Application

* Frontend: https://energymix-frontend-hju7.onrender.com
* Backend API: https://energymix-backend-wsuq.onrender.com

## Features

* Displays the UK energy mix for today, tomorrow, and the day after tomorrow.
* Shows one pie chart per day with generation source percentages.
* Displays clean energy percentage for each day.
* Allows the user to enter EV charging duration from 1 to 6 full hours.
* Sends the selected charging duration to the backend API.
* Displays the optimal charging window returned by the backend:

  * start date and time
  * end date and time
  * average clean energy percentage

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

## Backend API

The frontend expects the backend to expose these endpoints:

```http
GET /api/carbon/daily-mix
```

Returns averaged generation mix data for today, tomorrow, and the day after tomorrow.

```http
GET /api/carbon/optimal-charging-window?hours=3
```

Returns the optimal charging window for the selected duration, including start time, end time, and average clean energy percentage.

## Environment Configuration

For local development, the Vite development server can proxy `/api` requests to the local backend configured in `vite.config.ts`:

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

When `VITE_API_BASE_URL` is not set, requests are made to `/api/...`, which allows the Vite proxy to forward them to the local backend.

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

Run TypeScript type checking:

```bash
npm run typecheck
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
npm run preview
```

## Continuous Integration

GitHub Actions validates the frontend on pushes and pull requests to `main`.
The workflow installs dependencies with `npm ci`, then runs linting, type
checking, and the production build.

## Notes

The frontend is intentionally focused on the requirements from the recruitment task: daily energy mix visibility, clean energy percentage, and EV charging optimization. The calculation logic is handled by the backend.
