def main():
  with open("src/2024/inputs/day15.txt") as file:
    raw_text = file.read()
    raw_field, instructions = raw_text.split("\n\n")
    field = parse_field(raw_field)
    print(f"the sum of all boxes's GPS coordinates is {part_1(field, instructions)}")
    wide_field = parse_wide_field(raw_field)
    print(f"the sum of all wide boxes's GPS coordinates is {part_2(wide_field, instructions)}")


def part_1(field, instructions):
  for char in instructions:
    if char == "\n":
      continue
    move_bot(char, field)
  return sum(map(get_coords, field["boxes"]))


def part_2(wide_field, instructions):
  for char in instructions:
    if char == "\n":
      continue
    move_bot_wide(char, wide_field)
  return sum(map(get_wide_coords, wide_field["boxes"]))


def parse_field(raw_field):
  lines = raw_field.split("\n")
  field = {
    "walls": set(),
    "boxes": set(),
    "bot": (0, 0),
  }
  for row in range(len(lines)):
    for col in range(len(lines[row])):
      if lines[row][col] == "#":
        field["walls"].add((row, col))
      elif lines[row][col] == "O":
        field["boxes"].add((row, col))
      elif lines[row][col] == "@":
        field["bot"] = (row, col)
  return field


def parse_wide_field(raw_field):
  lines = raw_field.split("\n")
  field = {
    "walls": set(),
    "boxes": [],
    "bot": (0, 0),
    "width": len(lines[0]) * 2,
    "height": len(lines),
  }
  box_id = 0
  for row in range(len(lines)):
    for c in range(len(lines[row])):
      col = c * 2
      if lines[row][c] == "#":
        field["walls"].add((row, col))
        field["walls"].add((row, col + 1))
      elif lines[row][c] == "O":
        field["boxes"].append({
          "id": box_id,
          "pos": ((row, col), (row, col + 1))
        })
        box_id += 1
      elif lines[row][c] == "@":
        field["bot"] = (row, col)
  return field


def get_coords(box):
  return (box[0] * 100) + box[1]


def move_bot(char, field):
  directions = {
    "^": (-1, 0),
    ">": (0, 1),
    "v": (1, 0),
    "<": (0, -1),
  }
  direction = directions[char]
  next_spot = (field["bot"][0] + direction[0], field["bot"][1] + direction[1])
  if next_spot not in field["walls"]:
    if next_spot not in field["boxes"]:
      field["bot"] = next_spot
    else:
      # look for the next open space in this direction
      next_open_spot = (next_spot[0] + direction[0], next_spot[1] + direction[1])
      while next_open_spot in field["boxes"]:
        next_open_spot = (next_open_spot[0] + direction[0], next_open_spot[1] + direction[1])
      if next_open_spot not in field["walls"]:
        field["bot"] = next_spot
        field["boxes"].remove(next_spot)
        field["boxes"].add(next_open_spot)


def move_bot_wide(char, wide_field):
  directions = {
    "^": (-1, 0),
    ">": (0, 1),
    "v": (1, 0),
    "<": (0, -1),
  }
  direction = directions[char]
  next_spot = (wide_field["bot"][0] + direction[0], wide_field["bot"][1] + direction[1])
  if next_spot not in wide_field["walls"]:
    if not theres_a_box(wide_field, next_spot):
      wide_field["bot"] = next_spot
    else:
      box_ids_to_move = set()
      # look in the direction and find all boxes to move
      # left and right is easier
      if char == "<" or char == ">":
        next_open_spot = (next_spot[0] + direction[0], next_spot[1] + direction[1])
        while theres_a_box(wide_field, next_open_spot):
          box_ids_to_move.add(theres_a_box(wide_field, next_open_spot)["id"])
          next_open_spot = (next_open_spot[0] + direction[0], next_open_spot[1] + direction[1])
        if next_open_spot not in wide_field["walls"]:
          wide_field["bot"] = next_spot
          for id in box_ids_to_move:
            box = next((b for b in wide_field["boxes"] if b["id"] == id), None)
            box["pos"] = (
              (box["pos"][0][0] + direction[0], box["pos"][0][1] + direction[1]),
              (box["pos"][1][0] + direction[0], box["pos"][1][1] + direction[1]),
            )
      # up and down will be harder
      else:
        box_ids_to_move.add(theres_a_box(wide_field, next_spot)["id"])
        while True:
          new_box_ids_to_move = set()
          for id in box_ids_to_move:
            box = next((b for b in wide_field["boxes"] if b["id"] == id), None)
            for spot in box["pos"]:
              next_box = theres_a_box(wide_field, (spot[0] + direction[0], spot[1] + direction[1]))
              if next_box and next_box["id"] not in box_ids_to_move:
                new_box_ids_to_move.add(next_box["id"])
          if len(new_box_ids_to_move) == 0:
            break
          for id in new_box_ids_to_move:
            box_ids_to_move.add(id)
        # is there a wall?
        if not theres_a_wall(box_ids_to_move, wide_field, direction):
          for id in box_ids_to_move:
            box = next((b for b in wide_field["boxes"] if b["id"] == id), None)
            box["pos"] = (
              (box["pos"][0][0] + direction[0], box["pos"][0][1] + direction[1]),
              (box["pos"][1][0] + direction[0], box["pos"][1][1] + direction[1]),
            )
            wide_field["bot"] = next_spot


def get_wide_coords(box):
  return (box["pos"][0][0] * 100) + box["pos"][0][1]


def theres_a_box(wide_field, spot):
  return next((b for b in wide_field["boxes"] if spot in b["pos"]), None)


def theres_a_wall(box_ids_to_move, wide_field, direction):
  for id in box_ids_to_move:
    box = next((b for b in wide_field["boxes"] if b["id"] == id), None)
    next_spots = (
      (box["pos"][0][0] + direction[0], box["pos"][0][1] + direction[1]),
      (box["pos"][1][0] + direction[0], box["pos"][1][1] + direction[1]),
    )
    if next_spots[0] in wide_field["walls"] or next_spots[1] in wide_field["walls"]:
      return True
  return False


if __name__ == "__main__":
  main()
