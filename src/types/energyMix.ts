export type EnergySourceShare = {
  fuel: string
  percentage: number
}

export type DailyEnergyMix = {
  date: string
  sources: EnergySourceShare[]
  cleanEnergyPercentage: number
}

export type OptimalChargingWindow = {
  start: string
  end: string
  averageCleanEnergyPercentage: number
}