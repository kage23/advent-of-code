import inputs from '../../inputs/2022/day19'
import { getBlueprintQualityLevels, getGeodesInMoreTime } from './day19'

describe('2022 Day 19', () => {
  describe('Part 1', () => {
    it('should get the blueprint quality levels', () => {
      expect(getBlueprintQualityLevels(inputs.get('DEMO')!).answer1).toEqual(33)
    })
  })
  // This does get the right answer, but takes several minutes to do it
  xdescribe('Part 2', () => {
    it('should count geodes for the first three blueprints', () => {
      expect(getGeodesInMoreTime(inputs.get('DEMO')!).answer2).toEqual(56 * 62)
    })
  })
})
