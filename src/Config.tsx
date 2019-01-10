import React from 'react'

import Day1__2018__Config from './2018/Day1'
import Day2__2018__Config from './2018/Day2'

export interface IButton {
  label: string
  onClick: (input: string) => {
    answer1?: string
    answer2?: string
  }
}

export interface IDayConfig {
  answer1Text: (input: string) => JSX.Element
  answer2Text: (input: string) => JSX.Element
  buttons: IButton[]
  day: number
  INPUT: {
    [key:string]: string
  }
  renderDay: (input: string) => JSX.Element
  title: string
}

export interface IYearConfig {
  year: number
  days: IDayConfig[]
}

export const defaultRenderDay = (input: string): JSX.Element => (
  <div>
    <p>Input:</p>
    <pre>{input}</pre>
  </div>
)

export const YEARS: IYearConfig[] = [
  {
    year: 2018,
    days: [
      Day1__2018__Config,
      Day2__2018__Config
    ]
  }
]