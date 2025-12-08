def main():
    with open("./inputs/day07.txt") as file:
        lines = file.readlines()
    part_1(lines)
    part_2(lines)


def part_1(lines):
    lines_copy = lines.copy()
    split_count = 0
    for i, line in enumerate(lines_copy):
        if i == 0:
            start = line.index('S')
            lines_copy[1] = f"{lines_copy[1][:start]}|{lines_copy[1][start + 1:]}"
        elif i != len(lines_copy)-1:
            for c in range(len(line.strip())):
                if line[c] == '|':
                    if lines_copy[i + 1][c] == '.':
                        lines_copy[i + 1] = f"{lines_copy[i + 1][:c]}|{lines_copy[i + 1][c + 1:]}"
                    elif lines_copy[i + 1][c] == '^':
                        split_count += 1
                        lines_copy[i + 1] = f"{lines_copy[i + 1][:c - 1]}|^|{lines_copy[i + 1][c + 2:]}"
    print(f"part 1: the beam splits {split_count} times")


def part_2(lines):
    particles = {}
    for i, line in enumerate(lines):
        if i == 0:
            particles[line.index('S')] = 1
        elif i != len(lines)-1:
            new_particles = {}
            for position, count in particles.items():
                if lines[i+1][position] == '.':
                    new_particles[position] = count + new_particles.get(position, 0)
                elif lines[i+1][position] == '^':
                    new_particles[position-1] = count + new_particles.get(position-1, 0)
                    new_particles[position+1] = count + new_particles.get(position+1, 0)
            particles = new_particles
    total = 0
    for count in particles.values():
        total += count
    print(f"part 2: there are {total} possible paths")


if __name__ == "__main__":
  main()
