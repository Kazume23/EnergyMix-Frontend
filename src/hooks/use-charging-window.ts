import { useEffect, useRef, useState, type FormEvent } from 'react'
import { getOptimalChargingWindow, isAbortError } from '../api/carbon-api'
import {
  maximumChargingHours,
  minimumChargingHours,
} from '../constants/app-config'
import type { OptimalChargingWindow } from '../types/energy-mix'
import type { ChargingWindowError } from '../types/settings'

const defaultChargingHours = 3

function isSupportedChargingDuration(hours: number) {
  return hours >= minimumChargingHours && hours <= maximumChargingHours
}

export function useChargingWindow() {
  const [chargingHours, setChargingHours] = useState(defaultChargingHours)
  const [chargingWindow, setChargingWindow] =
    useState<OptimalChargingWindow | null>(null)
  const [isChargingWindowLoading, setIsChargingWindowLoading] = useState(false)
  const [chargingWindowError, setChargingWindowError] =
    useState<ChargingWindowError | null>(null)
  const chargingRequestController = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => {
      chargingRequestController.current?.abort()
    }
  }, [])

  function handleChargingHoursChange(hours: number) {
    setChargingHours(hours)
    setChargingWindowError(null)
  }

  async function handleChargingWindowSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isSupportedChargingDuration(chargingHours)) {
      setChargingWindowError('range')
      setChargingWindow(null)
      return
    }

    chargingRequestController.current?.abort()
    const requestController = new AbortController()
    chargingRequestController.current = requestController

    try {
      setIsChargingWindowLoading(true)
      setChargingWindowError(null)

      const optimalWindow = await getOptimalChargingWindow(chargingHours, {
        signal: requestController.signal,
      })

      if (requestController.signal.aborted) {
        return
      }

      setChargingWindow(optimalWindow)
    } catch (error) {
      if (requestController.signal.aborted || isAbortError(error)) {
        return
      }

      setChargingWindowError('request')
      setChargingWindow(null)
    } finally {
      if (chargingRequestController.current === requestController) {
        chargingRequestController.current = null
        setIsChargingWindowLoading(false)
      }
    }
  }

  return {
    chargingHours,
    chargingWindow,
    chargingWindowError,
    isChargingWindowLoading,
    handleChargingHoursChange,
    handleChargingWindowSubmit,
  }
}
