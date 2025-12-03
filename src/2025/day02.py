def main():
    with open("./inputs/day02.txt") as file:
        lines = file.readlines()
    part_1(lines[0])
    part_2(lines[0])


def part_1(ids):
    invalid_sum = 0
    for id_range in ids.split(','):
        [start, end] = id_range.split('-')
        for id in range(int(start), int(end) + 1):
            if is_invalid(id):
                invalid_sum += int(id)
    print(f"part 1 invalid sum: {invalid_sum}")



def part_2(ids):
    invalid_sum = 0
    for id_range in ids.split(','):
        [start, end] = id_range.split('-')
        for id in range(int(start), int(end) + 1):
            if is_invalid_2(id):
                invalid_sum += int(id)
    print(f"part 2 invalid sum: {invalid_sum}")


def is_invalid(id):
    id_length = len(str(id))
    if id_length % 2 == 1:
        return False
    left = int(str(id)[:id_length//2])
    right = int(str(id)[id_length//2:])
    return left == right


def is_invalid_2(id):
    id_length = len(str(id))
    for l in range(1, id_length // 2 + 1):
        if id_length % l == 0:
            root = str(id)[:l]
            new_one = int(root * (id_length // l))
            if new_one == id:
                return True
    return False


if __name__ == "__main__":
  main()
