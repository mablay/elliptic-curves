const scale = {x: 70, y: 70}
const offset = {x: 0, y: 0}
const positions = []
let MAX_POS = 3
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
    a: createLabeledSlider('a', -10, 10, -1, 1,   14, height - 140, clearPositions),
    b: createLabeledSlider('b', -10, 10,  1, 0.2, 14, height - 100, clearPositions),
    n: createLabeledSlider('n',   3, 10,  3, 1,   14, height - 60, n => {
      while(n < MAX_POS) {
        positions.pop()
        MAX_POS--
      }
      MAX_POS = n
    })
  }

  // hint
  let hintText = ''
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    hintText = 'Tap the curve to get started'
  } else {
    hintText = 'Mouse-over the curve to get started'
  }
  this.hint = createElement('p', hintText)
  this.hint.position(14, 50)
  this.hint.class('blink hint')
  setTimeout(() => window.hint.removeClass('blink'), 1000)
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
    }
  } else if (keyCode === 187) {
    const n = window.sliders.n.getValue()
    if (n < 10) {
      window.sliders.n.setValue(n + 1)
    }
  } else if (keyCode === 67) {
    clearPositions()
  }
}

function mouseMoved () {
  if (isMouseInControlbox()) return
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
  drawConnections()
  drawPositions()
  drawMouseIntersection()
}

function generatePositions () {
  if (!isMouseInControlbox()) {
    const pm = mouseIntersection()
    if (!pm) return
    positions[0] = pm
    positions[1] = ec.intersectTangent(pm)
  }
  if (positions.length < 2) return
  let old = positions[0]
  for (let i = 1; i < MAX_POS; i++) {
    const pos = positions[i]
    // stroke(128)
    // projectLine(old.x, old.y, pos.x, pos.y)
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

function isMouseInControlbox () {
  // prevent position updates while user
  // interacts with sliders
  return (mouseX < 250 && height - mouseY < 150)
}

function mouseClicked() {
  if (isMouseInControlbox()) return
  const pos = mouseIntersection()
  if (!pos) return
  if (mouseDistance(pos) > 0.6) return
  if (positions.length === 0) {
    return positions.push(pos)
  }
  positions[1] = pos
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  offset.x = (width / 2) / scale.x
  offset.y = (height / 2) / scale.y
  this.hint.position(10, height - 50)
}