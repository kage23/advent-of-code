import inputs from '../../inputs/2016/day04'
import { DayConfig } from '../../routes/Day'

const isRealRoom = (room: string): boolean => {
  const letterMap: Map<string, number> = new Map()
  const letterArr: Array<{ letter: string; count: number }> = []

  for (let i = 0; i < room.length; i++) {
    const char = room.charAt(i)

    if (char === '[') break

    if (char.match(/[a-z]/i)) {
      letterMap.set(char, (letterMap.get(char) || 0) + 1)
    }
  }

  for (const [letter, count] of letterMap.entries())
    letterArr.push({ letter, count })

  const topFiveLetters = letterArr
    .sort((a, b) =>
      b.count !== a.count ? b.count - a.count : a.letter > b.letter ? 1 : -1
    )
    .map((x) => x.letter)
    .slice(0, 5)

  const checksum = room.split('[')[1].slice(0, 5).split('')

  return !checksum.some((letter) => topFiveLetters.indexOf(letter) === -1)
}

export const sumRealRooms = (inputKey: string) => ({
  answer1: inputs
    .get(inputKey)!
    .split('\n')
    .filter((room) => isRealRoom(room))
    .map((roomLine) => {
      const split = roomLine.split('-')
      return parseInt(split[split.length - 1])
    })
    .reduce((sum, id) => sum + id, 0),
})

export const decryptRoomName = (encrypted: string) => {
  const split = encrypted.split('-')
  const rotate = parseInt(split[split.length - 1])
  let result = ''

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < encrypted.length; i++) {
    const char = encrypted.charAt(i)

    if (alphabet.indexOf(char) !== -1) {
      result += alphabet[(alphabet.indexOf(char) + rotate) % alphabet.length]
    } else if (char === '-') {
      result += ' '
    } else if (!isNaN(parseInt(char))) break
  }

  return `${rotate}: ${result}`.trim()
}

export const printDecryptedRoomNames = (inputKey: string) => {
  let answer2 = ''

  inputs
    .get(inputKey)!
    .split('\n')
    .filter((room) => isRealRoom(room))
    .forEach((roomLine) => {
      const split = roomLine.split('-')
      const rotate = parseInt(split[split.length - 1])
      let result = ''

      const alphabet = 'abcdefghijklmnopqrstuvwxyz'
      for (let i = 0; i < roomLine.length; i++) {
        const char = roomLine.charAt(i)

        if (alphabet.indexOf(char) !== -1) {
          result +=
            alphabet[(alphabet.indexOf(char) + rotate) % alphabet.length]
        } else if (char === '-') {
          result += ' '
        } else if (!isNaN(parseInt(char))) break
      }

      answer2 += `${rotate}: ${result}\n`
    })

  return {
    answer2: '',
    specialRender: (
      <>
        <h3>Decrypted Room Names:</h3>
        <pre>{answer2}</pre>
      </>
    ),
  }
}

const day04: Omit<DayConfig, 'year'> = {
  answer1Text: 'The sum of the sector IDs of the real rooms is answer.',
  answer2Text: `Hopefully you can find what you're looking for below!`,
  buttons: [
    {
      label: 'Sum Real Rooms',
      onClick: sumRealRooms,
    },
    {
      label: 'Print Decrypted Room Names',
      onClick: printDecryptedRoomNames,
    },
  ],
  id: 4,
  inputs,
  title: 'Security Through Obscurity',
}

export default day04
