class SLL <T extends unknown>{
  head?: ISLLNode<T>
  length: number

  private includeValues: Set<T>

  constructor(value?: T) {
    this.includeValues = new Set()
    if (typeof value !== 'undefined') {
      this.head = { value }
      this.length = 1
      this.includeValues.add(value)
    } else this.length = 0
  }

  includes = (value: T): boolean => this.includeValues.has(value)

  insertAfter = (insert: T, after: ISLLNode<T>): ISLLNode<T> => {
    const node: ISLLNode<T> = {
      value: insert,
      next: after.next
    }
    after.next = node
    this.length++
    this.includeValues.add(insert)
    return node
  }

  insertAfterNode = (value: T, insertAfter: ISLLNode<T>): ISLLNode<T> => {
    const node: ISLLNode<T> = { value }
    if (insertAfter.next) node.next = insertAfter.next
    insertAfter.next = node
    this.length++
    return node
  }

  moveToEnd = (node: ISLLNode<T>) => {
    const value = this.removeNode(node)
    this.push(value)
  }

  pop = () => {
    let currentNode = this.head
    while (currentNode && currentNode.next) currentNode = currentNode.next
    if (currentNode) {
      return this.removeNode(currentNode)
    }
  }

  push = (value: T): number => {
    const node: ISLLNode<T> = { value }
    if (typeof this.head !== 'undefined') {
      let currentNode: ISLLNode<T> = this.head
      while (currentNode.next) currentNode = currentNode.next
      currentNode.next = node
    } else {
      this.head = node
    }
    this.length++
    this.includeValues.add(value)
    return this.length
  }

  removeNode = (node: ISLLNode<T>) => {
    if (this.head === node) {
      if (this.head.next) this.head = this.head.next
      else this.head = undefined
    } else if (typeof this.head !== 'undefined') {
      let currentNode: ISLLNode<T> = this.head
      while (currentNode.next && currentNode.next !== node) currentNode = currentNode.next
      currentNode.next = node.next
    }

    this.length--
    this.includeValues.delete(node.value)
    return node.value
  }

  shift = () => {
    if (this.head) return this.removeNode(this.head)
  }

  unshift = (value: T) => {
    const node: ISLLNode<T> = { value }
    const oldHead = this.head
    node.next = oldHead
    this.head = node
    this.length++
    this.includeValues.add(value)
  }
}

export interface ISLLNode <T extends unknown>{
  value: T
  next?: ISLLNode<T>
}

export default SLL