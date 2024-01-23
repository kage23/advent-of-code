import inputs from '../../inputs/2020/day18'
import { calculateEachLine, properlyCalculateEachLine } from './day18'

describe('2020 Day 18', () => {
  describe('Part 1', () => {
    it('should calculate each line', () => {
      expect(calculateEachLine(inputs.get('DEMO_1')!).answer1).toEqual(71)
      expect(calculateEachLine(inputs.get('DEMO_2')!).answer1).toEqual(51)
      expect(calculateEachLine(inputs.get('DEMO_3')!).answer1).toEqual(26)
      expect(calculateEachLine(inputs.get('DEMO_4')!).answer1).toEqual(437)
      expect(calculateEachLine(inputs.get('DEMO_5')!).answer1).toEqual(12240)
      expect(calculateEachLine(inputs.get('DEMO_6')!).answer1).toEqual(13632)
    })
  })
  describe('Part 2', () => {
    it('should properly calculate each line', () => {
      expect(properlyCalculateEachLine(inputs.get('DEMO_1')!).answer2).toEqual(231)
      expect(properlyCalculateEachLine(inputs.get('DEMO_2')!).answer2).toEqual(51)
      expect(properlyCalculateEachLine(inputs.get('DEMO_3')!).answer2).toEqual(46)
      expect(properlyCalculateEachLine(inputs.get('DEMO_4')!).answer2).toEqual(1445)
      expect(properlyCalculateEachLine(inputs.get('DEMO_5')!).answer2).toEqual(669060)
      expect(properlyCalculateEachLine(inputs.get('DEMO_6')!).answer2).toEqual(23340)
    })
  })
})
