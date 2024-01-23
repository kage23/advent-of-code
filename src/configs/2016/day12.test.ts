import inputs from '../../inputs/2016/day12'
import { runAssembunnyCode, runAssembunnyCodeWithIgnitionSet } from './day12'

describe('2016 Day 12', () => {
  describe('Part 1', () => {
    describe('runAssembunnyCode', () => {
      it('should determine the final value of register A', () => {
        expect(runAssembunnyCode(inputs.get('DEMO_1')!).answer1).toEqual(42)
      })
    })
  })

  describe('Part 2', () => {
    describe('runAssembunnyCodeWithIgnitionSet', () => {
      it('should determine the final value of register A if C starts at 1', () => {
        expect(
          runAssembunnyCodeWithIgnitionSet(inputs.get('DEMO_1')!).answer2
        ).toEqual(42)
      })
    })
  })
})
