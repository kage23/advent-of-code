import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2016/Day08'

let prevInputKey = ''
let screen = ['']

const getGridSize = (inputKey: string): { rows: number, cols: number } => {
  if (inputKey.indexOf('DEMO') !== -1) return { rows: 3, cols: 7 }
  else return { rows: 6, cols: 50 }
}

const resetGrid = (inputKey: string) => {
  const grid = []
  const { rows, cols } = getGridSize(inputKey)

  for (let row = 0; row < rows; row++) {
    grid[row] = ''
    for (let col = 0; col < cols; col++) grid[row] += '.'
  }
  return grid
}

const rotateColumn = (screen: string[], column: number, rotate: number): string[] => {
  const newScreen = screen.map(row => row.split(''))

  newScreen.forEach((row, i) => {
    const fromRow = i - rotate > -1 ? i - rotate : screen.length + (i - rotate)

    row[column] = screen[fromRow].charAt(column)
  })

  return newScreen.map(row => row.join(''))
}

const BUTTONS: IButton[] = [
  {
    label: 'Swipe Card',
    onClick: inputKey => {
      const input = INPUT[inputKey]

      input.split('\n').forEach(instruction => {
        if (instruction.startsWith('rect')) {
          const numbersStr = instruction.split(' ')[1]
          const width = parseInt(numbersStr)
          const height = parseInt(numbersStr.split('x')[1])
          for (let row = 0; row < height; row++) {
            screen[row] = `${''.padEnd(width, '#')}${screen[row].slice(width)}`
          }
        } else if (instruction.startsWith('rotate row')) {
          const row = parseInt(instruction.split('row y=')[1])
          const rotate = parseInt(instruction.split(' by ')[1])
          screen[row] = `${screen[row].slice(rotate * -1)}${screen[row].slice(0, screen[row].length - rotate)}`
        } else if (instruction.startsWith('rotate column')) {
          const column = parseInt(instruction.split('column x=')[1])
          const rotate = parseInt(instruction.split(' by ')[1])
          screen = rotateColumn(screen, column, rotate)
        }
      })

      let litPixelCount = 0
      for (const row of screen) {
        for (const pixel of row) {
          if (pixel === '#') litPixelCount++
        }
      }

      return {
        answer1: litPixelCount.toString(),
        answer2: ''
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    prevInputKey = inputKey
    screen = resetGrid(inputKey)
  }

  return (
    <div className="render-box">
      <div>
        <h3>Input:</h3>
        <pre>{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div className="render-box--left-margin">
        <h3>Screen:</h3>
        <pre>
          {screen.join('\n')}
        </pre>
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> pixels are lit.
    </span>
  ),
  answer2Text: () => (
    <span>
      I hope you can read it below!
    </span>
  ),
  buttons: BUTTONS,
  day: 8,
  INPUT,
  renderDay,
  title: 'Two-Factor Authentication'
}

export default config