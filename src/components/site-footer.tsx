import { useTranslation } from 'react-i18next'
import { GitHubIcon } from './icons'

const githubProfileUrl = 'https://github.com/Kazume23'

export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <p>
        <span className="footer-product">EnergyMixApp</span>
        <span>{t('footer.author')}</span>
      </p>

      <a
        href={githubProfileUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={t('footer.githubAriaLabel')}
      >
        <GitHubIcon />
        <span>{t('footer.github')}</span>
      </a>
    </footer>
  )
}
