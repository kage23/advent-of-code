import inputs from '../../inputs/2016/day08'
import { DayConfig } from '../../routes/Day'

const rotateColumn = (
  screen: string[],
  column: number,
  rotate: number
): string[] => {
  const newScreen = screen.map((row) => row.split(''))

  newScreen.forEach((row, i) => {
    const fromRow = i - rotate > -1 ? i - rotate : screen.length + (i - rotate)

    row[column] = screen[fromRow].charAt(column)
  })

  return newScreen.map((row) => row.join(''))
}

export const swipeCard = (inputKey: string) => {
  const rows = inputKey.startsWith('DEMO') ? 3 : 6
  const cols = inputKey.startsWith('DEMO') ? 7 : 50
  let screen = Array(rows).fill(''.padEnd(cols, ' '))
  const input = inputs.get(inputKey)!

  input.split('\n').forEach((instruction) => {
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
      screen[row] = `${screen[row].slice(rotate * -1)}${screen[row].slice(
        0,
        screen[row].length - rotate
      )}`
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
    answer1: litPixelCount,
    answer2: '',
    specialRender: (
      <>
        <h3>Screen:</h3>
        <pre>{screen.join('\n')}</pre>
      </>
    ),
  }
}

const day08: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer pixels are lit.',
  answer2Text: 'I hope you can read it below!',
  buttons: [
    {
      label: 'Swipe the Card',
      onClick: swipeCard,
    },
  ],
  id: 8,
  inputs,
  title: 'Two-Factor Authentication',
}

export default day08
