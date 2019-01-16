import React from 'react'

import CONFIG_2018 from './2018/Config'

// TODO: Import the Year config instead of each Day config
// TODO: Add a cover image to the IYearConfig to display on the home page when year but not day is selected (part of year config) - also a text/JSX.Element
// TODO: Clicking on the header title link whatever should reset day and year to 0

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
    answer2: false | string | JSX.Element,
    setOther: (other: any) => void
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
  CONFIG_2018
]