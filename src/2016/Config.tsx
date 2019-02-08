import React from 'react'

import { IYearConfig } from '../Config'

import coverImage from './cover.png'

import Day1 from './Day1'

const CONFIG: IYearConfig = {
  year: 2016,
  cover: coverImage,
  extraText: (
    <span>
      I'm still working on 2016!
    </span>
  ),
  days: [
    Day1
  ]
}

export default CONFIG