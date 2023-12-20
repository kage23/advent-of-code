import inputs from '../../inputs/2023/day20'
import { DayConfig } from '../../routes/Day'

type Pulse = 'high' | 'low'

class SandMachine {
  sendQueue: [string, Pulse, string][] // [from, Pulse, to]
  modules: Map<string, Module>

  constructor(input: string) {
    this.sendQueue = []
    this.modules = new Map()

    input.split('\n').forEach((line) => {
      const [id, destinations] = line.split(' -> ')
      if (id === 'broadcaster') {
        this.modules.set(id, new Broadcast(destinations.split(', '), this))
      } else if (id.startsWith('%')) {
        this.modules.set(
          id.slice(1),
          new FlipFlop(id.slice(1), destinations.split(', '), this)
        )
      } else if (id.startsWith('&')) {
        this.modules.set(
          id.slice(1),
          new Conjunction(id.slice(1), destinations.split(', '), this)
        )
      }
    })

    this.modules.forEach((module) => {
      module.destinationModules.forEach((destId) => {
        const destModule = this.modules.get(destId)
        if (destModule instanceof Conjunction) {
          destModule.inputs.push([module.id, 'low'])
        }
      })
    })
  }

  pushButton() {
    let lowRxPulses = 0
    this.sendQueue.push(['button', 'low', 'broadcaster'])
    while (this.sendQueue.length) {
      const [from, pulse, to] = this.sendQueue.shift()!
      if (pulse === 'high') highPulseCount++
      else lowPulseCount++
      if (pulse === 'low' && to === 'rx') lowRxPulses++
      const module = this.modules.get(to)
      if (module) {
        module.onReceive(pulse, from)
      } else {
        console.log(`Module ${to} received a ${pulse} pulse.`)
      }
    }
    return lowRxPulses
  }
}

class Module {
  destinationModules: string[]
  id: string
  machine: SandMachine

  constructor(id: string, destinationModules: string[], machine: SandMachine) {
    this.id = id
    this.destinationModules = destinationModules
    this.machine = machine
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  onReceive(pulse: Pulse, from: string) {}

  send(pulse: Pulse) {
    this.destinationModules.forEach((id) => {
      this.machine.sendQueue.push([this.id, pulse, id])
    })
  }
}

// prefix %
class FlipFlop extends Module {
  value: 'on' | 'off'

  constructor(id: string, destinationModules: string[], machine: SandMachine) {
    super(id, destinationModules, machine)
    this.value = 'off'
  }

  onReceive(pulse: Pulse) {
    if (pulse === 'low') {
      this.value = this.value === 'off' ? 'on' : 'off'
      this.send(this.value === 'on' ? 'high' : 'low')
    }
  }
}

// prefix &
class Conjunction extends Module {
  inputs: [string, Pulse][]

  constructor(id: string, destinationModules: string[], machine: SandMachine) {
    super(id, destinationModules, machine)

    this.inputs = []
  }

  onReceive(pulse: Pulse, from: string) {
    const inputIndex = this.inputs.findIndex(([id]) => id === from)
    if (inputIndex === -1) {
      this.inputs.push([from, pulse])
    } else {
      this.inputs[inputIndex][1] = pulse
    }
    if (
      this.inputs.map(([, pulse]) => pulse).every((pulse) => pulse === 'high')
    ) {
      this.send('low')
    } else {
      this.send('high')
    }
  }
}

// Just one of these
class Broadcast extends Module {
  constructor(destinationModules: string[], machine: SandMachine) {
    super('broadcaster', destinationModules, machine)
  }

  onReceive(pulse: Pulse): void {
    this.send(pulse)
  }
}

let sandMachine = new SandMachine('')
let lowPulseCount = 0
let highPulseCount = 0

export const resetMachine = (input: string) => {
  sandMachine = new SandMachine(input)
  lowPulseCount = 0
  highPulseCount = 0

  console.log('Sand Machine', sandMachine)

  return {
    specialRender: 'Sand machine reset.',
  }
}

export const pushButtonOnce = () => {
  return { extra: sandMachine.pushButton() }
}

export const pushButton1000Times = (input: string) => {
  resetMachine(input)
  for (let i = 0; i < 1000; i++) pushButtonOnce()
  return { answer1: lowPulseCount * highPulseCount }
}

export const activateModuleRx = (input: string) => {
  resetMachine(input)
  let buttonPushes = 0
  let lowRxPulses = 0
  while (lowRxPulses !== 1) {
    lowRxPulses = pushButtonOnce().extra
    buttonPushes++
  }
  return { answer2: buttonPushes }
}

const day20: Omit<DayConfig, 'year'> = {
  answer1Text: 'The good parts total value is answer.',
  answer2Text:
    'There are answer distinct combinations of ratings that will be accepted.',
  buttons: [
    {
      label: 'Reset Sand Machine',
      onClick: resetMachine,
    },
    {
      label: 'Push Button Once',
      onClick: pushButtonOnce,
    },
    {
      label: 'Push Button 1000 Times',
      onClick: pushButton1000Times,
    },
    {
      label: 'Activate Module RX',
      onClick: activateModuleRx,
    },
  ],
  id: 20,
  inputs,
  title: 'Pulse Propagation',
}

export default day20
