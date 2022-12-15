import { Link } from 'react-router-dom'

import styles from './Root.module.css'

const Root = () => (
  <>
    <h1 className={styles.header}>
      <Link className={styles.link} to="/">
        Coding Advent Challenge Solution Suite
      </Link>
    </h1>
    root ahoy!
    <div id="detail" />
  </>
)

export default Root
