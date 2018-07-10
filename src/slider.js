function createLabeledSlider (title, min, max, value, step, x, y, onChange = () => {}) {
  const label = createElement('span', title)
  const slider = createSlider(min, max, value, step)
  const val = createElement('span', value)
  slider.class('slider')
  slider.elt.addEventListener('input', updateLabel)
  slider.elt.addEventListener('change', updateLabel)
  position(x, y)

  return {
    updateLabel,
    position,
    value: slider.value.bind(slider),
    setValue: v => {
      slider.value(v)
      updateLabel()
    },
    getValue: () => slider.value()
  }

  function updateLabel () {
    val.elt.innerHTML = slider.value()
    onChange(slider.value())
  }

  function position (x, y) {
    label.position(x, y + 6)
    slider.position(x + 16, y)
    val.position(x + 226, y + 6)
  }
}
