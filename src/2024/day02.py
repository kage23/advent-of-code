def main():
  with open("src/2024/inputs/day02.txt") as file:
    lines = file.readlines()
  part_1(lines)
  part_2(lines)


def part_1(reports):
  safe_count = len(list(filter(check_safe, reports)))
  print(f"there are {safe_count} safe reports")


def part_2(reports):
  safe_count = len(list(filter(problem_dampener, reports)))
  print(f"there are actually {safe_count} safe reports")


def check_safe(report):
  numbers = list(map(int, report.split(" ")))
  inc = numbers[1] > numbers[0]
  for i in range(len(numbers) - 1):
    diff = abs(numbers[i] - numbers[i + 1])
    if diff == 0 or diff > 3:
      return False
    if (numbers[i + 1] > numbers[i]) != inc:
      return False
  return True


def problem_dampener(report):
  if check_safe(report):
    return True
  numbers = list(map(int, report.split(" ")))
  for i in range(len(numbers)):
    new_numbers = [*numbers]
    del new_numbers[i]
    if check_safe(" ".join(map(str, new_numbers))):
      return True
  return False


if __name__ == "__main__":
  main()
