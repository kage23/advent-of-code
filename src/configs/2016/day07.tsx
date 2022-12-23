import inputs from '../../inputs/2016/day07'
import { DayConfig } from '../../routes/Day'

const hasAbba = (input: string): boolean => {
  for (let i = 0; i <= input.length - 4; i++) {
    const a = input[i]
    const b = input[i + 1]
    if (a !== b && input.slice(i, i + 4) === `${a}${b}${b}${a}`) return true
  }
  return false
}

const getSequences = (
  input: string
): {
  supernetSequences: string[]
  hypernetSequences: string[]
} => {
  const supernetSequences: string[] = ['']
  const hypernetSequences: string[] = []
  let inHyper = false
  let superIndex = 0
  let hyperIndex = -1

  for (const character of input) {
    switch (character) {
      case '[':
        inHyper = true
        hyperIndex++
        hypernetSequences[hyperIndex] = ''
        break

      case ']':
        inHyper = false
        superIndex++
        supernetSequences[superIndex] = ''
        break

      default:
        if (inHyper) hypernetSequences[hyperIndex] += character
        else supernetSequences[superIndex] += character
    }
  }

  return {
    supernetSequences,
    hypernetSequences,
  }
}

const checkForTLS = (input: string): boolean => {
  const { supernetSequences, hypernetSequences } = getSequences(input)

  return (
    supernetSequences.some((sequence) => hasAbba(sequence)) &&
    !hypernetSequences.some((sequence) => hasAbba(sequence))
  )
}

const getAbas = (input: string): { a: string; b: string }[] => {
  const abas: { a: string; b: string }[] = []

  for (let i = 0; i <= input.length - 3; i++) {
    const a = input[i]
    const b = input[i + 1]
    if (a !== b && input.slice(i, i + 3) === `${a}${b}${a}`) abas.push({ a, b })
  }

  return abas
}

const checkForSSL = (input: string): boolean => {
  const { supernetSequences, hypernetSequences } = getSequences(input)

  const abas = supernetSequences.map((sequence) => getAbas(sequence)).flat()

  for (const aba of abas) {
    if (
      hypernetSequences.some(
        (sequence) => sequence.indexOf(`${aba.b}${aba.a}${aba.b}`) !== -1
      )
    )
      return true
  }

  return false
}

export const checkIPsForTLSSupport = (inputKey: string) => {
  return {
    answer1: inputs
      .get(inputKey)!
      .split('\n')
      .filter((line) => checkForTLS(line)).length,
  }
}

export const checkIPsForSSLSupport = (inputKey: string) => {
  return {
    answer2: inputs
      .get(inputKey)!
      .split('\n')
      .filter((line) => checkForSSL(line)).length,
  }
}

const day07: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer IPs support TLS.',
  answer2Text: 'answer IPs support SSL.',
  buttons: [
    {
      label: 'Check IPs for TLS Support',
      onClick: checkIPsForTLSSupport,
    },
    {
      label: 'Check IPs for SSL Support',
      onClick: checkIPsForSSLSupport,
    },
  ],
  id: 7,
  inputs,
  title: 'Internet Protocol Version 7',
}

export default day07
