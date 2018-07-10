
function circle (x, y, r) {
  ellipse(
    (x + offset.x) * scale.x,
    (y + offset.y) * scale.y,
    r * scale.x,
    r * scale.y
  )
}
