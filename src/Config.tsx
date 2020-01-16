import React from 'react'

import CONFIG_2017 from './2017/Config'
import CONFIG_2018 from './2018/Config'
import CONFIG_2019 from './2019/Config'

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
  cover: string
  extraText?: JSX.Element | string
  days: IDayConfig[]
}

export const defaultRenderDay = (dayConfig: IDayConfig, inputKey: string): JSX.Element => (
  <div className="render-box">
    <h3>Input:</h3>
    <pre>{dayConfig.INPUT[inputKey]}</pre>
  </div>
)

export const YEARS: IYearConfig[] = [
  CONFIG_2017,
  CONFIG_2018,
  CONFIG_2019
]