const inputs: Map<string, string> = new Map([
  [
    'DEMO_1',
    `broadcaster -> a, b, c
%a -> b
%b -> c
%c -> inv
&inv -> a`,
  ],
  [
    'DEMO_2',
    `broadcaster -> a
%a -> inv, con
&inv -> b
%b -> con
&con -> output`,
  ],
  [
    'TEST', // a is 1 digit, b is 2 digit, c is 4 digit, d is 8 digit. dbca, zero to fifteen
    `broadcaster -> a
%a -> b, eleven
%b -> c, eleven
%c -> d
%d -> e, eleven
&eleven -> output`
  ],
  [
    'TEST_2',
    `broadcaster -> a
%a -> b, three
%b -> three
&three -> output`
  ]
])

export default inputs
