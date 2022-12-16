import { Params, useLoaderData } from 'react-router-dom'
import years from '../configs/years'
import { YearConfig } from './Year'

import styles from './Day.module.css'
import { ChangeEvent, ReactNode, useState } from 'react'

type ButtonClickReturn = {
  answer1?: string | number
  answer2?: string | number
} | void

export interface DayConfig {
  answer1Text: (answer: number | string) => ReactNode
  answer2Text: (answer: number | string) => ReactNode
  buttons: {
    label: string
    onClick: (inputKey: string) => ButtonClickReturn
  }[]
  id: number
  inputs: Map<string, string>
  title: string
  year: YearConfig
}

export async function loader({ params }: { params: Params }) {
  const { day, year } = params
  const yearConfig = years.get(Number(year))

  if (!yearConfig) throw new Error(`year not found: ${year}`)

  const { days } = yearConfig
  const dayConfig = days.get(Number(day))

  if (!dayConfig) throw new Error(`day not found: ${year}/day${day}`)

  return { ...dayConfig, year: yearConfig }
}

const Day = () => {
  const {
    answer1Text,
    answer2Text,
    buttons,
    id,
    inputs,
    title,
    year
  } = useLoaderData() as DayConfig

  const [answer1, setAnswer1] = useState<string | number>()
  const [answer2, setAnswer2] = useState<string | number>()
  const [selectedInputKey, setSelectedInputKey] = useState<string>()

  const handleButtonClick = (onClick: (inputKey: string) => ButtonClickReturn) => {
    const result = onClick(selectedInputKey!)

    if (result && result.answer1 !== undefined) setAnswer1(result.answer1)
    if (result && result.answer2 !== undefined) setAnswer2(result.answer2)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSelectedInputKey(value)
    setAnswer1(undefined)
    setAnswer2(undefined)
  }

  const inputSelectors = Array.from(inputs.keys()).map(inputKey => (
    <label key={inputKey} className={styles.label}>
      <input
        className={styles.inputItem}
        type='radio'
        name='inputType'
        value={inputKey}
        checked={selectedInputKey === inputKey}
        onChange={handleInputChange}
      />
      {inputKey}
    </label>
  ))

  return (
    <>
      <h2 className={styles.title}>
        --- Day {id < 10 ? '0' : ''}{id}: {title} ---{' '}
        <a
          className={styles.link}
          rel="noreferrer"
          target="_blank"
          href={`https://adventofcode.com/${year.id}/day/${id}`}
        >
          View Challenge
        </a>
      </h2>
      <div className={styles.controlBoxes}>
        <fieldset className={styles.inputSelector}>
          <label className={styles.label}>
            Select an input:
          </label>
          {inputSelectors}
        </fieldset>
        {buttons.length > 0 && (
          <fieldset className={styles.buttons}>
            {buttons.map(({ label, onClick }, i) => (
              <button
                key={i}
                className={styles.button}
                disabled={selectedInputKey === undefined}
                onClick={() => handleButtonClick(onClick)}
              >
                {label}
              </button>
            ))}
          </fieldset>
        )}
        {(answer1 !== undefined || answer2 !== undefined) && (
          <div className={styles.answers}>
            {answer1 !== undefined && (
              <fieldset className={styles.answer}>
                <p className={styles.answerText}>
                  Answer 1:{' '}
                  {answer1Text(answer1)}
                </p>
              </fieldset>
            )}
            {answer2 !== undefined && (
              <fieldset className={styles.answer}>
                <p className={styles.answerText}>
                  Answer 2:{' '}
                  {answer2Text(answer2)}
                </p>
              </fieldset>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Day
