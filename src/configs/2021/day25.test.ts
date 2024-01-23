import inputs from '../../inputs/2021/day25'
import { watchCucumbers } from './day25'

describe('2021 Day 25', () => {
  describe('Part 1', () => {
    it('should figure out when the cucumbers will stop', () => {
      expect(watchCucumbers(inputs.get('DEMO')!).answer1).toEqual(58)
    })
  })
})
