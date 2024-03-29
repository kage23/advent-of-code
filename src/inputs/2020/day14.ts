const inputs: Map<string, string> = new Map([
  [
    'DEMO_1',
    `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`,
  ],
  [
    'DEMO_2',
    `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`,
  ],
])

export default inputs
