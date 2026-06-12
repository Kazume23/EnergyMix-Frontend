import { useTranslation } from 'react-i18next'
import type { DailyEnergyMix } from '../types/energy-mix'
import { DailyMixCard } from './daily-mix-card'

const dayLabelKeys = [
  'dayLabels.today',
  'dayLabels.tomorrow',
  'dayLabels.dayAfterTomorrow',
] as const
const visibleDailyMixDays = dayLabelKeys.length

type DailyMixGridProps = {
  dailyEnergyMix: DailyEnergyMix[]
}

function getDayLabelKey(dayIndex: number) {
  return dayLabelKeys[dayIndex] ?? 'dayLabels.forecast'
}

export function DailyMixGrid({ dailyEnergyMix }: DailyMixGridProps) {
  const { t } = useTranslation()
  const displayedDailyEnergyMix = dailyEnergyMix.slice(0, visibleDailyMixDays)

  return (
    <section className="daily-mix-grid">
      {displayedDailyEnergyMix.map((dayMix, dayIndex) => (
        <DailyMixCard
          cleanEnergyLabel={t('cleanEnergy')}
          dayLabel={t(getDayLabelKey(dayIndex))}
          dayMix={dayMix}
          key={dayMix.date}
        />
      ))}
    </section>
  )
}
