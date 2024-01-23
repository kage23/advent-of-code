import inputs from '../../inputs/2023/day14'
import { rollRocksNorth, doABunchOfCycles } from './day14'

describe('2023 Day 14', () => {
  describe('Part 1', () => {
    it('should find the load on the north beams after rolling north', () => {
      expect(rollRocksNorth(inputs.get('DEMO')!).answer1).toEqual(136)
    })
  })
  describe('Part 2', () => {
    it('should find the load on the north beams after doing a bunch of cycles', () => {
      expect(doABunchOfCycles(inputs.get('DEMO')!).answer2).toEqual(64)
    })
  })
})
