import React, { Component } from 'react'
import {
  IDayConfig,
  YEARS
} from './Config'

class App extends Component<{}, {
  day: number
  inputKey: string
  year: number
}> {
  constructor(props: {}) {
    super(props)

    this.state = {
      day: 0,
      inputKey: '',
      year: 0
    }
  }

  handleDayChange = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState({
      day: parseInt(e.currentTarget.value),
      inputKey: ''
    })
  }

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      inputKey: e.currentTarget.value
    })
  }

  handleYearChange = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState({
      day: 0,
      inputKey: '',
      year: parseInt(e.currentTarget.value)
    })
  }

  render() {
    const {
      day,
      inputKey,
      year
    } = this.state

    const yearOptions = YEARS.map(YEAR => (
      <option
        key={YEAR.year}
        value={YEAR.year}
      >
        {YEAR.year}
      </option>
    ))
    yearOptions.unshift((
      <option
        key="xx"
        value={0}
      >
        20xx
      </option>
    ))

    const yearConfig = YEARS.find(YEAR => YEAR.year === year)
    let dayOptions: JSX.Element[] = []
    let dayConfig: IDayConfig | undefined = undefined
    if (yearConfig) {
      dayOptions = yearConfig.days.map(DAY => (
        <option
          key={DAY.day}
          value={DAY.day}
        >
          {DAY.day < 10 ? '0' : ''}{DAY.day}
        </option>
      ))
      dayConfig = yearConfig.days.find(fDay => fDay.day === day)
    }
    dayOptions.unshift((
      <option
        key="xx"
        value={0}
      >
        xx
      </option>
    ))

    const inputSelectors: JSX.Element[] = []
    if (dayConfig) {
      const { INPUT } = dayConfig
      for (const key of Object.keys(INPUT)) {
        inputSelectors.push((
          <label
            key={key}
            className="input-selector__item__label"
          >
            <input
              className="input-selector__item__input"
              type="radio"
              name="inputType"
              value={key}
              checked={inputKey === key}
              onChange={this.handleInputChange}
            />
            {key}
          </label>
        ))
      }
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
              {dayOptions}
            </select>
          </nav>
        </header>
        <article>
          <h2>
            ---{' '}
            {dayConfig && dayConfig.title.length > 0
              ? `Day ${day < 10 ? `0${day}` : day}: ${dayConfig.title}`
              : 'Advent of Code'
            }
            {' '}---
            {' '}
            {day > 0 && (
              <a
                target="_blank"
                href={`https://adventofcode.com/${year}/day/${day}`}
              >View Challenge</a>
            )}
          </h2>
          {(year === 0 || day === 0) ? (
            <p>
              Check out my solutions for the{' '}
              <a href="https://adventofcode.com">Advent of Code</a>
              {' '}challenges! To get started, select a year and day above.
            </p>
          ) : (
            <div>
              <div className="control-boxes">
                <fieldset className="input-selector">
                  <label className="input-selector__label">
                    Select an input:
                  </label>
                  {inputSelectors}
                </fieldset>
              </div>
              {dayConfig && inputKey.length > 0 && dayConfig.renderDay(dayConfig.INPUT[inputKey])}
            </div>
          )}
        </article>
      </div>
    );
  }
}

export default App