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
import { sourceColors } from '../constants/app-config'
import type { EnergySourceShare } from '../types/energy-mix'

type EnergyMixPieChartProps = {
  activeFuel?: string | null
  ariaLabel?: string
  emptyLabel?: string
  sources: EnergySourceShare[]
  onActiveFuelChange?: (fuel: string | null) => void
}

const initialChartDimension = {
  width: 240,
  height: 240,
}

function getSectorFuel(props: PieSectorShapeProps) {
  if (typeof props.name === 'string') {
    return props.name
  }

  if (
    typeof props.payload === 'object' &&
    props.payload !== null &&
    'fuel' in props.payload &&
    typeof props.payload.fuel === 'string'
  ) {
    return props.payload.fuel
  }

  return null
}

function renderPieSector(
  props: PieSectorShapeProps,
  activeFuel: string | null | undefined,
) {
  const { isActive, ...sectorProps } = props
  const isVisuallyActive = isActive || getSectorFuel(props) === activeFuel

  return (
    <Sector
      {...sectorProps}
      className={
        isVisuallyActive ? 'pie-sector pie-sector-active' : 'pie-sector'
      }
    />
  )
}

export const EnergyMixPieChart = memo(function EnergyMixPieChart({
  activeFuel,
  ariaLabel,
  emptyLabel = 'No generation mix data available.',
  sources,
  onActiveFuelChange,
}: EnergyMixPieChartProps) {
  const chartSources = sources.filter((source) => source.percentage > 0)
  const chartLabel =
    ariaLabel ??
    chartSources
      .map((source) => `${source.fuel}: ${source.percentage}%`)
      .join(', ')
  const renderSector = (sectorProps: PieSectorShapeProps) =>
    renderPieSector(sectorProps, activeFuel)

  if (chartSources.length === 0) {
    return (
      <div
        className="chart-wrapper chart-empty"
        role="img"
        aria-label={emptyLabel}
      >
        <span>{emptyLabel}</span>
      </div>
    )
  }

  return (
    <div className="chart-wrapper" role="img" aria-label={chartLabel}>
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
            shape={renderSector}
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
