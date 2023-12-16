import inputs from '../../inputs/2016/day10'
import { runBots } from './day10'

describe('2016 Day 10', () => {
  describe('Parts 1 & 2', () => {
    describe('runBots', () => {
      it('should run the bots correctly', () => {
        const result = runBots(inputs.get('DEMO_1')!, [2, 5])
        expect(result.answer1).toEqual(2)
        expect(result.answer2).toEqual(30)
      })
    })
  })
})
