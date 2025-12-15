def main():
    with open("./inputs/day11.txt") as file:
        lines = file.readlines()
    part_1(lines)
    part_2(lines)


def part_1(lines):
    nodes = get_nodes(lines)
    path_count = count_paths(nodes, 'you', 'out')
    print(f"part 1: there are {path_count} possible paths from you to out")


def part_2(lines):
    nodes = get_nodes(lines)
    svr_dac = count_paths_2(nodes, 'svr', 'dac', set(), {})
    dac_fft = count_paths_2(nodes, 'dac', 'fft', set(), {})
    fft_out = count_paths_2(nodes, 'fft', 'out', set(), {})

    svr_fft = count_paths_2(nodes, 'svr', 'fft', set(), {})
    fft_dac = count_paths_2(nodes, 'fft', 'dac', set(), {})
    dac_out = count_paths_2(nodes, 'dac', 'out', set(), {})

    path_count = (svr_dac * dac_fft * fft_out) + (svr_fft * fft_dac * dac_out)

    print(f"part 2: there are {path_count} possible paths from svr through dac and fft to out")


def get_nodes(lines):
    nodes = {}
    for line in lines:
        id, outputs = line.strip().split(": ")
        outputs = outputs.split(" ")
        node = nodes.get(id, { "id": id, "outputs": [], "inputs": [] })
        node["outputs"] = outputs
        nodes[id] = node
        for output in outputs:
            n = nodes.get(output, { "id": output, "outputs": [], "inputs": [] })
            n['inputs'].append(id)
            nodes[output] = n
    return nodes


def count_paths(nodes, start, end):
    print(f'counting paths from {start} to {end}...')
    path_count = 0
    queue = [[start]]
    while len(queue) > 0:
        path = queue.pop()
        node_id = path[-1]
        if node_id == end:
            path_count += 1
        node = nodes[node_id]
        for output in node['outputs']:
            if output not in path:
                queue.append(path + [output])
    print(f'path count: {path_count}')
    return path_count


def count_paths_2(nodes, current, end, visited, cache):
    if current == end:
        return 1  # found the end we're looking for
    if current == 'out':
        return 0  # exiting without finding the path we're looking for
    if current in cache:
        return cache[current]  # we already know number of paths from current to end
    visited.add(current)
    path_count = 0
    for output in nodes[current]['outputs']:
        path_count += count_paths_2(nodes, output, end, visited, cache)
    visited.remove(current)
    cache[current] = path_count
    return path_count


if __name__ == "__main__":
    main()