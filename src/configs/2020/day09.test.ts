import inputs from '../../inputs/2020/day09'
import { findFirstInvalidNumber, findEncryptionWeakness } from './day09'

describe('2020 Day 09', () => {
  describe('Part 1', () => {
    it('should find the first invalid number', () => {
      expect(findFirstInvalidNumber(inputs.get('DEMO')!, 5).answer1).toEqual(
        127
      )
    })
  })
  describe('Part 2', () => {
    it('should calculate the encryption weakness', () => {
      expect(findEncryptionWeakness(inputs.get('DEMO')!, 5).answer2).toEqual(62)
    })
  })
})
