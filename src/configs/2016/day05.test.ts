import { findBetterPassword, findPassword } from './day05'

describe('2016 Day 05', () => {
  describe('Part 1', () => {
    describe('findPassword', () => {
      it('should find the password for a given room ID', () => {
        expect(findPassword('DEMO_1').answer1).toEqual('18f47a30')
      })
    })
  })

  describe('Part 2', () => {
    describe('findBetterPassword', () => {
      it('should find a better password for a given room ID', () => {
        expect(findBetterPassword('DEMO_1').answer2).toEqual('05ace8e3')
      })
    })
  })
})
