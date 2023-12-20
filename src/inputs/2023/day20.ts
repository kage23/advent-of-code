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
])

export default inputs
