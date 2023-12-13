import { findFarthestRoom, countFarRooms } from './day20'

describe('2018 Day 20', () => {
  describe('Part 1', () => {
    it('should get the distance of the farthest room', () => {
      expect(findFarthestRoom('DEMO_1')!.answer1).toEqual(3)
      expect(findFarthestRoom('DEMO_2')!.answer1).toEqual(10)
      expect(findFarthestRoom('DEMO_3')!.answer1).toEqual(18)
      expect(findFarthestRoom('DEMO_4')!.answer1).toEqual(23)
      expect(findFarthestRoom('DEMO_5')!.answer1).toEqual(31)
    })
  })
  describe('Part 2', () => {
    it('should count how many rooms are farther than 1000 doors away', () => {
      expect(countFarRooms('DEMO_1')!.answer2).toEqual(0)
      expect(countFarRooms('DEMO_2')!.answer2).toEqual(0)
      expect(countFarRooms('DEMO_3')!.answer2).toEqual(0)
      expect(countFarRooms('DEMO_4')!.answer2).toEqual(0)
      expect(countFarRooms('DEMO_5')!.answer2).toEqual(0)
    })
  })
})
