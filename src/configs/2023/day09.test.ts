import inputs from '../../inputs/2023/day09'
import { getNextValues, getPreviousValues } from './day09'

describe('2023 Day 09', () => {
  describe('Part 1', () => {
    it('should sum the next values of the sequences', () => {
      expect(getNextValues(inputs.get('DEMO_1')!).answer1).toEqual(114)
    })
  })
  describe('Part 2', () => {
    it('should sum the previous values of the sequences', () => {
      expect(getPreviousValues(inputs.get('DEMO_1')!).answer2).toEqual(2)
    })
  })
})
