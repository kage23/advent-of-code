export const gcdTwoNumbers = (x: number, y: number): number => {
  x = Math.abs(x)
  y = Math.abs(y)
  while (y) {
    const t = y
    y = x % y
    x = t
  }
  return x
}
export const lcmTwoNumbers = (x: number, y: number): number =>
  !x || !y ? 0 : Math.abs((x * y) / gcdTwoNumbers(x, y))

// Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
export const reduceFraction = (numerator: number, denominator: number) => {
  const gcdFunc = (a: number, b: number): number => {
    return b ? gcdFunc(b, a % b) : a
  }
  const gcd = gcdFunc(numerator, denominator)
  return [numerator / gcd, denominator / gcd]
}
