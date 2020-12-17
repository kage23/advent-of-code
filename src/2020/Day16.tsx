import React from 'react'
import {
  defaultRenderDay,
  IButton,
  IDayConfig
} from '../Config'
import { permutatorGenerator } from '../utils/Various'
import INPUT from './Input/Day16'

const getTicketError = (ticket: string, fieldRanges: [number, number][]): number => {
  let errorRate = 0
  ticket.split(',').map(x => parseInt(x)).forEach(value => {
    if (fieldRanges.every(([min, max]) => value < min || value > max)) {
      errorRate += value
    }
  })
  return errorRate
}

const BUTTONS: IButton[] = [
  {
    label: 'Scan Tickets',
    onClick: (inputKey: string) => {
      const [fields, myTicket, nearbyTickets] = INPUT[inputKey].split('\n\n').map(x => x.split('\n'))

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
          errorRate + getTicketError(ticket, fieldRanges), 0).toString()
      }
    }
  },
  {
    label: 'Analyze Tickets',
    onClick: (inputKey: string) => {
      const [fields, myTicket, nearbyTickets] = INPUT[inputKey].split('\n\n').map(x => x.split('\n'))

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

      const goodTickets = nearbyTickets.filter(ticket => getTicketError(ticket, fieldRanges) === 0)
      const allTickets = myTicket.concat(goodTickets)

      for (let possiblePosition of permutatorGenerator(fields.map((field, i) => i))) {
        if (allTickets.every(ticket =>
          ticket.split(',').map(x => parseInt(x)).every((value, i) =>
            (
              value >= fieldRanges[(possiblePosition as number[])[i] * 2][0] &&
              value <= fieldRanges[(possiblePosition as number[])[i] * 2][1]
            ) || (
              value >= fieldRanges[((possiblePosition as number[])[i] * 2) + 1][0] &&
              value <= fieldRanges[((possiblePosition as number[])[i] * 2) + 1][1]
            )
          )
        )) {
          if (inputKey.startsWith('DEMO')) {
            return {
              answer2: 'DEMO'
            }
          } else {
            const departurePositions = possiblePosition.slice(0, 6) as number[]

            return {
              answer2: departurePositions.reduce((value, departurePosition) =>
                value * parseInt(myTicket[0].split(',')[departurePosition]), 1).toString()
            }
          }
        }
      }

      return {}
    }
  }
]

const config: IDayConfig = {
  answer1Text: (answer) => (
    <span>
      Your ticket scanning error rate is <code>{answer}</code>.
    </span>
  ),
  answer2Text: (answer) => (
    <span>
      Your departure values checker is <code>{answer}</code>.
    </span>
  ),
  buttons: BUTTONS,
  day: 16,
  INPUT,
  renderDay: (dayConfig, inputKey) => defaultRenderDay(dayConfig, inputKey),
  title: 'Ticket Translation'
}

export default config