import inputs from '../../inputs/2023/day19'
import { figureOutGoodCombos, sortPartsSlowly } from './day19'

describe('2023 Day 19', () => {
  describe('Part 1', () => {
    it('should get the value of the good parts', () => {
      expect(sortPartsSlowly(inputs.get('DEMO')!).answer1).toEqual(19114)
    })
  })
  describe('Part 2', () => {
    it('should figure out how many good combinations of part ratings there are', () => {
      expect(figureOutGoodCombos(inputs.get('DEMO')!).answer2).toEqual(
        '167409079868000'
      )
    })
  })
})
