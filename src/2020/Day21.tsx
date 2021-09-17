import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import INPUT from './Input/Day21'

interface IRecipe {
  allergens: string[]
  ingredients: string[]
}

const parseInput = (input: string): IRecipe[] => input.split('\n').map(line => {
  const [rawIngredients, rawAllergens] = line.split(' (contains ')
  const allergens = rawAllergens.slice(0, -1).split(', ')
  const ingredients = rawIngredients.split(' ')

  return {
    allergens,
    ingredients
  }
})

const BUTTONS: IButton[] = [
  {
    label: 'Analyze Recipes',
    onClick: (inputKey: string) => {
      const recipes = parseInput(INPUT[inputKey])
      const allAllergens = recipes
        .map(recipe => recipe.allergens)
        .flat()
        .filter((x, idx, list) => list.findIndex(y => y === x) === idx)
      const allIngredients = recipes
        .map(recipe => recipe.ingredients)
        .flat()
        .filter((x, idx, list) => list.findIndex(y => y === x) === idx)
      let allergenPossibilities: {
        allergen: string
        possibilities: string[]
      }[] = []

      allAllergens.forEach(allergen => {
        const allRecipesWithAllergen = recipes.filter(({ allergens }) => allergens.includes(allergen))
        const ingredientsInCommon = allRecipesWithAllergen[0].ingredients.filter(ingredient => (
          allRecipesWithAllergen.every(({ ingredients }) => ingredients.includes(ingredient))
        ))
        allergenPossibilities.push({
          allergen,
          possibilities: ingredientsInCommon
        })
      })

      while (allergenPossibilities.some(({ possibilities }) => possibilities.length > 1)) {
        const knownIngredients = allergenPossibilities
          .filter(({ possibilities }) => possibilities.length === 1)
          .map(({ possibilities }) => possibilities[0])
        const knownAllergies = allergenPossibilities
          .filter(({ possibilities }) => possibilities.length === 1)
          .map(({ allergen }) => allergen)
        allergenPossibilities = allergenPossibilities.map(({ allergen, possibilities }) => (
          knownAllergies.includes(allergen) ? { allergen, possibilities } :
          {
            allergen,
            possibilities: possibilities.filter(possibility => !knownIngredients.includes(possibility))
          }
        ))
      }

      const definiteNonAllergens = allIngredients.filter(
        ingredient => !allergenPossibilities.some(({ possibilities }) => possibilities[0] === ingredient)
      )

      const nonAllergenCount = recipes.reduce((count, { ingredients }) => (
        count + ingredients.filter(ingredient => definiteNonAllergens.includes(ingredient)).length
      ), 0)

      return {
        answer1: nonAllergenCount.toString()
      }
    }
  },
  {
    label: 'Continue Analysis',
    onClick: (inputKey: string) => {
      // Really, I should extract stuff into functions, but I'm being lazy so I'm just copypasting from the first button's onClick
      const recipes = parseInput(INPUT[inputKey])
      const allAllergens = recipes
        .map(recipe => recipe.allergens)
        .flat()
        .filter((x, idx, list) => list.findIndex(y => y === x) === idx)
      let allergenPossibilities: {
        allergen: string
        possibilities: string[]
      }[] = []

      allAllergens.forEach(allergen => {
        const allRecipesWithAllergen = recipes.filter(({ allergens }) => allergens.includes(allergen))
        const ingredientsInCommon = allRecipesWithAllergen[0].ingredients.filter(ingredient => (
          allRecipesWithAllergen.every(({ ingredients }) => ingredients.includes(ingredient))
        ))
        allergenPossibilities.push({
          allergen,
          possibilities: ingredientsInCommon
        })
      })

      while (allergenPossibilities.some(({ possibilities }) => possibilities.length > 1)) {
        const knownIngredients = allergenPossibilities
          .filter(({ possibilities }) => possibilities.length === 1)
          .map(({ possibilities }) => possibilities[0])
        const knownAllergies = allergenPossibilities
          .filter(({ possibilities }) => possibilities.length === 1)
          .map(({ allergen }) => allergen)
        allergenPossibilities = allergenPossibilities.map(({ allergen, possibilities }) => (
          knownAllergies.includes(allergen) ? { allergen, possibilities } :
          {
            allergen,
            possibilities: possibilities.filter(possibility => !knownIngredients.includes(possibility))
          }
        ))
      }

      const dangerList = allergenPossibilities
        .sort((a, b) => a.allergen.localeCompare(b.allergen))
        .map(({ possibilities }) => possibilities[0])
        .join(',')

      return {
        answer2: dangerList
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The definite non-allergens appear <code>{answer}</code> times in all the recipes.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The canonical danger list is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 21,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Allergen Assessment'
}

export default config