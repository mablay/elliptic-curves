function mouseMoved() {
  if (positions.length === 0) return
  positions[1] = mouseIntersection() || positions[1]
}
