class SLL {
  head: ISLLNode | undefined
  length: number

  private includeValues: Map<any, boolean>

  constructor(value?: any) {
    if (typeof value !== 'undefined') {
      this.head = { value }
      this.length = 1
    } else this.length = 0
    this.includeValues = new Map()
    this.includeValues.set(value, true)
  }

  includes = (value: any): boolean => this.includeValues.has(value)

  insertAfter = (insert: any, after: ISLLNode): ISLLNode => {
    const node: ISLLNode = {
      value: insert,
      next: after.next
    }
    after.next = node
    this.length++
    this.includeValues.set(insert, true)
    return node
  }

  insertAfterNode = (value: any, insertAfter: ISLLNode): ISLLNode => {
    const node: ISLLNode = { value }
    if (insertAfter.next) node.next = insertAfter.next
    insertAfter.next = node
    this.length++
    return node
  }

  moveToEnd = (node: ISLLNode) => {
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

  push = (value: any): number => {
    const node: ISLLNode = { value }
    if (typeof this.head !== 'undefined') {
      let currentNode: ISLLNode = this.head
      while (currentNode.next) currentNode = currentNode.next
      currentNode.next = node
    } else {
      this.head = node
    }
    this.length++
    this.includeValues.set(value, true)
    return this.length
  }

  removeNode = (node: ISLLNode) => {
    if (this.head === node) {
      if (this.head.next) this.head = this.head.next
      else this.head = undefined
    } else if (typeof this.head !== 'undefined') {
      let currentNode: ISLLNode = this.head
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

  unshift = (value: any) => {
    const node: ISLLNode = { value }
    const oldHead = this.head
    node.next = oldHead
    this.head = node
    this.length++
    this.includeValues.set(value, true)
  }
}

export interface ISLLNode {
  value: any
  next?: ISLLNode
}

export default SLL