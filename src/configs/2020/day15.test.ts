import inputs from '../../inputs/2020/day15'
import { playNumberGame } from './day15'

describe('2020 Day 15', () => {
  describe('Part 1', () => {
    it('should play short number games', () => {
      expect(playNumberGame(inputs.get('DEMO_1')!, 10).answer1).toEqual(0)
      expect(playNumberGame(inputs.get('DEMO_2')!, 2020).answer1).toEqual(1)
      expect(playNumberGame(inputs.get('DEMO_3')!, 2020).answer1).toEqual(10)
      expect(playNumberGame(inputs.get('DEMO_4')!, 2020).answer1).toEqual(27)
      expect(playNumberGame(inputs.get('DEMO_5')!, 2020).answer1).toEqual(78)
      expect(playNumberGame(inputs.get('DEMO_6')!, 2020).answer1).toEqual(438)
      expect(playNumberGame(inputs.get('DEMO_7')!, 2020).answer1).toEqual(1836)
    })
  })
  // These all pass, but it's not optimized and the test cases take about 10 seconds each
  xdescribe('Part 2', () => {
    it('should play long number games', () => {
      expect(playNumberGame(inputs.get('DEMO_1')!, 30000000).answer2).toEqual(175594)
      expect(playNumberGame(inputs.get('DEMO_2')!, 30000000).answer2).toEqual(2578)
      expect(playNumberGame(inputs.get('DEMO_3')!, 30000000).answer2).toEqual(3544142)
      expect(playNumberGame(inputs.get('DEMO_4')!, 30000000).answer2).toEqual(261214)
      expect(playNumberGame(inputs.get('DEMO_5')!, 30000000).answer2).toEqual(6895259)
      expect(playNumberGame(inputs.get('DEMO_6')!, 30000000).answer2).toEqual(18)
      expect(playNumberGame(inputs.get('DEMO_7')!, 30000000).answer2).toEqual(362)
    })
  })
})
