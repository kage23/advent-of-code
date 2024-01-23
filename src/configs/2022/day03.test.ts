import inputs from '../../inputs/2022/day03'
import { analyzeRucksackContents, analyzeElfGroupBadgePriorities } from './day03'

describe('2022 Day 03', () => {
  describe('Part 1', () => {
    it('should get item-type priorities', () => {
      expect(analyzeRucksackContents(inputs.get('DEMO')!).answer1).toEqual(157)
    })
  })
  describe('Part 2', () => {
    it('should get elf-group priorities', () => {
      expect(analyzeElfGroupBadgePriorities(inputs.get('DEMO')!).answer2).toEqual(70)
    })
  })
})
