import React, { Component } from 'react';

class App extends Component<{}, {}> {
  render() {
    return (
      <div
        style={{
          fontFamily: '"Source Code Pro", monospace',
          fontSize: '15px'
        }}
      >
        <p>These are some of the things I wrote for the 2018 Advent of Code project. I completed the whole thing (hopefully, at least - I'm writing this on the 19th!) but I didn't start saving them to Github until I was a ways into them! Anyway, check out the different branches for the different days.</p>
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