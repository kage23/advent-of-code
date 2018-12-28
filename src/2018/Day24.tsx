import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day24'

export enum DAMAGE_TYPES {
  RADIATION = 'radiation',
  BLUDGEONING = 'bludgeoning',
  FIRE = 'fire',
  SLASHING = 'slashing',
  COLD = 'cold'
}

export enum UNIT_TYPES {
  IMMUNE_SYSTEM = 'Immune System',
  INFECTION = 'Infection'
}

export interface IGroup {
  id: number
  type: UNIT_TYPES
  units: number
  hp: number
  immune: DAMAGE_TYPES[]
  weak: DAMAGE_TYPES[]
  attackPower: number
  attackType: DAMAGE_TYPES
  initiative: number
}

let rounds = 0

const fightCombat = (immuneSystem: IGroup[], infection: IGroup[], rounds: number)
: { immuneSystem: IGroup[], infection: IGroup[], rounds: number } => {
  let count = rounds
  let fight = { immuneSystem, infection }

  while (fight.immuneSystem.length > 0 && fight.infection.length > 0) {
    fight = fightRound(fight.immuneSystem, fight.infection)
    count++
  }

  return {
    immuneSystem: fight.immuneSystem,
    infection: fight.infection,
    rounds: count
  }
}

const fightRound = (immuneSystem: IGroup[], infection: IGroup[])
: { immuneSystem: IGroup[], infection: IGroup[] } => {
  // Target selection phase
  const groups = [
    ...immuneSystem,
    ...infection
  ]
  .map(group => ({
    ...group,
    effectivePower: group.units * group.attackPower,
    picked: false
  }))
  .sort((a, b) => (
    a.effectivePower !== b.effectivePower
      ? b.effectivePower - a.effectivePower
      : b.initiative - a.initiative
  ))

  const enemiesMap = new Map()

  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    let bestEnemy
    const enemies = groups.filter(fGroup => (
      // Different type
      fGroup.type !== group.type
      // Not already picked
      && !fGroup.picked
      // Not immune to attacker's attack type
      && fGroup.immune.indexOf(group.attackType) === -1
    ))
    const enemyDamageMap = new Map()
    for (let j = 0; j < enemies.length; j++) {
      const enemy = enemies[j]
      const damage = calculateHPDamage(group, enemy)
      enemyDamageMap.set(enemy, damage)
      if (!bestEnemy || damage >= enemyDamageMap.get(bestEnemy)) {
        if (damage > enemyDamageMap.get(bestEnemy)) bestEnemy = enemy
        else if (bestEnemy && enemy.effectivePower !== bestEnemy.effectivePower) {
          bestEnemy = enemy.effectivePower > bestEnemy.effectivePower ? enemy : bestEnemy
        } else bestEnemy = bestEnemy && bestEnemy.initiative > enemy.initiative ? bestEnemy : enemy
      }
    }
    if (bestEnemy) {
      bestEnemy.picked = true
      enemiesMap.set(group, bestEnemy)
    }
  }

  // Attack phase
  groups.sort((a, b) => b.initiative - a.initiative)
  .forEach(group => {
    if (enemiesMap.get(group) && group.units > 0) {
      const enemy = enemiesMap.get(group)
      const damage = calculateHPDamage(group, enemy)
      const unitsLost = Math.floor(damage / enemy.hp)
      enemy.units -= unitsLost

      // console.log(`${group.type} group ${(group.id || 0) + 1} attacks defending group ${(group.enemy.id || 0) + 1}, killing ${unitsLost} units`)

      enemy.picked = false
    }
  })

  return {
    immuneSystem: groups.filter(group => group.type === UNIT_TYPES.IMMUNE_SYSTEM && group.units > 0),
    infection: groups.filter(group => group.type === UNIT_TYPES.INFECTION && group.units > 0)
  }
}

const calculateHPDamage = (attacker: IGroup, defender: IGroup): number => {
  let damage = attacker.attackPower * attacker.units
  if (defender.immune.indexOf(attacker.attackType) !== -1) damage *= 0
  if (defender.weak.indexOf(attacker.attackType) !== -1) damage *= 2
  return damage
}

const getImmunitiesAndWeaknesses = (input: string): {
  immune: DAMAGE_TYPES[]
  weak: DAMAGE_TYPES[]
} => {
  let immune: DAMAGE_TYPES[] = []
  let weak: DAMAGE_TYPES[] = []

  input.split('; ').forEach(inputStr => {
    const words = inputStr.split(')')[0].split(' ')
    const pushOnto = words.shift() === 'immune'
      ? immune
      : weak

    words.shift()

    let word = words.shift()

    while (word) {
      if (word.indexOf(DAMAGE_TYPES.BLUDGEONING) !== -1) pushOnto.push(DAMAGE_TYPES.BLUDGEONING)
      if (word.indexOf(DAMAGE_TYPES.COLD) !== -1) pushOnto.push(DAMAGE_TYPES.COLD)
      if (word.indexOf(DAMAGE_TYPES.FIRE) !== -1) pushOnto.push(DAMAGE_TYPES.FIRE)
      if (word.indexOf(DAMAGE_TYPES.RADIATION) !== -1) pushOnto.push(DAMAGE_TYPES.RADIATION)
      if (word.indexOf(DAMAGE_TYPES.SLASHING) !== -1) pushOnto.push(DAMAGE_TYPES.SLASHING)
      word = words.shift()
    }
  })

  return {
    immune,
    weak
  }
}

