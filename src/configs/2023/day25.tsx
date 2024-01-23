import inputs from '../../inputs/2023/day25'
import { DayConfig } from '../../routes/Day'
import AStar from '../../utils/AStar'

const pathCache: Map<string, string[]> = new Map()

const findWiresToCut = (modules: Map<string, string[]>) => {
  const wires: Map<string, number> = new Map()
  const modulesIterated = Array.from(modules.entries())
  for (let i = 0; i < modulesIterated.length; i++) {
    const [idI] = modulesIterated[i]
    for (let j = i + 1; j < modulesIterated.length; j++) {
      const [idJ] = modulesIterated[j]
      const { path } = AStar(
        idI,
        idJ,
        () => 1,
        (from: string, to: string) => (modules.get(from)!.includes(to) ? 1 : 2),
        (id) => modules.get(id)!
      )
      for (let k = 0; k < path.length - 1; k++) {
        const wireId = [path[k], path[k + 1]]
          .sort((a, b) => a.localeCompare(b))
          .join(',')
        const wire = wires.get(wireId) || 0
        wires.set(wireId, wire + 1)
      }
    }
  }

  return Array.from(wires.entries())
    .sort(([, aCount], [, bCount]) => bCount - aCount)
    .map(([id]) => id)
    .slice(0, 3)
}

export const splitTheModules = (input: string) => {
  pathCache.clear()

  const lines = input.split('\n')
  const modules: Map<string, string[]> = new Map()
  lines.forEach((line) => {
    const [from, tos] = line.split(': ')
    const fromModule = modules.get(from) || []
    tos.split(' ').forEach((to) => {
      fromModule.push(to)
      const toModule = modules.get(to) || []
      toModule.push(from)
      modules.set(to, toModule)
    })
    modules.set(from, fromModule)
  })

  const wiresToCut =
    lines.length < 100
      ? findWiresToCut(modules)
      : // I used Graphviz (neato visualizer) to find the three wires to cut
        ['dbt,tjd', 'jxm,qns', 'mgb,plt']

  const group1: string[] = [lines[0].split(': ')[0]]
  for (let i = 0; i < group1.length; i++) {
    const id = group1[i]
    const module = modules.get(id)!
    module.forEach((to) => {
      const wireId = [id, to].sort((a, b) => a.localeCompare(b)).join(',')
      if (!wiresToCut.includes(wireId) && !group1.includes(to)) {
        group1.push(to)
      }
    })
  }

  return { answer1: (modules.size - group1.length) * group1.length }
}

const day25: Omit<DayConfig, 'year'> = {
  answer1Text: `The product of the two groups' sizes is answer.`,
  answer2Text: '',
  buttons: [
    {
      label: 'Split the Modules',
      onClick: splitTheModules,
    },
    {
      label: 'Parse for Graphviz',
      onClick: (input: string) => {
        console.log(
          input
            .split('\n')
            .map((line) => {
              const [from, tos] = line.split(': ')
              const toIds = tos.split(' ')
              return `${from} -> ${toIds.join(', ')}`
            })
            .join('\n')
        )
      },
    },
  ],
  id: 25,
  inputs,
  title: 'Snowverload',
}

export default day25
