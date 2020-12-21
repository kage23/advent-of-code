const INPUT: { [key: string]: string } = {
  DEMO_0: `Tile 2311:
..##.#..#.
##..#.....
#...##..#.
####.#...#
##.##.###.
##...#.###
.#.#.#..##
..#....#..
###...#.#.
..###..###

Tile 1951:
#.##...##.
#.####...#
.....#..##
#...######
.##.#....#
.###.#####
###.##.##.
.###....#.
..#.#..#.#
#...##.#..

Tile 1171:
####...##.
#..##.#..#
##.#..#.#.
.###.####.
..###.####
.##....##.
.#...####.
#.##.####.
####..#...
.....##...

Tile 1427:
###.##.#..
.#..#.##..
.#.##.#..#
#.#.#.##.#
....#...##
...##..##.
...#.#####
.#.####.#.
..#..###.#
..##.#..#.

Tile 1489:
##.#.#....
..##...#..
.##..##...
..#...#...
#####...#.
#..#.#.#.#
...#.#.#..
##.#...##.
..##.##.##
###.##.#..

Tile 2473:
#....####.
#..#.##...
#.##..#...
######.#.#
.#...#.#.#
.#########
.###.#..#.
########.#
##...##.#.
..###.#.#.

Tile 2971:
..#.#....#
#...###...
#.#.###...
##.##..#..
.#####..##
.#..####.#
#..#.#..#.
..####.###
..#.#.###.
...#.#.#.#

Tile 2729:
...#.#.#.#
####.#....
..#.#.....
....#..#.#
.##..##.#.
.#.####...
####.#.#..
##.####...
##..#.##..
#.##...##.

Tile 3079:
#.#.#####.
.#..######
..#.......
######....
####.#..#.
.#...#.##.
#.#####.##
..#.###...
..#.......
..#.###...`,

  REAL: `Tile 2729:
###.######
.......#.#
#..#......
....#.#...
...#.....#
.....#.###
...#.....#
........#.
..........
#.......##

Tile 1783:
..#.#.#.##
#..#......
...##....#
..........
#.#...###.
.#........
.....#....
.#.#.#....
##...##...
..###..#.#

Tile 3889:
.#..#..###
###....###
#..#..#..#
#...#....#
#...#.#..#
.......#.#
......#..#
#.#...#..#
#.#......#
#.#.#.....

Tile 3851:
#.##......
...#.#.###
#.......#.
#..#.....#
..........
...##.....
#...#....#
...#....##
.#....#.#.
#..##.####

Tile 1747:
#.#.##.##.
#......#.#
.........#
..........
..........
#..#..#..#
.##.#..#..
#...#.#...
.#.#......
#..###.#.#

Tile 1627:
.#.###..#.
...#.....#
..#......#
#.......##
#.#....#.#
#.#......#
#.#.......
#...##..#.
...#.#...#
...#.#..##

Tile 1433:
##..####.#
...#...#.#
#........#
.##..#...#
......#.#.
#..##..###
#....#.##.
.#.....#..
#........#
#....#.##.

Tile 1213:
.#.##..#.#
#........#
.#......#.
..#.......
...#...#..
.....#....
.....#....
......#...
.#.#......
#.##....##

Tile 1741:
#..#...###
........#.
#...###..#
##........
.##.......
##...#...#
..........
#..#..#.##
###.#..##.
####.###.#

Tile 2083:
#.####.###
...#......
#...#.....
##........
#...#.....
.#..#..##.
#..#.##..#
.#..###..#
#.#......#
.##...###.

Tile 2063:
#...#.#..#
#...#....#
#.#......#
##......#.
.#.......#
#.........
#..#...#.#
........#.
.#.#......
..#.#.#..#

Tile 1109:
.##.#.####
......#...
#........#
#....#..#.
##...#...#
#..#.....#
.......#..
.#..#...#.
#........#
#..#.##.#.

Tile 1049:
####..#...
##.....#.#
#.##...#.#
...#......
.#......#.
#........#
#...##.#..
##.......#
.##.....#.
#####..##.

Tile 1979:
#.###.###.
...#.#...#
..#......#
#.#.#...#.
##........
........#.
#...##....
#.......##
.#....#...
#..#.###.#

Tile 1193:
#.#...#..#
##.##...#.
...#.#....
#.##.#....
......#.#.
#.........
#.#......#
..#.......
#.........
...##..###

Tile 3659:
...#...##.
###.#.....
#..#.....#
..##.##...
#.#....##.
#.#......#
#.......##
.#.....#.#
.####....#
.#######.#

Tile 1811:
.#..####..
#...#.....
.........#
...#....#.
.......#..
.........#
#........#
........##
#.#..#....
###.######

Tile 3541:
####.##..#
##..###..#
##.#.#....
..........
...#....##
##....#..#
###.....#.
#.......##
..#.......
##..###.##

Tile 2113:
##..#..#.#
##..##.#.#
#.......##
.#...##...
..#.#.....
#.......##
...#..#.##
#.....#...
#..##.....
##.##...#.

Tile 2081:
.##.###..#
#.#..#...#
#......##.
....#....#
...#.....#
#.....####
#........#
.##......#
#...#.....
.####.#...

Tile 1021:
##.###.#.#
.#.#..#...
##.#.#####
#...#....#
.....#.#..
#.........
....#.....
...#...#.#
..##.#....
.#.#.###.#

Tile 1487:
..#.#.####
.##..##...
..#.###..#
.##....#..
.#.#..#.##
..#..#..##
##....##.#
........##
...#.##...
#..#.#....

Tile 3767:
.#..##.###
#.#..#...#
#....#..##
#...#.....
.#.#..#...
##..#....#
#.#.##.#.#
#....#..#.
#....##..#
##..###..#

Tile 3109:
#..#.#####
.#..##...#
..#.#....#
#..#.##..#
.......#..
#......#.#
..##.#...#
.#..#.....
#.........
##......#.

Tile 1009:
#..##.###.
..........
##.......#
#.#..##..#
.....#...#
.........#
...#.....#
####.#....
##...#...#
....#..##.

Tile 2693:
#.#..#..#.
..#.#..#..
...##.#...
#.....#.##
.#.......#
.#..###...
....##...#
#..#.#..#.
......#..#
.##...#.#.

Tile 3533:
.#.#.#####
##...#....
#.....#...
.........#
#........#
#......#..
...#.....#
#..#.#....
..##.....#
.#.#.#.##.

Tile 1171:
....#....#
...##...##
#..#..##.#
#........#
........#.
#..#....##
...#.....#
.........#
#....#...#
##.#####..

Tile 1279:
..#.##.###
#.....#..#
..##..#..#
......#...
#..#...#..
...##..##.
.#.....#.#
#.....###.
.....#....
..#..##.#.

Tile 1583:
###..###..
#......#..
.#..#..##.
...#......
...#....##
#...#.#...
...#.....#
...#.....#
#..##.#...
#.#.#...##

Tile 1129:
####..#...
.......###
#..##..#..
##.##...#.
......##..
....#..#..
##.....#..
.....#...#
##......##
..###...#.

Tile 2591:
#..##.#.#.
#......#.#
#........#
#.#.......
#..#.#....
....#..###
...#......
..#.....#.
#...##.#..
#.##..###.

Tile 1597:
##.#.####.
.#..#.#..#
#.........
##....#..#
#........#
..........
#...#.....
.#.......#
.......#.#
#...####..

Tile 1423:
#....#####
..#......#
..##.#..##
.#..##.#.#
#.........
.#......#.
#.....#...
##.#.#...#
#....#....
.#...#.###

Tile 1669:
#.##.#...#
..#.##.#..
#.......#.
.....#....
.#..#.#...
.....#....
.......#..
..........
##.##.....
#.#.#.##..

Tile 1283:
##..###.#.
.....#...#
#..#.....#
#...#....#
#.##.....#
#...#.#..#
#........#
.#...##.##
#...#.#..#
#..#.#.###

Tile 2371:
.##.###.##
#......##.
.#.......#
#....#....
#........#
#....#....
........##
..#.....#.
.......#..
#..###...#

Tile 3823:
..#.######
..#......#
.....#...#
....#...##
#.####...#
......#...
##....#..#
.#.......#
#.#..#.#..
####.##.#.

Tile 2141:
..#...####
...#...#.#
#.........
..###.#.#.
...##.#..#
#.#..##...
..#.......
...#......
#..#.#.##.
##.#.#.#.#

Tile 1861:
#....##...
.#..#.....
##.#......
.##..#.###
#.#.#.....
#...##..##
.#..##...#
....##.#.#
#......##.
#.###.#.##

Tile 1063:
..##.#..#.
....##....
#...##.#.#
#...#.#..#
##....##.#
#.....##..
.#.#.###.#
..#...#...
#.........
#.#.####..

Tile 1847:
.#...##.##
.#.......#
..........
.........#
.#........
....#..###
#.##....#.
..#...#...
#.....#...
#.#..#....

Tile 1733:
#..#.#.#.#
..#.....#.
#........#
#.#..#...#
.####....#
.#........
.##......#
#.......##
........##
#...##..##

Tile 2441:
....######
#......###
.#......#.
#..#....#.
.#..#.#..#
....#.....
.....##...
##.......#
....##....
#......###

Tile 3631:
##.#.#.#.#
#.##.##.#.
#..#..#...
..##.#...#
#.#.###...
#..#...#..
#....#...#
...##.##.#
...#..#..#
##..#.##.#

Tile 2543:
#..#####..
.##....##.
##...##...
......#...
.###.....#
...#......
..##.#..##
.##.......
#..#......
#.####.#..

Tile 1297:
..#.#..#..
........#.
#.#.......
#..#.#....
.#..#####.
#.##....##
#......##.
#..#...##.
#.#..#.##.
###..#..##

Tile 2099:
#..#..##.#
..#.......
#.#..#....
#..#..#...
#.#..#..##
...##...##
#.........
.##.#..#.#
#...##.#.#
###...#..#

Tile 2203:
.#.#..##..
...#.#....
..#....#.#
.#..#....#
.#.##.##..
#.##...##.
........##
...#.#....
.......###
...##.##.#

Tile 3517:
#..#.#..#.
..........
...#.....#
..........
......####
.#........
.#........
......##.#
#..##...#.
.##.###.#.

Tile 2143:
....###.#.
#......#.#
#....#..#.
##....##.#
##....##..
#.........
.#....##.#
#.#.##..##
..#.....##
.###.##.#.

Tile 2791:
###..#..##
###.......
....#.....
#.........
#.###.##..
....####..
...#.....#
....#....#
.....##.##
.##.###..#

Tile 2131:
#.#.###.#.
...#.....#
#.#..##...
#.#...#...
........#.
..........
##.......#
..###...#.
..##.....#
...#...##.

Tile 3797:
####...##.
.##.......
.......#..
......##.#
...#..#..#
#.........
##....##.#
.....#.#.#
#.........
####..###.

Tile 1327:
.#...#..#.
#...#.....
.......#.#
#.###..#..
.....#....
.#...#....
.........#
#......#.#
.....#....
####..##..

Tile 3323:
#.##.#...#
...####.##
#...#.#..#
#..#.#...#
......##..
#..#....#.
#....#...#
....#..#..
#..##....#
.######.#.

Tile 2437:
#.####...#
........#.
...#....##
##...##...
..#####..#
.....#....
...#.#..##
....#...##
...#......
.##.......

Tile 1993:
.#.#######
###....#..
...#......
.#..#.#...
#..#.....#
...##..##.
###...#...
.....#.#.#
.......##.
.#....#...

Tile 2719:
##.##..#.#
...#......
..#.#.....
.#.......#
#.....#...
#...#.##..
#.........
##........
#.#......#
#..##.##..

Tile 2531:
..#.....##
##.#......
...#...#.#
#.#.......
#...#.#..#
...#.....#
#.#......#
#.##.#....
.#.#.....#
#..#####..

Tile 3037:
#.#..#....
#....#...#
#.##...###
#.#..#.#.#
#....#....
.###......
.........#
#.##......
......#...
#..##.##.#

Tile 3469:
#.....##..
.##....#.#
....#...##
.....#.##.
..#...##..
#.#...##.#
#....#....
###.##.#.#
#......##.
####...##.

Tile 2003:
##.#...###
....#.##.#
#..#.#..##
.....#..#.
..#.....##
#.........
#..##..#..
#.##..#.##
.........#
##.#..#...

Tile 3391:
#...##.#..
.#....#...
...##..#..
#.#.......
......#...
.......#.#
......#..#
....###..#
#.....#...
.##.#.#...

Tile 1277:
...###...#
##.##...#.
.......#..
.........#
#......#..
##........
#..##.....
#........#
.#..#...#.
#..#..##..

Tile 3793:
####.#.##.
....#...#.
##........
..........
##..#.....
#..#......
#....#....
#...#....#
..........
########..

Tile 3739:
.#..##.##.
.#......#.
.#...##..#
....#.###.
.........#
.#..#..#..
#..#.##...
#...#.....
....#.....
##.######.

Tile 3373:
#.##.#..##
#.##...##.
#......##.
.#.....#.#
..##.#.#.#
##.#.....#
#.#...#..#
..........
#........#
#.#..##.#.

Tile 3697:
..#.....##
#......#.#
..#.#...##
###..#.##.
##...#..#.
.....####.
#..#.##..#
....#.#...
.....#...#
....#...#.

Tile 1489:
..###.##..
#...#.....
....#...#.
...#.#..##
#.........
......##..
.#....#...
#....##.#.
#...##.#.#
#..#.#...#

Tile 3877:
#......###
#......#..
...#.#....
###...#..#
.#........
#.....##..
#.......#.
#.#..##...
#.........
#######..#

Tile 1373:
.#.....#..
.....#....
#.........
....#....#
..#.###..#
...#..#...
##...##...
...#.....#
#..###.##.
.##.#####.

Tile 2609:
..#...####
#.##....#.
..#.......
#......#..
.......#..
...#....##
#.....#..#
#...#....#
....##...#
.#.##.##..

Tile 1709:
.##..#.#.#
...#......
#.#.#.....
....#...#.
#.....#...
.....#.#.#
#...#.....
.#...##..#
#........#
##.#....#.

Tile 1447:
.#.##.#..#
.....#...#
#..#....##
#........#
...#......
###......#
...#......
#.......##
#.........
#.#.#####.

Tile 2671:
#.##.#####
#..#..##..
#.##.....#
.....#....
##...##..#
#.###....#
#.#....#.#
.#.......#
#.#....###
....#.#..#

Tile 2887:
.###.#...#
#...#..#.#
.....#...#
#.#...##..
..#....###
.#..#..#.#
.#..#.##..
#.#..##...
#.##......
#.##..#...

Tile 2111:
..#..#..##
..........
......#..#
.......#.#
..###.####
#...##...#
..#.#....#
.......##.
..#....#.#
..##.####.

Tile 3041:
##....#..#
#..#.##..#
...#..###.
#.....#.#.
....##...#
..#....#..
#....#..#.
....#.....
...#......
.#.##....#

Tile 2927:
.##...##..
.........#
.#.....#..
#..#.....#
..#.#....#
##..#.#..#
#.##...#..
#.#.......
#.#.....#.
#.#...##..

Tile 2557:
###...#.##
#......#..
##.#.#...#
...#.###.#
#.#..#....
.##.###..#
#......#..
#....#.#..
###.#....#
.#..#.#...

Tile 1663:
##...#.###
#.#.....##
##.....#..
..#......#
#.........
....#....#
...#..#..#
#...#.....
.#......##
##.#......

Tile 1949:
##...###..
..........
....#...##
..........
.#.....##.
#.........
.#....##..
..#.##.###
..#.#....#
.#..####.#

Tile 2953:
.....#...#
##...#....
..#.#..##.
#.......#.
.....#.#..
#.#.#....#
#..###...#
#......#.#
...#......
.#..#..#.#

Tile 2897:
..###..###
#.........
#...##....
......#..#
......##.#
..#..##..#
#..#.#....
##........
#.#......#
.##....#..

Tile 1451:
.#........
#.#.......
##....#.##
#.#.......
....##..#.
##.....###
....#...##
#..#.#.##.
#...##....
##.#.#..#.

Tile 2351:
....#.##..
##........
.........#
#.....#..#
##........
.##...#..#
#...#...##
....#.....
#.#.......
...#...###

Tile 1399:
#######.#.
###....#.#
##.#..#...
#.........
#.#.#.....
..######..
##...#.#..
##...#.#..
.#....#...
#.###.....

Tile 3079:
..#.##.###
....#....#
#........#
##.......#
......#..#
..#....#.#
.......##.
#......#..
...#......
.##..#.#.#

Tile 2027:
.....#.##.
...#.#....
.......#.#
#.#....###
#........#
#....#..##
.##..#..##
#####.##.#
...##....#
#.........

Tile 2239:
...#....##
......#..#
..#......#
.......#.#
#.##.#####
...##...#.
..#.....##
...##.....
##........
.#...#.###

Tile 3019:
.#.#...#..
..#.#.....
.....#..##
####.#...#
.#.##....#
#...#.##.#
##.#.#....
#...#.....
#..#.#..##
####.#..#.

Tile 2579:
.#....##..
.#.##..#.#
#.....#..#
..#......#
#.........
#...#.....
#..#......
#...#.....
...#..#.#.
..#....##.

Tile 2699:
..#.#.....
#..##....#
#..#.#...#
###...####
#.....#..#
#....##.#.
#...##....
........#.
.##..##...
##....#..#

Tile 1667:
..#..###.#
#.#......#
..##.##..#
..#....#.#
.#...#.###
...#..###.
...#..#.##
##.#.##..#
..####.#.#
.#..#.....

Tile 3061:
#.##.#.#.#
.##.##...#
..........
.......#..
.....###..
..##..#..#
#..###...#
#..##.....
#..#....#.
......###.

Tile 1531:
..###.#...
#.....#..#
##.#..#.#.
#.#.##...#
..#......#
..#.#....#
##.##.#...
..##.....#
##...#..##
..####.###

Tile 3929:
#..#..##..
##....#...
.#........
.....##...
...#.....#
..#..##..#
.........#
.....##..#
.#....#...
...##...##

Tile 2711:
.#.####..#
#......#.#
#.#.......
......###.
#.........
#.........
#......#.#
.......#.#
#.....#..#
.#.#.###..

Tile 3907:
#.#.#...#.
....##..#.
.....##.#.
##......##
....#.#..#
#..#.....#
#...#..#..
..##....##
.#........
.#.#..####

Tile 3299:
##...##.##
.#........
#...#....#
.#...#....
.#.#......
#.#...#..#
.#..#....#
.#..#..#.#
.#..#....#
###.#..#.#

Tile 2677:
#.#.##.##.
#.#..#.#.#
....#....#
#.........
##.......#
##.......#
.....#.##.
#....#.#..
.........#
#...###..#

Tile 2207:
.##.#..###
#.#.##....
..........
#.#.#...##
........##
#.#..#....
...##..#.#
.....#.#.#
.........#
.#..##....

Tile 2393:
#.#..###.#
##.##.....
#.........
........##
#.#......#
#..#...#.#
.........#
##..#....#
......#..#
#...#.##..

Tile 1453:
#..#.##...
##....#..#
#.....#.##
#.##....##
..##.#..##
...#...#.#
....##....
#......##.
#......##.
###..####.

Tile 1871:
######.#..
#.......##
......#..#
##.......#
##......#.
..###..#..
...#..##.#
.#.##...#.
........#.
..####...#

Tile 2777:
#.#..#.#.#
......##.#
#.....#.#.
#.#.....##
#....###.#
...##...##
#.......#.
.......#.#
.#....#..#
..#####...

Tile 1223:
...##.#.#.
#...#....#
##........
#.....#..#
.....###.#
....#...##
.....#...#
.........#
#.........
#..###.###

Tile 2633:
..##.##...
###.##.###
..#.#....#
....##....
#..#.#....
.#...#...#
#.##.....#
#.#...##.#
##...#.#.#
..######.#

Tile 3307:
##...###.#
##.......#
#.#...#...
...#.....#
#.....#.##
#.#.......
##.#....##
##......##
.##.#.#..#
#...##..##

Tile 1123:
.#..#.....
#.#...#...
.#..##.#.#
...###.#.#
###...#...
.##....#..
#.#......#
..#..###.#
##.....#.#
###.#..##.

Tile 2797:
.#.######.
#.#.#....#
#.........
##....#..#
#...#....#
###..#....
.##..#####
..#.##....
...#......
..###.##..

Tile 1613:
########..
##.#.....#
....##..##
##.#....#.
#.##...###
#......#..
..........
.......###
....#..###
#.#.##...#

Tile 1511:
###...##.#
#....#....
.........#
..#.....##
###.....#.
#.....#.#.
..###..#.#
#........#
#..#...#.#
#.#..#.##.

Tile 1999:
#..#.#..#.
.........#
.......#..
..#.#.#..#
#....#..##
.#........
##.#.....#
##.......#
#....#..##
###..#.###

Tile 2819:
..#.##...#
#..##...##
..##......
##....#...
#...###..#
#.###....#
.#.#.#.#.#
#..#.....#
..#.......
..##...#.#

Tile 3847:
##.######.
..#.......
.........#
.........#
#..#......
####.....#
..#..#..##
#.....###.
##.....#.#
####....#.

Tile 1723:
...###....
#.........
#.....#...
.....#...#
#....#.#..
#..#.....#
...#......
.#...#..##
#..#.#.#.#
##.###.###

Tile 1039:
#...#.##..
......#..#
#.......##
##....##..
#...#....#
#....#...#
##.#.#.#..
#.#.......
#..#.....#
.#...###..

Tile 3433:
.#.###.#..
#...#....#
#.....#..#
#.....#..#
#........#
.......###
..###.###.
.....#...#
#...#.....
....##..#.

Tile 1069:
.#....#...
###..#....
#.........
#....#.###
....#.#...
..#.....##
#.##.#....
.#.##.#...
..........
.#.#....#.

Tile 3727:
#.#.#####.
...#..#..#
##......##
#.##...#..
#...#.###.
.....#.##.
##..#.##..
#...#.....
....#.....
..#######.

Tile 1301:
#####..#..
.....##...
#.##...#..
.##......#
#.....#...
#....#....
.....#.#.#
#.....#..#
#..#.....#
#.##.#..#.

Tile 3583:
#.###.....
#......#.#
#..#.....#
......##.#
#.....##.#
##....####
###...##..
##.##....#
......##.#
..##...##.

Tile 3191:
.##.#.#...
....#.....
#.#.....##
##.#.#....
...#.....#
#........#
..........
....#.#..#
........##
.###.####.

Tile 1987:
##.....###
..#.......
##.##.#..#
..........
......#..#
#...#.#..#
...#......
###.#..#..
#.##....#.
.##...##.#

Tile 1493:
..##..####
#..#.#...#
...#......
...#....##
#.........
........##
...#.....#
#....##..#
.#.......#
.#.#..#..#

Tile 1699:
.##...#.#.
.#.......#
.........#
..#...#..#
##...#..##
#.#..#....
#..#..#..#
#....#...#
....#.....
#...##..#.

Tile 2459:
.###..##..
#........#
..#.##....
#....#....
#.#..#..##
...####..#
.....##...
..#......#
...#...#.#
#..#..####

Tile 2801:
.......#..
..#.#....#
#.....#...
#..#.....#
.##...#...
#.....#..#
......#.#.
......#...
#....#....
.#.##.###.

Tile 1759:
##.###..##
#.##..#...
#........#
........##
.....#.#.#
..#......#
#.##...#.#
##......##
##.#......
...###.#..

Tile 3821:
..#####.#.
#....#...#
.....#...#
..........
..##.###.#
#....#....
###.#.####
#......#..
#.##.....#
.....###..

Tile 2423:
#.####.#..
.#........
.##......#
...#......
#..##.....
#..##...##
#.........
#.#.##....
...#....#.
######.#.#

Tile 1619:
##.##...##
..##.....#
#....#....
#.#......#
#......#..
.#.#.....#
#..#.....#
##...##..#
#.........
...#..##..

Tile 2539:
#.#.#.##.#
.......###
........#.
..#...#...
#.........
#.##....##
.####.##.#
.........#
##.##..#..
...##.##.#

Tile 2837:
.###.#.#.#
#.####...#
#......##.
#...#.#...
..###....#
..........
.....#...#
#.....##..
#....##...
#....##...

Tile 1181:
#.###....#
.#...#....
....#..#..
....#.....
#.#.##..#.
##...###..
#....#...#
.........#
.##...#..#
..##.#..##

Tile 2731:
.#....##..
......#.#.
......#...
.....#.#..
#.#..##.#.
.....###..
#...##.#..
#...##..#.
#.##.#...#
..#....###

Tile 2477:
####...#.#
...#......
........#.
.......#.#
..........
#.#......#
##...##...
.....#....
##.#.....#
#..#.##..#

Tile 2851:
.#....####
....###...
#.....#..#
#........#
..#.....#.
.#.......#
#.........
...###...#
#.......##
##.##.####

Tile 3779:
...###.##.
#.#..#..#.
##.#..#...
..#....#..
.##..#...#
.#.......#
..##..#...
..#......#
#........#
..##.....#

Tile 1901:
.##..#...#
.........#
..........
#..#####.#
#....#...#
###...#...
...#..#..#
.#..#..#..
....#.....
.##.##....

Tile 3463:
....######
..#....###
##....#..#
#....##.##
#..#......
.........#
..........
#......#..
..........
##....##.#

Tile 1409:
.#.###..#.
#.#..#....
.#.....#.#
#..#......
#.........
#..#......
...###....
.....#....
...#......
##.###.###`
}

export default INPUT