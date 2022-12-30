import { generateKeys, generateStretchedKeys } from './day14'

describe('2016 Day 14', () => {
  describe('Part 1', () => {
    describe('generateKeys', () => {
      it('should determine the 64th one-time pad key', () => {
        expect(generateKeys('DEMO_1').answer1).toEqual(22728)
      })
    })
  })

  describe('Part 2', () => {
    describe('generateStretchedKeys', () => {
      it('should determine the 64th stretched one-time pad key', () => {
        expect(generateStretchedKeys('DEMO_1').answer2).toEqual(22551)
      })
    })
  })
})
