import { runUntilDone } from './day19'

describe('2018 Day 19', () => {
  describe('Part 1', () => {
    it('should get the value in register 0', () => {
      expect(runUntilDone('DEMO')!.answer1).toEqual(6)
    })
  })
})
