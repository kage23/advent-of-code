import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
 } from '../Config'

import INPUT from './Input/Day7'

interface IStep {
  id: string
  prereqs: string[]
}

const parseInput = (inputKey: string): IStep[] => {
  const steps: IStep[] = []
  INPUT[inputKey].split('\n')
  .forEach(stepStr => {
    const prereq = stepStr.charAt(5)
    const stepId = stepStr.charAt(36)
    const step = steps.find(step => step.id === stepId)
    if (step) {
      step.prereqs.push(prereq)
    } else {
      steps.push({ id: stepId, prereqs: [prereq] })
    }
    const prereqStep = steps.find(step => step.id === prereq)
    if (!prereqStep) {
      steps.push({ id: prereq, prereqs: [] })
    }
  })
  steps.sort((a, b) => a.id < b.id ? -1 : 1)
  return steps
}

const part1 = (inputKey: string): { answer1: string } => {
  const steps = parseInput(inputKey)
  let stepsCompleted = ''
  let i = 0
  while (stepsCompleted.length !== steps.length) {
    const step = steps[i]
    const prereqsComplete = step.prereqs.every(prereqStep => stepsCompleted.indexOf(prereqStep) !== -1)
    if (prereqsComplete && stepsCompleted.indexOf(step.id) === -1) {
      stepsCompleted += step.id
      i = 0
    } else i = (i + 1) % steps.length
  }

  return {
    answer1: stepsCompleted
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Calculate Step Order',
    onClick: part1
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The steps should be compelted in the following order: <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 7,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'The Sum of Its Parts'
}

export default config