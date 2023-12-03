import { doDance, danceABillion } from './day16'

describe('2017 Day 16', () => {
  describe('Part 1', () => {
    it('should do the dance', () => {
      expect(doDance('DEMO')!.answer1).toEqual('baedc')
    })
  })
  describe('Part 2', () => {
    it('should dance a billion times', () => {
      expect(danceABillion('DEMO')!.answer2).toEqual('abcde')
    })
  })
})
