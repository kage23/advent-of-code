import inputs from '../../inputs/2021/day13'
import { logSpy } from '../../setupTests'
import { firstFold, foldItUp } from './day13'

describe('2021 Day 13', () => {
  describe('Part 1', () => {
    it('should count dots after one fold', () => {
      expect(firstFold(inputs.get('DEMO')!).answer1).toEqual(17)
    })
  })
  describe('Part 2', () => {
    it('should fold it up', () => {
      foldItUp(inputs.get('DEMO')!)
      expect(logSpy.mock.calls).toHaveLength(1)
      expect(logSpy.mock.calls[0][0]).toEqual(`#####
#   #
#   #
#   #
#####
     
     
`)
    })
  })
})
