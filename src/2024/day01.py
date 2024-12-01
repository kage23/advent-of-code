def main():
  with open("inputs/day01.txt") as file:
    lines = file.readlines()
  part_1(lines)
  part_2(lines)


def part_1(lines):
  left, right = split_to_left_and_right(lines)

  dist = 0
  for i in range(len(left)):
    l = left[i]
    r = right[i]
    dist += abs(l - r)

  print(f"total distance: {dist}")


def part_2(lines):
  left, right = split_to_left_and_right(lines)
  right_count = {}
  for r in right:
    rc = right_count[r] if r in right_count else 0
    rc += 1
    right_count[r] = rc

  similarity_score = 0
  for l in left:
    rc = right_count[l] if l in right_count else 0
    l_score = l * rc
    similarity_score += l_score

  print(f"similarity score: {similarity_score}")


def split_to_left_and_right(lines):
  left = []
  right = []

  for line in lines:
    l, r = map(int, line.split("   "))
    left.append(l)
    right.append(r)

  left = sorted(left)
  right = sorted(right)

  return left, right


if __name__ == "__main__":
  main()
