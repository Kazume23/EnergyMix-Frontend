import { useEffect, useState } from 'react'
import { getDailyEnergyMix, isAbortError } from '../api/carbon-api'
import type { DailyEnergyMix } from '../types/energy-mix'

export function useDailyEnergyMix() {
  const [dailyEnergyMix, setDailyEnergyMix] = useState<DailyEnergyMix[]>([])
  const [isDailyMixLoading, setIsDailyMixLoading] = useState(true)
  const [hasDailyMixError, setHasDailyMixError] = useState(false)

  useEffect(() => {
    const dailyMixController = new AbortController()
    let shouldIgnoreResult = false

    async function loadDailyEnergyMix() {
      try {
        const energyMix = await getDailyEnergyMix({
          signal: dailyMixController.signal,
        })

        if (shouldIgnoreResult) {
          return
        }

        setDailyEnergyMix(energyMix)
        setHasDailyMixError(false)
      } catch (error) {
        if (shouldIgnoreResult || isAbortError(error)) {
          return
        }

        setHasDailyMixError(true)
      } finally {
        if (!shouldIgnoreResult) {
          setIsDailyMixLoading(false)
        }
      }
    }

    loadDailyEnergyMix()

    return () => {
      shouldIgnoreResult = true
      dailyMixController.abort()
    }
  }, [])

  return {
    dailyEnergyMix,
    isDailyMixLoading,
    hasDailyMixError,
  }
}
