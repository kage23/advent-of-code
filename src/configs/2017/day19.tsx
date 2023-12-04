import inputs from '../../inputs/2017/day19'
import { DayConfig } from '../../routes/Day'

const move = (position: number[], direction: 'U' | 'R' | 'D' | 'L') => {
  switch (direction) {
    case 'U':
      position[0]--
      break

    case 'R':
      position[1]++
      break

    case 'D':
      position[0]++
      break

    case 'L':
      position[1]--
      break

    default:
      break
  }
}

const findNewDirection = (
  position: number[],
  map: string[],
  direction: 'U' | 'R' | 'D' | 'L'
): 'U' | 'R' | 'D' | 'L' => {
  switch (direction) {
    case 'U':
    case 'D': {
      const l = map[position[0]].charAt(position[1] - 1)
      if (l !== ' ' && l !== '') return 'L'
      else return 'R'
    }

    case 'L':
    case 'R':
    default: {
      const d = map[position[0] + 1]
        ? map[position[0] + 1].charAt(position[1])
        : ' '
      if (d !== ' ' && d !== '') return 'D'
      else return 'U'
    }
  }
}

export const followPath = (inputKey: string) => {
  let answer1 = ''
  let steps = 0
  const map = inputs.get(inputKey)!.split('\n')
  const position: number[] = [0, map[0].indexOf('|')] // y, x
  let direction: 'U' | 'R' | 'D' | 'L' = 'D'

  // eslint-disable-next-line no-constant-condition
  travelLoop: while (true) {
    switch (map[position[0]].charAt(position[1])) {
      case '|':
      case '-': {
        move(position, direction)
        steps++
        break
      }

      case '+': {
        direction = findNewDirection(position, map, direction)
        move(position, direction)
        steps++
        break
      }

      case ' ': {
        break travelLoop
      }

      default: {
        answer1 += map[position[0]].charAt(position[1])
        move(position, direction)
        steps++
        break
      }
    }
  }

  return {
    answer1,
    answer2: steps,
  }
}

const day19: Omit<DayConfig, 'year'> = {
  answer1Text: 'The collected letters are answer.',
  answer2Text: 'The packet took answer steps.',
  buttons: [
    {
      label: 'Follow Path',
      onClick: followPath,
    },
  ],
  id: 19,
  inputs,
  title: 'A Series of Tubes',
}

export default day19
