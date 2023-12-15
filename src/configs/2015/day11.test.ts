import inputs from '../../inputs/2015/day11'
import { isViablePassword, findNextViablePassword } from './day11'

describe('2015 Day 11', () => {
  describe('isViablePassword', () => {
    it('should determine if a potential password is viable', () => {
      expect(isViablePassword(inputs.get('DEMO_1')!)).toBeFalsy()
      expect(isViablePassword(inputs.get('DEMO_2')!)).toBeFalsy()
      expect(isViablePassword(inputs.get('DEMO_3')!)).toBeFalsy()
      expect(isViablePassword('abcdffaa')).toBeTruthy()
      expect(isViablePassword('ghjaabcc')).toBeTruthy()
    })
  })

  describe('findNextViablePassword', () => {
    it('should find the next viable password', () => {
      expect(findNextViablePassword(inputs.get('DEMO_4')!).answer1).toEqual('abcdffaa')
      expect(findNextViablePassword(inputs.get('DEMO_5')!).answer1).toEqual('ghjaabcc')
    })
  })
})
