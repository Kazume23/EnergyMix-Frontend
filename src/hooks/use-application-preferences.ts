import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../types/settings'
import {
  getNextLanguage,
  getStoredTheme,
  getSupportedLanguage,
  storeLanguage,
  storeTheme,
} from '../utils/preferences'

export function useApplicationPreferences() {
  const { i18n } = useTranslation()
  const language = getSupportedLanguage(i18n.resolvedLanguage ?? i18n.language)
  const [theme, setTheme] = useState<Theme>(getStoredTheme)

  useEffect(() => {
    storeLanguage(language)
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    storeTheme(theme)
  }, [theme])

  function handleLanguageToggle() {
    void i18n.changeLanguage(getNextLanguage(language))
  }

  function handleThemeToggle() {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
  }

  return {
    language,
    theme,
    handleLanguageToggle,
    handleThemeToggle,
  }
}
