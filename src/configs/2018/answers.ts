import { findFrequency, findRepeatedFrequency } from './day01'

describe('2018 Answers', () => {
  it('Day 01', () => {
    console.log(`Day 01, Part 1: ${findFrequency('REAL').answer1}`)
    console.log(`Day 01, Part 2: ${findRepeatedFrequency('REAL').answer2}`)
  })
})
