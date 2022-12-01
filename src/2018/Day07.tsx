import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT, { PART_2_CONFIGS } from '../Inputs/2018/Day07'

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
  const preReqCompleted = (prereqStep: string) => stepsCompleted.indexOf(prereqStep) !== -1
  while (stepsCompleted.length !== steps.length) {
    const step = steps[i]
    const prereqsComplete = step.prereqs.every(preReqCompleted)
    if (prereqsComplete && stepsCompleted.indexOf(step.id) === -1) {
      stepsCompleted += step.id
      i = 0
    } else i = (i + 1) % steps.length
  }

  return {
    answer1: stepsCompleted
  }
}

let answer2_a = ''

const part2 = (inputKey: string): { answer2: string } => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const { baseTime } = PART_2_CONFIGS[inputKey]
  const workers = new Array(PART_2_CONFIGS[inputKey].workers)
  for (let i = 0; i < workers.length; i++) {
    workers[i] = {
      duration: 0,
      stepClaimed: ''
    }
  }
  const steps = parseInput(inputKey)
  let stepsCompleted = ''
  let stepsClaimed = ''
  let time = 0
  const preReqCompleted = (prereqStep: string) => stepsCompleted.indexOf(prereqStep) !== -1
  while (true) {
    // First, advance all worker jobs
    for (const worker of workers) {
      if (worker.stepClaimed.length > 0) {
        const targetDuration = baseTime + alphabet.indexOf(worker.stepClaimed)
        if (worker.duration < targetDuration) worker.duration++
        else {
          stepsCompleted += worker.stepClaimed
          worker.stepClaimed = ''
          worker.duration = 0
          if (stepsCompleted.length === steps.length) {
            answer2_a = stepsCompleted
            return {
              answer2: time.toString()
            }
          }
        }
      }
    }

    // Then look for new jobs
    for (const worker of workers) {
      if (worker.stepClaimed.length === 0) {
        for (const step of steps) {
          if (
            stepsCompleted.indexOf(step.id) === -1 && stepsClaimed.indexOf(step.id) === -1
            && step.prereqs.every(preReqCompleted)
          ) {
            stepsClaimed += step.id
            worker.stepClaimed = step.id
            worker.duration = 1
            break
          }
        }
      }
    }
    time++
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Calculate Step Order',
    onClick: part1
  },
  {
    label: 'Calculate Step Order (w/ workers)',
    onClick: part2
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
      It will take <code>{answer}</code> seconds to complete the steps in the following order:{' '}
      <code>{answer2_a}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 7,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'The Sum of Its Parts'
}

export default config