import inputs from '../../inputs/2015/day11'
import { isViablePassword, findNextViablePassword } from './day11'

describe('2015 Day 11', () => {
  it('should determine if a potential password is viable', () => {
    expect(isViablePassword(inputs.get('DEMO_1')!)).toBeFalsy()
    expect(isViablePassword(inputs.get('DEMO_2')!)).toBeFalsy()
    expect(isViablePassword(inputs.get('DEMO_3')!)).toBeFalsy()
    expect(isViablePassword('abcdffaa')).toBeTruthy()
    expect(isViablePassword('ghjaabcc')).toBeTruthy()
  })

  it('should find the next viable password', () => {
    expect(findNextViablePassword('DEMO_4').answer1).toEqual('abcdffaa')
    expect(findNextViablePassword('DEMO_5').answer1).toEqual('ghjaabcc')
  })
})
