import inputs from '../../inputs/2017/day07'
import { DayConfig } from '../../routes/Day'

interface Program {
  name: string
  children: string[]
  parent?: string
  weight?: number
  totalWeight?: number
}

const parseInput = (input: string): Map<string, Program> => {
  const programs: Map<string, Program> = new Map()

  input.split('\n').forEach((row) => {
    const name = row.split(' ')[0]
    let program = programs.get(name)
    if (!program) {
      programs.set(name, {
        name,
        children: [],
      })
      program = programs.get(name)
    }
    if (program) program.weight = parseInt(row.split('(')[1])
    if (row.indexOf('->') !== -1) {
      row
        .split('-> ')[1]
        .split(', ')
        .forEach((child) => {
          if (program) program.children.push(child)
          let childProgram = programs.get(child)
          if (!childProgram) {
            programs.set(child, {
              name: child,
              children: [],
            })
            childProgram = programs.get(child)
          }
          if (childProgram) childProgram.parent = name
        })
    }
  })

  return programs
}

const calculateTotalWeight = (
  node: Program | undefined,
  nodes: Map<string, Program>
): number => {
  if (node === undefined) return NaN
  if (node.children.length === 0) {
    node.totalWeight = node.weight || 0
    return node.totalWeight
  }
  node.totalWeight = node.children.reduce(
    (totalWeight, childNode) =>
      totalWeight + calculateTotalWeight(nodes.get(childNode), nodes),
    node.weight || 0
  )
  return node.totalWeight
}

const findWrongNode = (
  nodes: Map<string, Program>,
  bottomNode: Program,
  inWeight: number
): {
  node: Program
  weight: number
} => {
  const childrenWeights = bottomNode.children.map((node) => {
    const childNode = nodes.get(node)
    return childNode ? childNode.totalWeight : 0
  })
  for (let i = 0; i < childrenWeights.length; i++) {
    const childWeight = childrenWeights[i]
    if (
      childrenWeights.indexOf(childWeight) ===
      childrenWeights.lastIndexOf(childWeight)
    ) {
      // This is the odd one out so we have to determine if it's wrong or if one of its children is wrong
      const oddNode = nodes.get(bottomNode ? bottomNode.children[i] : '')
      if (oddNode) {
        return findWrongNode(
          nodes,
          oddNode,
          (childWeight || 0) -
            (childrenWeights[(i + 1) % childrenWeights.length] || 0)
        )
      }
    }
  }
  return {
    node: bottomNode,
    weight: bottomNode.weight ? bottomNode.weight - inWeight : 0,
  }
}

export const findBottomProgram = (input: string) => {
  const programs = parseInput(input)

  for (const [, program] of programs)
    if (!program.parent) return { answer1: program.name }
}

export const balanceTower = (input: string) => {
  const nodes = parseInput(input)
  let bottomNode: Program | undefined
  for (const [, node] of nodes) if (!node.parent) bottomNode = node
  if (bottomNode) {
    calculateTotalWeight(bottomNode, nodes)
    return {
      answer2: findWrongNode(nodes, bottomNode, 0).weight,
    }
  }
}

const day07: Omit<DayConfig, 'year'> = {
  answer1Text: 'The bottom program is answer.',
  answer2Text: 'The weight of the incorrect node should be answer.',
  buttons: [
    {
      label: 'Find Bottom Program',
      onClick: findBottomProgram,
    },
    {
      label: 'Balance Tower',
      onClick: balanceTower,
    },
  ],
  id: 7,
  inputs,
  title: 'Recursive Circus',
}

export default day07
