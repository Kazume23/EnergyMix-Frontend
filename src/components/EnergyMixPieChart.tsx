import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { EnergySourceShare } from '../types/energyMix'

type EnergyMixPieChartProps = {
  sources: EnergySourceShare[]
}

const sourceColors: Record<string, string> = {
  biomass: '#84cc16',
  coal: '#64748b',
  gas: '#f97316',
  hydro: '#38bdf8',
  imports: '#a78bfa',
  nuclear: '#facc15',
  other: '#94a3b8',
  solar: '#fde047',
  wind: '#22c55e',
}

export function EnergyMixPieChart({ sources }: EnergyMixPieChartProps) {
  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={sources}
            dataKey="percentage"
            nameKey="fuel"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {sources.map((source) => (
              <Cell
                key={source.fuel}
                fill={sourceColors[source.fuel] ?? '#e2e8f0'}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}