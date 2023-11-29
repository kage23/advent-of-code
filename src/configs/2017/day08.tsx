import inputs from '../../inputs/2017/day08'
import { DayConfig } from '../../routes/Day'

export const runProcess = (inputKey: string) => {
  const registers: Map<string, number> = new Map()

  const processCode = (input: string): {
    maxEver: number
  } => {
    let maxEver = Number.MIN_SAFE_INTEGER
    input.split('\n').forEach(line => {
      const [
        registerToActOn,
        action,
        amount,
        , // the word 'if'
        registerForCondition,
        condition,
        testAmount
      ] = line.split(' ')
      let doAction = false
      if (typeof registers.get(registerToActOn) === 'undefined') registers.set(registerToActOn, 0)
      if (typeof registers.get(registerForCondition) === 'undefined') registers.set(registerForCondition, 0)
      switch (condition) {
        case '>':
          if ((registers.get(registerForCondition) || 0) > parseInt(testAmount)) doAction = true
          break

        case '<':
          if ((registers.get(registerForCondition) || 0) < parseInt(testAmount)) doAction = true
          break

        case '>=':
          if ((registers.get(registerForCondition) || 0) >= parseInt(testAmount)) doAction = true
          break

        case '<=':
          if ((registers.get(registerForCondition) || 0) <= parseInt(testAmount)) doAction = true
          break

        case '==':
          if ((registers.get(registerForCondition) || 0) === parseInt(testAmount)) doAction = true
          break

        case '!=':
          if ((registers.get(registerForCondition) || 0) !== parseInt(testAmount)) doAction = true
          break

        default:
          break
      }
      if (doAction) {
        if (action === 'inc') {
          registers.set(registerToActOn, (registers.get(registerToActOn) || 0) + parseInt(amount))
        }
        if (action === 'dec') {
          registers.set(registerToActOn, (registers.get(registerToActOn) || 0) - parseInt(amount))
        }
        if ((registers.get(registerToActOn) || 0) > maxEver) {
          maxEver = registers.get(registerToActOn) || 0
        }
      }
    })
    return { maxEver }
  }

  const result = processCode(inputs.get(inputKey)!)

  let max = Number.MIN_SAFE_INTEGER

  for (const [, value] of registers.entries()) {
    if (value > max) {
      max = value
    }
  }

  return {
    answer1: max,
    answer2: result.maxEver
  }
}

const day08: Omit<DayConfig, 'year'> = {
  answer1Text: 'The largest value in any register is answer.',
  answer2Text: 'The largest value ever held in any register was answer.',
  buttons: [
    {
      label: 'Process Code',
      onClick: runProcess
    },
  ],
  id: 8,
  inputs,
  title: 'I Heard You Like Registers',
}

export default day08
