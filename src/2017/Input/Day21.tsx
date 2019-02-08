const INPUT: { [key:string]: string } = {
DEMO:
`../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#`,

REAL:
`../.. => ..#/.#./...
#./.. => .../#../.##
##/.. => .##/###/##.
.#/#. => #.#/..#/#.#
##/#. => .../.##/...
##/## => ##./..#/..#
.../.../... => ##../..../##../.###
#../.../... => ...#/.#.#/.#../.#.#
.#./.../... => #.#./...#/#.#./.##.
##./.../... => ..#./#.##/#.../.###
#.#/.../... => ##../##.#/..#./#.##
###/.../... => ..../.#.#/.###/#..#
.#./#../... => #..#/#.../.##./....
##./#../... => #.##/..##/####/.###
..#/#../... => ..#./#.##/####/####
#.#/#../... => .##./#.##/#.#./##.#
.##/#../... => #.##/####/.###/...#
###/#../... => ..../#.#./##.#/..##
.../.#./... => .###/.##./##../.##.
#../.#./... => ..../#.##/...#/#.#.
.#./.#./... => ...#/####/.##./#...
##./.#./... => .###/#.##/###./....
#.#/.#./... => #.##/###./..../..#.
###/.#./... => .#../#.#./#.##/#.##
.#./##./... => .###/##../..##/#..#
##./##./... => ..#./#.#./.#.#/##.#
..#/##./... => .#../####/...#/..##
#.#/##./... => ..../##.#/.##./....
.##/##./... => .#.#/.#.#/.##./####
###/##./... => ##.#/..../..../....
.../#.#/... => ..##/##../##.#/###.
#../#.#/... => ####/#.##/#.../###.
.#./#.#/... => ..../#..#/..##/.#..
##./#.#/... => #.../..##/##../..#.
#.#/#.#/... => ...#/#.#./#.#./#...
###/#.#/... => ###./###./##.#/###.
.../###/... => ..#./###./##.#/####
#../###/... => ##.#/..#./##../..##
.#./###/... => #.../#.##/##../....
##./###/... => ..##/.#.#/#..#/#.##
#.#/###/... => #.##/..#./.#../..##
###/###/... => ..#./#..#/####/.##.
..#/.../#.. => ##.#/#.##/...#/###.
#.#/.../#.. => #..#/..#./##../###.
.##/.../#.. => ..#./.#../###./#.#.
###/.../#.. => ...#/...#/.#.#/.##.
.##/#../#.. => ##../#.#./#..#/##..
###/#../#.. => ##../.#.#/##../#..#
..#/.#./#.. => ##.#/##.#/...#/.#..
#.#/.#./#.. => .###/.#.#/###./....
.##/.#./#.. => #..#/###./####/..#.
###/.#./#.. => ..#./.###/.###/...#
.##/##./#.. => #.##/..##/...#/.###
###/##./#.. => ####/##.#/#.##/#..#
#../..#/#.. => ..../.##./#.##/#...
.#./..#/#.. => #..#/##../...#/#...
##./..#/#.. => ..#./.###/..##/.#.#
#.#/..#/#.. => .##./..##/..#./#..#
.##/..#/#.. => ####/.#.#/#.../.#.#
###/..#/#.. => ..../..##/#.##/###.
#../#.#/#.. => #.##/.#.#/.#../.##.
.#./#.#/#.. => ..##/###./.###/###.
##./#.#/#.. => ##.#/##.#/#.#./##..
..#/#.#/#.. => ###./###./.#.#/.#..
#.#/#.#/#.. => ##../..#./##../....
.##/#.#/#.. => .###/#.#./##.#/##..
###/#.#/#.. => ##.#/#.#./.#.#/#...
#../.##/#.. => .#.#/...#/.#.#/..#.
.#./.##/#.. => ###./##../##.#/....
##./.##/#.. => ..##/###./#.#./#.#.
#.#/.##/#.. => ##.#/..##/#..#/####
.##/.##/#.. => ..../####/..#./##..
###/.##/#.. => .###/#..#/..../.#..
#../###/#.. => #..#/.#../.#.#/#...
.#./###/#.. => .#../..../.##./.###
##./###/#.. => ##.#/.#../.#.#/#..#
..#/###/#.. => #.##/##../..##/#...
#.#/###/#.. => ####/..##/.#../##.#
.##/###/#.. => .###/#..#/.###/#.##
###/###/#.. => ..##/.##./##../#..#
.#./#.#/.#. => ..##/.##./.##./.###
##./#.#/.#. => ..##/...#/.##./####
#.#/#.#/.#. => .###/.###/#.#./.#..
###/#.#/.#. => ##.#/###./##.#/####
.#./###/.#. => ...#/..#./.#.#/.#..
##./###/.#. => ###./##.#/#.../#.#.
#.#/###/.#. => .##./#.#./...#/..#.
###/###/.#. => .#.#/.#../..##/####
#.#/..#/##. => .##./...#/#..#/.###
###/..#/##. => #.##/.#.#/...#/..##
.##/#.#/##. => ###./.###/...#/....
###/#.#/##. => .##./.##./#.#./#...
#.#/.##/##. => #.#./.##./.#.#/.###
###/.##/##. => ..../####/.#.#/#.##
.##/###/##. => .##./.###/###./.#..
###/###/##. => #.../###./.##./##.#
#.#/.../#.# => #.#./..../#.##/###.
###/.../#.# => .#../.#.#/#.../.###
###/#../#.# => ###./#..#/####/##..
#.#/.#./#.# => ###./##.#/..../.#..
###/.#./#.# => ####/.#.#/.#../..##
###/##./#.# => #.#./####/..##/#...
#.#/#.#/#.# => #.#./#.#./#.../#.##
###/#.#/#.# => #.##/.#../..#./.##.
#.#/###/#.# => .###/..##/####/#..#
###/###/#.# => #.../..#./..#./#.##
###/#.#/### => .#.#/.###/#.##/..##
###/###/### => #.#./...#/.#../.#.#`
}

export default INPUT