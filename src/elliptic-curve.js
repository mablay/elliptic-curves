// Elliptic curve arithmetic module

class EllipticCurve {
  constructor (a, b) {
    this.a = a
    this.b = b
  }

  value (x) {
    const ysqared = Math.pow(x, 3) + this.a * x + this.b
    if (ysqared < 0) return null
    return Math.sqrt(ysqared)
  }

  intersect (p1, p2) {
    const m = (p2.y - p1.y) / (p2.x - p1.x)
    const h = p1.y - m * p1.x
    const x3 = Math.pow(m, 2) - p1.x - p2.x
    const y3 = m * x3 + h
    return {x: x3, y: y3}
  }

  add (p1, p2) {
    const {x, y} = this.intersect(p1, p2)
    return {x, y: -y}
  }

  // TODO: nearestPoint for all x
  nearestPoint (p) {
    const y = this.value(p.x)
    if (y === null) return null
    if (p.y > 0) {
      return {x: p.x, y}
    } else {
      return {x: p.x, y: -y}
    }
  }
}
