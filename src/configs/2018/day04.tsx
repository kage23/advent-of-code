import inputs from '../../inputs/2018/day04'
import { DayConfig } from '../../routes/Day'

const parseInput = (input: string) =>
  input.split('\n').sort((a, b) => (a < b ? -1 : 1))

export const strategy1 = (input: string) => {
  const records = parseInput(input)
  const guardSleepyMinutesMap: number[][] = []
  let currentGuardId = 0
  let sleepMinute = 0
  let wakeMinute = 0

  for (const record of records) {
    if (record.indexOf('begins shift') !== -1) {
      currentGuardId = parseInt(record.slice(record.indexOf('#') + 1))
      if (!guardSleepyMinutesMap[currentGuardId])
        guardSleepyMinutesMap[currentGuardId] = []
    } else if (record.indexOf('falls asleep') !== -1) {
      sleepMinute = parseInt(record.slice(record.indexOf(':') + 1))
      wakeMinute = 0
    } else if (record.indexOf('wakes up') !== -1) {
      wakeMinute = parseInt(record.slice(record.indexOf(':') + 1))
      for (let x = sleepMinute; x < wakeMinute; x++) {
        if (!guardSleepyMinutesMap[currentGuardId][x])
          guardSleepyMinutesMap[currentGuardId][x] = 0
        guardSleepyMinutesMap[currentGuardId][x]++
      }
      sleepMinute = 0
      wakeMinute = 0
    }
  }
  let mostSleepMinutes = 0
  const sleepiestGuard = guardSleepyMinutesMap.reduce(
    (sleepiest, current, index) => {
      const sleepMinutes = current.reduce(
        (total, currentMinute) => total + (currentMinute || 0),
        0
      )
      if (sleepMinutes > mostSleepMinutes) {
        mostSleepMinutes = sleepMinutes
        return index
      }
      return sleepiest
    },
    0
  )
  let bestTimesAsleepPerMinute = 0
  const sleepiestMinute = guardSleepyMinutesMap[sleepiestGuard].reduce(
    (bestMinute, timesAsleep, currentMinute) => {
      if (timesAsleep > bestTimesAsleepPerMinute) {
        bestTimesAsleepPerMinute = timesAsleep
        return currentMinute
      }
      return bestMinute
    },
    0
  )

  return {
    answer1: sleepiestGuard * sleepiestMinute,
  }
}

const pathKey = (id: number, minute: number): string => `${id}_${minute}`

const unPathKey = (input: string): { id: number; minute: number } => {
  const [id, minute] = input.split('_')
  return { id: parseInt(id), minute: parseInt(minute) }
}

export const strategy2 = (input: string) => {
  const records = parseInput(input)
  const guardSleepMinuteCount: { [key: string]: number } = {}

  let currentGuardId = 0
  let sleepMinute = 0
  let wakeMinute = 0
  for (const record of records) {
    if (record.indexOf('begins shift') !== -1)
      currentGuardId = parseInt(record.slice(record.indexOf('#') + 1))
    else if (record.indexOf('falls asleep') !== -1)
      sleepMinute = parseInt(record.slice(record.indexOf(':') + 1))
    else if (record.indexOf('wakes up') !== -1) {
      wakeMinute = parseInt(record.slice(record.indexOf(':') + 1))
      for (let x = sleepMinute; x < wakeMinute; x++) {
        if (
          typeof guardSleepMinuteCount[pathKey(currentGuardId, x)] ===
          'undefined'
        )
          guardSleepMinuteCount[pathKey(currentGuardId, x)] = 0
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

  return {
    answer2: bestGuardMin.id * bestGuardMin.minute,
  }
}

const day04: Omit<DayConfig, 'year'> = {
  answer1Text: 'The guard ID multiplied by the minute is answer.',
  answer2Text: 'The guard ID multiplied by the minute is answer.',
  buttons: [
    {
      label: 'Solve via Strategy 1',
      onClick: strategy1,
    },
    {
      label: 'Solve via Strategy 2',
      onClick: strategy2,
    },
  ],
  id: 4,
  inputs,
  title: 'Repose Record',
}

export default day04
