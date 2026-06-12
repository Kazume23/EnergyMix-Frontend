import { useEffect, useState, type FormEvent } from 'react'
import { getDailyEnergyMix, getOptimalChargingWindow } from './api/carbonApi'
import { EnergyMixPieChart } from './components/EnergyMixPieChart'
import type { DailyEnergyMix, OptimalChargingWindow } from './types/energyMix'
import './App.css'

type Language = 'en' | 'pl'
type Theme = 'light' | 'dark'
type ChargingWindowError = 'range' | 'request'

const fuelLabels: Record<Language, Record<string, string>> = {
  en: {
    biomass: 'Biomass',
    coal: 'Coal',
    gas: 'Gas',
    hydro: 'Hydro',
    imports: 'Imports',
    nuclear: 'Nuclear',
    other: 'Other',
    solar: 'Solar',
    wind: 'Wind',
  },
  pl: {
    biomass: 'Biomass',
    coal: 'Coal',
    gas: 'Gas',
    hydro: 'Hydro',
    imports: 'Import',
    nuclear: 'Nuclear',
    other: 'Other',
    solar: 'Solar',
    wind: 'Wind',
  },
}

const copy = {
  en: {
    loading: 'Loading grid data...',
    dailyError: 'Could not load the UK energy mix.',
    chargingRangeError: 'Charging duration must be between 1 and 6 hours.',
    chargingError: 'Could not calculate the optimal charging window.',
    themeButton: {
      light: 'Dark mode',
      dark: 'Light mode',
    },
    languageButton: 'Polski',
    eyebrow: 'Jakub Witek / Carbon Intensity API',
    title: 'UK energy mix planner',
    intro:
      'Current and forecast generation mix for Great Britain, plus the cleanest charging window for an electric vehicle. The interface follows the task brief: three daily pie charts and a 1-6 hour charging calculation.',
    cleanEnergyRule:
      'biomass, nuclear, hydro, wind and solar.',
    cleanEnergyRuleLabel: 'Clean energy in this task:',
    chargingRule:
      'calculated from half-hour forecast intervals across the next two days.',
    chargingRuleLabel: 'Charging window:',
    dayLabels: ['Today', 'Tomorrow', 'Day after tomorrow'],
    cleanEnergy: 'clean energy',
    chargingEyebrow: 'EV charging',
    chargingTitle: 'Find the cleanest charging window',
    chargingDescription:
      'Enter a full-hour charging duration between 1 and 6 hours.',
    chargingDuration: 'Charging duration',
    calculating: 'Calculating...',
    findWindow: 'Find window',
    start: 'Start:',
    end: 'End:',
    averageCleanEnergy: 'Average clean energy:',
    optimalWindowMix: 'Optimal window mix',
  },
  pl: {
    loading: 'Ładowanie danych sieci...',
    dailyError: 'Nie udało się pobrać miksu energetycznego UK.',
    chargingRangeError: 'Czas ładowania musi wynosić od 1 do 6 godzin.',
    chargingError: 'Nie udało się obliczyć optymalnego okna ładowania.',
    themeButton: {
      light: 'Tryb ciemny',
      dark: 'Tryb jasny',
    },
    languageButton: 'English',
    eyebrow: 'Jakub Witek / Carbon Intensity API',
    title: 'Planer miksu energetycznego UK',
    intro:
      'Aktualny i prognozowany miks produkcji energii dla Wielkiej Brytanii oraz najczystsze okno ładowania samochodu elektrycznego. Interfejs realizuje założenia zadania: pokazuje wykresy kołowe na najbliższe trzy dni i obliczenia ładowania w zakresie 1-6 godzin.',
    cleanEnergyRule:
      'biomass, nuclear, hydro, wind i solar.',
    cleanEnergyRuleLabel: 'Czysta energia w tym zadaniu:',
    chargingRule:
      'liczone z półgodzinnych interwałów prognozy dla kolejnych dwóch dni.',
    chargingRuleLabel: 'Okno ładowania:',
    dayLabels: ['Dzisiaj', 'Jutro', 'Pojutrze'],
    cleanEnergy: 'czystej energii',
    chargingEyebrow: 'Ładowanie EV',
    chargingTitle: 'Znajdź najczystsze okno ładowania',
    chargingDescription:
      'Podaj czas ładowania w pełnych godzinach od 1 do 6.',
    chargingDuration: 'Czas ładowania',
    calculating: 'Obliczanie...',
    findWindow: 'Znajdź okno',
    start: 'Start:',
    end: 'Koniec:',
    averageCleanEnergy: 'Średni udział czystej energii:',
    optimalWindowMix: 'Miks w optymalnym oknie',
  },
}

