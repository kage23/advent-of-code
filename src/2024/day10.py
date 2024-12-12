def main():
  with open("src/2024/inputs/day10-sample.txt") as file:
    field = file.read().split("\n")
    print(f"the sum total of trailhead scores is {part_1(field)}")
    # print(f"there are actually {part_2(lines)} unique antinode locations")


def part_1(field):
  trailheads = find_trailheads(field)



def part_2(field):
  ...


def find_trailheads(field):
  trailheads = []
  for row in range(len(field)):
    for col in range(len(field[row])):
      if field[row][col] == "0":
        trailheads.append((row, col))
  return trailheads


if __name__ == "__main__":
  main()
