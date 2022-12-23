import { findEndOfPath, findFirstRepeatLocation } from './day01'
import {
  findBathroomCodePhonepadNumbers,
  findBathroomCodeRealButtons,
} from './day02'
import { evaluateTriangles, evaluateTrianglesVertically } from './day03'
import { printDecryptedRoomNames, sumRealRooms } from './day04'

describe('2016 Answers', () => {
  it('Day 01', () => {
    console.log(`Day 01, Part 1: ${findEndOfPath('REAL').answer1}`)
    console.log(`Day 01, Part 2: ${findFirstRepeatLocation('REAL').answer2}`)
  })

  it('Day 02', () => {
    console.log(
      `Day 02, Part 1: ${findBathroomCodePhonepadNumbers('REAL').answer1}`
    )
    console.log(
      `Day 02, Part 2: ${findBathroomCodeRealButtons('REAL').answer2}`
    )
  })

  it('Day 03', () => {
    console.log(`Day 03, Part 1: ${evaluateTriangles('REAL').answer1}`)
    console.log(
      `Day 03, Part 2: ${evaluateTrianglesVertically('REAL').answer2}`
    )
  })

  it('Day 04', () => {
    console.log(`Day 04, Part 1: ${sumRealRooms('REAL').answer1}`)
    console.log(
      `Day 04, Part 2: ${JSON.stringify(
        printDecryptedRoomNames('REAL').specialRender
      )}`
    )
  })
})
