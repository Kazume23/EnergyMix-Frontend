import { EnergyMixPieChart } from './EnergyMixPieChart'
import type { DailyEnergyMix } from '../types/energyMix'

type DailyEnergyMixSectionProps = {
  dailyEnergyMix: DailyEnergyMix[]
}

export function DailyEnergyMixSection({
  dailyEnergyMix,
}: DailyEnergyMixSectionProps) {
  return (
    <section className="daily-mix-grid">
      {dailyEnergyMix.map((dayMix) => (
        <article className="daily-mix-card" key={dayMix.date}>
          <div className="card-header">
            <h2>{dayMix.date}</h2>
            <span>{dayMix.cleanEnergyPercentage}% clean energy</span>
          </div>

          <EnergyMixPieChart sources={dayMix.sources} />

          <ul className="source-list">
            {dayMix.sources.map((source) => (
              <li key={source.fuel}>
                <span>{source.fuel}</span>
                <strong>{source.percentage}%</strong>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  )
}