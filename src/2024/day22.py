def main():
  n = 123
  get_later_number(n, 10)
  with open("src/2024/inputs/day22-sample-2.txt") as file:
    starting_numbers = parse_input(file)
    # print(f"the sum of the 2000th secret numbers for each buyer is {part_1(starting_numbers)}")
    print(f"the most bananas you can get is {part_2(starting_numbers)}")


def part_1(numbers):
  return(sum(list(map(lambda n: get_later_number(n, 2000), numbers))))


def part_2(starting_numbers):
  next_2000_numbers = []
  for n in starting_numbers:
    next_numbers = [n]
    next_number = n
    for _ in range(2000):
      next_number = get_next_number(next_number)
      next_numbers.append(next_number)
    next_2000_numbers.append(next_numbers)
  next_2000_prices = []
  for x in next_2000_numbers:
    prices = list(map(lambda n: n % 10, x))
    next_2000_prices.append(prices)
  next_2000_prices_with_diffs = list(map(add_diffs_to_price_list, next_2000_prices))
  possible_change_lists = set()
  for pd in next_2000_prices_with_diffs:
    change_lists = price_change_lists(pd)
    for cl in change_lists:
      possible_change_lists.add(cl)
  total_sales = []
  for cl in possible_change_lists:
    sell_prices = sum(map(lambda pd: get_sell_price_from_change_list(pd, cl), next_2000_prices_with_diffs))
    total_sales.append(sell_prices)
  return max(total_sales)


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


def add_diffs_to_price_list(price_list):
  new_list = []
  for i, price in enumerate(price_list):
    diff = None if i == 0 else price - price_list[i - 1]
    new_list.append((price, diff))
  return new_list


def price_change_lists(prices_with_diffs):
  price_change_lists_with_current_price = []
  for i in range(4, len(prices_with_diffs)):
    recent_diffs = list(map(lambda pd: pd[1], prices_with_diffs[i - 3:i + 1]))
    price_change_lists_with_current_price.append(",".join(map(str, recent_diffs)))
  return price_change_lists_with_current_price


def get_sell_price_from_change_list(prices_with_diffs, change_list):
  for i in range(4, len(prices_with_diffs)):
    current_price = prices_with_diffs[i][0]
    recent_diffs = ",".join(map(str, list(map(lambda pd: pd[1], prices_with_diffs[i - 3:i + 1]))))
    if recent_diffs == change_list:
      return current_price
  return 0


if __name__ == "__main__":
  main()
