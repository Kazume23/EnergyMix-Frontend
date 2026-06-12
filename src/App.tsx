import { useEffect, useState, type FormEvent } from 'react'
import { getDailyEnergyMix, getOptimalChargingWindow } from './api/carbonApi'
import { EnergyMixPieChart } from './components/EnergyMixPieChart'
import type { DailyEnergyMix, OptimalChargingWindow } from './types/energyMix'
import './App.css'

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
        setErrorMessage('Could not load daily energy mix.')
      } finally {
        setIsLoading(false)
      }
    }

    loadDailyEnergyMix()
  }, [])

  async function handleChargingWindowSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (chargingHours < 1 || chargingHours > 6) {
      setChargingWindowError('Charging time must be between 1 and 6 hours.')
      setChargingWindow(null)
      return
    }

    try {
      setIsChargingWindowLoading(true)
      setChargingWindowError(null)

      const optimalWindow = await getOptimalChargingWindow(chargingHours)
      setChargingWindow(optimalWindow)
    } catch {
      setChargingWindowError('Could not calculate optimal charging window.')
      setChargingWindow(null)
    } finally {
      setIsChargingWindowLoading(false)
    }
  }

  if (isLoading) {
    return <main className="page">Loading energy mix...</main>
  }

  if (errorMessage) {
    return <main className="page error-message">{errorMessage}</main>
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1>UK Energy Mix</h1>
        <p>Daily average energy generation mix based on Carbon Intensity API data.</p>
      </header>

      <section className="daily-mix-grid">
        {dailyEnergyMix.map((dayMix) => (
          <article className="daily-mix-card" key={dayMix.date}>
            <div className="card-header">
              <h2>{dayMix.date}</h2>
              <span>{dayMix.cleanEnergyPercentage}% clean energy</span>
            </div>

            <EnergyMixPieChart sources={dayMix.sources} />

            <ul className="source-list">
              {dayMix.sources.map((source) => (
                <li key={source.fuel}>
                  <span>{source.fuel}</span>
                  <strong>{source.percentage}%</strong>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="charging-section">
        <h2>Optimal EV charging window</h2>
        <p>Choose charging duration between 1 and 6 full hours.</p>

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
              {isChargingWindowLoading ? 'Calculating...' : 'Find best window'}
            </button>
          </div>
        </form>

        {chargingWindowError && (
          <p className="error-message">{chargingWindowError}</p>
        )}

        {chargingWindow && (
          <div className="charging-result">
            <p>
              <strong>Start:</strong> {new Date(chargingWindow.start).toLocaleString()}
            </p>
            <p>
              <strong>End:</strong> {new Date(chargingWindow.end).toLocaleString()}
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