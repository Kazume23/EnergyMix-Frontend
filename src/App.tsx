import { useEffect, useState, type FormEvent } from 'react'
import { getDailyEnergyMix, getOptimalChargingWindow } from './api/carbonApi'
import { EnergyMixPieChart } from './components/EnergyMixPieChart'
import type { DailyEnergyMix, OptimalChargingWindow } from './types/energyMix'
import './App.css'

const fuelLabels: Record<string, string> = {
  biomass: 'Biomass',
  coal: 'Coal',
  gas: 'Gas',
  hydro: 'Hydro',
  imports: 'Imports',
  nuclear: 'Nuclear',
  other: 'Other',
  solar: 'Solar',
  wind: 'Wind',
}

function formatMixDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date(date))
}

function formatWindowDate(date: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

function App() {
  const [dailyEnergyMix, setDailyEnergyMix] = useState<DailyEnergyMix[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [chargingHours, setChargingHours] = useState(3)
  const [chargingWindow, setChargingWindow] = useState<OptimalChargingWindow | null>(null)
  const [isChargingWindowLoading, setIsChargingWindowLoading] = useState(false)
  const [chargingWindowError, setChargingWindowError] = useState<string | null>(null)

  useEffect(() => {
    async function loadDailyEnergyMix() {
      try {
        const energyMix = await getDailyEnergyMix()
        setDailyEnergyMix(energyMix)
      } catch {
        setErrorMessage('Could not load the UK energy mix.')
      } finally {
        setIsLoading(false)
      }
    }

    loadDailyEnergyMix()
  }, [])

  async function handleChargingWindowSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (chargingHours < 1 || chargingHours > 6) {
      setChargingWindowError('Charging duration must be between 1 and 6 hours.')
      setChargingWindow(null)
      return
    }

    try {
      setIsChargingWindowLoading(true)
      setChargingWindowError(null)

      const optimalWindow = await getOptimalChargingWindow(chargingHours)
      setChargingWindow(optimalWindow)
    } catch {
      setChargingWindowError('Could not calculate the optimal charging window.')
      setChargingWindow(null)
    } finally {
      setIsChargingWindowLoading(false)
    }
  }

  if (isLoading) {
    return <main className="page status-page">Loading grid data...</main>
  }

  if (errorMessage) {
    return <main className="page error-message">{errorMessage}</main>
  }

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Jakub Witek / Carbon Intensity API</p>
        <h1>UK energy mix planner</h1>
        <p>
          Current and forecast generation mix for Great Britain, plus the cleanest
          charging window for an electric vehicle. The interface follows the task
          brief: three daily pie charts and a 1-6 hour charging calculation.
        </p>
      </header>

      <section className="task-rules" aria-label="Task rules">
        <p>
          <strong>Clean energy in this task:</strong> biomass, nuclear, hydro,
          wind and solar.
        </p>
        <p>
          <strong>Charging window:</strong> calculated from half-hour forecast
          intervals across the next two days.
        </p>
      </section>

      <section className="daily-mix-grid">
        {dailyEnergyMix.map((dayMix) => (
          <article className="daily-mix-card" key={dayMix.date}>
            <div className="card-header">
              <h2>{formatMixDate(dayMix.date)}</h2>
              <span>{dayMix.cleanEnergyPercentage}% clean energy</span>
            </div>

            <EnergyMixPieChart sources={dayMix.sources} />

            <ul className="source-list">
              {dayMix.sources.map((source) => (
                <li key={source.fuel}>
                  <span>{fuelLabels[source.fuel] ?? source.fuel}</span>
                  <strong>{source.percentage}%</strong>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="charging-section">
        <p className="eyebrow">EV charging</p>
        <h2>Find the cleanest charging window</h2>
        <p>Enter a full-hour charging duration between 1 and 6 hours.</p>

        <form className="charging-form" onSubmit={handleChargingWindowSubmit}>
          <label htmlFor="charging-hours">Charging duration</label>

          <div className="charging-controls">
            <input
              id="charging-hours"
              type="number"
              min="1"
              max="6"
              value={chargingHours}
              onChange={(event) => setChargingHours(Number(event.target.value))}
            />

            <button type="submit" disabled={isChargingWindowLoading}>
              {isChargingWindowLoading ? 'Calculating...' : 'Find window'}
            </button>
          </div>
        </form>

        {chargingWindowError && (
          <p className="error-message">{chargingWindowError}</p>
        )}

        {chargingWindow && (
          <div className="charging-result">
            <p>
              <strong>Start:</strong> {formatWindowDate(chargingWindow.start)}
            </p>
            <p>
              <strong>End:</strong> {formatWindowDate(chargingWindow.end)}
            </p>
            <p>
              <strong>Average clean energy:</strong>{' '}
              {chargingWindow.averageCleanEnergyPercentage}%
            </p>
          </div>
        )}
      </section>
    </main>
  )
}

export default App
