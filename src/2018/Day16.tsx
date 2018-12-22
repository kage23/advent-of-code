import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day16'

import OPERATIONS, { IOperation } from '../utils/Operations'
import {
  numArrEq
} from '../utils/Various'

interface ISample {
  before: number[]
  operation: IOperation
  after: number[]
}

interface IState {
  registers: number[]
  resultsTested: boolean
  samples: ISample[]
  testResults: number
  code: string
}

let state: IState = {
  registers: [0, 0, 0, 0],
  resultsTested: false,
  samples: [],
  testResults: 0,
  code: ''
}
let prevInputKey = ''
let matchingOpsList: number[] = []

const parseInputSamples = (input: string): ISample[] => {
  return input.split('\n\n')
  .map((sample: string) => {
    const sampleArr = sample.split('\n')
    const [
      code,
      inputA,
      inputB,
      outputC
    ] = sampleArr[1].split(' ').map(x => parseInt(x))

    return {
      before: JSON.parse(sampleArr[0].slice(8)),
      operation: {
        code,
        inputA,
        inputB,
        outputC
      },
      after: JSON.parse(sampleArr[2].slice(8))
    }
  })
}

const threeOrMoreOps = (sample: ISample): boolean => {
  let matchCount = 0

  for (const operation in OPERATIONS) {
    if (
      numArrEq(sample.after, OPERATIONS[operation](sample.operation, sample.before))
    ) matchCount++
    if (matchCount >= 3) return true
  }

  return false
}

const matchingOps = (sample: ISample): string[] => {
  const result = []

  for (const method in OPERATIONS) {
    if (
      numArrEq(sample.after, OPERATIONS[method](sample.operation, sample.before))
    ) result.push(method)
  }

  return result
}

const howManyMatchingOps = (sample: ISample): number => matchingOps(sample).length

const BUTTONS: IButton[] = [
  {
    label: 'Three or More Test',
    onClick: () => {
      const { samples } = state

      const testResults = samples.map(sample => threeOrMoreOps(sample)).filter(sample => sample).length

      return {
        answer1: testResults.toString()
      }
    }
  },
  {
    label: 'How Many Matching Ops',
    onClick: () => {
      const { samples } = state

      matchingOpsList = samples
      .map(sample => howManyMatchingOps(sample))
      .reduce((results, howMany): number[] => {
        if (!results[howMany]) results[howMany] = 1
        else results[howMany]++

        return results
      }, new Array(16))
      return {}
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  const [
    samplesRaw,
    codeRaw
  ] = dayConfig.INPUT[inputKey].split('\n\n\n\n')
  if (inputKey !== prevInputKey) {
    state.samples = parseInputSamples(samplesRaw)
    state.code = codeRaw
    prevInputKey = inputKey
  }

  const matchingOpsDisplay = matchingOpsList.map((result, index) => (
    <p key={index}>
      {result} samples matched {index} operations.
    </p>
  ))

  return (
    <div className="render-box">
      <div>
        <h3>There are {state.samples.length} samples:</h3>
        <pre>{samplesRaw}</pre>
      </div>
      <div style={{ marginLeft: '24px' }}>
        <h3>Code</h3>
        <pre>{state.code}</pre>
      </div>
      {matchingOpsList.length > 0 && (
        <div style={{ marginLeft: '24px' }}>
          {matchingOpsDisplay}
        </div>
      )}
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> samples behave like three or more opcodes.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 16,
  INPUT,
  renderDay,
  title: 'Chronal Classification'
}

export default config