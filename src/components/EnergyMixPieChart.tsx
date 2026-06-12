import { memo } from 'react'
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from 'recharts'
import type { PieSectorShapeProps } from 'recharts'
import type { EnergySourceShare } from '../types/energyMix'

type EnergyMixPieChartProps = {
  sources: EnergySourceShare[]
  onActiveFuelChange?: (fuel: string | null) => void
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

const initialChartDimension = {
  width: 240,
  height: 240,
}

function renderPieSector(props: PieSectorShapeProps) {
  const { isActive, ...sectorProps } = props

  return (
    <Sector
      {...sectorProps}
      className={isActive ? 'pie-sector pie-sector-active' : 'pie-sector'}
    />
  )
}

export const EnergyMixPieChart = memo(function EnergyMixPieChart({
  sources,
  onActiveFuelChange,
}: EnergyMixPieChartProps) {
  const chartSources = sources.filter((source) => source.percentage > 0)

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer
        width="100%"
        height="100%"
        minWidth={1}
        minHeight={1}
        initialDimension={initialChartDimension}
      >
        <PieChart>
          <Pie
            data={chartSources}
            dataKey="percentage"
            nameKey="fuel"
            cx="50%"
            cy="50%"
            outerRadius={80}
            isAnimationActive={false}
            label
            shape={renderPieSector}
            onMouseEnter={(_, index) => {
              onActiveFuelChange?.(chartSources[index]?.fuel ?? null)
            }}
            onMouseLeave={() => {
              onActiveFuelChange?.(null)
            }}
          >
            {chartSources.map((source) => (
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
})
