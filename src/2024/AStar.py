from math import inf
from BinaryHeap import BinaryHeap

def a_star(
  start_key,
  end_key,
  # Weight/distance from one node to another
  d_fn,
  # Heuristic for estimating weight/distance from one node to another
  h,
  # Method for getting neighbor nodes from current node
  get_neighbors,
  # Handy to identify if a given node is the end, aside from string equality
  # (Normally, we just check current == end_key)
  is_end=None,
):
  parent_nodes = {}

  # For node n, g_score of n is the cost of the cheapest path from start to n currently known.
  g_scores = { start_key: 0 }

  # For node n, f_score of n = g_score of n + h(n). f_score of n represents our current best guess as to
  # how short a path from start to finish can be if it goes through n.
  f_scores = { start_key: h(start_key) }

  # The set of discovered nodes that may need to be (re-)expanded.
  # Initially, only the start node is known.
  # This is usually implemented as a min-heap or priority queue rather than a hash-set.
  open_set = BinaryHeap(
    lambda node: f_scores[node] if node in f_scores else inf,
    "min",
    start_key,
  )

  def reconstruct_path(current):
    path = [current]
    parent = parent_nodes[current] if current in parent_nodes else None
    while parent:
      path.append(parent)
      parent = parent_nodes[parent] if parent in parent_nodes else None
    return list(reversed(path))

  # While open_set is not empty
  while open_set.size() > 0:
    # This operation can occur in O(1) time if openSet is a min-heap or a priority queue
    # current := the node in openSet having the lowest fScore[] value
    current = open_set.pop()

    # if current = goal
    if current == end_key or (is_end != None and is_end(current)):
      path = reconstruct_path(current)
      return g_scores[current], path

    # for each neighbor of current
    for n_key in get_neighbors(current):
      # d(current,neighbor) is the weight of the edge from current to neighbor
      d = d_fn(current, n_key)

      # tentative_g_score is the distance from start to the neighbor through current
      # tentative_g_score := gScore[current] + d(current, neighbor)
      tentative_g_score = g_scores[current] + d

      # if tentative_g_score < gScore[neighbor] or neighbor doesn't have a g_score
      if n_key not in g_scores or tentative_g_score < g_scores[n_key]:
        # This path to neighbor is better than any previous one. Record it!
        # g_score of neighbor := tentative_g_score
        g_scores[n_key] = tentative_g_score
        parent_nodes[n_key] = current
        # f_score of neighbor := tentative_g_score + h(neighbor)
        f_score = tentative_g_score + h(n_key)
        f_scores[n_key] = f_score
        # if neighbor not in open_set
        if n_key not in open_set.content:
          open_set.push(n_key)
        # If neighbor is in open_set, make sure it's sorted properly
        else:
          n_index = open_set.content.index(n_key)
          open_set.bubble_up(n_index)
          open_set.sink_down(n_index)

  # Open set is empty but goal was never reached: failure
  print("path not found")


if __name__ == "__main__":
  main()
