const inputs: Map<string, string> = new Map([
  ['DEMO_1', '1 + 2 * 3 + 4 * 5 + 6'],
  ['DEMO_2', '1 + (2 * 3) + (4 * (5 + 6))'],
  ['DEMO_3', '2 * 3 + (4 * 5)'],
  ['DEMO_4', '5 + (8 * 3 + 9 + 3 * 4 * 3)'],
  ['DEMO_5', '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))'],
  ['DEMO_6', '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'],
])

export default inputs
