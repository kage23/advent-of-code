import { runBots } from './day10'

describe('2016 Day 10', () => {
  describe('Parts 1 & 2', () => {
    describe('runBots', () => {
      it('should run the bots correctly', () => {
        const result = runBots('DEMO_1')
        expect(result.answer1).toEqual(2)
        expect(result.answer2).toEqual(30)
      })
    })
  })
})
