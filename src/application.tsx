import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import {
  getDailyEnergyMix,
  getOptimalChargingWindow,
  isAbortError,
} from './api/carbon-api'
import { ChargingSection } from './components/charging-section'
import { DailyMixGrid } from './components/daily-mix-grid'
import { PageHeader } from './components/page-header'
import { TaskRules } from './components/task-rules'
import {
  maximumChargingHours,
  minimumChargingHours,
} from './constants/app-config'
import type { DailyEnergyMix, OptimalChargingWindow } from './types/energy-mix'
import type { ChargingWindowError, Theme } from './types/settings'
import {
  getNextLanguage,
  getStoredTheme,
  getSupportedLanguage,
  storeLanguage,
  storeTheme,
} from './utils/preferences'
import './application.css'

function App() {
  const { i18n, t } = useTranslation()
  const language = getSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)

  const [theme, setTheme] = useState<Theme>(getStoredTheme)
  const [dailyEnergyMix, setDailyEnergyMix] = useState<DailyEnergyMix[]>([])
  const [isDailyMixLoading, setIsDailyMixLoading] = useState(true)
  const [hasDailyMixError, setHasDailyMixError] = useState(false)

  const [chargingHours, setChargingHours] = useState(3)
  const [chargingWindow, setChargingWindow] =
    useState<OptimalChargingWindow | null>(null)
  const [isChargingWindowLoading, setIsChargingWindowLoading] = useState(false)
  const [chargingWindowError, setChargingWindowError] =
    useState<ChargingWindowError | null>(null)
  const chargingRequestController = useRef<AbortController | null>(null)

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

  useEffect(() => {
    storeLanguage(language)
  }, [language])

  useEffect(() => {
    storeTheme(theme)
  }, [theme])

  useEffect(() => {
    return () => {
      chargingRequestController.current?.abort()
    }
  }, [])

  function handleChargingHoursChange(hours: number) {
    setChargingHours(hours)
    setChargingWindowError(null)
  }

  function handleLanguageToggle() {
    void i18n.changeLanguage(getNextLanguage(language))
  }

  function handleThemeToggle() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  async function handleChargingWindowSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      chargingHours < minimumChargingHours ||
      chargingHours > maximumChargingHours
    ) {
      setChargingWindowError('range')
      setChargingWindow(null)
      return
    }

    chargingRequestController.current?.abort()
    const requestController = new AbortController()
    chargingRequestController.current = requestController

    try {
      setIsChargingWindowLoading(true)
      setChargingWindowError(null)

      const optimalWindow = await getOptimalChargingWindow(chargingHours, {
        signal: requestController.signal,
      })

      if (requestController.signal.aborted) {
        return
      }

      setChargingWindow(optimalWindow)
    } catch (error) {
      if (requestController.signal.aborted || isAbortError(error)) {
        return
      }

      setChargingWindowError('request')
      setChargingWindow(null)
    } finally {
      if (chargingRequestController.current === requestController) {
        chargingRequestController.current = null
        setIsChargingWindowLoading(false)
      }
    }
  }

  if (isDailyMixLoading) {
    return (
      <main className="page status-page" data-theme={theme}>
        {t('loading')}
      </main>
    )
  }

  if (hasDailyMixError) {
    return (
      <main className="page error-message" data-theme={theme}>
        {t('dailyError')}
      </main>
    )
  }

  return (
    <main className="page" data-theme={theme}>
      <PageHeader
        theme={theme}
        onLanguageToggle={handleLanguageToggle}
        onThemeToggle={handleThemeToggle}
      />

      <TaskRules />

      <ChargingSection
        chargingHours={chargingHours}
        chargingWindow={chargingWindow}
        error={chargingWindowError}
        isLoading={isChargingWindowLoading}
        onChargingHoursChange={handleChargingHoursChange}
        onSubmit={handleChargingWindowSubmit}
      />

      <DailyMixGrid dailyEnergyMix={dailyEnergyMix} />
    </main>
  )
}

export default App
