import inputs from '../../inputs/2018/day20'
import { findFarthestRoom, countFarRooms } from './day20'

describe('2018 Day 20', () => {
  describe('Part 1', () => {
    it('should get the distance of the farthest room', () => {
      expect(findFarthestRoom(inputs.get('DEMO_1')!).answer1).toEqual(3)
      expect(findFarthestRoom(inputs.get('DEMO_2')!).answer1).toEqual(10)
      expect(findFarthestRoom(inputs.get('DEMO_3')!).answer1).toEqual(18)
      expect(findFarthestRoom(inputs.get('DEMO_4')!).answer1).toEqual(23)
      expect(findFarthestRoom(inputs.get('DEMO_5')!).answer1).toEqual(31)
    })
  })
  describe('Part 2', () => {
    it('should count how many rooms are farther than 1000 doors away', () => {
      expect(countFarRooms(inputs.get('DEMO_1')!).answer2).toEqual(0)
      expect(countFarRooms(inputs.get('DEMO_2')!).answer2).toEqual(0)
      expect(countFarRooms(inputs.get('DEMO_3')!).answer2).toEqual(0)
      expect(countFarRooms(inputs.get('DEMO_4')!).answer2).toEqual(0)
      expect(countFarRooms(inputs.get('DEMO_5')!).answer2).toEqual(0)
    })
  })
})
