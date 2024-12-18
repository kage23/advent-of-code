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
    print(f"the final output is {part_1(int(a.fixed[0]), program)}")
    print(f"the lowest value in A that will cause the program to output itself is {part_2(program)}")


def part_1(a, program):
  elf_computer = ElfComputer(a)
  return elf_computer.run_program(program)


def part_2(program):
  possible_starts = ["0o"]
  for i in range(len(program)):
    next_possible_starts = []
    target = program[0-i-1]
    for start in possible_starts:
      for j in range(8):
        possible_oct = f"{start}{j}"
        a = int(possible_oct[2:], 8)
        elf_computer = ElfComputer(a)
        elf_computer.run_program(program)
        if (elf_computer.output[0] == target):
          if i == len(program) - 1:
            return a
          next_possible_starts.append(possible_oct)
    possible_starts = [*next_possible_starts]


if __name__ == "__main__":
  main()
