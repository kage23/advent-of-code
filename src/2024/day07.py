def main():
  with open("src/2024/inputs/day07.txt") as file:
    lines = file.readlines()
    print(f"the total calibration result is {part_1(lines)}")
    print(f"the actual calibration result is {part_2(lines)}")


def part_1(lines):
  result = 0
  for line in lines:
    result += evaluate_line(line.strip())
  return result


def part_2(lines):
  result = 0
  for line in lines:
    result += evaluate_line(line.strip(), True)
  return result


def evaluate_line(line, part2=False):
  target, starting_nodes = parse_line(line, part2)
  search_queue = [*starting_nodes]
  while len(search_queue) > 0:
    node = search_queue.pop()
    if len(node["values"]) == 1:
      if node["values"][0] == target:
        return target
    else:
      value = get_next_value(node)
      new_values = [value, *node["values"][2:]]
      search_queue.append({
        "values": new_values,
        "next_op": "+",
      })
      search_queue.append({
        "values": new_values,
        "next_op": "*",
      })
      if part2:
        search_queue.append({
        "values": new_values,
        "next_op": "||",
      })
  return 0


def parse_line(line, part2):
  t, v = line.split(": ")
  target = int(t)
  values = list(map(int, v.split(" ")))
  nodes = [
    {
      "values": values,
      "next_op": "+",
    },
    {
      "values": values,
      "next_op": "*",
    }
  ]
  if part2:
    nodes.append({
      "values": values,
      "next_op": "||",
    })
  return target, nodes


def get_next_value(node):
  next_value = 0
  if node["next_op"] == "+":
    next_value = node["values"][0] + node["values"][1]
  elif node["next_op"] == "*":
    next_value = node["values"][0] * node["values"][1]
  elif node["next_op"] == "||":
    next_value = int(f"{node["values"][0]}{node["values"][1]}")
  return next_value


if __name__ == "__main__":
  main()
