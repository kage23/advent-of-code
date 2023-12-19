interface LineSegment {
  type: 'h' | 'v'
  start: number
  end: number
  position: number
}

const polygonPerimeterLength = (vertices: number[][]) => {
  const lineSegments: LineSegment[] = []
  vertices.forEach((v, i) => {
    const next = vertices[i + 1] || vertices[0]
    const ls = {
      type: v[0] === next[0] ? 'h' : 'v',
    } as LineSegment
    ls.position = ls.type === 'h' ? v[0] : v[1]
    ls.start =
      ls.type === 'h' ? Math.min(v[1], next[1]) : Math.min(v[0], next[0])
    ls.end = ls.type === 'h' ? Math.max(v[1], next[1]) : Math.max(v[0], next[0])
    lineSegments.push(ls)
  })
  return lineSegments.reduce((sum, { start, end }) => {
    return sum + Math.abs(end - start)
  }, 0)
}

export default polygonPerimeterLength
