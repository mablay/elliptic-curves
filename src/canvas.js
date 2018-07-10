const P5 = require('p5')
const Component = require('./component')

const p5 = initP5()

function initP5() {
  let instance
  new P5(function( p5 ) {
    instance = p5
  })
  return instance
}


class Canvas extends Component {
  constructor(app) {
    super()
    p5.setup = () => {
      p5.createCanvas(480, 640)
      p5.background(0)
    }

    p5.draw = () => {
      this.drawRecursive()
    }
  }

  draw() {
    p5.rect(30, 20, 55, 55)
  }
}

function drawChart(p5) {
  p5.background(0)
  drawCoordinates()
  drawCurve(params.a, params.b)
  generatePositions()
  drawPositions()
  drawMouseIntersection()
}

module.exports = {
  Canvas,
  p5
}
