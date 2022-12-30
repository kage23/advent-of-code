import inputs from '../../inputs/2016/day20'
import { DayConfig } from '../../routes/Day'

const generateBannedList = (inputKey: string): number[][] =>
  inputs
    .get(inputKey)!
    .split('\n')
    .map((range) => range.split('-').map((x) => parseInt(x)))
    .sort((a, b) => a[0] - b[0])
    .reduce((list, currentRange) => {
      if (!list.length) {
        list.push(currentRange)
      } else {
        const highest = list[list.length - 1]
        if (currentRange[0] > highest[1] + 1) {
          list.push(currentRange)
        } else {
          highest[1] = Math.max(currentRange[1], highest[1])
        }
      }
      return list
    }, [] as number[][])

export const findLowestUnbannedIP = (inputKey: string) => {
  const bannedRanges = generateBannedList(inputKey)

  return {
    answer1: bannedRanges[0][1] + 1,
  }
}

export const findAllUnbannedIPs = (inputKey: string) => {
  const bannedRanges = generateBannedList(inputKey)
  const upperLimit = inputKey.startsWith('DEMO') ? 9 : 4294967295

  let allowedCount = bannedRanges[0][0]

  for (let i = 1; i < bannedRanges.length; i++) {
    const prevBannedRange = bannedRanges[i - 1]
    const bannedRange = bannedRanges[i]
    allowedCount += bannedRange[0] - prevBannedRange[1] - 1
  }

  allowedCount += upperLimit - bannedRanges[bannedRanges.length - 1][1]

  return {
    answer2: allowedCount,
  }
}

const day20: Omit<DayConfig, 'year'> = {
  answer1Text: 'The lowest unblocked IP value is answer.',
  answer2Text: 'There are answer allowed IPs.',
  buttons: [
    {
      label: 'Find Lowest Unbanned IP',
      onClick: findLowestUnbannedIP,
    },
    {
      label: 'Find All Unbanned IPs',
      onClick: findAllUnbannedIPs,
    },
  ],
  id: 20,
  inputs,
  title: 'Firewall Rules',
}

export default day20
