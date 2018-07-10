// application relevant code
// User flow, screens, components, routing
console.log('Application')

const {Canvas, p5} = require('./canvas')
const Text = require('./components/chart-text')

window.ecApp = {
  screen: null,
  tutorial: {},
  chart: {
    viewport: {
      offset: {},
      scale: {}
    }
  }
}

const canvas = new Canvas(window.ecApp)
// canvas.children.push(new Text('Hello World', {x: 0, y: 60}, 32))
p5.createElement('h2', 'im an h2 p5.element!')
