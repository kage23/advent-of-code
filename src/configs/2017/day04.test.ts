import inputs from '../../inputs/2017/day04'
import { passphrasesNoRepetition, passphrasesNoAnagrams } from './day04'

describe('2017 Day 04', () => {
  describe('Part 1', () => {
    it('should count valid passphrases (no repeated words)', () => {
      expect(passphrasesNoRepetition(inputs.get('DEMO_1')!).answer1).toEqual(2)
    })
  })
  describe('Part 2', () => {
    it('should count valid passphrases (no anagrams)', () => {
      expect(passphrasesNoAnagrams(inputs.get('DEMO_2')!).answer2).toEqual(3)
    })
  })
})
