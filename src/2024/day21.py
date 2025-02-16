NUMPAD_DIRECTIONS = {
  ("A", "A"): "A",
  ("A", "0"): "<A",
  ("A", "1"): "^<<A",
  ("A", "2"): "<^A",
  ("A", "3"): "^A",
  ("A", "4"): "^^<<A",
  ("A", "5"): "<^^A",
  ("A", "6"): "^^A",
  ("A", "7"): "^^^<<A",
  ("A", "8"): "<^^^A",
  ("A", "9"): "^^^A",
  ("0", "A"): ">A",
  ("0", "0"): "A",
  ("0", "1"): "^<A",
  ("0", "2"): "^A",
  ("0", "3"): "^>A",
  ("0", "4"): "^^<A",
  ("0", "5"): "^^A",
  ("0", "6"): "^^>A",
  ("0", "7"): "^^^<A",
  ("0", "8"): "^^^A",
  ("0", "9"): "^^^>A",
  ("1", "A"): ">>vA",
  ("1", "0"): ">vA",
  ("1", "1"): "A",
  ("1", "2"): ">A",
  ("1", "3"): ">>A",
  ("1", "4"): "^A",
  ("1", "5"): "^>A",
  ("1", "6"): "^>>A",
  ("1", "7"): "^^A",
  ("1", "8"): "^^>A",
  ("1", "9"): "^^>>A",
  ("2", "A"): "v>A",
  ("2", "0"): "vA",
  ("2", "1"): "<A",
  ("2", "2"): "A",
  ("2", "3"): ">A",
  ("2", "4"): "<^A",
  ("2", "5"): "^A",
  ("2", "6"): "^>",
  ("2", "7"): "<^^A",
  ("2", "8"): "^^A",
  ("2", "9"): "^^>A",
  ("3", "A"): "vA",
  ("3", "0"): "<vA",
  ("3", "1"): "<<A",
  ("3", "2"): "<A",
  ("3", "3"): "A",
  ("3", "4"): "<<^A",
  ("3", "5"): "<^A",
  ("3", "6"): "^A",
  ("3", "7"): "<<^^A",
  ("3", "8"): "<^^A",
  ("3", "9"): "^^A",
  ("4", "A"): ">>vvA",
  ("4", "0"): ">vvA",
  ("4", "1"): "vA",
  ("4", "2"): "v>A",
  ("4", "3"): "v>>A",
  ("4", "4"): "A",
  ("4", "5"): ">A",
  ("4", "6"): ">>A",
  ("4", "7"): "^A",
  ("4", "8"): "^>A",
  ("4", "9"): "^>>A",
  ("5", "A"): "vv>A",
  ("5", "0"): "vvA",
  ("5", "1"): "<vA",
  ("5", "2"): "vA",
  ("5", "3"): "v>A",
  ("5", "4"): "<A",
  ("5", "5"): "A",
  ("5", "6"): ">A",
  ("5", "7"): "<^A",
  ("5", "8"): "^A",
  ("5", "9"): "^>A",
  ("6", "A"): "vvA",
  ("6", "0"): "<vvA",
  ("6", "1"): "<<vA",
  ("6", "2"): "<vA",
  ("6", "3"): "vA",
  ("6", "4"): "<<A",
  ("6", "5"): "<A",
  ("6", "6"): "A",
  ("6", "7"): "<<^A",
  ("6", "8"): "<^A",
  ("6", "9"): "^A",
  ("7", "A"): ">>vvvA",
  ("7", "0"): ">vvvA",
  ("7", "1"): "vvA",
  ("7", "2"): "vv>A",
  ("7", "3"): "vv>>A",
  ("7", "4"): "vA",
  ("7", "5"): "v>A",
  ("7", "6"): "v>>A",
  ("7", "7"): "A",
  ("7", "8"): ">A",
  ("7", "9"): ">>A",
  ("8", "A"): "vvv>A",
  ("8", "0"): "vvvA",
  ("8", "1"): "<vvA",
  ("8", "2"): "vvA",
  ("8", "3"): "vv>A",
  ("8", "4"): "<vA",
  ("8", "5"): "vA",
  ("8", "6"): "v>A",
  ("8", "7"): "<A",
  ("8", "8"): "A",
  ("8", "9"): ">A",
  ("9", "A"): "vvvA",
  ("9", "0"): "<vvvA",
  ("9", "1"): "<<vvA",
  ("9", "2"): "<vvA",
  ("9", "3"): "vvA",
  ("9", "4"): "<<vA",
  ("9", "5"): "<vA",
  ("9", "6"): "vA",
  ("9", "7"): "<<A",
  ("9", "8"): "<A",
  ("9", "9"): "A",
}


