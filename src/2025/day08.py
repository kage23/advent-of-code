import math


def main():
    with open("./inputs/day08.txt") as file:
        lines = file.readlines()
    part_1(lines)
    part_2(lines)


def part_1(lines):
    junctions = get_junctions(lines)
    circuits, _ = make_connections(junctions, 1000)
    size = len(circuits[0]) * len(circuits[1]) * len(circuits[2])
    print(f"part 1: the size product is {size}")


def part_2(lines):
    junctions = get_junctions(lines)
    circuits, pair = make_connections(junctions)
    check = junctions[pair[0]][0] * junctions[pair[1]][0]
    print(f"part 2: the x coord product is {check}")


def get_junctions(lines):
    return list(map(lambda line: list(map(int, line.strip().split(','))), lines))


def make_connections(junctions, n = None):
    junction_pairs = []
    for i, junction in enumerate(junctions):
        for j in range(i + 1, len(junctions)):
            pair_key = f"{i}-{j}"
            junction_pairs.append((pair_key, math.dist(junction, junctions[j])))
    junction_pairs.sort(key=lambda x: x[1])

    circuits = list(map(lambda x: [x], range(len(junctions))))
    i = 0

    while True:
        pair = list(map(int, junction_pairs[i][0].split("-")))
        p_0_c = -1
        p_1_c = -1
        for ci, circuit in enumerate(circuits):
            if pair[0] in circuit:
                p_0_c = ci
            if pair[1] in circuit:
                p_1_c = ci
        if p_0_c == -1 and p_1_c == -1:
            circuits.append(pair)
        elif p_0_c == -1:
            circuits[p_1_c].append(pair[0])
        elif p_1_c == -1:
            circuits[p_0_c].append(pair[1])
        elif p_0_c != p_1_c:
            circuits[p_0_c] += circuits[p_1_c]
            circuits.pop(p_1_c)
        i +=1
        if i == n or len(circuits) == 1:
            break
    circuits.sort(key=lambda x: -len(x))

    return circuits, pair


if __name__ == "__main__":
  main()
