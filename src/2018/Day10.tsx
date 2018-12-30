import React from 'react'
import {
  IButton,
  IDayConfig
 } from '../Config'

import INPUT from './Input/Day10'

interface IStar {
  position: number[]
  velocity: number[]
}

interface IStarfield {
  max: number[]
  min: number[]
  stars: IStar[]
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
  if (max[1] - min[1] < 1000 && max[0] - min[0] < 1000) {
    getStarField(stars, min, max).forEach((row, i) => starRows.push(<div key={i}>{row}</div>))
  } else {
    starRows.push((
      <div
        style={{ minWidth: '330px' }}
      >
        The display will only render if the field width and height are each under 1000!
      </div>
    ))
  }
  return starRows
}

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  const starfield = getStars(inputKey)

  return (
    <div className="render-box">
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

const BUTTONS: IButton[] = []

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The solution is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay,
  title: 'The Stars Align'
}

export default config