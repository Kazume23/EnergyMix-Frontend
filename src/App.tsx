import { useEffect, useState } from 'react'
import { getDailyEnergyMix } from './api/carbonApi'
import type { DailyEnergyMix } from './types/energyMix'
import './App.css'
import { EnergyMixPieChart } from './components/EnergyMixPieChart'

function App() {
  const [dailyEnergyMix, setDailyEnergyMix] = useState<DailyEnergyMix[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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
    </main>
  )
}

export default App