import inputs from '../../inputs/2016/day09'
import { decompressSequence, getDecompressedLength } from './day09'

describe('2016 Day 09', () => {
  describe('Part 1', () => {
    describe('decompressSequence', () => {
      it('should determine the length of the decompressed sequence', () => {
        expect(decompressSequence(inputs.get('DEMO_1_1')!).answer1).toEqual(6)
        expect(decompressSequence(inputs.get('DEMO_1_2')!).answer1).toEqual(7)
        expect(decompressSequence(inputs.get('DEMO_1_3')!).answer1).toEqual(9)
        expect(decompressSequence(inputs.get('DEMO_1_4')!).answer1).toEqual(11)
        expect(decompressSequence(inputs.get('DEMO_1_5')!).answer1).toEqual(6)
        expect(decompressSequence(inputs.get('DEMO_1_6')!).answer1).toEqual(18)
      })
    })
  })

  describe('Part 2', () => {
    describe('getDecompressedLength', () => {
      it('should determine the length of the final decompressed sequence', () => {
        expect(getDecompressedLength(inputs.get('DEMO_1_3')!).answer2).toEqual(
          9
        )
        expect(getDecompressedLength(inputs.get('DEMO_1_6')!).answer2).toEqual(
          20
        )
        expect(getDecompressedLength(inputs.get('DEMO_2_1')!).answer2).toEqual(
          241920
        )
        expect(getDecompressedLength(inputs.get('DEMO_2_2')!).answer2).toEqual(
          445
        )
      })
    })
  })
})
