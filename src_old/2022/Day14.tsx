import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day14'

class SandDropper {
  field: string[]
  xOffset: number
  yMax: number

  constructor(inputKey: string, floor?: boolean) {
    const lines = INPUT[inputKey].split('\n')
    const xRange = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
    this.yMax = 0

    lines.forEach(line => {
      const points = line.split(' -> ')
      points.forEach(point => {
        const [, y] = point.split(',')
        this.yMax = Math.max(this.yMax, Number(y))
      })
    })

    xRange[0] = 500 - (this.yMax + 3)
    xRange[1] = 500 + (this.yMax + 3)

    this.xOffset = xRange[0]

    this.field = new Array(this.yMax + 3).fill(''.padStart(xRange[1] - xRange[0], '.'))

    lines.forEach(line => {
      const points = line.split(' -> ')
      for (let i = 1; i < points.length; i++) {
        let [fromX, fromY] = points[i - 1].split(',').map(n => Number(n))
        let [toX, toY] = points[i].split(',').map(n => Number(n))
        fromX -= this.xOffset
        toX -= this.xOffset
        if (fromX === toX) {
          for (let y = Math.min(fromY, toY); y <= Math.max(fromY, toY); y++) {
            this.field[y] = `${this.field[y].slice(0, fromX)}#${this.field[y].slice(fromX + 1)}`
          }
        }
        if (fromY === toY) {
          for (let x = Math.min(fromX, toX); x <= Math.max(fromX, toX); x++) {
            this.field[fromY] = `${this.field[fromY].slice(0, x)}#${this.field[fromY].slice(x + 1)}`
          }
        }
      }
    })

    if (floor) {
      this.field[this.yMax + 2] = ''.padStart(xRange[1] - xRange[0], '#')
      this.yMax += 2
    }
  }

  dropASand() {
    const prevPosition: [number, number] = [500 - this.xOffset, 0]
    let nextPosition = this.getNextSandPosition(...prevPosition)
    while (
      (nextPosition[0] !== prevPosition[0] || nextPosition[1] !== prevPosition[1]) &&
      nextPosition[1] <= this.yMax + 2
    ) {
      prevPosition[0] = nextPosition[0]
      prevPosition[1] = nextPosition[1]
      nextPosition = this.getNextSandPosition(...prevPosition)
    }
    if (this.field[nextPosition[1]]) {
      this.field[nextPosition[1]] =
        `${this.field[nextPosition[1]].slice(0, nextPosition[0])}o${this.field[nextPosition[1]].slice(nextPosition[0] + 1)}`
    }
    return nextPosition[1] <= this.yMax
  }

  getNextSandPosition(x: number, y: number): [number, number] {
    if (!this.field[y + 1]) return [x, y + 1]
    if (this.field[y + 1].charAt(x) === '.') return [x, y + 1]
    if (this.field[y + 1].charAt(x - 1) === '.') return [x - 1, y + 1]
    if (this.field[y + 1].charAt(x + 1) === '.') return [x + 1, y + 1]
    return [x, y]
  }

  flowSand() {
    let grains = 0
    while (this.field[0].charAt(500 - this.xOffset) !== 'o' && this.dropASand()) grains++
    return grains
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Flow the Sand',
    onClick: (inputKey: string) => {
      const sandDropper = new SandDropper(inputKey)

      return {
        answer1: sandDropper.flowSand().toString()
      }
    }
  },
  {
    label: 'Flow the Sand with a Floor',
    onClick: (inputKey: string) => {
      const sandDropper = new SandDropper(inputKey, true)

      return {
        answer2: sandDropper.flowSand().toString()
      }
    }
  },
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      <code>{answer}</code> grains of sand will come to rest.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      With a floor,{' '}
      <code>{answer}</code> grains of sand will come to rest.
    </span>
  ),
  buttons: BUTTONS,
  day: 14,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Regolith Reservoir'
}

export default config
