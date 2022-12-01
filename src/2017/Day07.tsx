import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2017/Day07'

interface IProgram {
  name: string
  children: string[]
  parent?: string
  weight?: number
  totalWeight?: number
}

const parseInput = (input: string): Map<string, IProgram> => {
  const programs: Map<string, IProgram> = new Map()

  input.split('\n').forEach(row => {
    const name = row.split(' ')[0]
    let program = programs.get(name)
    if (!program) {
      programs.set(name, {
        name,
        children: []
      })
      program = programs.get(name)
    }
    if (program) program.weight = parseInt(row.split('(')[1])
    if (row.indexOf('->') !== -1) {
      row.split('-> ')[1].split(', ').forEach(child => {
        if (program) program.children.push(child)
        let childProgram = programs.get(child)
        if (!childProgram) {
          programs.set(child, {
            name: child,
            children: []
          })
          childProgram = programs.get(child)
        }
        if (childProgram) childProgram.parent = name
      })
    }
  })

  return programs
}

const calculateTotalWeight = (node: IProgram | undefined, nodes: Map<string, IProgram>): number => {
  if (node === undefined) return NaN
  if (node.children.length === 0) {
    node.totalWeight = node.weight || 0
    return node.totalWeight
  }
  node.totalWeight = node.children.reduce((totalWeight, childNode) => (
    totalWeight + calculateTotalWeight(nodes.get(childNode), nodes)
  ), node.weight || 0)
  return node.totalWeight
}

const findWrongNode = (nodes: Map<string, IProgram>, bottomNode: IProgram, inWeight: number): {
  node: IProgram
  weight: number
} => {
  let childrenWeights = bottomNode.children.map(node => {
    const childNode = nodes.get(node)
    return childNode ? childNode.totalWeight : 0
  })
  for (let i = 0; i < childrenWeights.length; i++) {
    const childWeight = childrenWeights[i]
    if (childrenWeights.indexOf(childWeight) === childrenWeights.lastIndexOf(childWeight)) {
      // This is the odd one out so we have to determine if it's wrong or if one of its children is wrong
      const oddNode = nodes.get(bottomNode ? bottomNode.children[i] : '')
      if (oddNode) {
        return findWrongNode(nodes, oddNode, (childWeight || 0) - (childrenWeights[(i + 1) % childrenWeights.length] || 0))
      }
    }
  }
  return {
    node: bottomNode,
    weight: bottomNode.weight ? bottomNode.weight - inWeight : 0
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Bottom Program',
    onClick: (inputKey) => {
      const programs = parseInput(INPUT[inputKey])

      for (const [, program] of programs)
        if (!program.parent) return { answer1: program.name }

      return {
        answer1: undefined
      }
    }
  },
  {
    label: 'Balance Tower',
    onClick: (inputKey) => {
      const nodes = parseInput(INPUT[inputKey])
      let bottomNode: IProgram | undefined
      for (const [, node] of nodes) if (!node.parent) bottomNode = node
      if (bottomNode) {
        calculateTotalWeight(bottomNode, nodes)
        return {
          answer2: findWrongNode(nodes, bottomNode, 0).weight.toString()
        }
      }

      return {}
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The bottom program is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The weight of the incorrect node should be{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 7,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Recursive Circus'
}

export default config