import inputs from '../../inputs/2018/day15'
import { DayConfig } from '../../routes/Day'

interface Unit {
  attackPower: number
  hitPoints: number
  id: number
  x: number
  y: number
  type: 'E' | 'G'
}

interface Field { [key: string]: string }

interface State {
  elfPower: number
  units: Unit[]
  field: Field
  fieldWidth: number
  fieldHeight: number
  rounds: number
}

interface RoundResult {
  abandonCombat?: boolean
  roundAbandoned: boolean
  elvesWin: boolean
  field: Field
  rounds: number
  units: Unit[]
}

interface Position {
  x: number
  y: number
}

interface Visited {
  [key: string]: boolean
}

let state: State = {
  elfPower: 0,
  units: [],
  field: {},
  fieldWidth: 0,
  fieldHeight: 0,
  rounds: 0
}

const reset = (input: string[], elfPower = 3): State => {
  const fieldHeight: number = input.length
  const fieldWidth: number = input[0].length
  const units: Unit[] = []
  const field: Field = {}
  const validCells: string[] = []

  for (let y = 0; y < fieldHeight; y++) {
    for (let x = 0; x < fieldWidth; x++) {
      const cell = input[y][x]
      field[`${x},${y}`] = cell
      switch (cell) {
        case 'E':
        case 'G':
          validCells.push(`${x},${y}`)
          units.push({
            type: cell,
            attackPower: cell === 'E' ? elfPower : 3,
            hitPoints: 200,
            id: units.length,
            x,
            y
          })
          break

        case '.':
          validCells.push(`${x},${y}`)
          break

        default:
          break
      }
    }
  }

  return {
    elfPower,
    units,
    field,
    fieldHeight,
    fieldWidth,
    rounds: 0
  }
}

const sortByReadingOrder = (a: Position, b: Position): number => (
  a.y === b.y
    ? a.x < b.x ? -1 : 1
    : a.y < b.y ? -1 : 1
)

const pathKey = (x: number, y: number): string => `${x},${y}`

const getAdjacentSquares = (
  x: number,
  y: number,
  field: Field,
  visited: Visited,
  opponent: 'E' | 'G'
): {
  nx: number,
  ny: number,
  value: string
}[] => (
  [
    { x, y: y - 1 },
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y + 1 }
  ]
    .filter(cell => (
      (
        field[pathKey(cell.x, cell.y)] === '.'
        || field[pathKey(cell.x, cell.y)] === opponent
      )
      && visited[pathKey(cell.x, cell.y)] !== true
    ))
    .map(cell => ({
      nx: cell.x,
      ny: cell.y,
      value: field[pathKey(cell.x, cell.y)]
    }))
)

// This sorts them by reading order
const sortOpponents = (opponents: number[][]): number[][] =>
  opponents.sort((a: number[], b: number[]): number => {
    return a[1] === b[1]
      ? a[0] - b[0]
      : a[1] - b[1]
  })

const move = (unit: Unit, field: Field) => {
  const queue: number[][] = [[unit.x, unit.y, unit.x, unit.y, 0]]
  const opponent: 'E' | 'G' = unit.type === 'E' ? 'G' : 'E'
  const visited: Visited = {}
  let opponents: number[][] = []
  let firstOpponentFoundAt: number = Number.MAX_SAFE_INTEGER
  let firstPlace = true

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const current: number[] | undefined = queue.shift()
    if (current === undefined) break
    const [destX, destY, startX, startY, distance] = current
    if (distance >= firstOpponentFoundAt) break
    for (const { nx, ny, value } of getAdjacentSquares(destX, destY, field, visited, opponent)) {
      if (value === opponent) {
        opponents.push([destX, destY, startX, startY])
        if (opponents.length === 1) firstOpponentFoundAt = current[4] + 1
      }
      visited[pathKey(nx, ny)] = true
      queue.push([nx, ny, firstPlace ? nx : startX, firstPlace ? ny : startY, distance + 1])
    }
    firstPlace = false
  }
  if (opponents.length > 0) {
    if (opponents.length > 1)
      opponents = sortOpponents(opponents)
    const [, , toX, toY] = opponents[0]
    if (toX === unit.x && toY === unit.y) return
    field[pathKey(unit.x, unit.y)] = '.'
    field[pathKey(toX, toY)] = unit.type
    unit.x = toX
    unit.y = toY
  }
}

