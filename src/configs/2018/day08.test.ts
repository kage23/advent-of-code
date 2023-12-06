import { getChecksum, getRootNodeValue } from './day08'

describe('2018 Day 08', () => {
  describe('Part 1', () => {
    it('should calculate the checksum', () => {
      expect(getChecksum('DEMO')!.answer1).toEqual(138)
    })
  })
  describe('Part 2', () => {
    it('should determine the root node value', () => {
      expect(getRootNodeValue('DEMO')!.answer2).toEqual(66)
    })
  })
})
