import inputs from '../../inputs/2019/day24'
import { advanceTo200, advanceUntilRepeat, reset, reset2 } from './day24'

describe('2019 Day 24', () => {
  describe('Part 1', () => {
    it('should find the biodiversity of the area', () => {
      expect(
        (() => {
          reset(inputs.get('DEMO')!)
          return advanceUntilRepeat()
        })().answer1
      ).toEqual(2129920)
    })
  })
  describe('Part 2', () => {
    it('should count how many bugs there are after so many minutes', () => {
      expect(
        (() => {
          reset2(inputs.get('DEMO')!)
          return advanceTo200('', 10)
        })().answer2
      ).toEqual(99)
    })
  })
})
