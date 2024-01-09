import inputs from '../../inputs/2022/day07'
import { DayConfig } from '../../routes/Day'

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

const parseInput = (input: string) => {
  directories.clear()
  files.clear()
  const root: Directory = { children: [], id: '/' }
  directories.set('/', { directory: root })
  let currDir = root
  input.split('\n').forEach(line => {
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
          // eslint-disable-next-line no-prototype-builtins
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
    // eslint-disable-next-line no-prototype-builtins
    child.hasOwnProperty('size')
      ? accum + (child as File).size
      : accum + getDirectorySize(child.id)
  ), 0)
  directories.set(id, { directory, size: dirSize })
  return dirSize
}

export const analyzeDiskSpace = (input: string) => {
  parseInput(input)

  return {
    answer1: Array.from(directories.keys())
      .map(dirId => getDirectorySize(dirId))
      .filter(x => x <= 100000)
      .reduce((a, b) => a + b)
  }
}

export const chooseDirectoryToDelete = (input: string) => {
  parseInput(input)
  const totalUsedSpace = getDirectorySize('/')
  const totalFreeSpace = 70000000 - totalUsedSpace
  const spaceToClear = 30000000 - totalFreeSpace

  const possibleDirsToDelete = Array.from(directories.keys())
    .map(dirId => getDirectorySize(dirId))
    .filter(x => x >= spaceToClear)
    .sort((a, b) => a - b)

  return {
    answer2: possibleDirsToDelete[0]
  }
}

const day07: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of the size of the smaller directories is answer.',
  answer2Text: 'The size of the directory to delete is answer.',
  buttons: [
    {
      label: 'Analyze Disk Space',
      onClick: analyzeDiskSpace
    },
    {
      label: 'Choose Directory to Delete',
      onClick: chooseDirectoryToDelete
    },
  ],
  id: 7,
  inputs,
  title: 'No Space Left On Device',
}

export default day07
