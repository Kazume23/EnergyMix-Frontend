import { ViewControls } from './view-controls'
import type { AppCopy } from '../i18n/copy'
import type { Theme } from '../types/settings'

type PageHeaderProps = {
  text: AppCopy
  theme: Theme
  onLanguageToggle: () => void
  onThemeToggle: () => void
}

export function PageHeader({
  text,
  theme,
  onLanguageToggle,
  onThemeToggle,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="header-top">
        <p className="eyebrow">{text.eyebrow}</p>

        <ViewControls
          ariaLabel={text.displaySettings}
          languageLabel={text.languageButton}
          theme={theme}
          themeLabel={text.themeButton[theme]}
          onLanguageToggle={onLanguageToggle}
          onThemeToggle={onThemeToggle}
        />
      </div>

      <h1>{text.title}</h1>
      <p>{text.intro}</p>
    </header>
  )
}
