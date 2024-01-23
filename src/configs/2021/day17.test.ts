import inputs from '../../inputs/2021/day17'
import { findBestTrickShot, findAllTheShots } from './day17'

describe('2021 Day 17', () => {
  describe('Part 1', () => {
    it('should find the best trick shot', () => {
      expect(findBestTrickShot(inputs.get('DEMO')!).answer1).toEqual(45)
    })
  })
  describe('Part 2', () => {
    it('should find the all the shots', () => {
      expect(findAllTheShots(inputs.get('DEMO')!).answer2).toEqual(112)
    })
  })
})
