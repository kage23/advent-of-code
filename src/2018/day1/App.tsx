import React, { Component } from 'react'
import INPUT from './Input'

class App extends Component<{}, {
  answer1: number | false
  answer2: number | false
  input: string
}> {
  constructor(props: {}) {
    super(props)

    this.state = {
      answer1: false,
      answer2: false,
      input: ''
    }
  }

  handleInputChange = (key: string) => {
    this.setState({
      answer1: false,
      answer2: false,
      input: key
    })
  }

  part1 = () => {
    const { input } = this.state
    this.setState({ answer1: part1(input) })
  }

  part2 = () => {
    const { input } = this.state
    this.setState({ answer2: part2(input) })
  }

  part2__slow = () => {
    const { input } = this.state
    this.setState({ answer2: part2__slow(input) })
  }

  render() {
    const {
      answer1,
      answer2,
      input
    } = this.state

    const inputSelectors = []

    for (const key of Object.keys(INPUT)) {
      inputSelectors.push(([
        <label key={key}>
          <input
            type="radio"
            name="inputType"
            value={key}
            checked={input === key}
            onChange={() => this.handleInputChange(key) }
          />
          {key}
        </label>,
        ' '
      ]))
    }

    return (
      <div
        style={{
          fontFamily: '"Source Code Pro", monospace',
          fontSize: '15px'
        }}
      >
        <p>--- Day 1: Chronal Calibration ---</p>
        {inputSelectors.length > 0 && (
          <fieldset>{inputSelectors}</fieldset>
        )}
        <fieldset>
          <button onClick={this.part1}>Solve Part 1</button>
          {' '}
          <button onClick={this.part2}>Solve Part 2</button>
          {' '}
          <button onClick={this.part2__slow}>Solve Part 2 Slowly</button>
        </fieldset>
        <fieldset>
          {typeof answer1 === 'number' ? <span>The frequency is {answer1}.</span> : <span>&nbsp;</span>}
          {typeof answer1 === 'number' && typeof answer2 === 'number' ? ' ' : <span>&nbsp;</span>}
          {typeof answer2 === 'number' ? <span>The first repeated frequency is {answer2}.</span> : <span>&nbsp;</span>}
        </fieldset>
        <pre>
          {INPUT[input]}
        </pre>
      </div>
    );
  }
}

export default App

const part1 = (inputStr: string, inputNum?: number): number => {
  const input = parseInput(inputStr)
  let count = inputNum || 0
  input.forEach(n => count += n)
  return count
}

const part2 = (inputStr: string): number => {
  const startTime = new Date().getTime()
  const input = parseInput(inputStr)
  const n = input.length
  let freq = 0
  let foundFreqs: boolean[] = []
  let i = 0
  while(!foundFreqs[freq]) {
    foundFreqs[freq] = true
    freq += input[i]
    i += 1
    if (i >= n) i = 0
  }
  const endTime = new Date().getTime()
  console.log(`Start time: ${startTime}. End time: ${endTime}. Total duration: ${endTime - startTime}.`)
  return freq
}

const part2__slow = (inputStr: string): number => {
  const startTime = new Date().getTime()
  const input = parseInput(inputStr)
  const n = input.length
  let freq = 0
  let foundFreqs: number[] = []
  let i = 0
  while (foundFreqs.indexOf(freq) === -1) {
    foundFreqs.push(freq)
    freq += input[i]
    i = i + 1 < n ? i + 1 : 0
  }
  const endTime = new Date().getTime()
  console.log(`Start time: ${startTime}. End time: ${endTime}. Total duration: ${endTime - startTime}.`)
  return freq
}

const parseInput = (input: string): number[] => INPUT[input].split('\n').map(a => parseInt(a))