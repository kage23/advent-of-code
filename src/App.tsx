import React, { Component } from 'react'
import { INPUT } from './Input'

class App extends Component<{}, {
  input: string
}> {
  constructor(props: {}) {
    super(props)

    this.state = {
      input: ''
    }
  }

  handleInputChange = (key: string) => {
    this.setState({
      input: key
    })
  }

  render() {
    const { input } = this.state

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
        <p>These are some of the things I wrote for the 2018 Advent of Code project. I completed the whole thing (hopefully, at least - I'm writing this on the 19th!) but I didn't start saving them to Github until I was a ways into them! Anyway, check out the different branches for the different days.</p>
        {inputSelectors.length > 0 && (
          <fieldset>{inputSelectors}</fieldset>
        )}
        <p>Bonus Items:</p>
        <ul>
          <li>Re-create Days 1-14 and put them on GitHub. (I'm pretty sure at least one of them is still on my laptop in the checkers-fe project.)</li>
          <li>Render the map for Day 20.</li>
        </ul>
      </div>
    );
  }
}

export default App