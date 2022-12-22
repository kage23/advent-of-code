import inputs from '../../inputs/2015/day23'
import { runCode } from './day23'

describe('2015 Day 23', () => {
  describe('runCode', () => {
    it('should run the code provided', () => {
      expect(
        runCode({ a: 0, b: 0 }, inputs.get('DEMO_1')!.split('\n')).a
      ).toEqual(2)
    })
  })
})
