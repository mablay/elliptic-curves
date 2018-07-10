function drawMouseIntersection () {
  const pos = mouseIntersection()
  if (!pos) return
  stroke(200)
  noFill()
  circle(pos.x, pos.y, 0.2)
}

function drawCurve () {
  stroke(255)
  const X_MIN = -5
  const X_MAX = 5
  const STEP = 0.01
  let y0 = ec.value(X_MIN)
  for (let x = X_MIN + STEP; x <= X_MAX; x += STEP) {
    let y = ec.value(x)
    if (y === null) {
      if (y0 === 0) continue // skip irrational solutions
      y = 0
    }
    projectLine(x - STEP, y0, x, y)
    projectLine(x - STEP, -y0, x, -y)
    y0 = y
  }
}

function drawPositions () {
  stroke(200, 0, 0)
  positions.slice(0,2).forEach(p => circle(p.x, p.y, 0.1))
  stroke(0, 200, 0)
  positions.slice(2).forEach(p => circle(p.x, p.y, 0.1))
}

function projectLine(x0, y0, x1, y1) {
  line(
    (x0 + offset.x) * scale.x,
    (y0 + offset.y) * scale.y,
    (x1 + offset.x) * scale.x,
    (y1 + offset.y) * scale.y
  )
}

function circle (x, y, r) {
  ellipse(
    (x + offset.x) * scale.x,
    (y + offset.y) * scale.y,
    r * scale.x,
    r * scale.y
  )
}

function drawCoordinates () {
  stroke(32)
  projectLine(-100, 0, 100, 0) // x
  projectLine(0, -100, 0, 100) // y
  projectLine(1, -0.1, 1, 0.1) // x = 1 indicator
  projectLine(-0.1, 1, 0.1, 1) // y = 1 indicator
  projectLine(-1, -0.1, -1, 0.1) // x = -1 indicator
  projectLine(-0.1, -1, 0.1, -1) // y = -1 indicator
}
