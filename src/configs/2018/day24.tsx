import inputs from '../../inputs/2018/day24'
import { DayConfig } from '../../routes/Day'

enum DamageTypes {
  Radiation = 'radiation',
  Bludgeoning = 'bludgeoning',
  Fire = 'fire',
  Slashing = 'slashing',
  Cold = 'cold',
}

enum UnitTypes {
  ImmuneSystem = 'Immune System',
  Infection = 'Infection',
}

interface Group {
  id: number
  type: UnitTypes
  units: number
  hp: number
  immune: DamageTypes[]
  weak: DamageTypes[]
  attackPower: number
  attackType: DamageTypes
  initiative: number
}

interface Fight {
  immuneSystem: Group[]
  infection: Group[]
  stalemate?: boolean
  rounds: number
}

let immuneSystem: Group[] = []
let infection: Group[] = []
let rounds = 0

const getImmunitiesAndWeaknesses = (
  input: string
): {
  immune: DamageTypes[]
  weak: DamageTypes[]
} => {
  const immune: DamageTypes[] = []
  const weak: DamageTypes[] = []

  input.split('; ').forEach((inputStr) => {
    const words = inputStr.split(')')[0].split(' ')
    const pushOnto = words.shift() === 'immune' ? immune : weak

    words.shift()

    let word = words.shift()

    while (word) {
      if (word.indexOf(DamageTypes.Bludgeoning) !== -1)
        pushOnto.push(DamageTypes.Bludgeoning)
      if (word.indexOf(DamageTypes.Cold) !== -1) pushOnto.push(DamageTypes.Cold)
      if (word.indexOf(DamageTypes.Fire) !== -1) pushOnto.push(DamageTypes.Fire)
      if (word.indexOf(DamageTypes.Radiation) !== -1)
        pushOnto.push(DamageTypes.Radiation)
      if (word.indexOf(DamageTypes.Slashing) !== -1)
        pushOnto.push(DamageTypes.Slashing)
      word = words.shift()
    }
  })

  return {
    immune,
    weak,
  }
}

const getGroup = (
  line: string,
  type: UnitTypes,
  boost: number,
  id: number
): Group => {
  const units = parseInt(line)
  let remain = line.split('units each with ')[1]
  const hp = parseInt(remain)
  const { immune, weak } =
    remain.indexOf('(') !== -1
      ? getImmunitiesAndWeaknesses(remain.split('(')[1])
      : { immune: [], weak: [] }
  remain = remain.split('with an attack that does ')[1]
  const attackPower = parseInt(remain)
  const remainingWords = remain.split(' ')
  const attack = remainingWords[1]
  const attackType =
    attack === DamageTypes.Bludgeoning
      ? DamageTypes.Bludgeoning
      : attack === DamageTypes.Cold
      ? DamageTypes.Cold
      : attack === DamageTypes.Fire
      ? DamageTypes.Fire
      : attack === DamageTypes.Radiation
      ? DamageTypes.Radiation
      : DamageTypes.Slashing
  const initiative = parseInt(remainingWords[remainingWords.length - 1])

  return {
    id,
    type,
    units,
    hp,
    immune,
    weak,
    attackPower: attackPower + (type === UnitTypes.ImmuneSystem ? boost : 0),
    attackType,
    initiative,
  }
}

const parseInput = (
  input: string,
  boost: number
): {
  immuneSystem: Group[]
  infection: Group[]
} => {
  const immuneSystem: Group[] = []
  const infection: Group[] = []
  const inputLines = input.split('\n')
  let currentType = UnitTypes.ImmuneSystem
  let count = 0

  inputLoop: while (inputLines.length) {
    const line = inputLines.shift()
    if (line && line.length) {
      for (const type of Object.values(UnitTypes)) {
        if (line.indexOf(type) !== -1) {
          currentType =
            type === UnitTypes.Infection
              ? UnitTypes.Infection
              : UnitTypes.ImmuneSystem
          continue inputLoop
        }
      }
      const group = getGroup(line, currentType, boost, count)
      if (currentType === UnitTypes.ImmuneSystem) immuneSystem.push(group)
      else infection.push(group)
      count++
    }
  }

  return {
    immuneSystem,
    infection,
  }
}

const calculateHPDamage = (attacker: Group, defender: Group): number => {
  let damage = attacker.attackPower * attacker.units
  if (defender.immune.indexOf(attacker.attackType) !== -1) damage *= 0
  if (defender.weak.indexOf(attacker.attackType) !== -1) damage *= 2
  return damage
}

