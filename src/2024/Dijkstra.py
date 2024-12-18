from math import inf
from heapq import heappop, heappush


class Dijkstra:
  def __init__(self, get_neighbors, cost_fn):
    self.cost_fn = cost_fn
    self.get_neighbors = get_neighbors
    self.previous = {}
    self.costs = {}
    self.min_cost = 0
    self.max_cost = inf

  def find_path(self, start):
    queue = []
    queue.append([0, start])
    self.previous = {}
    self.costs = {}
    self.costs[start] = self.min_cost
    self.previous[start] = []
    while queue:
      _, current = heappop(queue)
      for neighbor in self.get_neighbors(current):
        new_cost = self.costs[current] + self.cost_fn(current, neighbor)
        if neighbor not in self.costs or new_cost < self.costs[neighbor]:
          self.costs[neighbor] = new_cost
          heappush(queue, [new_cost, neighbor])
          self.previous[neighbor] = [current]
        elif new_cost == self.costs[neighbor]:
          self.previous[neighbor].append(current)

  def get_paths(self, end):
    path = []
    stack = [end]
    while stack:
      current = stack.pop()
      path.append(current)
      for previous in self.previous[current]:
        stack.append(previous)
    return path
