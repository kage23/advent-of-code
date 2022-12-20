import inputs from '../../inputs/2015/day09'
import { DayConfig } from '../../routes/Day'

export const findPaths = (inputKey: string) => {
  interface ISearchNode {
    distance: number
    path: string[]
  }

  const distances: Map<string, number> = new Map(
    inputs.get(inputKey)!.split('\n')
      .map(inputLine => {
        const [places, distance] = inputLine.split(' = ')

        return [
          places
            .split(' to ')
            .sort((a, b) => (
              a.toLowerCase().localeCompare(b.toLowerCase())
            ))
            .join(' to '),
          parseInt(distance)
        ]
      })
  )

  const places = Array.from(distances.keys()).map(x => x.split(' to ')).reduce((list, current) => {
    current.forEach(item => {
      if (!list.includes(item)) list.push(item)
    })
    return list
  }, [] as string[])

  let shortestPath = Number.MAX_SAFE_INTEGER
  let longestPath = Number.MIN_SAFE_INTEGER

  const searchQueue: ISearchNode[] = [
    ...places.map(place => ({
      distance: 0,
      path: [place]
    }))
  ]

  while (searchQueue.length) {
    const currentSearchNode = searchQueue.shift()
    if (currentSearchNode) {
      if (currentSearchNode.path.length === places.length) {
        shortestPath = Math.min(shortestPath, currentSearchNode.distance)
        longestPath = Math.max(longestPath, currentSearchNode.distance)
      } else {
        const nexts: string[][] = []
        places.forEach(nextPlace => {
          if (!currentSearchNode.path.includes(nextPlace)) {
            nexts.push([
              ...currentSearchNode.path,
              nextPlace
            ])
          }
        })
        nexts.forEach(next => {
          const nextDistance = currentSearchNode.distance + (
            distances.get(
              [
                currentSearchNode.path[currentSearchNode.path.length - 1],
                next[next.length - 1]
              ]
                .sort((a, b) => a.localeCompare(b))
                .join(' to ')
            )
            || 0
          )
          searchQueue.push({
            distance: nextDistance,
            path: next
          })
        })
      }
    }
  }

  return {
    answer1: shortestPath,
    answer2: longestPath
  }
}

const day09: Omit<DayConfig, 'year'> = {
  answer1Text: 'The shortest distance Santa can travel is answer.',
  answer2Text: 'The longest distance Santa can travel is answer.',
  buttons: [
    {
      label: 'Find All the Paths',
      onClick: findPaths
    }
  ],
  id: 9,
  inputs,
  title: 'All in a Single Night',
}

export default day09