const getGroup = (line: string, type: UNIT_TYPES, id: number): IGroup => {
  const units = parseInt(line)
  let remain = line.split('units each with ')[1]
  const hp = parseInt(remain)
  const {
    immune,
    weak
  } = remain.indexOf('(') !== -1
    ? getImmunitiesAndWeaknesses(remain.split('(')[1])
    : { immune: [], weak: [] }
  remain = remain.split('with an attack that does ')[1]
  let attackPower = parseInt(remain)
  const remainingWords = remain.split(' ')
  const attack = remainingWords[1]
  let attackType = attack === DAMAGE_TYPES.BLUDGEONING
    ? DAMAGE_TYPES.BLUDGEONING
    : attack === DAMAGE_TYPES.COLD
      ? DAMAGE_TYPES.COLD
      : attack === DAMAGE_TYPES.FIRE
        ? DAMAGE_TYPES.FIRE
        : attack === DAMAGE_TYPES.RADIATION
          ? DAMAGE_TYPES.RADIATION
          : DAMAGE_TYPES.SLASHING
  let initiative = parseInt(remainingWords[remainingWords.length - 1])

  return {
    id,
    type,
    units,
    hp,
    immune,
    weak,
    attackPower,
    attackType,
    initiative
  }
}

const parseInput = (inputKey: string): {
  immuneSystem: IGroup[],
  infection: IGroup[]
} => {
  const immuneSystem: IGroup[] = []
  const infection: IGroup[] = []
  const input = INPUT[inputKey].split('\n')
  let currentType = UNIT_TYPES.IMMUNE_SYSTEM
  let count = 0

  inputLoop:
  while (input.length) {
    const line = input.shift()
    if (line && line.length) {
      for (const type of Object.values(UNIT_TYPES)) {
        if (line.indexOf(type) !== -1) {
          currentType = type === UNIT_TYPES.INFECTION
            ? UNIT_TYPES.INFECTION
            : UNIT_TYPES.IMMUNE_SYSTEM
          continue inputLoop
        }
      }
      const group = getGroup(line, currentType, count)
      if (currentType === UNIT_TYPES.IMMUNE_SYSTEM) immuneSystem.push(group)
      else infection.push(group)
      count++
    }
  }

  return {
    immuneSystem,
    infection
  }
}

let prevInputKey = ''
let immuneSystem: IGroup[] = []
let infection: IGroup[] = []
let answer_1a = ''

const BUTTONS: IButton[] = [
  {
    label: 'Fight Round of Combat',
    onClick: () => {
      const next = fightRound(immuneSystem, infection)
      immuneSystem = next.immuneSystem
      infection = next.infection
      rounds++
      return {
        answer1: undefined
      }
    }
  },
  {
    label: 'Fight Full Combat',
    onClick: () => {
      let answer1 = ''
      const next = fightCombat(immuneSystem, infection, rounds)
      immuneSystem = next.immuneSystem
      infection = next.infection
      rounds = next.rounds
      if (infection.length) {
        answer_1a = UNIT_TYPES.INFECTION
        answer1 = infection.reduce((total, group) => total + group.units, 0).toString()
      } else if (immuneSystem.length) {
        answer_1a = UNIT_TYPES.IMMUNE_SYSTEM
        answer1 = immuneSystem.reduce((total, group) => total + group.units, 0).toString()
      }
      return {
        answer1
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (prevInputKey !== inputKey) {
    const groups = parseInput(inputKey)
    immuneSystem = groups.immuneSystem
    infection = groups.infection
    prevInputKey = inputKey
  }

  return (
    <div className="render-box">
      <div style={{ maxWidth: '33%' }}>
        <h3>Rounds of Combat: {rounds}</h3>
        <h3>Input:</h3>
        <pre className="render-box--pre-wrap">{dayConfig.INPUT[inputKey]}</pre>
      </div>
      <div
        style={{
          maxWidth: 'calc(33% - 24px)',
          marginLeft: '24px'
        }}
      >
        <h3>Immune System</h3>
        <ul>
          {immuneSystem.map(group => (
            <li key={`${group.type.split(' ').join('_')}${group.id}`}>
              {group.units} units each with {group.hp} hit points{' '}
              {group.weak.length > 0 || group.immune.length > 0
                ? `(${
                  group.weak.length > 0
                    ? `weak to ${group.weak.join(', ')}${group.immune.length > 0 ? '; ' : ''}`
                    : ''
                  }${
                    group.immune.length > 0
                      ? `immune to ${group.immune.join(', ')}`
                      : ''
                  }) `
                : ''
              }
              with an attack that does {group.attackPower} {group.attackType} damage at initiative {group.initiative}
            </li>
          ))}
        </ul>
      </div>
      <div
        style={{
          maxWidth: 'calc(33% - 24px)',
          marginLeft: '24px'
        }}
      >
        <h3>Infection</h3>
        <ul>
          {infection.map(group => (
            <li key={`${group.type.split(' ').join('_')}${group.id}`}>
              {group.units} units each with {group.hp} hit points{' '}
              {group.weak.length > 0 || group.immune.length > 0
                ? `(${
                  group.weak.length > 0
                    ? `weak to ${group.weak.join(', ')}${group.immune.length > 0 ? '; ' : ''}`
                    : ''
                  }${
                    group.immune.length > 0
                      ? `immune to ${group.immune.join(', ')}`
                      : ''
                  }) `
                : ''
              }
              with an attack that does {group.attackPower} {group.attackType} damage at initiative {group.initiative}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The <code>{answer_1a}</code> wins the combat with{' '}
      <code>{answer}</code> units remaining.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The solution is{' '}
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 24,
  INPUT,
  renderDay,
  title: 'Immune System Simulator 20XX'
}

export default config