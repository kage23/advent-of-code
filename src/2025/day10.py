import z3


def main():
    with open("./inputs/day10.txt") as file:
        lines = file.readlines()
    # part_1(lines)
    part_2(lines)


def part_1(lines):
    sum = 0
    for line in lines:
        sum += fewest_button_presses_for_lights(line.strip())
    print(f"part 1: you must press {sum} total buttons")


def part_2(lines):
    sum = 0
    for line in lines:
        # sum += fewest_button_presses_for_joltage(line.strip())
        sum += hmmmm(line.strip())
    print(f"part 2: you must press {sum} total buttons")


def fewest_button_presses_for_lights(line):
    buttons = line.split(' ')
    lights_goal = buttons.pop(0)[1:-1]
    _joltage = buttons.pop()
    starting_lights = '.' * len(lights_goal)
    starting_state = {
        'lights': starting_lights,
        'buttons_pressed': [],
    }
    queue = [starting_state]
    lights_seen = set()
    lights_seen.add(starting_lights)
    while len(queue) > 0:
        state = queue.pop(0)
        if state['lights'] == lights_goal:
            return len(state['buttons_pressed'])
        for button_id, button in enumerate(buttons):
            if button_id not in state['buttons_pressed']:
                new_lights = push_lights_button(state['lights'], button)
                if new_lights not in lights_seen:
                    lights_seen.add(new_lights)
                    queue.append({
                        'lights': new_lights,
                        'buttons_pressed': [*state['buttons_pressed'], button_id],
                    })
    return -1


def fewest_button_presses_for_joltage(line):
    buttons = line.split(' ')
    _lights_goal = buttons.pop(0)
    joltage_goal = list(map(int, buttons.pop()[1:-1].split(',')))
    starting_state = {
        'joltage': [0] * len(joltage_goal),
        'buttons_pressed': [],
    }
    queue = [starting_state]
    while len(queue) > 0:
        state = queue.pop()
        if state['joltage'] == joltage_goal:
            return len(state['buttons_pressed'])
        for button_id, button in enumerate(buttons):
            new_joltage = push_joltage_button(state['joltage'], button)
            if not joltage_exceeding(new_joltage, joltage_goal):
                queue.append({
                    'joltage': new_joltage,
                    'buttons_pressed': [*state['buttons_pressed'], button_id],
                })
    return -1


def push_lights_button(lights, button):
    new_lights = f"{lights}"
    for l in [int(l) for l in button[1:-1].split(',')]:
        new_value = '.' if lights[l] == '#' else '#'
        new_lights = f"{new_lights[:l]}{new_value}{new_lights[l+1:]}"
    return new_lights


def push_joltage_button(joltage, button):
    new_joltage = [*joltage]
    for j in [int(j) for j in button[1:-1].split(',')]:
        new_joltage[j] += 1
    return new_joltage


def joltage_exceeding(joltage, goal):
    for i, j in enumerate(joltage):
        if j > goal[i]:
            return True
    return False


# I copied and pasted this from https://github.com/jonathanpaulson/AdventOfCode/blob/master/2025/10.py
# I _basically_ know what this code does (or what it tells z3 to do) but I couldn't have come up with it
# without studying z3 for more time than I'm willing to spend on this now.
def hmmmm(line):
    x = 0
    buttons = line.split(' ')
    _lights_goal = buttons.pop(0)
    joltage = buttons.pop()
    B = []
    NS = []
    for button in buttons:
        ns = [int(x) for x in button[1:-1].split(',')]
        button_n = sum(2 ** x for x in ns)
        B.append(button_n)
        NS.append(ns)
    joltage_ns = [int(x) for x in joltage[1:-1].split(',')]
    V = []
    for i in range(len(buttons)):
        V.append(z3.Int(f'B{i}'))
    EQ = []
    for i in range(len(joltage_ns)):
        terms = []
        for j in range(len(buttons)):
            if i in NS[j]:
                terms.append(V[j])
        eq = (sum(terms) == joltage_ns[i])
        EQ.append(eq)
    o = z3.Optimize()
    o.minimize(sum(V))
    for eq in EQ:
        o.add(eq)
    for v in V:
        o.add(v >= 0)
    assert o.check()
    M = o.model()
    for d in M.decls():
        # print(d.name(), M[d])
        x += M[d].as_long()
    return x


if __name__ == "__main__":
  main()
