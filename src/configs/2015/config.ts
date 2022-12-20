import { YearConfig } from '../../routes/Year'
import cover from './cover.png'
import day01 from './day01'
import day02 from './day02'
import day03 from './day03'
import day04 from './day04'
import day05 from './day05'
import day06 from './day06'
import day07 from './day07'
import day08 from './day08'
import day09 from './day09'
import day10 from './day10'
import day11 from './day11'
import day12 from './day12'
import day13 from './day13'

const year2015: YearConfig = {
  cover,
  days: new Map([
    [1, day01],
    [2, day02],
    [3, day03],
    [4, day04],
    [5, day05],
    [6, day06],
    [7, day07],
    [8, day08],
    [9, day09],
    [10, day10],
    [11, day11],
    [12, day12],
    [13, day13],
  ]),
  extraText: 'Go do it yourself to see the snow and sleigh animated!!',
  id: 2015,
}

export default year2015
