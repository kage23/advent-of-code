const INPUT: { [key: string]: string } = {
  DEMO: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,

  HMM: `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir b
$ cd a
$ ls
dir b
29116 f
2557 g
62596 h.lst
$ cd b
$ ls
584 i
$ cd ..
$ cd ..
$ cd b
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
}

export default INPUT
