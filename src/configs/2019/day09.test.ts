import inputs from '../../inputs/2019/day09'
import { runProgramNoInput } from './day09'

describe('2019 Day 09', () => {
  describe('Part 1', () => {
    it('should find the output', () => {
      expect(runProgramNoInput(inputs.get('DEMO_1')!).answer1).toEqual(
        `[${inputs.get('DEMO_1')!}]`
      )
      expect(
        JSON.parse(
          runProgramNoInput(inputs.get('DEMO_2')!).answer1
        )[0].toString().length
      ).toEqual(16)
      expect(
        JSON.parse(runProgramNoInput(inputs.get('DEMO_3')!).answer1)[0]
      ).toEqual(1125899906842624)
    })
  })
  // No demos to test
  xdescribe('Part 2', () => {
    it('should run properly', () => {})
  })
})
