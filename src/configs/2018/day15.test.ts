import inputs from '../../inputs/2018/day15'
import { doTheCombat, findBestElfPower } from './day15'

describe('2018 Day 15', () => {
  describe('Part 1', () => {
    it('should find the combat outcome', () => {
      expect(doTheCombat(inputs.get('DEMO_1')!).answer1).toEqual(27730)
      expect(doTheCombat(inputs.get('DEMO_2')!).answer1).toEqual(36334)
      expect(doTheCombat(inputs.get('DEMO_3')!).answer1).toEqual(39514)
      expect(doTheCombat(inputs.get('DEMO_4')!).answer1).toEqual(27755)
      expect(doTheCombat(inputs.get('DEMO_5')!).answer1).toEqual(28944)
      expect(doTheCombat(inputs.get('DEMO_6')!).answer1).toEqual(18740)
    })
  })
  describe('Part 2', () => {
    it('should find the combat outcome with no elf deaths', () => {
      expect(findBestElfPower(inputs.get('DEMO_1')!).answer2).toEqual(4988)
      expect(findBestElfPower(inputs.get('DEMO_3')!).answer2).toEqual(31284)
      expect(findBestElfPower(inputs.get('DEMO_4')!).answer2).toEqual(3478)
      expect(findBestElfPower(inputs.get('DEMO_5')!).answer2).toEqual(6474)
      expect(findBestElfPower(inputs.get('DEMO_6')!).answer2).toEqual(1140)
    })
  })
})