const fightRound = (
  immuneSystem: Group[],
  infection: Group[]
): { immuneSystem: Group[]; infection: Group[] } => {
  // Target selection phase
  const groups = [...immuneSystem, ...infection]
    .map((group) => ({
      ...group,
      effectivePower: group.units * group.attackPower,
      picked: false,
    }))
    .sort((a, b) =>
      a.effectivePower !== b.effectivePower
        ? b.effectivePower - a.effectivePower
        : b.initiative - a.initiative
    )

  const enemiesMap = new Map()

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    let bestEnemy
    const enemies = groups.filter(
      (fGroup) =>
        // Different type
        fGroup.type !== group.type &&
        // Not already picked
        !fGroup.picked &&
        // Not immune to attacker's attack type
        fGroup.immune.indexOf(group.attackType) === -1
    )
    const enemyDamageMap = new Map()
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j]
      const damage = calculateHPDamage(group, enemy)
      enemyDamageMap.set(enemy, damage)
      if (!bestEnemy || damage >= enemyDamageMap.get(bestEnemy)) {
        if (damage > enemyDamageMap.get(bestEnemy)) bestEnemy = enemy
        else if (
          bestEnemy &&
          enemy.effectivePower !== bestEnemy.effectivePower
        ) {
          bestEnemy =
            enemy.effectivePower > bestEnemy.effectivePower ? enemy : bestEnemy
        } else
          bestEnemy =
            bestEnemy && bestEnemy.initiative > enemy.initiative
              ? bestEnemy
              : enemy
      }
    }
    if (bestEnemy) {
      bestEnemy.picked = true
      enemiesMap.set(group, bestEnemy)
    }
  }

  // Attack phase
  groups
    .sort((a, b) => b.initiative - a.initiative)
    .forEach((group) => {
      if (enemiesMap.get(group) && group.units > 0) {
        const enemy = enemiesMap.get(group)
        const damage = calculateHPDamage(group, enemy)
        const unitsLost = Math.floor(damage / enemy.hp)
        enemy.units -= unitsLost
        enemy.picked = false
      }
    })

  return {
    immuneSystem: groups.filter(
      (group) => group.type === UnitTypes.ImmuneSystem && group.units > 0
    ),
    infection: groups.filter(
      (group) => group.type === UnitTypes.Infection && group.units > 0
    ),
  }
}

const fightCombat = (
  immuneSystem: Group[],
  infection: Group[],
  rounds: number
): Fight => {
  let fight = { immuneSystem, infection }
  let stalemate = false

  let prevUnitCount = [...immuneSystem, ...infection].reduce(
    (total, group) => total + group.units,
    0
  )
  while (fight.immuneSystem.length > 0 && fight.infection.length > 0) {
    fight = fightRound(fight.immuneSystem, fight.infection)
    const afterUnitCount = [...fight.immuneSystem, ...fight.infection].reduce(
      (total, group) => total + group.units,
      0
    )
    if (afterUnitCount === prevUnitCount) {
      stalemate = true
      break
    }
    prevUnitCount = afterUnitCount
    rounds++
  }

  return {
    immuneSystem: fight.immuneSystem,
    infection: fight.infection,
    stalemate,
    rounds,
  }
}

const randInt = (min: number, max: number): number =>
  Math.floor(Math.random() * max) + min

const findBoost = (
  input: string
): {
  immuneSystem: Group[]
  infection: Group[]
  rounds: number
  boost: number
} => {
  let boost = 0
  let highestBad = 0
  let lowestGood = Number.MAX_SAFE_INTEGER
  let fightInput = parseInput(input, boost)
  let fightResult: Fight = {
    immuneSystem: fightInput.immuneSystem,
    infection: fightInput.infection,
    rounds: 0,
  }

  while (lowestGood > highestBad + 1) {
    fightInput = parseInput(input, boost)
    fightResult = fightCombat(fightInput.immuneSystem, fightInput.infection, 0)
    if (
      fightResult.infection.length === 0 &&
      fightResult.immuneSystem.length > 0
    ) {
      lowestGood = Math.min(lowestGood, boost)
    }
    if (
      (fightResult.infection.length > 0 &&
        fightResult.immuneSystem.length === 0) ||
      fightResult.stalemate
    ) {
      highestBad = Math.max(highestBad, boost)
    }
    boost = randInt(highestBad, lowestGood)
  }

  const lastFight = parseInput(input, lowestGood)
  fightResult = fightCombat(lastFight.immuneSystem, lastFight.infection, 0)

  return {
    immuneSystem: fightResult.immuneSystem,
    infection: fightResult.infection,
    boost: lowestGood,
    rounds: fightResult.rounds,
  }
}

export const fightFullCombat = (input: string) => {
  const groups = parseInput(input, 0)
  immuneSystem = groups.immuneSystem
  infection = groups.infection
  rounds = 0

  let answer1: number | undefined
  const next = fightCombat(immuneSystem, infection, rounds)
  immuneSystem = next.immuneSystem
  infection = next.infection
  rounds = next.rounds
  if (infection.length) {
    answer1 = infection.reduce((total, group) => total + group.units, 0)
  } else if (immuneSystem.length) {
    answer1 = immuneSystem.reduce((total, group) => total + group.units, 0)
  }
  return { answer1 }
}

export const findTheBoost = (input: string) => {
  const next = findBoost(input)
  immuneSystem = next.immuneSystem
  infection = next.infection
  rounds = next.rounds
  return {
    answer2: next.immuneSystem.reduce((total, group) => total + group.units, 0),
  }
}

const day24: Omit<DayConfig, 'year'> = {
  answer1Text: 'The winner of the combat has answer units remaining.',
  answer2Text:
    'With a boost, the Immune System wins with answer units remaining.',
  buttons: [
    {
      label: 'Fight Full Combat',
      onClick: fightFullCombat,
    },
    {
      label: 'Find Boost',
      onClick: findTheBoost,
    },
  ],
  id: 24,
  inputs,
  title: 'Immune System Simulator 20XX',
}

export default day24
