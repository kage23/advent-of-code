import inputs from '../../inputs/2020/day13'
import { checkBusSchedule, winBusTimeContest } from './day13'

describe('2020 Day 13', () => {
  describe('Part 1', () => {
    it('should get the bus ID and wait time', () => {
      expect(checkBusSchedule(inputs.get('DEMO_1')!).answer1).toEqual(295)
    })
  })
  describe('Part 2', () => {
    it('should win the bus time contest', () => {
      expect(winBusTimeContest(inputs.get('DEMO_1')!, 1).answer2).toEqual(
        1068781
      )
      expect(winBusTimeContest(inputs.get('DEMO_2')!, 1).answer2).toEqual(3417)
      expect(winBusTimeContest(inputs.get('DEMO_3')!, 1).answer2).toEqual(
        754018
      )
      expect(winBusTimeContest(inputs.get('DEMO_4')!, 1).answer2).toEqual(
        779210
      )
      expect(winBusTimeContest(inputs.get('DEMO_5')!, 1).answer2).toEqual(
        1261476
      )
      expect(winBusTimeContest(inputs.get('DEMO_6')!, 1).answer2).toEqual(
        1202161486
      )
    })
  })
})
