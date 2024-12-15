from parse import *


def main():
  with open("src/2024/inputs/day14.txt") as file:
    lines = file.readlines()
    robots = list(map(parse_robot, lines))
    print(f"the safety factor after 100 seconds is {part_1(robots, sample=len(robots) < 100)}")

    robots = list(map(parse_robot, lines))
    part_2(robots, sample=len(robots) < 100)
    print()
    print("hopefully you can find the part 2 answer above!!")


def part_1(robots, sample=False):
  width = 11 if sample else 101
  height = 7 if sample else 103
  q1, q2, q3, q4 = 0, 0, 0, 0
  for robot in robots:
    move_robot(robot, width, height, 100)
    if robot["px"] < (width - 1) / 2 and robot["py"] < (height - 1) / 2:
      q1 += 1
    if robot["px"] > (width - 1) / 2 and robot["py"] < (height - 1) / 2:
      q2 += 1
    if robot["px"] < (width - 1) / 2 and robot["py"] > (height - 1) / 2:
      q3 += 1
    if robot["px"] > (width - 1) / 2 and robot["py"] > (height - 1) / 2:
      q4 += 1
  return q1 * q2 * q3 * q4


def part_2(robots, sample=False):
  width = 11 if sample else 101
  height = 7 if sample else 103
  print()
  print("starting positions:")
  draw_field(robots, width, height)
  for s in range(10000):
    for robot in robots:
      move_robot(robot, width, height, 1)
    if s >= 1000:
      print()
      print(f"after {s+1} seconds:")
      draw_field(robots, width, height)


def parse_robot(line):
  r = parse("p={},{} v={},{}", line)
  return {
    "px": int(r.fixed[0]),
    "py": int(r.fixed[1]),
    "vx": int(r.fixed[2]),
    "vy": int(r.fixed[3]),
  }


def move_robot(robot, width, height, steps):
  robot["px"] = (robot["px"] + (robot["vx"] * steps)) % width
  robot["py"] = (robot["py"] + (robot["vy"] * steps)) % height


def draw_field(robots, width, height):
  field = [" " * width] * height
  for robot in robots:
    field[robot["py"]] = f"{field[robot["py"]][:robot["px"]]}*{field[robot["py"]][robot["px"]+1:]}"
  for row in field:
    print(row)


if __name__ == "__main__":
  main()
