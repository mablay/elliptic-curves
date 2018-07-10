
function drawCurve(a, b) {
  stroke(255)
  const X_MIN = -5
  const X_MAX = 5
  const STEP = 0.01
  let y0 = ec(X_MIN, a, b)
  for (let x = X_MIN + STEP; x <= X_MAX; x += STEP) {
    let y = ec(x, a, b)
    if (y === null) {
      if (y0 === 0) continue // skip irrational solutions
      y = 0
    }
    projectLine(x - STEP, y0, x, y)
    projectLine(x - STEP, -y0, x, -y)
    y0 = y
  }
}
