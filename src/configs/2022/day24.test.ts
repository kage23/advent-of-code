import inputs from '../../inputs/2022/day24'
import { avoidBlizzards, getSnacks } from './day24'

describe('2022 Day 24', () => {
  describe('Part 1', () => {
    it('should figure out how long to reach the exit', () => {
      expect(avoidBlizzards(inputs.get('DEMO_2')!).answer1).toEqual(18)
    })
  })
  describe('Part 2', () => {
    it('should figure out how long to get to the exit with snacks', () => {
      expect(getSnacks(inputs.get('DEMO_2')!).answer2).toEqual(54)
    })
  })
})
