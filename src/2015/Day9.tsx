import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day9'

const findShortestPath = (inputKey: string): {
  answer1: string
  answer2: string
} => {
  interface ISearchNode {
    distance: number
    path: string[]
  }

  const distances: Map<string, number> = new Map(
    INPUT[inputKey].split('\n')
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
    answer1: shortestPath.toString(),
    answer2: longestPath.toString()
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Shortest Path',
    onClick: findShortestPath
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The shortest distance Santa can travel is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The longest distance Santa can travel is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 9,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'All in a Single Night'
}

export default config