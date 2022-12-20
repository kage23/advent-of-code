import { Params, useLoaderData } from 'react-router-dom'
import years from '../configs/years'
import { DayConfig } from './Day'

import styles from './Year.module.css'

export interface YearConfig {
  cover: string
  days: Map<number, Omit<DayConfig, 'year'>>
  extraText: string
  id: number
}

export async function loader({ params }: { params: Params }) {
  const { year } = params
  const yearConfig = years.get(Number(year))

  if (!yearConfig) throw new Error(`year not found: ${year}`)

  return yearConfig
}

const Year = () => {
  const { cover, extraText, id } = useLoaderData() as YearConfig

  return (
    <>
      <h2 className={styles.title}>
        --- Advent of Code Coding Challenge ---
      </h2>
      <p>
        Welcome to my {id} Advent of Code Coding Challenge solution suite!
        Select a day above to see my solution for that day's challenges.
      </p>
      <p>{extraText}</p>
      <img
        alt="screenshot of cover from Advent of Code website"
        className={styles.cover}
        src={cover}
      />
    </>
  )
}

export default Year
