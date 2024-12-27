def main():
  with open("src/2024/inputs/day22.txt") as file:
    starting_numbers = parse_input(file)
    print(f"the sum of the 2000th secret numbers for each buyer is {part_1(starting_numbers)}")
    print(f"the most bananas you can get is {part_2(starting_numbers)}")


def part_1(numbers):
  return(sum(list(map(lambda n: get_later_number(n, 2000), numbers))))


def part_2(starting_numbers):
  possible_change_lists = {}
  for n in starting_numbers:
    next_numbers = [n]
    next_number = n
    for _ in range(2000):
      next_number = get_next_number(next_number)
      next_numbers.append(next_number)
    sell_prices = get_sell_prices(next_numbers)
    for pcl, price in sell_prices.items():
      current_price = possible_change_lists[pcl] if pcl in possible_change_lists else 0
      possible_change_lists[pcl] = current_price + price
  return max(possible_change_lists.values())


def parse_input(file):
  return list(map(int, file.read().splitlines()))


def get_later_number(n, repetitions):
  for _ in range(repetitions):
    n = get_next_number(n)
  return n


def get_next_number(n):
  r1 = n * 64
  n = (n ^ r1) % 16777216
  r2 = int(n / 32)
  n = (n ^ r2) % 16777216
  r3 = n * 2048
  n = (n ^ r3) % 16777216
  return n


def get_sell_prices(numbers):
  sell_prices = {}
  prices = []
  diffs = []
  for i, n in enumerate(numbers):
    price = n % 10
    prices.append(price)
    diffs.append(None if i == 0 else price - prices[i - 1])
    if i >= 4:
      recent_diffs = ",".join(map(str, [diffs[i - 3], diffs[i - 2], diffs[i - 1], diffs[i]]))
      if recent_diffs not in sell_prices:
        sell_prices[recent_diffs] = price
  return sell_prices


if __name__ == "__main__":
  main()
