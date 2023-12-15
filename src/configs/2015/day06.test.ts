import inputs from '../../inputs/2015/day06'
import { followLightingInstructions, findTotalBrightness } from './day06'

describe('2015 Day 06', () => {
  describe('Part 1', () => {
    describe('followLightingInstructions', () => {
      it('should determine how many lights are lit at the end', () => {
        expect(followLightingInstructions(inputs.get('DEMO_1_1')!).answer1).toEqual(1000000)
        expect(followLightingInstructions(inputs.get('DEMO_1_2')!).answer1).toEqual(1000)
        expect(followLightingInstructions(inputs.get('DEMO_1_3')!).answer1).toEqual(0)
      })
    })
  })

  describe('Part 2', () => {
    describe('findTotalBrightness', () => {
      it('should determine the total brightness at the end', () => {
        expect(findTotalBrightness(inputs.get('DEMO_2_1')!).answer2).toEqual(1)
        expect(findTotalBrightness(inputs.get('DEMO_2_2')!).answer2).toEqual(2000000)
      })
    })
  })
})
