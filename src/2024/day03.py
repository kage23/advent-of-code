import re


def main():
  with open("src/2024/inputs/day03.txt") as file:
    lines = file.readlines()
    print(f"the result is {part_1(lines)}")
    print(f"the result is actually {part_2("".join(lines))}")


def part_1(lines):
  result = 0
  for line in lines:
    muls = re.findall(r"mul\(\d+,\d+\)", line)
    for mul in muls:
      numbers = list(map(int, re.findall(r"\d+", mul)))
      result += numbers[0] * numbers[1]
  return result


# not sure why this version didn't work!
# def part_2(lines):
#   new_lines = map(
#     lambda line: re.sub(r"don't\(\).+?do\(\)", "", line),
#     lines
#   )
#   return part_1(new_lines)


def part_2(file):
  result = 0
  matches = re.findall(r"mul\(\d+,\d+\)|do\(\)|don't\(\)", file)
  do = True
  for match in matches:
    if match == "do()":
      do = True
    elif match == "don't()":
      do = False
    elif do:
      numbers = list(map(int, re.findall(r"\d+", match)))
      result += numbers[0] * numbers[1]
  return result


if __name__ == "__main__":
  main()
