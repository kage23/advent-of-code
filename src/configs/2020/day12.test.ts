import inputs from '../../inputs/2020/day12'
import {
  followNavigationInstructions,
  actuallyFollowNavigationInstructions,
} from './day12'

describe('2020 Day 12', () => {
  describe('Part 1', () => {
    it('should follow the instructions and find the distance', () => {
      expect(followNavigationInstructions(inputs.get('DEMO')!).answer1).toEqual(
        25
      )
    })
  })
  describe('Part 2', () => {
    it('should actually follow the instructions and find the distance', () => {
      expect(
        actuallyFollowNavigationInstructions(inputs.get('DEMO')!).answer2
      ).toEqual(286)
    })
  })
})
