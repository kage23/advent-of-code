import React, { Component } from 'react'
import { YEARS } from './Config'

class App extends Component<{}, {
  day: number
  year: number
}> {
  constructor(props: {}) {
    super(props)

    this.state = {
      day: 0,
      year: 0
    }
  }

  handleDayChange = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState({ day: parseInt(e.currentTarget.value) })
  }

  handleYearChange = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState({
      day: 0,
      year: parseInt(e.currentTarget.value)
    })
  }

  render() {
    const {
      day,
      year
    } = this.state

    const yearOptions = YEARS.map(YEAR => (
      <option key={YEAR.year} value={YEAR.year}>{YEAR.year}</option>
    ))

    const yearConfig = YEARS.find(YEAR => YEAR.year === year)
    let dayOptions: JSX.Element[] = []
    if (yearConfig) {
      dayOptions = yearConfig.days.map(day => (
        <option key={day} value={day}>
          {day < 10 ? '0' : ''}{day}
        </option>
      ))
    }

    return (
      <div>
        <header>
          <h1>
            <a>Advent of Code</a>
          </h1>
          <nav>
            <span className="wrapper">
              year=
            </span>
            <select
              onChange={this.handleYearChange}
              value={year}
            >
              <option value={0}>20xx</option>
              {yearOptions}
            </select>
            {' '}
            <span className="wrapper">
              day=
            </span>
            <select
              onChange={this.handleDayChange}
              value={day}
            >
              <option value={0}>xx</option>
              {dayOptions}
            </select>
          </nav>
        </header>
        {(year === 0 || day === 0) && (
          <article>
            <h2>--- Advent of Code ---</h2>
            <p>
              Check out my solutions for the{' '}
              <a href="https://adventofcode.com">Advent of Code</a>
              {' '}challenges! To get started, select a year and day above.
            </p>
          </article>
        )}
      </div>
    );
  }
}

export default App

// const inputSelectors = () => {
//   const { input } = this.state

//   const inputSelectors = []

//   for (const key of Object.keys(INPUT)) {
//     inputSelectors.push(([
//       <label key={key}>
//         <input
//           type="radio"
//           name="inputType"
//           value={key}
//           checked={input === key}
//           onChange={() => this.handleInputChange(key) }
//         />
//         {key}
//       </label>,
//       ' '
//     ]))
//   }

//   return inputSelectors
// }

// {inputSelectors.length > 0 && (
//   <fieldset>{inputSelectors}</fieldset>
// )}