const inputs: Map<string, string> = new Map([
  ['DEMO_0', '{}'],
  ['DEMO_1', '{{{}}}'],
  ['DEMO_2', '{{},{}}'],
  ['DEMO_3', '{{{},{},{{}}}}'],
  ['DEMO_4', '{<{},{},{{}}>}'],
  ['DEMO_5', '{<a>,<a>,<a>,<a>}'],
  ['DEMO_6', '{{<a>},{<a>},{<a>},{<a>}}'],
  ['DEMO_7', '{{<!>},{<!>},{<!>},{<a>}}'],
  ['DEMO_8', '{{<ab>},{<ab>},{<ab>},{<ab>}}'],
  ['DEMO_9', '{{<!!>},{<!!>},{<!!>},{<!!>}}'],
  ['DEMO_10', '{{<a!>},{<a!>},{<a!>},{<ab>}}'],
  ['GARBAGE_0', `<>`],
  ['GARBAGE_1', `<random characters>`],
  ['GARBAGE_2', `<<<<>`],
  ['GARBAGE_3', `<{!>}>`],
  ['GARBAGE_4', `<!!>`],
  ['GARBAGE_5', `<!!!>>`],
  ['GARBAGE_6', `<{o"i!a,<{i<a>`],
])

export default inputs
