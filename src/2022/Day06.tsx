import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day06'

const findStartOfPacketMarker = (inputKey: string): number => {
  const input = INPUT[inputKey]
  for (let i = 4; i < input.length; i++) {
    const chars = input.slice(i - 4, i).split('')
    if (chars.every((x, i) => chars.indexOf(x) === i)) {
      return i
    }
  }
  throw new Error(`can't find the answer`)
}

const findStartOfMessageMarker = (inputKey: string): number => {
  const input = INPUT[inputKey]
  for (let i = 14; i < input.length; i++) {
    const chars = input.slice(i - 14, i).split('')
    if (chars.every((x, i) => chars.indexOf(x) === i)) {
      return i
    }
  }
  throw new Error(`can't find the answer`)
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Start-of-Packet Marker',
    onClick: (inputKey: string) => {
      return {
        answer1: findStartOfPacketMarker(inputKey).toString()
      }
    }
  },
  {
    label: 'Find Start-of-Message Marker',
    onClick: (inputKey: string) => {
      return {
        answer2: findStartOfMessageMarker(inputKey).toString()
      }
    }
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The start-of-packet marker is{' '}
      <code>{answer}</code> characters in.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The start-of-message marker is{' '}
      <code>{answer}</code> characters in.
    </span>
  ),
  buttons: BUTTONS,
  day: 6,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Tuning Trouble'
}

export default config
