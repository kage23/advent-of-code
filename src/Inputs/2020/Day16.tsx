const INPUT: { [key: string]: string } = {
  DEMO_0: `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`,

  DEMO_1: `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`,

// 0, 1, 2
DEMO_1_REORDERED: `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
14,5,9
9,3,18
1,15,5`,

  // dp, dt, ap, al, dl
  // 2,  4,  3,  1,  0
  // answer: 697
  K_TEST: `departure location: 1-3 or 5-7
arrival location: 9-11 or 13-15
departure platform: 17-19 or 21-31
arrival platform: 33-35 or 37-39
departure track: 41-43 or 45-47

your ticket:
17,41,33,9,1

nearby tickets:
18,42,34,10,2
19,43,35,11,3
21,45,37,13,5
22,46,38,14,6
23,47,39,15,7`,
}

export default INPUT