def main():
    with open("./inputs/day03.txt") as file:
        lines = file.readlines()
    part_1(lines)
    part_2(lines)


def part_1(lines):
    joltage_sum = 0
    for line in lines:
        joltage_sum += find_highest_joltage(line)
    print(f"part 1 joltage sum: {joltage_sum}")


def part_2(lines):
    joltage_sum = 0
    for line in lines:
        joltage_sum += find_highest_joltage_better(line.strip())
    print(f"part 2 joltage sum: {joltage_sum}")


def find_highest_joltage(bank):
    highest_joltage = 0
    for i in range(0, len(bank)):
        for j in range(i + 1, len(bank)):
            joltage = int(f"{bank[i]}{bank[j]}")
            highest_joltage = max(highest_joltage, joltage)
    return highest_joltage


def find_highest_joltage_better(bank):
    pos = 0
    joltage_length = 12

    first = 0
    for i in range(pos, len(bank) - (joltage_length - 1)):
        digit = int(bank[i])
        if digit > first:
            first = digit
            pos = i

    second = 0
    for i in range(pos + 1, len(bank) - (joltage_length - 2)):
        digit = int(bank[i])
        if digit > second:
            second = digit
            pos = i

    third = 0
    for i in range(pos + 1, len(bank) - (joltage_length - 3)):
        digit = int(bank[i])
        if digit > third:
            third = digit
            pos = i

    fourth = 0
    for i in range(pos + 1, len(bank) - (joltage_length - 4)):
        digit = int(bank[i])
        if digit > fourth:
            fourth = digit
            pos = i

    fifth = 0
    for i in range(pos + 1, len(bank) - (joltage_length - 5)):
        digit = int(bank[i])
        if digit > fifth:
            fifth = digit
            pos = i

    sixth = 0
    for i in range(pos + 1, len(bank) - (joltage_length - 6)):
        digit = int(bank[i])
        if digit > sixth:
            sixth = digit
            pos = i

    seventh = 0
    for i in range(pos + 1, len(bank) - (joltage_length - 7)):
        digit = int(bank[i])
        if digit > seventh:
            seventh = digit
            pos = i

    eighth = 0
    for i in range(pos + 1, len(bank) - (joltage_length - 8)):
        digit = int(bank[i])
        if digit > eighth:
            eighth = digit
            pos = i

    ninth = 0
    for i in range(pos + 1, len(bank) - (joltage_length - 9)):
        digit = int(bank[i])
        if digit > ninth:
            ninth = digit
            pos = i

    tenth = 0
    for i in range(pos + 1, len(bank) - (joltage_length - 10)):
        digit = int(bank[i])
        if digit > tenth:
            tenth = digit
            pos = i

    eleventh = 0
    for i in range(pos + 1, len(bank) - (joltage_length - 11)):
        digit = int(bank[i])
        if digit > eleventh:
            eleventh = digit
            pos = i

    twelfth = 0
    for i in range(pos + 1, len(bank) - (joltage_length - 12)):
        digit = int(bank[i])
        if digit > twelfth:
            twelfth = digit
            pos = i

    return int(f"{first}{second}{third}{fourth}{fifth}{sixth}{seventh}{eighth}{ninth}{tenth}{eleventh}{twelfth}")


if __name__ == "__main__":
  main()
