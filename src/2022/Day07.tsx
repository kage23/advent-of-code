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

// const parseInput = (inputKey: string) => {
//   const fileTree = new Tree<Directory | File>({ id: '/' })
//   let currDir = fileTree.head

//   INPUT[inputKey].split('\n').forEach(line => {
//     const x = line.split(' ')
//     if (x[0] === '$') {
//       // It's an instruction, either cd or ls
//       if (x[1] === 'cd') {
//         if (x[2] === '/') {
//           currDir = fileTree.head
//         } else if (x[2] === '..') {
//           if (!currDir.parent) throw new Error('something fucked up')
//           currDir = currDir.parent
//         } else {
//           const nextDir = currDir.branches.find(({ value: { id } }) => id === x[2])
//           if (!nextDir) throw new Error('something fucked up')
//           currDir = nextDir
//         }
//       }
//     } else {
//       // It's the result of an ls command
//       if (x[0] === 'dir') {
//         currDir.push({ id: x[1] })
//       } else {
//         currDir.push({ id: x[1], size: Number(x[0]) })
//       }
//     }
//   })
//   return fileTree
// }

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
      if (x[1] === 'cd') {
        if (x[2] === '/') {
          currDir = root
        } else if (x[2] === '..') {
          currDir = currDir.parent!
        } else {
          currDir = currDir.children.find(y => y.hasOwnProperty('children') && y.id === x[2]) as Directory
        }
      }
    } else {
      // It's the result of an ls command
      if (x[0] === 'dir') {
        const directory = { parent: currDir, children: [], id: x[1] }
        currDir.children.push(directory)
        directories.set(x[1], { directory })
      } else {
        currDir.children.push({ id: x[1], size: Number(x[0]) })
        files.set(x[1], Number(x[0]))
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

      // 967369 is wrong

      debugger

      return {
        answer1: Array.from(directories.keys())
          .map(dirId => getDirectorySize(dirId))
          .filter(x => x <= 100000)
          .reduce((a, b) => a + b)
          .toString()
      }
    }
  },
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
      The start-of-message marker is{' '}
      <code>{answer}</code> characters in.
    </span>
  ),
  buttons: BUTTONS,
  day: 7,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'No Space Left On Device'
}

export default config
