import inputs from '../../inputs/2016/day06'
import { findHighestCountMessage, findLowestCountMessage } from './day06'

describe('2016 Day 06', () => {
  describe('Part 1', () => {
    describe('findHighestCountMessage', () => {
      it('should find the message based on high-count letters', () => {
        expect(findHighestCountMessage(inputs.get('DEMO_1')!).answer1).toEqual('easter')
      })
    })
  })

  describe('Part 2', () => {
    describe('findLowestCountMessage', () => {
      it('should find the message based on low-count letters', () => {
        expect(findLowestCountMessage(inputs.get('DEMO_1')!).answer2).toEqual('advent')
      })
    })
  })
})
