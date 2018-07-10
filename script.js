const scale = {x: 70, y: 70}
const offset = {x: 0, y: 0}
const positions = []
let MAX_POS = 4
const ec = new EllipticCurve(-1, 1)

function setup () {
  createCanvas(windowWidth, windowHeight)
  background(0)
  offset.x = (width / 2) / scale.x
  offset.y = (height / 2) / scale.y

  // title
  this.title = createElement('h1', 'Elliptic Curve Arithmetic')
  this.title.position(10, 0)

  this.sliders = {
    a: createLabeledSlider('a', -10, 10, -1, 1, 14, 80, clearPositions),
    b: createLabeledSlider('b', -10, 10, 1, 0.2, 14, 120, clearPositions),
    n: createLabeledSlider('n', 3, 10, 3, 1, 14, 160, n => {
      while(n + 1 < MAX_POS) {
        positions.pop()
        MAX_POS--
      }
      MAX_POS = n + 1
    })
  }
  console.log('[setup] slider.a.value() =', window.sliders.a.value())

  // hint
  this.hint = createElement('p', 'Click on the curve to get started')
  this.hint.position(10, height - 50)
}

function clearPositions () {
  while (positions.pop()) {}
}

function keyPressed () {
  // console.log(keyCode)
  if (keyCode === 189) {
    const n = window.sliders.n.getValue()
    if (n > 3) {
      window.sliders.n.setValue(n - 1)
      MAX_POS--
      positions.pop()
    }
  } else if (keyCode === 187) {
    const n = window.sliders.n.getValue()
    if (n < 10) {
      window.sliders.n.setValue(n + 1)
      MAX_POS++
    }
  } else if (keyCode === 67) {
    clearPositions()
  }
}

function mouseMoved () {
  if (positions.length === 0) return
  positions[1] = mouseIntersection() || positions[1]
}

function draw () {
  ec.a = window.sliders.a.value()
  ec.b = window.sliders.b.value()
  ec.n = window.sliders.n.value()
  background(0)
  drawCoordinates()
  drawCurve()
  generatePositions()
  drawPositions()
  drawMouseIntersection()
}

function generatePositions () {
  if (positions.length < 2) return
  let old = positions[0]
  for (let i = 1; i < MAX_POS; i++) {
    const pos = positions[i]
    stroke(128)
    projectLine(old.x, old.y, pos.x, pos.y)
    if (i === MAX_POS - 1) return
    positions[i + 1] = ec.add(old, pos)
    old = pos
  }
}

function mouseIntersection () {
  const x = mouseX / scale.x - offset.x
  const y = mouseY / scale.y - offset.y
  return ec.nearestPoint({x, y})
}

function mouseDistance (p) {
  const x = mouseX / scale.x - offset.x
  const y = mouseY / scale.y - offset.y
  return Math.sqrt(Math.pow(x - p.x, 2) + Math.pow(y - p.y, 2))
}

function mouseClicked() {
  const pos = mouseIntersection()
  if (!pos) return
  if (mouseDistance(pos) > 0.6) return
  if (positions.length === 0) {
    return positions.push(pos)
  }
  positions[1] = pos
}
