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

let prevInputKey = ''
let state: IState = resetState()

const BUTTONS: IButton[] = []

const renderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => {
  if (inputKey !== prevInputKey) {
    state = resetState()
    prevInputKey = inputKey
  }

  const {
    elves,
    recipes
  } = state

  let recipeText = []
  if (recipes.length < 100) {
    const recipeHead = recipes.head
    let recipe = recipes.head
    let i = 0
    while (recipe && (recipeText.length === 0 || recipe !== recipeHead)) {
      const recipeSpan = recipe === elves[0]
      ? <span key={i}>({recipe.value})</span>
      : recipe === elves[1]
        ? <span key={i}>[{recipe.value}]</span>
        : <span key={i}>&nbsp;{recipe.value}&nbsp;</span>
      recipeText.push(recipeSpan)
      recipe = recipe.next
      i++
    }
  } else {
    recipeText.push((
      <span key="too-many-recipes">The elves have generated too many recipes to efficiently display them all!</span>
    ))
  }

  return (
    <div className="render-box">
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
      The solution is{' '}
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