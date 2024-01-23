import inputs from '../../inputs/2017/day02'
import { getChecksum, divideRowNumbers } from './day02'

describe('2017 Day 02', () => {
  describe('Part 1', () => {
    it('should get the checksum', () => {
      expect(getChecksum(inputs.get('DEMO_1')!).answer1).toEqual(18)
    })
  })
  describe('Part 2', () => {
    it('should sum the row results', () => {
      expect(divideRowNumbers(inputs.get('DEMO_2')!).answer2).toEqual(9)
    })
  })
})
