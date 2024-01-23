import inputs from '../../inputs/2022/day06'
import { DayConfig } from '../../routes/Day'

export const findStartOfPacketMarker = (input: string) => {
  for (let i = 4; i < input.length; i++) {
    const chars = input.slice(i - 4, i).split('')
    if (chars.every((x, i) => chars.indexOf(x) === i)) {
      return { answer1: i }
    }
  }
}

export const findStartOfMessageMarker = (input: string) => {
  for (let i = 14; i < input.length; i++) {
    const chars = input.slice(i - 14, i).split('')
    if (chars.every((x, i) => chars.indexOf(x) === i)) {
      return { answer2: i }
    }
  }
}

const day06: Omit<DayConfig, 'year'> = {
  answer1Text: 'The start-of-packet marker is answer characters in.',
  answer2Text: 'The start-of-message marker is answer characters in.',
  buttons: [
    {
      label: 'Find Start-of-Packet Marker',
      onClick: findStartOfPacketMarker
    },
    {
      label: 'Find Start-of-Message Marker',
      onClick: findStartOfMessageMarker
    },
  ],
  id: 6,
  inputs,
  title: 'Tuning Trouble',
}

export default day06
