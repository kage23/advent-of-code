import inputs from '../../inputs/2019/day04'
import { findPossibleNewPasswords, findPossiblePasswords } from './day04'

describe('2019 Day 04', () => {
  describe('Part 1', () => {
    it('should find the possible passwords', () => {
      expect(findPossiblePasswords(inputs.get('DEMO_1')!).answer1).toEqual(1)
      expect(findPossiblePasswords(inputs.get('DEMO_2')!).answer1).toEqual(0)
      expect(findPossiblePasswords(inputs.get('DEMO_3')!).answer1).toEqual(0)
    })
  })
  describe('Part 2', () => {
    it('should find the possible new passwords', () => {
      expect(findPossibleNewPasswords(inputs.get('DEMO_4')!).answer2).toEqual(1)
      expect(findPossibleNewPasswords(inputs.get('DEMO_5')!).answer2).toEqual(0)
      expect(findPossibleNewPasswords(inputs.get('DEMO_6')!).answer2).toEqual(1)
    })
  })
})
