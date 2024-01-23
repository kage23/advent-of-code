import inputs from '../../inputs/2022/day05'
import { runTheStacks, runTheStacks9001 } from './day05'

describe('2022 Day 05', () => {
  describe('Part 1', () => {
    it('should find the top crate', () => {
      expect(runTheStacks(inputs.get('DEMO')!).answer1).toEqual('CMZ')
    })
  })
  describe('Part 2', () => {
    it('should find the new top crate', () => {
      expect(runTheStacks9001(inputs.get('DEMO')!).answer2).toEqual('MCD')
    })
  })
})
