import inputs from '../../inputs/2021/day07'
import { alignCrabs, alignCrabsProperly } from './day07'

describe('2021 Day 07', () => {
  describe('Part 1', () => {
    it('should calculate fuel cost to align the crabs', () => {
      expect(alignCrabs(inputs.get('DEMO')!).answer1).toEqual(37)
    })
  })
  describe('Part 2', () => {
    it('should calculate fuel cost to properly align the crabs', () => {
      expect(alignCrabsProperly(inputs.get('DEMO')!).answer2).toEqual(168)
    })
  })
})
