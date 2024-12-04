def main():
  with open("src/2024/inputs/day04.txt") as file:
    lines = file.readlines()
    print(f"there are {part_1(lines)} XMASes")
    print(f"there are {part_2(lines)} X-MASes")


def part_1(lines):
  row_count = search_rows(lines)
  col_count = search_cols(lines)
  diag_count = search_diags(lines)
  return row_count + col_count + diag_count


def part_2(lines):
  GOOD_CORNERS = ["MMSS", "MSMS", "SMSM", "SSMM"]
  count = 0
  a_coords = []
  for row in range(len(lines)):
    if row == 0 or row == len(lines) - 1:
      continue
    for col in range(len(lines[row])):
      if row == 0 or row == len(lines[row]) - 1:
        continue
      if lines[row][col] == 'A':
        a_coords.append((row, col))
  for coords in a_coords:
    corners = get_corners(coords, lines)
    if corners in GOOD_CORNERS:
      count += 1
  return count


def search_rows(lines):
  count = 0
  for line in lines:
    for i in range(len(line) - 3):
      word = line[i:i+4]
      if word == "XMAS" or word == "SAMX":
        count += 1
  return count


def search_cols(lines):
  new_lines = []
  for i in range(len(lines)):
    new_line = ""
    for line in lines:
      new_line += line[i]
    new_lines.append(new_line)
  return search_rows(new_lines)


def search_diags(lines):
  new_lines = []
  # https://stackoverflow.com/a/31765926
  # up left to down right
  for j in range(len(lines) - 1, -2, -1):
    line_1 = ""
    line_2 = ""
    for i in range(len(lines)):
      j += 1
      if j >= len(lines):
        break
      line_1 += lines[i][j]
      line_2 += lines[j][i]
    new_lines.append(line_1)
    if line_2 != line_1:
      new_lines.append(line_2)

  # down left to up right - upper left
  for k in range(len(lines) + 1):
    line = ""
    for l in range(k + 1):
      k -= 1
      if k < 0:
        break
      line += lines[k][l]
    new_lines.append(line)

  # down left to up right - lower right
  for n in range(len(lines) - 1, -1, -1):
    line = ""
    for m in range(len(lines) - 1, 0, -1):
      n += 1
      if n >= len(lines):
        break
      line += lines[m][n]
    new_lines.append(line)
  return search_rows(new_lines)


def get_corners(coords, lines):
  row, col = coords
  directions = [(-1, -1), (-1, 1), (1, -1), (1, 1)]
  corners = ""
  for row_offset, col_offset in directions:
    corners += lines[row + row_offset][col + col_offset]
  return corners


if __name__ == "__main__":
  main()
