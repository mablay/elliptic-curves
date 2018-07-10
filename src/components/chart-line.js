
function projectLine(x0, y0, x1, y1) {
  line(
    (x0 + offset.x) * scale.x,
    (y0 + offset.y) * scale.y,
    (x1 + offset.x) * scale.x,
    (y1 + offset.y) * scale.y
  )
}
