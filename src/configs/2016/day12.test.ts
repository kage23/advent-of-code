import { runAssembunnyCode, runAssembunnyCodeWithIgnitionSet } from './day12'

describe('2016 Day 12', () => {
  describe('Part 1', () => {
    describe('runAssembunnyCode', () => {
      it('should determine the final value of register A', () => {
        expect(runAssembunnyCode('DEMO_1').answer1).toEqual(42)
      })
    })
  })

  describe('Part 2', () => {
    describe('runAssembunnyCodeWithIgnitionSet', () => {
      it('should determine the final value of register A if C starts at 1', () => {
        expect(runAssembunnyCodeWithIgnitionSet('DEMO_1').answer2).toEqual(42)
      })
    })
  })
})
