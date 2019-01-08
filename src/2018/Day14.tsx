import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day14'

import DLL, { IDLLNode } from '../utils/DLL'

interface RecipeList extends DLL {
  head: RecipeNode | undefined
}

interface RecipeNode extends IDLLNode {
  value: number
  next?: RecipeNode
  prev?: RecipeNode
}

interface IState {
  elves: [RecipeNode | undefined, RecipeNode | undefined]
  recipes: RecipeList
}

const createRecipesAndAdvance = (elves: [RecipeNode | undefined, RecipeNode | undefined], recipes: RecipeList): {
  elves: [RecipeNode | undefined, RecipeNode | undefined]
  newRecipes: number[]
  recipes: RecipeList
} => {
  let [
    elf1,
    elf2
  ] = elves
  const newRecipes = []

  if (elf1 && elf2) {
    // Add new recipes
    const recipeSum = elf1.value + elf2.value
    if (recipeSum > 9) {
      recipes.push(Math.floor(recipeSum / 10))
      newRecipes.push(Math.floor(recipeSum / 10))
    }
    recipes.push(recipeSum % 10)
    newRecipes.push(recipeSum % 10)

    // Advance the elves one plus their current recipe's score
    const oldElf1 = elf1.value
    const oldElf2 = elf2.value
    for (let i = 0; i <= oldElf1; i++) if (elf1) elf1 = elf1.next
    for (let i = 0; i <= oldElf2; i++) if (elf2) elf2 = elf2.next
  }

  return {
    elves: [elf1, elf2],
    newRecipes,
    recipes
  }
}

const resetRecipes = (): RecipeList => {
  const recipeList = new DLL(3)
  recipeList.push(7)
  return recipeList
}

const resetState = (): IState => {
  const recipes = resetRecipes()
  const elves = [recipes.head, recipes.head ? recipes.head.next : undefined] as [RecipeNode | undefined, RecipeNode | undefined]

  return {
    elves,
    recipes
  }
}

const part1 = (betterAfter: number, elves: [RecipeNode | undefined, RecipeNode | undefined], recipes: RecipeList): {
  answer1: undefined | string
  elves: [RecipeNode | undefined, RecipeNode | undefined]
  recipes: RecipeList
} => {
  let nextSet: {
    elves: [RecipeNode | undefined, RecipeNode | undefined]
    recipes: RecipeList
  } = {
    elves,
    recipes
  }

  while (nextSet.recipes.length < betterAfter + 10) nextSet = createRecipesAndAdvance(nextSet.elves, nextSet.recipes)

  let answer1 = ''
  let recipe = nextSet.recipes.head
  for (let i = 0; i < betterAfter + 10; i++) {
    if (recipe && i >= betterAfter) answer1 += recipe.value.toString()
    if (recipe) recipe = recipe.next
  }

  return {
    answer1,
    ...nextSet
  }
}

let prevInputKey = ''
let state: IState = resetState()

const BUTTONS: IButton[] = [
  {
    label: 'Create Recipes and Advance',
    onClick: () => {
      const next = createRecipesAndAdvance(state.elves, state.recipes)
      state.elves = next.elves
      state.recipes = next.recipes
      return {}
    }
  },
  {
    label: 'Find Good Recipes (Part 1)',
    onClick: (inputKey) => {
      const result = part1(parseInt(INPUT[inputKey]), state.elves, state.recipes)
      state.elves = result.elves
      state.recipes = result.recipes
      return {
        answer1: result.answer1
      }
    }
  }
]

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (inputKey !== prevInputKey) {
    state = resetState()
    prevInputKey = inputKey
  }

  const {
    elves,
    recipes
  } = state

  let recipeText = ''
  if (recipes.length < 100) {
    const recipeHead = recipes.head
    let recipe = recipes.head
    let i = 0
    while (recipe && (recipeText.length === 0 || recipe !== recipeHead)) {
      recipeText += recipe === elves[0]
        ? `(${recipe.value})`
        : recipe === elves[1]
          ? `[${recipe.value}]`
          : `${String.fromCharCode(160)}${recipe.value}${' '}`
      recipe = recipe.next
      i++
    }
  } else {
    recipeText = 'The elves have generated too many recipes to efficiently display them all!'
  }

  return (
    <div>
      <p>
        The elves will improve after{' '}
        <code>{dayConfig.INPUT[inputKey]}</code>{' '}
        recipes. (Or something like that!)
      </p>
      <p>{recipeText}</p>
    </div>
  )
}

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The ten recipes after they improve are{' '}
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
  day: 14,
  INPUT,
  renderDay,
  title: 'Chocolate Charts'
}

export default config