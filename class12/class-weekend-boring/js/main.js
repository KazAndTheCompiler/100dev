const refs = {
  check: document.querySelector('#check'),
  dayInput: document.querySelector('#day'),
  output: document.querySelector('#placeToSee'),
  examples: document.querySelector('#examples')
}

const responseByDay = {
  monday: 'BORING',
  tuesday: 'YOU HAVE CLASS',
  wednesday: 'Hump day — halfway there.',
  thursday: 'YOU HAVE CLASS',
  friday: 'BORING',
  saturday: 'Its The Weekend',
  sunday: 'Its The Weekend'
}

function normalizeInput(value) { return value.trim().toLowerCase() }
function isWeekend(day) { return day === 'saturday' || day === 'sunday' }
function hasClass(day) { return day === 'tuesday' || day === 'thursday' }
function isValidDay(day) { return day in responseByDay }
function evaluateDay(day) {
  if (!isValidDay(day)) return 'Unknown day'
  if (isWeekend(day)) return 'Weekend ✅'
  if (hasClass(day)) return 'Class day 📚'
  return 'Boring day 😴'
}

function check() {
  const day = normalizeInput(refs.dayInput.value)
  if (!day) return (refs.output.textContent = 'Enter a day first.')
  if (!isValidDay(day)) return (refs.output.textContent = 'Try Monday-Sunday.')
  refs.output.textContent = `${responseByDay[day]} (${evaluateDay(day)})`
}

function runExamples() {
  const list = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday','MONDAY ','  sunday','pizza']
  refs.examples.textContent = list.map((item, idx) => {
    const day = normalizeInput(item)
    return `${idx + 1}) evaluateDay(${JSON.stringify(item)}) => ${evaluateDay(day)}`
  }).join('\n')
}

refs.check.addEventListener('click', check)
refs.dayInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') check() })
document.querySelector('#runExamplesBtn').addEventListener('click', runExamples)
