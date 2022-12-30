import inputs from '../../inputs/2016/day16'
import { DayConfig } from '../../routes/Day'

const generateDragonData = (a: string): string => {
  const b = a
    .split('')
    .reverse()
    .map((x) => (x === '0' ? '1' : '0'))
    .join('')
  return `${a}0${b}`
}

const getChecksumOnce = (data: string): string => {
  let checksum = ''
  for (let i = 0; i < data.length; i += 2) {
    const pair = [data.charAt(i), data.charAt(i + 1)]
    if (pair[0] === pair[1]) checksum += '1'
    else checksum += '0'
  }
  return checksum
}

const getChecksum = (data: string): string => {
  let checksum = getChecksumOnce(data)
  while (checksum.length % 2 === 0) checksum = getChecksumOnce(checksum)
  return checksum
}

export const fillDisk = (inputKey: string) => {
  const input = inputs.get(inputKey)!
  const discSize = inputKey.startsWith('DEMO') ? 20 : 272

  let disc = input

  while (disc.length < discSize) {
    disc = generateDragonData(disc)
  }

  disc = disc.slice(0, discSize)

  return {
    answer1: getChecksum(disc),
  }
}

export const fillBiggerDisk = (inputKey: string) => {
  const input = inputs.get(inputKey)!
  const discSize = 35651584

  let disc = input

  while (disc.length < discSize) {
    disc = generateDragonData(disc)
  }

  disc = disc.slice(0, discSize)

  return {
    answer2: getChecksum(disc),
  }
}

const day16: Omit<DayConfig, 'year'> = {
  answer1Text: 'The checksum of the filled disc is answer.',
  answer2Text: 'The checksum of the filled bigger disc is answer.',
  buttons: [
    {
      label: 'Fill Disk',
      onClick: fillDisk,
    },
    {
      label: 'Fill Bigger Disk',
      onClick: fillBiggerDisk,
    },
  ],
  id: 16,
  inputs,
  title: 'Dragon Checksum',
}

export default day16
