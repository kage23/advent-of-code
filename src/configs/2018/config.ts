import { YearConfig } from '../../routes/Year'
import cover from './cover.png'
import day01 from './day01'
import day02 from './day02'
import day03 from './day03'
import day04 from './day04'
// import day05 from './day05'
// import day06 from './day06'
// import day07 from './day07'
// import day08 from './day08'
// import day09 from './day09'
// import day10 from './day10'
// import day11 from './day11'
// import day12 from './day12'
// import day13 from './day13'
// import day14 from './day14'
// import day15 from './day15'
// import day16 from './day16'
// import day17 from './day17'
// import day18 from './day18'
// import day19 from './day19'
// import day20 from './day20'
// import day21 from './day21'
// import day22 from './day22'
// import day23 from './day23'
// import day24 from './day24'
// import day25 from './day25'

const year2018: YearConfig = {
  cover,
  days: new Map([
    [1, day01],
    [2, day02],
    [3, day03],
    [4, day04],
    // [5, day05],
    // [6, day06],
    // [7, day07],
    // [8, day08],
    // [9, day09],
    // [10, day10],
    // [11, day11],
    // [12, day12],
    // [13, day13],
    // [14, day14],
    // [15, day15],
    // [16, day16],
    // [17, day17],
    // [18, day18],
    // [19, day19],
    // [20, day20],
    // [21, day21],
    // [22, day22],
    // [23, day23],
    // [24, day24],
    // [25, day25],
  ]),
  extraText:
    'On the Advent of Code site, this image is actually animated! But if you want to see the animation, ' +
    `you'll have to go complete the challenges yourself!`,
  id: 2018,
}

export default year2018
