def main():
    with open("./inputs/day01-sample.txt") as file:
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


# not 5656
def part_2(lines):
    dial = 50
    zero_count = 0
    for line in lines:
        dir = line[0]
        dist = int(line[1:])
        # print("dial", dial)
        # print(dir, dist)
        while dist >= 100:
            if dial != 0:
                zero_count += 1
            dist -= 100
        new_dial = dial + dist if dir == 'R' else dial - dist
        if new_dial < 0:
            if dial != 0:
                zero_count += 1
            new_dial += 100
        elif new_dial > 99:
            zero_count += 1
            new_dial -= 100
        elif new_dial == 0:
            zero_count += 1
        dial = new_dial
        # print("new_dial", dial)
        # print("zero_count", zero_count)
        # print()
        # print()



        # if dir == 'L':
        #     dial -= dist
        # elif dir == 'R':
        #     dial += dist
        # if dial < 0 or dial > 99:
        #     zero_count += 1
        #     dial = dial % 100
        # if dial == 0:
        #     zero_count += 1
    print(f"part 2 zero count: {zero_count}")



if __name__ == "__main__":
  main()
