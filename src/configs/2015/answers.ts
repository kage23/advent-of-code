import { findBasement, followInstructions } from './day01'
import { calculateWrappingPaper, calculateRibbon } from './day02'
import { deliverPresents, deliverPresentsWithRoboSanta } from './day03'
import { lookForHash, lookForBetterHash } from './day04'
import { areStringsNice, areStringsNice__v2 } from './day05'
import { followLightingInstructions, findTotalBrightness } from './day06'

describe('2015 Answers', () => {
  it('Day 01', () => {
    console.log(`Day 01, Part 1: ${followInstructions('REAL').answer1}`)
    console.log(`Day 01, Part 2: ${findBasement('REAL').answer2}`)
  })

  it('Day 02', () => {
    console.log(`Day 02, Part 1: ${calculateWrappingPaper('REAL').answer1}`)
    console.log(`Day 02, Part 2: ${calculateRibbon('REAL').answer2}`)
  })

  it('Day 03', () => {
    console.log(`Day 03, Part 1: ${deliverPresents('REAL').answer1}`)
    console.log(`Day 03, Part 2: ${deliverPresentsWithRoboSanta('REAL').answer2}`)
  })

  it('Day 04', () => {
    console.log(`Day 04, Part 1: ${lookForHash('REAL').answer1}`)
    console.log(`Day 04, Part 2: ${lookForBetterHash('REAL').answer2}`)
  })

  it('Day 05', () => {
    console.log(`Day 05, Part 1: ${areStringsNice('REAL').answer1}`)
    console.log(`Day 05, Part 2: ${areStringsNice__v2('REAL').answer2}`)
  })

  it('Day 06', () => {
    console.log(`Day 06, Part 1: ${followLightingInstructions('REAL').answer1}`)
    console.log(`Day 06, Part 2: ${findTotalBrightness('REAL').answer2}`)
  })
})
