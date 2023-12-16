import inputs from '../../inputs/2018/day09'
import { playGame } from './day09'

describe('2018 Day 09', () => {
  describe('Part 1', () => {
    it('should find the winning score of the game', () => {
      expect(playGame(inputs.get('DEMO_1')!, 1)!.answer1).toEqual(32)
      expect(playGame(inputs.get('DEMO_2')!, 1)!.answer1).toEqual(8317)
      expect(playGame(inputs.get('DEMO_3')!, 1)!.answer1).toEqual(146373)
      expect(playGame(inputs.get('DEMO_4')!, 1)!.answer1).toEqual(2764)
      expect(playGame(inputs.get('DEMO_5')!, 1)!.answer1).toEqual(54718)
      expect(playGame(inputs.get('DEMO_6')!, 1)!.answer1).toEqual(37305)
    })
  })
  describe('Part 2', () => {
    it('should find the winning score of the big game', () => {
      expect(playGame(inputs.get('DEMO_1')!, 2)!.answer2).toEqual(22563)
      expect(playGame(inputs.get('DEMO_2')!, 2)!.answer2).toEqual(74765078)
      expect(playGame(inputs.get('DEMO_3')!, 2)!.answer2).toEqual(1406506154)
      expect(playGame(inputs.get('DEMO_4')!, 2)!.answer2).toEqual(20548882)
      expect(playGame(inputs.get('DEMO_5')!, 2)!.answer2).toEqual(507583214)
      expect(playGame(inputs.get('DEMO_6')!, 2)!.answer2).toEqual(320997431)
    })
  })
})
