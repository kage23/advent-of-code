def main():
    with open("./inputs/day04.txt") as file:
        lines = file.readlines()
    part_1(lines)
    part_2(lines)


def part_1(lines):
    count = 0
    for row in range(len(lines)):
        for col in range(len(lines[row])):
            if is_accessible(lines, row, col):
                count += 1
    print(f"part 1: {count} accessible rolls of paper")


def part_2(lines):
    count = 0
    while True:
        removed, lines = update_board(lines)
        count += removed
        if removed == 0:
            break
    print(f"part 2: {count} removed rolls of paper")


def is_accessible(lines, row, col):
    if lines[row][col] != "@":
        return False
    neighbors = [
        [row - 1, col - 1],
        [row - 1, col],
        [row - 1, col + 1],
        [row, col - 1],
        [row, col + 1],
        [row + 1, col - 1],
        [row + 1, col],
        [row + 1, col + 1],
    ]
    count = 0
    for neighbor in neighbors:
        if 0 <= neighbor[0] < len(lines) and 0 <= neighbor[1] < len(lines[0]) - 1:  # the -1 is because they have a \n at the end
            if lines[neighbor[0]][neighbor[1]] == '@':
                count += 1
    return count < 4


def update_board(lines):
    count = 0
    new_board = []
    for row in range(len(lines)):
        new_board.append([''])
        for col in range(len(lines[row])):
            if is_accessible(lines, row, col):
                count += 1
                new_board[row] += '.'
            else:
                new_board[row] += lines[row][col]
    return count, new_board


if __name__ == "__main__":
  main()
