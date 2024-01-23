import inputs from '../../inputs/2023/day15'
import { hashIt, initializeIt } from './day15'

describe('2023 Day 15', () => {
  describe('Part 1', () => {
    it('should sum the hashes of comma-separated stuff', () => {
      expect(hashIt(inputs.get('DEMO_1')!).answer1).toEqual(52)
      expect(hashIt(inputs.get('DEMO_2')!).answer1).toEqual(1320)
    })
  })
  describe('Part 2', () => {
    it('should find the focusing power after initializing', () => {
      expect(initializeIt(inputs.get('DEMO_2')!).answer2).toEqual(145)
    })
  })
})
