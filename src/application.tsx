import { useEffect, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { getDailyEnergyMix, getOptimalChargingWindow } from './api/carbon-api'
import { ChargingSection } from './components/charging-section'
import { DailyMixGrid } from './components/daily-mix-grid'
import { PageHeader } from './components/page-header'
import { TaskRules } from './components/task-rules'
import { languageStorageKey, themeStorageKey } from './constants/app-config'
import type { DailyEnergyMix, OptimalChargingWindow } from './types/energy-mix'
import type { ChargingWindowError, Theme } from './types/settings'
import {
  getNextLanguage,
  getStoredTheme,
  getSupportedLanguage,
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

  useEffect(() => {
    async function loadDailyEnergyMix() {
      try {
        const energyMix = await getDailyEnergyMix()
        setDailyEnergyMix(energyMix)
      } catch {
        setHasDailyMixError(true)
      } finally {
        setIsDailyMixLoading(false)
      }
    }

    loadDailyEnergyMix()
  }, [])

  useEffect(() => {
    localStorage.setItem(languageStorageKey, language)
  }, [language])

  useEffect(() => {
    localStorage.setItem(themeStorageKey, theme)
  }, [theme])

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

    if (chargingHours < 1 || chargingHours > 6) {
      setChargingWindowError('range')
      setChargingWindow(null)
      return
    }

    try {
      setIsChargingWindowLoading(true)
      setChargingWindowError(null)

      const optimalWindow = await getOptimalChargingWindow(chargingHours)
      setChargingWindow(optimalWindow)
    } catch {
      setChargingWindowError('request')
      setChargingWindow(null)
    } finally {
      setIsChargingWindowLoading(false)
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
