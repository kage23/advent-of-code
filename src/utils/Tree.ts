class Tree<T> {
  head: TreeNode<T>
  values: Map<T, TreeNode<T>>

  constructor(value: T) {
    this.head = new TreeNode(value, this)
    this.values = new Map()
    this.values.set(value, this.head)
  }
}

export class TreeNode<T> {
  branches: TreeNode<T>[]
  parent: TreeNode<T> | undefined
  tree: Tree<T>
  value: T

  constructor(value: T, tree: Tree<T>, parent?: TreeNode<T>) {
    this.branches = []
    this.parent = parent
    this.tree = tree
    this.value = value
  }

  assignChildNode(newChild: TreeNode<T>): void {
    this.branches.push(newChild)
    this.tree.values.set(newChild.value, newChild)
  }

  getDepth = (): number => this.getPathToHead().length - 1

  getPathToHead(): T[] {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let current: TreeNode<T> = this
    const path = [current.value]
    while (current.parent !== undefined) {
      current = current.parent
      path.push(current.value)
    }
    return path
  }

  push(value: T): number {
    if (!this.tree.values.has(value)) {
      const node = new TreeNode(value, this.tree, this)
      this.branches.push(node)
      this.tree.values.set(value, node)
      return this.branches.length
    } else {
      return -1
    }
  }

  reassignParent(newParent: TreeNode<T>): void {
    if (this.tree !== newParent.tree) throw new Error('fuck')
    this.parent = newParent
    newParent.assignChildNode(this)
  }
}

export default Tree
