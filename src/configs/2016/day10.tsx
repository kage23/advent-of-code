import inputs from '../../inputs/2016/day10'
import { DayConfig } from '../../routes/Day'

interface Bot {
  id: number
  numbers?: number[]
  low?: { to: 'bot' | 'output'; id: number }
  high?: { to: 'bot' | 'output'; id: number }
}

const getBots = (input: string): Bot[] => {
  const bots: Bot[] = []

  input
    .split('\n')
    .forEach((line) => {
      const botId = parseInt(line.split('bot ')[1])
      const bot = bots.find((bot) => bot.id === botId) || { id: botId }
      if (line.startsWith('value')) {
        const value = parseInt(line.split('value ')[1])
        if (!bot.numbers) bot.numbers = []
        if (bot.numbers) bot.numbers.push(value)
      } else {
        if (line.split('gives low to ')[1].startsWith('bot')) {
          bot.low = {
            to: 'bot',
            id: parseInt(line.split('gives low to bot ')[1]),
          }
        }
        if (line.split('gives low to ')[1].startsWith('output')) {
          bot.low = {
            to: 'output',
            id: parseInt(line.split('gives low to output ')[1]),
          }
        }
        if (line.split('and high to ')[1].startsWith('bot')) {
          bot.high = {
            to: 'bot',
            id: parseInt(line.split('and high to bot ')[1]),
          }
        }
        if (line.split('and high to ')[1].startsWith('output')) {
          bot.high = {
            to: 'output',
            id: parseInt(line.split('and high to output ')[1]),
          }
        }
      }
      bots.push(bot)
    })

  return bots
}

export const runBots = (input: string, comparisonNumbers = [17, 61]) => {
  const bots = getBots(input)
  const outputs: Map<number, number> = new Map()
  let answer1: undefined | number

  while (bots.some((bot) => (bot.numbers ? bot.numbers.length === 2 : false))) {
    for (const bot of bots) {
      if (!bot.numbers || bot.numbers.length !== 2) continue
      const low = Math.min(...bot.numbers)
      const high = Math.max(...bot.numbers)
      bot.numbers = []
      if (bot.low) {
        const botLowId = bot.low.id
        if (bot.low.to === 'bot') {
          const toBotLow = bots.find((findBot) => findBot.id === botLowId)
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
          const toBotHigh = bots.find((findBot) => findBot.id === botHighId)
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
        answer1 = bot.id
      }
      break
    }
  }

  return {
    answer1: answer1!,
    answer2:
      (outputs.get(0) || 1) * (outputs.get(1) || 1) * (outputs.get(2) || 1),
  }
}

const day10: Omit<DayConfig, 'year'> = {
  answer1Text: 'The number of the designated bot is answer.',
  answer2Text:
    'The value of outputs 0, 1, and 2 multiplied by each other is answer.',
  buttons: [
    {
      label: 'Run Bots',
      onClick: runBots,
    },
  ],
  id: 10,
  inputs,
  title: 'Balance Bots',
}

export default day10
