export const manhattanDistance = (a: number[], b: number[], dimensions?: number): number => {
  if (!dimensions && a.length !== b.length)
    throw new Error('The coords must be in the same dimensions!')
  if (dimensions && (a.length < dimensions || b.length < dimensions))
    throw new Error('The coords must be of a large-enough dimension!')
  const dimensionCount = dimensions || a.length
  return a.reduce((distance, currentCoord, currentIndex) => (
    distance + (
      currentIndex < dimensionCount
        ? Math.abs(currentCoord - b[currentIndex])
        : 0
    )
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