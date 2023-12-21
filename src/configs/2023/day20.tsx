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

    // this.modules.forEach(module => {
    //   // if (module instanceof FlipFlop) {
    //     // console.log(`Module ${module.id} inputs:`, module.inputs)
    //   // }
    // })
  }

  pushButton(idsToLookForHighFrom?: string[]) {
    const sawPulses: string[] = []
    this.buttonPresses++
    // if (this.buttonPresses % 1000 === 1) console.log(`Button press #${this.buttonPresses} about to happen:`)
    let lowRxPulses = 0
    this.sendQueue.push(['button', 'low', 'broadcaster'])
    while (this.sendQueue.length) {
      const [from, pulse, to] = this.sendQueue.shift()!
      if (idsToLookForHighFrom?.includes(from) && pulse === 'high') sawPulses.push(from)
      if (pulse === 'high') highPulseCount++
      else lowPulseCount++
      if (pulse === 'low' && to === 'rx') lowRxPulses++
      const module = this.modules.get(to)
      if (module) {
        module.onReceive(pulse, from)
      // } else {
        // console.log(`Module ${to} received a ${pulse} pulse.`)
      }
    }
    return {
      buttonPresses: this.buttonPresses,
      lowRxPulses,
      sawPulses
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
    // console.log(`Module ${this.id} inputs:`, this.inputs.map(input => input[1]).join(' '))
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

  // console.log('Sand Machine', sandMachine)

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
    lowRxPulses = pushButtonOnce().extra.lowRxPulses
    buttonPushes++
  }
  return { answer2: buttonPushes }
}

const findLoops = (input: string) => {
  resetMachine(input)
  const allLowsAfterButton = new Map<string, number[]>()

  let node = Array.from(sandMachine.modules.values()).find(module => module.destinationModules.includes('rx'))!

  while ((node as Conjunction).memory.length === 1) {
    node = sandMachine.modules.get((node as Conjunction).memory[0][0])!
  }

  (node as Conjunction).memory.forEach(([id]) => {
    allLowsAfterButton.set(id, [0])
  })

  while (Array.from(allLowsAfterButton.values()).some(x => x.length < 2)) {
    pushButtonOnce()
    sandMachine.modules.forEach((module) => {
      if (module instanceof Conjunction) {
        const prevAllLows = allLowsAfterButton.get(module.id)
        if (prevAllLows !== undefined) {
          if (module.memory.map(([, p]) => p).every(p => p === 'low')) {
            prevAllLows.push(sandMachine.buttonPresses)
          }
        }
      }
    })
  }

  // console.log('allLowsAfterButton', allLowsAfterButton)
}

const calculateCycle = (module: Module, cycles = 1): number => {
  if (module instanceof FlipFlop) {
    // if (module.inputs.length > 1) console.log(`This won't work correctly until I figure out how to handle FlipFlops with multiple inputs`)
    if (module.inputs.length === 0 || (module.inputs.length === 1 && module.inputs[0] === 'broadcaster')) return 2 * cycles
    return 2 * calculateCycle(sandMachine.modules.get(module.inputs[0])!, cycles)
  }
  return cycles
}

const calculateCycles = (input: string, moduleId: string) => {
  resetMachine(input)
  const module = Array.from(sandMachine.modules.values()).find(module => module.destinationModules.includes(moduleId))
  if (module) {
    return calculateCycle(module)
  }
}

export const activateModuleRxReally = (input: string) => ({
  answer2: calculateCycles(input, 'output')
})

const bespokeSolution = (input: string) => {
  resetMachine(input)
  const importantModules = ['jv', 'qs', 'jm', 'pr']
  const pulsedHighOn = new Map(importantModules.map(id => ([id, -1])))
  while (Array.from(pulsedHighOn.values()).some(x => x === -1)) {
    const result = sandMachine.pushButton()
    importantModules.forEach(id => {
      if (result.sawPulses.includes(id)) {
        pulsedHighOn.set(id, result.buttonPresses)
      }
    })
  }
  console.log('pulsedHighOn', pulsedHighOn)
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
      label: 'Activate Module RX',
      onClick: activateModuleRx,
    },
    {
      label: 'Find Loops',
      onClick: findLoops
    },
    {
      label: 'Activate Module RX Really',
      onClick: activateModuleRxReally
    },
    {
      label: 'Bespoke Solution',
      onClick: bespokeSolution
    }
  ],
  extra: () => `Don't press the Activate Module RX button; it'll run for a very long time.`,
  id: 20,
  inputs,
  title: 'Pulse Propagation',
}

export default day20
