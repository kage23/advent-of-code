import inputs from '../../inputs/2017/day09'
import { processStream } from './day09'

describe('2017 Day 09', () => {
  describe('Part 1', () => {
    it('should find the total score', () => {
      expect(processStream(inputs.get('DEMO_0')!).answer1).toEqual(1)
      expect(processStream(inputs.get('DEMO_1')!).answer1).toEqual(6)
      expect(processStream(inputs.get('DEMO_2')!).answer1).toEqual(5)
      expect(processStream(inputs.get('DEMO_3')!).answer1).toEqual(16)
      expect(processStream(inputs.get('DEMO_4')!).answer1).toEqual(1)
      expect(processStream(inputs.get('DEMO_5')!).answer1).toEqual(1)
      expect(processStream(inputs.get('DEMO_6')!).answer1).toEqual(9)
      expect(processStream(inputs.get('DEMO_7')!).answer1).toEqual(3)
    })
  })
  describe('Part 2', () => {
    it('should find the garbage', () => {
      expect(processStream(inputs.get('GARBAGE_0')!).answer2).toEqual(0)
      expect(processStream(inputs.get('GARBAGE_1')!).answer2).toEqual(17)
      expect(processStream(inputs.get('GARBAGE_2')!).answer2).toEqual(3)
      expect(processStream(inputs.get('GARBAGE_3')!).answer2).toEqual(2)
      expect(processStream(inputs.get('GARBAGE_4')!).answer2).toEqual(0)
      expect(processStream(inputs.get('GARBAGE_5')!).answer2).toEqual(0)
      expect(processStream(inputs.get('GARBAGE_6')!).answer2).toEqual(10)
    })
  })
})
