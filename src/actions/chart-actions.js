module.exports = {
  incrementIterationCount: () => {},
  decrementIterationCount: () => {},
  setIterationCount: (n) => {},
  clearPositions: () => {},
  reset: () => {},
  increaseParameter: (param, value = 0.1) => {},
  decreaseParameter: (param, value = 0.1) => {},
  setParameter: (param, vlaue) => {}
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
