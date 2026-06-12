import type { TranslationMessages } from '../types/i18n'

type TaskRulesProps = {
  messages: TranslationMessages
}

export function TaskRules({ messages }: TaskRulesProps) {
  return (
    <section className="task-rules" aria-label="Task rules">
      <p>
        <strong>{messages.cleanEnergyRuleLabel}</strong>{' '}
        {messages.cleanEnergyRule}
      </p>
      <p>
        <strong>{messages.chargingRuleLabel}</strong> {messages.chargingRule}
      </p>
    </section>
  )
}
