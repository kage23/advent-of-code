import inputs from '../../inputs/2020/day23'
import { play100Rounds, playForReal } from './day23'

describe('2020 Day 23', () => {
  describe('Part 1', () => {
    it('should find the cups after Cup 1 after 100 rounds', () => {
      expect(play100Rounds(inputs.get('DEMO')!).answer1).toEqual('67384529')
    })
  })
  // This passes but is a bit slow
  xdescribe('Part 2', () => {
    it('should find the score of the winning deck in the recursive game', () => {
      expect(playForReal(inputs.get('DEMO')!).answer2).toEqual(149245887792)
    })
  })
})
