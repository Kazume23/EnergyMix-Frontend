import type { FormEventHandler } from 'react'
import { chargingDurationOptions } from '../constants/app-config'
import type { OptimalChargingWindow } from '../types/energy-mix'
import type { TranslationMessages } from '../types/i18n'
import type { ChargingWindowError, Language } from '../types/settings'
import { formatWindowDate } from '../utils/date-formatters'
import { EnergyMixPieChart } from './energy-mix-pie-chart'

type ChargingSectionProps = {
  chargingHours: number
  chargingWindow: OptimalChargingWindow | null
  error: ChargingWindowError | null
  isLoading: boolean
  language: Language
  messages: TranslationMessages
  onChargingHoursChange: (hours: number) => void
  onSubmit: FormEventHandler<HTMLFormElement>
}

export function ChargingSection({
  chargingHours,
  chargingWindow,
  error,
  isLoading,
  language,
  messages,
  onChargingHoursChange,
  onSubmit,
}: ChargingSectionProps) {
  return (
    <section className="charging-section">
      <p className="eyebrow">{messages.chargingEyebrow}</p>
      <h2>{messages.chargingTitle}</h2>
      <p>{messages.chargingDescription}</p>

      <form className="charging-form" onSubmit={onSubmit} noValidate>
        <fieldset className="charging-duration-field">
          <legend>{messages.chargingDuration}</legend>

          <div className="charging-controls">
            <div
              className="duration-options"
              role="group"
              aria-label={messages.chargingDuration}
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
              {isLoading ? messages.calculating : messages.findWindow}
            </button>
          </div>
        </fieldset>
      </form>

      {error && (
        <p className="error-message">
          {error === 'range'
            ? messages.chargingRangeError
            : messages.chargingError}
        </p>
      )}

      {chargingWindow && (
        <div className="charging-result">
          <div className="charging-result-details">
            <p>
              <strong>{messages.start}</strong>{' '}
              {formatWindowDate(chargingWindow.start, language)}
            </p>
            <p>
              <strong>{messages.end}</strong>{' '}
              {formatWindowDate(chargingWindow.end, language)}
            </p>
            <p>
              <strong>{messages.averageCleanEnergy}</strong>{' '}
              {chargingWindow.averageCleanEnergyPercentage}%
            </p>
          </div>

          {chargingWindow.sources?.length > 0 && (
            <div className="charging-result-chart">
              <p className="result-chart-title">{messages.optimalWindowMix}</p>
              <EnergyMixPieChart sources={chargingWindow.sources} />
            </div>
          )}
        </div>
      )}
    </section>
  )
}
