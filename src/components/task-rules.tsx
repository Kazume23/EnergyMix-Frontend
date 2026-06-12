import { useTranslation } from 'react-i18next'

export function TaskRules() {
  const { t } = useTranslation()

  return (
    <section className="task-rules" aria-label="Task rules">
      <p>
        <strong>{t('cleanEnergyRuleLabel')}</strong> {t('cleanEnergyRule')}
      </p>
      <p>
        <strong>{t('chargingRuleLabel')}</strong> {t('chargingRule')}
      </p>
    </section>
  )
}
