const manhattanDistance = (
  a: number[],
  b: number[],
  dimensions?: number
): number => {
  if (!dimensions && a.length !== b.length)
    throw new Error('The coords must be in the same dimensions!')
  if (dimensions && (a.length < dimensions || b.length < dimensions))
    throw new Error('The coords must be of a large-enough dimension!')
  const dimensionCount = dimensions || a.length
  return a.reduce(
    (distance, currentCoord, currentIndex) =>
      distance +
      (currentIndex < dimensionCount
        ? Math.abs(currentCoord - b[currentIndex])
        : 0),
    0
  )
}

export default manhattanDistance
