import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day16'

let prevInputKey = ''
let programs = ''

const exchange = (programs: string, a: number, b: number): string => {
  const x = Math.min(a, b)
  const y = Math.max(a, b)

  return `${programs.slice(0, x)
    }${programs.charAt(y)
    }${programs.slice(x + 1, y)
    }${programs.charAt(x)
    }${programs.slice(y + 1)
    }`
}

const partner = (programs: string, a: string, b: string): string => {
  const x = Math.min(programs.indexOf(a), programs.indexOf(b))
  const y = Math.max(programs.indexOf(a), programs.indexOf(b))

  return `${programs.slice(0, x)
    }${programs.charAt(y)
    }${programs.slice(x + 1, y)
    }${programs.charAt(x)
    }${programs.slice(y + 1)
    }`
}

const spin = (programs: string, x: number): string => (
  `${programs.slice(x * -1)}${programs.slice(0, programs.length - x)}`
)

const dance = (programs: string, instruction: string): string => {
  switch (instruction[0]) {
    case 's':
      return spin(programs, parseInt(instruction.slice(1)))

    case 'x':
      const [a, b] = instruction.slice(1).split('/')
      return exchange(programs, parseInt(a), parseInt(b))

    case 'p':
      const [c, d] = instruction.slice(1).split('/')
      return partner(programs, c, d)

    default:
      return ''
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Dance',
    onClick: (inputKey) => {
      INPUT[inputKey].split(',').forEach(instruction => {
        programs = dance(programs, instruction)
      })
      return {
        answer1: programs
      }
    }
  },
  {
    label: 'Dance a Billion',
    onClick: (inputKey) => {
      const danceCount = 1000000000
      const instructions = INPUT[inputKey].split(',')
      const instrLen = instructions.length
      let count = 0
      const programsAtTime: string[] = []
      const seenBefore: Map<string, number> = new Map()
      programs = inputKey === 'DEMO'
        ? 'abcde'
        : 'abcdefghijklmnop'
      while (count < danceCount && typeof seenBefore.get(programs) === 'undefined') {
        seenBefore.set(programs, count)
        programsAtTime.push(programs)
        for (let i = 0; i < instrLen; i++) {
          programs = dance(programs, instructions[i])
        }
        count++
      }
      if (count < danceCount) {
        const seenAt = seenBefore.get(programs) || 0
        const loopSize = count - seenAt
        const remaining = danceCount - count
        programs = programsAtTime[seenAt + (remaining % loopSize)]
        count = danceCount
      }
      return {
        answer2: programs
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    programs = inputKey === 'DEMO'
      ? 'abcde'
      : 'abcdefghijklmnop'
    prevInputKey = inputKey
  }

  return (
    <div className="render-box">
      <h3>Programs:</h3>
      <pre>{programs}</pre>
      <h3>Input:</h3>
      <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The programs' final order is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      After a billion dances, the programs' final order is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 16,
  INPUT,
  renderDay,
  title: 'Permutation Promenade'
}

export default config