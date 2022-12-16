import { Link, Outlet } from 'react-router-dom'

import styles from './Root.module.css'

const Root = () => (
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
        >
          <option
            key="xx"
            value={0}
          >
            20xx
          </option>
        </select>
        {' '}
        <label className={styles.navLabel} htmlFor="daySelect">
          day=
        </label>
        <select
          id="daySelect"
          className={styles.navSelect}
        >
          <option
            key="xx"
            value={0}
          >
            xx
          </option>
        </select>
      </nav>
    </div>
    <Outlet />
  </>
)

export default Root
