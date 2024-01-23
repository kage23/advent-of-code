import inputs from '../../inputs/2019/day08'
import { DayConfig } from '../../routes/Day'

const getLayers = (input: string, height: number, width: number) => {
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
    const zeroCount = layer.split('').filter((x) => x === '0').length
    if (zeroCount < minZeroCount) {
      minZeroCount = zeroCount
      minZeroLayer = layer
    }
  }
  return minZeroLayer
}

export const getPart1Checksum = (input: string, height = 6, width = 25) => {
  const layers = getLayers(input, height, width)
  const fewZeroesLayer = getLayerWithFewestZeroes(layers)
  const oneCount = fewZeroesLayer.split('').filter((x) => x === '1').length
  const twoCount = fewZeroesLayer.split('').filter((x) => x === '2').length

  return {
    answer1: oneCount * twoCount,
  }
}

export const renderImage = (input: string, height = 6, width = 25) => {
  const layers = getLayers(input, height, width)

  const image: number[][] = []

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

  const imageRender = (
    <>
      <h3>Image:</h3>
      <div>
        {image.map((row, i) => (
          <pre key={i} style={{ margin: 0 }}>
            {row.map((char) => (char === 0 ? '█' : ' '))}
          </pre>
        ))}
      </div>
    </>
  )

  return {
    answer2: '',
    specialRender: imageRender,
  }
}

const day08: Omit<DayConfig, 'year'> = {
  answer1Text:
    'On the layer with the fewest zeroes, the number of ones multiplied by the number of twos is answer.',
  answer2Text: 'Hopefully you can see what you need in the rendering below!',
  buttons: [
    {
      label: 'Get Part 1 Checksum',
      onClick: getPart1Checksum,
    },
    {
      label: 'Render Image',
      onClick: renderImage,
    },
  ],
  id: 8,
  inputs,
  title: 'Space Image Format',
}

export default day08
