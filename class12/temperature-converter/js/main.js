const refs = {
  input: document.querySelector('#temperatureInput'),
  from: document.querySelector('#fromUnit'),
  to: document.querySelector('#toUnit'),
  button: document.querySelector('#convertBtn'),
  output: document.querySelector('#output'),
  examples: document.querySelector('#examples')
}

const ABSOLUTE_ZERO_C = -273.15

function cToF(value) { return (value * 9) / 5 + 32 }
function fToC(value) { return ((value - 32) * 5) / 9 }
function cToK(value) { return value + 273.15 }
function kToC(value) { return value - 273.15 }
function round2(value) { return Number(value.toFixed(2)) }

function toCelsius(value, unit) {
  if (unit === 'c') return value
  if (unit === 'f') return fToC(value)
  return kToC(value)
}

function fromCelsius(value, unit) {
  if (unit === 'c') return value
  if (unit === 'f') return cToF(value)
  return cToK(value)
}

function label(unit) {
  if (unit === 'c') return 'C'
  if (unit === 'f') return 'F'
  return 'K'
}

function convert(value, fromUnit, toUnit) {
  const celsius = toCelsius(value, fromUnit)
  if (celsius < ABSOLUTE_ZERO_C) return 'Invalid: below absolute zero'
  return `${round2(value)}°${label(fromUnit)} = ${round2(fromCelsius(celsius, toUnit))}°${label(toUnit)}`
}

function convertTemperature() {
  const raw = Number(refs.input.value)
  if (!Number.isFinite(raw)) {
    refs.output.textContent = 'Please enter a valid temperature number.'
    return
  }
  refs.output.textContent = convert(raw, refs.from.value, refs.to.value)
}

function runExamples() {
  const lines = [
    `1) ${convert(0, 'c', 'f')}`,
    `2) ${convert(100, 'c', 'f')}`,
    `3) ${convert(32, 'f', 'c')}`,
    `4) ${convert(212, 'f', 'c')}`,
    `5) ${convert(0, 'c', 'k')}`,
    `6) ${convert(273.15, 'k', 'c')}`,
    `7) ${convert(451, 'f', 'k')}`,
    `8) ${convert(310.15, 'k', 'f')}`,
    `9) ${convert(-40, 'c', 'f')}`,
    `10) ${convert(-500, 'c', 'k')}`
  ]
  refs.examples.textContent = lines.join('\n')
}

refs.button.addEventListener('click', convertTemperature)
document.querySelector('#runExamplesBtn').addEventListener('click', runExamples)
