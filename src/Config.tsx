import React from 'react'

import Input__Day1__2018 from './2018/day1/Input'

export interface IDayConfig {
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

const defaultRenderDay = (input: string): JSX.Element => (
  <div>
    <p>Input:</p>
    <pre>{input}</pre>
  </div>
)

export const YEARS: IYearConfig[] = [
  {
    year: 2018,
    days: [
      {
        day: 1,
        INPUT: Input__Day1__2018,
        renderDay: defaultRenderDay,
        title: 'Chronal Calibration'
      }
    ]
  }
]