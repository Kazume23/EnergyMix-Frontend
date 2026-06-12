import type { DailyEnergyMix, OptimalChargingWindow } from '../types/energyMix'

export async function getDailyEnergyMix(): Promise<DailyEnergyMix[]> {
  const response = await fetch('/api/carbon/daily-mix')

  if (!response.ok) {
    throw new Error('Failed to fetch daily energy mix.')
  }

  return response.json()
}

export async function getOptimalChargingWindow(
  hours: number,
): Promise<OptimalChargingWindow> {
  const response = await fetch(`/api/carbon/optimal-charging-window?hours=${hours}`)

  if (!response.ok) {
    throw new Error('Failed to fetch optimal charging window.')
  }

  return response.json()
}