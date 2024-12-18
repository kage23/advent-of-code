from math import sqrt

def get_neighbors(plot, field=None, diags=False):
  directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
  if diags:
    for dir in [(-1, -1), (-1, 1), (1, -1), (1, 1)]:
      directions.append(dir)
  return list(filter(
    lambda n: True if field == None else 0 <= n[0] < len(field) and 0 <= n[1] < len(field[0]),
    map(
      lambda n: (n[0] + plot[0], n[1] + plot[1]),
      directions
    )
  ))


def diagonal_distance(a, b):
  diff_x = abs(a[0] - b[0])
  diff_y = abs(a[1] - b[1])
  return sqrt(diff_x ** 2 + diff_y ** 2)


def manhattan_distance(a, b):
  distance = 0
  for i, x in enumerate(a):
    distance += abs(x - b[i])
  return distance
