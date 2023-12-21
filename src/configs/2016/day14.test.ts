import inputs from '../../inputs/2016/day14'
import { generateKeys, generateStretchedKeys } from './day14'

describe('2016 Day 14', () => {
  describe('Part 1', () => {
    describe('generateKeys', () => {
      it('should determine the 64th one-time pad key', () => {
        expect(generateKeys(inputs.get('DEMO_1')!).answer1).toEqual(22728)
      })
    })
  })

  // This one takes about 3-4 minutes, so we don't run it
  xdescribe('Part 2', () => {
    describe('generateStretchedKeys', () => {
      it('should determine the 64th stretched one-time pad key', () => {
        expect(generateStretchedKeys(inputs.get('DEMO_1')!).answer2).toEqual(
          22551
        )
      })
    })
  })
})
