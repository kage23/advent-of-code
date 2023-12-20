import { YearConfig } from '../routes/Year'
import year2015 from './2015/config'
import year2016 from './2016/config'
import year2017 from './2017/config'
import year2018 from './2018/config'
import year2019 from './2019/config'

const years: Map<number, YearConfig> = new Map([
  [2015, year2015],
  [2016, year2016],
  [2017, year2017],
  [2018, year2018],
  [2019, year2019],
])

export default years
