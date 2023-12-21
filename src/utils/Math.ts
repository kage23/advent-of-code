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

export const gcdMoreThanTwoNumbers = (input: number[]): number => {
  const { length } = input
  let a = 0
  let b = 0

  if (!length) return NaN
  a = input[0]

  for (let i = 1; i < length; i++) {
    b = input[i]
    a = gcdTwoNumbers(a, b)
  }

  return a
}

export const lcmTwoNumbers = (x: number, y: number): number =>
  !x || !y ? 0 : Math.abs((x * y) / gcdTwoNumbers(x, y))

export const lcmMoreThanTwoNumbers = (numbers: number[]) =>
  numbers.reduce((a, b) => lcmTwoNumbers(a, b))

// Reduce a fraction by finding the Greatest Common Divisor and dividing by it.
export const reduceFraction = (numerator: number, denominator: number) => {
  const gcdFunc = (a: number, b: number): number => {
    return b ? gcdFunc(b, a % b) : a
  }
  const gcd = gcdFunc(numerator, denominator)
  return [numerator / gcd, denominator / gcd]
}
