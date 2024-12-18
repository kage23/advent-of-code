from math import inf
from BinaryHeap import BinaryHeap

class AStar:
  def __init__(
    self,
    # Weight/distance from one node to another
    get_distance,
    # Heuristic for estimating weight/distance from one node to another
    get_heuristic,
    # Method for getting neighbor nodes from current node
    get_neighbors,
    # Method to check if the given node is the end
    is_end,
  ):
    self.get_distance = get_distance
    self.get_heuristic = get_heuristic
    self.get_neighbors = get_neighbors
    self.is_end = is_end
    self.parent_nodes = {}
    # For node n, g_score of n is the cost of the cheapest path from start to n currently known.
    self.g_scores = {}
    # For node n, f_score of n = g_score of n + h(n). f_score of n represents our current best guess as to
    # how short a path from start to finish can be if it goes through n.
    self.f_scores = {}
    self.open_set = BinaryHeap(
      lambda node: self.f_scores[node] if node in self.f_scores else inf,
      "min"
    )

  def reconstruct_path(self, current):
    path = [current]
    parent = self.parent_nodes[current] if current in self.parent_nodes else None
    while parent:
      path.append(parent)
      parent = self.parent_nodes[parent] if parent in self.parent_nodes else None
    return list(reversed(path))

  def find_path(self, start_key):
    self.parent_nodes = {}
    self.g_scores = { start_key: 0 }
    self.f_scores = {}
    self.open_set = BinaryHeap(
      lambda node: self.f_scores[node] if node in self.f_scores else inf,
      "min",
      start_key,
    )
    # While open_set is not empty
    while self.open_set.size() > 0:
      # This operation can occur in O(1) time if openSet is a min-heap or a priority queue
      # current := the node in openSet having the lowest fScore[] value
      current = self.open_set.pop()

      # if current is the goal
      if self.is_end(current):
        path = self.reconstruct_path(current)
        return self.g_scores[current], path

      # for each neighbor of current
      for n_key in self.get_neighbors(current):
        # d(current,neighbor) is the weight of the edge from current to neighbor
        d = self.get_distance(current, n_key)

        # tentative_g_score is the distance from start to the neighbor through current
        # tentative_g_score := gScore[current] + d(current, neighbor)
        tentative_g_score = self.g_scores[current] + d

        # if tentative_g_score < gScore[neighbor] or neighbor doesn't have a g_score
        if n_key not in self.g_scores or tentative_g_score < self.g_scores[n_key]:
          # This path to neighbor is better than any previous one. Record it!
          # g_score of neighbor := tentative_g_score
          self.g_scores[n_key] = tentative_g_score
          self.parent_nodes[n_key] = current
          # f_score of neighbor := tentative_g_score + h(neighbor)
          f_score = tentative_g_score + self.get_heuristic(n_key)
          self.f_scores[n_key] = f_score
          # if neighbor not in open_set
          if n_key not in self.open_set.content:
            self.open_set.push(n_key)
          # If neighbor is in open_set, make sure it's sorted properly
          else:
            n_index = self.open_set.content.index(n_key)
            self.open_set.bubble_up(n_index)
            self.open_set.sink_down(n_index)
    # No path found
    return inf, []
