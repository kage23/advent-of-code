import inputs from '../../inputs/2023/day20'
import { DayConfig } from '../../routes/Day'

type Pulse = 'high' | 'low'

class SandMachine {
  sendQueue: [string, Pulse, string][] // [from, Pulse, to]
  modules: Map<string, Module>
  buttonPresses: number

  constructor(input: string) {
    this.sendQueue = []
    this.modules = new Map()
    this.buttonPresses = 0

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
        destModule?.inputs.push(module.id)
        if (destModule instanceof Conjunction) {
          destModule.memory.push([module.id, 'low'])
        }
      })
    })
  }

  pushButton(idsToLookForLowFrom?: string[]) {
    const sawPulses: string[] = []
    this.buttonPresses++
    this.sendQueue.push(['button', 'low', 'broadcaster'])
    while (this.sendQueue.length) {
      const [from, pulse, to] = this.sendQueue.shift()!
      if (idsToLookForLowFrom?.includes(from) && pulse === 'low')
        sawPulses.push(from)
      if (pulse === 'high') highPulseCount++
      else lowPulseCount++
      const module = this.modules.get(to)
      if (module) {
        module.onReceive(pulse, from)
      }
    }
    return {
      buttonPresses: this.buttonPresses,
      sawPulses,
    }
  }
}

class Module {
  destinationModules: string[]
  id: string
  inputs: string[]
  machine: SandMachine

  constructor(id: string, destinationModules: string[], machine: SandMachine) {
    this.id = id
    this.destinationModules = destinationModules
    this.machine = machine
    this.inputs = []
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
  memory: [string, Pulse][]

  constructor(id: string, destinationModules: string[], machine: SandMachine) {
    super(id, destinationModules, machine)

    this.memory = []
  }

  onReceive(pulse: Pulse, from: string) {
    const inputIndex = this.memory.findIndex(([id]) => id === from)
    if (inputIndex === -1) {
      this.memory.push([from, pulse])
    } else {
      this.memory[inputIndex][1] = pulse
    }
    if (
      this.memory.map(([, pulse]) => pulse).every((pulse) => pulse === 'high')
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

export const bespokeSolution = (input: string) => {
  resetMachine(input)
  const finalNode = Array.from(sandMachine.modules.values()).find((module) =>
    module.destinationModules.includes('rx')
  )!
  const importantModules: string[] = []
  finalNode.inputs.forEach((id) => {
    const module = sandMachine.modules.get(id)!
    if (module.inputs.length === 1) {
      importantModules.push(...module.inputs)
    }
  })
  const pulsedLowOn = new Map(importantModules.map((id) => [id, -1]))
  while (Array.from(pulsedLowOn.values()).some((x) => x === -1)) {
    const result = sandMachine.pushButton(importantModules)
    importantModules.forEach((id) => {
      if (result.sawPulses.includes(id)) {
        pulsedLowOn.set(id, result.buttonPresses)
      }
    })
  }
  return { answer2: Array.from(pulsedLowOn.values()).reduce((a, b) => a * b) }
}

const day20: Omit<DayConfig, 'year'> = {
  answer1Text: 'The 1000-press pulse count checksum is answer.',
  answer2Text: 'It will take answer button presses.',
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
      label: 'Bespoke Solution',
      onClick: bespokeSolution,
    },
  ],
  id: 20,
  inputs,
  title: 'Pulse Propagation',
}

export default day20
