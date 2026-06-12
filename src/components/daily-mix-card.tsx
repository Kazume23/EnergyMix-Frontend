import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { DailyEnergyMix } from '../types/energy-mix'
import { formatMixDate } from '../utils/date-formatters'
import {
  getSourceItemClassName,
  isCleanEnergySource,
} from '../utils/energy-sources'
import { getSupportedLanguage } from '../utils/preferences'
import { EnergyMixPieChart } from './energy-mix-pie-chart'
import { LeafIcon } from './icons'

type DailyMixCardProps = {
  cleanEnergyLabel: string
  dayLabel: string
  dayMix: DailyEnergyMix
}

export function DailyMixCard({
  cleanEnergyLabel,
  dayLabel,
  dayMix,
}: DailyMixCardProps) {
  const [activeFuel, setActiveFuel] = useState<string | null>(null)
  const { i18n, t } = useTranslation()
  const language = getSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)

  return (
    <article className="daily-mix-card">
      <div className="card-header">
        <div className="card-title-group">
          <p className="day-label">{dayLabel}</p>
          <h2>{formatMixDate(dayMix.date, language)}</h2>
        </div>
        <span>
          {dayMix.cleanEnergyPercentage}% {cleanEnergyLabel}
        </span>
      </div>

      <EnergyMixPieChart
        sources={dayMix.sources}
        onActiveFuelChange={setActiveFuel}
      />

      <ul className="source-list">
        {dayMix.sources.map((source) => {
          const isCleanSource = isCleanEnergySource(source.fuel)
          const isActiveSource = activeFuel === source.fuel

          return (
            <li
              className={getSourceItemClassName(isCleanSource, isActiveSource)}
              key={source.fuel}
            >
              <span className="source-name">
                {t(`fuel.${source.fuel}`, { defaultValue: source.fuel })}
                {isCleanSource && <LeafIcon />}
              </span>
              <strong>{source.percentage}%</strong>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
