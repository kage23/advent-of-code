import React from 'react'

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
    days: []
  }
]