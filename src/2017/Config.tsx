import React from 'react'

import { IYearConfig } from '../Config'

import coverImage from './cover.png'

import Day1 from './Day1'

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
  ]
}

export default CONFIG_2017