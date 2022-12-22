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
import { sumInput, sumInputNoRed } from './day12'
import {
  findOptimalSeatingArrangement,
  findOptimalSeatingArrangementWithYou,
} from './day13'
import { raceReindeer, raceReindeerV2 } from './day14'
import { findBestLowCalRecipe, findBestRecipe } from './day15'
import { determineTheActualSue, determineTheSue } from './day16'
import { determineContainerCombos, determineEfficientContainerCombos } from './day17'
import { runLightAnimation, runLightAnimationWithStuckOnLights } from './day18'
import { calibrateMachine, generateMolecule } from './day19'
import { findThePresentHouse, findThePresentHouseWithLazierElves } from './day20'
import { checkAllEquipmentCombos } from './day21'
import { findBestFightOnHard, findBestFightPart1 } from './day22'
import { runCodePart1, runCodePart2 } from './day23'
import { sortThePackages, sortThePackagesWithTheTrunk } from './day24'
import { getTheDesignatedCode } from './day25'

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

  it('Day 12', () => {
    console.log(`Day 12, Part 1: ${sumInput('REAL').answer1}`)
    console.log(`Day 12, Part 2: ${sumInputNoRed('REAL').answer2}`)
  })

  it('Day 13', () => {
    console.log(
      `Day 13, Part 1: ${findOptimalSeatingArrangement('REAL').answer1}`
    )
    console.log(
      `Day 13, Part 2: ${findOptimalSeatingArrangementWithYou('REAL').answer2}`
    )
  })

  it('Day 14', () => {
    console.log(`Day 14, Part 1: ${raceReindeer('REAL').answer1}`)
    console.log(`Day 14, Part 2: ${raceReindeerV2('REAL').answer2}`)
  })

  it('Day 15', () => {
    console.log(`Day 15, Part 1: ${findBestRecipe('REAL').answer1}`)
    console.log(`Day 15, Part 2: ${findBestLowCalRecipe('REAL').answer2}`)
  })

  it('Day 16', () => {
    console.log(`Day 16, Part 1: ${determineTheSue('REAL')?.answer1}`)
    console.log(`Day 16, Part 2: ${determineTheActualSue('REAL')?.answer2}`)
  })

  it('Day 17', () => {
    console.log(`Day 17, Part 1: ${determineContainerCombos('REAL').answer1}`)
    console.log(`Day 17, Part 2: ${determineEfficientContainerCombos('REAL').answer2}`)
  })

  it('Day 18', () => {
    console.log(`Day 18, Part 1: ${runLightAnimation('REAL').answer1}`)
    console.log(`Day 18, Part 2: ${runLightAnimationWithStuckOnLights('REAL').answer2}`)
  })

  it('Day 19', () => {
    console.log(`Day 19, Part 1: ${calibrateMachine('REAL').answer1}`)
    console.log(`Day 19, Part 2: ${generateMolecule('REAL').answer2}`)
  })

  it('Day 20', () => {
    console.log(`Day 20, Part 1: ${findThePresentHouse('REAL').answer1}`)
    console.log(`Day 20, Part 2: ${findThePresentHouseWithLazierElves('REAL').answer2}`)
  })

  it('Day 21', () => {
    const result = checkAllEquipmentCombos()
    console.log(`Day 21, Parts 1 & 2: ${result.answer1}, ${result.answer2}`)
  })

  it('Day 22', () => {
    console.log(`Day 22, Part 1: ${findBestFightPart1().answer1}`)
    console.log(`Day 22, Part 2: ${findBestFightOnHard().answer2}`)
  })

  it('Day 23', () => {
    console.log(`Day 23, Part 1: ${runCodePart1('REAL').answer1}`)
    console.log(`Day 23, Part 1: ${runCodePart2('REAL').answer2}`)
  })

  it('Day 24', () => {
    console.log(`Day 24, Part 1: ${sortThePackages('REAL').answer1}`)
    console.log(`Day 24, Part 1: ${sortThePackagesWithTheTrunk('REAL').answer2}`)
  })

  it('Day 25', () => {
    console.log(`Day 25: ${getTheDesignatedCode('REAL').answer1}`)
  })
})