ARROW_DIRECTIONS = {
  ("A", "A"): "A",
  ("A", "^"): "<A",
  ("A", "<"): "v<<A",
  ("A", "v"): "<vA",
  ("A", ">"): "vA",
  ("^", "A"): ">A",
  ("^", "^"): "A",
  ("^", "<"): "v<A",
  ("^", "v"): "vA",
  ("^", ">"): "v>A",
  ("<", "A"): ">>^A",
  ("<", "^"): ">^A",
  ("<", "<"): "A",
  ("<", "v"): ">A",
  ("<", ">"): ">>A",
  ("v", "A"): "^>A",
  ("v", "^"): "^A",
  ("v", "<"): "<A",
  ("v", "v"): "A",
  ("v", ">"): ">A",
  (">", "A"): "^A",
  (">", "^"): "<^A",
  (">", "<"): "<<A",
  (">", "v"): "<A",
  (">", ">"): "A",
}


def main():
  with open("src/2024/inputs/day21.txt") as file:
    codes = file.read().split("\n")
    print(f"the sum of the complexities of all codes in the list is {part_1(codes)}")
    print(f"the sum of the complexities of all codes in the list with more robots is {part_2(codes)}")


def part_1(codes):
  final_sum = 0
  for code in codes:
    first_robot_path = get_robot_instructions(code, "numpad")
    second_robot_path = get_robot_instructions(first_robot_path, "arrow")
    third_robot_path = get_robot_instructions(second_robot_path, "arrow")
    complexity = len(third_robot_path) * int(code[:-1])
    final_sum += complexity
  return final_sum


def part_2(codes):
  final_sum = 0
  for code in codes:
    numpad_robot_path = get_robot_instructions(code, "numpad")
    robot_moves = get_moves_from_path(numpad_robot_path)
    for _ in range(25):
      robot_moves = get_next_moves_from_moves(robot_moves)
    path_length = 0
    for path, count in robot_moves.items():
      path_length += len(path) * count
    complexity = path_length * int(code[:-1])
    final_sum += complexity
  return final_sum


def get_moves_from_path(path):
  moves = {}
  robot_moves = list(map(lambda p: f"{p}A", path.split("A")[:-1]))
  for move in robot_moves:
    count = moves[move] if move in moves else 0
    moves[move] = count + 1
  return moves


def get_next_moves_from_moves(from_moves):
  next_moves = {}
  for path, count in from_moves.items():
    moves = get_moves_from_path(path)
    for move, sub_count in moves.items():
      next_robot_moves = get_next_moves(move)
      for next_move, next_count in next_robot_moves.items():
        pending_count = next_moves[next_move] if next_move in next_moves else 0
        next_moves[next_move] = pending_count + (next_count * sub_count * count)
  return next_moves

def get_next_moves(move):
  path = ""
  for i, char in enumerate(move):
    prev = "A" if i == 0 else move[i - 1]
    path += ARROW_DIRECTIONS[(prev, char)]
  next_moves = get_moves_from_path(path)
  return next_moves


def get_robot_instructions(code, button_type):
  button_directions = NUMPAD_DIRECTIONS if button_type == "numpad" else ARROW_DIRECTIONS
  path = ""
  for i, to_key in enumerate(code):
    from_key = code[i-1] if i != 0 else "A"
    path += button_directions[(from_key, to_key)]
  return path


if __name__ == "__main__":
  main()
