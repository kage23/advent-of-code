import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day21'

interface IItemCombo {
  armor?: IShopItem
  rings: IShopItem[]
  totalCost: number
  weapon: IShopItem
}

interface IFighter {
  armor: number
  damage: number
  hitPoints: number
}

interface IShopItem {
  armor: number
  cost: number
  damage: number
  name: string
}

const weapons: IShopItem[] = [
  {
    armor: 0,
    cost: 8,
    damage: 4,
    name: 'Dagger'
  },
  {
    armor: 0,
    cost: 10,
    damage: 5,
    name: 'Shortsword'
  },
  {
    armor: 0,
    cost: 25,
    damage: 6,
    name: 'Warhammer'
  },
  {
    armor: 0,
    cost: 40,
    damage: 7,
    name: 'Longsword'
  },
  {
    armor: 0,
    cost: 74,
    damage: 8,
    name: 'Greataxe'
  }
]

const armors: IShopItem[] = [
  {
    armor: 1,
    cost: 13,
    damage: 0,
    name: 'Leather'
  },
  {
    armor: 2,
    cost: 31,
    damage: 0,
    name: 'Chainmail'
  },
  {
    armor: 3,
    cost: 53,
    damage: 0,
    name: 'Splintmail'
  },
  {
    armor: 4,
    cost: 75,
    damage: 0,
    name: 'Bandedmail'
  },
  {
    armor: 5,
    cost: 102,
    damage: 0,
    name: 'Platemail'
  },
]

const rings: IShopItem[] = [
  {
    armor: 0,
    cost: 25,
    damage: 1,
    name: 'Damage +1'
  },
  {
    armor: 0,
    cost: 50,
    damage: 2,
    name: 'Damage +2'
  },
  {
    armor: 0,
    cost: 100,
    damage: 3,
    name: 'Damage +3'
  },
  {
    armor: 1,
    cost: 20,
    damage: 0,
    name: 'Defense +1'
  },
  {
    armor: 2,
    cost: 40,
    damage: 0,
    name: 'Defense +2'
  },
  {
    armor: 3,
    cost: 80,
    damage: 0,
    name: 'Defense +3'
  },
]

const generateEquipmentCombos = (): IItemCombo[] => {
  const combosList: IItemCombo[] = []

  for (let weapon of weapons) {
    // You must have exactly one weapon.
    // You can have 0 or 1 Armors.
    // You can have 0, 1, or 2 Rings.
    // So first, just equip the weapon with nothing else.
    combosList.push({
      rings: [],
      totalCost: weapon.cost,
      weapon
    })

    // Then start looking at armors.
    for (let armor of armors) {
      // Just the weapon and the armor
      combosList.push({
        armor,
        rings: [],
        totalCost: weapon.cost + armor.cost,
        weapon
      })

      // Start looking at rings with the armor equipped
      for (let ring1Index = 0; ring1Index < rings.length; ring1Index++) {
        const ringsList = [ rings[ring1Index] ]
        // Just the weapon, the armor, and one ring
        combosList.push({
          armor,
          rings: ringsList,
          totalCost: weapon.cost + armor.cost
            + ringsList.reduce((totalCost, ring) => totalCost + ring.cost, 0),
          weapon
        })

        // Now let's look at adding a second ring
        for (let ring2Index = ring1Index + 1; ring2Index < rings.length; ring2Index++) {
          const ringsList = [ rings[ring1Index], rings[ring2Index] ]
          // Weapon, armor, and two rings
          combosList.push({
            armor,
            rings: ringsList,
            totalCost: weapon.cost + armor.cost
              + ringsList.reduce((totalCost, ring) => totalCost + ring.cost, 0),
            weapon
          })
        }
      }
    }

    // Now let's look at rings with no armor equipped
    for (let ring1Index = 0; ring1Index < rings.length; ring1Index++) {
      const ringsList = [ rings[ring1Index] ]
      // Just the weapon and one ring
      combosList.push({
        rings: ringsList,
        totalCost: weapon.cost + ringsList.reduce((totalCost, ring) => totalCost + ring.cost, 0),
        weapon
      })

      // Now let's look at adding a second ring
      for (let ring2Index = ring1Index + 1; ring2Index < rings.length; ring2Index++) {
        const ringsList = [ rings[ring1Index], rings[ring2Index] ]
        // Weapon and two rings
        combosList.push({
          rings: ringsList,
          totalCost: weapon.cost + ringsList.reduce((totalCost, ring) => totalCost + ring.cost, 0),
          weapon
        })
      }
    }
  }

  return combosList
}

const getFighterStatsFromEquipmentCombo = (equipment: IItemCombo): IFighter => ({
  armor: equipment.rings.reduce((total, ring) => total + ring.armor, 0)
    + (equipment.armor ? equipment.armor.armor : 0),
  damage: equipment.weapon.damage + equipment.rings.reduce((total, ring) => total + ring.damage, 0),
  hitPoints: 100
})

// Returns true if the first player wins or false if the second player wins
// It's up to you to pass the player as the first player and the boss as the second player
const runFight = (fighters: IFighter[]): boolean => {
  // We don't actually _have_ to simulate the whole fight here; we could just determine how many rounds it will take for each player to win
  // But I figure this is more fun for the browser's JS engine ... ;)
  if (fighters.length !== 2) throw new Error('fuck')
  let attackerIndex = 0
  while (fighters.every(fighter => fighter.hitPoints > 0)) {
    const defenderIndex = (attackerIndex + 1) % fighters.length
    const damageDealt = Math.max(1, fighters[attackerIndex].damage - fighters[defenderIndex].armor)
    fighters[defenderIndex].hitPoints -= damageDealt
    attackerIndex = (attackerIndex + 1) % fighters.length
  }
  return fighters[0].hitPoints > 0
}

const BUTTONS: IButton[] = [
  {
    label: 'Check All Equipment Combos',
    onClick: () => {
      const equipmentCombosList = generateEquipmentCombos().sort((a, b) => a.totalCost - b.totalCost)
      let mostExpensiveLoss = 0
      let leastExpensiveWin = Number.MAX_SAFE_INTEGER

      for (let equipmentCombo of equipmentCombosList) {
        const player = getFighterStatsFromEquipmentCombo(equipmentCombo)
        const boss: IFighter = { armor: 2, damage: 8, hitPoints: 100 }
        const result = runFight([player, boss])
        if (!result) {
          mostExpensiveLoss = Math.max(mostExpensiveLoss, equipmentCombo.totalCost)
        } else {
          leastExpensiveWin = Math.min(leastExpensiveWin, equipmentCombo.totalCost)
        }
      }

      return {
        answer1: leastExpensiveWin.toString(),
        answer2: mostExpensiveLoss.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      You must spend at least <code>{answer}</code> gold to win the fight.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      It's possible to spend up to <code>{answer}</code> gold and still lose the fight!
    </span>
  ),
  buttons: BUTTONS,
  day: 21,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'RPG Simulator 20XX'
}

export default config