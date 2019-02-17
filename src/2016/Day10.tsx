import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from './Input/Day10'

interface IBot {
  id: number
  numbers?: number[]
  low?: { to: 'bot' | 'output', id: number }
  high?: { to: 'bot' | 'output', id: number }
}

const getBots = (inputKey: string): Map<number, IBot> => {
  const bots: Map<number, IBot> = new Map()

  INPUT[inputKey].split('\n').forEach(line => {
    const botId = parseInt(line.split('bot ')[1])
    const bot = bots.get(botId) || { id: botId }
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
    bots.set(botId, bot)
  })

  return bots
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Bot',
    onClick: inputKey => {
      const outputs: Map<number, number> = new Map()
      const bots = getBots(inputKey)
      let answer1: false | string = false

      const comparisonNumbers = inputKey.indexOf('DEMO') !== -1
        ? [2, 5]
        : [17, 61]

      while (!answer1) {
        botLoop:
        for (const bot of bots.values()) {
          if (!bot.numbers || bot.numbers.length !== 2) continue botLoop
          const low = Math.min(...bot.numbers)
          const high = Math.max(...bot.numbers)
          bot.numbers = []
          if (bot.low) {
            if (bot.low.to === 'bot') {
              const toBotLow = bots.get(bot.low.id)
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
              const toBotHigh = bots.get(bot.high.id)
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
          break botLoop
        }
      }

      return {
        answer1
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
      <code>{answer}</code>
    </span>
  ),
  buttons: BUTTONS,
  day: 10,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Balance Bots'
}

export default config