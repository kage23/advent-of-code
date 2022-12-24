import { swipeCard } from './day08'

describe('2016 Day 08', () => {
  describe('Part 1', () => {
    describe('swipeCard', () => {
      it('should determine how many pixels are lit at the end', () => {
        expect(swipeCard('DEMO_1').answer1).toEqual(6)
      })
    })
  })
})
