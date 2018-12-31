import React from 'react'
import {
  IButton,
  IDayConfig
 } from '../Config'

import INPUT from './Input/Day10'

interface IStar {
  id: number | 'max' | 'min'
  position: number[]
  velocity: number[]
}

interface IStarfield {
  max: number[]
  min: number[]
  stars: IStar[]
}

let starfield: IStarfield = {
  max: [0, 0],
  min: [0, 0],
  stars: []
}
let prevInputKey = ''
let time = 0

const step = (stars: IStar[]): IStarfield => {
  const min = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  const max = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
  for (const star of stars) {
    if (star.id !== 'min' && star.id !== 'max') {
      min[0] = Math.min(min[0], star.position[0] + star.velocity[0])
      min[1] = Math.min(min[1], star.position[1] + star.velocity[1])
      max[0] = Math.max(max[0], star.position[0] + star.velocity[0])
      max[1] = Math.max(max[1], star.position[1] + star.velocity[1])
    }
    star.position = [star.position[0] + star.velocity[0], star.position[1] + star.velocity[1]]
  }
  time++
  return {
    stars,
    max,
    min
  }
}

const stepBack = (stars: IStar[]): IStarfield => {
  const min = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  const max = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
  for (const star of stars) {
    if (star.id !== 'min' && star.id !== 'max') {
      min[0] = Math.min(min[0], star.position[0] - star.velocity[0])
      min[1] = Math.min(min[1], star.position[1] - star.velocity[1])
      max[0] = Math.max(max[0], star.position[0] - star.velocity[0])
      max[1] = Math.max(max[1], star.position[1] - star.velocity[1])
    }
    star.position = [star.position[0] - star.velocity[0], star.position[1] - star.velocity[1]]
  }
  time--
  return {
    stars,
    max,
    min
  }
}

const findMessage = (stars: IStar[], time: number = 0)
: {
  starfield: IStarfield
  time: number
} => {
  let currMin = [0,0]
  let currMax = [0,0]
  for (const star of stars) {
    currMin = [Math.min(currMin[0], star.position[0]), Math.min(currMin[1], star.position[1])]
    currMax = [Math.max(currMax[0], star.position[0]), Math.max(currMax[1], star.position[1])]
  }
  let prevHeight = currMax[1] - currMin[1]

  let next = {
    stars,
    min: currMin,
    max: currMax
  }

  while ((next.max[1] - next.min[1]) <= prevHeight) {
    prevHeight = next.max[1] - next.min[1]
    next = step(next.stars)
    time++
    for (const star of next.stars) {
      currMin = [Math.min(currMin[0], star.position[0]), Math.min(currMin[1], star.position[1])]
      currMax = [Math.max(currMax[0], star.position[0]), Math.max(currMax[1], star.position[1])]
    }
  }

  const final = stepBack(next.stars)
  time--

  return {
    starfield: final,
    time
  }
}

const getStars = (inputKey: string): IStarfield => {
  const min = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]
  const max = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]
  const stars: IStar[] = INPUT[inputKey].split('\n')
  .map((line, id) => {
    const posX = parseInt(line.slice(line.indexOf('<') + 1))
    const posY = parseInt(line.slice(line.indexOf(', ') + 1))
    const velX = parseInt(line.slice(line.lastIndexOf('<') + 1))
    const velY = parseInt(line.slice(line.lastIndexOf(', ') + 1))
    min[0] = Math.min(min[0], posX)
    min[1] = Math.min(min[1], posY)
    max[0] = Math.max(max[0], posX)
    max[1] = Math.max(max[1], posY)

    return {
      id,
      position: [posX, posY],
      velocity: [velX, velY]
    }
  })
  return {
    min,
    max,
    stars
  }
}

const getStarField = (stars: IStar[], min: number[], max: number[])
: Array<string | JSX.Element> => {
  const field: Array<string | JSX.Element> = []

  const yOff = min[1] * -1
  for (let y = min[1]; y <= max[1]; y++) {
    field[y + yOff] = ''
    for (let x = min[0]; x <= max[0]; x++) {
      let star = stars.some(sStar => sStar.position[0] === x && sStar.position[1] === y)
      field[y + yOff] += star ? '#' : '.'
    }
  }
  return field
}

const getStarRows = (starfield: IStarfield): JSX.Element[] => {
  const { stars } = starfield
  const starRows: JSX.Element[] = []
  const { min, max } = starfield
  if (max[1] - min[1] < 400 && max[0] - min[0] < 400) {
    getStarField(stars, min, max).forEach((row, i) => starRows.push(<div key={i}>{row}</div>))
  } else {
    starRows.push((
      <div
        key="no-render-stars"
        style={{ minWidth: '330px' }}
      >
        The display will only render if the field width and height are each under 400!
      </div>
    ))
  }
  return starRows
}

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (inputKey !== prevInputKey) {
    starfield = getStars(inputKey)
    time = 0
  }
  prevInputKey = inputKey

  return (
    <div className="render-box render-box--no-wrap">
      <pre>
        <p>Input:</p>
        <p>{dayConfig.INPUT[inputKey]}</p>
      </pre>
      <div
        style={{
          display: 'block',
          flex: 0
        }}
      >
        <p>Stars:</p>
        <div style={{ display: 'flex' }}>
          <fieldset>
            {getStarRows(starfield)}
          </fieldset>
        </div>
      </div>
    </div>
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Advance One Second',
    onClick: () => {
      starfield = step(starfield.stars)
      return {
        answer1: time.toString()
      }
    }
  },
  {
    label: 'Reverse One Second',
    onClick: () => {
      starfield = stepBack(starfield.stars)
      return {
        answer1: time.toString()
      }
    }
  },
  {
    label: 'Find Message',
    onClick: () => {
      const result = findMessage(starfield.stars, time)
      starfield = result.starfield
      time = result.time
      return {
        answer1: result.time.toString(),
        answer2: 'I hope you can see a message!!!'
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      Time: {answer}
    </span>
  ),
  answer2Text: (answer) => (
    <span>{answer}</span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay,
  title: 'The Stars Align'
}

export default config