import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2018/Day04'

let answer1_a = ''
let answer1_b = ''

let answer2_a = ''
let answer2_b = ''

const pathKey = (id: number, minute: number): string => `${id}_${minute}`
const unPathKey = (input: string): { id: number, minute: number } => {
  const [id, minute] = input.split('_')
  return { id: parseInt(id), minute: parseInt(minute) }
}

const parseInput = (input: string) => {
  return input.split('\n')
    .sort((a, b) => a < b ? -1 : 1)
}

const part1 = (inputStr: string) => {
  const records = parseInput(INPUT[inputStr])
  const guardSleepyMinutesMap: number[][] = []
  let currentGuardId = 0
  let sleepMinute = 0
  let wakeMinute = 0

  for (const record of records) {
    if (record.indexOf('begins shift') !== -1) {
      currentGuardId = parseInt(record.slice(record.indexOf('#') + 1))
      if (!guardSleepyMinutesMap[currentGuardId]) guardSleepyMinutesMap[currentGuardId] = []
    } else if (record.indexOf('falls asleep') !== -1) {
      sleepMinute = parseInt(record.slice(record.indexOf(':') + 1))
      wakeMinute = 0
    } else if (record.indexOf('wakes up') !== -1) {
      wakeMinute = parseInt(record.slice(record.indexOf(':') + 1))
      for (let x = sleepMinute; x < wakeMinute; x++) {
        if (!guardSleepyMinutesMap[currentGuardId][x]) guardSleepyMinutesMap[currentGuardId][x] = 0
        guardSleepyMinutesMap[currentGuardId][x]++
      }
      sleepMinute = 0
      wakeMinute = 0
    }
  }
  let mostSleepMinutes = 0
  const sleepiestGuard = guardSleepyMinutesMap.reduce((sleepiest, current, index) => {
    const sleepMinutes = current.reduce((total, currentMinute) => total + (currentMinute || 0), 0)
    if (sleepMinutes > mostSleepMinutes) {
      mostSleepMinutes = sleepMinutes
      return index
    }
    return sleepiest
  }, 0)
  let bestTimesAsleepPerMinute = 0
  const sleepiestMinute = guardSleepyMinutesMap[sleepiestGuard].reduce((bestMinute, timesAsleep, currentMinute) => {
    if (timesAsleep > bestTimesAsleepPerMinute) {
      bestTimesAsleepPerMinute = timesAsleep
      return currentMinute
    }
    return bestMinute
  }, 0)

  answer1_a = sleepiestGuard.toString()
  answer1_b = sleepiestMinute.toString()

  return {
    answer1: (sleepiestGuard * sleepiestMinute).toString()
  }
}

const part2 = (inputStr: string) => {
  const records = parseInput(INPUT[inputStr])
  const guardSleepMinuteCount: { [key: string]: number } = {}

  let currentGuardId = 0
  let sleepMinute = 0
  let wakeMinute = 0
  for (const record of records) {
    if (record.indexOf('begins shift') !== -1) currentGuardId = parseInt(record.slice(record.indexOf('#') + 1))
    else if (record.indexOf('falls asleep') !== -1) sleepMinute = parseInt(record.slice(record.indexOf(':') + 1))
    else if (record.indexOf('wakes up') !== -1) {
      wakeMinute = parseInt(record.slice(record.indexOf(':') + 1))
      for (let x = sleepMinute; x < wakeMinute; x++) {
        if (typeof guardSleepMinuteCount[pathKey(currentGuardId, x)] === 'undefined') guardSleepMinuteCount[pathKey(currentGuardId, x)] = 0
        guardSleepMinuteCount[pathKey(currentGuardId, x)]++
      }
    }
  }

  let highestGuardMinMinutes = 0
  let bestGuardMin = { id: 0, minute: 0 }
  for (const guardMin in guardSleepMinuteCount) {
    if (guardSleepMinuteCount[guardMin] > highestGuardMinMinutes) {
      highestGuardMinMinutes = guardSleepMinuteCount[guardMin]
      bestGuardMin = unPathKey(guardMin)
    }
  }

  answer2_a = bestGuardMin.id.toString()
  answer2_b = bestGuardMin.minute.toString()

  return {
    answer2: (bestGuardMin.id * bestGuardMin.minute).toString()
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Strategy 1',
    onClick: part1
  },
  {
    label: 'Strategy 2',
    onClick: part2
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The sleepiest guard is #<code>{answer1_a}</code>.{' '}
      Their sleepiest minute is <code>{answer1_b}</code>.{' '}
      The solution is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The sleepiest guard-minute is <code>#{answer2_a}-{answer2_b}</code>.
      The solution is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 4,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Repose Record'
}

export default config