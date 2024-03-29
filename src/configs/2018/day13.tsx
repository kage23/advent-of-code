import inputs from '../../inputs/2018/day13'
import { DayConfig } from '../../routes/Day'

interface State {
  baseTrack: string[]
  carts: Cart[]
}

interface Cart {
  direction: string
  position: number[]
  turnsExecuted: number
}

let state: State = {
  baseTrack: [],
  carts: [],
}
let time = 0

const sortCartsByPosition = (a: Cart, b: Cart): number => {
  const [xa, ya] = a.position
  const [xb, yb] = b.position

  return ya === yb ? xa - xb : ya - yb
}

const advanceOneTick = (
  baseTrack: string[],
  carts: Cart[],
  time: number
): {
  answer1?: string
  carts: Cart[]
  time: number
} => {
  const directions = ['^', '<', 'v', '>']
  const turnMods = [1, 0, -1]

  let answer1: undefined | string | JSX.Element = undefined
  let newCarts: Cart[] = []

  while (carts.length > 0 && !answer1) {
    const cart = carts.shift()

    if (cart) {
      const { position } = cart
      let { direction, turnsExecuted } = cart

      switch (direction) {
        case '>':
          position[0]++
          break

        case '<':
          position[0]--
          break

        case '^':
          position[1]--
          break

        case 'v':
          position[1]++
          break

        default:
          break
      }

      const newTrackAtPos = baseTrack[position[1]].charAt(position[0])

      switch (newTrackAtPos) {
        case '/':
          if (direction === '>') direction = '^'
          else if (direction === '^') direction = '>'
          else if (direction === '<') direction = 'v'
          else if (direction === 'v') direction = '<'
          break

        case '\\':
          if (direction === '>') direction = 'v'
          else if (direction === 'v') direction = '>'
          else if (direction === '<') direction = '^'
          else if (direction === '^') direction = '<'
          break

        case '+': {
          const oldDirectionIndex = directions.indexOf(direction)
          direction =
            directions[
              (oldDirectionIndex +
                turnMods[turnsExecuted % turnMods.length] +
                directions.length) %
                directions.length
            ]
          turnsExecuted++
          break
        }

        case '-':
        case '|':
        default:
          // Nothing to do here
          break
      }

      // Detect collision here
      let collision = carts.find(
        (fCart) =>
          fCart.position[0] === cart.position[0] &&
          fCart.position[1] === cart.position[1]
      )
      if (!collision)
        collision = newCarts.find(
          (fCart) =>
            fCart.position[0] === cart.position[0] &&
            fCart.position[1] === cart.position[1]
        )
      if (collision) {
        answer1 = `${position[0]},${position[1]}`
        direction = 'X'
        collision.direction = 'X'
      }

      newCarts.push({
        direction,
        position,
        turnsExecuted,
      })
    }
  }

  newCarts = newCarts.sort(sortCartsByPosition)

  return {
    answer1,
    carts: newCarts,
    time: time + 1,
  }
}

const advanceToCollision = (
  baseTrack: string[],
  carts: Cart[],
  time: number
): {
  carts: Cart[]
  time: number
  answer1?: string
} => {
  let next: {
    answer1?: string
    carts: Cart[]
    time: number
  } = {
    carts,
    answer1: undefined,
    time,
  }

  while (!next.answer1) next = advanceOneTick(baseTrack, next.carts, next.time)

  return next
}

const parseInput = (input: string): State => {
  const carts: Cart[] = []
  const baseTrack = input.split('\n').map((line, y) => {
    let contents = ''
    line.split('').forEach((char, x) => {
      switch (char) {
        case '>':
        case '<':
          carts.push({
            direction: char,
            position: [x, y],
            turnsExecuted: 0,
          })
          contents += '-'
          break

        case '^':
        case 'v':
          carts.push({
            direction: char,
            position: [x, y],
            turnsExecuted: 0,
          })
          contents += '|'
          break

        default:
          contents += char
          break
      }
    })
    return contents
  })

  carts.sort(sortCartsByPosition)

  return {
    baseTrack,
    carts,
  }
}

