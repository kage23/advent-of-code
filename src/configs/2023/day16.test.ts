import inputs from '../../inputs/2023/day16'
import { fireBeam, fireBeamFromBestStart } from './day16'

describe('2023 Day 16', () => {
  describe('Part 1', () => {
    it('should count energized tiles', () => {
      expect(fireBeam(inputs.get('DEMO')!).answer1).toEqual(46)
    })
  })
  describe('Part 2', () => {
    it('should count energized tiles firing from the best start', () => {
      expect(fireBeamFromBestStart(inputs.get('DEMO')!).answer2).toEqual(51)
    })
  })
})
