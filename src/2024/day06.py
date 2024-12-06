def main():
  with open("src/2024/inputs/day06-sample.txt") as file:
    print(f"the guard will visit {part_1(file.readlines())} distinct positions")
    print(f"there are {part_2(file.readlines())} possible locations for the new obstruction")


# 0: ^
# 1: >
# 2: v
# 3: <
def part_1(field):
  obstructions, guard = parse_map(field)
  guard_positions = set()
  while 0 <= guard[0] < len(field) and 0 <= guard[1] < len(field[0]):
    guard_positions.add((guard[0], guard[1]))
    guard = get_next_guard(obstructions, guard)
  return len(guard_positions)


# part 2 doesn't work and needs to be fixed!!!
def part_2(field):
  count = 0
  obstructions, guard = parse_map(field)
  for row in range(len(field)):
    for col in range(len(field[row])):
      new_guard = [*guard]
      new_obstructions = [*obstructions, (row, col)]
      guard_positions = set()
      while new_guard not in guard_positions and 0 <= new_guard[0] < len(field) and 0 <= new_guard[1] < len(field[0]):
        guard_positions.add(new_guard)
        new_guard = get_next_guard(new_obstructions, new_guard)
      if new_guard in guard_positions:
        count += 1
  return count


def parse_map(field):
  guard = []
  obstructions = []
  for row in range(len(field)):
    for col in range(len(field[row])):
      if field[row][col] == "#":
        obstructions.append((row, col))
      if field[row][col] == "^":
        guard = [row, col, 0]
  return obstructions, guard


def get_next_guard(obstructions, guard):
  next_guard = [*guard]
  match guard[2]:
    case 0:
      next_position = (guard[0] - 1, guard[1])
    case 1:
      next_position = (guard[0], guard[1] + 1)
    case 2:
      next_position = (guard[0] + 1, guard[1])
    case 3:
      next_position = (guard[0], guard[1] - 1)
  if next_position in obstructions:
    next_guard[2] = (guard[2] + 1) % 4
  else:
    next_guard[0] = next_position[0]
    next_guard[1] = next_position[1]
  return next_guard



if __name__ == "__main__":
  main()
