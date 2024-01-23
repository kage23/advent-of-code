import inputs from '../../inputs/2022/day01'
import { countCalories, countCaloriesTopThree } from './day01'

describe('2022 Day 01', () => {
  describe('Part 1', () => {
    it('should count calories from the top elf', () => {
      expect(countCalories(inputs.get('DEMO')!).answer1).toEqual(24000)
    })
  })
  describe('Part 2', () => {
    it('should count calories from the top three elves', () => {
      expect(countCaloriesTopThree(inputs.get('DEMO')!).answer2).toEqual(45000)
    })
  })
})
