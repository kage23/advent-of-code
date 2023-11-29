import { solveCaptcha1, solveCaptcha2 } from './day01'
import { divideRowNumbers, getChecksum } from './day02'
import { calculateDistance, findLargeValue } from './day03'
import { passphrasesNoAnagrams, passphrasesNoRepetition } from './day04'
import { stepToEnd1, stepToEnd2 } from './day05'
import { findLoop } from './day06'
import { balanceTower, findBottomProgram } from './day07'
import { runProcess } from './day08'
import { processStream } from './day09'

describe('2016 Answers', () => {
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
})
