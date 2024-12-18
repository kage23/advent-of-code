from parse import *
from ElfComputer import ElfComputer


def main():
  with open("src/2024/inputs/day17.txt") as file:
    lines = file.read().split("\n")
    a = parse("Register A: {}", lines[0])
    b = parse("Register B: {}", lines[1])
    c = parse("Register C: {}", lines[2])
    p = parse("Program: {}", lines[4])
    program = list(map(int, p.fixed[0].split(",")))
    print(f"the final output is {part_1(int(a.fixed[0]), int(b.fixed[0]), int(c.fixed[0]), program)}")
    print(f"the value in A that will cause the program to output itself is {part_2(int(b.fixed[0]), int(c.fixed[0]), program)}")


def part_1(a, b, c, program):
  elf_computer = ElfComputer(a, b, c)
  return elf_computer.run_program(program)


# This is a brute-force approach which will probably take way too long
def part_2(b, c, program):
  program_str = ",".join(map(str, program))
  a = 0
  while True:
    if a % 100000 == 0:
      print(f"testing {a}")
    elf_computer = ElfComputer(a, b, c)
    if elf_computer.run_program(program) == program_str:
      break
    a += 1
  return a


if __name__ == "__main__":
  main()
