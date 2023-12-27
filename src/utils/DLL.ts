class DLL<T> {
  head: DLLNode<T> | undefined
  length: number

  private map: Map<T, DLLNode<T>>

  constructor(value?: T) {
    this.map = new Map<T, DLLNode<T>>()

    if (typeof value !== 'undefined') {
      const node: DLLNode<T> = { value }
      node.next = node
      node.prev = node
      this.head = node
      this.length = 1
      this.map.set(value, node)
    } else this.length = 0
  }

  getNode = (value: T): DLLNode<T> | undefined => this.map.get(value)

  insertAfter = (insert: T, after: DLLNode<T>): DLLNode<T> => {
    const node: DLLNode<T> = {
      value: insert,
      next: after.next,
      prev: after,
    }
    if (after.next) after.next.prev = node
    after.next = node
    this.length++
    this.map.set(insert, node)
    return node
  }

  insertBefore = (insert: T, before: DLLNode<T>): DLLNode<T> => {
    const node: DLLNode<T> = {
      value: insert,
      prev: before.prev,
      next: before,
    }
    if (before.prev) before.prev.next = node
    before.prev = node
    this.length++
    this.map.set(insert, node)
    if (before === this.head) {
      this.setNewHead(node)
    }
    return node
  }

  push = (value: T) => {
    const node: DLLNode<T> = { value }
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
    this.map.set(value, node)
    this.length++
  }

  removeNode = (node: DLLNode<T> | undefined): DLLNode<T> | undefined => {
    if (node === undefined) return undefined

    this.length--
    this.map.delete(node.value)
    if (this.head === node) {
      if (this.head.next === node) {
        this.head = undefined
      } else {
        if (this.head.next) this.head.next.prev = this.head.prev
        if (this.head.prev) this.head.prev.next = this.head.next
        this.head = this.head.next
      }
      return node
    } else {
      if (node.next) node.next.prev = node.prev
      if (node.prev) node.prev.next = node.next
      return node
    }
  }

  setNewHead = (node: DLLNode<T> | undefined) => {
    this.head = node
  }
}

export interface DLLNode<T> {
  value: T
  next?: DLLNode<T>
  prev?: DLLNode<T>
}

export default DLL
