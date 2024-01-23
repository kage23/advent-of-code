import inputs from '../../inputs/2022/day25'
import { getSnafuNumber } from './day25'

describe('2022 Day 25', () => {
  describe('Part 1', () => {
    it('should get the SNAFU number', () => {
      expect(getSnafuNumber(inputs.get('DEMO')!).answer1).toEqual('2=-1=0')
    })
  })
})
