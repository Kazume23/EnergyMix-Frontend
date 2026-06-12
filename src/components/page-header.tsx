import { useTranslation } from 'react-i18next'
import { ViewControls } from './view-controls'
import type { Theme } from '../types/settings'

type PageHeaderProps = {
  theme: Theme
  onLanguageToggle: () => void
  onThemeToggle: () => void
}

export function PageHeader({
  theme,
  onLanguageToggle,
  onThemeToggle,
}: PageHeaderProps) {
  const { t } = useTranslation()

  return (
    <header className="page-header">
      <div className="header-top">
        <p className="eyebrow">{t('eyebrow')}</p>

        <ViewControls
          ariaLabel={t('displaySettings')}
          languageLabel={t('languageButton')}
          theme={theme}
          themeLabel={t(`themeButton.${theme}`)}
          onLanguageToggle={onLanguageToggle}
          onThemeToggle={onThemeToggle}
        />
      </div>

      <h1>{t('title')}</h1>
      <p>{t('intro')}</p>
    </header>
  )
}
