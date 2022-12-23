import { evaluateTriangles, evaluateTrianglesVertically } from './day03'

describe('2016 Day 03', () => {
  describe('Part 1', () => {
    describe('evaluateTriangles', () => {
      it('should determine how many real triangles are in the list', () => {
        expect(evaluateTriangles('DEMO_1_1').answer1).toEqual(1)
      })
    })
  })

  describe('Part 2', () => {
    describe('evaluateTrianglesVertically', () => {
      it('should determine how many triangles are in the list when grouping vertically', () => {
        expect(evaluateTrianglesVertically('DEMO_2_1').answer2).toEqual(6)
      })
    })
  })
})
