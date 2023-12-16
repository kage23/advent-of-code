import inputs from '../../inputs/2016/day21'
import { scramblePassword, unscramblePassword } from './day21'

describe('2016 Day 21', () => {
  describe('Part 1', () => {
    describe('scramblePassword', () => {
      it('should scramble the password', () => {
        expect(scramblePassword(inputs.get('DEMO_1')!, 'abcde').answer1).toEqual('decab')
      })
    })
  })

  describe('Part 2', () => {
    describe('unscramblePassword', () => {
      it('should unscramble the password', () => {
        expect(unscramblePassword(inputs.get('DEMO_1')!, 'decab').answer2).toEqual('abcde')
      })
    })
  })
})
