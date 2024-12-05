from functools import cmp_to_key


def main():
  with open("src/2024/inputs/day05.txt") as file:
    file_txt = file.read()
    print(f"the middle page number sum is {part_1(file_txt)}")
    print(f"the middle page number sum of the corrected updates is {part_2(file_txt)}")


def part_1(file):
  rules, updates = parse_file(file)
  middles = 0
  for update in updates:
    if is_good_update(update, rules):
      middles += update[int((len(update) - 1) / 2)]
  return middles


def part_2(file):
  rules, updates = parse_file(file)
  middles = 0
  for update in updates:
    if not is_good_update(update, rules):
      corrected_update = correct_update(update, rules)
      middles += corrected_update[int((len(corrected_update) - 1) / 2)]
  return middles


def parse_file(file):
  rules, updates = file.split("\n\n")
  return (
    list(map(parse_rule, rules.split("\n"))),
    list(map(parse_update, updates.split("\n")))
  )


def parse_rule(rule):
  left, right = rule.split("|")
  return (int(left), int(right))


def parse_update(update):
  return list(map(int, update.split(",")))


def is_good_update(update, rules):
  for rule in rules:
    if rule[0] not in update or rule[1] not in update:
      continue
    if update.index(rule[0]) > update.index(rule[1]):
      return False
  return True


def correct_update(update, rules):
  def sorter(a, b):
    return -1 if is_good_update([a, b], rules) else 1
  return sorted(update, key=cmp_to_key(sorter))


if __name__ == "__main__":
  main()
