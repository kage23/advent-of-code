import { findLowestUnbannedIP, findAllUnbannedIPs } from './day20'

describe('2016 Day 20', () => {
  describe('Part 1', () => {
    describe('findLowestUnbannedIP', () => {
      it('should determine the lowest unbanned IP address', () => {
        expect(findLowestUnbannedIP('DEMO_1').answer1).toEqual(3)
      })
    })
  })

  describe('Part 2', () => {
    describe('findAllUnbannedIPs', () => {
      it('should determine how many unbanned IP addresses there are', () => {
        expect(findAllUnbannedIPs('DEMO_1').answer2).toEqual(2)
      })
    })
  })
})
