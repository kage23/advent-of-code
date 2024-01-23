import inputs from '../../inputs/2019/day01'
import {
  findFuelForAllModules,
  findFuelForAllModulesWithFuelCost,
} from './day01'

describe('2019 Day 01', () => {
  describe('Part 1', () => {
    it('should get the fuel requirements', () => {
      expect(findFuelForAllModules(inputs.get('DEMO_1')!).answer1).toEqual(2)
      expect(findFuelForAllModules(inputs.get('DEMO_2')!).answer1).toEqual(2)
      expect(findFuelForAllModules(inputs.get('DEMO_3')!).answer1).toEqual(654)
      expect(findFuelForAllModules(inputs.get('DEMO_4')!).answer1).toEqual(
        33583
      )
      expect(findFuelForAllModules(inputs.get('DEMO_5')!).answer1).toEqual(
        34241
      )
    })
  })
  describe('Part 2', () => {
    it('should get the fuel requirements including fuel weight', () => {
      expect(
        findFuelForAllModulesWithFuelCost(inputs.get('DEMO_2')!).answer2
      ).toEqual(2)
      expect(
        findFuelForAllModulesWithFuelCost(inputs.get('DEMO_3')!).answer2
      ).toEqual(966)
      expect(
        findFuelForAllModulesWithFuelCost(inputs.get('DEMO_4')!).answer2
      ).toEqual(50346)
    })
  })
})
