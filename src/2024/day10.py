from functools import reduce


def main():
  with open("src/2024/inputs/day10.txt") as file:
    field = file.read().split("\n")
    print(f"the sum total of trailhead scores is {part_1(field)}")
    print(f"the sum total of trailhead ratings is {part_2(field)}")


def part_1(field):
  trailheads = find_trailheads(field)
  return reduce(lambda x, y: x + score_trailhead(y, field), trailheads, 0)


def part_2(field):
  trailheads = find_trailheads(field)
  return reduce(lambda x, y: x + rate_trailhead(y, field), trailheads, 0)


def find_trailheads(field):
  trailheads = []
  for row in range(len(field)):
    for col in range(len(field[row])):
      if field[row][col] == "0":
        trailheads.append((row, col))
  return trailheads


def score_trailhead(trailhead, field):
  reached_nines = set()
  search_queue = [{
    "location": trailhead,
    "visited": {trailhead},
  }]
  while len(search_queue) > 0:
    node = search_queue.pop()
    for neighbor in get_neighbors(node["location"], field):
      if neighbor not in node["visited"]:
        if int(field[neighbor[0]][neighbor[1]]) == 9:
          reached_nines.add(neighbor)
        else:
          new_node = {
            "location": neighbor,
            "visited": node["visited"].copy(),
          }
          new_node["visited"].add(neighbor)
          search_queue.append(new_node)
  return len(reached_nines)


def get_neighbors(location, field):
  height = int(field[location[0]][location[1]])
  return list(filter(
    lambda n: is_good_neighbor(n, field, height),
    [
      (location[0] - 1, location[1]),
      (location[0] + 1, location[1]),
      (location[0], location[1] - 1),
      (location[0], location[1] + 1),
    ]
  ))


def is_good_neighbor(n, field, height):
  try:
    return 0 <= n[0] < len(field) and 0 <= n[1] < len(field[0]) and int(field[n[0]][n[1]]) == height + 1
  except ValueError:
    return False


def rate_trailhead(trailhead, field):
  rating = 0
  search_queue = [{
    "location": trailhead,
    "visited": {trailhead},
  }]
  while len(search_queue) > 0:
    node = search_queue.pop()
    for neighbor in get_neighbors(node["location"], field):
      if neighbor not in node["visited"]:
        if int(field[neighbor[0]][neighbor[1]]) == 9:
          rating += 1
        else:
          new_node = {
            "location": neighbor,
            "visited": node["visited"].copy(),
          }
          new_node["visited"].add(neighbor)
          search_queue.append(new_node)
  return rating


if __name__ == "__main__":
  main()
