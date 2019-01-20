import React from 'react'

import { IYearConfig } from '../Config'

import coverImage from './cover.png'

// import Day1__2018__Config from './Day1'

const CONFIG_2017: IYearConfig = {
  year: 2017,
  cover: coverImage,
  extraText: (
    <span>
      I'm still working on 2017!
    </span>
  ),
  days: [
    // Day1__2018__Config,
  ]
}

export default CONFIG_2017