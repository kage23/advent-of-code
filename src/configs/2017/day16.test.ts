import inputs from '../../inputs/2017/day16'
import { doDance, danceABillion } from './day16'

describe('2017 Day 16', () => {
  describe('Part 1', () => {
    it('should do the dance', () => {
      expect(doDance(inputs.get('DEMO')!, 'abcde')!.answer1).toEqual('baedc')
    })
  })
  describe('Part 2', () => {
    it('should dance a billion times', () => {
      expect(danceABillion(inputs.get('DEMO')!, 'abcde')!.answer2).toEqual(
        'abcde'
      )
    })
  })
})
