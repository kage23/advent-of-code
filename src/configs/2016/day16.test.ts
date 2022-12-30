import { fillBiggerDisk, fillDisk } from './day16'

describe('2016 Day 16', () => {
  describe('Part 1', () => {
    describe('fillDisk', () => {
      it('should determine the checksum of the filled disk', () => {
        expect(fillDisk('DEMO_1').answer1).toEqual('01100')
      })
    })
  })

  describe('Part 2', () => {
    describe('fillBiggerDisk', () => {
      it('should determine the checksum of the filled bigger disk', () => {
        expect(fillBiggerDisk('DEMO_1').answer2).toEqual('10111110011110111')
      })
    })
  })
})
