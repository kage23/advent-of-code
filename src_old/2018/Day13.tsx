import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day13'

interface IState {
  baseTrack: string[],
  carts: ICart[]
}

interface ICart {
  direction: string
  position: number[]
  turnsExecuted: number
}

let state: IState = {
  baseTrack: [],
  carts: []
}

let prevInputKey = ''
let time = 0

const advanceOneTick = (baseTrack: string[], carts: ICart[], time: number): {
  answer1: undefined | string | JSX.Element
  carts: ICart[]
  time: number
} => {
  const directions = ['^', '<', 'v', '>']
  const turnMods = [1, 0, -1]

  let answer1: undefined | string | JSX.Element = undefined
  let newCarts: ICart[] = []

  while (carts.length > 0 && !answer1) {
    const cart = carts.shift()

    if (cart) {
      let {
        direction,
        position,
        turnsExecuted
      } = cart

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

        case '+':
          const oldDirectionIndex = directions.indexOf(direction)
          direction = directions[(oldDirectionIndex + turnMods[turnsExecuted % turnMods.length] + directions.length) % directions.length]
          turnsExecuted++
          break

        case '-':
        case '|':
        default:
          // Nothing to do here
          break
      }

      // Detect collision here
      let collision = carts.find(fCart => fCart.position[0] === cart.position[0] && fCart.position[1] === cart.position[1])
      if (!collision) collision = newCarts.find(fCart => fCart.position[0] === cart.position[0] && fCart.position[1] === cart.position[1])
      if (collision) {
        answer1 = `${position[0]},${position[1]}`
        direction = 'X'
        collision.direction = 'X'
      }

      newCarts.push({
        direction,
        position,
        turnsExecuted
      })
    }
  }

  newCarts = newCarts.sort(sortCartsByPosition)

  return ({
    answer1,
    carts: newCarts,
    time: time + 1
  })
}

const advanceToCollision = (baseTrack: string[], carts: ICart[], time: number): {
  carts: ICart[]
  time: number
  answer1: undefined | string | JSX.Element
} => {
  let next: {
    answer1: undefined | string | JSX.Element
    carts: ICart[]
    time: number
  } = {
    carts,
    answer1: undefined,
    time
  }

  while (!next.answer1) next = advanceOneTick(baseTrack, next.carts, next.time)

  return next
}

const advanceOneAndRemove = (baseTrack: string[], carts: ICart[], time: number): {
  carts: ICart[]
  time: number
  answer2: undefined | string | JSX.Element
} => {
  const directions = ['^', '<', 'v', '>']
  const turnMods = [1, 0, -1]

  let newCarts: ICart[] = []

  while (carts.length > 0) {
    const cart = carts.shift()

    if (cart) {
      let {
        direction,
        position,
        turnsExecuted
      } = cart

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

        case '+':
          const oldDirectionIndex = directions.indexOf(direction)
          direction = directions[(oldDirectionIndex + turnMods[turnsExecuted % turnMods.length] + directions.length) % directions.length]
          turnsExecuted++
          break

        case '-':
        case '|':
        default:
          // Nothing to do here
          break
      }

      // Detect collision here
      let collision = carts.find(fCart => fCart.position[0] === cart.position[0] && fCart.position[1] === cart.position[1])
      if (!collision) collision = newCarts.find(fCart => fCart.position[0] === cart.position[0] && fCart.position[1] === cart.position[1])
      if (collision) {
        carts = carts.filter(fCart => fCart.position[0] !== cart.position[0] || fCart.position[1] !== cart.position[1])
        newCarts = newCarts.filter(fCart => fCart.position[0] !== cart.position[0] || fCart.position[1] !== cart.position[1])
      } else {
        newCarts.push({
          direction,
          position,
          turnsExecuted
        })
      }
    }
  }

  newCarts = newCarts.sort(sortCartsByPosition)

  const answer2 = getAnswer2(newCarts)

  return {
    answer2,
    carts: newCarts,
    time: time + 1
  }
}

const advanceToFinal = (baseTrack: string[], carts: ICart[], time: number): {
  carts: ICart[]
  time: number
  answer2: undefined | string | JSX.Element
} => {
  let next: { carts: ICart[], time: number } = {
    carts,
    time
  }

  while (next.carts.length > 1) next = advanceOneAndRemove(baseTrack, next.carts, next.time)

  const answer2 = getAnswer2(next.carts)

  return {
    ...next,
    answer2
  }
}

const getAnswer2 = (carts: ICart[]): JSX.Element | undefined => (
  carts.length > 1
    ? undefined
    : carts.length === 1
      ? <span>The final cart's position is <code>{carts[0].position[0]},{carts[0].position[1]}</code>.</span>
      : <span>There are no more carts!</span>
)

const parseInput = (input: string): IState => {
  const carts: ICart[] = []
  const baseTrack = input.split('\n').map((line, y) => {
    let contents = ''
    line.split('').forEach((char, x) => {
      switch (char) {
        case '>':
        case '<':
          carts.push({
            direction: char,
            position: [x, y],
            turnsExecuted: 0
          })
          contents += '-'
          break

        case '^':
        case 'v':
          carts.push({
            direction: char,
            position: [x, y],
            turnsExecuted: 0
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
    carts
  }
}

const sortCartsByPosition = (a: ICart, b: ICart): number => {
  const [xa, ya] = a.position
  const [xb, yb] = b.position

  return ya === yb
    ? xa - xb
    : ya - yb
}

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    state = parseInput(dayConfig.INPUT[inputKey])
    prevInputKey = inputKey
    time = 0
  }

  const {
    baseTrack,
    carts
  } = state

  const display = baseTrack.map((line, y) => {
    const contents = line.split('').map((char, x) => {
      const cart = carts.find(fCart => fCart.position[0] === x && fCart.position[1] === y)
      return (
        char === ' '
          ? <span key={`${x},${y}`}>&nbsp;</span>
          : cart
            ? <span key={`${x},${y}`}>{cart.direction}</span>
            : <span key={`${x},${y}`}>{char}</span>
      )
    })
    return <div key={y}>{contents}</div>
  })

  return (
    <div className="render-box">
      <p>Time: {time}</p>
      <fieldset>
        {display}
      </fieldset>
    </div>
  )
}

const BUTTONS: IButton[] = [
  {
    label: 'Advance One Tick',
    onClick: () => {
      const next = advanceOneTick(state.baseTrack, state.carts, time)
      state.carts = next.carts
      time = next.time
      return {
        answer1: next.answer1
      }
    }
  },
  {
    label: 'Advance to Collision',
    onClick: () => {
      const next = advanceToCollision(state.baseTrack, state.carts, time)
      state.carts = next.carts
      time = next.time
      return {
        answer1: next.answer1
      }
    }
  },
  {
    label: 'Advance One Tick (with remove)',
    onClick: () => {
      const next = advanceOneAndRemove(state.baseTrack, state.carts, time)
      state.carts = next.carts
      time = next.time
      return {
        answer2: next.answer2
      }
    }
  },
  {
    label: 'Advance to Final (with remove)',
    onClick: () => {
      const next = advanceToFinal(state.baseTrack, state.carts, time)
      state.carts = next.carts
      time = next.time
      return {
        answer2: next.answer2
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      There was a collision at <code>{answer}</code>!
    </span>
  ),
  answer2Text: (answer) => {
    return (
      <span>{answer}</span>
    )
  },
  buttons: BUTTONS,
  day: 13,
  INPUT,
  renderDay,
  title: 'Mine Cart Madness'
}

export default config