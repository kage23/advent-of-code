import { scramblePassword, unscramblePassword } from './day21'

describe('2016 Day 21', () => {
  describe('Part 1', () => {
    describe('scramblePassword', () => {
      it('should scramble the password', () => {
        expect(scramblePassword('DEMO_1').answer1).toEqual('decab')
      })
    })
  })

  describe('Part 2', () => {
    describe('unscramblePassword', () => {
      it('should unscramble the password', () => {
        expect(unscramblePassword('DEMO_1').answer2).toEqual('abcde')
      })
    })
  })
})
