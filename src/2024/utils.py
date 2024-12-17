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


def manhattan_distance(a, b):
  distance = 0
  for i, x in enumerate(a):
    distance += abs(x - b[i])
  return distance
