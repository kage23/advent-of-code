import React from 'react'
import {
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day14'

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

const part1 = (betterAfter: number): {
  answer1: undefined | string
  elves: [RecipeNode | undefined, RecipeNode | undefined]
  recipes: RecipeList
} => {
  let myState: IState = resetState()

  while (myState.recipes.length < betterAfter + 10)
    myState = createRecipesAndAdvance(myState.elves, myState.recipes)

  let answer1 = ''
  let recipe = myState.recipes.head
  for (let i = 0; i < betterAfter + 10; i++) {
    if (recipe && i >= betterAfter) answer1 += recipe.value.toString()
    if (recipe) recipe = recipe.next
  }

  return {
    answer1,
    ...myState
  }
}

const part2 = (lookingFor: string): {
  answer2: undefined | string
  elves: [RecipeNode | undefined, RecipeNode | undefined]
  recipes: RecipeList
} => {
  const targetLength = lookingFor.length
  let checkString = ''

  let { elves, recipes }: IState = resetState()

  let nextSet: {
    elves: [RecipeNode | undefined, RecipeNode | undefined]
    newRecipes: number[]
    recipes: RecipeList
  } = {
    elves,
    newRecipes: [],
    recipes
  }

  while (checkString.indexOf(lookingFor) === -1) {
    nextSet = createRecipesAndAdvance(nextSet.elves, nextSet.recipes)
    checkString += nextSet.newRecipes.join('')
    while (checkString.length > lookingFor.length * 2) checkString = checkString.slice(1)
  }

  return {
    answer2: checkString.endsWith(lookingFor)
      ? (nextSet.recipes.length - targetLength).toString()
      : (nextSet.recipes.length - targetLength - 1).toString(),
    elves: nextSet.elves,
    recipes: nextSet.recipes
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
      const result = part1(parseInt(INPUT[inputKey]))
      state.elves = result.elves
      state.recipes = result.recipes
      return {
        answer1: result.answer1
      }
    }
  },
  {
    label: 'Find Good Recipes (Part 2)',
    onClick: (inputKey) => {
      const result = part2(INPUT[inputKey])
      state.elves = result.elves
      state.recipes = result.recipes
      return {
        answer2: result.answer2
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
    while (recipe && (recipeText.length === 0 || recipe !== recipeHead)) {
      recipeText += recipe === elves[0]
        ? `(${recipe.value})`
        : recipe === elves[1]
          ? `[${recipe.value}]`
          : `${String.fromCharCode(160)}${recipe.value}${' '}`
      recipe = recipe.next
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
  answer2Text: (answer, inputKey = '') => (
    <span>
      <code>{INPUT[inputKey]}</code>
      {' '}first appears after{' '}
      <code>{answer}</code> recipes.
    </span>
  ),
  buttons: BUTTONS,
  day: 14,
  INPUT,
  renderDay,
  title: 'Chocolate Charts'
}

export default config