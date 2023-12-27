import inputs from '../../inputs/2020/day25'
import { hackDoor } from './day25'

describe('2020 Day 25', () => {
  describe('Part 1', () => {
    it('should find the encryption key for the door', () => {
      expect(hackDoor(inputs.get('DEMO')!).answer1).toEqual(14897079)
    })
  })
})
