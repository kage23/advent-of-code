import { deliverPresents, deliverPresentsWithRoboSanta } from './day03'
import inputs from '../../inputs/2015/day03'

describe('2015 Day 03', () => {
  describe('Part 1', () => {
    describe('deliverPresents', () => {
      it('should count how many houses get at least one present', () => {
        expect(deliverPresents(inputs.get('DEMO_1')!).answer1).toEqual(2)
        expect(deliverPresents(inputs.get('DEMO_2')!).answer1).toEqual(4)
        expect(deliverPresents(inputs.get('DEMO_3')!).answer1).toEqual(2)
      })
    })
  })
  describe('Part 2', () => {
    describe('deliverPresentsWithRoboSanta', () => {
      it('should count how many houses get at least one present', () => {
        expect(deliverPresentsWithRoboSanta(inputs.get('DEMO_4')!).answer2).toEqual(3)
        expect(deliverPresentsWithRoboSanta(inputs.get('DEMO_2')!).answer2).toEqual(3)
        expect(deliverPresentsWithRoboSanta(inputs.get('DEMO_3')!).answer2).toEqual(11)
      })
    })
  })
})
