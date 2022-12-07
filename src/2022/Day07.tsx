import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2022/Day07'

interface File {
  id: string
  size: number
}
interface Directory {
  parent?: Directory
  children: (File | Directory)[]
  id: string
}

const directories: Map<string, { directory: Directory, size?: number }> = new Map()
const files: Map<string, number> = new Map()

const parseInput = (inputKey: string) => {
  directories.clear()
  files.clear()
  const root: Directory = { children: [], id: '/' }
  directories.set('/', { directory: root })
  let currDir = root
  INPUT[inputKey].split('\n').forEach(line => {
    const x = line.split(' ')
    if (x[0] === '$') {
      // It's an instruction, either cd or ls
      // We can ignore ls lines
      if (x[1] === 'cd') {
        if (x[2] === '/') {
          currDir = root
        } else if (x[2] === '..') {
          currDir = currDir.parent!
        } else {
          currDir = currDir.children.find(y => y.hasOwnProperty('children') && y.id.endsWith(x[2])) as Directory
        }
      }
    } else {
      // It's the result of an ls command
      const id = (() => {
        if (currDir.id === '/') return `/${x[1]}`
        return `${currDir.id}/${x[1]}`
      })()
      if (x[0] === 'dir') {
        const directory = { parent: currDir, children: [], id }
        currDir.children.push(directory)
        directories.set(id, { directory })
      } else {
        currDir.children.push({ id, size: Number(x[0]) })
        files.set(id, Number(x[0]))
      }
    }
  })
  return root
}

const getDirectorySize = (id: string): number => {
  if (!directories.has(id)) throw new Error('directory not found')
  const { directory, size } = directories.get(id)!
  if (size) return size
  const dirSize = directory.children.reduce((accum, child) => (
    child.hasOwnProperty('size')
      ? accum + (child as File).size
      : accum + getDirectorySize(child.id)
  ), 0)
  directories.set(id, { directory, size: dirSize })
  return dirSize
}

const BUTTONS: IButton[] = [
  {
    label: 'Analyze Disk Space',
    onClick: (inputKey: string) => {
      parseInput(inputKey)

      return {
        answer1: Array.from(directories.keys())
          .map(dirId => getDirectorySize(dirId))
          .filter(x => x <= 100000)
          .reduce((a, b) => a + b)
          .toString()
      }
    }
  },
  {
    label: 'Choose Directory to Delete',
    onClick: (inputKey: string) => {
      parseInput(inputKey)
      const totalUsedSpace = getDirectorySize('/')
      const totalFreeSpace = 70000000 - totalUsedSpace
      const spaceToClear = 30000000 - totalFreeSpace

      const possibleDirsToDelete = Array.from(directories.keys())
        .map(dirId => getDirectorySize(dirId))
        .filter(x => x >= spaceToClear)
        .sort((a, b) => a - b)

      return {
        answer2: possibleDirsToDelete[0].toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The sum of the size of the smaller directories is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The size of the directory to delete is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 7,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'No Space Left On Device'
}

export default config
