import inputs from '../../inputs/2020/day05'
import { performSanityCheck } from './day05'

describe('2020 Day 05', () => {
  describe('Part 1', () => {
    it('should get the highest seat ID', () => {
      expect(performSanityCheck(inputs.get('DEMO_1')!).answer1).toEqual(357)
      expect(performSanityCheck(inputs.get('DEMO_2')!).answer1).toEqual(567)
      expect(performSanityCheck(inputs.get('DEMO_3')!).answer1).toEqual(119)
      expect(performSanityCheck(inputs.get('DEMO_4')!).answer1).toEqual(820)
      expect(
        performSanityCheck(inputs.get('DEMO_SANITY_CHECK')!).answer1
      ).toEqual(820)
    })
  })
  // No demo answer for part 2
  xdescribe('Part 2', () => {
    it('should find your seat', () => {
      // expect(findYourSeat(inputs.get('DEMO_1')!)?.answer2).toEqual(0)
    })
  })
})
