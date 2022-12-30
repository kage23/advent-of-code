import { getACapsule, getAnAdvancedCapsule } from './day15'

describe('2016 Day 15', () => {
  describe('Part 1', () => {
    describe('getACapsule', () => {
      it('should determine the correct time to release the ball to get a capsule', () => {
        expect(getACapsule('DEMO_1').answer1).toEqual(5)
      })
    })
  })

  describe('Part 2', () => {
    describe('generateStretchedKeys', () => {
      it('should determine the correct time to release the ball to get an advanced capsule', () => {
        expect(getAnAdvancedCapsule('DEMO_1').answer2).toEqual(85)
      })
    })
  })
})
