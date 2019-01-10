export const PART_2_CONFIGS
: { [key:string]: { baseTime: number, workers: number } } = {
  DEMO: {
    baseTime: 1,
    workers: 2
  },
  REAL: {
    baseTime: 61,
    workers: 5
  }
}

const INPUT: { [key:string]: string } = {
DEMO:
`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`,
}

export default INPUT