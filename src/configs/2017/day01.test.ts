import { solveCaptcha1, solveCaptcha2 } from './day01'

describe('2017 Day 01', () => {
  describe('Part 1', () => {
    it('should solve the first half of the captcha', () => {
      expect(solveCaptcha1('DEMO_1_0').answer1).toEqual(3)
      expect(solveCaptcha1('DEMO_1_1').answer1).toEqual(4)
      expect(solveCaptcha1('DEMO_1_2').answer1).toEqual(0)
      expect(solveCaptcha1('DEMO_1_3').answer1).toEqual(9)
    })
  })
  describe('Part 2', () => {
    it('should solve the second half of the captcha', () => {
      expect(solveCaptcha2('DEMO_2_0').answer2).toEqual(6)
      expect(solveCaptcha2('DEMO_2_1').answer2).toEqual(0)
      expect(solveCaptcha2('DEMO_2_2').answer2).toEqual(4)
      expect(solveCaptcha2('DEMO_2_3').answer2).toEqual(12)
      expect(solveCaptcha2('DEMO_2_4').answer2).toEqual(4)
    })
  })
})
