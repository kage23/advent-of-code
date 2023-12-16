import inputs from '../../inputs/2016/day07'
import { checkIPsForSSLSupport, checkIPsForTLSSupport } from './day07'

describe('2016 Day 07', () => {
  describe('Part 1', () => {
    describe('checkIPsForTLSSupport', () => {
      it('should determine how many IPs support TLS', () => {
        expect(checkIPsForTLSSupport(inputs.get('DEMO_1_1')!).answer1).toEqual(2)
      })
    })
  })

  describe('Part 2', () => {
    describe('checkIPsForSSLSupport', () => {
      it('should determine how many IPs support SSL', () => {
        expect(checkIPsForSSLSupport(inputs.get('DEMO_2_1')!).answer2).toEqual(3)
      })
    })
  })
})
