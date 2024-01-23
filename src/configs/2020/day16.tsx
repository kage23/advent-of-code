import inputs from '../../inputs/2020/day16'
import { DayConfig } from '../../routes/Day'

const getTicketErrorRate = (ticket: string, fieldRanges: [number, number][]): number => {
  let errorRate = 0
  ticket.split(',').map(x => parseInt(x)).forEach(value => {
    if (fieldRanges.every(([min, max]) => value < min || value > max)) {
      errorRate += value
    }
  })
  return errorRate
}

export const scanTickets = (input: string) => {
  const [fields, myTicket, nearbyTickets] = input.split('\n\n').map(x => x.split('\n'))

  myTicket.shift()
  nearbyTickets.shift()

  const fieldRanges: [number, number][] = fields.reduce((fieldRanges, field) => {
    const ranges = field.split(': ')[1].split(' or ')

    ranges.forEach(range => {
      const [min, max] = range.split('-')
      fieldRanges.push([parseInt(min), parseInt(max)])
    })

    return fieldRanges
  }, [] as [number, number][])

  return {
    answer1: nearbyTickets.reduce((errorRate, ticket) =>
      errorRate + getTicketErrorRate(ticket, fieldRanges), 0)
  }
}

const getTicketHasError = (ticket: string, fieldRanges: [number, number][]): boolean => {
  let hasError = false
  ticket.split(',').map(x => parseInt(x)).forEach(value => {
    if (fieldRanges.every(([min, max]) => value < min || value > max)) {
      hasError = true
    }
  })
  return hasError
}

export const analyzeTickets = (input: string) => {
  const [fields, myTicket, nearbyTickets] = input.split('\n\n').map(x => x.split('\n'))

  myTicket.shift()
  nearbyTickets.shift()

  const myTicketValues = myTicket[0].split(',').map(x => parseInt(x))
  const fieldRanges: [number, number][] = fields.reduce((fieldRanges, field) => {
    const ranges = field.split(': ')[1].split(' or ')

    ranges.forEach(range => {
      const [min, max] = range.split('-')
      fieldRanges.push([parseInt(min), parseInt(max)])
    })

    return fieldRanges
  }, [] as [number, number][])

  const goodTickets = nearbyTickets.filter(ticket => !getTicketHasError(ticket, fieldRanges)).map(ticket => (
    ticket.split(',').map(x => parseInt(x))
  ))

  let possiblePositions: Array<number[]> = []

  // For the i-th value of each ticket
  for (let i = 0; i < fields.length; i++) {
    if (!possiblePositions[i]) possiblePositions[i] = []

    // We check if the j-th field is a possibility
    for (let j = 0; j < fields.length; j++) {
      const lowerRange = fieldRanges[j * 2]
      const upperRange = fieldRanges[(j * 2) + 1]

      if (goodTickets.every(ticket => {
        const value = ticket[i]
        return (
          (value >= lowerRange[0] && value <= lowerRange[1]) ||
          (value >= upperRange[0] && value <= upperRange[1])
        )
      })) {
        possiblePositions[i].push(j)
      }
    }
  }

  const actualPositions: number[] = Array(myTicketValues.length)

  while (!possiblePositions.every(x => x.length === 0)) {
    const currentPositionIndex = possiblePositions.findIndex(x => x.length === 1)
    const currentPosition = possiblePositions[currentPositionIndex][0]
    actualPositions[currentPositionIndex] = currentPosition
    possiblePositions = possiblePositions.map(x => x.filter(y => y !== currentPosition))
  }

  const values = fields.reduce((values, field, idx) => {
    if (field.startsWith('departure')) {
      const position = actualPositions.findIndex(x => x === idx)
      values.push(BigInt(myTicketValues[position]))
    }
    return values
  }, [] as bigint[])
  // 116807698361 too low

  return {
    answer2: values.reduce((a, b) => a * b, BigInt(1)).toString()
  }
}

const day16: Omit<DayConfig, 'year'> = {
  answer1Text: 'Your ticket scanning error rate is answer.',
  answer2Text: 'Your departure values checker is answer.',
  buttons: [
    {
      label: 'Scan Tickets',
      onClick: scanTickets
    },
    {
      label: 'Analyze Tickets',
      onClick: analyzeTickets
    },
  ],
  id: 16,
  inputs,
  title: 'Ticket Translation',
}

export default day16
