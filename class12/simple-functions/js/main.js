const output = document.querySelector('#output')

function addTwoNumbers(a, b) {
  return a + b
}

function multiplyThreeNumbers(a, b, c) {
  return a * b * c
}

function divideTwoNumbers(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b) || b === 0) {
    return { error: 'Please use valid numbers and a non-zero divisor.' }
  }

  const quotient = a / b
  const remainder = a % b
  return { quotient, remainder }
}

function formatDivisionResult(result) {
  return result.error
    ? result.error
    : `quotient=${result.quotient}, remainder=${result.remainder}`
}

function render(message) {
  output.textContent = message
}

function runAllExamples() {
  const examples = [
    () => `1) addTwoNumbers(7, 5) = ${addTwoNumbers(7, 5)}`,
    () => `2) addTwoNumbers(-2, 10) = ${addTwoNumbers(-2, 10)}`,
    () => `3) addTwoNumbers(0, 0) = ${addTwoNumbers(0, 0)}`,
    () => `4) multiplyThreeNumbers(2, 3, 4) = ${multiplyThreeNumbers(2, 3, 4)}`,
    () => `5) multiplyThreeNumbers(-1, 8, 2) = ${multiplyThreeNumbers(-1, 8, 2)}`,
    () => `6) multiplyThreeNumbers(1.5, 2, 3) = ${multiplyThreeNumbers(1.5, 2, 3)}`,
    () => `7) divideTwoNumbers(10, 4) = ${formatDivisionResult(divideTwoNumbers(10, 4))}`,
    () => `8) divideTwoNumbers(25, 5) = ${formatDivisionResult(divideTwoNumbers(25, 5))}`,
    () => `9) divideTwoNumbers(11, 0) = ${formatDivisionResult(divideTwoNumbers(11, 0))}`,
    () => `10) divideTwoNumbers(13, 2) = ${formatDivisionResult(divideTwoNumbers(13, 2))}`
  ]

  render(examples.map((example) => example()).join('\n'))
}

document.querySelector('#addBtn').addEventListener('click', () => {
  render(`addTwoNumbers(7, 5) = ${addTwoNumbers(7, 5)}`)
})

document.querySelector('#multiplyBtn').addEventListener('click', () => {
  render(`multiplyThreeNumbers(2, 3, 4) = ${multiplyThreeNumbers(2, 3, 4)}`)
})

document.querySelector('#divideBtn').addEventListener('click', () => {
  render(`divideTwoNumbers(10, 4): ${formatDivisionResult(divideTwoNumbers(10, 4))}`)
})

document.querySelector('#runExamplesBtn').addEventListener('click', runAllExamples)
