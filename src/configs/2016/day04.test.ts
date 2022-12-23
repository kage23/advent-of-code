import inputs from '../../inputs/2016/day04'
import { decryptRoomName, sumRealRooms } from './day04'

describe('2016 Day 04', () => {
  describe('Part 1', () => {
    describe('sumRealRooms', () => {
      it('should sum the sector IDs of the real rooms in the list', () => {
        expect(sumRealRooms('DEMO_1_1').answer1).toEqual(1514)
      })
    })
  })

  describe('Part 2', () => {
    describe('decryptRoomName', () => {
      it('should decrypt a room name', () => {
        expect(decryptRoomName(inputs.get('DEMO_2_1')!)).toEqual(
          '343: very encrypted name'
        )
      })
    })
  })
})
