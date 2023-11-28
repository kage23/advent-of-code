import { solveCaptcha1, solveCaptcha2 } from './day01'
import { divideRowNumbers, getChecksum } from './day02'
import { calculateDistance, findLargeValue } from './day03'
import { passphrasesNoAnagrams, passphrasesNoRepetition } from './day04'

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
})
