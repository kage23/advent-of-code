import { defaultRenderDay, IButton, IDayConfig } from '../Config'

import INPUT from '../Inputs/2022/Day22'

const takeStep = (
  [row, col, dir]: [number, number, number],
  step: string,
  map: string[]
): [number, number, number] => {
  const position: [number, number, number] = [row, col, dir]
  const distance = parseInt(step)
  if (isNaN(distance)) {
    if (step === 'L') {
      position[2] = (position[2] + 4 - 1) % 4
    }
    if (step === 'R') {
      position[2] = (position[2] + 1) % 4
    }
  } else {
    switch (position[2]) {
      case 0: {
        // Right
        rightLoop: for (let i = 1; i <= distance; i++) {
          const nextPosition = map[position[0]].charAt(position[1] + 1)
          nextPositionSwitch: switch (nextPosition) {
            case '.': {
              // Open space, we can move there
              position[1] = position[1] + 1
              break nextPositionSwitch
            }
            case '#': {
              // Wall, stop moving entirely
              break rightLoop
            }
            case ' ':
            case '': {
              // Off the map, wrap around
              const firstSpace = map[position[0]].indexOf('.')
              const firstWall = map[position[0]].indexOf('#')
              if (firstSpace < firstWall) {
                position[1] = firstSpace
              } else {
                break rightLoop
              }
              break nextPositionSwitch
            }
            default: {
              break nextPositionSwitch
            }
          }
        }
        break
      }
      case 1: {
        // Down
        downLoop: for (let i = 1; i <= distance; i++) {
          let nextRow = (position[0] + 1) % map.length
          let nextPosition = map[nextRow].charAt(position[1])
          nextPositionSwitch: switch (nextPosition) {
            case '.': {
              // Open space, we can move there
              position[0] = position[0] + 1
              break nextPositionSwitch
            }
            case '#': {
              // Wall, stop moving entirely
              break downLoop
            }
            case ' ':
            case '': {
              // Off the map, wrap around
              while (nextPosition === ' ' || nextPosition === '') {
                nextRow = (nextRow + 1) % map.length
                nextPosition = map[nextRow].charAt(position[1])
              }
              if (nextPosition === '.') {
                position[0] = nextRow
              }
              if (nextPosition === '#') {
                break downLoop
              }
              break nextPositionSwitch
            }
            default: {
              break nextPositionSwitch
            }
          }
        }
        break
      }
      case 2: {
        // Left
        leftLoop: for (let i = 1; i <= distance; i++) {
          const nextPosition = map[position[0]].charAt(
            (position[1] - 1 + map[position[0]].length) %
              map[position[0]].length
          )
          nextPositionSwitch: switch (nextPosition) {
            case '.': {
              // Open space, we can move there
              position[1] =
                (position[1] - 1 + map[position[0]].length) %
                map[position[0]].length
              break nextPositionSwitch
            }
            case '#': {
              // Wall, stop moving entirely
              break leftLoop
            }
            case ' ':
            case '': {
              // Off the map, wrap around
              const lastSpace = map[position[0]].lastIndexOf('.')
              const lastWall = map[position[0]].lastIndexOf('#')
              if (lastSpace > lastWall) {
                position[1] = lastSpace
              } else {
                break leftLoop
              }
              break nextPositionSwitch
            }
            default: {
              break nextPositionSwitch
            }
          }
        }
        break
      }
      case 3: {
        // Up
        upLoop: for (let i = 1; i <= distance; i++) {
          let nextRow = (position[0] - 1 + map.length) % map.length
          let nextPosition = map[nextRow].charAt(position[1])
          nextPositionSwitch: switch (nextPosition) {
            case '.': {
              // Open space, we can move there
              position[0] = nextRow
              break nextPositionSwitch
            }
            case '#': {
              // Wall, stop moving entirely
              break upLoop
            }
            case ' ':
            case '': {
              // Off the map, wrap around
              while (nextPosition === ' ' || nextPosition === '') {
                nextRow = (nextRow - 1 + map.length) % map.length
                nextPosition = map[nextRow].charAt(position[1])
              }
              if (nextPosition === '.') {
                position[0] = nextRow
              }
              if (nextPosition === '#') {
                break upLoop
              }
              break nextPositionSwitch
            }
            default: {
              break nextPositionSwitch
            }
          }
        }
        break
      }
    }
  }
  return position
}

const BUTTONS: IButton[] = [
  {
    label: 'Get the Password',
    onClick: (inputKey: string) => {
      const [mapRaw, path] = INPUT[inputKey].split('\n\n')
      const map = mapRaw.split('\n')

      // [row, col, dir]
      // Facing is 0 for right (>), 1 for down (v), 2 for left (<), and 3 for up (^).
      let position: [number, number, number] = [0, map[0].indexOf('.'), 0]

      let x = 0
      const nextStepRegex = /[RL]|\d*/
      while (x < path.length) {
        const nextStep = path.slice(x).match(nextStepRegex)
        if (!nextStep) throw new Error('something fucked up')
        position = takeStep(position, nextStep[0], map)
        x += nextStep[0].length
      }

      return {
        answer1: (
          (position[0] + 1) * 1000 +
          (position[1] + 1) * 4 +
          position[2]
        ).toString(),
      }
    },
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The root monkey's number is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      If you shout <code>{answer}</code>, the root monkey's equality check will
      pass.
    </span>
  ),
  buttons: BUTTONS,
  day: 22,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Monkey Map',
}

export default config
