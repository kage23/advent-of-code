import inputs from '../../inputs/2022/day21'
import { listenToMonkeys, shoutWithMonkeys } from './day21'

describe('2022 Day 21', () => {
  describe('Part 1', () => {
    it(`should find the root monkey's number`, () => {
      expect(listenToMonkeys(inputs.get('DEMO')!).answer1).toEqual(152)
    })
  })
  describe('Part 2', () => {
    it('should find a good number to shout', () => {
      expect(shoutWithMonkeys(inputs.get('DEMO')!).answer2).toEqual(301)
    })
  })
})
