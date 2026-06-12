import { languageStorageKey, themeStorageKey } from '../constants/app-config'
import type { Language, Theme } from '../types/settings'

function isLanguage(value: string | null): value is Language {
  return value === 'en' || value === 'pl'
}

function isTheme(value: string | null): value is Theme {
  return value === 'light' || value === 'dark'
}

export function getStoredLanguage(): Language {
  const storedLanguage = localStorage.getItem(languageStorageKey)
  return isLanguage(storedLanguage) ? storedLanguage : 'en'
}

export function getSupportedLanguage(language: string | null | undefined): Language {
  return language?.startsWith('pl') ? 'pl' : 'en'
}

export function getNextLanguage(language: Language): Language {
  return language === 'en' ? 'pl' : 'en'
}

export function getStoredTheme(): Theme {
  const storedTheme = localStorage.getItem(themeStorageKey)
  return isTheme(storedTheme) ? storedTheme : 'light'
}
