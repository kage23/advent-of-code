import inputs from '../../inputs/2019/day07'
import { findMaxAmpSignal, findMaxAmpSignal2 } from './day07'

describe('2019 Day 07', () => {
  describe('Part 1', () => {
    it('should find the maximum amplifier signal', () => {
      expect(findMaxAmpSignal(inputs.get('DEMO_1_1')!).answer1).toEqual(43210)
      expect(findMaxAmpSignal(inputs.get('DEMO_1_2')!).answer1).toEqual(54321)
      expect(findMaxAmpSignal(inputs.get('DEMO_1_3')!).answer1).toEqual(65210)
    })
  })
  describe('Part 2', () => {
    it('should keep finding the maximum amplifier signal, I guess', () => {
      expect(findMaxAmpSignal2(inputs.get('DEMO_2_1')!).answer2).toEqual(
        139629729
      )
      expect(findMaxAmpSignal2(inputs.get('DEMO_2_2')!).answer2).toEqual(18216)
    })
  })
})
