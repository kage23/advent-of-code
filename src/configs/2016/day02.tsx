import inputs from '../../inputs/2016/day02'
import { DayConfig } from '../../routes/Day'

export const findBathroomCodePhonepadNumbers = (inputKey: string) => {
  const DOOR_BUTTONS = ['123', '456', '789']

  const inputLines = inputs.get(inputKey)!.split('\n')
  const currentPosition = [1, 1]
  let code = ''

  for (const line of inputLines) {
    for (let i = 0; i < line.length; i++) {
      switch (line.charAt(i)) {
        case 'U':
          currentPosition[1] = Math.max(0, currentPosition[1] - 1)
          break

        case 'D':
          currentPosition[1] = Math.min(2, currentPosition[1] + 1)
          break

        case 'L':
          currentPosition[0] = Math.max(0, currentPosition[0] - 1)
          break

        case 'R':
          currentPosition[0] = Math.min(2, currentPosition[0] + 1)
          break

        default:
          break
      }
    }
    code += DOOR_BUTTONS[currentPosition[1]].charAt(currentPosition[0])
  }

  return {
    answer1: code,
  }
}

export const findBathroomCodeRealButtons = (inputKey: string) => {
  const DOOR_BUTTONS = ['  1  ', ' 234 ', '56789', ' ABC ', '  D  ']
  const buttonRowLimits = [
    [2, 2],
    [1, 3],
    [0, 4],
    [1, 3],
    [2, 2],
  ]

  const inputLines = inputs.get(inputKey)!.split('\n')
  const currentPosition = [0, 2]
  let code = ''

  for (const line of inputLines) {
    for (let i = 0; i < line.length; i++) {
      switch (line.charAt(i)) {
        case 'U':
          if (
            currentPosition[1] - 1 >= 0 &&
            DOOR_BUTTONS[currentPosition[1] - 1].charAt(currentPosition[0]) !==
              ' '
          ) {
            currentPosition[1] = Math.max(0, currentPosition[1] - 1)
          }
          break

        case 'D':
          if (
            currentPosition[1] + 1 < DOOR_BUTTONS.length &&
            DOOR_BUTTONS[currentPosition[1] + 1].charAt(currentPosition[0]) !==
              ' '
          ) {
            currentPosition[1] += 1
          }
          break

        case 'L':
          currentPosition[0] = Math.max(
            buttonRowLimits[currentPosition[1]][0],
            currentPosition[0] - 1
          )
          break

        case 'R':
          currentPosition[0] = Math.min(
            buttonRowLimits[currentPosition[1]][1],
            currentPosition[0] + 1
          )
          break

        default:
          break
      }
    }
    code += DOOR_BUTTONS[currentPosition[1]].charAt(currentPosition[0])
  }

  return {
    answer2: code,
  }
}

const day02: Omit<DayConfig, 'year'> = {
  answer1Text: 'The bathroom code is answer.',
  answer2Text: 'The actual bathroom code is answer.',
  buttons: [
    {
      label: 'Find Bathroom Code (Phonepad Numbers)',
      onClick: findBathroomCodePhonepadNumbers,
    },
    {
      label: 'Find Bathroom Code (Real Buttons)',
      onClick: findBathroomCodeRealButtons,
    },
  ],
  id: 2,
  inputs,
  title: 'Bathroom Security',
}

export default day02
