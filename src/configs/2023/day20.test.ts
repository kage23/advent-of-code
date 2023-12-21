import inputs from '../../inputs/2023/day20'
import { pushButton1000Times } from './day20'

describe('2023 Day 20', () => {
  describe('Part 1', () => {
    it('should count the pulses in 1000 button pushes', () => {
      expect(pushButton1000Times(inputs.get('DEMO_1')!).answer1).toEqual(
        32000000
      )
      expect(pushButton1000Times(inputs.get('DEMO_2')!).answer1).toEqual(
        11687500
      )
    })
  })
  // There's no sample, so nothing to test here
  xdescribe('Part 2', () => {
    it('should ', () => {
      // expect(figureOutGoodCombos(inputs.get('DEMO')!).answer2).toEqual(
      //   '167409079868000'
      // )
    })
  })
})
