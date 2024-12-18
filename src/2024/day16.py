from AStar import a_star
from BinaryHeap import BinaryHeap
from utils import manhattan_distance
from Dijkstra import Dijkstra


def main():
  with open("src/2024/inputs/day16.txt") as file:
    raw_text = file.read()
    field = raw_text.split("\n")
    score, _ = part_1(field)
    print(f"the lowest possible score is {score}")
    print(f"there are {part_2(field, score)} tiles on a best path")


def part_1(field):
  height = len(field)
  width = len(field[0])
  start_key = f"{height - 2},1,>"
  end_pos = f"1,{width - 2},"
  is_end = lambda key: key.startswith(end_pos)
  return a_star(
    start_key,
    "",
    d_fn,
    lambda key: h(key, end_pos),
    lambda key: get_neighbors(key, field),
    is_end
  )


"""
part 2 is heavily based on this implementation:
https://github.com/scorixear/AdventOfCode/blob/main/2024/16/2.py
"""
def part_2(field, target_cost):
  good_seats = set()
  dij = Dijkstra(lambda key: get_immediate_neighbors(key, field), d_fn)
  height = len(field)
  width = len(field[0])
  start_key = f"{height - 2},1,>"
  end_pos = f"1,{width - 2},"
  dij.find_path(start_key)
  end_key = ""
  for d in ["<", "^", ">", "v"]:
    if dij.costs[f"{end_pos}{d}"] == target_cost:
      end_key = f"{end_pos}{d}"
  for node in dij.get_paths(end_key):
    r, c, _ = node.split(",")
    good_seats.add((r, c))
  return len(good_seats)


def d_fn(from_key, to_key):
  from_row, from_col, from_dir = from_key.split(",")
  to_row, to_col, to_dir = to_key.split(",")
  distance = manhattan_distance((int(from_row), int(from_col)), (int(to_row), int(to_col)))
  result = distance if from_dir == to_dir else distance + 1000
  return result


def h(from_key, to_key):
  from_row, from_col, _ = from_key.split(",")
  to_row, to_col, _ = to_key.split(",")
  result = manhattan_distance((int(from_row), int(from_col)), (int(to_row), int(to_col)))
  return result


def get_neighbors(key, field):
  directions = {
    "^": (-1, 0),
    ">": (0, 1),
    "v": (1, 0),
    "<": (0, -1),
  }
  neighbors = []
  # We can either turn in place, or we can go straight to the next turning point
  r, c, direction_char = key.split(",")
  direction = directions[direction_char]
  row, col = int(r), int(c)
  # turn in place
  for turn in get_turns(direction_char):
    neighbors.append(f"{row},{col},{turn}")
  # go straight to the next turning point
  next_spot = (row + direction[0], col + direction[1])
  if field[next_spot[0]][next_spot[1]] != "#":
    while not is_turning_point(next_spot, field):
      next_spot = (next_spot[0] + direction[0], next_spot[1] + direction[1])
    neighbors.append(f"{next_spot[0]},{next_spot[1]},{direction_char}")
  return neighbors


def get_immediate_neighbors(key, field):
  directions = {
    "^": (-1, 0),
    ">": (0, 1),
    "v": (1, 0),
    "<": (0, -1),
  }
  neighbors = []
  # We can either turn in place, or we can go straight one step
  r, c, direction_char = key.split(",")
  direction = directions[direction_char]
  row, col = int(r), int(c)
  # turn in place
  for turn in get_turns(direction_char):
    neighbors.append(f"{row},{col},{turn}")
  # go straight one step
  next_spot = (row + direction[0], col + direction[1])
  if field[next_spot[0]][next_spot[1]] != "#":
    neighbors.append(f"{next_spot[0]},{next_spot[1]},{direction_char}")
  return neighbors


def get_turns(direction):
  if direction == "^" or direction == "v":
    return ["<", ">"]
  return ["^", "v"]


def is_turning_point(spot, field):
  neighbors = f"{field[spot[0]-1][spot[1]]}{field[spot[0]][spot[1]+1]}{field[spot[0]+1][spot[1]]}{field[spot[0]][spot[1]-1]}"
  neighbors = neighbors.replace("S", ".")
  neighbors = neighbors.replace("E", ".")
  result = neighbors not in ["#.#.", ".#.#"]
  return result


def in_betweens(from_key, to_key):
  directions = {
    "^": (-1, 0),
    ">": (0, 1),
    "v": (1, 0),
    "<": (0, -1),
  }
  fr, fc, direction_char = from_key.split(",")
  tr, tc, _ = to_key.split(",")
  direction = directions[direction_char]
  if fr == tr and fc == tc:
    return []
  from_row, from_col, to_row, to_col = map(int, [fr, fc, tr, tc])
  tiles = set()
  tiles.add((from_row, from_col))
  tiles.add((to_row, to_col))
  next_row = from_row + direction[0]
  next_col = from_col + direction[1]
  while next_row != to_row or next_col != to_col:
    tiles.add((next_row, next_col))
    next_row += direction[0]
    next_col += direction[1]
  return tiles


if __name__ == "__main__":
  main()
