import inputs from '../../inputs/2019/day14'
import { DayConfig } from '../../routes/Day'

interface Order {
  amount: number
  ingredient: string
}

interface Converter {
  [key: string]: {
    [key: string]: number
  }[]
}

const parseInput = (input: string) => {
  const converter: Converter = {}
  input.split('\n').forEach((row: string) => {
    const [costsStr, result] = row.split(' => ')
    const [resultAmount, resultName] = result.split(' ')
    converter[`${resultName}-${resultAmount}`] = costsStr
      .split(', ')
      .map((cost: string) => {
        const [costAmount, costName] = cost.split(' ')
        return {
          [`${costName}`]: parseInt(costAmount),
        }
      })
  })
  return converter
}

const getRecipe = (
  ingredient: string,
  recipes: Converter
): {
  recipe: { [key: string]: number }[]
  recipeAmountProduced: number
} => {
  let recipe: { [key: string]: number }[] = []
  let recipeAmountProduced = 0

  if (ingredient === 'ORE') {
    return {
      recipe: [],
      recipeAmountProduced: 1,
    }
  }

  // Get recipe
  for (const key in recipes) {
    if (key.startsWith(`${ingredient}-`)) {
      recipeAmountProduced = parseInt(key.split('-')[1])
      recipe = recipes[key]
    }
  }

  return {
    recipe,
    recipeAmountProduced,
  }
}

const totalOreCostForOrder = (inOrder: Order, recipes: Converter): number => {
  const inventory: { [key: string]: number } = {}
  const orders: Order[] = []
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
      const amountNeededOfOrderIngredient =
        order.amount - inventory[order.ingredient]
      const { recipe, recipeAmountProduced } = getRecipe(
        order.ingredient,
        recipes
      )

      const batchesOfRecipe = Math.ceil(
        amountNeededOfOrderIngredient / recipeAmountProduced
      )
      recipe.forEach((recipeIngredient) => {
        const recipeIngredientName = Object.keys(recipeIngredient)[0]

        orders.push({
          amount: recipeIngredient[recipeIngredientName] * batchesOfRecipe,
          ingredient: recipeIngredientName,
        })
      })

      const leftoverAmount =
        batchesOfRecipe * recipeAmountProduced - amountNeededOfOrderIngredient
      inventory[order.ingredient] = leftoverAmount
    }
  }

  return oreUsed
}

export const calculateOreCost = (input: string) => ({
  answer1: totalOreCostForOrder(
    { amount: 1, ingredient: 'FUEL' },
    parseInput(input)
  ),
})

export const buildAsMuchAsPossible = (input: string) => {
  const converter = parseInput(input)
  const totalOreAvailable = 1000000000000

  let lowerBound = 0
  let upperBound = totalOreAvailable

  const fuelCost = totalOreCostForOrder(
    { amount: 1, ingredient: 'FUEL' },
    converter
  )

  let guess = Math.floor(totalOreAvailable / fuelCost)

  while (upperBound > lowerBound + 1) {
    const costOfGuess = totalOreCostForOrder(
      { amount: guess, ingredient: 'FUEL' },
      converter
    )
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
      answer2: lowerBound,
    }
  } else {
    return {
      answer2:
        totalOreAvailable -
          totalOreCostForOrder(
            { amount: lowerBound, ingredient: 'FUEL' },
            converter
          ) <
        fuelCost
          ? lowerBound
          : upperBound,
    }
  }
}

const day14: Omit<DayConfig, 'year'> = {
  answer1Text: 'It costs answer ore to build 1 fuel.',
  answer2Text: 'With 1000000000000 ore, you built answer fuel.',
  buttons: [
    {
      label: 'Calculate Ore Cost for Fuel',
      onClick: calculateOreCost,
    },
    {
      label: 'Build As Much As Possible',
      onClick: buildAsMuchAsPossible,
    },
  ],
  id: 14,
  inputs,
  title: 'Space Stoichiometry',
}

export default day14
