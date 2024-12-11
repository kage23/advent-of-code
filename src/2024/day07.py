from functools import reduce


def main():
  with open("src/2024/inputs/day07.txt") as file:
    lines = file.readlines()
    print(f"the total calibration result is {part_1(lines)}")
    # print(f"there are {part_2(field)} possible locations for the new obstruction")


def part_1(lines):
  result = 0
  for line in lines:
    result += evaluate_line(line)
  return result


def part_2(lines):
  ...


def evaluate_line(line):
  target, starting_nodes = parse_line(line)
  search_queue = [*starting_nodes]
  while len(search_queue) > 0:
    node = search_queue.pop()
    if len(node["values"]) == 1:
      if node["values"][0] == target:
        return target
    else:
      value = (node["values"][0] + node["values"][1]) if node["next_op"] == "+" else (node["values"][0] * node["values"][1])
      new_values = [value, *node["values"][2:]]
      search_queue.append({
        "values": new_values,
        "next_op": "+",
      })
      search_queue.append({
        "values": new_values,
        "next_op": "*",
      })
  return 0


def parse_line(line):
  t, v = line.split(": ")
  target = int(t)
  values = list(map(int, v.split(" ")))
  return target, [
    {
      "values": values,
      "next_op": "+",
    },
    {
      "values": values,
      "next_op": "*",
    }
  ]


if __name__ == "__main__":
  main()
