def main():
    with open("./inputs/day05.txt") as file:

        lines = file.read()
        [fresh_ranges, ingredient_ids] = lines.split("\n\n")
    part_1(fresh_ranges, ingredient_ids)
    part_2(fresh_ranges)


def part_1(fresh_ranges, ingredient_ids):
    count = 0
    for id in ingredient_ids.split("\n"):
        if is_fresh(int(id), fresh_ranges):
            count += 1
    print(f"part 1: {count} fresh ingredients")


# not 312107082388087
def part_2(fresh_ranges):
    count = 0
    sorted_ranges = sorted(fresh_ranges.split("\n"), key=lambda r: int(r.split('-')[0]))
    combined_ranges = combine_ranges(sorted_ranges)
    for r in combined_ranges:
        count += (r[1] - r[0] + 1)
    print(f"part 2: {count} possible fresh ingredients")


def is_fresh(id, fresh_ranges):
    for r in fresh_ranges.split("\n"):
        start, end = r.split("-")
        if int(start) <= int(id) <= int(end):
            return True
    return False


def combine_ranges(sorted_ranges):
    combined_ranges = []
    for i in range(len(sorted_ranges)):
        r = sorted_ranges[i]
        start, end = map(int, r.split("-"))
        if len(combined_ranges) == 0:
            combined_ranges.append([start, end])
        else:
            prev_end = combined_ranges[-1][1]
            if start <= prev_end + 1:
                combined_ranges[-1][1] = max(end, combined_ranges[-1][1])
            else:
                combined_ranges.append([start, end])
    return combined_ranges


if __name__ == "__main__":
  main()
