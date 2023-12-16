import inputs from '../../inputs/2018/day07'
import { calculateStepOrder, useWorkers } from './day07'

describe('2018 Day 07', () => {
  describe('Part 1', () => {
    it('should determine the order to complete the steps in', () => {
      expect(calculateStepOrder(inputs.get('DEMO')!).answer1).toEqual('CABDFE')
    })
  })
  describe('Part 2', () => {
    it('should determine how long it will take to complete', () => {
      expect(useWorkers(inputs.get('DEMO')!, true).answer2).toEqual(15)
    })
  })
})