const attack = (unit: Unit, units: Unit[], field: Field): 'E' | 'G' | null => {
  const opponentType: 'E' | 'G' = unit.type === 'E' ? 'G' : 'E'
  const opponent: Unit = units
    .filter(u => (
      u.type === opponentType
      // Adjacent check
      && (
        (
          u.x === unit.x
          && (u.y === unit.y + 1 || u.y === unit.y - 1)
        )
        || (
          u.y === unit.y
          && (u.x === unit.x + 1 || u.x === unit.x - 1)
        )
      )
    ))
    .sort(sortByReadingOrder)
    .reduce((prev, current) => (
      current.hitPoints < prev.hitPoints ? current : prev
    ), { hitPoints: Number.MAX_SAFE_INTEGER } as Unit)

  if (opponent.type) {
    opponent.hitPoints -= unit.attackPower
    if (opponent.hitPoints <= 0) {
      field[pathKey(opponent.x, opponent.y)] = '.'
      opponent.x = -1
      opponent.y = -1
      return opponent.type
    }
  }
  return null
}

const roundOfCombat = (
  units: Unit[],
  field: Field,
  rounds: number,
  breakOnElfDeath?: boolean
): RoundResult => {
  const turnOrder: Unit[] = units.filter(u => u.hitPoints > 0).sort(sortByReadingOrder)
  let killedUnit
  let roundAbandoned = false

  for (const unit of turnOrder) {
    if (unit.hitPoints <= 0) continue
    const unitType: 'E' | 'G' = unit.type
    const enemies: Unit[] = unitType === 'E'
      ? units.filter(u => u.type === 'G' && u.hitPoints > 0)
      : units.filter(u => u.type === 'E' && u.hitPoints > 0)

    if (!enemies.length) {
      roundAbandoned = true
      break
    }
    move(unit, field)
    killedUnit = attack(unit, units, field)
    if (breakOnElfDeath && killedUnit === 'E') break
  }

  return {
    abandonCombat: killedUnit === 'E',
    elvesWin: !units.some(unit => unit.type === 'G'),
    roundAbandoned,
    field,
    rounds: roundAbandoned || (killedUnit === 'E' && breakOnElfDeath) ? rounds : rounds + 1,
    units: units.filter(unit => unit.hitPoints > 0)
  }
}

const runCombat = (): State => {
  const {
    field,
    rounds,
    units
  } = state
  let result: RoundResult = {
    elvesWin: false,
    roundAbandoned: false,
    field,
    rounds,
    units
  }

  while (!result.roundAbandoned) {
    result = roundOfCombat(result.units, result.field, result.rounds)
    state.field = result.field
    state.rounds = result.rounds
    state.units = result.units
  }

  return state
}

const findElfPower = (state: State, inputKey: string): State => {
  const { units, field } = state
  const rounds = 0
  let result: RoundResult = {
    abandonCombat: false,
    elvesWin: false,
    roundAbandoned: false,
    field,
    rounds,
    units
  }

  while (!result.roundAbandoned) {
    while (!result.abandonCombat && !result.elvesWin) {
      result = roundOfCombat(state.units, state.field, state.rounds, true)
      state.field = result.field
      state.rounds = result.rounds
      state.units = result.units
    }
    if (!result.elvesWin) {
      state.elfPower++
      state = reset(inputs.get(inputKey)!.split('\n'), state.elfPower)
      result.abandonCombat = false
    }
  }

  return state
}

export const doTheCombat = (inputKey: string) => {
  state = reset(inputs.get(inputKey)!.split('\n'))
  state = runCombat()
  const hitPointTotal = state.units.reduce((total, unit) => total + unit.hitPoints, 0)
  return {
    answer1: state.rounds * hitPointTotal
  }
}

export const findBestElfPower = (inputKey: string) => {
  state = reset(inputs.get(inputKey)!.split('\n'))
  state = findElfPower(reset(inputs.get(inputKey)!.split('\n')), inputKey)
  const hitPointTotal = state.units.reduce((total, unit) => total + unit.hitPoints, 0)
  return {
    answer2: state.rounds * hitPointTotal
  }
}

const day15: Omit<DayConfig, 'year'> = {
  answer1Text: 'The combat outcome is answer.',
  answer2Text: 'The combat outcome with no elf deaths is answer.',
  buttons: [
    {
      label: 'Do the Combat',
      onClick: doTheCombat
    },
    {
      label: 'Find Elf Power',
      onClick: findBestElfPower
    },
  ],
  id: 15,
  inputs,
  title: 'Beverage Bandits',
}

export default day15
