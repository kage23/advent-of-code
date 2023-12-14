import { assessRisk, calculateTimeForRescue } from './day22'

describe('2018 Day 22', () => {
  describe('Part 1', () => {
    it('should assess the risk of the rescue', () => {
      expect(assessRisk('DEMO')!.answer1).toEqual(114)
    })
  })
  describe('Part 2', () => {
    it('should calculate the time of the rescue', () => {
      expect(calculateTimeForRescue('DEMO')!.answer2).toEqual(45)
    })
  })
})
