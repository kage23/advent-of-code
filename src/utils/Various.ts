export const manhattanDistance = (a: number[], b: number[]): number => {
  if (a.length !== b.length) throw new Error('The coords must be in the same dimensions!')
  return a.reduce((distance, currentCoord, currentIndex) => (
    distance + Math.abs(currentCoord - b[currentIndex])
  ), 0)
}

export const numArrEq = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) return false
  const len = a.length
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}