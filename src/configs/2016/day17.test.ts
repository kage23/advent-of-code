import { findLongestVaultPath, findShortestVaultPath } from './day17'

describe('2016 Day 17', () => {
  describe('Part 1', () => {
    describe('findShortestVaultPath', () => {
      it('should determine the shortest path to the vault', () => {
        expect(findShortestVaultPath('DEMO_1').answer1).toEqual(
          'There is no path!'
        )
        expect(findShortestVaultPath('DEMO_2').answer1).toEqual('DDRRRD')
        expect(findShortestVaultPath('DEMO_3').answer1).toEqual('DDUDRLRRUDRD')
        expect(findShortestVaultPath('DEMO_4').answer1).toEqual(
          'DRURDRUDDLLDLUURRDULRLDUUDDDRR'
        )
      })
    })
  })

  describe('Part 2', () => {
    describe('findLongestVaultPath', () => {
      it('should determine the length of the longest vault path', () => {
        expect(findLongestVaultPath('DEMO_1').answer2).toEqual(
          'There is no path!'
        )
        expect(findLongestVaultPath('DEMO_2').answer2).toEqual(370)
        expect(findLongestVaultPath('DEMO_3').answer2).toEqual(492)
        expect(findLongestVaultPath('DEMO_4').answer2).toEqual(830)
      })
    })
  })
})
