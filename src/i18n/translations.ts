import type { Language } from '../types/settings'

export const defaultLanguage = 'en' satisfies Language

export const supportedLanguages = ['en', 'pl'] as const satisfies Language[]

export const resources = {
  en: {
    translation: {
      loading: 'Loading grid data...',
      dailyError: 'Could not load the UK energy mix.',
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
      dayLabels: {
        today: 'Today',
        tomorrow: 'Tomorrow',
        dayAfterTomorrow: 'Day after tomorrow',
        forecast: 'Forecast',
      },
      cleanEnergy: 'clean energy',
      chart: {
        dailyAriaLabel: 'Energy mix chart for {{date}}.',
        chargingAriaLabel:
          'Generation mix chart for the optimal charging window.',
        empty: 'No generation mix data available.',
      },
      charging: {
        eyebrow: 'EV charging',
        title: 'Find the cleanest charging window',
        description: 'Enter a full-hour charging duration between 1 and 6 hours.',
        duration: 'Charging duration',
        calculating: 'Calculating...',
        findWindow: 'Find window',
        rangeError: 'Charging duration must be between 1 and 6 hours.',
        requestError: 'Could not calculate the optimal charging window.',
        start: 'Start:',
        end: 'End:',
        averageCleanEnergy: 'Average clean energy:',
        optimalWindowMix: 'Optimal window mix',
      },
      footer: {
        author: 'Built by Jakub Witek',
        github: 'GitHub',
        githubAriaLabel: 'Open Jakub Witek GitHub profile',
      },
      fuel: {
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
    },
  },
  pl: {
    translation: {
      loading: 'Ładowanie danych sieci...',
      dailyError: 'Nie udało się pobrać miksu energetycznego UK.',
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
      dayLabels: {
        today: 'Dzisiaj',
        tomorrow: 'Jutro',
        dayAfterTomorrow: 'Pojutrze',
        forecast: 'Prognoza',
      },
      cleanEnergy: 'czystej energii',
      chart: {
        dailyAriaLabel: 'Wykres miksu energetycznego dla {{date}}.',
        chargingAriaLabel:
          'Wykres miksu produkcji energii dla optymalnego okna ładowania.',
        empty: 'Brak danych miksu produkcji energii.',
      },
      charging: {
        eyebrow: 'Ładowanie EV',
        title: 'Znajdź najczystsze okno ładowania',
        description: 'Podaj czas ładowania w pełnych godzinach od 1 do 6.',
        duration: 'Czas ładowania',
        calculating: 'Obliczanie...',
        findWindow: 'Znajdź okno',
        rangeError: 'Czas ładowania musi wynosić od 1 do 6 godzin.',
        requestError: 'Nie udało się obliczyć optymalnego okna ładowania.',
        start: 'Start:',
        end: 'Koniec:',
        averageCleanEnergy: 'Średni udział czystej energii:',
        optimalWindowMix: 'Miks w optymalnym oknie',
      },
      footer: {
        author: 'Autor: Jakub Witek',
        github: 'GitHub',
        githubAriaLabel: 'Otwórz profil GitHub Jakuba Witka',
      },
      fuel: {
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
    },
  },
} as const
