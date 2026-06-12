import type { DailyEnergyMix, OptimalChargingWindow } from '../types/energy-mix'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

function buildApiUrl(path: string): string {
  return `${API_BASE_URL}${path}`
}

export async function getDailyEnergyMix(): Promise<DailyEnergyMix[]> {
  const response = await fetch(buildApiUrl('/api/carbon/daily-mix'))

  if (!response.ok) {
    throw new Error('Failed to fetch daily energy mix.')
  }

  return response.json()
}

export async function getOptimalChargingWindow(
  hours: number,
): Promise<OptimalChargingWindow> {
  const response = await fetch(
    buildApiUrl(`/api/carbon/optimal-charging-window?hours=${hours}`),
  )

  if (!response.ok) {
    throw new Error('Failed to fetch optimal charging window.')
  }

  return response.json()
}
