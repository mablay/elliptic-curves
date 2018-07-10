const Component = require('../component')
const {p5} = require('../canvas')

module.exports = class Text extends Component {
  constructor(text, pos, size) {
    super()
    this.text = text,
    this.pos = pos
    console.log('Text', this.text)
  }

  draw() {
    p5.color(255)
    p5.textSize(this.size)
    p5.fill(0, 102, 153)
    p5.text(this.text, this.pos.x, this.pos.y)
  }
}
