from math import sqrt
from functools import cache


def main():
    with open("./inputs/day12-sample.txt") as file:
        regions, presents_list = parse_input(file.read())
    part_1(regions, presents_list)


def part_1(regions, presents_list):
    total = sum([1 for i, region in enumerate(regions) if can_fit_presents(region, presents_list, i)])
    print(f"part 1: {total} regions can fit the presents")


def parse_input(file):
    chunks = file.split("\n\n")
    regions = [get_region(line) for line in chunks.pop().split("\n")]
    presents = [get_present(chunk) for chunk in chunks]
    return regions, presents


def get_region(line):
    size, presents = line.split(": ")
    width, height = [int(n) for n in size.split("x")]
    presents = [int(n) for n in presents.split(" ")]
    r = "\n".join(['.' * width] * height)
    return { 'w': width, 'h': height, 'p': presents, 'r': r }


def get_present(chunk):
    lines = chunk.split("\n")
    present_id = int(lines.pop(0)[:1])
    rotations = get_rotations(lines)
    piece_count = sum([1 for c in chunk if c == '#'])
    return { "id": present_id, "rotations": rotations, "piece_count": piece_count }


def get_rotations(lines):
    rotations = [lines]
    for _ in range(3):
        new_lines = [
            f"{rotations[-1][2][0]}{rotations[-1][1][0]}{rotations[-1][0][0]}",
            f"{rotations[-1][2][1]}{rotations[-1][1][1]}{rotations[-1][0][1]}",
            f"{rotations[-1][2][2]}{rotations[-1][1][2]}{rotations[-1][0][2]}",
        ]
        if new_lines not in rotations:
            rotations.append(new_lines)
    return rotations


@cache
def get_relevant_area(r):
    piece_count = sum([1 for c in r if c == '#'])
    if piece_count == 0:
        return {
            'w': [0, 1],
            'h': [0, 1],
        }

    field = r.split("\n")

    lowest_width_with_something = None
    highest_width_with_something = 0
    for wi in range(len(field[0])):
        column = [r[wi] for r in field]
        if '#' in column:
            if lowest_width_with_something is None:
                lowest_width_with_something = wi
            highest_width_with_something = wi
    lowest_height_with_something = None
    highest_height_with_something = 0
    for hi in range(len(field)):
        if '#' in field[hi]:
            if lowest_height_with_something is None:
                lowest_height_with_something = hi
            highest_height_with_something = hi

    return {
        'w': [max(lowest_width_with_something - 3, 0), min(highest_width_with_something + 3, len(field[0]))],
        'h': [max(lowest_height_with_something - 3, 0), min(highest_height_with_something + 3, len(field))],
    }


def get_bloat(r):
    piece_count = sum([1 for c in r if c == '#'])
    if piece_count == 0:
        return 0

    fewest_edges = sqrt(piece_count) * 4

    field = r.split("\n")

    relevant_area = get_relevant_area(r)

    edge_count = 0
    for wi in range(*relevant_area['w']):
        for hi in range(*relevant_area['h']):
            try:
                if field[hi][wi] == '#':
                    if hi == 0 or field[hi-1][wi] == '.':
                        edge_count += 1
                    if hi == len(field) - 1 or field[hi+1][wi] == '.':
                        edge_count += 1

                    if wi == 0 or field[hi][wi-1] == '.':
                        edge_count += 1
                    if wi == len(field[0]) - 1 or field[hi][wi+1] == '.':
                        edge_count += 1
            except IndexError:
                pass

    return edge_count / fewest_edges


