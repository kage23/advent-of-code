import inputs from '../../inputs/2023/day01'
import { findCalibrationValues, findCalibrationValuesSpelled } from './day01'

describe('2023 Day 01', () => {
  describe('Part 1', () => {
    it('should find the calibration sum', () => {
      expect(findCalibrationValues(inputs.get('DEMO_1')!).answer1).toEqual(142)
    })
  })
  describe('Part 2', () => {
    it('should find the calibration sum with spelled out numbers', () => {
      expect(
        findCalibrationValuesSpelled(inputs.get('DEMO_2')!).answer2
      ).toEqual(281)
    })
  })
})
