import { checkIPsForSSLSupport, checkIPsForTLSSupport } from './day07'

describe('2016 Day 06', () => {
  describe('Part 1', () => {
    describe('checkIPsForTLSSupport', () => {
      it('should determine how many IPs support TLS', () => {
        expect(checkIPsForTLSSupport('DEMO_1_1').answer1).toEqual(2)
      })
    })
  })

  describe('Part 2', () => {
    describe('checkIPsForSSLSupport', () => {
      it('should determine how many IPs support SSL', () => {
        expect(checkIPsForSSLSupport('DEMO_2_1').answer2).toEqual(3)
      })
    })
  })
})
