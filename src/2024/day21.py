from math import inf


NUMPAD_BUTTON_LOCATIONS = {
  "7": (0, 0),
  "8": (0, 1),
  "9": (0, 2),
  "4": (1, 0),
  "5": (1, 1),
  "6": (1, 2),
  "1": (2, 0),
  "2": (2, 1),
  "3": (2, 2),
  "BLANK": (3, 0),
  "0": (3, 1),
  "A": (3, 2),
}


ARROW_BUTTON_LOCATIONS = {
  "BLANK": (0, 0),
  "^": (0, 1),
  "A": (0, 2),
  "<": (1, 0),
  "v": (1, 1),
  ">": (1, 2),
}


def main():
  numpad_directions = generate_all_button_directions(NUMPAD_BUTTON_LOCATIONS, 3, 4)
  arrow_directions = generate_all_button_directions(ARROW_BUTTON_LOCATIONS, 3, 2)
  with open("src/2024/inputs/day21.txt") as file:
    codes = file.read().split("\n")
    print(f"the sum of the complexities of all codes in the list is {part_1(codes, numpad_directions, arrow_directions)}")
    # print(f"the sum of all possible ways to make all designs is {part_2(towel_list, designs)}")


def part_1(codes, numpad_directions, arrow_directions):
  final_sum = 0
  for code in codes:
    final_paths = []
    first_robot_paths = get_robot_instructions(code, numpad_directions)
    for path in first_robot_paths:
      second_robot_paths = get_robot_instructions("".join(path), arrow_directions)
      for path2 in second_robot_paths:
        third_robot_paths = get_robot_instructions("".join(path2), arrow_directions)
        for path3 in third_robot_paths:
          final_paths.append(path3)
    final_path_length = min(list(map(lambda p: len(p), final_paths)))
    complexity = final_path_length * int(code[:-1])
    final_sum += complexity
  return final_sum


def part_2(towel_list, designs):
  ...


def get_robot_instructions(code, button_directions):
  paths = []
  position = "A"
  for x in code:
    if x == position:
      paths = list(map(lambda p: [*p, "A"], paths))
    else:
      possible_paths = button_directions[(position, x)]
      if len(paths) == 0:
        paths = list(map(lambda pp: [*pp, "A"], possible_paths))
      else:
        new_paths = []
        for p in paths:
          for pp in possible_paths:
            new_paths.append([*p, *pp, "A"])
        paths = new_paths
      position = x
  return fewest_move_sequences(paths)


def generate_all_button_directions(button_locations, width, height):
  button_directions = {}
  blank = button_locations["BLANK"]
  for i, (button_1, position_1) in enumerate(button_locations.items()):
    for j, (button_2, position_2) in enumerate(button_locations.items()):
      if j != i and button_1 != "BLANK" and button_2 != "BLANK":
        directions = get_button_to_button_directions(position_1, position_2, blank, width, height)
        button_directions[(button_1, button_2)] = directions
  return button_directions


def get_button_to_button_directions(position_1, position_2, blank, width, height):
  directions = {
    "^": (-1, 0),
    "v": (1, 0),
    "<": (0, -1),
    ">": (0, 1)
  }
  paths = []
  shortest_path_length = inf
  search_queue = [{
    "position": position_1,
    "path": [],
    "visited": [position_1],
  }]
  while search_queue:
    node = search_queue.pop()
    if len(node["path"]) <= shortest_path_length:
      if node["position"] == position_2:
        paths.append(node["path"])
        shortest_path_length = min(shortest_path_length, len(node["path"]))
      else:
        if len(node["path"]) + 1 <= shortest_path_length:
          for arrow, dir in directions.items():
            new_position = (node["position"][0] + dir[0], node["position"][1] + dir[1])
            if new_position != blank and 0 <= new_position[0] < height and 0 <= new_position[1] < width and new_position not in node["visited"]:
              search_queue.append({
                "position": new_position,
                "path": [*node["path"], arrow],
                "visited": [*node["visited"], new_position]
              })
  return fewest_move_sequences(list(filter(lambda p: len(p) <= shortest_path_length, paths)))


def fewest_move_sequences(paths):
  moves = {}
  for path in paths:
    path_moves = 0
    for i in range(1, len(path)):
      if path[i] != path[i - 1]:
        path_moves += 1
    moves[",".join(path)] = path_moves
  fewest_moves = min(moves.values())
  return list(filter(lambda p: moves[",".join(p)] == fewest_moves, paths))


if __name__ == "__main__":
  main()
