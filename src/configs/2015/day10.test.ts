import inputs from '../../inputs/2015/day10'
import { doLookAndSay } from './day10'

describe('2015 Day 10', () => {
  describe('Part 1', () => {
    describe('doLookAndSay', () => {
      it('should do a Look-And-Say', () => {
        expect(doLookAndSay(inputs.get('DEMO_1')!)).toEqual('11')
        expect(doLookAndSay(inputs.get('DEMO_2')!)).toEqual('21')
        expect(doLookAndSay(inputs.get('DEMO_3')!)).toEqual('1211')
        expect(doLookAndSay(inputs.get('DEMO_4')!)).toEqual('111221')
        expect(doLookAndSay(inputs.get('DEMO_5')!)).toEqual('312211')
      })
    })
  })
})
