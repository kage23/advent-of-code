import polygonPerimeterLength from './polygonPerimeterLength'

const polygonArea = (vertices: number[][]) => {
  let s1 = 0
  let s2 = 0
  for (let v = 0; v < vertices.length; v++) {
    const vx1 = vertices[v]
    const vx2 = vertices[v + 1] || vertices[0]
    s1 += vx1[0] * vx2[1]
    s2 += vx1[1] * vx2[0]
  }
  let area = ((s1 > s2 ? s1 : s2) - (s1 > s2 ? s2 : s1)) / 2
  area += polygonPerimeterLength(vertices) / 2
  area += 1

  return area
}

export const bigPolygonArea = (vertices: number[][]) => {
  let s1 = BigInt(0)
  let s2 = BigInt(0)
  for (let v = 0; v < vertices.length; v++) {
    const vx1 = vertices[v]
    const vx2 = vertices[v + 1] || vertices[0]
    s1 += BigInt(vx1[0] * vx2[1])
    s2 += BigInt(vx1[1] * vx2[0])
  }
  let area = ((s1 > s2 ? s1 : s2) - (s1 > s2 ? s2 : s1)) / BigInt(2)
  area += BigInt(polygonPerimeterLength(vertices) / 2)
  area += BigInt(1)

  return area
}

export default polygonArea
