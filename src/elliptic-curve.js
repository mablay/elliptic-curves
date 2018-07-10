// Elliptic curve arithmetic module

class EllipticCurve {
  constructor (a, b) {
    this.a = a
    this.b = b
  }

  /**
   * Evaluate elliptic curve funciton at position "x"
   * @param x {Number} ec argument
   * @returns null for irrational values or {number} for rational values
   */
  value (x) {
    const ysqared = Math.pow(x, 3) + this.a * x + this.b
    if (ysqared < 0) return null
    return Math.sqrt(ysqared)
  }

  /**
   * Add operator for two elements on the the elliptic curve
   * @returns position {x, y} on the elliptic curve.
   */
  add(p1, p2) {
    const {x, y} = this.intersect(p1, p2)
    return {x, y: -y}
  }

  /**
   * Calculate intersection.
   * A line connecting 2 points on an elliptic curve
   * "usually" intersects the curve on a third position
   * which is returned by this method.
   * If only p1 is provided a tangent will be used to
   * find the intersecting position.
   * @param p1 {x:number, y:number} position on the curve
   * @param p2 {x:number, y:number} (optionsl) position on the curve.
   * @returns {x:number, y:number} position on the curve
   */
  intersect (p1, p2) {
    const m = (p2.y - p1.y) / (p2.x - p1.x)
    const h = p1.y - m * p1.x
    const x3 = Math.pow(m, 2) - p1.x - p2.x
    const y3 = m * x3 + h
    return {x: x3, y: y3}
  }

  /**
   * @param p {x: number, y: number} any position
   * @returns {x: number, y: number} point on the curve closest to "p"
   */
  nearestPoint (p) {
    const x = p.x / scale.x - offset.x
    let y = ec(x, params.a, params.b)
    if (y === null) return
    if (mouseY < height / 2) y = -y
    return {x, y}
  }
}

module.exports = {
  ellipticCurve: (a, b) => new EllipticCurve(a, b)
}
