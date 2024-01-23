import inputs from '../../inputs/2022/day22'
import { getPassword } from './day22'

describe('2022 Day 22', () => {
  describe('Part 1', () => {
    it('should get the password', () => {
      expect(getPassword(inputs.get('DEMO')!, 1)).toEqual(6032)
    })
  })
  describe('Part 2', () => {
    it('should get the actual password of the cube', () => {
      expect(getPassword(inputs.get('DEMO')!, 2)).toEqual(5031)
    })
  })
})
