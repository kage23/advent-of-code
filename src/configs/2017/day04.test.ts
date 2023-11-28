import { passphrasesNoRepetition, passphrasesNoAnagrams } from './day04'

describe('2017 Day 04', () => {
  describe('Part 1', () => {
    it('should count valid passphrases (no repeated words)', () => {
      expect(passphrasesNoRepetition('DEMO_1').answer1).toEqual(2)
    })
  })
  describe('Part 2', () => {
    it('should count valid passphrases (no anagrams)', () => {
      expect(passphrasesNoAnagrams('DEMO_2').answer2).toEqual(3)
    })
  })
})
