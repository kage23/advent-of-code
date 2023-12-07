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
  it('Day 05', () => {
    console.log(`Day 05, Part 1: ${part1('REAL').answer1}`)
    console.log(`Day 05, Part 2: ${part2('REAL')!.answer2}`)
  })
  it('Day 06', () => {
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
})
