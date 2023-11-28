import { getChecksum, divideRowNumbers } from './day02'

describe('2017 Day 01', () => {
  describe('Part 1', () => {
    it('should get the checksum', () => {
      expect(getChecksum('DEMO_1').answer1).toEqual(18)
    })
  })
  describe('Part 2', () => {
    it('should sum the row results', () => {
      expect(divideRowNumbers('DEMO_2').answer2).toEqual(9)
    })
  })
})
