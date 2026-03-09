let total = 0

const resultEl = document.querySelector('#placeToPutResult')
const historyEl = document.querySelector('#history')

function reset(value = 0) { return value }
function addThree(value) { return value + 3 }
function addNine(value) { return value + 9 }
function minusTwo(value) { return value - 2 }
function double(value) { return value * 2 }
function halve(value) { return value / 2 }
function square(value) { return value * value }
function clamp(value, min, max) { return Math.min(Math.max(value, min), max) }

function updateResult(value) { resultEl.textContent = String(value) }

function applyOperation(operation) {
  total = operation(total)
  updateResult(total)
}

function logExamples(lines) {
  historyEl.textContent = lines.join('\n')
}

const operations = {
  pumpkin: () => applyOperation(reset),
  dominosPizza: () => applyOperation(addThree),
  zebra: () => applyOperation(addNine),
  cantThinkOfAnything: () => applyOperation(minusTwo)
}

Object.entries(operations).forEach(([id, action]) => {
  const button = document.querySelector(`#${id}`)
  if (!button) return
  button.addEventListener('click', action)
})

document.querySelector('#runExamplesBtn').addEventListener('click', () => {
  const examples = [
    () => `1) reset(0) => ${reset(0)}`,
    () => `2) addThree(0) => ${addThree(0)}`,
    () => `3) addNine(3) => ${addNine(3)}`,
    () => `4) minusTwo(12) => ${minusTwo(12)}`,
    () => `5) double(10) => ${double(10)}`,
    () => `6) halve(20) => ${halve(20)}`,
    () => `7) square(7) => ${square(7)}`,
    () => `8) clamp(150, 0, 100) => ${clamp(150, 0, 100)}`,
    () => `9) clamp(-20, 0, 100) => ${clamp(-20, 0, 100)}`,
    () => `10) square(addThree(4)) => ${square(addThree(4))}`
  ]
  logExamples(examples.map((example) => example()))
})

updateResult(total)
