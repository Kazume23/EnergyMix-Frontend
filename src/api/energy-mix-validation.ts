import type {
  DailyEnergyMix,
  EnergySourceShare,
  OptimalChargingWindow,
} from '../types/energy-mix'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value)
}

function isEnergySourceShare(value: unknown): value is EnergySourceShare {
  return (
    isRecord(value) &&
    isNonEmptyString(value.fuel) &&
    isFiniteNumber(value.percentage)
  )
}

function isEnergySourceShareList(value: unknown): value is EnergySourceShare[] {
  return Array.isArray(value) && value.every(isEnergySourceShare)
}

function isDailyEnergyMix(value: unknown): value is DailyEnergyMix {
  return (
    isRecord(value) &&
    isNonEmptyString(value.date) &&
    isEnergySourceShareList(value.sources) &&
    isFiniteNumber(value.cleanEnergyPercentage)
  )
}

function isOptimalChargingWindow(
  value: unknown,
): value is OptimalChargingWindow {
  return (
    isRecord(value) &&
    isNonEmptyString(value.start) &&
    isNonEmptyString(value.end) &&
    isFiniteNumber(value.averageCleanEnergyPercentage) &&
    isEnergySourceShareList(value.sources)
  )
}

export function parseDailyEnergyMixResponse(
  response: unknown,
): DailyEnergyMix[] {
  if (!Array.isArray(response) || !response.every(isDailyEnergyMix)) {
    throw new Error('Daily energy mix response does not match the API contract.')
  }

  return response
}

export function parseOptimalChargingWindowResponse(
  response: unknown,
): OptimalChargingWindow {
  if (!isOptimalChargingWindow(response)) {
    throw new Error(
      'Optimal charging window response does not match the API contract.',
    )
  }

  return response
}
