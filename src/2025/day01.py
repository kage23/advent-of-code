def main():
    with open("./inputs/day01.txt") as file:
        lines = file.readlines()
    part_1(lines)
    part_2(lines)


def part_1(lines):
    dial = 50
    zero_count = 0
    for line in lines:
        dir = line[0]
        dist = int(line[1:])
        if dir == 'L':
            dial = (dial - dist) % 100
        elif dir == 'R':
            dial = (dial + dist) % 100
        if dial == 0:
            zero_count += 1
    print(f"part 1 zero count: {zero_count}")


def part_2(lines):
    dial = 50
    zero_count = 0
    for line in lines:
        dir = line[0]
        dist = int(line[1:])
        dial, zero_count = turn_dial(dial, dir, dist, zero_count)
    print(f"part 2 zero count: {zero_count}")


def turn_dial(dial, dir, dist, zero_count):
    if dir == 'R':
        dial = dial + dist
        while dial >= 100:
            dial -= 100
            zero_count += 1
        return dial, zero_count
    elif dir == 'L':
        new_dial = dial - dist
        if new_dial < 0:
            while new_dial < 0:
                new_dial += 100
                zero_count += 1
        if new_dial == 0:
            zero_count += 1
        if dial == 0: zero_count -= 1  # this is dumb but if we started at 0, we double counted it
        return new_dial, zero_count

    return dial, zero_count


if __name__ == "__main__":
  main()
