import inputs from '../../inputs/2023/day25'
import { splitTheModules } from './day25'

describe('2023 Day 25', () => {
  describe('Part 1', () => {
    it('should find the wires to cut', () => {
      expect(splitTheModules(inputs.get('DEMO')!).answer1).toEqual(54)
    })
  })
})
