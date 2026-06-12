import { ViewControls } from './view-controls'
import type { TranslationMessages } from '../types/i18n'
import type { Theme } from '../types/settings'

type PageHeaderProps = {
  messages: TranslationMessages
  theme: Theme
  onLanguageToggle: () => void
  onThemeToggle: () => void
}

export function PageHeader({
  messages,
  theme,
  onLanguageToggle,
  onThemeToggle,
}: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="header-top">
        <p className="eyebrow">{messages.eyebrow}</p>

        <ViewControls
          ariaLabel={messages.displaySettings}
          languageLabel={messages.languageButton}
          theme={theme}
          themeLabel={messages.themeButton[theme]}
          onLanguageToggle={onLanguageToggle}
          onThemeToggle={onThemeToggle}
        />
      </div>

      <h1>{messages.title}</h1>
      <p>{messages.intro}</p>
    </header>
  )
}
