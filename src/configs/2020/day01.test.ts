import inputs from '../../inputs/2020/day01'
import { checkExpenseReport, checkExpenseReportHarder } from './day01'

describe('2020 Day 01', () => {
  describe('Part 1', () => {
    it('should check the expense report', () => {
      expect(checkExpenseReport(inputs.get('DEMO')!)?.answer1).toEqual(514579)
    })
  })
  describe('Part 2', () => {
    it('should check the expense report harder', () => {
      expect(checkExpenseReportHarder(inputs.get('DEMO')!)?.answer2).toEqual(
        241861950
      )
    })
  })
})
