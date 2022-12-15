import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'

import INPUT from '../Inputs/2021/Day16'

interface Packet {
  body: number | Packet[]
  remainder: string
  typeId: number
  value: number
  version: number
}

const binToDec = (bin: string): number =>
  parseInt(bin, 2)

const hexToBin = (hex: string): string => {
  const hexToBinMap: Map<string, string> = new Map([
    ['0', '0000'],
    ['1', '0001'],
    ['2', '0010'],
    ['3', '0011'],
    ['4', '0100'],
    ['5', '0101'],
    ['6', '0110'],
    ['7', '0111'],
    ['8', '1000'],
    ['9', '1001'],
    ['A', '1010'],
    ['B', '1011'],
    ['C', '1100'],
    ['D', '1101'],
    ['E', '1110'],
    ['F', '1111']
  ])
  return hex.split('').map(h => hexToBinMap.get(h) as string).join('')
}

const decodeThePacket = (bin: string): Packet => {
  const version = binToDec(bin.slice(0, 3))
  const typeId = binToDec(bin.slice(3, 6))
  let body: number | Packet[]
  let remainder: string = bin.slice(6)
  let value: number
  if (typeId === 4) {
    // Literal value
    const longFormBinResult = getLongFormBin(remainder)
    body = binToDec(longFormBinResult.bin)
    remainder = longFormBinResult.remainder
    value = body
  } else {
    // Otherwise, it's an operator
    const lengthTypeId = remainder.charAt(0) as '0' | '1'
    const subpackets = getSubPackets(remainder.slice(1), lengthTypeId)
    body = subpackets.packets
    remainder = subpackets.remainder
    switch (typeId) {
      case 0:
        // Sum packets
        value = body.reduce((sum, packet) => sum + packet.value, 0)
        break

      case 1:
        // Product packets
        value = body.reduce((product, packet) => product * packet.value, 1)
        break

      case 2:
        // Minimum packets
        value = Math.min(...body.map(({ value }) => value))
        break

      case 3:
        // Maximum packets
        value = Math.max(...body.map(({ value }) => value))
        break

      case 5:
        // Greater-than packets
        value = body[0].value > body[1].value ? 1 : 0
        break

      case 6:
        // Less-than packets
        value = body[0].value < body[1].value ? 1 : 0
        break

      case 7:
        // Equal-to packets
        value = body[0].value === body[1].value ? 1 : 0
        break

      default:
        throw new Error('bad typeId')
    }
  }
  return { body, typeId, remainder, value, version }
}

const getLongFormBin = (bodyBin: string): {
  bin: string
  remainder: string
} => {
  let lastGroup = false
  let currentGroup = ''
  let groups: string[] = []

  let i = 0
  for (i = 0; i < bodyBin.length; i++) {
    const char = bodyBin.charAt(i)
    const xi = i % 5
    if (xi === 0) {
      if (char === '0') {
        lastGroup = true
      }
    } else {
      currentGroup += char
      if (xi === 4) {
        groups.push(currentGroup)
        currentGroup = ''
        if (lastGroup) break
      }
    }
  }

  return {
    bin: groups.join(''),
    remainder: bodyBin.slice(i + 1)
  }
}

const getSubPackets = (bodyBin: string, lengthType: '0' | '1'): {
  packets: Packet[]
  remainder: string
} => {
  switch (lengthType) {
    case '0': {
      const packets: Packet[] = []
      // the next 15 bits are a number that represents the
      // total length in bits of the sub-packets contained by this packet.
      const length = binToDec(bodyBin.slice(0, 15))
      let binToParse = bodyBin.slice(15, 15 + length)
      while (binToParse.length) {
        const nextPacket = decodeThePacket(binToParse)
        binToParse = nextPacket.remainder
        packets.push(nextPacket)
      }
      return { packets, remainder: bodyBin.slice(15 + length) }
    }

    case '1': {
      const packets: Packet[] = []
      // the next 11 bits are a number that represents the
      // number of sub-packets immediately contained by this packet.
      const length = binToDec(bodyBin.slice(0, 11))
      let remainder = bodyBin.slice(11)
      while (packets.length !== length) {
        const nextPacket = decodeThePacket(remainder)
        remainder = nextPacket.remainder
        packets.push(nextPacket)
      }

      return { packets, remainder }
    }
  }
}

const getVersionSum = ({ body, version }: Packet): number => {
  if (typeof body === 'number') {
    return version
  }
  return (
    version + body.reduce((versionSum, packet) => versionSum + getVersionSum(packet), 0))
}

const BUTTONS: IButton[] = [
  {
    label: 'Find Packet Sum',
    onClick: (inputKey: string) => {
      const bin = hexToBin(INPUT[inputKey])
      const outerPacket = decodeThePacket(bin)
      const versionSum = getVersionSum(outerPacket)

      return {
        answer1: versionSum.toString()
      }
    }
  },
  {
    label: 'Get the Actual Value',
    onClick: (inputKey: string) => {
      const bin = hexToBin(INPUT[inputKey])
      const outerPacket = decodeThePacket(bin)

      return {
        answer2: outerPacket.value.toString()
      }
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      The version sum of the packet is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      The outermost packet's value is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 16,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Packet Decoder'
}

export default config
