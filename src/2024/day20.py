from AStar import AStar
from utils import diagonal_distance, get_neighbors


def main():
  with open("src/2024/inputs/day20.txt") as file:
    field = file.read()
    actual_time, actual_path = find_path(field)
    print(f"there are {part_1(actual_path)} cheats that save at least 100 picoseconds")
    # towel_list, design_list = file.read().split("\n\n")
    # towels = towel_list.strip().split(", ")
    # designs = design_list.split("\n")
    # print(f"only {part_1(towels, designs)} of the designs are possible")
    # print(f"the sum of all possible ways to make all designs is {part_2(towel_list, designs)}")


def part_1(path):
  return sum(1 for c in find_cheats(path) if c[1] >= 100)


def part_2(towel_list, designs):
  ...


def find_path(field):
  lines = field.split("\n")
  width = len(lines[0])
  height = len(lines)
  start = (0, 0)
  end = (0, 0)
  for r, row in enumerate(lines):
    if "S" in row:
      start = (r, row.index("S"))
    if "E" in row:
      end = (r, row.index("E"))
  return AStar(
    lambda _, __: 1,
    lambda x: diagonal_distance(x, end),
    lambda x: local_get_neighbors(x, lines),
    lambda x: x == end
  ).find_path(start)


def local_get_neighbors(x, field):
  return list(filter(
    lambda n: field[n[0]][n[1]] != "#",
    get_neighbors(x, field)
  ))


def find_cheats(path):
  cheats = []
  directions = [(-2, 0), (0, 2), (2, 0), (0, -2)]
  for t, coord in enumerate(path):
    for d in directions:
      if (coord[0] + d[0], coord[1] + d[1]) in path:
        time_saved = path.index((coord[0] + d[0], coord[1] + d[1])) - t - 2
        if time_saved > 0:
          cheats.append(((coord[0] + d[0], coord[1] + d[1]), time_saved))
  return cheats


if __name__ == "__main__":
  main()
