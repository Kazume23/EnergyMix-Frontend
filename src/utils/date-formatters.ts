import { localeByLanguage } from '../constants/app-config'
import type { Language } from '../types/settings'

function formatDateWithoutPolishCommas(date: string, language: Language) {
  return language === 'pl' ? date.replaceAll(',', '') : date
}

export function formatMixDate(date: string, language: Language) {
  const formattedDate = new Intl.DateTimeFormat(localeByLanguage[language], {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date(date))

  return formatDateWithoutPolishCommas(formattedDate, language)
}

export function formatWindowDate(date: string, language: Language) {
  const formattedDate = new Intl.DateTimeFormat(localeByLanguage[language], {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))

  return formatDateWithoutPolishCommas(formattedDate, language)
}
