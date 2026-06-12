import type { Theme } from './settings'

export type TranslationMessages = {
  loading: string
  dailyError: string
  chargingRangeError: string
  chargingError: string
  themeButton: Record<Theme, string>
  languageButton: string
  displaySettings: string
  eyebrow: string
  title: string
  intro: string
  cleanEnergyRule: string
  cleanEnergyRuleLabel: string
  chargingRule: string
  chargingRuleLabel: string
  dayLabels: [string, string, string]
  cleanEnergy: string
  chargingEyebrow: string
  chargingTitle: string
  chargingDescription: string
  chargingDuration: string
  calculating: string
  findWindow: string
  start: string
  end: string
  averageCleanEnergy: string
  optimalWindowMix: string
}
