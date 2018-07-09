// Elliptic curve arithmetic module

class EllipticCurve {
  constructor (a, b) {
    this.a = a
    this.b = b
  }

  calc (x) {
    const ysqared = Math.pow(x, 3) + this.a * x + this.b
    if (ysqared < 0) return null
    return Math.sqrt(ysqared)
  }

  intersect (p1, p2) {
    
  }
}

module.exports = {
  ellipticCurve: (a, b) => new EllipticCurve(a, b)
}
