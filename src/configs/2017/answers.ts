import { solveCaptcha1, solveCaptcha2 } from './day01'
import { divideRowNumbers, getChecksum } from './day02'
import { calculateDistance, findLargeValue } from './day03'
import { passphrasesNoAnagrams, passphrasesNoRepetition } from './day04'
import { stepToEnd1, stepToEnd2 } from './day05'
import { findLoop } from './day06'
import { balanceTower, findBottomProgram } from './day07'
import { runProcess } from './day08'
import { processStream } from './day09'
import { fullTwists, oneTwist } from './day10'
import { findDistance, findFurthestDistance } from './day11'
import { countGroups, findConnectedToZero } from './day12'
import { findDelayFastMethod, takeTrip } from './day13'
import { countUsedSquares, findRegions } from './day14'
import { solvePart1, solvePart2 } from './day15'
import { danceABillion, doDance } from './day16'
import { solvePart1Day17 /* , solvePart2Day17 */ } from './day17'
import { findFrequencyPart1, runBothPrograms } from './day18'
import { followPath } from './day19'

describe('2017 Answers', () => {
  it('Day 01', () => {
    console.log(`Day 01, Part 1: ${solveCaptcha1('REAL').answer1}`)
    console.log(`Day 01, Part 2: ${solveCaptcha2('REAL').answer2}`)
  })
  it('Day 02', () => {
    console.log(`Day 02, Part 1: ${getChecksum('REAL').answer1}`)
    console.log(`Day 02, Part 2: ${divideRowNumbers('REAL').answer2}`)
  })
  it('Day 03', () => {
    console.log(`Day 03, Part 1: ${calculateDistance('REAL').answer1}`)
    console.log(`Day 03, Part 2: ${findLargeValue('REAL').answer2}`)
  })
  it('Day 04', () => {
    console.log(`Day 04, Part 1: ${passphrasesNoRepetition('REAL').answer1}`)
    console.log(`Day 04, Part 2: ${passphrasesNoAnagrams('REAL').answer2}`)
  })
  it('Day 05', () => {
    console.log(`Day 05, Part 1: ${stepToEnd1('REAL').answer1}`)
    console.log(`Day 05, Part 2: ${stepToEnd2('REAL').answer2}`)
  })
  it('Day 06', () => {
    console.log(`Day 06, Part 1: ${findLoop('REAL').answer1}`)
    console.log(`Day 06, Part 2: ${findLoop('REAL').answer2}`)
  })
  it('Day 07', () => {
    console.log(`Day 07, Part 1: ${findBottomProgram('REAL')!.answer1}`)
    console.log(`Day 07, Part 2: ${balanceTower('REAL')!.answer2}`)
  })
  it('Day 08', () => {
    console.log(`Day 08, Part 1: ${runProcess('REAL')!.answer1}`)
    console.log(`Day 08, Part 2: ${runProcess('REAL')!.answer2}`)
  })
  it('Day 09', () => {
    console.log(`Day 09, Part 1: ${processStream('REAL')!.answer1}`)
    console.log(`Day 09, Part 2: ${processStream('REAL')!.answer2}`)
  })
  xit('Day 10', () => {
    console.log(`Day 10, Part 1: ${oneTwist('REAL')!.answer1}`)
    console.log(`Day 10, Part 2: ${fullTwists('REAL')!.answer2}`)
  })
  it('Day 11', () => {
    console.log(`Day 11, Part 1: ${findDistance('REAL')!.answer1}`)
    console.log(`Day 11, Part 2: ${findFurthestDistance('REAL')!.answer2}`)
  })
  it('Day 12', () => {
    console.log(`Day 12, Part 1: ${findConnectedToZero('REAL')!.answer1}`)
    console.log(`Day 12, Part 2: ${countGroups('REAL')!.answer2}`)
  })
  it('Day 13', () => {
    console.log(`Day 13, Part 1: ${takeTrip('REAL')!.answer1}`)
    console.log(`Day 13, Part 2: ${findDelayFastMethod('REAL')!.answer2}`)
  })
  xit('Day 14', () => {
    console.log(`Day 14, Part 1: ${countUsedSquares('REAL')!.answer1}`)
    console.log(`Day 14, Part 2: ${findRegions('REAL')!.answer2}`)
  })
  xit('Day 15', () => {
    console.log(`Day 15, Part 1: ${solvePart1('REAL')!.answer1}`)
    console.log(`Day 15, Part 2: ${solvePart2('REAL')!.answer2}`)
  })
  it('Day 16', () => {
    console.log(`Day 16, Part 1: ${doDance('REAL')!.answer1}`)
    console.log(`Day 16, Part 2: ${danceABillion('REAL')!.answer2}`)
  })
  it('Day 17', () => {
    console.log(`Day 17, Part 1: ${solvePart1Day17('REAL')!.answer1}`)
    // This one exceeds the map size, I'm not sure how I solved it originally!
    // console.log(`Day 17, Part 2: ${solvePart2Day17('REAL')!.answer2}`)
  })
  it('Day 18', () => {
    console.log(`Day 18, Part 1: ${findFrequencyPart1('REAL')!.answer1}`)
    console.log(`Day 18, Part 2: ${runBothPrograms('REAL')!.answer2}`)
  })
  it('Day 19', () => {
    console.log(`Day 19, Part 1: ${followPath('REAL')!.answer1}`)
    console.log(`Day 19, Part 2: ${followPath('REAL')!.answer2}`)
  })
})
