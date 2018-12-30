class DLL {
  head: IDLLNode | undefined

  constructor(value?: any) {
    if (typeof value !== 'undefined') {
      const node: IDLLNode = { value }
      node.next = node
      node.prev = node
      this.head = node
    }
  }

  push = (value: any) => {
    const node: IDLLNode = { value }
    if (this.head) {
      node.next = this.head
      node.prev = this.head.prev
      if (this.head.prev) this.head.prev.next = node
      this.head.prev = node
    } else {
      node.next = node
      node.prev = node
      this.head = node
    }
  }

  removeNode = (node: IDLLNode) => {
    if (this.head === node) {
      if (this.head.next === node) {
        this.head = undefined
      } else {
        if (this.head.next) this.head.next.prev = this.head.prev
        if (this.head.prev) this.head.prev.next = this.head.next
        this.head = this.head.next
      }
    } else {
      let currentNode = this.head
      while (currentNode !== node) currentNode = currentNode ? currentNode.next : undefined
      const currentPrev = currentNode.prev
      const currentNext = currentNode.next
      if (currentPrev && currentNext) {
        currentNext.prev = currentPrev
        currentPrev.next = currentNext
      }
    }
  }
}

export interface IDLLNode {
  value: any
  next?: IDLLNode
  prev?: IDLLNode
}

export default DLL