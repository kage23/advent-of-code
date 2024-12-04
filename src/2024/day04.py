import re


def main():
  with open("src/2024/inputs/day04-sample.txt") as file:
    lines = file.readlines()
    print(f"there are {part_1(lines)} XMASes")
    # print(f"the result is actually {part_2("".join(lines))}")


def part_1(lines):
  row_count = search_rows(lines)
  col_count = search_cols(lines)
  diag_count = search_diags(lines)
  return row_count + col_count + diag_count


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
  for i in range(len(lines)):
    new_line = ""


  return 0




if __name__ == "__main__":
  main()
