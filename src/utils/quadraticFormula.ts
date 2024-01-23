const quadraticFormula = (
  a: number,
  b: number,
  c: number
): [number, number] => {
  const negB = b * -1
  const sqrt = Math.sqrt(b * b - 4 * a * c)
  const bottom = 2 * a
  return [(negB + sqrt) / bottom, (negB - sqrt) / bottom].sort(
    (a, b) => a - b
  ) as [number, number]
}

export default quadraticFormula
