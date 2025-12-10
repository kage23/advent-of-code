from functools import cmp_to_key


def main():
    with open("./inputs/day10.txt") as file:
        lines = file.readlines()
    part_1(lines)
    # part_2(lines)


def part_1(lines):
    sum = 0
    for line in lines:
        sum += fewest_button_presses(line.strip())
    print(f"part 1: you must press {sum} total buttons")


def part_2(lines):
    ...
    # print(f"part 2: the largest contained rectangle area is {areas.pop()}")


def fewest_button_presses(line):
    buttons = line.split(' ')
    lights_goal = buttons.pop(0)[1:-1]
    _joltage = buttons.pop()
    current_state = score_state({'lights': '.' * len(lights_goal), 'button_presses': 0}, lights_goal)
    queue = [current_state]
    while len(queue) > 0:
        state = queue.pop(0)
        if state['lights'] == lights_goal:
            return state['button_presses']
        for button in buttons:
            queue.append(score_state(
                {
                    'lights': push_button(state['lights'], button),
                    'button_presses': state['button_presses'] + 1
                },
                lights_goal
            ))
        queue.sort(key=cmp_to_key(compare_states))
        ...


def push_button(lights, button):
    new_lights = f"{lights}"
    for l in [int(l) for l in button[1:-1].split(',')]:
        new_value = '.' if lights[l] == '#' else '#'
        new_lights = f"{new_lights[:l]}{new_value}{new_lights[l+1:]}"
    return new_lights


def score_state(state, lights_goal):
    score = 0
    for i, l in enumerate(state['lights']):
        if l == lights_goal[i]:
            score += 1000
    score -= state['button_presses']
    state['score'] = score
    return state


def compare_states(state1, state2):
    if state1['button_presses'] != state2['button_presses']:
        return -1 if state1['button_presses'] < state2['button_presses'] else 1
    if state1['score'] != state2['score']:
        return -1 if state1['score'] > state2['score'] else 1
    return 0


if __name__ == "__main__":
  main()
