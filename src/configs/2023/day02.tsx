import inputs from '../../inputs/2023/day02'
import { DayConfig } from '../../routes/Day'

export const determinePossibleGames = (input: string) => {
  const games = input.split('\n')
  return {
    answer1: games.reduce((sum, gameStr) => {
      const gameId = parseInt(gameStr.split('Game ')[1])
      const draws = gameStr.split(': ')[1].split('; ')
      if (
        draws.every((draw) => {
          const groups = draw.split(', ')
          return groups.every((group) => {
            const [count, color] = group.split(' ')
            switch (color) {
              case 'red': // 12
                return Number(count) <= 12
              case 'green': // 13
                return Number(count) <= 13
              case 'blue': // 14
                return Number(count) <= 14
            }
            return false
          })
        })
      ) {
        return sum + gameId
      }
      return sum
    }, 0),
  }
}

export const determineGamePowers = (input: string) => {
  const games = input.split('\n')
  return {
    answer2: games.reduce((sum, gameStr) => {
      const draws = gameStr.split(': ')[1].split('; ')
      let red = 0
      let green = 0
      let blue = 0
      draws.forEach((draw) => {
        const groups = draw.split(', ')
        groups.forEach((group) => {
          const [count, color] = group.split(' ')
          switch (color) {
            case 'red':
              red = Math.max(red, Number(count))
              break
            case 'green':
              green = Math.max(green, Number(count))
              break
            case 'blue':
              blue = Math.max(blue, Number(count))
              break
          }
        })
      })
      return sum + red * green * blue
    }, 0),
  }
}

const day02: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of the possible game IDs is answer.',
  answer2Text: 'The sum of the game power levels is answer.',
  buttons: [
    {
      label: 'Determine Possible Games',
      onClick: determinePossibleGames,
    },
    {
      label: 'Determine Game Powers',
      onClick: determineGamePowers,
    },
  ],
  id: 2,
  inputs,
  title: 'Cube Conundrum',
}

export default day02
