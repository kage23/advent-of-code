import DLL from './DLL'

export const generateKnotHash = (input: string, listSize: number, readAsNumbers?: boolean): string => {
  const list = new DLL()
  let currentPosition = 0
  let skipSize = 0
  for (let i = 0; i < listSize; i++) list.push(i)

  const twistAndAdvance = (length: number): void => {
    let startOfTwist = list.head
    const listToReverse: number[] = []

    // Select starting node for twist
    for (let i = 0; i < currentPosition; i++) {
      startOfTwist = startOfTwist ? startOfTwist.next : startOfTwist
    }
    let currentNode = startOfTwist

    // Get values to be reversed
    while (listToReverse.length < length && currentNode) {
      listToReverse.push(currentNode.value)
      currentNode = currentNode.next
    }

    currentNode = startOfTwist
    while (listToReverse.length && currentNode) {
      currentNode.value = listToReverse.pop() || 0
      currentNode = currentNode.next
    }

    currentPosition += (length + skipSize)
    skipSize++
  }

  const lengths = (
    readAsNumbers
      ? input.split(',').map(x => parseInt(x))
      : input.split('').map(x => x.charCodeAt(0))
    ).concat(17, 31, 73, 47, 23)

  const runs = 64
  for (let i = 0; i < runs; i++) {
    lengths.forEach(x => twistAndAdvance(x))
  }

  // Now you should have the sparse hash; make the dense hash
  let currentNode = list.head
  const denseHashArray = []
  let currentSubHash = 0
  for (let count = 0; count < list.length; count++) {
    if (currentNode) {
      currentSubHash = currentSubHash ^ currentNode.value
      currentNode = currentNode.next
    }
    if (count % 16 === 15) {
      denseHashArray.push(currentSubHash)
      currentSubHash = 0
    }
  }

  // Now use the dense hash to make the hex string
  let result = ''
  denseHashArray.forEach(x => {
    let hexStr = x.toString(16)
    if (hexStr.length % 2) hexStr = `0${hexStr}`
    result += hexStr
  })

  return result
}

export const manhattanDistance = (a: number[], b: number[], dimensions?: number): number => {
  if (!dimensions && a.length !== b.length)
    throw new Error('The coords must be in the same dimensions!')
  if (dimensions && (a.length < dimensions || b.length < dimensions))
    throw new Error('The coords must be of a large-enough dimension!')
  const dimensionCount = dimensions || a.length
  return a.reduce((distance, currentCoord, currentIndex) => (
    distance + (
      currentIndex < dimensionCount
        ? Math.abs(currentCoord - b[currentIndex])
        : 0
    )
  ), 0)
}

export const numArrEq = (a: number[], b: number[]): boolean => {
  if (a.length !== b.length) return false
  const len = a.length
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

export const randInt = (min: number, max: number): number => Math.floor(Math.random() * max) + min