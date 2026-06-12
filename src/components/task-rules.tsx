import type { AppCopy } from '../i18n/copy'

type TaskRulesProps = {
  text: AppCopy
}

export function TaskRules({ text }: TaskRulesProps) {
  return (
    <section className="task-rules" aria-label="Task rules">
      <p>
        <strong>{text.cleanEnergyRuleLabel}</strong> {text.cleanEnergyRule}
      </p>
      <p>
        <strong>{text.chargingRuleLabel}</strong> {text.chargingRule}
      </p>
    </section>
  )
}
