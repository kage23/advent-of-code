import inputs from '../../inputs/2020/day07'
import { analyzeRules, countTheChildBags } from './day07'

describe('2020 Day 07', () => {
  describe('Part 1', () => {
    it('should analyze the bag rules', () => {
      expect(analyzeRules(inputs.get('DEMO_1')!).answer1).toEqual(4)
    })
  })
  describe('Part 2', () => {
    it('should count child bags', () => {
      expect(countTheChildBags(inputs.get('DEMO_1')!).answer2).toEqual(32)
      expect(countTheChildBags(inputs.get('DEMO_2')!).answer2).toEqual(126)
    })
  })
})
