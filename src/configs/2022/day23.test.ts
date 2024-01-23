import inputs from '../../inputs/2022/day23'
import { positionTheElves } from './day23'

describe('2022 Day 23', () => {
  describe('Part 1', () => {
    it('should count empty space after ten rounds', () => {
      expect(positionTheElves(inputs.get('DEMO_1')!, 1)).toEqual(110)
    })
  })
  describe('Part 2', () => {
    it('should get the first round where no elf moves', () => {
      expect(positionTheElves(inputs.get('DEMO_1')!, 2)).toEqual(20)
    })
  })
})
