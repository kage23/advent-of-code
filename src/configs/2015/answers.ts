import { findBasement, followInstructions } from './day01'
import { calculateWrappingPaper, calculateRibbon } from './day02'
import { deliverPresents, deliverPresentsWithRoboSanta } from './day03'
import { lookForHash, lookForBetterHash } from './day04'
import { areStringsNice, areStringsNice__v2 } from './day05'
import { followLightingInstructions, findTotalBrightness } from './day06'
import { constructTheCircuit } from './day07'
import { examineStringConversions, examineStringEncodings } from './day08'
import { findPaths } from './day09'
import { doHowManyLookAndSays } from './day10'
import { findNextViablePassword, findNEXTNextViablePassword } from './day11'

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
    console.log(
      `Day 03, Part 2: ${deliverPresentsWithRoboSanta('REAL').answer2}`
    )
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

  it('Day 07', () => {
    console.log(`Day 07, Part 1: ${constructTheCircuit('REAL', 1).answer1}`)
    console.log(`Day 07, Part 2: ${constructTheCircuit('REAL', 2).answer2}`)
  })

  it('Day 08', () => {
    console.log(`Day 08, Part 1: ${examineStringConversions('REAL').answer1}`)
    console.log(`Day 08, Part 2: ${examineStringEncodings('REAL').answer2}`)
  })

  it('Day 09', () => {
    const result = findPaths('REAL')
    console.log(`Day 09, Part 1: ${result.answer1}`)
    console.log(`Day 09, Part 2: ${result.answer2}`)
  })

  it('Day 10', () => {
    console.log(`Day 10, Part 1: ${doHowManyLookAndSays('REAL', 40).answer1}`)
    console.log(`Day 10, Part 2: ${doHowManyLookAndSays('REAL', 50).answer2}`)
  })

  it('Day 11', () => {
    console.log(`Day 11, Part 1: ${findNextViablePassword('REAL').answer1}`)
    console.log(`Day 11, Part 2: ${findNEXTNextViablePassword('REAL').answer2}`)
  })
})
