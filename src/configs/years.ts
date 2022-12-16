import year2015 from './2015/config'

export interface YearConfig {
  cover: string
  extraText: string
  id: number
}

const years: Map<number, YearConfig> = new Map([[2015, year2015]])

export default years
