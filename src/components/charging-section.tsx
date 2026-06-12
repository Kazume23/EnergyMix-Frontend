import type { FormEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { chargingDurationOptions } from '../constants/app-config'
import type { OptimalChargingWindow } from '../types/energy-mix'
import type { ChargingWindowError } from '../types/settings'
import { formatWindowDate } from '../utils/date-formatters'
import { getSupportedLanguage } from '../utils/preferences'
import { EnergyMixPieChart } from './energy-mix-pie-chart'

type ChargingSectionProps = {
  chargingHours: number
  chargingWindow: OptimalChargingWindow | null
  error: ChargingWindowError | null
  isLoading: boolean
  onChargingHoursChange: (hours: number) => void
  onSubmit: FormEventHandler<HTMLFormElement>
}

export function ChargingSection({
  chargingHours,
  chargingWindow,
  error,
  isLoading,
  onChargingHoursChange,
  onSubmit,
}: ChargingSectionProps) {
  const { i18n, t } = useTranslation()
  const language = getSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)

  return (
    <section className="charging-section">
      <p className="eyebrow">{t('charging.eyebrow')}</p>
      <h2>{t('charging.title')}</h2>
      <p>{t('charging.description')}</p>

      <form className="charging-form" onSubmit={onSubmit} noValidate>
        <fieldset className="charging-duration-field">
          <legend>{t('charging.duration')}</legend>

          <div className="charging-controls">
            <div
              className="duration-options"
              role="group"
              aria-label={t('charging.duration')}
              aria-invalid={error === 'range'}
            >
              {chargingDurationOptions.map((hours) => (
                <button
                  className="duration-option"
                  type="button"
                  key={hours}
                  aria-pressed={chargingHours === hours}
                  onClick={() => onChargingHoursChange(hours)}
                >
                  {hours}h
                </button>
              ))}
            </div>

            <button
              className="find-window-button"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? t('charging.calculating') : t('charging.findWindow')}
            </button>
          </div>
        </fieldset>
      </form>

      {error && (
        <p className="error-message">
          {error === 'range'
            ? t('charging.rangeError')
            : t('charging.requestError')}
        </p>
      )}

      {chargingWindow && (
        <div className="charging-result">
          <div className="charging-result-details">
            <p>
              <strong>{t('charging.start')}</strong>{' '}
              {formatWindowDate(chargingWindow.start, language)}
            </p>
            <p>
              <strong>{t('charging.end')}</strong>{' '}
              {formatWindowDate(chargingWindow.end, language)}
            </p>
            <p>
              <strong>{t('charging.averageCleanEnergy')}</strong>{' '}
              {chargingWindow.averageCleanEnergyPercentage}%
            </p>
          </div>

          {chargingWindow.sources?.length > 0 && (
            <div className="charging-result-chart">
              <p className="result-chart-title">
                {t('charging.optimalWindowMix')}
              </p>
              <EnergyMixPieChart sources={chargingWindow.sources} />
            </div>
          )}
        </div>
      )}
    </section>
  )
}
