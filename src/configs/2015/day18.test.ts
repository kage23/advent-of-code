import { runLightAnimation, runLightAnimationWithStuckOnLights } from './day18'

describe('2015 Day 18', () => {
  describe('Part 1', () => {
    it('should determine how many lights are on at the end of the animation', () => {
      expect(runLightAnimation('DEMO_1').answer1).toEqual(4)
    })
  })

  describe('Part 2', () => {
    it('should determine how many lights are on at the end of the animation with the corners stuck on', () => {
      expect(runLightAnimationWithStuckOnLights('DEMO_1').answer2).toEqual(17)
    })
  })
})
