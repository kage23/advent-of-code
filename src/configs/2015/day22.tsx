import inputs from '../../inputs/2015/day22'
import { DayConfig } from '../../routes/Day'
import SLL from '../../utils/SLL'

interface Fighter {
  armor: number
  damage: number
  hitPoints: number
  mana: number
  poisonIsActive: number
  rechargeIsActive: number
  shieldIsActive: number
}

interface SearchNode {
  boss: Fighter
  player: Fighter
  spellsCast: string
  totalManaSpent: number
}

const Spells: {
  cost: number
  effect: (player: Fighter, boss: Fighter) => void
  name: string
}[] = [
  {
    cost: 53,
    effect: (_, boss) => {
      boss.hitPoints -= 4
    },
    name: 'Magic Missile',
  },
  {
    cost: 73,
    effect: (player, boss) => {
      boss.hitPoints -= 2
      player.hitPoints += 2
    },
    name: 'Drain',
  },
  {
    cost: 113,
    effect: (player) => {
      if (player.shieldIsActive === 0) {
        player.shieldIsActive = 6
      }
    },
    name: 'Shield',
  },
  {
    cost: 173,
    effect: (_, boss) => {
      if (boss.poisonIsActive === 0) {
        boss.poisonIsActive = 6
      }
    },
    name: 'Poison',
  },
  {
    cost: 229,
    effect: (player) => {
      if (player.rechargeIsActive === 0) {
        player.rechargeIsActive = 5
      }
    },
    name: 'Recharge',
  },
]

const applyEffects = (fighters: Fighter[]): void =>
  fighters.forEach((fighter) => {
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

const playerTurn = (
  inPlayer: Fighter,
  inBoss: Fighter,
  spellIndex: number,
  part: 1 | 2
): {
  boss: Fighter
  player: Fighter
} => {
  const player: Fighter = JSON.parse(JSON.stringify(inPlayer))
  const boss: Fighter = JSON.parse(JSON.stringify(inBoss))
  if (part === 2) {
    player.hitPoints -= 1
    if ([player, boss].some((fighter) => fighter.hitPoints <= 0)) {
      return { boss, player }
    }
  }
  applyEffects([player, boss])
  if ([player, boss].some((fighter) => fighter.hitPoints <= 0)) {
    return { boss, player }
  }
  const spell = Spells[spellIndex]
  if (spell) {
    player.mana -= spell.cost
    spell.effect(player, boss)
  }
  return { boss, player }
}

const bossTurn = (
  inPlayer: Fighter,
  inBoss: Fighter
): {
  boss: Fighter
  player: Fighter
} => {
  const player: Fighter = JSON.parse(JSON.stringify(inPlayer))
  const boss: Fighter = JSON.parse(JSON.stringify(inBoss))
  applyEffects([player, boss])
  if ([player, boss].some((fighter) => fighter.hitPoints <= 0)) {
    return { boss, player }
  }
  const damage = Math.max(1, boss.damage - player.armor)
  player.hitPoints -= damage
  return { boss, player }
}

function* generatePossibleNexts(
  current: SearchNode,
  part: 1 | 2
): Generator<SearchNode, SearchNode | undefined, undefined> {
  for (let i = 0; i < Spells.length; i++) {
    const spell = Spells[i]
    let fighters = {
      boss: JSON.parse(JSON.stringify(current.boss)),
      player: JSON.parse(JSON.stringify(current.player)),
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
          totalManaSpent: current.totalManaSpent + spell.cost,
        } as SearchNode
      }
    }
  }
  return
}

const sortIntoSearchQueue = (
  insert: SearchNode,
  queue: SLL<SearchNode>
): void => {
  if (!queue.length) {
    queue.push(insert)
  } else {
    let insertAfter = queue.head
    while (
      insertAfter &&
      insertAfter.value.totalManaSpent <= insert.totalManaSpent &&
      insertAfter.next &&
      insertAfter.next.value.totalManaSpent <= insert.totalManaSpent
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

const getBoss = (input: string) => {
  const boss: Fighter = {
    armor: 0,
    damage: 0,
    hitPoints: 0,
    mana: 0,
    poisonIsActive: 0,
    rechargeIsActive: 0,
    shieldIsActive: 0,
  }
  input.split('\n').forEach(line => {
    const [label, value] = line.split(': ')
    switch (label) {
      case 'Hit Points':
        boss.hitPoints = Number(value)
        break
      case 'Damage':
        boss.damage = Number(value)
        break
    }
  })
  return boss
}

const findBestFight = (input: string, part: 1 | 2): number => {
  const queue: SLL<SearchNode> = new SLL({
    boss: getBoss(input),
    player: {
      armor: 0,
      damage: 8,
      hitPoints: 50,
      mana: 500,
      poisonIsActive: 0,
      rechargeIsActive: 0,
      shieldIsActive: 0,
    },
    spellsCast: '',
    totalManaSpent: 0,
  } as SearchNode)
  const seenBefore: Map<string, true> = new Map()

  while (queue.length > 0) {
    const current: SearchNode = queue.shift()!
    if (current.boss.hitPoints <= 0) {
      return current.totalManaSpent
    }

    for (const nextStep of generatePossibleNexts(current, part)) {
      const seenBeforeKey = `${JSON.stringify(
        nextStep.player
      )}...${JSON.stringify(nextStep.boss)}`
      if (seenBefore.get(seenBeforeKey)) continue
      seenBefore.set(seenBeforeKey, true)
      sortIntoSearchQueue(nextStep, queue)
    }
  }

  return NaN
}

export const findBestFightPart1 = (input: string) => ({
  answer1: findBestFight(input, 1),
})

export const findBestFightOnHard = (input: string) => ({
  answer2: findBestFight(input, 2),
})

const day22: Omit<DayConfig, 'year'> = {
  answer1Text: 'You must spend at least answer mana to win the fight.',
  answer2Text:
    'On Hard difficulty, you must spend at least answer mana to win the fight.',
  buttons: [
    {
      label: 'Find Best Fight',
      onClick: findBestFightPart1,
    },
    {
      label: 'Find Best Fight on Hard Mode',
      onClick: findBestFightOnHard,
    },
  ],
  id: 22,
  inputs,
  title: 'Wizard Simulator 20XX',
}

export default day22
