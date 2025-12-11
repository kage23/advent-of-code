def main():
    with open("./inputs/day11-sample2.txt") as file:
        lines = file.readlines()
    # part_1(lines)
    part_2(lines)


def part_1(lines):
    nodes = get_nodes(lines)
    path_count = 0
    queue = [['you']]
    while len(queue) > 0:
        path = queue.pop()
        node_id = path[-1]
        if node_id == 'out':
            path_count += 1
        node = nodes[node_id]
        for output in node['outputs']:
            if output not in path:
                queue.append(path + [output])
    print(f"part 1: there are {path_count} possible paths from you to out")


def part_2(lines):
    nodes = get_nodes(lines)
    path_count = 0
    queue = [{ 'path': ['svr'], 'dac': False, 'fft': False }]
    while len(queue) > 0:
        state = queue.pop()
        node_id = state['path'][-1]
        if node_id == 'out' and state['dac'] and state['fft']:
            path_count += 1
        node = nodes[node_id]
        for output in node['outputs']:
            for next_state in get_next_states(state, output, nodes):
                queue.append(next_state)



        # for neighbor in node['outputs']:
        #     if neighbor not in state['path']:
        #         queue.append(path + [neighbor])
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


def get_next_states(state, next_node_id, nodes):
    next_state = { 'path': [*state['path'] + [next_node_id]], 'dac': state['dac'], 'fft': state['fft'] }
    next_node = nodes[next_node_id]
    if next_node['id'] == 'dac':
        next_state['dac'] = True
    if next_node['id'] == 'fft':
        next_state['fft'] = True
    while len(next_node['outputs']) == 1:
        next_node = nodes[next_node['outputs'][0]]
        if next_node['id'] == 'dac':
            next_state['dac'] = True
        if next_node['id'] == 'fft':
            next_state['fft'] = True
    ...


    return []


if __name__ == "__main__":
  main()