const getAnswer2 = (carts: Cart[]) =>
  carts.length > 1
    ? undefined
    : carts.length === 1
    ? `${carts[0].position[0]},${carts[0].position[1]}`
    : undefined

const advanceOneAndRemove = (
  baseTrack: string[],
  carts: Cart[],
  time: number
): {
  carts: Cart[]
  time: number
  answer2: undefined | string | JSX.Element
} => {
  const directions = ['^', '<', 'v', '>']
  const turnMods = [1, 0, -1]

  let newCarts: Cart[] = []

  while (carts.length > 0) {
    const cart = carts.shift()

    if (cart) {
      const { position } = cart
      let { direction, turnsExecuted } = cart

      switch (direction) {
        case '>':
          position[0]++
          break

        case '<':
          position[0]--
          break

        case '^':
          position[1]--
          break

        case 'v':
          position[1]++
          break

        default:
          break
      }

      const newTrackAtPos = baseTrack[position[1]].charAt(position[0])

      switch (newTrackAtPos) {
        case '/':
          if (direction === '>') direction = '^'
          else if (direction === '^') direction = '>'
          else if (direction === '<') direction = 'v'
          else if (direction === 'v') direction = '<'
          break

        case '\\':
          if (direction === '>') direction = 'v'
          else if (direction === 'v') direction = '>'
          else if (direction === '<') direction = '^'
          else if (direction === '^') direction = '<'
          break

        case '+': {
          const oldDirectionIndex = directions.indexOf(direction)
          direction =
            directions[
              (oldDirectionIndex +
                turnMods[turnsExecuted % turnMods.length] +
                directions.length) %
                directions.length
            ]
          turnsExecuted++
          break
        }

        case '-':
        case '|':
        default:
          // Nothing to do here
          break
      }

      // Detect collision here
      let collision = carts.find(
        (fCart) =>
          fCart.position[0] === cart.position[0] &&
          fCart.position[1] === cart.position[1]
      )
      if (!collision)
        collision = newCarts.find(
          (fCart) =>
            fCart.position[0] === cart.position[0] &&
            fCart.position[1] === cart.position[1]
        )
      if (collision) {
        carts = carts.filter(
          (fCart) =>
            fCart.position[0] !== cart.position[0] ||
            fCart.position[1] !== cart.position[1]
        )
        newCarts = newCarts.filter(
          (fCart) =>
            fCart.position[0] !== cart.position[0] ||
            fCart.position[1] !== cart.position[1]
        )
      } else {
        newCarts.push({
          direction,
          position,
          turnsExecuted,
        })
      }
    }
  }

  newCarts = newCarts.sort(sortCartsByPosition)

  const answer2 = getAnswer2(newCarts)

  return {
    answer2,
    carts: newCarts,
    time: time + 1,
  }
}

const advanceToFinal = (
  baseTrack: string[],
  carts: Cart[],
  time: number
): {
  carts: Cart[]
  time: number
  answer2?: string
} => {
  let next: { carts: Cart[]; time: number } = {
    carts,
    time,
  }

  while (next.carts.length > 1)
    next = advanceOneAndRemove(baseTrack, next.carts, next.time)

  const answer2 = getAnswer2(next.carts)

  return {
    ...next,
    answer2,
  }
}

export const findCollision = (input: string) => {
  state = parseInput(input)
  time = 0

  const next = advanceToCollision(state.baseTrack, state.carts, time)
  state.carts = next.carts
  time = next.time
  return {
    answer1: next.answer1,
  }
}

export const goToEnd = (input: string) => {
  state = parseInput(input)
  time = 0

  const next = advanceToFinal(state.baseTrack, state.carts, time)
  state.carts = next.carts
  time = next.time
  return {
    answer2: next.answer2,
  }
}

const day13: Omit<DayConfig, 'year'> = {
  answer1Text: 'There was a collision at answer!',
  answer2Text: 'The last cart left is at answer.',
  buttons: [
    {
      label: 'Advance to Collision',
      onClick: findCollision,
    },
    {
      label: 'Advance to Final',
      onClick: goToEnd,
    },
  ],
  id: 13,
  inputs,
  title: 'Mine Cart Madness',
}

export default day13
