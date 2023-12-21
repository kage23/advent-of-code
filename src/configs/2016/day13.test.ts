import inputs from '../../inputs/2016/day13'
import { countLocations, findShortestPath } from './day13'

describe('2016 Day 13', () => {
  describe('Part 1', () => {
    describe('findShortestPath', () => {
      it('should determine the shortest path to the destination', () => {
        expect(findShortestPath(inputs.get('DEMO_1')!, '7,4').answer1).toEqual(
          11
        )
      })
    })
  })

  describe('Part 2', () => {
    describe('countLocations', () => {
      it('should determine how many squares you can reach in fifty steps', () => {
        expect(countLocations(inputs.get('DEMO_1')!, '7,4').answer2).toEqual(
          151
        )
      })
    })
  })
})
