import type { DailyEnergyMix } from '../types/energy-mix'
import type { Language } from '../types/settings'
import { DailyMixCard } from './daily-mix-card'

type DailyMixGridProps = {
  cleanEnergyLabel: string
  dailyEnergyMix: DailyEnergyMix[]
  dayLabels: [string, string, string]
  language: Language
}

export function DailyMixGrid({
  cleanEnergyLabel,
  dailyEnergyMix,
  dayLabels,
  language,
}: DailyMixGridProps) {
  return (
    <section className="daily-mix-grid">
      {dailyEnergyMix.map((dayMix, dayIndex) => (
        <DailyMixCard
          cleanEnergyLabel={cleanEnergyLabel}
          dayLabel={dayLabels[dayIndex]}
          dayMix={dayMix}
          key={dayMix.date}
          language={language}
        />
      ))}
    </section>
  )
}
