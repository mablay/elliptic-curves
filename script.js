const scale = {x: 70, y: 70}
const offset = {x: 0, y: 0}
const params = {a: -1, b: 1}
const positions = []
let MAX_POS = 3

function setup() {
  createCanvas(480, 640)
  background(0)
  offset.x = (width / 2) / scale.x
  offset.y = (height / 2) / scale.y
}

function updateParam(param, value) {
  background(0)
  positions.length = 0
  if (param === 'n') {
    MAX_POS = value
    return
  }
  params[param] = parseFloat(value)
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    MAX_POS--
    positions.pop()
  } else if (keyCode === RIGHT_ARROW) {
    MAX_POS++
  }
}

function mouseMoved() {
  if (positions.length === 0) return
  positions[1] = mouseIntersection() || positions[1]
}

function draw() {
  background(0)
  drawCoordinates()
  drawCurve(params.a, params.b)
  generatePositions()
  drawPositions()
  drawMouseIntersection()
}

function drawPositions () {
  stroke(200, 0, 0)
  positions.slice(0,2).forEach(p => circle(p.x, p.y, 0.1))
  stroke(0, 200, 0)
  positions.slice(2).forEach(p => circle(p.x, p.y, 0.1))
}

function generatePositions () {
  if (positions.length < 2) return
  let old = positions[0]
  for (let i = 1; i < MAX_POS; i++) {
    const pos = positions[i]
    stroke(128)
    projectLine(old.x, old.y, pos.x, pos.y)
    if (i === MAX_POS - 1) return
    positions[i + 1] = add(old, pos)
    old = pos
  }
}

function add(p1, p2) {
  const {x, y} = intersect(p1, p2)
  return {x, y: -y}
}

function intersect (p1, p2) {
  const m = (p2.y - p1.y) / (p2.x - p1.x)
  const h = p1.y - m * p1.x
  const x3 = Math.pow(m, 2) - p1.x - p2.x
  const y3 = m * x3 + h
  return {x: x3, y: y3}
}

function drawCoordinates () {
  stroke(32)
  projectLine(-100, 0, 100, 0)
  projectLine(0, -100, 0, 100)
}

function mouseIntersection () {
  const x = mouseX / scale.x - offset.x
  let y = ec(x, params.a, params.b)
  if (y === null) return
  if (mouseY < height / 2) y = -y
  return {x, y}
}

function drawMouseIntersection () {
  const pos = mouseIntersection()
  if (!pos) return
  stroke(200)
  noFill()
  circle(pos.x, pos.y, 0.2)
}

function mouseClicked() {
  const pos = mouseIntersection()
  if (!pos) return
  positions.push(pos)
}

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

// elliptic curve: solve for y
function ec(x, a, b) {
  const ysqared = Math.pow(x, 3) + a * x + b
  if (ysqared < 0) return null
  return Math.sqrt(ysqared)
}
