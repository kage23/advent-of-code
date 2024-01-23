import inputs from '../../inputs/2019/day14'
import { calculateOreCost, buildAsMuchAsPossible } from './day14'

describe('2019 Day 14', () => {
  describe('Part 1', () => {
    it('should calculate the cost in ore of one fuel', () => {
      expect(calculateOreCost(inputs.get('DEMO_1')!).answer1).toEqual(31)
      expect(calculateOreCost(inputs.get('DEMO_2')!).answer1).toEqual(165)
      expect(calculateOreCost(inputs.get('DEMO_3')!).answer1).toEqual(13312)
      expect(calculateOreCost(inputs.get('DEMO_4')!).answer1).toEqual(180697)
      expect(calculateOreCost(inputs.get('DEMO_5')!).answer1).toEqual(2210736)
    })
  })
  describe('Part 2', () => {
    it('should calculate how much fuel you built with a bunch of ore', () => {
      expect(buildAsMuchAsPossible(inputs.get('DEMO_3')!).answer2).toEqual(
        82892753
      )
      expect(buildAsMuchAsPossible(inputs.get('DEMO_4')!).answer2).toEqual(
        5586022
      )
      expect(buildAsMuchAsPossible(inputs.get('DEMO_5')!).answer2).toEqual(
        460664
      )
    })
  })
})
