import inputs from '../../inputs/2015/day18'
import { runLightAnimation, runLightAnimationWithStuckOnLights } from './day18'

describe('2015 Day 18', () => {
  describe('Part 1', () => {
    describe('runLightAnimation', () => {
      it('should determine how many lights are on at the end of the animation', () => {
        expect(runLightAnimation(inputs.get('DEMO_1')!, 4).answer1).toEqual(4)
      })
    })
  })

  describe('Part 2', () => {
    describe('runLightAnimationWithStuckOnLights', () => {
      it('should determine how many lights are on at the end of the animation with the corners stuck on', () => {
        expect(
          runLightAnimationWithStuckOnLights(inputs.get('DEMO_1')!, 5).answer2
        ).toEqual(17)
      })
    })
  })
})
