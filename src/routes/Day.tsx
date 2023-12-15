import classnames from 'classnames'
import { Params, useLoaderData } from 'react-router-dom'
import years from '../configs/years'
import { YearConfig } from './Year'

import styles from './Day.module.css'
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'

type ButtonClickReturn = {
  answer1?: string | number
  answer2?: string | number
  specialRender?: ReactNode
} | void

export interface DayConfig {
  answer1Text: string
  answer2Text: string
  buttons: {
    label: string
    onClick: (input: string) => ButtonClickReturn
  }[]
  extra?: () => ReactNode
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
  const { answer1Text, answer2Text, buttons, extra, id, inputs, title, year } = useLoaderData() as DayConfig

  const [answer1, setAnswer1] = useState<string | number>()
  const [answer2, setAnswer2] = useState<string | number>()
  const [paste, setPaste] = useState('')
  const [specialRender, setSpecialRender] = useState<ReactNode>(null)
  const [selectedInputKey, setSelectedInputKey] = useState<string>()

  const getInput = (inputKey: string | undefined, inputs: Map<string, string>) => {
    if (inputKey === undefined) return ''
    if (inputKey !== 'paste') return inputs.get(inputKey)!
    return paste
  }

  const handleButtonClick = (
    onClick: (input: string) => ButtonClickReturn,
    inputKey: string | undefined,
    label: string
  ) => {
    const input = getInput(inputKey, inputs)

    const timerLabel = `Year ${year.id}, Day ${id}, ${label} (${inputKey})`
    console.time(timerLabel)
    const result = onClick(input)
    console.timeEnd(timerLabel)

    if (result && result.answer1 !== undefined) setAnswer1(result.answer1)
    if (result && result.answer2 !== undefined) setAnswer2(result.answer2)
    setSpecialRender(result?.specialRender)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    setSelectedInputKey(value)
    setAnswer1(undefined)
    setAnswer2(undefined)
    setSpecialRender(null)
  }

  const handlePasteChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget
    setPaste(value)
    setAnswer1(undefined)
    setAnswer2(undefined)
    setSpecialRender(null)
  }

  const renderAnswerText = (
    answerText: string,
    actualAnswer: string | number
  ) => {
    const answerTextParts = answerText.split('answer')
    return (
      <span>
        {answerTextParts[0]}
        <code>{actualAnswer}</code>
        {answerTextParts[1]}
      </span>
    )
  }

  const inputSelectors = Array.from(inputs.keys()).map((inputKey) => (
    <label key={inputKey} className={styles.label}>
      <input
        className={styles.inputItem}
        type="radio"
        name="inputType"
        value={inputKey}
        checked={selectedInputKey === inputKey}
        onChange={handleInputChange}
      />
      {inputKey}
    </label>
  ))

  // Reset the state if the day or year changes
  useEffect(() => {
    setAnswer1(undefined)
    setAnswer2(undefined)
    setSpecialRender(null)
    setSelectedInputKey(undefined)
  }, [id, year.id])

  return (
    <>
      <h2 className={styles.title}>
        --- Day {id < 10 ? '0' : ''}
        {id}: {title} ---{' '}
        <a
          className={styles.link}
          rel="noreferrer"
          target="_blank"
          href={`https://adventofcode.com/${year.id}/day/${id}`}
        >
          View Challenge
        </a>
      </h2>
      {extra && <div>{extra()}</div>}
      <div className={styles.controlBoxes}>
        <fieldset className={styles.inputSelector}>
          <label className={styles.label}>Select an input:</label>
          {inputSelectors}
          <label key="paste" className={styles.label}>
            <input
              className={styles.inputItem}
              type="radio"
              name="inputType"
              value="paste"
              checked={selectedInputKey === 'paste'}
              onChange={handleInputChange}
            />
            Paste
          </label>
        </fieldset>
        {buttons.length > 0 && (
          <fieldset className={styles.buttons}>
            {buttons.map(({ label, onClick }, i) => (
              <button
                key={i}
                className={styles.button}
                disabled={selectedInputKey === undefined}
                onClick={() =>
                  handleButtonClick(onClick, selectedInputKey!, label)
                }
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
                  Answer 1: {renderAnswerText(answer1Text, answer1)}
                </p>
              </fieldset>
            )}
            {answer2 !== undefined && (
              <fieldset className={styles.answer}>
                <p className={styles.answerText}>
                  Answer 2: {renderAnswerText(answer2Text, answer2)}
                </p>
              </fieldset>
            )}
          </div>
        )}
      </div>
      {selectedInputKey !== undefined && (
        <div className={styles.renderBox}>
          <div
            className={classnames({ [styles.inputDisplay]: !!specialRender })}
          >
            <h3 className={styles.inputTitle}>Input:</h3>
            {selectedInputKey === 'paste' ? (
              <textarea cols={100} onChange={handlePasteChange} rows={8} />
            ) : (
              <pre className={styles.input}>{inputs.get(selectedInputKey)}</pre>
            )}
          </div>
          {!!specialRender && (
            <div className={styles.specialRender}>{specialRender}</div>
          )}
        </div>
      )}
    </>
  )
}

export default Day
