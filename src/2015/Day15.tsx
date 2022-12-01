import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2015/Day15'

interface IIngredient {
  calories: number
  capacity: number
  durability: number
  flavor: number
  name: string
  texture: number
}

interface IRecipeItem {
  ingredient: IIngredient
  quantity: number
}

const generateRecipes = (ingredients: IIngredient[], totalSize = 100): IRecipeItem[][] => {
  if (ingredients.length === 1) {
    return [[{ ingredient: ingredients[0], quantity: totalSize }]]
  }

  const recipes: IRecipeItem[][] = []

  for (let i = 0; i <= totalSize; i++) {
    const firstIngredient = {
      ingredient: ingredients[0],
      quantity: i
    }
    const remainingIngredientRecipes = generateRecipes(ingredients.slice(1), totalSize - i)
    remainingIngredientRecipes.forEach(recipe => recipes.push([firstIngredient, ...recipe]))
  }

  return recipes
}

const getCalories = (recipe: IRecipeItem[]): number =>
  Math.max(recipe.reduce((total, recipeItem) => total + (recipeItem.quantity * recipeItem.ingredient.calories), 0), 0)

const parseInput = (inputKey: string): IIngredient[] => INPUT[inputKey].split('\n').map(ingredLine => {
  const calories = parseInt(ingredLine.split('calories ')[1])
  const capacity = parseInt(ingredLine.split('capacity ')[1])
  const durability = parseInt(ingredLine.split('durability ')[1])
  const flavor = parseInt(ingredLine.split('flavor ')[1])
  const name = ingredLine.split(': ')[0]
  const texture = parseInt(ingredLine.split('texture ')[1])
  return {
    calories,
    capacity,
    durability,
    flavor,
    name,
    texture
  }
})

const scoreRecipe = (recipe: IRecipeItem[]): number => {
  const capacityScore = Math.max(recipe.reduce((total, recipeItem) => total + (recipeItem.quantity * recipeItem.ingredient.capacity), 0), 0)
  const durabilityScore = Math.max(recipe.reduce((total, recipeItem) => total + (recipeItem.quantity * recipeItem.ingredient.durability), 0), 0)
  const flavorScore = Math.max(recipe.reduce((total, recipeItem) => total + (recipeItem.quantity * recipeItem.ingredient.flavor), 0), 0)
  const textureScore = Math.max(recipe.reduce((total, recipeItem) => total + (recipeItem.quantity * recipeItem.ingredient.texture), 0), 0)

  return capacityScore * durabilityScore * flavorScore * textureScore
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Best Recipe',
    onClick: (inputKey) => {
      const ingredients = parseInput(inputKey)
      const recipes = generateRecipes(ingredients)
      let bestRecipeScore = Number.MIN_SAFE_INTEGER
      recipes.forEach(recipe => {
        bestRecipeScore = Math.max(bestRecipeScore, scoreRecipe(recipe))
      })
      return {
        answer1: bestRecipeScore.toString()
      }
    }
  },
  {
    label: 'Find Best Low-Cal Recipe',
    onClick: (inputKey) => {
      const ingredients = parseInput(inputKey)
      const recipes = generateRecipes(ingredients)
        .filter(recipe => getCalories(recipe) === 500)
      let bestRecipeScore = Number.MIN_SAFE_INTEGER
      recipes.forEach(recipe => {
        bestRecipeScore = Math.max(bestRecipeScore, scoreRecipe(recipe))
      })
      return {
        answer2: bestRecipeScore.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The highest-scoring cookie has a score of <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The highest-scoring low-calorie cookie has a score of <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 15,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Science for Hungry People'
}

export default config