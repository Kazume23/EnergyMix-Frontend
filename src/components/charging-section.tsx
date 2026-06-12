import type { FormEventHandler } from 'react'
import { chargingDurationOptions } from '../constants/app-config'
import type { AppCopy } from '../i18n/copy'
import type { OptimalChargingWindow } from '../types/energy-mix'
import type { ChargingWindowError, Language } from '../types/settings'
import { formatWindowDate } from '../utils/date-formatters'
import { EnergyMixPieChart } from './energy-mix-pie-chart'

type ChargingSectionProps = {
  chargingHours: number
  chargingWindow: OptimalChargingWindow | null
  error: ChargingWindowError | null
  isLoading: boolean
  language: Language
  text: AppCopy
  onChargingHoursChange: (hours: number) => void
  onSubmit: FormEventHandler<HTMLFormElement>
}

export function ChargingSection({
  chargingHours,
  chargingWindow,
  error,
  isLoading,
  language,
  text,
  onChargingHoursChange,
  onSubmit,
}: ChargingSectionProps) {
  return (
    <section className="charging-section">
      <p className="eyebrow">{text.chargingEyebrow}</p>
      <h2>{text.chargingTitle}</h2>
      <p>{text.chargingDescription}</p>

      <form className="charging-form" onSubmit={onSubmit} noValidate>
        <fieldset className="charging-duration-field">
          <legend>{text.chargingDuration}</legend>

          <div className="charging-controls">
            <div
              className="duration-options"
              role="group"
              aria-label={text.chargingDuration}
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
              {isLoading ? text.calculating : text.findWindow}
            </button>
          </div>
        </fieldset>
      </form>

      {error && (
        <p className="error-message">
          {error === 'range' ? text.chargingRangeError : text.chargingError}
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
  )
}
