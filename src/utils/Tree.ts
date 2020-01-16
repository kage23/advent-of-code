class Tree {
  head: TreeNode
  values: Map<unknown, TreeNode>

  constructor(value: unknown) {
    this.head = new TreeNode(value, this)
    this.values = new Map()
    this.values.set(value, this.head)
  }
}

export class TreeNode {
  branches: TreeNode[]
  parent: TreeNode | undefined
  tree: Tree
  value: unknown

  constructor(value: unknown, tree: Tree, parent?: TreeNode) {
    this.branches = []
    this.parent = parent
    this.tree = tree
    this.value = value
  }

  getDepth = (): number => this.getPathToHead().length - 1

  getPathToHead(): unknown[] {
    let current: TreeNode = this
    const path = [current.value]
    while (current.parent !== undefined) {
      current = current.parent
      path.push(current.value)
    }
    return path
  }

  push(value: unknown): number {
    if (!this.tree.values.has(value)) {
      const node = new TreeNode(value, this.tree, this)
      this.branches.push(node)
      this.tree.values.set(value, node)
      return this.branches.length
    } else {
      return -1
    }
  }

  reassignParent(newParent: TreeNode): void {
    if (this.tree !== newParent.tree) throw new Error('fuck')
    this.parent = newParent
  }
}

export default Tree
