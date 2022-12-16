import { YearConfig } from '../../routes/Year'
import cover from './cover.png'
import day01 from './day01'

const year2015: YearConfig = {
  cover,
  days: new Map([[1, day01]]),
  extraText: 'Go do it yourself to see the snow and sleigh animated!!',
  id: 2015,
}

export default year2015
