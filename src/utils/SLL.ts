class SLL {
  head: ISLLNode | undefined
  length: number

  constructor(value?: any) {
    if (typeof value !== 'undefined') {
      this.head = { value }
      this.length = 1
    } else this.length = 0
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

  push = (value: any) => {
    const node: ISLLNode = { value }
    if (typeof this.head !== 'undefined') {
      let currentNode: ISLLNode = this.head
      while (currentNode.next) currentNode = currentNode.next
      currentNode.next = node
    } else {
      this.head = node
    }
    this.length++
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
  }
}

export interface ISLLNode {
  value: any
  next?: ISLLNode
}

export default SLL