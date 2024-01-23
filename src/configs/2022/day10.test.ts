import inputs from '../../inputs/2022/day10'
import { determineSignalStrengths, runTheProgram } from './day10'

describe('2022 Day 10', () => {
  describe('Part 1', () => {
    it('should determine the signal strength', () => {
      expect(determineSignalStrengths(inputs.get('DEMO_2')!).answer1).toEqual(13140)
    })
  })
  describe('Part 2', () => {
    it('should run the program', () => {
      expect(runTheProgram(inputs.get('DEMO_2')!).answer2).toEqual(`##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######....`)
    })
  })
})
