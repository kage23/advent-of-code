import { YearConfig } from '../routes/Year'
import year2015 from './2015/config'
import year2016 from './2016/config'

const years: Map<number, YearConfig> = new Map([
  [2015, year2015],
  [2016, year2016],
])

export default years
