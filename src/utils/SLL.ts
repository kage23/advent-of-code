class SLL {
  head: ISLLNode | undefined

  constructor(value?: any) {
    if (value) {
      this.head = { value }
    }
  }

  moveToEnd = (node: ISLLNode) => {
    const value = this.removeNode(node)
    this.push(value)
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

    return node.value
  }
}

export interface ISLLNode {
  value: any
  next?: ISLLNode
}

export default SLL