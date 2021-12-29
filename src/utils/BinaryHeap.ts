class BinaryHeap<T> {
  content: T[]
  scoreFunction: (item: T) => number
  type: 'min' | 'max'

  constructor(scoreFunction: (item: T) => number, type: 'min' | 'max') {
    this.content = []
    this.scoreFunction = scoreFunction
    this.type = type
  }

  // Add a new element to the heap
  push(element: T) {
    // Add it to the end and bubble it up
    this.content.push(element)
    this.bubbleUp(this.content.length - 1)
  }

  // Remove the primary node of the heap
  pop() {
    // This is what we want to return later
    const result = this.content[0]
    // Grab the last element of the array
    const end = this.content.pop()
    // If it wasn't the only element in the array, add it to the top and sink it down
    if (this.content.length > 0) {
      this.content[0] = end as T
      this.sinkDown(0)
    }
    return result
  }

  // Remove an arbitrary node of the heap
  remove(element: T) {
    const { length } = this.content
    for (let i = 0; i < length; i++) {
      if (this.content[i] !== element) continue
      // When it's found, we need to pop the last element into its place and
      // bubble it up or sink it down (unless it was the last element)
      const end = this.content.pop()
      if (i === length - 1) break
      this.content[i] = end as T
      this.bubbleUp(i)
      this.sinkDown(i)
      break
    }
  }

  size() {
    return this.content.length
  }

  bubbleUp(n: number) {
    // Fetch and score the target element
    const element = this.content[n]
    const score = this.scoreFunction(element)
    // Can't bubble higher than zero
    while (n > 0) {
      // Fetch the parent element
      const parentN = Math.floor((n + 1) / 2) - 1
      const parent = this.content[parentN]
      const parentScore = this.scoreFunction(parent)
      // If these two are correct, we're good
      if (
        (this.type === 'min' && score >= parentScore) ||
        (this.type === 'max' && score <= parentScore)
      )
        break
      // Otherwise, we should swap them and continue
      this.content[n] = parent
      this.content[parentN] = element
      n = parentN
    }
  }

  sinkDown(n: number) {
    const { length } = this.content
    // Fetch and score the target element
    const element = this.content[n]
    const score = this.scoreFunction(element)

    while (true) {
      // Get the child indices
      const child2N = (n + 1) * 2
      const child1N = child2N - 1
      // Store possible new position of element
      let swap: number | null = null
      // If the first child exists
      if (child1N < length) {
        // Fetch it and score it
        const child1 = this.content[child1N]
        const child1Score = this.scoreFunction(child1)
        // Compare them and swap if necessary
        if (
          (this.type === 'min' && child1Score < score) ||
          (this.type === 'max' && child1Score > score)
        )
          swap = child1N
      }
      // Check the other child as well
      if (child2N < length) {
        const child2 = this.content[child2N]
        const child2Score = this.scoreFunction(child2)
        if (
          (this.type === 'min' && child2Score < score) ||
          (this.type === 'max' && child2Score > score)
        )
          swap = child2N
      }

      // If we don't need to swap, we need to sink down its parent
      if (swap === null) {
        const parentN = Math.floor((n + 1) / 2) - 1
        if (parentN > -1) this.sinkDown(parentN)
        break
      }
      // Otherwise, swap and continue
      this.content[n] = this.content[swap]
      this.content[swap] = element
      n = swap
    }
  }
}

export default BinaryHeap
