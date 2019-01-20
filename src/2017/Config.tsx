import React from 'react'

import { IYearConfig } from '../Config'

import coverImage from './cover.png'

import Day1 from './Day1'
import Day2 from './Day2'
import Day3 from './Day3'
import Day4 from './Day4'
import Day5 from './Day5'
import Day6 from './Day6'

const CONFIG_2017: IYearConfig = {
  year: 2017,
  cover: coverImage,
  extraText: (
    <span>
      I'm still working on 2017!
    </span>
  ),
  days: [
    Day1,
    Day2,
    Day3,
    Day4,
    Day5,
    Day6
  ]
}

export default CONFIG_2017