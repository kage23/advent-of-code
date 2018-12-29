import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
 } from '../Config'

import INPUT from './Input/Day4'

let answer1_a = ''
let answer1_b = ''

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

const BUTTONS: IButton[] = [
  {
    label: 'Strategy 1',
    onClick: part1
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
      The ID of the only non-overlapping claim is ID #
      <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 4,
  INPUT,
  renderDay: (inputKey) => defaultRenderDay(inputKey),
  title: 'Repose Record'
}

export default config