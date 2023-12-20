import inputs from '../../inputs/2019/day08'
import { getPart1Checksum } from './day08'

describe('2019 Day 08', () => {
  describe('Part 1', () => {
    it('should find the checksum', () => {
      expect(getPart1Checksum(inputs.get('DEMO_1')!, 2, 3).answer1).toEqual(1)
    })
  })
  // Can't easily unit test this, I guess
  xdescribe('Part 2', () => {
    it('should decode the image', () => {})
  })
})
