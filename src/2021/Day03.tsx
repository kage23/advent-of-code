import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2021/Day03'

const parseInput = (inputKey: string) => INPUT[inputKey].split('\n')

const getMostCommonValueInPosition = (binaries: string[], position: number) => {
  let zeroCount = 0
  let oneCount = 0
  binaries.forEach(binary => {
    if (binary.charAt(position) === '0') zeroCount++
    if (binary.charAt(position) === '1') oneCount++
  })
  if (zeroCount > oneCount) {
    return '0'
  } else if (oneCount > zeroCount) {
    return '1'
  }
  return null
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Power Consumption',
    onClick: (inputKey: string) => {
      const binaries = parseInput(inputKey)
      const binLength = binaries[0].length
      let gammaBin = ''
      let epsilonBin = ''

      for (let i = 0; i < binLength; i++) {
        const mostCommonForPosition = getMostCommonValueInPosition(binaries, i)
        if (mostCommonForPosition === '0') {
          gammaBin += '0'
          epsilonBin += '1'
        } else {
          gammaBin += '1'
          epsilonBin += '0'
        }
      }
      const gamma = parseInt(gammaBin, 2)
      const epsilon = parseInt(epsilonBin, 2)

      return {
        answer1: (gamma * epsilon).toString()
      }
    }
  },
  {
    label: 'Find Life Support Rating',
    onClick: (inputKey: string) => {
      const binaries = parseInput(inputKey)
      const binLength = binaries[0].length
      let oxyBins: string[] = [...binaries]
      let co2Bins: string[] = [...binaries]

      for (let i = 0; i < binLength; i++) {
        const oxyCommonValue = getMostCommonValueInPosition(oxyBins, i) || '1'
        const co2LeastValue = (
          getMostCommonValueInPosition(co2Bins, i) === '1' ||
          getMostCommonValueInPosition(co2Bins, i) === null
        ) ? '0' : '1'
        oxyBins = oxyBins.length === 1 ?
          oxyBins :
          oxyBins.filter(
            bin =>
              bin[i] === oxyCommonValue ||
              (oxyCommonValue === null && bin[i] === '1')
          )
        co2Bins = co2Bins.length === 1 ?
          co2Bins :
          co2Bins.filter(
            bin =>
              bin[i] === co2LeastValue ||
              (co2LeastValue === null && bin[i] === '0')
          )
      }

      const oxygenGenerator = parseInt(oxyBins[0], 2)
      const co2Scrubber = parseInt(co2Bins[0], 2)

      return {
        answer2: (oxygenGenerator * co2Scrubber).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The power consumption of the submarine is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The life support rating of the submarine is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 3,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Binary Diagnostic'
}

export default config
