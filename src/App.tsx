import React, { Component } from 'react'
import {
  IDayConfig,
  YEARS
} from './Config'

class App extends Component<{}, {
  answer1: false | string | JSX.Element
  answer2: false | string | JSX.Element
  day: number
  inputKey: string
  year: number
  other?: any
}> {
  constructor(props: {}) {
    super(props)

    this.state = {
      answer1: false,
      answer2: false,
      day: 0,
      inputKey: '',
      year: 0
    }
  }

  handleButtonClick = (onClick: (input: string) => {
    answer1?: string | JSX.Element
    answer2?: string | JSX.Element
  }) => {
    const {
      answer1,
      answer2,
      inputKey
    } = this.state

    const result = onClick(inputKey)

    this.setState({
      answer1: typeof result.answer1 !== 'undefined' ? result.answer1 : answer1,
      answer2: typeof result.answer2 !== 'undefined' ? result.answer2 : answer2
    })
  }

  handleDayChange = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState({
      answer1: false,
      answer2: false,
      day: parseInt(e.currentTarget.value),
      inputKey: ''
    })
  }

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      answer1: false,
      answer2: false,
      inputKey: e.currentTarget.value
    })
  }

  handleYearChange = (e: React.FormEvent<HTMLSelectElement>) => {
    this.setState({
      answer1: false,
      answer2: false,
      day: 0,
      inputKey: '',
      year: parseInt(e.currentTarget.value)
    })
  }

  reset = () => this.setState({ year: 0, day: 0})

  setOther = (other: any) => this.setState({ other })

  render() {
    const {
      answer1,
      answer2,
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
            <a onClick={this.reset}>Advent of Code</a>
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
          {!yearConfig && (
            <p>
              Check out my solutions for the{' '}
              <a
                target="_blank"
                href="https://adventofcode.com"
              >
                Advent of Code
              </a>
              {' '}challenges! To get started, select a year and day above.{' '}
              Please note that there's no way for you to enter your custom unique{' '}
              puzzle inputs into my UI here ... If you want to use my package to solve{' '}
              the challenges and <span style={{ textDecoration: 'line-through' }}>earn</span>{' '}
              get your stars, you're going to have to go get{' '}
              <a href="https://github.com/kage23/advent-of-code">the project repository</a>{' '}
              and figure it out!
            </p>
          )}
          {yearConfig && !dayConfig && (
            <div>
              <p>
                Welcome to my {year} Advent of Code solution suite! Select a day above to see my solution{' '}
                for that day's challenges. Check out my overall year progress:
              </p>
              <img
                className="year-cover-image"
                src={yearConfig.cover}
              />
              {yearConfig.extraText && <p>{yearConfig.extraText}</p>}
            </div>
          )}
          {dayConfig && (
            <div>
              <div className="control-boxes">
                <fieldset className="input-selector">
                  <label className="input-selector__label">
                    Select an input:
                  </label>
                  {inputSelectors}
                </fieldset>
                {dayConfig.buttons.length > 0 && (
                  <fieldset className="control-buttons">
                    {dayConfig.buttons.map((buttonConfig, i) => (
                      <button
                        key={i}
                        onClick={() => this.handleButtonClick(buttonConfig.onClick)}
                        disabled={inputKey.length === 0}
                      >
                        {buttonConfig.label}
                      </button>
                    ))}
                  </fieldset>
                )}
                {(
                  (answer1 !== false && typeof answer1 !== 'undefined')
                  || (answer2 !== false && typeof answer2 !== 'undefined')
                ) && (
                  <div className="answers">
                    {answer1 !== false && typeof answer1 !== 'undefined' && (
                      <fieldset>
                        <p>
                          Answer 1:{' '}
                          {dayConfig.answer1Text(answer1, inputKey)}
                        </p>
                      </fieldset>
                    )}
                    {answer2 !== false && typeof answer2 !== 'undefined' && (
                      <fieldset>
                        <p>
                          Answer 2:{' '}
                          {dayConfig.answer2Text(answer2, inputKey)}
                        </p>
                      </fieldset>
                    )}
                  </div>
                )}
              </div>
              {inputKey.length > 0 && dayConfig.renderDay(dayConfig, inputKey, answer1, answer2, this.setOther)}
            </div>
          )}
        </article>
      </div>
    );
  }
}

export default App