def place_present(present, region, w, h):
    field = region['r'].split('\n')

    new_rows = [
        field[h][:w],
        field[h + 1][:w],
        field[h + 2][:w],
    ]

    new_rows[0] += '.' if present[0][0] == '.' and field[h + 0][w + 0] == '.' else '#'
    new_rows[0] += '.' if present[0][1] == '.' and field[h + 0][w + 1] == '.' else '#'
    new_rows[0] += '.' if present[0][2] == '.' and field[h + 0][w + 2] == '.' else '#'
    new_rows[0] += field[h][w+3:]

    new_rows[1] += '.' if present[1][0] == '.' and field[h + 1][w + 0] == '.' else '#'
    new_rows[1] += '.' if present[1][1] == '.' and field[h + 1][w + 1] == '.' else '#'
    new_rows[1] += '.' if present[1][2] == '.' and field[h + 1][w + 2] == '.' else '#'
    new_rows[1] += field[h + 1][w + 3:]

    new_rows[2] += '.' if present[2][0] == '.' and field[h + 2][w + 0] == '.' else '#'
    new_rows[2] += '.' if present[2][1] == '.' and field[h + 2][w + 1] == '.' else '#'
    new_rows[2] += '.' if present[2][2] == '.' and field[h + 2][w + 2] == '.' else '#'
    new_rows[2] += field[h + 2][w + 3:]

    field = [
        *field[:h],
        *new_rows,
        *field[h+3:],
    ]

    return '\n'.join(field)


def can_present_go_here(present, region, w, h):
    if w > region['w'] - 3 or h > region['h'] - 3:
        return False
    field = region['r'].split('\n')
    for p_w in range(3):
        for p_h in range(3):
            if field[h+p_h][w+p_w] == '#' and present[p_h][p_w] == '#':
                return False
    return True


def can_fit_presents_r(region, presents_list):
    if sum(region['p']) == 0:
        return True

    present = None
    for i, p in enumerate(region['p']):
        if p > 0:
            present = presents_list[i]
            region['p'][i] -= 1
            break

    possible_fits = get_possible_fits(present, region)
    ...


def can_fit_presents(region, presents_list, i):
    print(f"testing region {i}")

    presents = []

    for pi, pc in enumerate(region['p']):
        for _ in range(pc):
            presents.append(pi)

    starting_node = {
        'remaining_present_ids': [*presents],
        'r': region['r'],
    }

    queue = [starting_node]

    while len(queue) > 0:
        node = queue.pop()
        minimum_space_needed = sum([presents_list[id]['piece_count'] for id in node['remaining_present_ids']])
        space_remaining = get_space_remaining(node['r'])
        if space_remaining >= minimum_space_needed:
            possible_fits = get_possible_fits(
                presents_list[node['remaining_present_ids'][0]],
                {'w': region['w'], 'h': region['h'], 'p': region['p'], 'r': node['r']},
            )
            if possible_fits:
                if len(node['remaining_present_ids']) == 1:
                    return True
                queue = [
                    *queue,
                    *[{
                        'remaining_present_ids': [*node['remaining_present_ids'][1:]],
                        'r': pf['r'],
                    } for pf in possible_fits],
                ]

    return False


def get_space_remaining(r):
    piece_count = sum([1 for c in r if c == '#'])
    field = r.split('\n')
    if piece_count == 0:
        return len(field) * len(field[0])

    groups = get_groups(field)

    return sum([len(g) for g in groups if len(g) >= 5])


def get_groups(field):
    groups = []
    visited = set()

    for wi in range(len(field[0])):
        for hi in range(len(field)):
            key = f'{wi},{hi}'
            if key not in visited:
                visited.add(key)
                if field[hi][wi] == '.':
                    group = [key]
                    for node in group:
                        w, h = [int(n) for n in node.split(',')]
                        neighbors = [[w - 1, h], [w + 1, h], [w, h - 1], [w, h + 1]]
                        for n in neighbors:
                            nwi, nhi = n
                            n_key = f'{nwi},{nhi}'
                            if 0 <= nwi < len(field[0]) and 0 <= nhi < len(field) and n_key not in visited:
                                visited.add(n_key)
                                if field[nhi][nwi] == '.':
                                    group.append(n_key)
                    groups.append(group)
    return groups


def get_possible_fits(present, region):
    possible_fits = []
    relevant_area = get_relevant_area(region['r'])
    for w in range(*relevant_area['w']):
        for h in range(*relevant_area['h']):
            for rotation in present['rotations']:
                if can_present_go_here(rotation, region, w, h):
                    r = place_present(rotation, region, w, h)
                    possible_fits.append({
                        'r': r,
                        'bloat': get_bloat(r)
                    })

    possible_fits.sort(key=lambda f: f['bloat'])

    return [pf for pf in possible_fits if pf['bloat'] == possible_fits[0]['bloat']]


if __name__ == "__main__":
    main()
