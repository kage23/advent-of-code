import inputs from '../../inputs/2022/day11'
import { chaseMonkeys } from './day11'

describe('2022 Day 11', () => {
  describe('Part 1', () => {
    it('should chase the monkeys for 20 rounds', () => {
      expect(chaseMonkeys(inputs.get('DEMO')!).answer1).toEqual(10605)
    })
  })
  describe('Part 2', () => {
    it('should chase the monkeys for 10,000 rounds', () => {
      expect(chaseMonkeys(inputs.get('DEMO')!, 10000).answer2).toEqual(2713310158)
    })
  })
})
