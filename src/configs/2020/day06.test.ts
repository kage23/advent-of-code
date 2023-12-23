import inputs from '../../inputs/2020/day06'
import { checkAllGroupInputs, properlyCheckAllGroupInputs } from './day06'

describe('2020 Day 06', () => {
  describe('Part 1', () => {
    it('should check all group inputs', () => {
      expect(checkAllGroupInputs(inputs.get('DEMO_1')!).answer1).toEqual(6)
      expect(checkAllGroupInputs(inputs.get('DEMO_2')!).answer1).toEqual(11)
    })
  })
  describe('Part 2', () => {
    it('should properly check all group inputs', () => {
      expect(
        properlyCheckAllGroupInputs(inputs.get('DEMO_2')!).answer2
      ).toEqual(6)
    })
  })
})
