import { useEffect, useState } from 'react'
import { getDailyEnergyMix } from './api/carbonApi'
import type { DailyEnergyMix } from './types/energyMix'
import './App.css'

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
    return <main>Loading energy mix...</main>
  }

  if (errorMessage) {
    return <main>{errorMessage}</main>
  }

  return (
    <main>
      <h1>UK Energy Mix</h1>

      <pre>{JSON.stringify(dailyEnergyMix, null, 2)}</pre>
    </main>
  )
}

export default App