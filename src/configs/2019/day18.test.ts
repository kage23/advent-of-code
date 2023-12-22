import inputs from '../../inputs/2019/day18'
import { collectAllKeys, collectAllKeysWithMultipleBots } from './day18'

describe('2019 Day 18', () => {
  describe('Part 1', () => {
    it('should count the steps to collect all keys', () => {
      expect(collectAllKeys(inputs.get('DEMO_1_1')!).answer1).toEqual(8)
      expect(collectAllKeys(inputs.get('DEMO_1_2')!).answer1).toEqual(86)
      expect(collectAllKeys(inputs.get('DEMO_1_3')!).answer1).toEqual(132)
      expect(collectAllKeys(inputs.get('DEMO_1_4')!).answer1).toEqual(136)
      expect(collectAllKeys(inputs.get('DEMO_1_5')!).answer1).toEqual(81)
    })
  })
  describe('Part 2', () => {
    it('should count the steps to collect all keys with four robots', () => {
      expect(collectAllKeysWithMultipleBots(inputs.get('DEMO_2_1')!).answer2).toEqual(8)
      expect(collectAllKeysWithMultipleBots(inputs.get('DEMO_2_2')!).answer2).toEqual(24)
      expect(collectAllKeysWithMultipleBots(inputs.get('DEMO_2_3')!).answer2).toEqual(32)
      expect(collectAllKeysWithMultipleBots(inputs.get('DEMO_2_4')!).answer2).toEqual(72)
    })
  })
})
