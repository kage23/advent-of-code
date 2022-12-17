import { YearConfig } from '../../routes/Year'
import cover from './cover.png'
import day01 from './day01'
import day02 from './day02'
import day03 from './day03'
import day04 from './day04'

const year2015: YearConfig = {
  cover,
  days: new Map([
    [1, day01],
    [2, day02],
    [3, day03],
    [4, day04],
  ]),
  extraText: 'Go do it yourself to see the snow and sleigh animated!!',
  id: 2015,
}

export default year2015
