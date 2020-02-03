import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import SLL from '../utils/SLL'

import INPUT from './Input/Day22'

interface IFighter {
  armor: number
  damage: number
  hitPoints: number
  mana: number
  poisonIsActive: number
  rechargeIsActive: number
  shieldIsActive: number
}

interface ISearchNode {
  boss: IFighter
  player: IFighter
  spellsCast: string
  totalManaSpent: number
}

const SPELLS: {
  cost: number
  effect: (player: IFighter, boss: IFighter) => void
  name: string
}[] = [
  {
    cost: 53,
    effect: (player, boss) => {
      boss.hitPoints -= 4
    },
    name: 'Magic Missile'
  },
  {
    cost: 73,
    effect: (player, boss) => {
      boss.hitPoints -= 2
      player.hitPoints += 2
    },
    name: 'Drain'
  },
  {
    cost: 113,
    effect: (player) => {
      if (player.shieldIsActive === 0) {
        player.shieldIsActive = 6
      }
    },
    name: 'Shield'
  },
  {
    cost: 173,
    effect: (player, boss) => {
      if (boss.poisonIsActive === 0) {
        boss.poisonIsActive = 6
      }
    },
    name: 'Poison'
  },
  {
    cost: 229,
    effect: (player) => {
      if (player.rechargeIsActive === 0) {
        player.rechargeIsActive = 5
      }
    },
    name: 'Recharge'
  }
]

const applyEffects = (fighters: IFighter[]): void =>
  fighters.forEach(fighter => {
    if (fighter.poisonIsActive) {
      fighter.hitPoints -= 3
      fighter.poisonIsActive--
    }
    if (fighter.rechargeIsActive) {
      fighter.mana += 101
      fighter.rechargeIsActive--
    }
    if (fighter.shieldIsActive > 0) {
      fighter.armor = 7
      fighter.shieldIsActive--
    } else {
      fighter.armor = 0
    }
  })

const bossTurn = (inPlayer: IFighter, inBoss: IFighter): {
  boss: IFighter
  player: IFighter
} => {
  const player: IFighter = JSON.parse(JSON.stringify(inPlayer))
  const boss: IFighter = JSON.parse(JSON.stringify(inBoss))
  applyEffects([player, boss])
  if ([player, boss].some(fighter => fighter.hitPoints <= 0)) {
    return { boss, player }
  }
  const damage = Math.max(1, boss.damage - player.armor)
  player.hitPoints -= damage
  return { boss, player }
}

const playerTurn = (inPlayer: IFighter, inBoss: IFighter, spellIndex: number, part: 1 | 2): {
  boss: IFighter
  player: IFighter
} => {
  const player: IFighter = JSON.parse(JSON.stringify(inPlayer))
  const boss: IFighter = JSON.parse(JSON.stringify(inBoss))
  if (part === 2) {
    player.hitPoints -= 1
    if ([player, boss].some(fighter => fighter.hitPoints <= 0)) {
      return { boss, player }
    }
  }
  applyEffects([player, boss])
  if ([player, boss].some(fighter => fighter.hitPoints <= 0)) {
    return { boss, player }
  }
  const spell = SPELLS[spellIndex]
  if (spell) {
    player.mana -= spell.cost
    spell.effect(player, boss)
  }
  return { boss, player }
}

const findBestFight = (part: 1 | 2): number => {
  const queue: SLL = new SLL({
    boss: {
      armor: 0,
      damage: 8,
      hitPoints: 55,
      mana: 0,
      poisonIsActive: 0,
      rechargeIsActive: 0,
      shieldIsActive: 0
    },
    player: {
      armor: 0,
      damage: 8,
      hitPoints: 50,
      mana: 500,
      poisonIsActive: 0,
      rechargeIsActive: 0,
      shieldIsActive: 0
    },
    spellsCast: '',
    totalManaSpent: 0
  } as ISearchNode)
  const seenBefore: Map<string, true> = new Map()

  while (queue.length > 0) {
    const current: ISearchNode = queue.shift()
    if (current) {
      if (current.boss.hitPoints <= 0) {
        return current.totalManaSpent
      }

      for (let nextStep of generatePossibleNexts(current, part)) {
        const seenBeforeKey = `${JSON.stringify(nextStep.player)}...${JSON.stringify(nextStep.boss)}`
        if (seenBefore.get(seenBeforeKey)) continue
        seenBefore.set(seenBeforeKey, true)
        sortIntoSearchQueue(nextStep, queue)
      }
    }
  }

  return NaN
}

function * generatePossibleNexts(current: ISearchNode, part: 1 | 2): Generator<ISearchNode, ISearchNode | undefined, undefined> {
  for (let i = 0; i < SPELLS.length; i++) {
    const spell = SPELLS[i]
    let fighters = {
      boss: JSON.parse(JSON.stringify(current.boss)),
      player: JSON.parse(JSON.stringify(current.player))
    }
    if (fighters.player.mana >= spell.cost) {
      fighters = playerTurn(fighters.player, fighters.boss, i, part)
      if (fighters.boss.hitPoints > 0) {
        fighters = bossTurn(fighters.player, fighters.boss)
      }
      if (fighters.player.hitPoints > 0) {
        yield {
          boss: fighters.boss,
          player: fighters.player,
          spellsCast: `${current.spellsCast}${i}`,
          totalManaSpent: current.totalManaSpent + spell.cost
        } as ISearchNode
      }
    }
  }
  return
}

const sortIntoSearchQueue = (insert: ISearchNode, queue: SLL): void => {
  if (!queue.length) {
    queue.push(insert)
  } else {
    let insertAfter = queue.head
    while (
      insertAfter
      && insertAfter.value.totalManaSpent <= insert.totalManaSpent
      && insertAfter.next
      && insertAfter.next.value.totalManaSpent <= insert.totalManaSpent
    ) {
      insertAfter = insertAfter.next
    }
    if (insertAfter) {
      queue.insertAfter(insert, insertAfter)
    } else {
      queue.push(insert)
    }
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Best Fight',
    onClick: () => {
      return {
        answer1: findBestFight(1).toString()
      }
    }
  },
  {
    label: 'Find Best Fight on Hard',
    onClick: () => {
      return {
        answer2: findBestFight(2).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      You must spend at least <code>{answer}</code> mana to win the fight.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      On <code>Hard</code> difficulty, you must spend at least <code>{answer}</code> mana to win the fight.
    </span>
  ),
  buttons: BUTTONS,
  day: 22,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Wizard Simulator 20XX'
}

export default config