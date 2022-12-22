import { findEndOfPath, findFirstRepeatLocation } from './day01'

describe('2016 Answers', () => {
  it('Day 01', () => {
    console.log(`Day 01, Part 1: ${findEndOfPath('REAL').answer1}`)
    console.log(`Day 01, Part 2: ${findFirstRepeatLocation('REAL').answer2}`)
  })
})
