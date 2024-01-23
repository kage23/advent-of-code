import inputs from '../../inputs/2018/day07'
import { DayConfig } from '../../routes/Day'

interface Step {
  id: string
  prereqs: string[]
}

const parseInput = (input: string): Step[] => {
  const steps: Step[] = []
  input.split('\n').forEach((stepStr) => {
    const prereq = stepStr.charAt(5)
    const stepId = stepStr.charAt(36)
    const step = steps.find((step) => step.id === stepId)
    if (step) {
      step.prereqs.push(prereq)
    } else {
      steps.push({ id: stepId, prereqs: [prereq] })
    }
    const prereqStep = steps.find((step) => step.id === prereq)
    if (!prereqStep) {
      steps.push({ id: prereq, prereqs: [] })
    }
  })
  steps.sort((a, b) => (a.id < b.id ? -1 : 1))
  return steps
}

export const calculateStepOrder = (input: string) => {
  const steps = parseInput(input)
  let stepsCompleted = ''
  let i = 0
  const preReqCompleted = (prereqStep: string) =>
    stepsCompleted.indexOf(prereqStep) !== -1
  while (stepsCompleted.length !== steps.length) {
    const step = steps[i]
    const prereqsComplete = step.prereqs.every(preReqCompleted)
    if (prereqsComplete && stepsCompleted.indexOf(step.id) === -1) {
      stepsCompleted += step.id
      i = 0
    } else i = (i + 1) % steps.length
  }

  return {
    answer1: stepsCompleted,
  }
}

export const useWorkers = (input: string, isDemo = false) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const baseTime = isDemo ? 1 : 61
  const workers = new Array(isDemo ? 2 : 5)
  for (let i = 0; i < workers.length; i++) {
    workers[i] = {
      duration: 0,
      stepClaimed: '',
    }
  }
  const steps = parseInput(input)
  let stepsCompleted = ''
  let stepsClaimed = ''
  let time = 0
  const preReqCompleted = (prereqStep: string) =>
    stepsCompleted.indexOf(prereqStep) !== -1
  // eslint-disable-next-line no-constant-condition
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
            return {
              answer2: time,
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
            stepsCompleted.indexOf(step.id) === -1 &&
            stepsClaimed.indexOf(step.id) === -1 &&
            step.prereqs.every(preReqCompleted)
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

const day07: Omit<DayConfig, 'year'> = {
  answer1Text: 'The steps should be completed in the following order: answer.',
  answer2Text: 'It will take answer seconds to complete the steps.',
  buttons: [
    {
      label: 'Calculate Step Order',
      onClick: calculateStepOrder,
    },
    {
      label: 'Calculate Step Order (w/ workers)',
      onClick: useWorkers,
    },
  ],
  id: 7,
  inputs,
  title: 'The Sum of Its Parts',
}

export default day07
