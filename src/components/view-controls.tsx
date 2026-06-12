import { LanguageIcon, MoonIcon, SunIcon } from './icons'
import type { Theme } from '../types/settings'

type ViewControlsProps = {
  ariaLabel: string
  languageLabel: string
  theme: Theme
  themeLabel: string
  onLanguageToggle: () => void
  onThemeToggle: () => void
}

export function ViewControls({
  ariaLabel,
  languageLabel,
  theme,
  themeLabel,
  onLanguageToggle,
  onThemeToggle,
}: ViewControlsProps) {
  return (
    <div className="view-controls" aria-label={ariaLabel}>
      <button type="button" onClick={onThemeToggle} aria-label={themeLabel}>
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        <span className="control-tooltip" aria-hidden="true">
          {themeLabel}
        </span>
      </button>

      <button
        type="button"
        onClick={onLanguageToggle}
        aria-label={languageLabel}
      >
        <LanguageIcon />
        <span className="control-tooltip" aria-hidden="true">
          {languageLabel}
        </span>
      </button>
    </div>
  )
}
