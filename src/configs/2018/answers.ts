import { findFrequency, findRepeatedFrequency } from './day01'
import { findChecksum, findCommonLetters } from './day02'
import { determineClaimOverlap, determineFabricOverlap } from './day03'
import { strategy1, strategy2 } from './day04'
import { part1, part2 } from './day05'
import { findAreaClosestToMost, findLargestNonInfinite } from './day06'
import { calculateStepOrder, useWorkers } from './day07'
import { getChecksum, getRootNodeValue } from './day08'
import { playGame } from './day09'
import { alignTheStars } from './day10'
import { findBestGrid, findBestVariableSizeGrid } from './day11'
import { advance50Billion, advance20Generations } from './day12'
import { findCollision, goToEnd } from './day13'
import { findGoodRecipes, findTargetRecipe } from './day14'
import { doTheCombat, findBestElfPower } from './day15'
import { runTheInputCode, threeOrMoreTest } from './day16'
import { flowWater } from './day17'
import { advanceTenMinutes, skipToMinuteOneBillion } from './day18'
import { runUntilDone } from './day19'

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
  it('Day 04', () => {
    console.log(`Day 04, Part 1: ${strategy1('REAL').answer1}`)
    console.log(`Day 04, Part 2: ${strategy2('REAL')!.answer2}`)
  })
  xit('Day 05', () => {
    console.log(`Day 05, Part 1: ${part1('REAL').answer1}`)
    console.log(`Day 05, Part 2: ${part2('REAL')!.answer2}`)
  })
  xit('Day 06', () => {
    console.log(`Day 06, Part 1: ${findLargestNonInfinite('REAL').answer1}`)
    console.log(`Day 06, Part 2: ${findAreaClosestToMost('REAL')!.answer2}`)
  })
  it('Day 07', () => {
    console.log(`Day 07, Part 1: ${calculateStepOrder('REAL').answer1}`)
    console.log(`Day 07, Part 2: ${useWorkers('REAL')!.answer2}`)
  })
  it('Day 08', () => {
    console.log(`Day 08, Part 1: ${getChecksum('REAL').answer1}`)
    console.log(`Day 08, Part 2: ${getRootNodeValue('REAL')!.answer2}`)
  })
  xit('Day 09', () => {
    console.log(`Day 09, Part 1: ${playGame('REAL', 1).answer1}`)
    console.log(`Day 09, Part 2: ${playGame('REAL', 2).answer2}`)
  })
  xit('Day 10', () => {
    console.log(`Day 10, Part 1:\n${alignTheStars('REAL').answer1}`)
    console.log(`Day 10, Part 2: ${alignTheStars('REAL').answer2}`)
  })
  xit('Day 11', () => {
    console.log(`Day 11, Part 1: ${findBestGrid('REAL').answer1}`)
    console.log(`Day 11, Part 2: ${findBestVariableSizeGrid('REAL').answer2}`)
  })
  it('Day 12', () => {
    console.log(`Day 12, Part 1: ${advance20Generations('REAL').answer1}`)
    console.log(`Day 12, Part 2: ${advance50Billion('REAL').answer2}`)
  })
  it('Day 13', () => {
    console.log(`Day 13, Part 1: ${findCollision('REAL').answer1}`)
    console.log(`Day 13, Part 2: ${goToEnd('REAL').answer2}`)
  })
  xit('Day 14', () => {
    console.log(`Day 14, Part 1: ${findGoodRecipes('REAL').answer1}`)
    console.log(`Day 14, Part 2: ${findTargetRecipe('REAL').answer2}`)
  })
  it('Day 15', () => {
    console.log(`Day 15, Part 1: ${doTheCombat('REAL').answer1}`)
    console.log(`Day 15, Part 2: ${findBestElfPower('REAL').answer2}`)
  })
  it('Day 16', () => {
    console.log(`Day 16, Part 1: ${threeOrMoreTest('REAL').answer1}`)
    console.log(`Day 16, Part 2: ${runTheInputCode('REAL').answer2}`)
  })
  it('Day 17', () => {
    console.log(`Day 17, Part 1: ${flowWater('REAL').answer1}`)
    console.log(`Day 17, Part 2: ${flowWater('REAL').answer2}`)
  })
  it('Day 18', () => {
    console.log(`Day 18, Part 1: ${advanceTenMinutes('REAL').answer1}`)
    console.log(`Day 18, Part 2: ${skipToMinuteOneBillion('REAL').answer2}`)
  })
  // Don't run this; it'll take a long time and part 2 isn't a one-click / one-function thing anyway
  xit('Day 19', () => {
    console.log(`Day 19, Part 1: ${runUntilDone('REAL').answer1}`)
    // console.log(`Day 18, Part 2: ${skipToMinuteOneBillion('REAL').answer2}`)
  })
})
