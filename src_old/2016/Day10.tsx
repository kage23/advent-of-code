import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2016/Day10'

interface IBot {
  id: number
  numbers?: number[]
  low?: { to: 'bot' | 'output', id: number }
  high?: { to: 'bot' | 'output', id: number }
}

const getBots = (inputKey: string): IBot[] => {
  const bots: IBot[] = []

  INPUT[inputKey].split('\n').forEach(line => {
    const botId = parseInt(line.split('bot ')[1])
    const bot = bots.find(bot => bot.id === botId) || { id: botId }
    if (line.startsWith('value')) {
      const value = parseInt(line.split('value ')[1])
      if (!bot.numbers) bot.numbers = []
      if (bot.numbers) bot.numbers.push(value)
    } else {
      if (line.split('gives low to ')[1].startsWith('bot')) {
        bot.low = {
          to: 'bot',
          id: parseInt(line.split('gives low to bot ')[1])
        }
      }
      if (line.split('gives low to ')[1].startsWith('output')) {
        bot.low = {
          to: 'output',
          id: parseInt(line.split('gives low to output ')[1])
        }
      }
      if (line.split('and high to ')[1].startsWith('bot')) {
        bot.high = {
          to: 'bot',
          id: parseInt(line.split('and high to bot ')[1])
        }
      }
      if (line.split('and high to ')[1].startsWith('output')) {
        bot.high = {
          to: 'output',
          id: parseInt(line.split('and high to output ')[1])
        }
      }
    }
    bots.push(bot)
  })

  return bots
}

const runBots = (inputKey: string): {
  bots: IBot[]
  outputs: Map<number, number>
  answer1: undefined | string
} => {
  const bots = getBots(inputKey)
  const outputs: Map<number, number> = new Map()
  let answer1: undefined | string = undefined

  const comparisonNumbers = inputKey.indexOf('DEMO') !== -1
    ? [2, 5]
    : [17, 61]

  while (bots.some(bot => bot.numbers ? bot.numbers.length === 2 : false)) {
    for (const bot of bots) {
      if (!bot.numbers || bot.numbers.length !== 2) continue
      const low = Math.min(...bot.numbers)
      const high = Math.max(...bot.numbers)
      bot.numbers = []
      if (bot.low) {
        const botLowId = bot.low.id
        if (bot.low.to === 'bot') {
          const toBotLow = bots.find(findBot => findBot.id === botLowId)
          if (toBotLow) {
            if (!toBotLow.numbers) toBotLow.numbers = []
            toBotLow.numbers.push(low)
          }
        }
        if (bot.low.to === 'output') {
          outputs.set(bot.low.id, low)
        }
      }
      if (bot.high) {
        if (bot.high.to === 'bot') {
          const botHighId = bot.high.id
          const toBotHigh = bots.find(findBot => findBot.id === botHighId)
          if (toBotHigh) {
            if (!toBotHigh.numbers) toBotHigh.numbers = []
            toBotHigh.numbers.push(high)
          }
        }
        if (bot.high.to === 'output') {
          outputs.set(bot.high.id, high)
        }
      }
      if (low === comparisonNumbers[0] && high === comparisonNumbers[1]) {
        answer1 = bot.id.toString()
      }
      break
    }
  }

  return {
    bots,
    outputs,
    answer1
  }
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Bot',
    onClick: inputKey => {
      const { answer1 } = runBots(inputKey)

      return {
        answer1
      }
    }
  },
  {
    label: 'Find Value',
    onClick: inputKey => {
      const { outputs } = runBots(inputKey)

      return {
        answer2: ((outputs.get(0) || 1) * (outputs.get(1) || 1) * (outputs.get(2) || 1)).toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The number of the designated bot is{' '}
      <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The value of outputs <code>0</code>, <code>1</code>, and <code>2</code>{' '}
      multiplied by each other is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Balance Bots'
}

export default config