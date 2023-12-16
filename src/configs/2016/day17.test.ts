import inputs from '../../inputs/2016/day17'
import { findLongestVaultPath, findShortestVaultPath } from './day17'

describe('2016 Day 17', () => {
  describe('Part 1', () => {
    describe('findShortestVaultPath', () => {
      it('should determine the shortest path to the vault', () => {
        expect(findShortestVaultPath(inputs.get('DEMO_1')!).answer1).toEqual(
          'There is no path!'
        )
        expect(findShortestVaultPath(inputs.get('DEMO_2')!).answer1).toEqual('DDRRRD')
        expect(findShortestVaultPath(inputs.get('DEMO_3')!).answer1).toEqual('DDUDRLRRUDRD')
        expect(findShortestVaultPath(inputs.get('DEMO_4')!).answer1).toEqual(
          'DRURDRUDDLLDLUURRDULRLDUUDDDRR'
        )
      })
    })
  })

  describe('Part 2', () => {
    describe('findLongestVaultPath', () => {
      it('should determine the length of the longest vault path', () => {
        expect(findLongestVaultPath(inputs.get('DEMO_1')!).answer2).toEqual(
          'There is no path!'
        )
        expect(findLongestVaultPath(inputs.get('DEMO_2')!).answer2).toEqual(370)
        expect(findLongestVaultPath(inputs.get('DEMO_3')!).answer2).toEqual(492)
        expect(findLongestVaultPath(inputs.get('DEMO_4')!).answer2).toEqual(830)
      })
    })
  })
})
