const INPUT: { [key:string]: string } = {
REAL: `cpy a d
cpy 15 c
cpy 170 b
inc d
dec b
jnz b -2
dec c
jnz c -5
cpy d a
jnz 0 0
cpy a b
cpy 0 a
cpy 2 c
jnz b 2
jnz 1 6
dec b
dec c
jnz c -4
inc a
jnz 1 -7
cpy 2 b
jnz c 2
jnz 1 4
dec b
dec c
jnz 1 -4
jnz 0 0
out b
jnz a -19
jnz 1 -21`
}

export default INPUT


// 0: cpy a d
// 1: cpy 15 c
// 2: cpy 170 b
// 3: inc d
// 4: dec b
// 5: jnz b -2
// 6: dec c
// 7: jnz c -5

// 8: cpy d a
// 9: jnz 0 0
// 10: cpy a b
// 11: cpy 0 a

// // This is the section that finds Math.floor(B / 2) and puts it in A
// // If B starts odd, we'll eventually output 1
// // If B starts even, we'll eventually output 0
// 12: cpy 2 c
// 13: jnz b 2
// 14: jnz 1 6
// 15: dec b
// 16: dec c
// 17: jnz c -4
// 18: inc a
// 19: jnz 1 -7

// 20: cpy 2 b
// 21: jnz c 2
// 22: jnz 1 4
// 23: dec b
// 24: dec c
// 25: jnz 1 -4
// 26: jnz 0 0
// 27: out b
// 28: jnz a -19 // Jump to Line 9
// 29: jnz 1 -21 // Jump to Line 8