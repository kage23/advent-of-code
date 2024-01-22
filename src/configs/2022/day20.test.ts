import inputs from '../../inputs/2022/day20'
import { mixIt, decryptIt } from './day20'

describe('2022 Day 20', () => {
  describe('Part 1', () => {
    it('should mix the file', () => {
      expect(mixIt(inputs.get('DEMO')!).answer1).toEqual(3)
    })
  })
  describe('Part 2', () => {
    it('should decrypt the file', () => {
      expect(decryptIt(inputs.get('DEMO')!).answer2).toEqual(1623178306)
    })
  })
})
