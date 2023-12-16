import inputs from '../../inputs/2017/day04'
import { DayConfig } from '../../routes/Day'

const noRepeatedWordsValidity = (passphrase: string) => {
  const words = passphrase.split(' ')
  return !words.some((word) => words.indexOf(word) !== words.lastIndexOf(word))
}

const areAnagrams = (word1: string, word2: string): boolean => {
  if (word1.length !== word2.length) return false
  else {
    const testWord = word2.split('')
    for (let i = 0; i < word1.length; i++) {
      const foundIndex = testWord.indexOf(word1[i])
      if (foundIndex !== -1) testWord.splice(foundIndex, 1)
    }
    return testWord.length === 0
  }
}

const noAnagramsValidity = (passphrase: string): boolean => {
  const words = passphrase.split(' ')
  return !words.some((word, i) =>
    words.some((someWord, j) => i !== j && areAnagrams(word, someWord))
  )
}

export const passphrasesNoRepetition = (input: string) => ({
  answer1: input
    .split('\n')
    .filter((passphrase) => noRepeatedWordsValidity(passphrase)).length,
})

export const passphrasesNoAnagrams = (input: string) => ({
  answer2: input
    .split('\n')
    .filter((passphrase) => noAnagramsValidity(passphrase)).length,
})

const day04: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer passphrases are valid.',
  answer2Text: 'answer passphrases are valid.',
  buttons: [
    {
      label: 'Count Valid Passphrases (No Repeated Words)',
      onClick: passphrasesNoRepetition,
    },
    {
      label: 'Count Valid Passphrases (No Anagrams)',
      onClick: passphrasesNoAnagrams,
    },
  ],
  id: 4,
  inputs,
  title: 'High-Entropy Passphrases',
}

export default day04
