import { processStream } from './day09'

describe('2017 Day 09', () => {
  describe('Part 1', () => {
    it('should find the total score', () => {
      expect(processStream('DEMO_0')!.answer1).toEqual(1)
      expect(processStream('DEMO_1')!.answer1).toEqual(6)
      expect(processStream('DEMO_2')!.answer1).toEqual(5)
      expect(processStream('DEMO_3')!.answer1).toEqual(16)
      expect(processStream('DEMO_4')!.answer1).toEqual(1)
      expect(processStream('DEMO_5')!.answer1).toEqual(1)
      expect(processStream('DEMO_6')!.answer1).toEqual(9)
      expect(processStream('DEMO_7')!.answer1).toEqual(3)
    })
  })
  describe('Part 2', () => {
    it('should find the garbage', () => {
      expect(processStream('GARBAGE_0')!.answer2).toEqual(0)
      expect(processStream('GARBAGE_1')!.answer2).toEqual(17)
      expect(processStream('GARBAGE_2')!.answer2).toEqual(3)
      expect(processStream('GARBAGE_3')!.answer2).toEqual(2)
      expect(processStream('GARBAGE_4')!.answer2).toEqual(0)
      expect(processStream('GARBAGE_5')!.answer2).toEqual(0)
      expect(processStream('GARBAGE_6')!.answer2).toEqual(10)
    })
  })
})
