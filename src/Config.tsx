import React from 'react'

// TODO: Import the Year config instead of each Day config
// TODO: Add a cover image to the IYearConfig to display on the home page when year but not day is selected

import Day1__2018__Config from './2018/Day1'
import Day2__2018__Config from './2018/Day2'
import Day3__2018__Config from './2018/Day3'
import Day4__2018__Config from './2018/Day4'
import Day5__2018__Config from './2018/Day5'
import Day6__2018__Config from './2018/Day6'
import Day7__2018__Config from './2018/Day7'
import Day8__2018__Config from './2018/Day8'
import Day9__2018__Config from './2018/Day9'
import Day10__2018__Config from './2018/Day10'
import Day11__2018__Config from './2018/Day11'
import Day12__2018__Config from './2018/Day12'
import Day13__2018__Config from './2018/Day13'
import Day14__2018__Config from './2018/Day14'
import Day15__2018__Config from './2018/Day15'
import Day16__2018__Config from './2018/Day16'
import Day17__2018__Config from './2018/Day17'

export interface IButton {
  label: string
  onClick: (input: string) => {
    answer1?: string | JSX.Element
    answer2?: string | JSX.Element
  }
}

export interface IDayConfig {
  answer1Text: (answer: string | JSX.Element, inputKey?: string) => JSX.Element
  answer2Text: (answer: string | JSX.Element, inputKey?: string) => JSX.Element
  buttons: IButton[]
  day: number
  INPUT: {
    [key:string]: string
  }
  renderDay: (
    dayConfig: IDayConfig,
    input: string,
    answer1: false | string | JSX.Element,
    answer2: false | string | JSX.Element
  ) => JSX.Element
  title: string
}

export interface IYearConfig {
  year: number
  days: IDayConfig[]
}

export const defaultRenderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => (
  <div className="render-box">
    <h3>Input:</h3>
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
      Day7__2018__Config,
      Day8__2018__Config,
      Day9__2018__Config,
      Day10__2018__Config,
      Day11__2018__Config,
      Day12__2018__Config,
      Day13__2018__Config,
      Day14__2018__Config,
      Day15__2018__Config,
      Day16__2018__Config,
      Day17__2018__Config
    ]
  }
]