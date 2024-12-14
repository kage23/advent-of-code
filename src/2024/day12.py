from utils import get_neighbors


def main():
  with open("src/2024/inputs/day12.txt") as file:
    field = file.read().splitlines()
    print(f"the total cost of fencing is ${part_1(field)}")
    print(f"the total cost of discount fencing is ${part_2(field)}")


def part_1(field):
  regions = analyze_field(field)
  return sum(map(price_of_fencing_for_region, regions))


def part_2(field):
  regions = analyze_field(field)
  return sum(map(price_of_discount_fencing_for_region, regions))


def analyze_field(field):
  checked = set()
  regions = []
  for row in range(len(field)):
    for col in range(len(field[row])):
      if (row, col) not in checked:
        region_type = field[row][col]
        checked.add((row, col))
        region = [(row, col)]
        for plot in region:
          for neighbor in get_neighbors(plot, field):
            if neighbor not in checked:
              nrow, ncol = neighbor
              if field[nrow][ncol] == region_type:
                checked.add(neighbor)
                region.append(neighbor)
        regions.append(region)
  return regions


def price_of_fencing_for_region(region):
  area = len(region)
  perimeter = get_perimeter(region)
  return area * perimeter


def price_of_discount_fencing_for_region(region):
  area = len(region)
  sides = count_sides(region)
  return area * sides


def get_perimeter(region):
  perimeter = 0
  for plot in region:
    for neighbor in get_neighbors(plot):
      if neighbor not in region:
        perimeter += 1
  return perimeter


def count_sides(region):
  sides = 0.0
  top_borders = []
  right_borders = []
  bottom_borders = []
  left_borders = []
  for plot in region:
    if (plot[0] - 1, plot[1]) not in region:
      top_borders.append(plot)
    if (plot[0], plot[1] + 1) not in region:
      right_borders.append(plot)
    if (plot[0] + 1, plot[1]) not in region:
      bottom_borders.append(plot)
    if (plot[0], plot[1] - 1) not in region:
      left_borders.append(plot)
  for plot in top_borders:
    left, right = (plot[0], plot[1] - 1), (plot[0], plot[1] + 1)
    if left not in top_borders and right not in top_borders:
      sides += 1
    elif left in top_borders and right in top_borders:
      sides += 0
    else:
      sides += 0.5
  for plot in bottom_borders:
    left, right = (plot[0], plot[1] - 1), (plot[0], plot[1] + 1)
    if left not in bottom_borders and right not in bottom_borders:
      sides += 1
    elif left in bottom_borders and right in bottom_borders:
      sides += 0
    else:
      sides += 0.5
  for plot in left_borders:
    top, bottom = (plot[0] - 1, plot[1]), (plot[0] + 1, plot[1])
    if top not in left_borders and bottom not in left_borders:
      sides += 1
    elif top in left_borders and bottom in left_borders:
      sides += 0
    else:
      sides += 0.5
  for plot in right_borders:
    top, bottom = (plot[0] - 1, plot[1]), (plot[0] + 1, plot[1])
    if top not in right_borders and bottom not in right_borders:
      sides += 1
    elif top in right_borders and bottom in right_borders:
      sides += 0
    else:
      sides += 0.5
  return int(sides)


if __name__ == "__main__":
  main()
