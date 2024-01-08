import { YearConfig } from '../routes/Year'
import year2015 from './2015/config'
import year2016 from './2016/config'
import year2017 from './2017/config'
import year2018 from './2018/config'
import year2019 from './2019/config'
import year2020 from './2020/config'
import year2021 from './2021/config'
import year2022 from './2022/config'

const years: Map<number, YearConfig> = new Map([
  [2015, year2015],
  [2016, year2016],
  [2017, year2017],
  [2018, year2018],
  [2019, year2019],
  [2020, year2020],
  [2021, year2021],
  [2022, year2022],
])

export default years
