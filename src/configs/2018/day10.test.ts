import { alignTheStars } from './day10'

describe('2018 Day 10', () => {
  describe('Part 1', () => {
    it('should find the message in the stars', () => {
      expect(alignTheStars('DEMO')!.answer1).toEqual(
        '#   #  ###\n' +
        '#   #   # \n' +
        '#   #   # \n' +
        '#####   # \n' +
        '#   #   # \n' +
        '#   #   # \n' +
        '#   #   # \n' +
        '#   #  ###\n'
      )
    })
  })
  describe('Part 2', () => {
    it('should find the time until the message in the stars', () => {
      expect(alignTheStars('DEMO')!.answer2).toEqual(3)
    })
  })
})
