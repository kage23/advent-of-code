import { findBestGrid, findBestVariableSizeGrid } from './day11'

describe('2018 Day 11', () => {
  describe('Part 1', () => {
    it('should find the best 3x3 grid', () => {
      expect(findBestGrid('DEMO_1')!.answer1).toEqual('21,186')
      expect(findBestGrid('DEMO_2')!.answer1).toEqual('22,88')
      expect(findBestGrid('DEMO_3')!.answer1).toEqual('20,112')
      expect(findBestGrid('DEMO_4')!.answer1).toEqual('245,33')
    })
  })
  xdescribe('Part 2', () => {
    it('should find the best variable size grid', () => {
      expect(findBestVariableSizeGrid('DEMO_5')!.answer2).toEqual('90,269,16')
      expect(findBestVariableSizeGrid('DEMO_6')!.answer2).toEqual('232,251,12')
    })
  })
})
