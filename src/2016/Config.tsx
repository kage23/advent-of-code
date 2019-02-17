import React from 'react'

import { IYearConfig } from '../Config'

import coverImage from './cover.png'

import Day1 from './Day1'
import Day2 from './Day2'
import Day3 from './Day3'
import Day4 from './Day4'
import Day5 from './Day5'
import Day6 from './Day6'
import Day7 from './Day7'
import Day8 from './Day8'
import Day9 from './Day9'
import Day10 from './Day10'

const CONFIG: IYearConfig = {
  year: 2016,
  cover: coverImage,
  extraText: (
    <span>
      I'm still working on 2016!
    </span>
  ),
  days: [
    Day1,
    Day2,
    Day3,
    Day4,
    Day5,
    Day6,
    Day7,
    Day8,
    Day9,
    Day10
  ]
}

export default CONFIG