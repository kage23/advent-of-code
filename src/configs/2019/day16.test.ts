import inputs from '../../inputs/2019/day16'
import { reset, resetForPart2, run100Phases, run100PhasesPart2 } from './day16'

describe('2019 Day 16', () => {
  describe('Part 1', () => {
    it('should get the first 8 digits after 100 phases', () => {
      expect(
        (() => {
          reset(inputs.get('DEMO_1_2')!)
          return run100Phases(inputs.get('DEMO_1_2')!)
        })().answer1
      ).toEqual('24176176')
      expect(
        (() => {
          reset(inputs.get('DEMO_1_3')!)
          return run100Phases(inputs.get('DEMO_1_3')!)
        })().answer1
      ).toEqual('73745418')
      expect(
        (() => {
          reset(inputs.get('DEMO_1_4')!)
          return run100Phases(inputs.get('DEMO_1_4')!)
        })().answer1
      ).toEqual('52432133')
    })
  })
  // This works but takes a long time
  xdescribe('Part 2', () => {
    it('should find the 8-digit message', () => {
      expect(
        (() => {
          resetForPart2(inputs.get('DEMO_2_1')!)
          return run100PhasesPart2(inputs.get('DEMO_2_1')!)
        })().answer2
      ).toEqual('84462026')
      expect(
        (() => {
          resetForPart2(inputs.get('DEMO_2_2')!)
          return run100PhasesPart2(inputs.get('DEMO_2_2')!)
        })().answer2
      ).toEqual('78725270')
      expect(
        (() => {
          resetForPart2(inputs.get('DEMO_2_3')!)
          return run100PhasesPart2(inputs.get('DEMO_2_3')!)
        })().answer2
      ).toEqual('53553731')
    })
  })
})
