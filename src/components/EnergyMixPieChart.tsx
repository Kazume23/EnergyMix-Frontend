import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { EnergySourceShare } from '../types/energyMix'

type EnergyMixPieChartProps = {
  sources: EnergySourceShare[]
}

const sourceColors: Record<string, string> = {
  biomass: '#6f7f3a',
  coal: '#4e5652',
  gas: '#b7652b',
  hydro: '#4e8791',
  imports: '#7a5d8c',
  nuclear: '#d6a73d',
  other: '#8c8678',
  solar: '#e2bf52',
  wind: '#4f7f64',
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
