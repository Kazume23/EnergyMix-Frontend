import { useTranslation } from 'react-i18next'
import { ChargingSection } from './components/charging-section'
import { DailyMixGrid } from './components/daily-mix-grid'
import { PageHeader } from './components/page-header'
import { SiteFooter } from './components/site-footer'
import { TaskRules } from './components/task-rules'
import { useApplicationPreferences } from './hooks/use-application-preferences'
import { useChargingWindow } from './hooks/use-charging-window'
import { useDailyEnergyMix } from './hooks/use-daily-energy-mix'
import './application.css'

function App() {
  const { t } = useTranslation()
  const { theme, handleLanguageToggle, handleThemeToggle } =
    useApplicationPreferences()
  const { dailyEnergyMix, hasDailyMixError, isDailyMixLoading } =
    useDailyEnergyMix()
  const {
    chargingHours,
    chargingWindow,
    chargingWindowError,
    handleChargingHoursChange,
    handleChargingWindowSubmit,
    isChargingWindowLoading,
  } = useChargingWindow()

  if (isDailyMixLoading) {
    return (
      <main className="page status-page" data-theme={theme}>
        <div className="loading-state" role="status" aria-live="polite">
          <span className="loading-spinner" aria-hidden="true" />
          <span>{t('loading')}</span>
        </div>
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

      <SiteFooter />
    </main>
  )
}

export default App
