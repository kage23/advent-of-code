import { findFrequency, findRepeatedFrequency } from './day01'
import { findChecksum, findCommonLetters } from './day02'
import { determineClaimOverlap, determineFabricOverlap } from './day03'

describe('2018 Answers', () => {
  it('Day 01', () => {
    console.log(`Day 01, Part 1: ${findFrequency('REAL').answer1}`)
    console.log(`Day 01, Part 2: ${findRepeatedFrequency('REAL').answer2}`)
  })
  it('Day 02', () => {
    console.log(`Day 02, Part 1: ${findChecksum('REAL').answer1}`)
    console.log(`Day 02, Part 2: ${findCommonLetters('REAL')!.answer2}`)
  })
  it('Day 03', () => {
    console.log(`Day 03, Part 1: ${determineFabricOverlap('REAL').answer1}`)
    console.log(`Day 03, Part 2: ${determineClaimOverlap('REAL')!.answer2}`)
  })
})
