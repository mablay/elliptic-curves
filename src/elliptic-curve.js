// Elliptic curve arithmetic module

class EllipticCurve {
  constructor (a, b) {
    this.a = a
    this.b = b
    this.processing = false
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

  // F(x) = (x^3 + ax + b)^0.5
  // F'(x)= 0.5 * (x^3 + ax + b)^-0.5 * (3x^2 + a)
  intersectTangent (p) {
    const m = Math.sign(p.y) * (3 * Math.pow(p.x, 2) + this.a) / (2 * Math.sqrt(Math.pow(p.x, 3) + this.a * p.x + this.b))
    const h = p.y - m * p.x
    const x3 = Math.pow(m, 2) - 2 * p.x
    const y3 = m * x3 + h
    return {x: x3, y: y3}
  }

  // TODO: nearestPoint for all x
  nearestPoint (p) {
    if (this.processing) return null
    let pNear = null
    let dNear = Number.POSITIVE_INFINITY
    this.processing = true
    for (let dx = -1; dx <= 1; dx += 0.01) {
      const pCandidate = this.yMagnet({
        x: p.x + dx,
        y: p.y
      })
      if (pCandidate === null) continue
      const dCandidate = distSquare(p, pCandidate)
      if (dCandidate < dNear) {
        dNear = dCandidate
        pNear = pCandidate
      }
    }
    this.processing = false
    return pNear
  }

  yMagnet (p) {
    const y = this.value(p.x)
    if (y === null) return null
    if (p.y > 0) {
      return {x: p.x, y}
    } else {
      return {x: p.x, y: -y}
    }
  }
}

function distSquare (p1, p2) {
  return Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
}
