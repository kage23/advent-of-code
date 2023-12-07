import inputs from '../../inputs/2018/day14'
import { DayConfig } from '../../routes/Day'
import DLL, { IDLLNode } from '../../utils/DLL'

type RecipeList = DLL<number>
type RecipeNode = IDLLNode<number>

interface State {
  elves: [RecipeNode | undefined, RecipeNode | undefined]
  recipes: RecipeList
}

const resetRecipes = (): RecipeList => {
  const recipeList = new DLL(3)
  recipeList.push(7)
  return recipeList
}

const resetState = (): State => {
  const recipes = resetRecipes()
  const elves = [recipes.head, recipes.head ? recipes.head.next : undefined] as [RecipeNode | undefined, RecipeNode | undefined]

  return {
    elves,
    recipes
  }
}

let state: State = resetState()

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

const part1 = (betterAfter: number): {
  answer1?: string
  elves: [RecipeNode | undefined, RecipeNode | undefined]
  recipes: RecipeList
} => {
  let myState: State = resetState()

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
  answer2?: number
  elves: [RecipeNode | undefined, RecipeNode | undefined]
  recipes: RecipeList
} => {
  const targetLength = lookingFor.length
  let checkString = ''

  const { elves, recipes }: State = resetState()

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
      ? nextSet.recipes.length - targetLength
      : nextSet.recipes.length - targetLength - 1,
    elves: nextSet.elves,
    recipes: nextSet.recipes
  }
}

export const findGoodRecipes = (inputKey: string) => {
  state = resetState()
  const result = part1(parseInt(inputs.get(inputKey)!))
  state.elves = result.elves
  state.recipes = result.recipes
  return {
    answer1: result.answer1
  }
}

export const findTargetRecipe = (inputKey: string) => {
  state = resetState()
  const result = part2(inputs.get(inputKey)!)
  state.elves = result.elves
  state.recipes = result.recipes
  return {
    answer2: result.answer2
  }
}

const day14: Omit<DayConfig, 'year'> = {
  answer1Text: 'The ten recipes after they improve are answer.',
  answer2Text: 'The target recipe first appears after answer recipes.',
  buttons: [
    {
      label: 'Find Good Recipes (Part 1)',
      onClick: findGoodRecipes
    },
    {
      label: 'Find Good Recipes (Part 2)',
      onClick: findTargetRecipe
    },
  ],
  id: 14,
  inputs,
  title: 'Chocolate Charts',
}

export default day14
