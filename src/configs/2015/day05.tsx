import inputs from '../../inputs/2015/day05'
import { DayConfig } from '../../routes/Day'

export const isStringNice = (string: string): boolean => {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  let vowelCount = 0
  let double = false
  for (let i = 0; i < string.length; i++) {
    const char = string.charAt(i)
    if (vowels.includes(char)) {
      vowelCount++
    }
    if (i >= 1 && char === string.charAt(i - 1)) {
      double = true
    }
  }
  return (
    // It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
    vowelCount >= 3
    // It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
    && double
    // It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.
    && !string.includes('ab')
    && !string.includes('cd')
    && !string.includes('pq')
    && !string.includes('xy')
  )
}

export const isStringNice__v2 = (string: string): boolean => {
  // It contains a pair of any two letters that appears at least twice in the string without overlapping, like xyxy (xy) or aabcdefgaa (aa), but not like aaa (aa, but it overlaps).
  let condition1 = false
  // It contains at least one letter which repeats with exactly one letter between them, like xyx, abcdefeghi (efe), or even aaa.
  let condition2 = false

  for (let i = 0; i < string.length; i++) {
    const pairStr = string.slice(i, i + 2)
    if (string.slice(i + 2).includes(pairStr)) condition1 = true
    if (string.charAt(i) === string.charAt(i + 2)) condition2 = true
    if (condition1 && condition2) return true
  }

  return false
}

export const areStringsNice = (inputKey: string) => {
  const strings = inputs.get(inputKey)!.split('\n')
  return {
    answer1: strings.filter(string => isStringNice(string)).length
  }
}

export const areStringsNice__v2 = (inputKey: string) => {
  const strings = inputs.get(inputKey)!.split('\n')
  return {
    answer2: strings.filter(string => isStringNice__v2(string)).length
  }
}

const day05: Omit<DayConfig, 'year'> = {
  answer1Text: 'There are answer nice strings.',
  answer2Text: 'There are answer nice strings, under the new rules.',
  buttons: [
    {
      label: 'Count Nice Strings',
      onClick: areStringsNice
    },
    {
      label: 'Count Nice Strings, v.2',
      onClick: areStringsNice__v2
    }
  ],
  id: 5,
  inputs,
  title: `Doesn't He Have Intern-Elves For This?`,
}

export default day05
