import type { Language, Theme } from '../types/settings'

export type AppCopy = {
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

export const appCopy: Record<Language, AppCopy> = {
  en: {
    loading: 'Loading grid data...',
    dailyError: 'Could not load the UK energy mix.',
    chargingRangeError: 'Charging duration must be between 1 and 6 hours.',
    chargingError: 'Could not calculate the optimal charging window.',
    themeButton: {
      light: 'Dark mode',
      dark: 'Light mode',
    },
    languageButton: 'Polski',
    displaySettings: 'Display settings',
    eyebrow: 'Jakub Witek / Carbon Intensity API',
    title: 'UK energy mix planner',
    intro:
      'Current and forecast generation mix for Great Britain, plus the cleanest charging window for an electric vehicle. The interface follows the task brief: three daily pie charts and a 1-6 hour charging calculation.',
    cleanEnergyRule: 'biomass, nuclear, hydro, wind and solar.',
    cleanEnergyRuleLabel: 'Clean energy in this task:',
    chargingRule:
      'calculated from half-hour forecast intervals across the next two days.',
    chargingRuleLabel: 'Charging window:',
    dayLabels: ['Today', 'Tomorrow', 'Day after tomorrow'],
    cleanEnergy: 'clean energy',
    chargingEyebrow: 'EV charging',
    chargingTitle: 'Find the cleanest charging window',
    chargingDescription:
      'Enter a full-hour charging duration between 1 and 6 hours.',
    chargingDuration: 'Charging duration',
    calculating: 'Calculating...',
    findWindow: 'Find window',
    start: 'Start:',
    end: 'End:',
    averageCleanEnergy: 'Average clean energy:',
    optimalWindowMix: 'Optimal window mix',
  },
  pl: {
    loading: 'Ładowanie danych sieci...',
    dailyError: 'Nie udało się pobrać miksu energetycznego UK.',
    chargingRangeError: 'Czas ładowania musi wynosić od 1 do 6 godzin.',
    chargingError: 'Nie udało się obliczyć optymalnego okna ładowania.',
    themeButton: {
      light: 'Tryb ciemny',
      dark: 'Tryb jasny',
    },
    languageButton: 'English',
    displaySettings: 'Ustawienia widoku',
    eyebrow: 'Jakub Witek / Carbon Intensity API',
    title: 'Planer miksu energetycznego UK',
    intro:
      'Aktualny i prognozowany miks produkcji energii dla Wielkiej Brytanii oraz najczystsze okno ładowania samochodu elektrycznego. Interfejs realizuje założenia zadania: pokazuje wykresy kołowe na najbliższe trzy dni i obliczenia ładowania w zakresie 1-6 godzin.',
    cleanEnergyRule: 'biomass, nuclear, hydro, wind i solar.',
    cleanEnergyRuleLabel: 'Czysta energia w tym zadaniu:',
    chargingRule:
      'liczone z półgodzinnych interwałów prognozy dla kolejnych dwóch dni.',
    chargingRuleLabel: 'Okno ładowania:',
    dayLabels: ['Dzisiaj', 'Jutro', 'Pojutrze'],
    cleanEnergy: 'czystej energii',
    chargingEyebrow: 'Ładowanie EV',
    chargingTitle: 'Znajdź najczystsze okno ładowania',
    chargingDescription:
      'Podaj czas ładowania w pełnych godzinach od 1 do 6.',
    chargingDuration: 'Czas ładowania',
    calculating: 'Obliczanie...',
    findWindow: 'Znajdź okno',
    start: 'Start:',
    end: 'Koniec:',
    averageCleanEnergy: 'Średni udział czystej energii:',
    optimalWindowMix: 'Miks w optymalnym oknie',
  },
}

export const fuelLabels: Record<Language, Record<string, string>> = {
  en: {
    biomass: 'Biomass',
    coal: 'Coal',
    gas: 'Gas',
    hydro: 'Hydro',
    imports: 'Imports',
    nuclear: 'Nuclear',
    other: 'Other',
    solar: 'Solar',
    wind: 'Wind',
  },
  pl: {
    biomass: 'Biomass',
    coal: 'Coal',
    gas: 'Gas',
    hydro: 'Hydro',
    imports: 'Import',
    nuclear: 'Nuclear',
    other: 'Other',
    solar: 'Solar',
    wind: 'Wind',
  },
}
