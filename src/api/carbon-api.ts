import type { DailyEnergyMix, OptimalChargingWindow } from '../types/energy-mix'
import { requestJson, type ApiRequestOptions } from './api-client'
import {
  parseDailyEnergyMixResponse,
  parseOptimalChargingWindowResponse,
} from './energy-mix-validation'

export { isAbortError } from './api-client'

export async function getDailyEnergyMix(
  options?: ApiRequestOptions,
): Promise<DailyEnergyMix[]> {
  return requestJson(
    '/api/carbon/daily-mix',
    parseDailyEnergyMixResponse,
    options,
  )
}

export async function getOptimalChargingWindow(
  hours: number,
  options?: ApiRequestOptions,
): Promise<OptimalChargingWindow> {
  const searchParams = new URLSearchParams({ hours: String(hours) })

  return requestJson(
    `/api/carbon/optimal-charging-window?${searchParams.toString()}`,
    parseOptimalChargingWindowResponse,
    options,
  )
}
