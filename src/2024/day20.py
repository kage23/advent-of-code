from AStar import AStar
from utils import diagonal_distance, get_neighbors, manhattan_distance


def main():
  with open("src/2024/inputs/day20.txt") as file:
    field = file.read()
    actual_time, actual_path = find_path(field)
    print(f"there are {part_1(actual_path)} cheats that save at least 100 picoseconds")
    print(f"there are {part_2(actual_path)} longer cheats that save at least 100 picoseconds")


def part_1(path):
  return sum(1 for c in find_cheats(path) if c[1] >= 100)


def part_2(path):
  return find_longer_cheats(path)


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


def find_longer_cheats(path):
  pairs = []
  for i, point_1 in enumerate(path):
    for j in range(i + 1, len(path)):
      point_2 = path[j]
      path_distance = j - i
      cheat_distance = manhattan_distance(point_1, point_2)
      if cheat_distance <= 20 and cheat_distance < path_distance:
        time_saved = path_distance - cheat_distance
        pairs.append({
          "point_1": point_1,
          "point_2": point_2,
          "time_saved": time_saved,
        })
  return sum(1 for pair in pairs if pair["time_saved"] >= 100)


if __name__ == "__main__":
  main()
