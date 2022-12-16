import { ChangeEvent } from 'react'
import {
  Link,
  Outlet,
  useNavigate,
  useRouteLoaderData
} from 'react-router-dom'

import years from '../configs/years'
import { DayConfig } from './Day'
import styles from './Root.module.css'
import { YearConfig } from './Year'

const Root = () => {
  const navigate = useNavigate()
  const year = useRouteLoaderData('year') as YearConfig | undefined
  const dayConfig = useRouteLoaderData('day') as DayConfig | undefined

  const yearConfig = year || dayConfig?.year

  const updateYear = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    navigate(value === '0' ? '/' : `/${value}`)
  }

  const updateDay = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    navigate(
      value === '0' ? `/${yearConfig!.id}` : `/${yearConfig!.id}/day/${value}`
    )
  }

  const yearOptions = Array.from(years.keys()).map(year => (
    <option key={year} value={year}>{year}</option>
  ))

  const dayOptions = yearConfig ? Array.from(yearConfig.days.keys()).map(day => (
    <option key={day} value={day}>
      {day < 10 ? '0' : ''}{day}
    </option>
  )) : null

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <Link className={styles.link} to="/">
            Coding Advent Challenge Solution Suite
          </Link>
        </h1>
        <nav className={styles.nav}>
          <label className={styles.navLabel} htmlFor="yearSelect">
            year=
          </label>
          <select
            id="yearSelect"
            className={styles.navSelect}
            onChange={updateYear}
            value={yearConfig?.id || dayConfig?.year.id || 0}
          >
            <option
              key="xx"
              value={0}
            >
              20xx
            </option>
            {yearOptions}
          </select>
          {' '}
          <label className={styles.navLabel} htmlFor="daySelect">
            day=
          </label>
          <select
            id="daySelect"
            className={styles.navSelect}
            onChange={updateDay}
            value={dayConfig?.id || 0}
          >
            <option
              key="xx"
              value={0}
            >
              xx
            </option>
            {dayOptions}
          </select>
        </nav>
      </div>
      <Outlet />
    </>
  )
}

export default Root
