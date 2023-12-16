import inputs from '../../inputs/2017/day25'
import { runProgram } from './day25'

describe('2017 Day 25', () => {
  describe('Part 1', () => {
    it('should find the checksum of the program', () => {
      expect(runProgram(inputs.get('DEMO')!).answer1).toEqual(3)
    })
  })
})
