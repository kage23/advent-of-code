def main():
  with open("src/2024/inputs/day09.txt") as file:
    line = file.read()
    print(f"the compacted file system's checksum is {part_1(line)}")
    print(f"the defragged file system's checksum is {part_2(line)}")


def part_1(line):
  disk = analyze_disk(line)
  compact_disk(disk)
  return get_checksum(disk)


def part_2(line):
  return defrag_disk(line)


def analyze_disk(line):
  disk = []
  id = 0
  for i in range(len(line.strip())):
    if i % 2 == 0:
      # it represents a file
      for j in range(int(line[i])):
        disk.append(id)
      id += 1
    else:
      # it represents a space
      for j in range(int(line[i])):
        disk.append(None)
  return disk


def compact_disk(disk):
  first_gap = disk.index(None)
  last_real = get_last_real_index(disk)
  while first_gap < last_real:
    disk[first_gap] = disk[last_real]
    disk[last_real] = None
    first_gap = disk.index(None)
    last_real = get_last_real_index(disk)


def get_last_real_index(disk):
  for r_idx, elt in enumerate(reversed(disk)):
    if elt != None:
      return len(disk) - 1 - r_idx


def get_checksum(disk):
  checksum = 0
  for i in range(len(disk)):
    if disk[i] != None:
      checksum += (i * disk[i])
  return checksum


def defrag_disk(line):
  file_ids_and_sizes_and_starts = []
  gap_locations_and_sizes = []
  id = 0
  location = 0
  for i in range(len(line.strip())):
    if i % 2 == 0:
      # it's a file
      file_ids_and_sizes_and_starts.append([id, int(line[i]), location])
      id += 1
    else:
      # it's a gap
      gap_locations_and_sizes.append([location, int(line[i])])
    location += int(line[i])
  last_id = int((len(line) - 1) / 2)
  for id, size, start in reversed(file_ids_and_sizes_and_starts):
    gap_index, gap_start = find_big_enough_gap(gap_locations_and_sizes, size, start)
    if gap_start:
      file_ids_and_sizes_and_starts[id][2] = gap_start
      gap_locations_and_sizes[gap_index][0] += size
      gap_locations_and_sizes[gap_index][1] -= size
  checksum = 0
  for id, size, start in file_ids_and_sizes_and_starts:
    for i in range(size):
      checksum += id * (start + i)
  return checksum



def find_big_enough_gap(gap_locations_and_sizes, size, file_start):
  for i, gap in enumerate(gap_locations_and_sizes):
    gap_start, gap_size = gap
    if gap_size >= size and file_start > gap_start:
      return i, gap_start
  return None, None


if __name__ == "__main__":
  main()
