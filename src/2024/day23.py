from random import choice


def main():
  with open("src/2024/inputs/day23.txt") as file:
    connections = file.read().split("\n")
    print(f"there are {part_1(parse_connections(connections))} groups that the Chief Historian might be in")
    print(f"the LAN party password is {part_2(connections)}")


def part_1(computers):
  checked_groups = []
  good_groups = []
  for computer, conns in computers.items():
    for i, conn_1 in enumerate(conns):
      for j in range(i + 1, len(conns)):
        conn_2 = conns[j]
        group = sorted([computer, conn_1, conn_2])
        group_str = ",".join(sorted([computer, conn_1, conn_2]))
        if group_str not in checked_groups:
          checked_groups.append(group_str)
          if check_group_connection(group, computers):
            good_groups.append(group)
  return sum(1 for group in good_groups if check_for_historian(group))


def part_2(connections):
  computer_names, computers = parse_connections_to_sets(connections)
  cliques = bron_kerbosch(set(), computer_names, set(), computers)
  maximal_clique = None
  maximal_clique_length = 0
  for clique in cliques:
    if len(clique) > maximal_clique_length:
      maximal_clique_length = len(clique)
      maximal_clique = clique
  return ",".join(sorted(list(maximal_clique)))


def parse_connections(connections):
  computers = {}
  for connection in connections:
    computer_1, computer_2 = connection.split("-")
    c1list = computers[computer_1] if computer_1 in computers else []
    c2list = computers[computer_2] if computer_2 in computers else []
    c1list.append(computer_2)
    c2list.append(computer_1)
    computers[computer_1] = c1list
    computers[computer_2] = c2list
  return computers


def parse_connections_to_sets(connections):
  computer_names = set()
  computers = {}
  for connection in connections:
    computer_1, computer_2 = connection.split("-")
    computer_names.add(computer_1)
    computer_names.add(computer_2)
    c1set = computers[computer_1] if computer_1 in computers else set()
    c2set = computers[computer_2] if computer_2 in computers else set()
    c1set.add(computer_2)
    c2set.add(computer_1)
    computers[computer_1] = c1set
    computers[computer_2] = c2set
  return computer_names, computers


def check_group_connection(group, computers):
  comp_0 = computers[group[0]]
  comp_1 = computers[group[1]]
  comp_2 = computers[group[2]]
  if (
    group[0] in comp_1 and group[0] in comp_2 and
    group[1] in comp_0 and group[1] in comp_2 and
    group[2] in comp_0 and group[2] in comp_1
  ):
    return True
  return False


def check_for_historian(group):
  return any(comp.startswith("t") for comp in group)


"""
from wikipedia
algorithm BronKerbosch1(R, P, X) is
    if P and X are both empty then
        report R as a maximal clique
    for each vertex v in P do
        BronKerbosch1(R ⋃ {v}, P ⋂ N(v), X ⋂ N(v))
        P := P \\ {v}
        X := X ⋃ {v}
"""
def bron_kerbosch(R, P, X, computers, maximal_cliques = []):
  if len(P) == len(X) == 0:
    maximal_cliques.append(R)
  for v in P:
    bron_kerbosch(R | {v}, P & computers[v], X & computers[v], computers, maximal_cliques)
    P = P - {v}
    X = X | {v}
  return maximal_cliques


if __name__ == "__main__":
  main()
