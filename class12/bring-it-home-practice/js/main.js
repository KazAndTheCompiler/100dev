const output = document.querySelector('#output')
const examples = document.querySelector('#examples')

const practiceValue = 32
const plusTenValue = practiceValue + 10

function subtractFourNumbers(a, b, c, d) { return a - b - c - d }
function divideRemainder(a, b) { return b === 0 ? 'undefined (division by zero)' : a % b }
function sumAndMaybeJumanji(a, b) {
  const sum = a + b
  return sum > 50 ? `Jumanji (sum: ${sum})` : `No Jumanji (sum: ${sum})`
}
function multiplyAndMaybeZebra(a, b, c) {
  const product = a * b * c
  return product % 3 === 0 ? `ZEBRA (product: ${product})` : `No Zebra (product: ${product})`
}
function average(a, b, c) { return (a + b + c) / 3 }
function toPercent(part, whole) { return whole === 0 ? 0 : (part / whole) * 100 }

function render(message) { output.textContent = message }

document.querySelector('#showVariable').addEventListener('click', () => {
  render(`Variable: ${practiceValue}, plus 10: ${plusTenValue}`)
})

document.querySelector('#subtractBtn').addEventListener('click', () => {
  render(`subtractFourNumbers(100, 15, 20, 10) = ${subtractFourNumbers(100, 15, 20, 10)}`)
})

document.querySelector('#remainderBtn').addEventListener('click', () => {
  render(`divideRemainder(22, 5) = ${divideRemainder(22, 5)}`)
})

document.querySelector('#jumanjiBtn').addEventListener('click', () => render(sumAndMaybeJumanji(30, 25)))
document.querySelector('#zebraBtn').addEventListener('click', () => render(multiplyAndMaybeZebra(3, 4, 5)))

document.querySelector('#runExamplesBtn').addEventListener('click', () => {
  const lines = [
    `1) subtractFourNumbers(100,15,20,10) = ${subtractFourNumbers(100,15,20,10)}`,
    `2) subtractFourNumbers(50,5,5,5) = ${subtractFourNumbers(50,5,5,5)}`,
    `3) divideRemainder(22,5) = ${divideRemainder(22,5)}`,
    `4) divideRemainder(9,0) = ${divideRemainder(9,0)}`,
    `5) sumAndMaybeJumanji(30,25) = ${sumAndMaybeJumanji(30,25)}`,
    `6) sumAndMaybeJumanji(10,5) = ${sumAndMaybeJumanji(10,5)}`,
    `7) multiplyAndMaybeZebra(3,4,5) = ${multiplyAndMaybeZebra(3,4,5)}`,
    `8) multiplyAndMaybeZebra(2,2,2) = ${multiplyAndMaybeZebra(2,2,2)}`,
    `9) average(10,20,30) = ${average(10,20,30)}`,
    `10) toPercent(45,60) = ${toPercent(45,60).toFixed(2)}%`
  ]
  examples.textContent = lines.join('\n')
})