const localeByLanguage: Record<Language, string> = {
  en: 'en-GB',
  pl: 'pl-PL',
}

const chargingDurationOptions = [1, 2, 3, 4, 5, 6]
const cleanEnergySources = new Set(['biomass', 'nuclear', 'hydro', 'wind', 'solar'])
const languageStorageKey = 'energyMixLanguage'
const themeStorageKey = 'energyMixTheme'

function isCleanEnergySource(fuel: string) {
  return cleanEnergySources.has(fuel.toLowerCase())
}

function isLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'pl'
}

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

function getStoredLanguage(): Language {
  const storedLanguage = localStorage.getItem(languageStorageKey)
  return isLanguage(storedLanguage) ? storedLanguage : 'en'
}

function getStoredTheme(): Theme {
  const storedTheme = localStorage.getItem(themeStorageKey)
  return isTheme(storedTheme) ? storedTheme : 'light'
}

function MoonIcon() {
  return (
    <svg
      className="control-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.5 15.2A8.4 8.4 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      className="control-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
    </svg>
  )
}

function LanguageIcon() {
  return (
    <svg
      className="control-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5M12 3.5C9.8 5.8 8.7 8.6 8.7 12s1.1 6.2 3.3 8.5" />
    </svg>
  )
}

function formatMixDate(date: string, language: Language) {
  const formattedDate = new Intl.DateTimeFormat(localeByLanguage[language], {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date(date))

  return language === 'pl' ? formattedDate.replaceAll(',', '') : formattedDate
}

function formatWindowDate(date: string, language: Language) {
  const formattedDate = new Intl.DateTimeFormat(localeByLanguage[language], {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))

  return language === 'pl' ? formattedDate.replaceAll(',', '') : formattedDate
}

function App() {
  const [language, setLanguage] = useState<Language>(getStoredLanguage)
  const [theme, setTheme] = useState<Theme>(getStoredTheme)
  const [dailyEnergyMix, setDailyEnergyMix] = useState<DailyEnergyMix[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [chargingHours, setChargingHours] = useState(3)
  const [chargingWindow, setChargingWindow] = useState<OptimalChargingWindow | null>(null)
  const [isChargingWindowLoading, setIsChargingWindowLoading] = useState(false)
  const [chargingWindowError, setChargingWindowError] =
    useState<ChargingWindowError | null>(null)

  useEffect(() => {
    async function loadDailyEnergyMix() {
      try {
        const energyMix = await getDailyEnergyMix()
        setDailyEnergyMix(energyMix)
      } catch {
        setErrorMessage(copy.en.dailyError)
      } finally {
        setIsLoading(false)
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

  const text = copy[language]
  const nextTheme = theme === 'light' ? 'dark' : 'light'
  const nextLanguage = language === 'en' ? 'pl' : 'en'

  if (isLoading) {
    return (
      <main className="page status-page" data-theme={theme}>
        {text.loading}
      </main>
    )
  }

  if (errorMessage) {
    return (
      <main className="page error-message" data-theme={theme}>
        {language === 'en' ? errorMessage : copy.pl.dailyError}
      </main>
    )
  }

  return (
    <main className="page" data-theme={theme}>
      <header className="page-header">
        <div className="header-top">
          <p className="eyebrow">{text.eyebrow}</p>

          <div className="view-controls" aria-label="Display settings">
            <button
              type="button"
              onClick={() => setTheme(nextTheme)}
              aria-label={text.themeButton[theme]}
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              <span className="control-tooltip" aria-hidden="true">
                {text.themeButton[theme]}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage(nextLanguage)}
              aria-label={text.languageButton}
            >
              <LanguageIcon />
              <span className="control-tooltip" aria-hidden="true">
                {text.languageButton}
              </span>
            </button>
          </div>
        </div>

        <h1>{text.title}</h1>
        <p>{text.intro}</p>
      </header>

      <section className="charging-section">
        <p className="eyebrow">{text.chargingEyebrow}</p>
        <h2>{text.chargingTitle}</h2>
        <p>{text.chargingDescription}</p>

        <form
          className="charging-form"
          onSubmit={handleChargingWindowSubmit}
          noValidate
        >
          <fieldset className="charging-duration-field">
            <legend>{text.chargingDuration}</legend>

            <div className="charging-controls">
              <div
                className="duration-options"
                role="group"
                aria-label={text.chargingDuration}
                aria-invalid={chargingWindowError === 'range'}
              >
                {chargingDurationOptions.map((hours) => (
                  <button
                    className="duration-option"
                    type="button"
                    key={hours}
                    aria-pressed={chargingHours === hours}
                    onClick={() => {
                      setChargingHours(hours)
                      setChargingWindowError(null)
                    }}
                  >
                    {hours}h
                  </button>
                ))}
              </div>

              <button
                className="find-window-button"
                type="submit"
                disabled={isChargingWindowLoading}
              >
                {isChargingWindowLoading ? text.calculating : text.findWindow}
              </button>
            </div>
          </fieldset>
        </form>

        {chargingWindowError && (
          <p className="error-message">
            {chargingWindowError === 'range'
              ? text.chargingRangeError
              : text.chargingError}
          </p>
        )}

        {chargingWindow && (
          <div className="charging-result">
            <div className="charging-result-details">
              <p>
                <strong>{text.start}</strong>{' '}
                {formatWindowDate(chargingWindow.start, language)}
              </p>
              <p>
                <strong>{text.end}</strong>{' '}
                {formatWindowDate(chargingWindow.end, language)}
              </p>
              <p>
                <strong>{text.averageCleanEnergy}</strong>{' '}
                {chargingWindow.averageCleanEnergyPercentage}%
              </p>
            </div>

            {chargingWindow.sources?.length > 0 && (
              <div className="charging-result-chart">
                <p className="result-chart-title">{text.optimalWindowMix}</p>
                <EnergyMixPieChart sources={chargingWindow.sources} />
              </div>
            )}
          </div>
        )}
      </section>

      <section className="task-rules" aria-label="Task rules">
        <p>
          <strong>{text.cleanEnergyRuleLabel}</strong> {text.cleanEnergyRule}
        </p>
        <p>
          <strong>{text.chargingRuleLabel}</strong> {text.chargingRule}
        </p>
      </section>

      <section className="daily-mix-grid">
        {dailyEnergyMix.map((dayMix, dayIndex) => (
          <article className="daily-mix-card" key={dayMix.date}>
            <div className="card-header">
              <div className="card-title-group">
                <p className="day-label">{text.dayLabels[dayIndex]}</p>
                <h2>{formatMixDate(dayMix.date, language)}</h2>
              </div>
              <span>
                {dayMix.cleanEnergyPercentage}% {text.cleanEnergy}
              </span>
            </div>

            <EnergyMixPieChart sources={dayMix.sources} />

            <ul className="source-list">
              {dayMix.sources.map((source) => (
                <li
                  className={isCleanEnergySource(source.fuel) ? 'clean-source' : undefined}
                  key={source.fuel}
                >
                  <span>
                    {fuelLabels[language][source.fuel] ?? source.fuel}
                  </span>
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
