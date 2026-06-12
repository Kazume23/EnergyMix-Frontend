import type { Language } from '../types/settings'

export const minimumChargingHours = 1

export const maximumChargingHours = 6

export const chargingDurationOptions = [1, 2, 3, 4, 5, 6] as const

export const cleanEnergySources = new Set([
  'biomass',
  'nuclear',
  'hydro',
  'wind',
  'solar',
])

export const languageStorageKey = 'energyMixLanguage'

export const themeStorageKey = 'energyMixTheme'

export const localeByLanguage: Record<Language, string> = {
  en: 'en-GB',
  pl: 'pl-PL',
}

export const sourceColors: Record<string, string> = {
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
