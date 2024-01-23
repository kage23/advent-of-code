import { getCodeFromCodeNumber, getCodeNumberAtGridPosition } from './day25'

describe('2015 Day 25', () => {
  describe('getCodeNumberAtGridPosition', () => {
    it('should determine the correct code number from a given grid position', () => {
      expect(getCodeNumberAtGridPosition(3, 4)).toEqual(19)
    })
  })

  describe('getCodeFromCodeNumber', () => {
    it('should determine the correct code from a given code number', () => {
      expect(getCodeFromCodeNumber(19)).toEqual(7981243)
    })
  })
})
