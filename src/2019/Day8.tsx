import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day8'

const IMAGE_SIZES_BY_INPUT_KEY: {
  [key:string]: {
    height: number
    width: number
  }
} = {
  DEMO_1_0: {
    height: 2,
    width: 3
  },
  DEMO_2_0: {
    height: 2,
    width: 2
  },
  REAL: {
    height: 6,
    width: 25
  }
}

const getLayers = (inputKey: string) => {
  const input = INPUT[inputKey]
  const { height, width } = IMAGE_SIZES_BY_INPUT_KEY[inputKey]
  const result: string[] = []

  const { length } = input

  for (let i = 0; i < length; i++) {
    const char = input.charAt(i)
    const layer = Math.floor(i / (width * height))
    if (!result[layer]) {
      result[layer] = char
    } else {
      result[layer] = `${result[layer]}${char}`
    }
  }

  return result
}

const getLayerWithFewestZeroes = (layers: string[]): string => {
  let minZeroCount = Number.MAX_SAFE_INTEGER
  let minZeroLayer = ''
  const { length } = layers
  for (let i = 0; i < length; i++) {
    const layer = layers[i]
    const zeroCount = layer.split('').filter(x => x === '0').length
    if (zeroCount < minZeroCount) {
      minZeroCount = zeroCount
      minZeroLayer = layer
    }
  }
  return minZeroLayer
}

let image: number[][] = []

const BUTTONS: IButton[] = [
  {
    label: 'Get Part 1 Checksum',
    onClick: (inputKey: string) => {
      const layers = getLayers(inputKey)
      const fewZeroesLayer = getLayerWithFewestZeroes(layers)
      const oneCount = fewZeroesLayer.split('').filter(x => x === '1').length
      const twoCount = fewZeroesLayer.split('').filter(x => x === '2').length

      return {
        answer1: (oneCount * twoCount).toString()
      }
    }
  },
  {
    label: 'Render Image',
    onClick: (inputKey: string) => {
      const layers = getLayers(inputKey)

      const { width } = IMAGE_SIZES_BY_INPUT_KEY[inputKey]
      image = []

      for (let i = 0; i < layers.length; i++) {
        const layer = layers[i]
        for (let j = 0; j < layer.length; j++) {
          const char = layer.charAt(j)
          const xPos = j % width
          const yPos = Math.floor(j / width)
          if (image[yPos] === undefined) image[yPos] = []
          if (image[yPos][xPos] === undefined || image[yPos][xPos] === 2) {
            image[yPos][xPos] = parseInt(char)
          }
        }
      }

      return {
        answer2: ''
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => (
  <div className="render-box">
    <h3>Input:</h3>
    <p style={{ marginTop: 0 }}>{dayConfig.INPUT[inputKey]}</p>

    <h3>Image:</h3>
    <div>{
      image.map(row => (
        <pre style={{ margin: 0 }}>{
          row.map(char => char === 0 ? '█' : ' ')
        }</pre>
      ))
    }</div>
  </div>
)

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      On the layer with the fewest zeroes, the number of ones multiplied by the number of twos is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: () => (
    <span>
      Hopefully you can read the answer in the rendering!
    </span>
  ),
  buttons: BUTTONS,
  day: 8,
  INPUT,
  renderDay: (dayConfig, inputKey) => renderDay(dayConfig, inputKey),
  title: 'Space Image Format'
}

export default config
