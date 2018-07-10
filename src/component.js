module.exports = class Component {
  constructor() {
    this.children = []
  }

  drawRecursive() {
    this.children.forEach(child => child.drawRecursive())
    this.draw()
  }

  draw() {}
}
