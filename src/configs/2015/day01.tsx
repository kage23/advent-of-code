import inputs from '../../inputs/2015/day01'
import { DayConfig } from '../../routes/Day'

const day01: Omit<DayConfig, 'year'> = {
  answer1Text: (answer) => (
    <span>
      The instructions take Santa to Floor <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Santa first visits the Basement at Step <code>{answer}</code>.
    </span>
  ),
  buttons: [
    {
      label: 'Follow Instructions',
      onClick: () => {
        return {
          answer1: 0
        }
      },
    },
    {
      label: 'Find Basement',
      onClick: () => {
        return {
          answer2: 5
        }
      },
    },
  ],
  id: 1,
  inputs,
  title: 'Not Quite Lisp',
}

export default day01
