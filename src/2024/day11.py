def main():
  with open("src/2024/inputs/day11-sample.txt") as file:
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
  for _ in range(75):
    stones = blink(stones)
  return len(stones)


def blink(stones):
  new_stones = []
  for stone in stones:
    if stone == 0:
      new_stones.append(1)
    else:
      size = len(str(stone))
      if size % 2 == 0:
        new_stones.append(int(str(stone)[0:int(size/2)]))
        new_stones.append(int(str(stone)[int(size/2):]))
      else:
        new_stones.append(stone * 2024)
  return new_stones


if __name__ == "__main__":
  main()
