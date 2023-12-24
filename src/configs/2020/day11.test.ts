import inputs from '../../inputs/2020/day11'
import { simulateSeating, actuallySimulateSeating } from './day11'

describe('2020 Day 11', () => {
  describe('Part 1', () => {
    it('should count how many seats are occupied at the end', () => {
      expect(simulateSeating(inputs.get('DEMO')!).answer1).toEqual(37)
    })
  })
  describe('Part 2', () => {
    it('should count how many seats are actually occupied at the end', () => {
      expect(actuallySimulateSeating(inputs.get('DEMO')!).answer2).toEqual(26)
    })
  })
})
