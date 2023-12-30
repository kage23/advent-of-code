import inputs from '../../inputs/2021/day22'
import { initializeReboot, doTheReboot } from './day22'

describe('2021 Day 22', () => {
  describe('Part 1', () => {
    it('should initialize the reboot', () => {
      expect(initializeReboot(inputs.get('DEMO_1')!).answer1).toEqual(39)
      expect(initializeReboot(inputs.get('K_DEMO_1')!).answer1).toEqual(1000)
      expect(initializeReboot(inputs.get('DEMO_2')!).answer1).toEqual(590784)
    })
  })
  describe('Part 2', () => {
    it('should do the reboot', () => {
      expect(doTheReboot(inputs.get('DEMO_3')!).answer2).toEqual(
        2758514936282235
      )
    })
  })
})
