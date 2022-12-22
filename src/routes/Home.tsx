import styles from './Home.module.css'

const Home = () => (
  <>
    <h2 className={styles.title}>--- Advent of Code Coding Challenge ---</h2>
    <p>
      Check out my solutions for the{' '}
      <a
        className={styles.link}
        rel="noreferrer"
        target="_blank"
        href="https://adventofcode.com"
      >
        Advent of Code Coding Challenge
      </a>{' '}
      challenges! To get started, select a year and day above. Please note that
      there&apos;s no way for you to enter your custom unique puzzle inputs into
      my UI here ... If you want to use my package to solve the challenges and{' '}
      <span className={styles.nope}>earn</span> get your stars, you&apos;re
      going to have to go get{' '}
      <a
        className={styles.link}
        rel="noreferrer"
        target="_blank"
        href="https://github.com/kage23/advent-of-code"
      >
        my repository
      </a>{' '}
      and figure it out!
    </p>
  </>
)

export default Home
