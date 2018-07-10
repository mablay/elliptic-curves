const key = {
  plus: 187,
  minus: 189,
  c: 67
}

function keyPressed() {
  // console.log(keyCode)
  if (keyCode === key.minus) {
    MAX_POS--
    positions.pop()
  } else if (keyCode === key.plus) {
    MAX_POS++
  } else if (keyCode === key.c) {
    positions.length = 0
  }
}
