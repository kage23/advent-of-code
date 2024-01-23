import { findBestFightOnHard, findBestFightPart1 } from './day22'

// No demos so no tests
xdescribe('2015 Day 22', () => {
  describe('Part 1', () => {
    describe('findBestFightPart1', () => {
      it('should determine the least mana necessary to win the fight', () => {
        expect(findBestFightPart1('').answer1).toEqual(953)
      })
    })
  })

  describe('Part 2', () => {
    describe('findBestFightOnHard', () => {
      it('should determine the least mana necessary to win the fight on hard mode', () => {
        expect(findBestFightOnHard('').answer2).toEqual(1289)
      })
    })
  })
})
