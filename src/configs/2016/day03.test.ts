import inputs from '../../inputs/2016/day03'
import { evaluateTriangles, evaluateTrianglesVertically } from './day03'

describe('2016 Day 03', () => {
  describe('Part 1', () => {
    describe('evaluateTriangles', () => {
      it('should determine how many real triangles are in the list', () => {
        expect(evaluateTriangles(inputs.get('DEMO_1_1')!).answer1).toEqual(1)
      })
    })
  })

  describe('Part 2', () => {
    describe('evaluateTrianglesVertically', () => {
      it('should determine how many triangles are in the list when grouping vertically', () => {
        expect(
          evaluateTrianglesVertically(inputs.get('DEMO_2_1')!).answer2
        ).toEqual(6)
      })
    })
  })
})
