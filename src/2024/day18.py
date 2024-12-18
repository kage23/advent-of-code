from math import inf
from AStar import AStar
from utils import diagonal_distance


def main():
  with open("src/2024/inputs/day18.txt") as file:
    bytes = file.read().split("\n")
    print(f"the shortest path to the exit after some bytes have fallen is {part_1(bytes)} steps long")
    print(f"the first byte that blocks a path to the exit is {part_2(bytes)}")


def part_1(bytes):
  size = 7 if len(bytes) < 100 else 71
  start_key = (0, 0)
  end_key = (size - 1, size - 1)
  fallen_bytes = list(map(
    lambda b: (int(b.split(",")[0]), int(b.split(",")[1])),
    bytes[:12] if len(bytes) < 100 else bytes[:1024]
  ))
  a_star = AStar(
    lambda _, __: 1,
    lambda key: diagonal_distance(key, end_key),
    lambda key: get_neighbors(key, size, fallen_bytes),
    lambda key: key == end_key,
  )
  score, _ = a_star.find_path(start_key)
  return score


def part_2(bytes):
  size = 7 if len(bytes) < 100 else 71
  start_key = (0, 0)
  end_key = (size - 1, size - 1)
  fallen_bytes = []
  a_star = AStar(
    lambda _, __: 1,
    lambda key: diagonal_distance(key, end_key),
    lambda key: get_neighbors(key, size, fallen_bytes),
    lambda key: key == end_key,
  )
  _, path = a_star.find_path(start_key)
  for b in bytes:
    byte = (int(b.split(",")[0]), int(b.split(",")[1]))
    fallen_bytes.append(byte)
    if byte in path:
      a_star = AStar(
        lambda _, __: 1,
        lambda key: diagonal_distance(key, end_key),
        lambda key: get_neighbors(key, size, fallen_bytes),
        lambda key: key == end_key,
      )
      score, path = a_star.find_path(start_key)
      if score == inf:
        return b


def get_neighbors(key, size, fallen_bytes):
  directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
  return list(filter(
    lambda n: 0 <= n[0] < size and 0 <= n[1] < size and n not in fallen_bytes,
    map(
      lambda d: (key[0] + d[0], key[1] + d[1]),
      directions
    )
  ))


if __name__ == "__main__":
  main()
