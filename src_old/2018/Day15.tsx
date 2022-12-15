import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day15'

interface IUnit {
  attackPower: number
  hitPoints: number
  id: number
  x: number
  y: number
  type: 'E' | 'G'
}

interface IPosition {
  x: number
  y: number
}

interface IField { [key: string]: string }

interface IRoundResult {
  abandonCombat?: boolean
  roundAbandoned: boolean
  elvesWin: boolean
  field: IField
  rounds: number
  units: IUnit[]
}

interface IVisited {
  [key: string]: boolean
}

interface IState {
  elfPower: number
  units: IUnit[]
  field: IField
  fieldWidth: number
  fieldHeight: number
  rounds: number
}

let state: IState = {
  elfPower: 0,
  units: [],
  field: {},
  fieldWidth: 0,
  fieldHeight: 0,
  rounds: 0
}
let prevInputKey = ''

const pathKey = (x: number, y: number): string => `${x},${y}`

// This sorts them by reading order
const sortOpponents = (opponents: number[][]): number[][] =>
  opponents.sort((a: number[], b: number[]): number => {
    return a[1] === b[1]
      ? a[0] - b[0]
      : a[1] - b[1]
  })

const sortByReadingOrder = (a: IPosition, b: IPosition): number => (
  a.y === b.y
    ? a.x < b.x ? -1 : 1
    : a.y < b.y ? -1 : 1
)

const getAdjacentSquares = (
  x: number,
  y: number,
  field: IField,
  visited: IVisited,
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

const reset = (input: string[], elfPower: number = 3): IState => {
  const fieldHeight: number = input.length
  const fieldWidth: number = input[0].length
  const units: IUnit[] = []
  const field: IField = {}
  const validCells: string[] = []

  for (let y: number = 0; y < fieldHeight; y++) {
    for (let x: number = 0; x < fieldWidth; x++) {
      let cell: string = input[y][x]
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

const move = (unit: IUnit, field: IField, rounds: number) => {
  const queue: number[][] = [[unit.x, unit.y, unit.x, unit.y, 0]]
  let opponent: 'E' | 'G' = unit.type === 'E' ? 'G' : 'E'
  const visited: IVisited = {}
  let opponents: number[][] = []
  let firstOpponentFoundAt: number = Number.MAX_SAFE_INTEGER
  let firstPlace: boolean = true

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

const attack = (unit: IUnit, units: IUnit[], field: IField): 'E' | 'G' | null => {
  let opponentType: 'E' | 'G' = unit.type === 'E' ? 'G' : 'E'
  let opponent: IUnit = units
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
    ), { hitPoints: Number.MAX_SAFE_INTEGER } as IUnit)

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
  units: IUnit[],
  field: IField,
  rounds: number,
  breakOnElfDeath?: boolean
): IRoundResult => {
  const turnOrder: IUnit[] = units.filter(u => u.hitPoints > 0).sort(sortByReadingOrder)
  let killedUnit
  let roundAbandoned = false

  for (const unit of turnOrder) {
    if (unit.hitPoints <= 0) continue
    let unitType: 'E' | 'G' = unit.type
    let enemies: IUnit[] = unitType === 'E'
      ? units.filter(u => u.type === 'G' && u.hitPoints > 0)
      : units.filter(u => u.type === 'E' && u.hitPoints > 0)

    if (!enemies.length) {
      roundAbandoned = true
      break
    }
    move(unit, field, rounds)
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

const runCombat = (): IState => {
  let {
    field,
    rounds,
    units
  } = state
  let result: IRoundResult = {
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

const findElfPower = (state: IState): IState => {
  const { units, field } = state
  let rounds = 0
  let result: IRoundResult = {
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
      state = reset(INPUT[prevInputKey].split('\n'), state.elfPower)
      result.abandonCombat = false
    }
  }

  return state
}

const BUTTONS: IButton[] = [
  {
    label: 'Round of Combat',
    onClick: () => {
      const result = roundOfCombat(state.units, state.field, state.rounds)
      state.units = result.units
      state.field = result.field
      state.rounds = result.rounds
      return {}
    }
  },
  {
    label: 'Run Combat',
    onClick: () => {
      state = runCombat()
      const hitPointTotal = state.units.reduce((total, unit) => total + unit.hitPoints, 0)
      return {
        answer1: (
          <span>
            The{' '}
            <code>{
              state.units[0].type === 'E' ? 'Elves' : 'Goblins'
            }</code>
            {' '}won after completing{' '}
            <code>{state.rounds}</code>
            {' '}rounds of combat, with a combined hit point total of{' '}
            <code>{hitPointTotal}</code>,
            {' '}leading to a final outcome of{' '}
            <code>{state.rounds * hitPointTotal}</code>.
          </span>
        )
      }
    }
  },
  {
    label: 'Find Elf Power',
    onClick: (inputKey) => {
      state = findElfPower(reset(INPUT[inputKey].split('\n')))
      const hitPointTotal = state.units.reduce((total, unit) => total + unit.hitPoints, 0)
      return {
        answer2: (
          <span>
            With an attack power of{' '}
            <code>{state.elfPower}</code>,
            {' '}the{' '}
            <code>{
              state.units[0].type === 'E' ? 'Elves' : 'Goblins'
            }</code>
            {' '}won after completing{' '}
            <code>{state.rounds}</code>
            {' '}rounds of combat, with a combined hit point total of{' '}
            <code>{hitPointTotal}</code>,
            {' '}leading to a final outcome of{' '}
            <code>{state.rounds * hitPointTotal}</code>.
          </span>
        )
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (inputKey !== prevInputKey) {
    state = reset(dayConfig.INPUT[inputKey].split('\n'))
    prevInputKey = inputKey
  }

  const {
    field,
    fieldHeight,
    fieldWidth,
    units
  } = state

  const map: JSX.Element[] = []
  for (let y: number = 0; y < fieldHeight; y++) {
    let row: string = ''
    for (let x: number = 0; x < fieldWidth; x++)
      row += field[`${x},${y}`]
    map.push(<div key={y}>{row}</div>)
  }

  return (
    <div className="render-box space-between">
      <div>
        <h3>Round {state.rounds}</h3>
        {map}
      </div>
      <div>
        <h3>Elves</h3>
        {units.filter(u => u.type === 'E').map((elf: IUnit) => (
          <p key={elf.id}>
            ID: {elf.id} HP: {elf.hitPoints} AP: {elf.attackPower} XY: {elf.x},{elf.y}
          </p>
        ))}
      </div>
      <div>
        <h3>Goblins</h3>
        {units.filter(u => u.type === 'G').map((goblin: IUnit) => (
          <p key={goblin.id}>
            ID: {goblin.id} HP: {goblin.hitPoints} AP: {goblin.attackPower} XY: {goblin.x},{goblin.y}
          </p>
        ))}
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: answer => (
    <span>{answer}</span>
  ),
  answer2Text: (answer) => (
    <span>{answer}</span>
  ),
  buttons: BUTTONS,
  day: 15,
  INPUT,
  renderDay,
  title: 'Beverage Bandits'
}

export default config