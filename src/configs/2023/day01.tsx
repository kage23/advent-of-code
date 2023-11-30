import inputs from '../../inputs/2023/day01'
import { DayConfig } from '../../routes/Day'

const day01: Omit<DayConfig, 'year'> = {
  answer1Text: 'answer blah blah.',
  answer2Text: 'There are answer blah blahs.',
  buttons: [
    // {
    //   label: 'Find Programs Connected to 0',
    //   onClick: findConnectedToZero,
    // },
    // {
    //   label: 'Count Groups',
    //   onClick: countGroups,
    // },
  ],
  id: 1,
  inputs,
  title: 'Title Goes Here',
}

export default day01
