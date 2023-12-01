import { takeTrip, findDelayFastMethod } from './day13'

describe('2017 Day 13', () => {
  describe('Part 1', () => {
    it('should judge the severity of the trip', () => {
      expect(takeTrip('DEMO')!.answer1).toEqual(24)
    })
  })
  describe('Part 2', () => {
    it('should count the total number of groups', () => {
      expect(findDelayFastMethod('DEMO')!.answer2).toEqual(10)
    })
  })
})
