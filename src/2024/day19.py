from functools import cache


def main():
  with open("src/2024/inputs/day19.txt") as file:
    towel_list, design_list = file.read().split("\n\n")
    towels = towel_list.strip().split(", ")
    designs = design_list.split("\n")
    print(f"only {part_1(towels, designs)} of the designs are possible")
    print(f"the sum of all possible ways to make all designs is {part_2(towel_list, designs)}")


def part_1(towels, designs):
  return len(list(filter(lambda d: is_design_possible(d, towels), designs)))


def part_2(towel_list, designs):
  return sum(get_all_combos(design, towel_list) for design in designs)


def is_design_possible(design, towels):
  if len(design) == 0:
    return True
  first_towels = list(filter(lambda t: design.startswith(t), towels))
  if len(first_towels) == 0:
    return False
  return any(is_design_possible(design[len(towel):], towels) for towel in first_towels)


@cache
def get_all_combos(design, towel_list):
  towels = towel_list.strip().split(", ")
  count = 0
  if len(design) == 0:
    return count + 1
  first_towels = list(filter(lambda t: design.startswith(t), towels))
  if len(first_towels) == 0:
    return count
  return sum(get_all_combos(design[len(towel):], towel_list) for towel in first_towels)


if __name__ == "__main__":
  main()
