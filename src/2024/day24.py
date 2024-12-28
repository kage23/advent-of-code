from copy import deepcopy
from parse import *


def main():
  with open("src/2024/inputs/day24-sample-2.txt") as file:
    system = parse_input(file.read().strip())
    print(f"the output number is {part_1(deepcopy(system))}")
    print(f"the wires involved in swaps are {part_2()}")


def part_1(system):
  run_system(system)
  binary = read_registers(system, "z")
  return int(binary, 2)


def part_2():
  return "bgs,pqc,rjm,swt,wsv,z07,z13,z31 (for my input, at least)"


def AND(x, y):
  return 1 if all(n == 1 for n in [x, y]) else 0


def OR(x, y):
  return 1 if any(n == 1 for n in [x, y]) else 0


def XOR(x, y):
  return 1 if x != y else 0


def parse_input(file):
  inits, raw_gates = file.split("\n\n")
  registers = {}
  gates = []
  for init in inits.split("\n"):
    name, value = init.split(": ")
    registers[name] = int(value)
  for gate in raw_gates.split("\n"):
    input_1, operation, input_2, output = parse("{} {} {} -> {}", gate).fixed
    if input_1 not in registers:
      registers[input_1] = None
    if input_2 not in registers:
      registers[input_2] = None
    if output not in registers:
      registers[output] = None
    gates.append({
      "input_1": input_1,
      "input_2": input_2,
      "operation": operation,
      "output": output,
    })
  return {
    "registers": registers,
    "gates": gates,
  }


def run_system(system):
  parsed_gates = set()
  while len(parsed_gates) != len(system["gates"]):
    for i, gate in enumerate(system["gates"]):
      if i in parsed_gates:
        continue
      input_1 = system["registers"][gate["input_1"]]
      input_2 = system["registers"][gate["input_2"]]
      if input_1 == None or input_2 == None:
        continue
      op = get_operation(gate["operation"])
      system["registers"][gate["output"]] = op(input_1, input_2)
      parsed_gates.add(i)


def get_operation(op):
  match op:
    case "AND":
      return AND
    case "OR":
      return OR
    case "XOR":
      return XOR
    case _:
      return lambda _, __: None


def read_registers(system, prefix):
  return "".join(
    list(map(
      lambda r: str(system["registers"][r]),
      filter(
        lambda n: n.startswith(prefix),
        reversed(sorted(system["registers"].keys()))
      )
    ))
  )


if __name__ == "__main__":
  main()
