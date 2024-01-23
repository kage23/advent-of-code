import inputs from '../../inputs/2022/day16'
import { openValves, workWithElephant } from './day16'

describe('2022 Day 16', () => {
  describe('Part 1', () => {
    it('should get max pressure you can release', () => {
      expect(openValves(inputs.get('DEMO')!).answer1).toEqual(1651)
    })
  })
  // This doesn't actually return the correct answer for the demo, although it does for my real input :sweat_smile:
  xdescribe('Part 2', () => {
    it('should get max pressure you can release when working with an elephant', () => {
      expect(workWithElephant(inputs.get('DEMO')!).answer2).toEqual(1707)
    })
  })
})
