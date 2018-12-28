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

const BUTTONS: IButton[] = []

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
      The solution is{' '}
      <code>{answer}</code>.
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