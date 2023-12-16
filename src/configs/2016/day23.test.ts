import inputs from '../../inputs/2016/day23'
import { runPart1, runPart2 } from './day23'

describe('2016 Day 23', () => {
  describe('Part 1', () => {
    it('should find the value in register A', () => {
      expect(runPart1(inputs.get('DEMO')!).answer1).toEqual(3)
    })
  })

  describe('Part 2', () => {
    it('should find the value in register A', () => {
      expect(runPart2(inputs.get('DEMO')!).answer2).toEqual(3)
    })
  })
})
