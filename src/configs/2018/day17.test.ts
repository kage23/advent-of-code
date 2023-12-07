import { flowWater } from './day17'

describe('2018 Day 17', () => {
  describe('Part 1', () => {
    it('should count how many tiles the water will reach', () => {
      expect(flowWater('DEMO')!.answer1).toEqual(57)
    })
  })
  describe('Part 2', () => {
    it('should count how much of that water is settled', () => {
      expect(flowWater('DEMO')!.answer2).toEqual(29)
    })
  })
})
