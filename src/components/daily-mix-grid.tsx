import { useTranslation } from 'react-i18next'
import type { DailyEnergyMix } from '../types/energy-mix'
import { DailyMixCard } from './daily-mix-card'

const dayLabelKeys = [
  'dayLabels.today',
  'dayLabels.tomorrow',
  'dayLabels.dayAfterTomorrow',
] as const

type DailyMixGridProps = {
  dailyEnergyMix: DailyEnergyMix[]
}

export function DailyMixGrid({ dailyEnergyMix }: DailyMixGridProps) {
  const { t } = useTranslation()

  return (
    <section className="daily-mix-grid">
      {dailyEnergyMix.map((dayMix, dayIndex) => (
        <DailyMixCard
          cleanEnergyLabel={t('cleanEnergy')}
          dayLabel={t(dayLabelKeys[dayIndex])}
          dayMix={dayMix}
          key={dayMix.date}
        />
      ))}
    </section>
  )
}
