from parse import *


def main():
  with open("src/2024/inputs/day13.txt") as file:
    raw_text = file.read()
    machines = parse_input(raw_text)
    print(f"you have to spend at least {part_1(machines)} tokens to win the most prizes")
    print(f"you actually have to spend at least {part_2(machines)} tokens to win the most prizes")


def part_1(machines):
  return sum(map(evaluate_machine, machines))


def part_2(machines):
  return sum(map(evaluate_machine_2, machines))


def parse_input(raw_text):
  raw_machines = raw_text.split("\n\n")
  return list(map(text_to_machine, raw_machines))


def text_to_machine(text):
  lines = text.split("\n")
  a = parse("Button {}: X+{}, Y+{}", lines[0])
  b = parse("Button {}: X+{}, Y+{}", lines[1])
  t = parse("Prize: X={}, Y={}", lines[2])
  _, x_str_a, y_str_a = a.fixed
  _, x_str_b, y_str_b = b.fixed
  x_str_t, y_str_t = t.fixed
  return {
    "button_a": { "x_offset": int(x_str_a), "y_offset": int(y_str_a) },
    "button_b": { "x_offset": int(x_str_b), "y_offset": int(y_str_b) },
    "target": { "x": int(x_str_t), "y": int(y_str_t) },
  }


def evaluate_machine(machine):
  costs = []
  for a in range(101):
    for b in range(101):
      x = (machine["button_a"]["x_offset"] * a) + (machine["button_b"]["x_offset"] * b)
      y = (machine["button_a"]["y_offset"] * a) + (machine["button_b"]["y_offset"] * b)
      if x == machine["target"]["x"] and y == machine["target"]["y"]:
        costs.append((3 * a) + b)
  return min(costs) if len(costs) > 0 else 0


def evaluate_machine_2(machine):
  machine["target"]["x"] += 10000000000000
  machine["target"]["y"] += 10000000000000
  x = machine["target"]["x"]
  y = machine["target"]["y"]
  ax = machine["button_a"]["x_offset"]
  ay = machine["button_a"]["y_offset"]
  bx = machine["button_b"]["x_offset"]
  by = machine["button_b"]["y_offset"]
  a = ((x * by) + (y * -bx)) / ((ax * by) - (ay * bx))
  b = (x - (a * ax)) / bx
  if a == int(a) and b == int(b):
    return int((3 * a) + b)
  else:
    return 0



if __name__ == "__main__":
  main()


# Linear algebra notes:
# x = 8400
# y = 5400

# ax = 94
# ay = 34
# bx = 22
# by = 67

# a * ax + b * bx = x                                       94a + 22b = 8400
# a * ay + b * by = y                                       34a + 67b = 5400

# a * ax * by + b * bx * by = x * by                        94*67*a + 22*67*b = 8400*67                     6298a + 1474b = 562800
# a * ay * -bx + b * by * -bx = y * -bx                     34*-22*a + 67*-22*b = 5400*-22                  -748a + -1474b = -118800

# (a * ax * by) + (a * ay * -bx) = (x * by) + (y * -bx)     94*67*a + 34*-22*a = (8400*67) - (5400*22)      6298a - 748a = 444000
# a * (ax * by) + a * (ay * -bx) = (x * by) + (y * -bx)
# a * ((ax * by) - (ay * bx)) = (x * by) + (y * -bx)
# a = ((x * by) + (y * -bx)) / ((ax * by) - (ay * bx))      a = ((8400 * 67) - (5400 * 22)) / ((94 * 67) - (34 * 22))       a = (562800 - 118800) / (6298 - 748)        a = 444000 / 5550       a = 80




# a * ax + b * bx = x
# b * bx = x - (a * ax)
# b = (x - (a * ax)) / bx           b = (8400 - (80 * 94)) / 22       b = (8400 - 7520) / 22      b = 880 / 22      b = 40
