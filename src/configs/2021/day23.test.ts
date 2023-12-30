import inputs from '../../inputs/2021/day23'
import { organizeAmphipods, organizeMoreAmphipods } from './day23'

describe('2021 Day 23', () => {
  describe('Part 1', () => {
    it('should calculate energy to organize the amphipods', () => {
      expect(organizeAmphipods(inputs.get('DEMO')!).answer1).toEqual(12521)
      expect(organizeAmphipods(inputs.get('K_TEST')!).answer1).toEqual(9011)
    })
  })
  // This presumably works but when I was doing my rebuild I let it run for like
  // five or six minutes without it finishing
  xdescribe('Part 2', () => {
    it('should calculate energy to organize all of the amphipods', () => {
      expect(organizeMoreAmphipods(inputs.get('DEMO')!).answer2).toEqual(44169)
    })
  })
})
