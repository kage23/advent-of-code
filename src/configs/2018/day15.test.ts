import { doTheCombat, findBestElfPower } from './day15'

describe('2018 Day 15', () => {
  describe('Part 1', () => {
    it('should find the combat outcome', () => {
      expect(doTheCombat('DEMO_1')!.answer1).toEqual(27730)
      expect(doTheCombat('DEMO_2')!.answer1).toEqual(36334)
      expect(doTheCombat('DEMO_3')!.answer1).toEqual(39514)
      expect(doTheCombat('DEMO_4')!.answer1).toEqual(27755)
      expect(doTheCombat('DEMO_5')!.answer1).toEqual(28944)
      expect(doTheCombat('DEMO_6')!.answer1).toEqual(18740)
    })
  })
  describe('Part 2', () => {
    it('should find the combat outcome with no elf deaths', () => {
      expect(findBestElfPower('DEMO_1')!.answer2).toEqual(4988)
      expect(findBestElfPower('DEMO_3')!.answer2).toEqual(31284)
      expect(findBestElfPower('DEMO_4')!.answer2).toEqual(3478)
      expect(findBestElfPower('DEMO_5')!.answer2).toEqual(6474)
      expect(findBestElfPower('DEMO_6')!.answer2).toEqual(1140)
    })
  })
})
