import inputs from '../../inputs/2015/day19'
import { calibrateMachine, generateMolecule } from './day19'

describe('2015 Day 19', () => {
  describe('Part 1', () => {
    describe('calibrateMachine', () => {
      it('should determine how many different molecules can be generated after one replacement step', () => {
        expect(calibrateMachine(inputs.get('DEMO_1_1')!).answer1).toEqual(4)
      })
    })
  })

  describe('Part 2', () => {
    describe('generateMolecule', () => {
      it('should determine how many steps it will take to generate the target molecule', () => {
        expect(generateMolecule(inputs.get('DEMO_2_1')!).answer2).toEqual(3)
        expect(generateMolecule(inputs.get('DEMO_2_2')!).answer2).toEqual(6)
      })
    })
  })
})
