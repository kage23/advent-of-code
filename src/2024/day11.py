def main():
  with open("src/2024/inputs/day11.txt") as file:
    field = file.read()
    print(f"after 25 blinks, there are {part_1(field)} stones")
    print(f"after 75 blinks, there are {part_2(field)} stones")


def part_1(field):
  stones = list(map(int, field.split(" ")))
  for _ in range(25):
    stones = blink(stones)
  return len(stones)


def part_2(field):
  stones = list(map(int, field.split(" ")))
  final_stones = blink_better(stones, 75)
  return sum(final_stones.values())


def blink(stones):
  new_stones = []
  for stone in stones:
    new_stone_1, new_stone_2 = blink_one_stone(stone)
    new_stones.append(new_stone_1)
    if new_stone_2 != None:
      new_stones.append(new_stone_2)
  return new_stones


def blink_better(stones, blinks):
  stone_count_map = {}
  for stone in stones:
    stone_count = stone_count_map[stone] if stone in stone_count_map else 0
    stone_count_map[stone] = stone_count + 1
  for _ in range(blinks):
    new_stone_count_map = {}
    for stone_key, count in stone_count_map.items():
      new_stone_1, new_stone_2 = blink_one_stone(stone_key)
      new_stone_1_count = new_stone_count_map[new_stone_1] if new_stone_1 in new_stone_count_map else 0
      new_stone_count_map[new_stone_1] = new_stone_1_count + count
      if new_stone_2 != None:
        new_stone_2_count = new_stone_count_map[new_stone_2] if new_stone_2 in new_stone_count_map else 0
        new_stone_count_map[new_stone_2] = new_stone_2_count + count
    stone_count_map = new_stone_count_map
  return stone_count_map


def blink_one_stone(stone):
  if stone == 0:
    return (1, None)
  else:
    size = len(str(stone))
    if size % 2 == 0:
      return (int(str(stone)[0:int(size/2)]), int(str(stone)[int(size/2):]))
    else:
      return (int(stone * 2024), None)


if __name__ == "__main__":
  main()
