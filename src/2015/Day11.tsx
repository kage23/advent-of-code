import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day11'

const containsTwoSeparatePairs = (input: string): boolean => {
  let pairCount = 0
  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i) === input.charAt(i + 1)) {
      pairCount++
      i++
    }
  }
  return pairCount >= 2
}

const hasStraight = (input: string): boolean => {
  for (let i = 0; i < input.length; i++) {
    const charCode1 = input.charCodeAt(i)
    const charCode2 = input.charCodeAt(i + 1)
    const charCode3 = input.charCodeAt(i + 2)
    if (charCode1 === charCode2 - 1 && charCode2 === charCode3 - 1) {
      return true
    }
  }
  return false
}

const incrementPassword = (input: string): string => {
  // 'a' is 97; 'z' is 122
  const nextLetterCode = input.charCodeAt(input.length - 1) + 1
  if (nextLetterCode <= 122) {
    return `${input.slice(0, -1)}${String.fromCharCode(nextLetterCode)}`
  } else {
    return `${incrementPassword(input.slice(0, -1))}a`
  }
}

const isViablePassword = (input: string): boolean => (
  // Exactly eight lowercase letters
  (input.length === 8 && input === input.toLowerCase())
  // Passwords must include one increasing straight of at least three letters, like abc, bcd, cde, and so on, up to xyz. They cannot skip letters; abd doesn't count.
  && hasStraight(input)
  // Passwords may not contain the letters i, o, or l, as these letters can be mistaken for other characters and are therefore confusing.
  && !['i', 'o', 'l'].some(bannedLetter => input.includes(bannedLetter))
  // Passwords must contain at least two different, non-overlapping pairs of letters, like aa, bb, or zz.
  && containsTwoSeparatePairs(input)
)

const BUTTONS: IButton[] = [
  {
    label: 'Find Next Viable Password',
    onClick: (inputKey) => {
      let password = incrementPassword(INPUT[inputKey])
      while (!isViablePassword(password)) {
        password = incrementPassword(password)
      }

      return {
        answer1: password
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The next viable password is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The NEXT next viable password is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 11,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Corporate Policy'
}

export default config