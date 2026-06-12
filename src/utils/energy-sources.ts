import { cleanEnergySources } from '../constants/app-config'

export function isCleanEnergySource(fuel: string) {
  return cleanEnergySources.has(fuel.toLowerCase())
}

export function getSourceItemClassName(
  isCleanSource: boolean,
  isActiveSource: boolean,
) {
  const classNames: string[] = []

  if (isCleanSource) {
    classNames.push('clean-source')
  }

  if (isActiveSource) {
    classNames.push('active-source')
  }

  return classNames.length > 0 ? classNames.join(' ') : undefined
}
