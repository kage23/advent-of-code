import React from 'react'

import { IYearConfig } from '../Config'

import coverImage from './cover.png'

import Day01 from './Day01'
import Day02 from './Day02'
import Day03 from './Day03'
import Day04 from './Day04'
import Day05 from './Day05'
import Day06 from './Day06'
import Day07 from './Day07'
import Day08 from './Day08'
import Day09 from './Day09'
import Day10 from './Day10'
import Day11 from './Day11'
import Day12 from './Day12'
import Day13 from './Day13'
import Day14 from './Day14'
import Day15 from './Day15'
import Day16 from './Day16'
import Day17 from './Day17'
import Day18 from './Day18'
import Day19 from './Day19'
import Day20 from './Day20'
import Day21 from './Day21'
import Day22 from './Day22'
import Day23 from './Day23'
import Day24 from './Day24'
import Day25 from './Day25'

const CONFIG_2017: IYearConfig = {
  year: 2017,
  cover: coverImage,
  extraText: (
    <span>
      Go do it yourself to see the stars glow, the list print, and the other names on the list!{' '}
      The thing changes each time you reload the page!
    </span>
  ),
  days: [
    Day01,
    Day02,
    Day03,
    Day04,
    Day05,
    Day06,
    Day07,
    Day08,
    Day09,
    Day10,
    Day11,
    Day12,
    Day13,
    Day14,
    Day15,
    Day16,
    Day17,
    Day18,
    Day19,
    Day20,
    Day21,
    Day22,
    Day23,
    Day24,
    Day25
  ]
}

export default CONFIG_2017