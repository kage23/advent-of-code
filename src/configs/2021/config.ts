import { YearConfig } from '../../routes/Year'
import cover from './cover.png'
import day01 from './day01'

const year2020: YearConfig = {
  cover,
  days: new Map([
    [1, day01],
  ]),
  extraText: 'Deep sea adventure!',
  id: 2021,
}

export default year2020
