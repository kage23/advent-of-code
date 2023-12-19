import inputs from '../../inputs/2023/day18'
import { digGiantLagoon, digLagoon, digLagoonBetter } from './day18'

describe('2023 Day 18', () => {
  describe('Part 1', () => {
    it('should determine the area of the lagoon', () => {
      expect(digLagoon(inputs.get('DEMO')!).answer1).toEqual(62)
      expect(digLagoonBetter(inputs.get('DEMO')!).answer1).toEqual('62')
    })
  })
  describe('Part 2', () => {
    it('should determine the area of the giant lagoon', () => {
      expect(digGiantLagoon(inputs.get('DEMO')!).answer2).toEqual(
        '952408144115'
      )
    })
  })
})
