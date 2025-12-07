import math


def main():
    with open("./inputs/day06.txt") as file:
        lines = file.readlines()
    part_1(lines)
    part_2(lines)


def part_1(lines):
    answer_sum = 0
    column_gaps = find_column_gaps(lines)
    for i in range(1, len(column_gaps)):
        problem = get_problem_1(lines, column_gaps[i - 1], column_gaps[i])
        answer_sum += solve_problem(problem)
    print(f"part 1: {answer_sum}")


# 7903102470589 too low
def part_2(lines):
    answer_sum = 0
    column_gaps = find_column_gaps(lines)
    for i in range(1, len(column_gaps)):
        problem = get_problem_2(lines, column_gaps[i - 1], column_gaps[i])
        answer_sum += solve_problem(problem)
    print(f"part 2: {answer_sum}")


def find_column_gaps(lines):
    column_gaps = [-1]
    row_spaces = list(map(get_spaces, lines))
    for space in row_spaces[0]:
        if all(space in r for r in row_spaces):
            column_gaps.append(space)
    column_gaps.append(len(lines[0]))
    return column_gaps


def get_spaces(line):
    spaces = []
    for i in range(len(line)):
        if line[i] == ' ':
            spaces.append(i)
    return spaces


def get_problem_1(lines, prev_gap, next_gap):
    problem = []
    for i in range(len(lines)):
        problem.append(lines[i][prev_gap+1:next_gap].strip())
    return problem


def get_problem_2(lines, prev_gap, next_gap):
    problem = []
    operation = ''
    for i in range(next_gap-1, prev_gap, -1):
        try:
            entry = ''
            for line in lines:
                if line[i].isdigit():
                    entry = f"{entry}{line[i]}"
                if line[i] == '*' or line[i] == '+':
                    operation = line[i]
            if entry:
                problem.append(int(entry))
        except IndexError:
            pass
            # breakpoint()
    problem.append(operation)
    return problem


def solve_problem(problem):
    operation = problem.pop()
    if operation == '+':
        return sum(map(int, problem))
    elif operation == '*':
        return math.prod(map(int, problem))
    return 0


if __name__ == "__main__":
  main()
