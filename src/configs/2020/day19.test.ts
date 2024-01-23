import inputs from '../../inputs/2020/day19'
import { checkMessages, checkMessagesCorrected } from './day19'

describe('2020 Day 19', () => {
  describe('Part 1', () => {
    it('should check messages for Rule 0', () => {
      expect(checkMessages(inputs.get('DEMO_1')!).answer1).toEqual(2)
      expect(checkMessages(inputs.get('DEMO_2')!).answer1).toEqual(2)
    })
  })
  describe('Part 2', () => {
    it('should correctly check messages for Rule 0', () => {
      expect(checkMessagesCorrected(inputs.get('DEMO_3')!).answer2).toEqual(12)
    })
  })
})
