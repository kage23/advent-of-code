from functools import reduce


def main():
  with open("src/2024/inputs/day07.txt") as file:
    lines = file.readlines()
    print(f"the total calibration result is {part_1(lines)}")
    # print(f"there are {part_2(field)} possible locations for the new obstruction")


def part_1(lines):
  result = 0
  for line in lines:
    result += evaluate_line(line)
  return result


def part_2(lines):
  ...


def evaluate_line(line):
  r, v = line.split(": ")
  result = int(r)
  values = list(map(int, v.split(" ")))
  line_max = reduce(lambda a, b: a * b, values)
  if line_max < result:
    return 0
  if values[0] > result:
    return 0
  if len(values) == 1:
    return result if values[0] == result else 0
  for i in range(len(values) - 1):
    if i + 2 == len(values):
      if values[i] + values[i + 1] == result or values[i] * values[i + 1] == result:
        return result
      else:
        return 0
    else:
      plus = evaluate_line(f"{r}: {values[i] + values[i + 1]} {" ".join(list(map(str, values[2:])))}")
      mult = evaluate_line(f"{r}: {values[i] * values[i + 1]} {" ".join(list(map(str, values[2:])))}")
      if plus == result or mult == result:
        return result
  return 0


if __name__ == "__main__":
  main()
