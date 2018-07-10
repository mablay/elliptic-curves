// curve, points, lines

const Component = require('../component')

module.exports = class Chart extends Component {
  constructor() {
    const vp = app.chart.viewport
    vp.scale.x = 70
    vp.scale.y = 70
    vp.offset.x = (p5.width / 2) / vp.scale.x
    vp.offset.y = (p5.height / 2) / vp.scale.y
  }
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




function mouseIntersection () {
  return this.ec.nearestPoint({x: mouseX, 0})
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
  if (positions.length === 0) {
    return positions.push(pos)
  }
  positions[1] = pos
}
