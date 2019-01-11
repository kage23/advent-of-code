import React from 'react'

import Day1__2018__Config from './2018/Day1'
import Day2__2018__Config from './2018/Day2'
import Day3__2018__Config from './2018/Day3'
import Day4__2018__Config from './2018/Day4'
import Day5__2018__Config from './2018/Day5'
import Day6__2018__Config from './2018/Day6'
import Day7__2018__Config from './2018/Day7'

export interface IButton {
  label: string
  onClick: (input: string) => {
    answer1?: string
    answer2?: string
  }
}

export interface IDayConfig {
  answer1Text: (answer: string, inputKey?: string) => JSX.Element
  answer2Text: (answer: string, inputKey?: string) => JSX.Element
  buttons: IButton[]
  day: number
  INPUT: {
    [key:string]: string
  }
  renderDay: (
    dayConfig: IDayConfig,
    input: string,
    answer1: false | string,
    answer2: false | string
  ) => JSX.Element
  title: string
}

export interface IYearConfig {
  year: number
  days: IDayConfig[]
}

export const defaultRenderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => (
  <div>
    <p>Input:</p>
    <pre>{dayConfig.INPUT[inputKey]}</pre>
  </div>
)

export const YEARS: IYearConfig[] = [
  {
    year: 2018,
    days: [
      Day1__2018__Config,
      Day2__2018__Config,
      Day3__2018__Config,
      Day4__2018__Config,
      Day5__2018__Config,
      Day6__2018__Config,
      Day7__2018__Config
    ]
  }
]