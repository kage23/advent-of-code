import inputs from '../../inputs/2023/day21'
import { countSteps } from './day21'

describe('2023 Day 21', () => {
  describe('Part 1', () => {
    it('should count how many garden squares are accessible within a certain step count', () => {
      expect(countSteps(inputs.get('DEMO')!, 6).answer1).toEqual(16)
    })
  })
  // My Part 2 code doesn't actually work on any of the demo inputs, just the real input
  xdescribe('Part 2', () => {
    it('should ', () => {
      //
    })
  })
})
