import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day5'

const isNice = (string: string): boolean => {
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

const isNice__v2 = (string: string): boolean => {
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

const BUTTONS: IButton[] = [
  {
    label: 'Count Nice Strings',
    onClick: (inputKey) => {
      const strings = INPUT[inputKey].split('\n')
      return {
        answer1: strings.filter(string => isNice(string)).length.toString()
      }
    }
  },
  {
    label: 'Count Nice Strings, v. 2',
    onClick: (inputKey) => {
      const strings = INPUT[inputKey].split('\n')
      return {
        answer2: strings.filter(string => isNice__v2(string)).length.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There are <code>{answer}</code> nice strings.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      There are <code>{answer}</code> nice strings, under the new rules.
    </span>
  ),
  buttons: BUTTONS,
  day: 5,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: `Doesn't He Have Intern-Elves For This?`
}

export default config