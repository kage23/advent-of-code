import inputs from '../../inputs/2016/day05'
import { findBetterPassword, findPassword } from './day05'

// These take 45-60+ seconds each, so we don't run them
xdescribe('2016 Day 05', () => {
  describe('Part 1', () => {
    describe('findPassword', () => {
      it('should find the password for a given room ID', () => {
        expect(findPassword(inputs.get('DEMO_1')!).answer1).toEqual('18f47a30')
      })
    })
  })

  describe('Part 2', () => {
    describe('findBetterPassword', () => {
      it('should find a better password for a given room ID', () => {
        expect(findBetterPassword(inputs.get('DEMO_1')!).answer2).toEqual('05ace8e3')
      })
    })
  })
})
