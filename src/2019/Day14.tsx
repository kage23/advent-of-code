import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2019/Day14'

interface IConverter {
  [key: string]: {
    [key: string]: number
  }[]
}

const getRecipe = (ingredient: string, recipes: IConverter): {
  recipe: { [key: string]: number }[]
  recipeAmountProduced: number
} => {
  let recipe: { [key: string]: number }[] = []
  let recipeAmountProduced = 0

  if (ingredient === 'ORE') {
    return {
      recipe: [],
      recipeAmountProduced: 1
    }
  }

  // Get recipe
  for (let key in recipes) {
    if (key.startsWith(`${ingredient}-`)) {
      recipeAmountProduced = parseInt(key.split('-')[1])
      recipe = recipes[key]
    }
  }

  return {
    recipe,
    recipeAmountProduced
  }
}

const parseInput = (inputKey: string) => {
  const converter: IConverter = {}
  INPUT[inputKey].split('\n').forEach((row: string) => {
    const [costsStr, result] = row.split(' => ')
    const [resultAmount, resultName] = result.split(' ')
    converter[`${resultName}-${resultAmount}`] = costsStr.split(', ').map((cost: string) => {
      const [costAmount, costName] = cost.split(' ')
      return {
        [`${costName}`]: parseInt(costAmount)
      }
    })
  })
  return converter
}

interface IOrder {
  amount: number
  ingredient: string
}

const totalOreCostForOrder = (inOrder: IOrder, recipes: IConverter): number => {
  const inventory: { [key: string]: number } = {}
  const orders: IOrder[] = []
  let oreUsed = 0
  orders.push(inOrder)

  while (orders.length > 0) {
    const order = orders.shift()
    if (!order) throw new Error('fuck')

    if (!inventory[order.ingredient]) inventory[order.ingredient] = 0
    if (order.ingredient === 'ORE') {
      oreUsed += order.amount
    } else if (order.amount <= inventory[order.ingredient]) {
      inventory[order.ingredient] -= order.amount
    } else {
      const amountNeededOfOrderIngredient = order.amount - inventory[order.ingredient]
      let { recipe, recipeAmountProduced } = getRecipe(order.ingredient, recipes)

      const batchesOfRecipe = Math.ceil(amountNeededOfOrderIngredient / recipeAmountProduced)
      recipe.forEach(recipeIngredient => {
        const recipeIngredientName = Object.keys(recipeIngredient)[0]

        orders.push({
          amount: recipeIngredient[recipeIngredientName] * batchesOfRecipe,
          ingredient: recipeIngredientName
        })
      })

      const leftoverAmount = (batchesOfRecipe * recipeAmountProduced) - amountNeededOfOrderIngredient
      inventory[order.ingredient] = leftoverAmount
    }
  }

  return oreUsed
}

const BUTTONS: IButton[] = [
  {
    label: 'Calculate Ore Cost for Fuel',
    onClick: (inputKey: string) => ({
      answer1: totalOreCostForOrder({ amount: 1, ingredient: 'FUEL' }, parseInput(inputKey)).toString()
    })
  },
  {
    label: 'Build As Much As Possible',
    onClick: (inputKey: string) => {
      const converter = parseInput(inputKey)
      let totalOreAvailable = 1000000000000

      let lowerBound = 0
      let upperBound = totalOreAvailable

      const fuelCost = totalOreCostForOrder({ amount: 1, ingredient: 'FUEL' }, converter)

      let guess = Math.floor(totalOreAvailable / fuelCost)

      while (upperBound > lowerBound + 1) {
        let costOfGuess = totalOreCostForOrder({ amount: guess, ingredient: 'FUEL' }, converter)
        const leftoverOre = totalOreAvailable - costOfGuess

        if (leftoverOre > fuelCost) {
          lowerBound = guess
        } else if (leftoverOre < fuelCost) {
          upperBound = guess
        } else if (leftoverOre === fuelCost) {
          upperBound = guess + 1
          lowerBound = upperBound
        }

        guess = Math.floor((upperBound + lowerBound) / 2)
      }

      if (lowerBound === upperBound) {
        return {
          answer2: lowerBound.toString()
        }
      } else {
        return {
          answer2: (
            totalOreAvailable - totalOreCostForOrder({ amount: lowerBound, ingredient: 'FUEL' }, converter) < fuelCost
              ? lowerBound
              : upperBound
          ).toString()
        }
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      It costs <code>{answer}</code> ore to build <code>1</code> fuel.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      With <code>1000000000000</code> ore, you built <code>{answer}</code> fuel.
    </span>
  ),
  buttons: BUTTONS,
  day: 14,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Space Stoichiometry'
}

export default config
