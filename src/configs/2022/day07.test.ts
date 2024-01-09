import inputs from '../../inputs/2022/day07'
import { analyzeDiskSpace, chooseDirectoryToDelete } from './day07'

describe('2022 Day 07', () => {
  describe('Part 1', () => {
    it('should find the size of the smallest directories', () => {
      expect(analyzeDiskSpace(inputs.get('DEMO')!).answer1).toEqual(95437)
    })
  })
  describe('Part 2', () => {
    it('should find the size of the directory to delete', () => {
      expect(chooseDirectoryToDelete(inputs.get('DEMO')!).answer2).toEqual(24933642)
    })
  })
})
