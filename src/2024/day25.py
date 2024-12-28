def main():
  with open("src/2024/inputs/day25.txt") as file:
    print(f"there are {part_1(file.read())} unique lock/key pairs that fit")


def part_1(input):
  locks, keys = parse_input(input)
  good_pairs = 0
  for lock in locks:
    for key in keys:
      if do_they_fit(lock, key):
        good_pairs += 1
  return good_pairs


def parse_input(input):
  locks = []
  keys = []
  chunks = input.strip().split("\n\n")
  for chunk in chunks:
    heights = get_chunk_heights(chunk)
    if chunk.startswith("#####"):
      locks.append(heights)
    elif chunk.startswith("....."):
      keys.append(heights)
  return locks, keys


def get_chunk_heights(chunk):
  heights = []
  lines = chunk.strip().split("\n")
  for i in range(len(lines[0])):
    count = 0
    for j in range(len(lines)):
      if lines[j][i] == "#":
        count += 1
    heights.append(count - 1)
  return heights


def do_they_fit(lock, key):
  space = 5
  for i in range(len(lock)):
    if lock[i] + key[i] > space:
      return False
  return True


if __name__ == "__main__":
  main()
