const INPUT: { [key:string]: string } = {
DEMO:
`#ip 0
seti 5 0 1
seti 6 0 2
addi 0 1 0
addr 1 2 3
setr 1 0 0
seti 8 0 4
seti 9 0 5`,

REAL:
`#ip 4
addi 4 16 4
seti 1 3 3
seti 1 4 2
mulr 3 2 1
eqrr 1 5 1
addr 1 4 4
addi 4 1 4
addr 3 0 0
addi 2 1 2
gtrr 2 5 1
addr 4 1 4
seti 2 2 4
addi 3 1 3
gtrr 3 5 1
addr 1 4 4
seti 1 6 4
mulr 4 4 4
addi 5 2 5
mulr 5 5 5
mulr 4 5 5
muli 5 11 5
addi 1 4 1
mulr 1 4 1
addi 1 15 1
addr 5 1 5
addr 4 0 4
seti 0 9 4
setr 4 2 1
mulr 1 4 1
addr 4 1 1
mulr 4 1 1
muli 1 14 1
mulr 1 4 1
addr 5 1 5
seti 0 8 0
seti 0 4 4`
}

export default INPUT