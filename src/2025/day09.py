def main():
    with open("./inputs/day09.txt") as file:
        lines = file.readlines()
    part_1(lines)
    part_2(lines)


def part_1(lines):
    tiles = list(map(lambda line: list(map(int, line.split(','))), lines))
    areas = []
    for i, tile in enumerate(tiles):
        for j in range(i + 1, len(tiles)):
            tile2 = tiles[j]
            areas.append(get_area(tile, tile2))
    areas.sort()
    print(f"part 1: the largest rectangle area is {areas.pop()}")


# not 4738108384
# not 4582310446 - too high
def part_2(lines):
    tiles = list(map(lambda line: list(map(int, line.split(','))), lines))
    areas = []
    for i, tile1 in enumerate(tiles):
        for j in range(i + 1, len(tiles)):
            tile2 = tiles[j]
            tile3 = [tile2[0], tile1[1]]
            tile4 = [tile1[0], tile2[1]]
            if (
                is_contained(tile3, tiles) and
                is_contained(tile4, tiles) and
                all(not_in(tile, tile1, tile2, tile3, tile4) for tile in tiles)
            ):
                areas.append(get_area(tile1, tile2))
    areas.sort()
    print(f"part 2: the largest contained rectangle area is {areas.pop()}")


def get_area(t_1, t_2):
    width = max(t_1[0], t_2[0]) - min(t_1[0], t_2[0]) + 1
    height = max(t_1[1], t_2[1]) - min(t_1[1], t_2[1]) + 1
    return width * height


def is_contained(tile, tiles):
    if tile in tiles:
        return True
    intersection_count = 0
    for i, t in enumerate(tiles):
        prev_t = tiles[i - 1]
        is_vertical = t[0] == prev_t[0]
        if is_vertical:
            if min(t[1], prev_t[1]) <= tile[1] + 0.1 <= max(t[1], prev_t[1]) and tile[0] >= t[0]:
                intersection_count += 1
        elif tile[1] == t[1] and min(t[0], prev_t[0]) <= tile[0] <= max(t[0], prev_t[0]):
            return True
    return bool(intersection_count % 2)


def not_in(tile, tile1, tile2, tile3, tile4):
    if tile == tile1 or tile == tile2 or tile == tile3 or tile == tile4:
        return True
    xs = set([tile1[0], tile2[0], tile3[0], tile4[0]])
    ys = set([tile1[1], tile2[1], tile3[1], tile4[1]])
    if (
        (tile[0] in xs and min(ys) <= tile[1] <= max(ys)) or
        (tile[1] in ys and min(xs) <= tile[0] <= max(xs))
    ):
        return True
    return not (
        min(tile1[0], tile2[0]) <= tile[0] <= max(tile1[0], tile2[0]) and
        min(tile1[1], tile2[1]) <= tile[1] <= max(tile1[1], tile2[1])
    )

if __name__ == "__main__":
  main()
