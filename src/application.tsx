import { useEffect, useState, type FormEvent } from 'react'
import { getDailyEnergyMix, getOptimalChargingWindow } from './api/carbon-api'
import { ChargingSection } from './components/charging-section'
import { DailyMixGrid } from './components/daily-mix-grid'
import { PageHeader } from './components/page-header'
import { TaskRules } from './components/task-rules'
import { languageStorageKey, themeStorageKey } from './constants/app-config'
import { appCopy } from './i18n/copy'
import type { DailyEnergyMix, OptimalChargingWindow } from './types/energy-mix'
import type {
  ChargingWindowError,
  Language,
  Theme,
} from './types/settings'
import { getStoredLanguage, getStoredTheme } from './utils/preferences'
import './application.css'

function App() {
  const [language, setLanguage] = useState<Language>(getStoredLanguage)
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
    setLanguage((currentLanguage) => (currentLanguage === 'en' ? 'pl' : 'en'))
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

  const text = appCopy[language]

  if (isDailyMixLoading) {
    return (
      <main className="page status-page" data-theme={theme}>
        {text.loading}
      </main>
    )
  }

  if (hasDailyMixError) {
    return (
      <main className="page error-message" data-theme={theme}>
        {text.dailyError}
      </main>
    )
  }

  return (
    <main className="page" data-theme={theme}>
      <PageHeader
        text={text}
        theme={theme}
        onLanguageToggle={handleLanguageToggle}
        onThemeToggle={handleThemeToggle}
      />

      <TaskRules text={text} />

      <ChargingSection
        chargingHours={chargingHours}
        chargingWindow={chargingWindow}
        error={chargingWindowError}
        isLoading={isChargingWindowLoading}
        language={language}
        text={text}
        onChargingHoursChange={handleChargingHoursChange}
        onSubmit={handleChargingWindowSubmit}
      />

      <DailyMixGrid
        cleanEnergyLabel={text.cleanEnergy}
        dailyEnergyMix={dailyEnergyMix}
        dayLabels={text.dayLabels}
        language={language}
      />
    </main>
  )
}

export default App
