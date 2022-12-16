import { useLoaderData } from 'react-router-dom'
import years, { YearConfig } from '../configs/years'

import styles from './Year.module.css'

export async function loader({ params }: { params: any }) {
  const { year } = (params as { [key: string]: string })
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
        Select a day above to see my solution for that day's challenges. Check
        out my overall year progress:
      </p>
      <img
        alt="screenshot of cover from Advent of Code website"
        className={styles.cover}
        src={cover}
      />
      <p>{extraText}</p>
    </>
  )
}

export default Year
