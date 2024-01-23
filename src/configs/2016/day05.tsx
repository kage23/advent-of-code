import md5 from 'md5'
import inputs from '../../inputs/2016/day05'
import { DayConfig } from '../../routes/Day'

export const findPassword = (input: string) => {
  let password = ''

  let i = 0
  while (password.length < 8) {
    const hash = md5(`${input}${i}`)
    if (hash.startsWith('00000')) {
      password += hash.charAt(5)
    }
    i += 1
  }

  return {
    answer1: password,
  }
}

export const findBetterPassword = (input: string) => {
  let password = '________'

  let i = 0
  while (password.indexOf('_') !== -1) {
    const hash = md5(`${input}${i}`)
    if (hash.startsWith('00000') && parseInt(hash.charAt(5)) < 8) {
      const index = parseInt(hash.charAt(5))
      if (password.charAt(index) === '_') {
        password = `${password.slice(0, index)}${hash.charAt(
          6
        )}${password.slice(index + 1)}`
      }
    }
    i += 1
  }

  return {
    answer2: password,
  }
}

const day05: Omit<DayConfig, 'year'> = {
  answer1Text: 'The password is answer.',
  answer2Text: 'The password is answer.',
  buttons: [
    {
      label: 'Find Password',
      onClick: findPassword,
    },
    {
      label: 'Find Better Password',
      onClick: findBetterPassword,
    },
  ],
  id: 5,
  inputs,
  title: 'How About a Nice Game of Chess?',
}

export default day05
