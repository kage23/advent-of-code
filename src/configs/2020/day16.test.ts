import inputs from '../../inputs/2020/day16'
import { analyzeTickets, scanTickets } from './day16'

describe('2020 Day 16', () => {
  describe('Part 1', () => {
    it('should find the ticket scanning error rate', () => {
      expect(scanTickets(inputs.get('DEMO_1')!).answer1).toEqual(71)
    })
  })
  describe('Part 2', () => {
    it('should find the departure values checker value', () => {
      expect(analyzeTickets(inputs.get('DEMO_2')!).answer2).toEqual('1')
    })
  })
})
