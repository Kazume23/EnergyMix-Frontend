# EnergyMix Frontend

The application displays the UK energy generation mix and allows the user to find the best electric vehicle charging window based on the highest average share of clean energy.

## Technologies

* React
* TypeScript
* Vite
* Recharts

## Features

* Displays daily UK energy mix for three days: today, tomorrow and the day after tomorrow.
* Shows one pie chart per day.
* Displays clean energy percentage for each day.
* Allows the user to enter EV charging duration from 1 to 6 full hours.
* Fetches and displays the optimal charging window from the backend API.

Clean energy sources used by the backend:

```text
biomass
nuclear
hydro
wind
solar
```

## Backend API

The frontend expects the backend to be running locally.

Required backend endpoints:

```http
GET /api/carbon/daily-mix
```

```http
GET /api/carbon/optimal-charging-window?hours=3
```

During local development, Vite proxy forwards `/api` requests to the backend.

## Running the project

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Local development setup

Run the backend first, then start the frontend.

Backend:

```bash
dotnet run --project EnergyMix.Backend/EnergyMix.Backend.csproj
```

Frontend:

```bash
npm run dev
```
