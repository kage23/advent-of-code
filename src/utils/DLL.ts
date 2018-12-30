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

  insertAfter = (insert: any, after: IDLLNode): IDLLNode => {
    const node: IDLLNode = {
      value: insert,
      next: after.next,
      prev: after
    }
    if (after.next) after.next.prev = node
    after.next = node
    return node
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

  removeNode = (node: IDLLNode): IDLLNode | undefined => {
    if (this.head === node) {
      if (this.head.next === node) {
        this.head = undefined
      } else {
        if (this.head.next) this.head.next.prev = this.head.prev
        if (this.head.prev) this.head.prev.next = this.head.next
        this.head = this.head.next
      }
      return this.head
    } else {
      if (node.next) node.next.prev = node.prev
      if (node.prev) node.prev.next = node.next
      return node.next
    }
  }
}

export interface IDLLNode {
  value: any
  next?: IDLLNode
  prev?: IDLLNode
}

export default DLL