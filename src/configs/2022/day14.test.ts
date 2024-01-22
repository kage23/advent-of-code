import inputs from '../../inputs/2022/day14'
import { flowTheSand, flowSandWithFloor } from './day14'

describe('2022 Day 14', () => {
  describe('Part 1', () => {
    it('should count settled grains', () => {
      expect(flowTheSand(inputs.get('DEMO')!).answer1).toEqual(24)
    })
  })
  describe('Part 2', () => {
    it('should count settled grains if we have a floor', () => {
      expect(flowSandWithFloor(inputs.get('DEMO')!).answer2).toEqual(93)
    })
  })
})
