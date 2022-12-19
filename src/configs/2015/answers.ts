import { findBasement, followInstructions } from './day01'
import { calculateWrappingPaper, calculateRibbon } from './day02'
import { deliverPresents, deliverPresentsWithRoboSanta } from './day03'
import { lookForHash, lookForBetterHash } from './day04'
import { areStringsNice, areStringsNice__v2 } from './day05'

it('2015 Answers', () => {
  console.log(`Day 01, Part 1: ${followInstructions('REAL').answer1}`)
  console.log(`Day 01, Part 2: ${findBasement('REAL').answer2}`)

  console.log(`Day 02, Part 1: ${calculateWrappingPaper('REAL').answer1}`)
  console.log(`Day 02, Part 2: ${calculateRibbon('REAL').answer2}`)

  console.log(`Day 03, Part 1: ${deliverPresents('REAL').answer1}`)
  console.log(`Day 03, Part 2: ${deliverPresentsWithRoboSanta('REAL').answer2}`)

  console.log(`Day 04, Part 1: ${lookForHash('REAL').answer1}`)
  console.log(`Day 04, Part 2: ${lookForBetterHash('REAL').answer2}`)

  console.log(`Day 05, Part 1: ${areStringsNice('REAL').answer1}`)
  console.log(`Day 05, Part 2: ${areStringsNice__v2('REAL').answer2}`)
})
