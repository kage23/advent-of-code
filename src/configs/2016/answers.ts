import { findEndOfPath, findFirstRepeatLocation } from './day01'
import {
  findBathroomCodePhonepadNumbers,
  findBathroomCodeRealButtons,
} from './day02'
import { evaluateTriangles, evaluateTrianglesVertically } from './day03'
import { printDecryptedRoomNames, sumRealRooms } from './day04'
import { findBetterPassword, findPassword } from './day05'
import { findHighestCountMessage, findLowestCountMessage } from './day06'
import { checkIPsForSSLSupport, checkIPsForTLSSupport } from './day07'
import { swipeCard } from './day08'
import { decompressSequence, getDecompressedLength } from './day09'
import { runBots } from './day10'

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

  it('Day 05', () => {
    console.log(`Day 05, Part 1: ${findPassword('REAL').answer1}`)
    console.log(`Day 05, Part 2: ${findBetterPassword('REAL').answer2}`)
  })

  it('Day 06', () => {
    console.log(`Day 06, Part 1: ${findHighestCountMessage('REAL').answer1}`)
    console.log(`Day 06, Part 2: ${findLowestCountMessage('REAL').answer2}`)
  })

  it('Day 07', () => {
    console.log(`Day 07, Part 1: ${checkIPsForTLSSupport('REAL').answer1}`)
    console.log(`Day 07, Part 2: ${checkIPsForSSLSupport('REAL').answer2}`)
  })

  it('Day 08', () => {
    const result = swipeCard('REAL')
    console.log(`Day 08, Part 1: ${result.answer1}`)
    console.log(`Day 08, Part 2: ${JSON.stringify(result.specialRender)}`)
  })

  it('Day 09', () => {
    console.log(`Day 09, Part 1: ${decompressSequence('REAL').answer1}`)
    console.log(`Day 09, Part 2: ${getDecompressedLength('REAL').answer2}`)
  })

  it('Day 10', () => {
    const result = runBots('REAL')
    console.log(`Day 10, Part 1: ${result.answer1}`)
    console.log(`Day 10, Part 2: ${result.answer2}`)
  })
})
