from functools import reduce


def main():
  with open("src/2024/inputs/day08.txt") as file:
    lines = file.readlines()
    print(f"there are {part_1(lines)} unique antinode locations")
    print(f"there are actually {part_2(lines)} unique antinode locations")


def part_1(lines):
  antennae = parse_input(lines)
  antinodes = set()
  for _, locations in antennae.items():
    for x in range(len(locations) - 1):
      for y in range(x+1, len(locations)):
        possible_antinodes = get_antinodes(locations[x], locations[y])
        for possible_antinode in possible_antinodes:
          if 0 <= possible_antinode[0] < len(lines) and 0 <= possible_antinode[1] < len(lines[0].strip()):
            antinodes.add(possible_antinode)
  return len(antinodes)


def part_2(lines):
  antennae = parse_input(lines)
  antinodes = set()
  for _, locations in antennae.items():
    for x in range(len(locations) - 1):
      for y in range(x+1, len(locations)):
        local_antinodes = get_antinodes_part_2(locations[x], locations[y], len(lines), len(lines[0].strip()))
        for antinode in local_antinodes:
          antinodes.add(antinode)
  return len(antinodes)


def parse_input(lines):
  antennae = {}
  for row in range(len(lines)):
    for col in range(len(lines[row].strip())):
      if lines[row][col] != ".":
        antenna_list = antennae[lines[row][col]] if lines[row][col] in antennae else []
        antenna_list.append((row, col))
        antennae[lines[row][col]] = antenna_list
  return antennae


def get_antinodes(location_1, location_2):
  row_diff = location_2[0] - location_1[0]
  col_diff = location_2[1] - location_1[1]
  return [
    (location_1[0] - row_diff, location_1[1] - col_diff),
    (location_2[0] + row_diff, location_2[1] + col_diff),
  ]


def get_antinodes_part_2(location_1, location_2, height, width):
  row_diff = location_2[0] - location_1[0]
  col_diff = location_2[1] - location_1[1]
  antinodes = [location_1, location_2]
  next_row, next_col = location_1[0], location_1[1]
  while True:
    next_row -= row_diff
    next_col -= col_diff
    if 0 <= next_row < height and 0 <= next_col < width:
      antinodes.append((next_row, next_col))
    else:
      break
  next_row, next_col = location_2[0], location_2[1]
  while True:
    next_row += row_diff
    next_col += col_diff
    if 0 <= next_row < height and 0 <= next_col < width:
      antinodes.append((next_row, next_col))
    else:
      break
  return antinodes



if __name__ == "__main__":
  main()
