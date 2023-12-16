import inputs from '../../inputs/2016/day19'
import { doTheBadWhiteElephant, doTheBadWhiteElephant_v2 } from './day19'

describe('2016 Day 19', () => {
  describe('Part 1', () => {
    describe('doTheBadWhiteElephant', () => {
      it('should determine which elf gets all the gifts', () => {
        expect(doTheBadWhiteElephant(inputs.get('DEMO_1')!).answer1).toEqual(3)
      })
    })
  })

  describe('Part 2', () => {
    describe('doTheBadWhiteElephant_v2', () => {
      it('should determine which elf gets all the gifts', () => {
        expect(doTheBadWhiteElephant_v2(inputs.get('DEMO_1')!).answer2).toEqual(2)
      })
    })
  })
})
