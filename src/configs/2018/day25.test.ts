import inputs from '../../inputs/2018/day25'
import { countConstellations } from './day25'

describe('2018 Day 25', () => {
  describe('Part 1', () => {
    it('should count how many constellations there are', () => {
      expect(countConstellations(inputs.get('DEMO_1')!).answer1).toEqual(2)
      expect(countConstellations(inputs.get('DEMO_2')!).answer1).toEqual(4)
      expect(countConstellations(inputs.get('DEMO_3')!).answer1).toEqual(3)
      expect(countConstellations(inputs.get('DEMO_4')!).answer1).toEqual(8)
    })
  })
})
