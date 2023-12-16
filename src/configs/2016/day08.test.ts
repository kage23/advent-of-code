import inputs from '../../inputs/2016/day08'
import { swipeCard } from './day08'

describe('2016 Day 08', () => {
  describe('Part 1', () => {
    describe('swipeCard', () => {
      it('should determine how many pixels are lit at the end', () => {
        expect(swipeCard(inputs.get('DEMO_1')!, 3, 7).answer1).toEqual(6)
      })
    })
  })
})
