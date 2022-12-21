import inputs from '../../inputs/2015/day15'
import { DayConfig } from '../../routes/Day'

interface Ingredient {
  calories: number
  capacity: number
  durability: number
  flavor: number
  name: string
  texture: number
}

interface RecipeItem {
  ingredient: Ingredient
  quantity: number
}

const parseInput = (inputKey: string): Ingredient[] => inputs.get(inputKey)!.split('\n').map(ingredLine => {
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

const generateRecipes = (ingredients: Ingredient[], totalSize = 100): RecipeItem[][] => {
  if (ingredients.length === 1) {
    return [[{ ingredient: ingredients[0], quantity: totalSize }]]
  }

  const recipes: RecipeItem[][] = []

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

const scoreRecipe = (recipe: RecipeItem[]): number => {
  const capacityScore = Math.max(recipe.reduce((total, recipeItem) => total + (recipeItem.quantity * recipeItem.ingredient.capacity), 0), 0)
  const durabilityScore = Math.max(recipe.reduce((total, recipeItem) => total + (recipeItem.quantity * recipeItem.ingredient.durability), 0), 0)
  const flavorScore = Math.max(recipe.reduce((total, recipeItem) => total + (recipeItem.quantity * recipeItem.ingredient.flavor), 0), 0)
  const textureScore = Math.max(recipe.reduce((total, recipeItem) => total + (recipeItem.quantity * recipeItem.ingredient.texture), 0), 0)

  return capacityScore * durabilityScore * flavorScore * textureScore
}

const getCalories = (recipe: RecipeItem[]): number =>
  Math.max(recipe.reduce((total, recipeItem) => total + (recipeItem.quantity * recipeItem.ingredient.calories), 0), 0)

export const findBestRecipe = (inputKey: string) => {
  const ingredients = parseInput(inputKey)
  const recipes = generateRecipes(ingredients)
  let bestRecipeScore = Number.MIN_SAFE_INTEGER
  recipes.forEach(recipe => {
    bestRecipeScore = Math.max(bestRecipeScore, scoreRecipe(recipe))
  })
  return {
    answer1: bestRecipeScore
  }
}

export const findBestLowCalRecipe = (inputKey: string) => {
  const ingredients = parseInput(inputKey)
  const recipes = generateRecipes(ingredients)
    .filter(recipe => getCalories(recipe) === 500)
  let bestRecipeScore = Number.MIN_SAFE_INTEGER
  recipes.forEach(recipe => {
    bestRecipeScore = Math.max(bestRecipeScore, scoreRecipe(recipe))
  })
  return {
    answer2: bestRecipeScore
  }
}

const day15: Omit<DayConfig, 'year'> = {
  answer1Text: 'The highest-scoring cookie has a score of answer.',
  answer2Text: 'The highest-scoring low-calorie cookie has a score of answer.',
  buttons: [
    {
      label: 'Find Best Recipe',
      onClick: findBestRecipe
    },
    {
      label: 'Find Best Low-Calorie Recipe',
      onClick: findBestLowCalRecipe
    }
  ],
  id: 15,
  inputs,
  title: 'Science for Hungry People',
}

export default day15
